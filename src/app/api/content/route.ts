import { NextResponse } from 'next/server';

const educationalContent = [
    {
        id: '1',
        title: 'Job Role & Duties',
        slug: 'job-role',
        category: 'contract-basics',
        summary: 'Understanding what your job description defines and why clarity matters.',
        content: `Your job description is one of the most important parts of your employment contract. It defines your responsibilities, your position title, and sets expectations for your daily work.

**What to look for:**
- Specific job title that matches industry standards
- Clear list of main responsibilities
- Reporting structure (who you report to)
- Any supervisory responsibilities

**Why it matters:**
Clear job duties protect you from being asked to do work outside your role. Vague descriptions with phrases like "other duties as assigned" can lead to scope creep and potential exploitation.`,
        order: 1,
    },
    {
        id: '2',
        title: 'Salary & Payment',
        slug: 'salary',
        category: 'contract-basics',
        summary: 'How and when you get paid - understanding your compensation terms.',
        content: `Your salary section covers everything related to compensation. This includes base salary, bonuses, commissions, and when/how you'll be paid.

**Key elements:**
- Specific salary amount (not a range)
- Payment frequency (weekly, bi-weekly, monthly)
- Overtime compensation policy
- Bonus structure and criteria

**Red flags:**
- Salary listed as "competitive" or "to be discussed"
- No mention of overtime
- Deductions that aren't clearly explained`,
        order: 2,
    },
    {
        id: '3',
        title: 'Working Hours',
        slug: 'working-hours',
        category: 'contract-basics',
        summary: 'Understanding your expected hours and overtime policies.',
        content: `This section defines your standard working hours, break times, and policies around overtime or flexible working.

**What to expect:**
- Standard weekly hours (typically 35-40 hours)
- Core hours if applicable
- Overtime policy and compensation
- Remote work or flexibility terms

**Warning signs:**
- "Unlimited" or "as needed" hours
- No overtime policy mentioned
- Expected to be "always available"`,
        order: 3,
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');

    let filtered = educationalContent;

    if (category) {
        filtered = filtered.filter(c => c.category === category);
    }

    if (slug) {
        const item = filtered.find(c => c.slug === slug);
        return NextResponse.json(item || null);
    }

    return NextResponse.json(filtered);
}
