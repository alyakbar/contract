import { NextResponse } from 'next/server';

import { legalProfessionals } from '@/lib/legalProfessionals';

export async function GET() {
    return NextResponse.json(legalProfessionals);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        const required = ['name', 'specialization', 'bio', 'location', 'availability', 'contactEmail'];
        for (const field of required) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // In production, this would save to database
        const newProfessional = {
            id: Date.now().toString(),
            ...body,
        };

        return NextResponse.json(newProfessional, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
