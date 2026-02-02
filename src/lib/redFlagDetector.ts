export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RedFlag {
    id: string;
    title: string;
    description: string;
    riskLevel: RiskLevel;
    matchedText: string;
    explanation: string;
    learnMoreLink: string;
    category: string;
}

export interface ClauseSegment {
    type: string;
    title: string;
    content: string;
    startIndex: number;
    endIndex: number;
}

export interface AnalysisResult {
    overallRisk: RiskLevel;
    riskScore: number; // 0-100
    redFlags: RedFlag[];
    clauses: ClauseSegment[];
    summary: string;
}

// Pattern definitions for red flag detection
interface PatternDefinition {
    id: string;
    title: string;
    patterns: RegExp[];
    riskLevel: RiskLevel;
    explanation: string;
    learnMoreLink: string;
    category: string;
}

const RED_FLAG_PATTERNS: PatternDefinition[] = [
    {
        id: 'salary-unclear',
        title: 'Missing or Unclear Salary',
        patterns: [
            /salary\s*(will be|to be|shall be)\s*(discussed|determined|negotiated)/i,
            /compensation\s*(as per|based on|according to)\s*(industry|market|company)\s*standards?/i,
            /competitive\s*(salary|compensation|pay)/i,
            /remuneration\s*(details|terms)\s*(to follow|tbd|to be determined)/i,
        ],
        riskLevel: 'HIGH',
        explanation: 'Your contract should state a specific salary amount. Vague terms like "competitive" or "to be discussed" leave room for disagreement later.',
        learnMoreLink: '/learn#salary',
        category: 'payment',
    },
    {
        id: 'unlimited-hours',
        title: 'Unlimited or Undefined Working Hours',
        patterns: [
            /work(ing)?\s*hours?\s*(as\s*)?(required|needed|necessary)/i,
            /flexible\s*hours?\s*as\s*(business\s*)?needs?\s*(require|dictate)/i,
            /no\s*(set|fixed|defined)\s*(working\s*)?hours?/i,
            /hours?\s*may\s*(vary|change)\s*(significantly|substantially)?/i,
            /expected\s*to\s*(work|be available)\s*(at all times|24\/7|around the clock)/i,
            /unlimited\s*(working\s*)?hours?/i,
        ],
        riskLevel: 'HIGH',
        explanation: 'Without defined working hours, you could be expected to work excessive overtime without additional compensation.',
        learnMoreLink: '/learn#working-hours',
        category: 'hours',
    },
    {
        id: 'termination-no-notice',
        title: 'Termination Without Notice',
        patterns: [
            /terminat(e|ion)\s*(immediately|without\s*notice|at\s*will)/i,
            /employment\s*may\s*be\s*terminated\s*at\s*any\s*time/i,
            /employer\s*reserves?\s*(the\s*)?right\s*to\s*terminat/i,
            /dismiss(al)?\s*without\s*(prior\s*)?notice/i,
            /no\s*notice\s*period\s*(is\s*)?(required|necessary)/i,
        ],
        riskLevel: 'HIGH',
        explanation: 'You should have a reasonable notice period (typically 2-4 weeks) to find new employment if terminated.',
        learnMoreLink: '/learn#termination',
        category: 'termination',
    },
    {
        id: 'excessive-probation',
        title: 'Excessive Probation Period',
        patterns: [
            /probation(ary)?\s*(period)?\s*(of\s*)?(12|eighteen|24|twelve)\s*months?/i,
            /probation(ary)?\s*(period)?\s*(of\s*)?(1|one|2|two)\s*years?/i,
            /extended\s*probation(ary)?\s*period/i,
            /probation\s*may\s*be\s*extended\s*(indefinitely|without\s*limit)/i,
        ],
        riskLevel: 'MEDIUM',
        explanation: 'Probation periods over 6 months are unusual. During probation, you typically have fewer protections and shorter notice periods.',
        learnMoreLink: '/learn#probation',
        category: 'probation',
    },
    {
        id: 'broad-non-compete',
        title: 'Overly Broad Non-Compete Clause',
        patterns: [
            /non-?compete\s*(clause|agreement|covenant)?\s*(of\s*)?(2|3|4|5|two|three|four|five)\s*years?/i,
            /worldwide\s*(non-?compete|restriction)/i,
            /global(ly)?\s*restrict(ed|ion)/i,
            /prohibit(ed|s)?\s*from\s*working\s*(in|for)\s*(any|the\s*entire)\s*industry/i,
            /shall\s*not\s*(work|engage|compete)\s*(anywhere|globally)/i,
        ],
        riskLevel: 'MEDIUM',
        explanation: 'Non-compete clauses should be limited in scope (specific competitors), geography (reasonable area), and time (6-12 months typically).',
        learnMoreLink: '/learn#non-compete',
        category: 'restrictions',
    },
    {
        id: 'resignation-penalty',
        title: 'Financial Penalty for Resignation',
        patterns: [
            /(penalty|fee|fine)\s*(for|upon|if)\s*(early\s*)?(resign|leav|terminat)/i,
            /forfeit(ure)?\s*(of\s*)?(wages?|salary|bonus|payment)/i,
            /(pay|repay|reimburse)\s*(training|costs?|expenses?)\s*(if|upon)\s*(you\s*)?(resign|leave)/i,
            /deduct(ion)?\s*from\s*(final\s*)?(pay|salary)\s*(if|upon)\s*(resign|early)/i,
            /bond\s*(period|amount|requirement)/i,
        ],
        riskLevel: 'HIGH',
        explanation: 'Requiring payment for resigning may not be legal in many jurisdictions. You should be able to leave your job without financial penalties.',
        learnMoreLink: '/learn#termination',
        category: 'termination',
    },
    {
        id: 'one-sided-confidentiality',
        title: 'One-Sided Confidentiality Clause',
        patterns: [
            /employee\s*(shall|must|agrees?\s*to)\s*(not\s*)?(disclose|share|reveal)\s*(any|all)\s*information/i,
            /all\s*information\s*(is|shall be|will be)\s*(considered\s*)?confidential/i,
            /perpetual\s*confidentiality/i,
            /confidentiality\s*(obligations?\s*)?(survive|continue)\s*indefinitely/i,
            /unlimited\s*confidentiality\s*(obligations?|period)/i,
        ],
        riskLevel: 'MEDIUM',
        explanation: 'Confidentiality should be mutual and limited to genuinely sensitive business information, not general knowledge or skills you develop.',
        learnMoreLink: '/learn#non-compete',
        category: 'restrictions',
    },
    {
        id: 'no-overtime-pay',
        title: 'No Overtime Compensation',
        patterns: [
            /no\s*(additional\s*)?(overtime\s*)?(pay|compensation|payment)/i,
            /overtime\s*(is\s*)?(not\s*)?(compensat|paid|payable)/i,
            /salary\s*(includes?|covers?)\s*(all\s*)?overtime/i,
            /exempt\s*from\s*overtime/i,
            /inclusive\s*of\s*(all\s*)?hours?\s*worked/i,
        ],
        riskLevel: 'MEDIUM',
        explanation: 'In many places, employers are legally required to pay overtime. Make sure you understand your overtime rights.',
        learnMoreLink: '/learn#working-hours',
        category: 'payment',
    },
    {
        id: 'ip-assignment-broad',
        title: 'Broad Intellectual Property Assignment',
        patterns: [
            /all\s*(intellectual\s*property|inventions?|creations?|works?)\s*(belong|assigned|transfer)/i,
            /(ip|intellectual\s*property)\s*created\s*(at\s*any\s*time|outside\s*work)/i,
            /assign\s*(all\s*)?(rights?|ownership)\s*(in\s*)?(any|all)\s*(work|invention)/i,
            /work\s*for\s*hire\s*(includes?|covers?)\s*(personal|outside)\s*(time|projects?)/i,
        ],
        riskLevel: 'LOW',
        explanation: 'IP clauses should only cover work created during employment hours using company resources, not personal projects.',
        learnMoreLink: '/learn#non-compete',
        category: 'restrictions',
    },
    {
        id: 'unilateral-changes',
        title: 'Unilateral Contract Changes',
        patterns: [
            /employer\s*(may|can|reserves?\s*(the\s*)?right\s*to)\s*(change|modify|amend)\s*(terms?|conditions?)/i,
            /(terms?|conditions?)\s*(may|can)\s*be\s*(changed|modified)\s*(at\s*)?(any\s*time|sole\s*discretion)/i,
            /without\s*(prior\s*)?notice\s*(or\s*)?consent/i,
            /reserves?\s*(the\s*)?right\s*to\s*(alter|vary)\s*(your\s*)?(duties|role|responsibilities)/i,
        ],
        riskLevel: 'MEDIUM',
        explanation: 'Significant contract changes should require mutual agreement. One-sided change clauses can leave you vulnerable.',
        learnMoreLink: '/learn#job-role',
        category: 'general',
    },
];

