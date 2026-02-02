import { NextResponse } from 'next/server';

const legalProfessionals = [
    {
        id: '1',
        name: 'Dr. Sarah Chen',
        specialization: 'Employment Law',
        bio: 'Former labor law professor with 15+ years helping workers understand their rights. Specializes in contract review and workplace disputes.',
        location: 'New York, NY',
        availability: 'Mon-Thu',
        contactEmail: 'sarah.chen@example.com',
        imageUrl: '/avatars/sarah.jpg',
    },
    {
        id: '2',
        name: 'Michael Okonkwo',
        specialization: 'Worker Rights',
        bio: 'Advocate for gig workers and independent contractors. Expert in non-traditional employment arrangements.',
        location: 'Los Angeles, CA',
        availability: 'Tue-Sat',
        contactEmail: 'michael.o@example.com',
        imageUrl: '/avatars/michael.jpg',
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        specialization: 'Contract Law',
        bio: 'Specializes in reviewing employment contracts for early-career professionals. Fluent in Spanish and English.',
        location: 'Miami, FL',
        availability: 'Mon-Fri',
        contactEmail: 'elena.r@example.com',
        imageUrl: '/avatars/elena.jpg',
    },
    {
        id: '4',
        name: 'James Patel',
        specialization: 'Corporate Employment',
        bio: 'Experienced in executive contracts and equity compensation. Helps professionals negotiate better terms.',
        location: 'San Francisco, CA',
        availability: 'Wed-Sun',
        contactEmail: 'james.p@example.com',
        imageUrl: '/avatars/james.jpg',
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
