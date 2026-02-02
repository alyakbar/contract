import Link from 'next/link';
import { Shield, Mail, Twitter, Linkedin, Github } from 'lucide-react';

const footerLinks = {
    learn: [
        { href: '/learn', label: 'Contract Basics' },
        { href: '/learn/salary', label: 'Salary Terms' },
        { href: '/learn/termination', label: 'Termination Clauses' },
        { href: '/learn/benefits', label: 'Benefits Guide' },
    ],
    resources: [
        { href: '/red-flags', label: 'Red Flags Checklist' },
        { href: '/check', label: 'Contract Check Tool' },
        { href: '/support', label: 'Legal Support' },
        { href: '/about', label: 'About Us' },
    ],
    legal: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/disclaimer', label: 'Legal Disclaimer' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-[var(--primary-navy)] text-white">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-white font-semibold text-lg mb-4">
                            <Shield className="w-6 h-6" />
                            <span>ContractGuard</span>
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Empowering workers with clear, accessible contract education.
                            Understand your rights before you sign.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="Twitter">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="GitHub">
                                <Github className="w-4 h-4" />
                            </a>
                            <a href="mailto:hello@contractguard.com" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors" aria-label="Email">
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Learn Links */}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Learn</h3>
                        <ul className="space-y-3">
                            {footerLinks.learn.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-xs text-gray-400 leading-relaxed">
                                ⚖️ <strong className="text-gray-300">Disclaimer:</strong> This platform provides educational information only, not legal advice.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} ContractGuard. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs">
                        Made with care for workers everywhere 💙
                    </p>
                </div>
            </div>
        </footer>
    );
}
