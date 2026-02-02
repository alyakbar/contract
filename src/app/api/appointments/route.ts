import { NextResponse } from 'next/server';

// Mock appointments storage (in production, use database)
let appointments = [
    {
        id: '1',
        userId: 'user1',
        legalProfessionalId: '1',
        date: '2024-02-03',
        time: '10:00 AM',
        message: 'I have questions about my employment contract.',
        status: 'PENDING',
        userName: 'John Smith',
        userEmail: 'john@example.com',
        professionalName: 'Dr. Sarah Chen',
    },
    {
        id: '2',
        userId: 'user2',
        legalProfessionalId: '3',
        date: '2024-02-03',
        time: '2:00 PM',
        message: 'Need help understanding non-compete clause.',
        status: 'CONFIRMED',
        userName: 'Maria Garcia',
        userEmail: 'maria@example.com',
        professionalName: 'Elena Rodriguez',
    },
];

export async function GET() {
    return NextResponse.json(appointments);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const required = ['legalProfessionalId', 'date', 'time', 'name', 'email'];
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
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const newAppointment = {
            id: Date.now().toString(),
            userId: 'guest',
            legalProfessionalId: body.legalProfessionalId,
            date: body.date,
            time: body.time,
            message: body.message || '',
            status: 'PENDING',
            userName: body.name,
            userEmail: body.email,
            professionalName: body.professionalName || 'Legal Professional',
        };

        appointments.push(newAppointment);

        // In production, send confirmation email here

        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Appointment ID required' },
                { status: 400 }
            );
        }

        const index = appointments.findIndex(a => a.id === id);
        if (index === -1) {
            return NextResponse.json(
                { error: 'Appointment not found' },
                { status: 404 }
            );
        }

        appointments[index] = { ...appointments[index], ...body };

        return NextResponse.json(appointments[index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        );
    }
}