// Clause type patterns for segmentation
const CLAUSE_PATTERNS: { type: string; title: string; patterns: RegExp[] }[] = [
    {
        type: 'salary',
        title: 'Salary & Compensation',
        patterns: [/\b(salary|compensation|remuneration|pay|wage|earning)/i],
    },
    {
        type: 'hours',
        title: 'Working Hours',
        patterns: [/\b(working hours?|work hours?|office hours?|schedule|overtime)/i],
    },
    {
        type: 'leave',
        title: 'Leave & Benefits',
        patterns: [/\b(leave|vacation|holiday|sick|benefit|insurance|pension)/i],
    },
    {
        type: 'termination',
        title: 'Termination',
        patterns: [/\b(termination|notice period|resignation|dismissal|end of employment)/i],
    },
    {
        type: 'probation',
        title: 'Probation Period',
        patterns: [/\b(probation|trial period|initial period)/i],
    },
    {
        type: 'confidentiality',
        title: 'Confidentiality',
        patterns: [/\b(confidential|non-disclosure|nda|trade secret|proprietary)/i],
    },
    {
        type: 'non-compete',
        title: 'Non-Compete & Restrictions',
        patterns: [/\b(non-?compete|non-?solicitation|restriction|covenant)/i],
    },
    {
        type: 'ip',
        title: 'Intellectual Property',
        patterns: [/\b(intellectual property|invention|patent|copyright|work for hire)/i],
    },
    {
        type: 'duties',
        title: 'Job Role & Duties',
        patterns: [/\b(duties|responsibilities|role|position|job description)/i],
    },
];

