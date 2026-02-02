import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@contractguard.com' },
        update: {},
        create: {
            email: 'admin@contractguard.com',
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    console.log('✓ Created admin user');

    // Create legal professionals
    const professionals = [
        {
            name: 'Dr. Sarah Chen',
            specialization: 'Employment Law',
            bio: 'Former labor law professor with 15+ years helping workers understand their rights. Specializes in contract review and workplace disputes.',
            location: 'New York, NY',
            availability: 'Mon-Thu',
            contactEmail: 'sarah.chen@example.com',
        },
        {
            name: 'Michael Okonkwo',
            specialization: 'Worker Rights',
            bio: 'Advocate for gig workers and independent contractors. Expert in non-traditional employment arrangements.',
            location: 'Los Angeles, CA',
            availability: 'Tue-Sat',
            contactEmail: 'michael.o@example.com',
        },
        {
            name: 'Elena Rodriguez',
            specialization: 'Contract Law',
            bio: 'Specializes in reviewing employment contracts for early-career professionals. Fluent in Spanish and English.',
            location: 'Miami, FL',
            availability: 'Mon-Fri',
            contactEmail: 'elena.r@example.com',
        },
        {
            name: 'James Patel',
            specialization: 'Corporate Employment',
            bio: 'Experienced in executive contracts and equity compensation. Helps professionals negotiate better terms.',
            location: 'San Francisco, CA',
            availability: 'Wed-Sun',
            contactEmail: 'james.p@example.com',
        },
    ];

    for (const prof of professionals) {
        await prisma.legalProfessional.upsert({
            where: { contactEmail: prof.contactEmail },
            update: prof,
            create: prof,
        });
    }
    console.log('✓ Created legal professionals');

    // Create educational content
    const content = [
        {
            title: 'Job Role & Duties',
            slug: 'job-role',
            category: 'contract-basics',
            summary: 'Understanding what your job description defines and why clarity matters.',
            content: 'Your job description is one of the most important parts of your employment contract...',
            order: 1,
        },
        {
            title: 'Salary & Payment',
            slug: 'salary',
            category: 'contract-basics',
            summary: 'How and when you get paid - understanding your compensation terms.',
            content: 'Your salary section covers everything related to compensation...',
            order: 2,
        },
        {
            title: 'Working Hours',
            slug: 'working-hours',
            category: 'contract-basics',
            summary: 'Understanding your expected hours and overtime policies.',
            content: 'This section defines your standard working hours, break times...',
            order: 3,
        },
        {
            title: 'Leave & Benefits',
            slug: 'leave-benefits',
            category: 'contract-basics',
            summary: 'Your time off and perks explained.',
            content: 'This section covers paid time off, health benefits, retirement plans...',
            order: 4,
        },
        {
            title: 'Termination Clauses',
            slug: 'termination',
            category: 'contract-basics',
            summary: 'How your job can end and what happens when it does.',
            content: 'This outlines how either party can end the employment...',
            order: 5,
        },
    ];

    for (const item of content) {
        await prisma.educationalContent.upsert({
            where: { slug: item.slug },
            update: item,
            create: item,
        });
    }
    console.log('✓ Created educational content');

    // Create red flags
    const redFlags = [
        {
            title: 'Salary not clearly stated',
            description: 'The contract doesn\'t specify an exact salary amount or uses vague terms.',
            riskLevel: 'HIGH' as const,
            action: 'Request a specific salary amount in writing before signing.',
            order: 1,
        },
        {
            title: 'Unlimited working hours',
            description: 'No clear statement of working hours, or phrases like "as required".',
            riskLevel: 'HIGH' as const,
            action: 'Ask for specific hours to be added to the contract.',
            order: 2,
        },
        {
            title: 'Termination without notice',
            description: 'The employer can fire you immediately without any notice period.',
            riskLevel: 'HIGH' as const,
            action: 'Negotiate for mutual notice periods.',
            order: 3,
        },
        {
            title: 'Penalty for resigning',
            description: 'You\'re required to pay a fee or forfeit wages if you resign.',
            riskLevel: 'HIGH' as const,
            action: 'This may not be legal. Consult a legal professional.',
            order: 4,
        },
        {
            title: 'Overly broad non-compete',
            description: 'Restrictions that prevent you from working in your industry for years.',
            riskLevel: 'MEDIUM' as const,
            action: 'Try to negotiate narrower terms.',
            order: 5,
        },
    ];

    for (const flag of redFlags) {
        await prisma.redFlag.upsert({
            where: { id: `flag-${flag.order}` },
            update: flag,
            create: { ...flag, id: `flag-${flag.order}` },
        });
    }
    console.log('✓ Created red flags');

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
