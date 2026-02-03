import { NextResponse } from 'next/server';
import { sendAppointmentConfirmation, type AppointmentEmailData } from '@/lib/resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const required: (keyof AppointmentEmailData)[] = ['userName', 'userEmail', 'professionalName', 'date', 'time'];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.userEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Send the confirmation email
        const result = await sendAppointmentConfirmation({
            userName: body.userName,
            userEmail: body.userEmail,
            professionalName: body.professionalName,
            date: body.date,
            time: body.time,
            message: body.message,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: 'Failed to send email', details: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data: result.data });
    } catch (error) {
        console.error('Send email error:', error);
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
