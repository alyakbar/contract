'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    FileCheck,
    ChevronRight,
    ChevronLeft,
    AlertTriangle,
    CheckCircle2,
    Clock,
    DollarSign,
    Briefcase,
    FileX,
    Shield,
    ArrowRight,
    AlertCircle
} from 'lucide-react';

const questions = [
    {
        id: 'contract_type',
        question: 'What type of employment is this?',
        icon: Briefcase,
        options: [
            { value: 'full_time', label: 'Full-time employment', risk: 0 },
            { value: 'part_time', label: 'Part-time employment', risk: 0 },
            { value: 'contract', label: 'Fixed-term contract', risk: 1 },
            { value: 'freelance', label: 'Freelance/Independent contractor', risk: 2 },
            { value: 'informal', label: 'Informal/No written agreement', risk: 3 },
        ],
    },
    {
        id: 'salary_clarity',
        question: 'Is your salary clearly stated in the contract?',
        icon: DollarSign,
        options: [
            { value: 'yes_specific', label: 'Yes, with specific amount and payment schedule', risk: 0 },
            { value: 'yes_range', label: 'Yes, but as a range or "starting from"', risk: 1 },
            { value: 'verbal', label: 'Only discussed verbally, not in writing', risk: 2 },
            { value: 'no', label: 'No, salary is vague or "to be discussed"', risk: 3 },
        ],
    },
    {
        id: 'hours',
        question: 'Are your working hours clearly defined?',
        icon: Clock,
        options: [
            { value: 'yes_specific', label: 'Yes, specific hours per week with overtime policy', risk: 0 },
            { value: 'yes_flexible', label: 'Yes, with some flexibility mentioned', risk: 1 },
            { value: 'vague', label: 'Vaguely defined or "as required"', risk: 2 },
            { value: 'unlimited', label: 'No limits or "unlimited availability" expected', risk: 3 },
        ],
    },
    {
        id: 'termination',
        question: 'What are the termination terms?',
        icon: FileX,
        options: [
            { value: 'mutual', label: 'Mutual notice period (same for both parties)', risk: 0 },
            { value: 'unequal', label: 'Different notice periods for employer and employee', risk: 1 },
            { value: 'at_will', label: 'At-will or immediate termination possible', risk: 2 },
            { value: 'penalty', label: 'Penalties or wage forfeiture for resigning', risk: 3 },
        ],
    },
    {
        id: 'non_compete',
        question: 'Does the contract include non-compete restrictions?',
        icon: Shield,
        options: [
            { value: 'none', label: 'No non-compete clause', risk: 0 },
            { value: 'reasonable', label: 'Yes, reasonable scope (6-12 months, local area)', risk: 1 },
            { value: 'broad', label: 'Yes, broad scope (1+ years, regional/national)', risk: 2 },
            { value: 'extreme', label: 'Yes, very restrictive (2+ years, industry-wide)', risk: 3 },
        ],
    },
];

const riskLevels = [
    { max: 3, level: 'LOW', color: 'green', message: 'Your contract appears to have minimal concerning elements.' },
    { max: 7, level: 'MEDIUM', color: 'amber', message: 'Your contract has some areas that may need clarification.' },
    { max: 11, level: 'HIGH', color: 'red', message: 'Your contract has several concerning elements to address.' },
    { max: 15, level: 'CRITICAL', color: 'red', message: 'Your contract has significant red flags. Seek legal advice.' },
];

