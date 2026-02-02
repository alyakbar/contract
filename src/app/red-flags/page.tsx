'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    AlertTriangle,
    AlertCircle,
    CheckCircle2,
    ChevronRight,
    Info,
    Filter,
    X
} from 'lucide-react';

const redFlags = [
    {
        id: 1,
        title: 'Salary not clearly stated',
        description: 'The contract doesn\'t specify an exact salary amount or uses vague terms like "competitive" or "to be discussed."',
        riskLevel: 'HIGH',
        action: 'Request a specific salary amount in writing before signing. Never sign without knowing your exact pay.',
        category: 'payment',
    },
    {
        id: 2,
        title: 'Unlimited or undefined working hours',
        description: 'No clear statement of working hours, or phrases like "as required" or "flexible hours" without limits.',
        riskLevel: 'HIGH',
        action: 'Ask for specific hours to be added. If they say "flexible," ask what the maximum expected hours are.',
        category: 'hours',
    },
    {
        id: 3,
        title: 'Termination without notice',
        description: 'The employer can fire you immediately without any notice period, but you must give notice to leave.',
        riskLevel: 'HIGH',
        action: 'Negotiate for mutual notice periods. Both parties should have equal notice requirements.',
        category: 'termination',
    },
    {
        id: 4,
        title: 'Penalty for resigning',
        description: 'You\'re required to pay a fee or forfeit wages if you resign before a certain date.',
        riskLevel: 'HIGH',
        action: 'This may not be legal in your jurisdiction. Consult a legal professional before signing.',
        category: 'termination',
    },
    {
        id: 5,
        title: 'No written contract provided',
        description: 'The employer wants you to start work without providing a written contract.',
        riskLevel: 'HIGH',
        action: 'Always insist on a written contract before starting work. Verbal agreements are hard to prove.',
        category: 'general',
    },
    {
        id: 6,
        title: 'Overly broad non-compete clause',
        description: 'Restrictions that prevent you from working in your industry for years or across wide geographic areas.',
        riskLevel: 'MEDIUM',
        action: 'Try to negotiate narrower terms. Long or broad non-competes may not be enforceable.',
        category: 'restrictions',
    },
    {
        id: 7,
        title: 'No overtime compensation',
        description: 'The contract doesn\'t mention overtime or says overtime is included in your salary.',
        riskLevel: 'MEDIUM',
        action: 'Ask for clarity on overtime policies. Check if this is legal for your position type.',
        category: 'payment',
    },
    {
        id: 8,
        title: 'Vague job description',
        description: 'Your role and responsibilities are not clearly defined, or include "other duties as assigned."',
        riskLevel: 'MEDIUM',
        action: 'Request a detailed job description. Ask what percentage of time goes to each responsibility.',
        category: 'general',
    },
    {
        id: 9,
        title: 'Extended probation period',
        description: 'Probation period longer than 6 months, or can be extended indefinitely.',
        riskLevel: 'MEDIUM',
        action: 'Ask for a maximum probation length and clear criteria for passing probation.',
        category: 'general',
    },
    {
        id: 10,
        title: 'Benefits at employer discretion',
        description: 'Benefits like bonuses, leave, or insurance are stated as "may be provided" or "at company discretion."',
        riskLevel: 'LOW',
        action: 'Ask for guaranteed benefits to be stated clearly. Understand what\'s promised vs optional.',
        category: 'benefits',
    },
    {
        id: 11,
        title: 'No sick leave policy',
        description: 'The contract doesn\'t mention sick leave or only offers unpaid sick days.',
        riskLevel: 'LOW',
        action: 'Ask about sick leave policies. Check minimum legal requirements in your area.',
        category: 'benefits',
    },
    {
        id: 12,
        title: 'Intellectual property assignment',
        description: 'All work you create, even outside work hours, belongs to the company.',
        riskLevel: 'LOW',
        action: 'Negotiate to limit IP assignment to work created during work hours using company resources.',
        category: 'restrictions',
    },
];

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'payment', label: 'Payment & Salary' },
    { value: 'hours', label: 'Working Hours' },
    { value: 'termination', label: 'Termination' },
    { value: 'benefits', label: 'Benefits & Leave' },
    { value: 'restrictions', label: 'Restrictions' },
    { value: 'general', label: 'General' },
];

