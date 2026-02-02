import Link from 'next/link';
import {
  Shield,
  FileCheck,
  AlertTriangle,
  Users,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Clock,
  Scale,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--primary-navy)] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container relative py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-[var(--accent-coral)]" />
              <span>Educational Platform — Not Legal Advice</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
              Understand Your
              <br />
              Employment Contract—
              <br />
              <span className="text-[var(--accent-coral)]">Before You Sign.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              We simplify contracts, highlight red flags, and connect you to trusted legal support.
              Know your rights. Make informed decisions.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/check" className="btn btn-accent text-base px-8 py-4 w-full sm:w-auto">
                <FileCheck className="w-5 h-5" />
                Check My Contract
              </Link>
              <Link href="/red-flags" className="btn btn-secondary !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 text-base px-8 py-4 w-full sm:w-auto">
                <AlertTriangle className="w-5 h-5" />
                Learn Red Flags
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-[var(--background)]">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Plain language. Zero red tape. Three simple steps to understand your contract.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                step: '01',
                title: 'Learn the Basics',
                description: 'Understand what each part of your contract means in simple, everyday language.',
                color: 'var(--secondary-teal)',
              },
              {
                icon: AlertTriangle,
                step: '02',
                title: 'Spot Red Flags',
                description: 'Identify risky clauses and understand why they matter before you commit.',
                color: 'var(--accent-coral)',
              },
              {
                icon: Users,
                step: '03',
                title: 'Get Support',
                description: 'Connect with vetted legal professionals if you need personalized guidance.',
                color: 'var(--accent-green)',
              },
            ].map((item, index) => (
              <div key={index} className="card card-interactive p-8 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="w-7 h-7" style={{ color: item.color }} />
                </div>
                <div className="text-sm font-semibold text-[var(--foreground-muted)] mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-[var(--foreground-muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need to Know</h2>
            <p className="section-subtitle">
              From salary terms to termination clauses, we break it all down for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: 'Contract Guidance',
                description: 'Understand key clauses in simple language so you know exactly what you\'re agreeing to.',
                items: ['What each section means', 'Why it matters', 'What\'s normal vs risky'],
                link: '/learn',
              },
              {
                icon: AlertTriangle,
                title: 'Red Flags Checker',
                description: 'Interactive checklist to identify potential problems before they become real issues.',
                items: ['Unlimited hours clauses', 'Penalty for resigning', 'Missing contract terms'],
                link: '/red-flags',
              },
              {
                icon: FileCheck,
                title: 'Self-Check Tool',
                description: 'Answer simple questions about your contract and get personalized guidance.',
                items: ['Guided questionnaire', 'Risk assessment', 'Action recommendations'],
                link: '/check',
              },
              {
                icon: Scale,
                title: 'Legal Support',
                description: 'Connect with vetted legal professionals when you need expert help.',
                items: ['Verified experts', 'Easy booking', 'Affordable consultations'],
                link: '/support',
              },
            ].map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="card card-interactive p-8 flex gap-6 group"
              >
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary-navy)]/5 flex items-center justify-center group-hover:bg-[var(--primary-navy)]/10 transition-colors">
                    <feature.icon className="w-6 h-6 text-[var(--primary-navy)]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary-navy)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-[var(--foreground-muted)] text-sm mb-4">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-green)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section bg-[var(--background)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 bg-gradient-to-br from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Privacy First. Not Legal Advice.
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                We're here to educate and empower, not to replace professional legal counsel.
                Your contract details stay with you — we never store sensitive documents.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  { icon: Shield, label: 'No data stored' },
                  { icon: Clock, label: 'Free to use' },
                  { icon: Users, label: 'For all workers' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="section-title">Ready to Check Your Contract?</h2>
            <p className="section-subtitle mb-8">
              Take 5 minutes to understand what you're signing. It could save you years of trouble.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/check" className="btn btn-primary text-base px-8 py-4">
                Start Contract Check
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/learn" className="btn btn-secondary text-base px-8 py-4">
                Browse Education Hub
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