export default function CheckPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, { value: string; risk: number }>>({});
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questions[currentStep];
    const progress = ((currentStep) / questions.length) * 100;

    const handleAnswer = (value: string, risk: number) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: { value, risk }
        }));

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const resetQuiz = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResults(false);
    };

    const totalRisk = Object.values(answers).reduce((sum, a) => sum + a.risk, 0);
    const riskInfo = riskLevels.find(r => totalRisk <= r.max) || riskLevels[riskLevels.length - 1];

    if (showResults) {
        return (
            <>
                {/* Results Hero */}
                <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-16">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6 ${riskInfo.level === 'LOW' ? 'bg-green-500/20 text-green-200' :
                                    riskInfo.level === 'MEDIUM' ? 'bg-amber-500/20 text-amber-200' :
                                        'bg-red-500/20 text-red-200'
                                }`}>
                                {riskInfo.level === 'LOW' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                <span>{riskInfo.level} Risk Level</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Your Contract Assessment
                            </h1>
                            <p className="text-lg text-gray-300">
                                {riskInfo.message}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Results Content */}
                <section className="section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto">
                            {/* Risk Score Card */}
                            <div className={`card p-8 mb-8 border-2 ${riskInfo.level === 'LOW' ? 'border-green-200 bg-green-50' :
                                    riskInfo.level === 'MEDIUM' ? 'border-amber-200 bg-amber-50' :
                                        'border-red-200 bg-red-50'
                                }`}>
                                <div className="text-center mb-6">
                                    <div className={`text-5xl font-bold mb-2 ${riskInfo.level === 'LOW' ? 'text-green-600' :
                                            riskInfo.level === 'MEDIUM' ? 'text-amber-600' :
                                                'text-red-600'
                                        }`}>
                                        {totalRisk}/{questions.length * 3}
                                    </div>
                                    <p className="text-gray-600">Risk Score</p>
                                </div>

                                {/* Risk Bar */}
                                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ${riskInfo.level === 'LOW' ? 'bg-green-500' :
                                                riskInfo.level === 'MEDIUM' ? 'bg-amber-500' :
                                                    'bg-red-500'
                                            }`}
                                        style={{ width: `${(totalRisk / (questions.length * 3)) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Answer Summary */}
                            <div className="card p-6 mb-8">
                                <h2 className="text-xl font-semibold mb-6">Your Answers Summary</h2>
                                <div className="space-y-4">
                                    {questions.map((q, i) => {
                                        const answer = answers[q.id];
                                        const option = q.options.find(o => o.value === answer?.value);
                                        const riskClass = answer?.risk === 0 ? 'text-green-600' :
                                            answer?.risk === 1 ? 'text-amber-600' :
                                                'text-red-600';

                                        return (
                                            <div key={q.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                                                <div className="shrink-0 w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                                    <q.icon className="w-4 h-4 text-[var(--primary-navy)]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500 mb-1">{q.question}</p>
                                                    <p className={`font-medium ${riskClass}`}>{option?.label}</p>
                                                </div>
                                                {answer?.risk > 0 && (
                                                    <AlertCircle className={`w-5 h-5 shrink-0 ${riskClass}`} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="card p-6 mb-8">
                                <h2 className="text-xl font-semibold mb-4">Recommended Next Steps</h2>
                                <div className="space-y-3">
                                    {riskInfo.level !== 'LOW' && (
                                        <div className="flex items-start gap-3 p-4 bg-[var(--secondary-teal)]/5 rounded-lg border border-[var(--secondary-teal)]/20">
                                            <AlertTriangle className="w-5 h-5 text-[var(--secondary-teal)] shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-[var(--primary-navy)]">Review concerning clauses</p>
                                                <p className="text-sm text-gray-600">Look at the areas marked in amber or red above and consider negotiating changes.</p>
                                            </div>
                                        </div>
                                    )}
                                    <Link href="/learn" className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[var(--primary-navy)] transition-colors group">
                                        <FileCheck className="w-5 h-5 text-[var(--primary-navy)] shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-medium text-[var(--primary-navy)]">Learn more about contract terms</p>
                                            <p className="text-sm text-gray-600">Understand what each section of your contract means.</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link href="/support" className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[var(--primary-navy)] transition-colors group">
                                        <Shield className="w-5 h-5 text-[var(--primary-navy)] shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="font-medium text-[var(--primary-navy)]">Consult a legal professional</p>
                                            <p className="text-sm text-gray-600">Get expert advice before signing your contract.</p>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={resetQuiz} className="btn btn-secondary">
                                    Start Over
                                </button>
                                <Link href="/support" className="btn btn-primary">
                                    Get Legal Support
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-12">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
                            <FileCheck className="w-4 h-4" />
                            <span>Contract Self-Check</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Check Your Contract
                        </h1>
                        <p className="text-gray-300">
                            Answer a few questions to identify potential issues in your employment contract.
                        </p>
                    </div>
                </div>
            </section>

            {/* Progress Bar */}
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-500">Question {currentStep + 1} of {questions.length}</span>
                            <span className="text-gray-500">{Math.round(progress)}% complete</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--secondary-teal)] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Question */}
            <section className="section pt-12">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        {/* Question Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-[var(--primary-navy)]/5 flex items-center justify-center mx-auto mb-6">
                                <currentQuestion.icon className="w-8 h-8 text-[var(--primary-navy)]" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">{currentQuestion.question}</h2>
                            <p className="text-gray-500">Select the option that best describes your situation</p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 mb-8">
                            {currentQuestion.options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswer(option.value, option.risk)}
                                    className={`w-full p-5 text-left rounded-xl border-2 transition-all hover:border-[var(--secondary-teal)] hover:bg-[var(--secondary-teal)]/5 ${answers[currentQuestion.id]?.value === option.value
                                            ? 'border-[var(--secondary-teal)] bg-[var(--secondary-teal)]/5'
                                            : 'border-gray-200 bg-white'
                                        }`}
                                >
                                    <span className="font-medium">{option.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Navigation */}
                        {currentStep > 0 && (
                            <div className="flex justify-center">
                                <button onClick={goBack} className="btn btn-secondary">
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous Question
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
