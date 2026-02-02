'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Settings,
    ChevronRight,
    Menu,
    X,
    Shield,
    TrendingUp,
    Eye,
    Clock
} from 'lucide-react';

const sidebarLinks = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/professionals', icon: Users, label: 'Legal Professionals' },
    { href: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { href: '/admin/content', icon: FileText, label: 'Educational Content' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];

const stats = [
    { label: 'Total Page Views', value: '12,543', change: '+12%', icon: Eye },
    { label: 'Appointments This Week', value: '47', change: '+8%', icon: Calendar },
    { label: 'Active Professionals', value: '4', change: '0%', icon: Users },
    { label: 'Avg Session Time', value: '4m 32s', change: '+15%', icon: Clock },
];

const recentAppointments = [
    { id: 1, user: 'John Smith', professional: 'Dr. Sarah Chen', date: '2024-02-03', time: '10:00 AM', status: 'PENDING' },
    { id: 2, user: 'Maria Garcia', professional: 'Elena Rodriguez', date: '2024-02-03', time: '2:00 PM', status: 'CONFIRMED' },
    { id: 3, user: 'Alex Johnson', professional: 'Michael Okonkwo', date: '2024-02-04', time: '11:00 AM', status: 'PENDING' },
    { id: 4, user: 'Emily Chen', professional: 'James Patel', date: '2024-02-04', time: '3:00 PM', status: 'CONFIRMED' },
];

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                    <Link href="/admin" className="flex items-center gap-2 text-[var(--primary-navy)] font-semibold">
                        <Shield className="w-6 h-6" />
                        <span>Admin</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="p-4">
                    <ul className="space-y-1">
                        {sidebarLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-[var(--primary-navy)] transition-colors"
                                >
                                    <link.icon className="w-5 h-5" />
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--primary-navy)]">
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Header */}
                <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary-navy)] flex items-center justify-center text-white text-sm font-medium">
                            A
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="p-6">
                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="card p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--primary-navy)]/5 flex items-center justify-center">
                                        <stat.icon className="w-5 h-5 text-[var(--primary-navy)]" />
                                    </div>
                                    <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Appointments */}
                    <div className="card overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Recent Appointments</h2>
                            <Link href="/admin/appointments" className="text-sm text-[var(--secondary-teal)] hover:underline">
                                View all
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Professional</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentAppointments.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{apt.user}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{apt.professional}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{apt.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{apt.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`badge ${apt.status === 'CONFIRMED' ? 'badge-low' : 'badge-medium'}`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
