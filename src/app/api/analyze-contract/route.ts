import { NextResponse } from 'next/server';
import { extractText, detectFileType } from '@/lib/extractText';
import { analyzeContract } from '@/lib/redFlagDetector';
import { classifyClausesWithAI } from '@/lib/clauseClassifier';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request: Request) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        const useAI = formData.get('useAI') === 'true';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 5MB.' },
                { status: 400 }
            );
        }

        // Validate file type
        const fileType = detectFileType(file.type, file.name);
        if (!fileType) {
            return NextResponse.json(
                { error: 'Unsupported file type. Please upload PDF, DOCX, or TXT.' },
                { status: 400 }
            );
        }

        // Read file into buffer (in-memory only)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Extract text
        const extractionResult = await extractText(buffer, fileType);

        if (!extractionResult.success) {
            return NextResponse.json(
                { error: extractionResult.error || 'Failed to extract text from file' },
                { status: 422 }
            );
        }

        // Check minimum text length
        if (extractionResult.text.trim().length < 100) {
            return NextResponse.json(
                { error: 'Document appears to be empty or too short to analyze' },
                { status: 422 }
            );
        }

        // Analyze contract
        const analysis = analyzeContract(extractionResult.text);

        // Optional AI classification
        let aiInsights = null;
        if (useAI && process.env.OPENAI_API_KEY) {
            const aiResult = await classifyClausesWithAI(extractionResult.text);
            if (aiResult.success) {
                aiInsights = aiResult.insights;
            }
        }

        // Return analysis results (no file stored)
        return NextResponse.json({
            success: true,
            analysis: {
                ...analysis,
                aiInsights,
                textLength: extractionResult.text.length,
                pageCount: extractionResult.pageCount,
            },
            disclaimer: 'This analysis is for educational purposes only and does not constitute legal advice. Please consult a qualified legal professional for specific guidance on your contract.',
        });

    } catch (error) {
        console.error('Contract analysis error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred during analysis' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        info: 'Contract Analysis API',
        supportedFormats: ['PDF', 'DOCX', 'TXT'],
        maxFileSize: '5MB',
        rateLimit: '10 requests per hour',
        disclaimer: 'Educational purposes only. Not legal advice.',
    });
}
