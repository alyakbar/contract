'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    MapPin,
    Star,
    Calendar,
    Clock,
    ArrowRight,
    CheckCircle2,
    X,
    Mail,
    Phone,
    ChevronRight,
    Loader2
} from 'lucide-react';

const legalProfessionals = [
    {
        id: '1',
        name: 'Patrick',
        specialization: 'Employment Law',
        bio: 'Experienced employment law specialist helping workers understand their rights. Specializes in contract review, workplace disputes, and labor law compliance in Kenya.',
        location: 'Nairobi, Kenya',
        availability: 'Mon-Fri',
        imageUrl: '/avatars/patrick.jpg',
        rating: 4.9,
        reviews: 150,
    },
];

const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

export default function SupportPage() {
    const [selectedProfessional, setSelectedProfessional] = useState<typeof legalProfessionals[0] | null>(null);
    const [bookingStep, setBookingStep] = useState<'select' | 'schedule' | 'confirm'>('select');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [bookingComplete, setBookingComplete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSelectProfessional = (professional: typeof legalProfessionals[0]) => {
        setSelectedProfessional(professional);
        setBookingStep('schedule');
    };

    const handleSchedule = () => {
        if (selectedDate && selectedTime) {
            setBookingStep('confirm');
        }
    };

    const handleConfirm = async () => {
        if (!selectedProfessional || !formData.name || !formData.email) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    legalProfessionalId: selectedProfessional.id,
                    date: selectedDate,
                    time: selectedTime,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    professionalName: selectedProfessional.name,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to book appointment');
            }

            setBookingComplete(true);
        } catch (error) {
            console.error('Booking error:', error);
            setSubmitError(error instanceof Error ? error.message : 'Failed to book appointment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetBooking = () => {
        setSelectedProfessional(null);
        setBookingStep('select');
        setSelectedDate('');
        setSelectedTime('');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setBookingComplete(false);
        setSubmitError('');
    };

    // Generate next 7 days
    const getNextDays = () => {
        const days = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push({
                date: date.toISOString().split('T')[0],
                display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
            });
        }
        return days;
    };

    if (bookingComplete) {
        return (
            <section className="section">
                <div className="container">
                    <div className="max-w-lg mx-auto text-center">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
                        <p className="text-gray-600 mb-6">
                            Your appointment with {selectedProfessional?.name} has been requested for {selectedDate} at {selectedTime}.
                        </p>
                        <div className="card p-6 text-left mb-8">
                            <h3 className="font-semibold mb-4">What happens next?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[var(--secondary-teal)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-[var(--secondary-teal)]">1</span>
                                    </div>
                                    <span className="text-sm text-gray-600">You'll receive a confirmation email shortly</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[var(--secondary-teal)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-[var(--secondary-teal)]">2</span>
                                    </div>
                                    <span className="text-sm text-gray-600">The legal professional will review your request</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[var(--secondary-teal)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-[var(--secondary-teal)]">3</span>
                                    </div>
                                    <span className="text-sm text-gray-600">They'll send you meeting details within 24 hours</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={resetBooking} className="btn btn-secondary">
                                Book Another
                            </button>
                            <Link href="/" className="btn btn-primary">
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-b from-[var(--primary-navy)] to-[var(--primary-navy-dark)] text-white py-16">
                <div className="container">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
                            <Users className="w-4 h-4" />
                            <span>Legal Support</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                            Connect with Vetted Legal Professionals
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl">
                            Get personalized guidance from experienced employment law experts.
                            Book a consultation to discuss your specific situation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Booking Steps Indicator */}
            {selectedProfessional && !bookingComplete && (
                <div className="bg-white border-b border-gray-200 py-4">
                    <div className="container">
                        <div className="flex items-center justify-center gap-8">
                            {['Select', 'Schedule', 'Confirm'].map((step, i) => {
                                const steps = ['select', 'schedule', 'confirm'];
                                const isActive = steps.indexOf(bookingStep) >= i;
                                const isCurrent = bookingStep === steps[i];

                                return (
                                    <div key={step} className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isActive
                                            ? 'bg-[var(--primary-navy)] text-white'
                                            : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {i + 1}
                                        </div>
                                        <span className={`hidden sm:block text-sm font-medium ${isCurrent ? 'text-[var(--primary-navy)]' : 'text-gray-400'
                                            }`}>{step}</span>
                                        {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <section className="section">
                <div className="container">
                    {bookingStep === 'select' && (
                        <>
                            <div className="section-header">
                                <h2 className="section-title">Our Legal Professionals</h2>
                                <p className="section-subtitle">
                                    Each professional has been vetted for their expertise in employment law.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {legalProfessionals.map((professional) => (
                                    <div key={professional.id} className="card card-interactive p-6">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--primary-navy)] to-[var(--secondary-teal)] flex items-center justify-center text-white text-xl font-semibold">
                                                {professional.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{professional.name}</h3>
                                                <p className="text-[var(--secondary-teal)] text-sm font-medium">{professional.specialization}</p>
                                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {professional.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Star className="w-3 h-3 text-amber-500" />
                                                        {professional.rating} ({professional.reviews})
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">{professional.bio}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                Available: {professional.availability}
                                            </span>
                                            <button
                                                onClick={() => handleSelectProfessional(professional)}
                                                className="btn btn-primary text-sm py-2 px-4"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {bookingStep === 'schedule' && selectedProfessional && (
                        <div className="max-w-2xl mx-auto">
                            <button
                                onClick={() => setBookingStep('select')}
                                className="flex items-center gap-2 text-gray-500 hover:text-[var(--primary-navy)] mb-6"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                                Back to professionals
                            </button>

                            <div className="card p-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary-navy)] to-[var(--secondary-teal)] flex items-center justify-center text-white font-semibold">
                                        {selectedProfessional.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{selectedProfessional.name}</h3>
                                        <p className="text-sm text-gray-500">{selectedProfessional.specialization}</p>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                                {getNextDays().map((day) => (
                                    <button
                                        key={day.date}
                                        onClick={() => setSelectedDate(day.display)}
                                        className={`p-3 rounded-lg border-2 text-center transition-colors ${selectedDate === day.display
                                            ? 'border-[var(--secondary-teal)] bg-[var(--secondary-teal)]/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-sm font-medium">{day.display}</div>
                                    </button>
                                ))}
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Select a Time</h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-3 rounded-lg border-2 text-center transition-colors ${selectedTime === time
                                            ? 'border-[var(--secondary-teal)] bg-[var(--secondary-teal)]/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium">{time}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleSchedule}
                                disabled={!selectedDate || !selectedTime}
                                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {bookingStep === 'confirm' && selectedProfessional && (
                        <div className="max-w-2xl mx-auto">
                            <button
                                onClick={() => setBookingStep('schedule')}
                                className="flex items-center gap-2 text-gray-500 hover:text-[var(--primary-navy)] mb-6"
                            >
                                <ChevronRight className="w-4 h-4 rotate-180" />
                                Back to scheduling
                            </button>

                            <div className="card p-6 mb-6 bg-[var(--secondary-teal)]/5 border-[var(--secondary-teal)]/20">
                                <h3 className="font-semibold mb-3">Appointment Summary</h3>
                                <div className="grid gap-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Professional:</span>
                                        <span className="font-medium">{selectedProfessional.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Date:</span>
                                        <span className="font-medium">{selectedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time:</span>
                                        <span className="font-medium">{selectedTime}</span>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-xl font-semibold mb-4">Your Contact Information</h2>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="label">Full Name *</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="label">Email Address *</label>
                                    <input
                                        type="email"
                                        className="input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="label">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="input"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="label">Message (Optional)</label>
                                    <textarea
                                        className="input min-h-[100px]"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Briefly describe what you'd like to discuss..."
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-6">
                                <p className="text-sm text-amber-800">
                                    <strong>Note:</strong> This platform provides educational information only.
                                    Consultations with legal professionals are independent services.
                                </p>
                            </div>

                            {submitError && (
                                <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-6">
                                    <p className="text-sm text-red-800">{submitError}</p>
                                </div>
                            )}

                            <button
                                onClick={handleConfirm}
                                disabled={!formData.name || !formData.email || isSubmitting}
                                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        Confirm Booking
                                        <CheckCircle2 className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
