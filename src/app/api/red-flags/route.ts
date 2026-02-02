import { NextResponse } from 'next/server';

const redFlags = [
    {
        id: '1',
        title: 'Salary not clearly stated',
        description: 'The contract doesn\'t specify an exact salary amount.',
        riskLevel: 'HIGH',
        action: 'Request a specific salary amount in writing before signing.',
    },
    {
        id: '2',
        title: 'Unlimited or undefined working hours',
        description: 'No clear statement of working hours.',
        riskLevel: 'HIGH',
        action: 'Ask for specific hours to be added.',
    },
    {
        id: '3',
        title: 'Termination without notice',
        description: 'The employer can fire you immediately without any notice period.',
        riskLevel: 'HIGH',
        action: 'Negotiate for mutual notice periods.',
    },
    {
        id: '4',
        title: 'Penalty for resigning',
        description: 'You\'re required to pay a fee or forfeit wages if you resign.',
        riskLevel: 'HIGH',
        action: 'Consult a legal professional before signing.',
    },
    {
        id: '5',
        title: 'No written contract provided',
        description: 'The employer wants you to start work without a written contract.',
        riskLevel: 'HIGH',
        action: 'Always insist on a written contract before starting work.',
    },
    {
        id: '6',
        title: 'Overly broad non-compete clause',
        description: 'Restrictions that prevent you from working in your industry.',
        riskLevel: 'MEDIUM',
        action: 'Try to negotiate narrower terms.',
    },
];

export async function GET() {
    return NextResponse.json(redFlags);
}
