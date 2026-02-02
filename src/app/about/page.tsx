import Link from 'next/link';
import {
    Shield,
    Heart,
    Users,
    Target,
    CheckCircle2,
    AlertTriangle,
    ArrowRight
} from 'lucide-react';

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-20">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
                            <Heart className="w-4 h-4" />
                            <span>Our Mission</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            Empowering Workers Through<br />
                            <span className="text-[var(--accent-coral)]">Contract Education</span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            We believe everyone deserves to understand what they're signing.
                            ContractGuard makes employment contracts accessible, clear, and less intimidating.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why We Exist */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why ContractGuard Exists</h2>
                            <p className="text-gray-600 mb-4">
                                Too many workers sign contracts they don't fully understand. Whether it's
                                your first job, a gig economy position, or an informal work arrangement,
                                the legal language can be overwhelming and confusing.
                            </p>
                            <p className="text-gray-600 mb-4">
                                This lack of understanding leads to exploitation, unfair treatment, and
                                workers unknowingly giving up their rights. We're here to change that.
                            </p>
                            <p className="text-gray-600">
                                ContractGuard was created to bridge the gap between complex legal documents
                                and the everyday worker who just wants to know: <em>"Is this contract fair?"</em>
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Users, stat: '10M+', label: 'Workers helped annually' },
                                { icon: Shield, stat: '50+', label: 'Red flags identified' },
                                { icon: Target, stat: '7', label: 'Contract areas covered' },
                                { icon: Heart, stat: '100%', label: 'Free to use' },
                            ].map((item, i) => (
                                <div key={i} className="card p-6 text-center">
                                    <item.icon className="w-8 h-8 text-[var(--secondary-teal)] mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-[var(--primary-navy)]">{item.stat}</div>
                                    <div className="text-sm text-gray-500">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Help */}
            <section className="section bg-[var(--background)]">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Who We Help</h2>
                        <p className="section-subtitle">
                            ContractGuard is designed for anyone entering the workforce or navigating employment agreements.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: 'First-Time Employees',
                                description: 'Young professionals starting their careers and seeing their first employment contract.',
                            },
                            {
                                title: 'Gig Workers',
                                description: 'Freelancers, contractors, and gig economy workers with non-traditional arrangements.',
                            },
                            {
                                title: 'Career Changers',
                                description: 'Professionals moving to new industries who need to understand different contract norms.',
                            },
                            {
                                title: 'Informal Workers',
                                description: 'Those in informal employment who may not have written contracts at all.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="card p-6">
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Do / Don't Do */}
            <section className="section">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card p-8 bg-green-50 border-green-200">
                            <h3 className="text-xl font-semibold text-green-800 mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6" />
                                What We Do
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'Explain contract terms in plain language',
                                    'Highlight common red flags to watch for',
                                    'Provide educational resources about worker rights',
                                    'Connect you with vetted legal professionals',
                                    'Offer free tools to assess your contract',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-green-700">
                                        <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card p-8 bg-amber-50 border-amber-200">
                            <h3 className="text-xl font-semibold text-amber-800 mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6" />
                                What We Don't Do
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    'Provide legal advice or legal representation',
                                    'Store or review your actual contract documents',
                                    'Make decisions for you about signing',
                                    'Guarantee any legal outcomes',
                                    'Replace professional legal counsel',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-amber-700">
                                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="section bg-[var(--background)]">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 border-2 border-[var(--primary-navy)]/20">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--primary-navy)]/10 flex items-center justify-center shrink-0">
                                    <Shield className="w-6 h-6 text-[var(--primary-navy)]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Important Legal Disclaimer</h3>
                                    <p className="text-gray-600 mb-4">
                                        ContractGuard is an educational platform designed to help workers better
                                        understand employment contracts. The information provided on this website
                                        is for general educational purposes only and does not constitute legal advice.
                                    </p>
                                    <p className="text-gray-600 mb-4">
                                        Every employment situation is unique. Laws vary by jurisdiction, and contract
                                        terms should be evaluated in the context of your specific circumstances.
                                    </p>
                                    <p className="text-gray-600 font-medium">
                                        For specific legal questions about your contract, we strongly recommend
                                        consulting with a qualified employment lawyer in your area.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="section-title">Ready to Understand Your Contract?</h2>
                        <p className="section-subtitle mb-8">
                            Start with our free tools and educational resources.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/check" className="btn btn-primary">
                                Check Your Contract
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/learn" className="btn btn-secondary">
                                Browse Learning Resources
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
