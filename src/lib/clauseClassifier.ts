import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export interface AIClassificationResult {
    success: boolean;
    insights: ClauseInsight[];
    error?: string;
}

export interface ClauseInsight {
    clauseType: string;
    assessment: 'normal' | 'concerning' | 'unclear';
    explanation: string;
    recommendation?: string;
}

const SYSTEM_PROMPT = `You are an educational assistant helping workers understand employment contracts. 
You will analyze contract text and identify clauses, assess whether they seem normal or concerning, and explain in plain language.

IMPORTANT: This is for EDUCATIONAL purposes only. You are NOT providing legal advice.

For each clause you identify, provide:
1. clauseType: The type of clause (salary, hours, termination, etc.)
2. assessment: "normal", "concerning", or "unclear"
3. explanation: A plain-language explanation
4. recommendation: What the worker should consider (optional)

Respond in JSON format only.`;

/**
 * Use AI to analyze contract clauses (optional, requires API key)
 */
export async function classifyClausesWithAI(text: string): Promise<AIClassificationResult> {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
        return {
            success: false,
            insights: [],
            error: 'AI analysis unavailable - no API key configured',
        };
    }

    try {
        // Limit text length to avoid token limits
        const truncatedText = text.slice(0, 8000);

        const { text: response } = await generateText({
            model: openai('gpt-4o-mini'),
            system: SYSTEM_PROMPT,
            prompt: `Analyze this employment contract excerpt and identify any clauses that workers should pay attention to. Focus on educational insights.

Contract text:
${truncatedText}

Respond with a JSON object containing an "insights" array. Each insight should have clauseType, assessment, explanation, and optionally recommendation.`,
        });

        // Parse the JSON response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return {
                success: false,
                insights: [],
                error: 'Failed to parse AI response',
            };
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return {
            success: true,
            insights: parsed.insights || [],
        };
    } catch (error) {
        return {
            success: false,
            insights: [],
            error: error instanceof Error ? error.message : 'AI analysis failed',
        };
    }
}

/**
 * Quick AI-assisted red flag check
 */
export async function quickAICheck(text: string): Promise<{
    hasHighRiskFlags: boolean;
    summary: string;
}> {
    if (!process.env.OPENAI_API_KEY) {
        return {
            hasHighRiskFlags: false,
            summary: 'AI check unavailable',
        };
    }

    try {
        const truncatedText = text.slice(0, 4000);

        const { text: response } = await generateText({
            model: openai('gpt-4o-mini'),
            system: 'You are assessing employment contracts for educational purposes. Be concise.',
            prompt: `In 2-3 sentences, summarize any concerning elements in this contract excerpt. If nothing concerning, say so briefly.

Contract: ${truncatedText}`,
        });

        const hasHighRiskFlags = response.toLowerCase().includes('concern') ||
            response.toLowerCase().includes('caution') ||
            response.toLowerCase().includes('risk');

        return {
            hasHighRiskFlags,
            summary: response,
        };
    } catch {
        return {
            hasHighRiskFlags: false,
            summary: 'AI check unavailable',
        };
    }
}
