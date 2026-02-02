import Link from 'next/link';
import {
    BookOpen,
    DollarSign,
    Clock,
    Calendar,
    FileX,
    Shield,
    Briefcase,
    AlertCircle,
    ChevronRight,
    CheckCircle2
} from 'lucide-react';

const contractSections = [
    {
        slug: 'job-role',
        icon: Briefcase,
        title: 'Job Role & Duties',
        summary: "What you're expected to do",
        description: 'Your job description defines your responsibilities. A vague description could mean unexpected duties later.',
        whatItMeans: 'This section outlines your position title and the tasks you\'ll perform. It sets expectations for your daily work.',
        whyItMatters: 'Clear job duties protect you from being asked to do work outside your role. Vague descriptions can lead to exploitation.',
        whatIsNormal: ['Specific job title', 'List of main responsibilities', 'Reporting structure'],
        whatIsRisky: ['Vague phrases like "other duties as assigned"', 'No clear job description', 'Responsibilities that don\'t match the title'],
    },
    {
        slug: 'salary',
        icon: DollarSign,
        title: 'Salary & Payment',
        summary: 'How and when you get paid',
        description: 'Clear payment terms are essential. Know your base salary, payment schedule, and any deductions.',
        whatItMeans: 'This covers your compensation including base salary, bonuses, commissions, and when/how you\'ll be paid.',
        whyItMatters: 'Unclear payment terms can lead to delayed payments, unexpected deductions, or disputes about what you\'re owed.',
        whatIsNormal: ['Specific salary amount', 'Payment frequency (weekly/monthly)', 'Overtime rates if applicable'],
        whatIsRisky: ['Salary "to be discussed"', 'No overtime mentioned', 'Unexplained deductions'],
    },
    {
        slug: 'working-hours',
        icon: Clock,
        title: 'Working Hours',
        summary: 'When and how much you work',
        description: 'Understand your expected hours, overtime policies, and flexibility arrangements.',
        whatItMeans: 'This defines your standard working hours, break times, and policies around overtime or flexible working.',
        whyItMatters: 'Unclear hours can lead to unpaid overtime or unrealistic expectations. Know what\'s expected of you.',
        whatIsNormal: ['Specific weekly hours (e.g., 40 hours)', 'Core hours defined', 'Overtime compensation policy'],
        whatIsRisky: ['"Unlimited" or "as needed" hours', 'No overtime policy', 'On-call without compensation'],
    },
    {
        slug: 'leave-benefits',
        icon: Calendar,
        title: 'Leave & Benefits',
        summary: 'Your time off and perks',
        description: 'Know your entitlements for vacation, sick leave, parental leave, and other benefits.',
        whatItMeans: 'This section covers paid time off, health benefits, retirement plans, and other perks your employer provides.',
        whyItMatters: 'Benefits are part of your total compensation. Missing or unclear benefits could mean you\'re underpaid.',
        whatIsNormal: ['Specific vacation days per year', 'Sick leave policy', 'Health insurance details'],
        whatIsRisky: ['No mention of leave', '"Unlimited PTO" without clarity', 'Benefits "at employer discretion"'],
    },
    {
        slug: 'termination',
        icon: FileX,
        title: 'Termination Clauses',
        summary: 'How your job can end',
        description: 'Understand notice periods, grounds for termination, and what happens when you leave.',
        whatItMeans: 'This outlines how either party can end the employment, including notice requirements and severance.',
        whyItMatters: 'You need to know your rights if you want to leave or if you\'re let go. Unfair termination clauses can trap you.',
        whatIsNormal: ['Mutual notice period (2-4 weeks)', 'Clear grounds for termination', 'Severance terms'],
        whatIsRisky: ['Termination "at will" without notice', 'Penalties for resigning', 'Forfeiture of earned wages'],
    },
    {
        slug: 'non-compete',
        icon: Shield,
        title: 'Non-Compete Clauses',
        summary: 'Restrictions after you leave',
        description: 'Some contracts limit where you can work next. Know what you\'re agreeing to.',
        whatItMeans: 'Non-compete clauses restrict you from working for competitors or starting a similar business after leaving.',
        whyItMatters: 'Overly broad non-competes can severely limit your career options. Some may not be enforceable.',
        whatIsNormal: ['Reasonable time limit (6-12 months)', 'Limited geographic scope', 'Specific to direct competitors'],
        whatIsRisky: ['Multi-year restrictions', 'Worldwide scope', 'Covers entire industry'],
    },
    {
        slug: 'probation',
        icon: AlertCircle,
        title: 'Probation Period',
        summary: 'Your trial period terms',
        description: 'Most jobs have a trial period with different rules. Know what protections apply.',
        whatItMeans: 'A probation period is a trial phase where you (and your employer) can end the relationship more easily.',
        whyItMatters: 'During probation, you may have fewer protections. Know the duration and what changes after.',
        whatIsNormal: ['3-6 month probation', 'Shorter notice period during probation', 'Clear end date'],
        whatIsRisky: ['Probation over 6 months', 'Extended probation without reason', 'No confirmation of passing'],
    },
];

export default function LearnPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-16">
                <div className="container">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
                            <BookOpen className="w-4 h-4" />
                            <span>Education Hub</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Learn About Employment Contracts
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl">
                            Every contract section explained in plain language. Understand what you're signing,
                            what's normal, and what should raise concerns.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contract Sections Grid */}
            <section className="section">
                <div className="container">
                    <div className="grid gap-6">
                        {contractSections.map((section, index) => (
                            <div key={section.slug} className="card overflow-hidden">
                                <div className="p-6 md:p-8">
                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--primary-navy)]/5 flex items-center justify-center">
                                            <section.icon className="w-6 h-6 text-[var(--primary-navy)]" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold mb-1">{section.title}</h2>
                                            <p className="text-[var(--foreground-muted)]">{section.summary}</p>
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* What It Means */}
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-semibold text-sm text-[var(--secondary-teal)] uppercase tracking-wide mb-2">
                                                    What This Means
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {section.whatItMeans}
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-sm text-[var(--secondary-teal)] uppercase tracking-wide mb-2">
                                                    Why It Matters
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {section.whyItMatters}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Normal vs Risky */}
                                        <div className="grid gap-4">
                                            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                                <h3 className="font-semibold text-sm text-green-800 mb-3 flex items-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    What's Normal
                                                </h3>
                                                <ul className="space-y-2">
                                                    {section.whatIsNormal.map((item, i) => (
                                                        <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                                                            <span className="text-green-500 mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                                <h3 className="font-semibold text-sm text-red-800 mb-3 flex items-center gap-2">
                                                    <AlertCircle className="w-4 h-4" />
                                                    What's Risky
                                                </h3>
                                                <ul className="space-y-2">
                                                    {section.whatIsRisky.map((item, i) => (
                                                        <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                                                            <span className="text-red-500 mt-1">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-[var(--background)]">
                <div className="container">
                    <div className="card p-8 md:p-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Ready to Check Your Contract?</h2>
                        <p className="text-[var(--foreground-muted)] mb-6">
                            Use our self-check tool to identify potential issues in your specific contract.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/check" className="btn btn-primary">
                                Start Contract Check
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                            <Link href="/red-flags" className="btn btn-secondary">
                                View Red Flags
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
