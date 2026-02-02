'use client';

import Link from 'next/link';
import {
    AlertTriangle,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Calendar,
    Shield,
    FileText
} from 'lucide-react';
import { useState } from 'react';

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

export interface AnalysisData {
    overallRisk: RiskLevel;
    riskScore: number;
    redFlags: RedFlag[];
    clauses: ClauseSegment[];
    summary: string;
    aiInsights?: any[];
    textLength?: number;
    pageCount?: number;
}

interface AnalysisResultsProps {
    analysis: AnalysisData;
    onReset: () => void;
}

export default function AnalysisResults({ analysis, onReset }: AnalysisResultsProps) {
    const [expandedFlags, setExpandedFlags] = useState<Set<string>>(new Set());

    const toggleFlag = (id: string) => {
        const newExpanded = new Set(expandedFlags);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedFlags(newExpanded);
    };

    const getRiskColor = (level: RiskLevel) => {
        switch (level) {
            case 'HIGH': return 'red';
            case 'MEDIUM': return 'amber';
            case 'LOW': return 'green';
        }
    };

    const getRiskIcon = (level: RiskLevel) => {
        switch (level) {
            case 'HIGH': return AlertTriangle;
            case 'MEDIUM': return AlertCircle;
            case 'LOW': return CheckCircle2;
        }
    };

    const RiskIcon = getRiskIcon(analysis.overallRisk);
    const riskColor = getRiskColor(analysis.overallRisk);

    const highFlags = analysis.redFlags.filter(f => f.riskLevel === 'HIGH');
    const mediumFlags = analysis.redFlags.filter(f => f.riskLevel === 'MEDIUM');
    const lowFlags = analysis.redFlags.filter(f => f.riskLevel === 'LOW');

    return (
        <div className="space-y-8">
            {/* Disclaimer Banner */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-amber-800">Educational Guidance Only</p>
                        <p className="text-sm text-amber-700">
                            This analysis is for educational purposes and does not constitute legal advice.
                            Please consult a qualified legal professional before signing any contract.
                        </p>
                    </div>
                </div>
            </div>

            {/* Risk Summary Dashboard */}
            <div className="card p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Risk Score Circle */}
                    <div className="relative w-32 h-32 shrink-0">
                        <svg className="w-full h-full -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke="#e5e7eb"
                                strokeWidth="12"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                fill="none"
                                stroke={riskColor === 'red' ? '#ef4444' : riskColor === 'amber' ? '#f59e0b' : '#22c55e'}
                                strokeWidth="12"
                                strokeDasharray={`${(analysis.riskScore / 100) * 352} 352`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-900">{analysis.riskScore}</span>
                            <span className="text-xs text-gray-500 uppercase">Risk Score</span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <RiskIcon className={`w-6 h-6 text-${riskColor}-500`} style={{
                                color: riskColor === 'red' ? '#ef4444' : riskColor === 'amber' ? '#f59e0b' : '#22c55e'
                            }} />
                            <h2 className="text-xl font-bold text-gray-900">
                                {analysis.overallRisk} Risk Level
                            </h2>
                        </div>
                        <p className="text-gray-600 mb-4">{analysis.summary}</p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-3">
                            {highFlags.length > 0 && (
                                <span className="badge badge-high">{highFlags.length} High Risk</span>
                            )}
                            {mediumFlags.length > 0 && (
                                <span className="badge badge-medium">{mediumFlags.length} Medium Risk</span>
                            )}
                            {lowFlags.length > 0 && (
                                <span className="badge badge-low">{lowFlags.length} Low Risk</span>
                            )}
                            {analysis.redFlags.length === 0 && (
                                <span className="badge badge-low">No Issues Found</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Red Flags List */}
            {analysis.redFlags.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Detected Issues ({analysis.redFlags.length})
                    </h3>
                    <div className="space-y-4">
                        {analysis.redFlags.map((flag) => {
                            const isExpanded = expandedFlags.has(flag.id);
                            const FlagIcon = getRiskIcon(flag.riskLevel);
                            const flagColor = getRiskColor(flag.riskLevel);

                            return (
                                <div
                                    key={flag.id}
                                    className="card overflow-hidden"
                                >
                                    {/* Header */}
                                    <button
                                        onClick={() => toggleFlag(flag.id)}
                                        className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{
                                                backgroundColor: flagColor === 'red' ? '#fef2f2' : flagColor === 'amber' ? '#fffbeb' : '#f0fdf4'
                                            }}
                                        >
                                            <FlagIcon
                                                className="w-5 h-5"
                                                style={{
                                                    color: flagColor === 'red' ? '#ef4444' : flagColor === 'amber' ? '#f59e0b' : '#22c55e'
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-900">{flag.title}</h4>
                                                <span className={`badge badge-${flag.riskLevel.toLowerCase()}`}>
                                                    {flag.riskLevel}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 truncate">{flag.description}</p>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>

                                    {/* Expanded Content */}
                                    {isExpanded && (
                                        <div className="px-4 pb-4 border-t border-gray-100">
                                            {/* Matched Text */}
                                            <div className="mt-4 p-3 bg-gray-50 rounded-lg font-mono text-sm text-gray-700">
                                                <p className="text-xs text-gray-500 mb-1 font-sans">Found in contract:</p>
                                                "{flag.matchedText}"
                                            </div>

                                            {/* Explanation */}
                                            <div className="mt-4">
                                                <h5 className="font-medium text-gray-900 mb-2">Why This Matters</h5>
                                                <p className="text-sm text-gray-600">{flag.explanation}</p>
                                            </div>

                                            {/* Actions */}
                                            <div className="mt-4 flex flex-wrap gap-3">
                                                <Link
                                                    href={flag.learnMoreLink}
                                                    className="btn btn-secondary text-sm"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Learn More
                                                </Link>
                                                <Link
                                                    href="/support"
                                                    className="btn btn-primary text-sm"
                                                >
                                                    <Calendar className="w-4 h-4" />
                                                    Get Legal Help
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* No Issues Found */}
            {analysis.redFlags.length === 0 && (
                <div className="card p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Obvious Red Flags</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        We didn't find any common red flags in your contract.
                        However, we still recommend reading it carefully and consulting a legal professional if needed.
                    </p>
                </div>
            )}

            {/* CTA Section */}
            <div className="card p-6 bg-gradient-to-br from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">Need Expert Guidance?</h3>
                        <p className="text-gray-300">
                            Our vetted legal professionals can review your contract and provide personalized advice.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/support" className="btn btn-accent">
                            <Calendar className="w-4 h-4" />
                            Book Consultation
                        </Link>
                        <button onClick={onReset} className="btn !bg-white/10 !text-white !border-white/20 hover:!bg-white/20">
                            Analyze Another
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
