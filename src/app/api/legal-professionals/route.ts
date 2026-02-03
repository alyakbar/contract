import { NextResponse } from 'next/server';

const legalProfessionals = [
    {
        id: '1',
        name: 'Patrick',
        specialization: 'Employment Law',
        bio: 'Experienced employment law specialist helping workers understand their rights. Specializes in contract review, workplace disputes, and labor law compliance in Kenya.',
        location: 'Nairobi, Kenya',
        availability: 'Mon-Fri',
        contactEmail: 'faithkalau9@gmail.com',
        imageUrl: '/avatars/patrick.jpg',
    },
];

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