/**
 * Segment contract text into clauses
 */
export function segmentContract(text: string): ClauseSegment[] {
    const segments: ClauseSegment[] = [];
    const paragraphs = text.split(/\n\n+/);

    let currentIndex = 0;

    for (const paragraph of paragraphs) {
        if (paragraph.trim().length < 20) {
            currentIndex += paragraph.length + 2;
            continue;
        }

        // Determine clause type
        let clauseType = 'general';
        let clauseTitle = 'General Terms';

        for (const pattern of CLAUSE_PATTERNS) {
            if (pattern.patterns.some(p => p.test(paragraph))) {
                clauseType = pattern.type;
                clauseTitle = pattern.title;
                break;
            }
        }

        segments.push({
            type: clauseType,
            title: clauseTitle,
            content: paragraph.trim(),
            startIndex: currentIndex,
            endIndex: currentIndex + paragraph.length,
        });

        currentIndex += paragraph.length + 2;
    }

    return segments;
}

/**
 * Detect red flags in contract text
 */
export function detectRedFlags(text: string): RedFlag[] {
    const redFlags: RedFlag[] = [];
    const normalizedText = text.toLowerCase();

    for (const pattern of RED_FLAG_PATTERNS) {
        for (const regex of pattern.patterns) {
            const match = text.match(regex);
            if (match) {
                // Extract context around the match
                const matchIndex = text.toLowerCase().indexOf(match[0].toLowerCase());
                const contextStart = Math.max(0, matchIndex - 50);
                const contextEnd = Math.min(text.length, matchIndex + match[0].length + 50);
                const matchedText = text.substring(contextStart, contextEnd).trim();

                // Avoid duplicates
                if (!redFlags.some(rf => rf.id === pattern.id)) {
                    redFlags.push({
                        id: pattern.id,
                        title: pattern.title,
                        description: `Found: "${match[0]}"`,
                        riskLevel: pattern.riskLevel,
                        matchedText: `...${matchedText}...`,
                        explanation: pattern.explanation,
                        learnMoreLink: pattern.learnMoreLink,
                        category: pattern.category,
                    });
                }
                break; // Only match once per pattern
            }
        }
    }

    return redFlags;
}

/**
 * Calculate overall risk score
 */
export function calculateRiskScore(redFlags: RedFlag[]): { score: number; level: RiskLevel } {
    if (redFlags.length === 0) {
        return { score: 10, level: 'LOW' };
    }

    let totalPoints = 0;
    for (const flag of redFlags) {
        switch (flag.riskLevel) {
            case 'HIGH':
                totalPoints += 25;
                break;
            case 'MEDIUM':
                totalPoints += 15;
                break;
            case 'LOW':
                totalPoints += 5;
                break;
        }
    }

    const score = Math.min(100, totalPoints);

    let level: RiskLevel = 'LOW';
    if (score >= 50) {
        level = 'HIGH';
    } else if (score >= 25) {
        level = 'MEDIUM';
    }

    return { score, level };
}

/**
 * Generate analysis summary
 */
export function generateSummary(redFlags: RedFlag[], riskLevel: RiskLevel): string {
    if (redFlags.length === 0) {
        return 'No obvious red flags detected. This is a good sign, but we recommend reading the full contract carefully and consulting a legal professional if you have any concerns.';
    }

    const highCount = redFlags.filter(rf => rf.riskLevel === 'HIGH').length;
    const mediumCount = redFlags.filter(rf => rf.riskLevel === 'MEDIUM').length;

    if (riskLevel === 'HIGH') {
        return `We found ${redFlags.length} potential issues, including ${highCount} high-risk red flags. We strongly recommend consulting with a legal professional before signing this contract.`;
    }

    if (riskLevel === 'MEDIUM') {
        return `We found ${redFlags.length} potential issues that deserve attention. Consider asking your employer about these points or consulting a legal professional.`;
    }

    return `We found ${redFlags.length} minor points worth noting. Overall, this contract appears reasonable, but always read carefully before signing.`;
}

/**
 * Full contract analysis
 */
export function analyzeContract(text: string): AnalysisResult {
    const clauses = segmentContract(text);
    const redFlags = detectRedFlags(text);
    const { score, level } = calculateRiskScore(redFlags);
    const summary = generateSummary(redFlags, level);

    return {
        overallRisk: level,
        riskScore: score,
        redFlags,
        clauses,
        summary,
    };
}
