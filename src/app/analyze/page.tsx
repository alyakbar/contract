'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileSearch, Shield, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import ContractUploader from '@/components/ui/ContractUploader';
import AnalysisResults, { AnalysisData } from '@/components/ui/AnalysisResults';

type AnalysisState = 'upload' | 'analyzing' | 'results' | 'error';

export default function AnalyzePage() {
    const [state, setState] = useState<AnalysisState>('upload');
    const [error, setError] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

    const handleFileSelect = async (file: File) => {
        setState('analyzing');
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('useAI', 'false'); // Can be toggled if API key is available

            const response = await fetch('/api/analyze-contract', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Analysis failed');
            }

            setAnalysis(data.analysis);
            setState('results');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setState('error');
        }
    };

    const handleReset = () => {
        setState('upload');
        setError(null);
        setAnalysis(null);
    };

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-12">
                <div className="container">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
                            <FileSearch className="w-4 h-4" />
                            <span>Contract Analysis Tool</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Analyze Your Contract
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl">
                            Upload your employment contract and we'll identify potential red flags,
                            explain complex clauses, and help you understand what you're signing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        {/* Upload State */}
                        {(state === 'upload' || state === 'error') && (
                            <div className="space-y-8">
                                <ContractUploader
                                    onFileSelect={handleFileSelect}
                                    isAnalyzing={false}
                                    error={error}
                                />

                                {/* Features */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[
                                        {
                                            icon: Shield,
                                            title: 'Privacy First',
                                            description: 'Your document is never stored on our servers.',
                                        },
                                        {
                                            icon: FileSearch,
                                            title: 'Instant Analysis',
                                            description: 'Get results in seconds, not hours.',
                                        },
                                        {
                                            icon: AlertTriangle,
                                            title: 'Red Flag Detection',
                                            description: 'Identify 10+ common contract issues.',
                                        },
                                    ].map((feature, i) => (
                                        <div key={i} className="card p-6 text-center">
                                            <div className="w-12 h-12 rounded-xl bg-[var(--primary-navy)]/5 flex items-center justify-center mx-auto mb-4">
                                                <feature.icon className="w-6 h-6 text-[var(--primary-navy)]" />
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                            <p className="text-sm text-gray-500">{feature.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Analyzing State */}
                        {state === 'analyzing' && (
                            <div className="card p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-[var(--primary-navy)]/5 flex items-center justify-center mx-auto mb-6">
                                    <Loader2 className="w-10 h-10 text-[var(--primary-navy)] animate-spin" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                    Analyzing Your Contract
                                </h2>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    We're extracting text, identifying clauses, and checking for red flags.
                                    This usually takes just a few seconds.
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                                    <div className="w-2 h-2 rounded-full bg-[var(--secondary-teal)] animate-pulse" />
                                    <span>Processing in-memory only (no storage)</span>
                                </div>
                            </div>
                        )}

                        {/* Results State */}
                        {state === 'results' && analysis && (
                            <AnalysisResults
                                analysis={analysis}
                                onReset={handleReset}
                            />
                        )}
                    </div>
                </div>
            </section>

            {/* Disclaimer Section */}
            {state !== 'results' && (
                <section className="py-8 bg-[var(--background)]">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-amber-800 mb-2">
                                            Educational Guidance Only — Not Legal Advice
                                        </h3>
                                        <p className="text-sm text-amber-700">
                                            This tool is designed to help you better understand employment contracts
                                            and identify potential areas of concern. The analysis provided is for
                                            educational purposes only and should not be considered a substitute for
                                            professional legal advice. For specific legal questions about your
                                            contract, please consult with a qualified employment lawyer.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
