'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';

const navLinks = [
    { href: '/learn', label: 'Learn Contracts' },
    { href: '/red-flags', label: 'Red Flags' },
    { href: '/analyze', label: 'Analyze Contract' },
    { href: '/support', label: 'Legal Support' },
    { href: '/about', label: 'About' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-[var(--primary-navy)] font-semibold text-lg">
                        <Shield className="w-6 h-6" />
                        <span>ContractGuard</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[var(--primary-navy)] transition-colors rounded-lg hover:bg-gray-50"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-[var(--primary-navy)] transition-colors">
                            Log in
                        </Link>
                        <Link href="/analyze" className="btn btn-primary text-sm py-2 px-4">
                            Analyze Contract
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-600 hover:text-[var(--primary-navy)] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-[var(--primary-navy)] hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                                <Link href="/login" className="btn btn-secondary">
                                    Log in
                                </Link>
                                <Link href="/analyze" className="btn btn-primary">
                                    Analyze Contract
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
