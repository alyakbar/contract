'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, User, Eye, EyeOff, ArrowRight, Chrome, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreedToTerms) return;

        setIsLoading(true);

        // Simulate signup - in production, this would call the auth API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For demo, redirect to login
        router.push('/login');
    };

    const handleGoogleSignup = async () => {
        // In production, this would trigger Google OAuth
        console.log('Google signup');
    };

    const passwordStrength = () => {
        const { password } = formData;
        if (password.length === 0) return null;
        if (password.length < 6) return { level: 'weak', color: 'red' };
        if (password.length < 10) return { level: 'medium', color: 'amber' };
        return { level: 'strong', color: 'green' };
    };

    const strength = passwordStrength();

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-[var(--primary-navy)] font-semibold text-xl mb-4">
                        <Shield className="w-8 h-8" />
                        <span>ContractGuard</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
                    <p className="text-gray-500 mt-2">Start understanding your contracts today</p>
                </div>

                {/* Form Card */}
                <div className="card p-8">
                    {/* Google Signup */}
                    <button
                        onClick={handleGoogleSignup}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-6"
                    >
                        <Chrome className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">Continue with Google</span>
                    </button>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or sign up with email</span>
                        </div>
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    className="input pl-10"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    className="input pl-10"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input pl-10 pr-10"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {strength && (
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all bg-${strength.color}-500`}
                                            style={{
                                                width: strength.level === 'weak' ? '33%' : strength.level === 'medium' ? '66%' : '100%',
                                                backgroundColor: strength.level === 'weak' ? '#ef4444' : strength.level === 'medium' ? '#f59e0b' : '#22c55e'
                                            }}
                                        />
                                    </div>
                                    <span className={`text-xs font-medium capitalize`} style={{
                                        color: strength.level === 'weak' ? '#ef4444' : strength.level === 'medium' ? '#f59e0b' : '#22c55e'
                                    }}>
                                        {strength.level}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-[var(--secondary-teal)] focus:ring-[var(--secondary-teal)] mt-0.5"
                            />
                            <span className="text-sm text-gray-600">
                                I agree to the{' '}
                                <Link href="/terms" className="text-[var(--secondary-teal)] hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-[var(--secondary-teal)] hover:underline">Privacy Policy</Link>
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="btn btn-primary w-full disabled:opacity-50"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* Login Link */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[var(--secondary-teal)] font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