const riskColors = {
    HIGH: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', badge: 'badge-high' },
    MEDIUM: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'badge-medium' },
    LOW: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', badge: 'badge-low' },
};

export default function RedFlagsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [checkedFlags, setCheckedFlags] = useState<number[]>([]);

    const filteredFlags = selectedCategory === 'all'
        ? redFlags
        : redFlags.filter(flag => flag.category === selectedCategory);

    const toggleFlag = (id: number) => {
        setCheckedFlags(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const highRiskChecked = checkedFlags.filter(id =>
        redFlags.find(f => f.id === id)?.riskLevel === 'HIGH'
    ).length;

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-16">
                <div className="container">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 rounded-full text-sm mb-6 text-red-200">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Red Flags Checklist</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Spot the Warning Signs 🚩
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl">
                            Use this interactive checklist to identify potential problems in your contract.
                            Check the boxes for any issues you've spotted.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            {checkedFlags.length > 0 && (
                <div className="sticky top-16 z-40 bg-white border-b border-gray-200 py-4 shadow-sm">
                    <div className="container">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Flagged issues:</span>
                                    <span className="font-semibold text-[var(--primary-navy)]">{checkedFlags.length}</span>
                                </div>
                                {highRiskChecked > 0 && (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-sm font-medium">{highRiskChecked} high-risk</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setCheckedFlags([])}
                                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all
                                </button>
                                <Link href="/support" className="btn btn-primary text-sm py-2 px-4">
                                    Get Legal Help
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter */}
            <section className="py-6 bg-[var(--background)] border-b border-gray-200">
                <div className="container">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                        <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                        {categories.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.value
                                        ? 'bg-[var(--primary-navy)] text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Red Flags List */}
            <section className="section pt-8">
                <div className="container">
                    <div className="grid gap-4">
                        {filteredFlags.map((flag) => {
                            const isChecked = checkedFlags.includes(flag.id);
                            const colors = riskColors[flag.riskLevel as keyof typeof riskColors];

                            return (
                                <div
                                    key={flag.id}
                                    onClick={() => toggleFlag(flag.id)}
                                    className={`card p-6 cursor-pointer transition-all ${isChecked ? `${colors.bg} ${colors.border} border-2` : 'hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Checkbox */}
                                        <div className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${isChecked
                                                ? 'bg-[var(--primary-navy)] border-[var(--primary-navy)]'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }`}>
                                            {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className={`font-semibold ${isChecked ? colors.text : 'text-gray-900'}`}>
                                                    {flag.title}
                                                </h3>
                                                <span className={`badge ${colors.badge} shrink-0`}>
                                                    {flag.riskLevel}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">{flag.description}</p>

                                            {/* Action */}
                                            <div className="p-3 bg-white/80 rounded-lg border border-gray-100 flex items-start gap-2">
                                                <Info className="w-4 h-4 text-[var(--secondary-teal)] shrink-0 mt-0.5" />
                                                <div>
                                                    <span className="text-xs font-semibold text-[var(--secondary-teal)] uppercase tracking-wide">What to do</span>
                                                    <p className="text-sm text-gray-600 mt-1">{flag.action}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Summary CTA */}
            <section className="py-16 bg-[var(--background)]">
                <div className="container">
                    <div className="card p-8 md:p-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Found Some Red Flags?</h2>
                        <p className="text-[var(--foreground-muted)] mb-6">
                            If you've identified concerning clauses, consider speaking with a legal professional
                            before signing your contract.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/support" className="btn btn-primary">
                                Find Legal Support
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                            <Link href="/check" className="btn btn-secondary">
                                Use Contract Checker
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
