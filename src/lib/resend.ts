import { Resend } from 'resend';

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

export interface AppointmentEmailData {
    userName: string;
    userEmail: string;
    professionalName: string;
    date: string;
    time: string;
    message?: string;
}

export async function sendAppointmentConfirmation(data: AppointmentEmailData) {
    try {
        const { userName, userEmail, professionalName, date, time, message } = data;

        const result = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'ContractGuard <noreply@resend.dev>',
            to: userEmail,
            subject: `Appointment Confirmed with ${professionalName}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8f9fa;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e3a5f 0%, #152a47 100%); padding: 32px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">ContractGuard</h1>
                            <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">Legal Support Platform</p>
                        </td>
                    </tr>
                    
                    <!-- Success Icon -->
                    <tr>
                        <td style="padding: 40px 32px 24px; text-align: center;">
                            <div style="width: 64px; height: 64px; background-color: #dcfce7; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">
                                <span style="color: #22c55e; font-size: 32px;">✓</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 0 32px 24px; text-align: center;">
                            <h2 style="margin: 0 0 8px; color: #1a1a2e; font-size: 22px; font-weight: 600;">Appointment Confirmed!</h2>
                            <p style="margin: 0; color: #64748b; font-size: 15px;">Hi ${userName}, your consultation has been scheduled.</p>
                        </td>
                    </tr>
                    
                    <!-- Appointment Details -->
                    <tr>
                        <td style="padding: 0 32px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 24px;">
                                <tr>
                                    <td style="padding: 12px 16px;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Legal Professional</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">${professionalName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Date & Time</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">${date} at ${time}</p>
                                    </td>
                                </tr>
                                ${message ? `
                                <tr>
                                    <td style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 14px;">${message}</p>
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                        </td>
                    </tr>
                    
                    <!-- What's Next -->
                    <tr>
                        <td style="padding: 0 32px 32px;">
                            <h3 style="margin: 0 0 16px; color: #1a1a2e; font-size: 16px; font-weight: 600;">What happens next?</h3>
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 28px; vertical-align: top;">
                                                    <div style="width: 20px; height: 20px; background-color: #3b82a015; border-radius: 50%; text-align: center; line-height: 20px; color: #3b82a0; font-size: 11px; font-weight: 600;">1</div>
                                                </td>
                                                <td style="color: #64748b; font-size: 14px;">The legal professional will review your request</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 28px; vertical-align: top;">
                                                    <div style="width: 20px; height: 20px; background-color: #3b82a015; border-radius: 50%; text-align: center; line-height: 20px; color: #3b82a0; font-size: 11px; font-weight: 600;">2</div>
                                                </td>
                                                <td style="color: #64748b; font-size: 14px;">They'll send you meeting details within 24 hours</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 28px; vertical-align: top;">
                                                    <div style="width: 20px; height: 20px; background-color: #3b82a015; border-radius: 50%; text-align: center; line-height: 20px; color: #3b82a0; font-size: 11px; font-weight: 600;">3</div>
                                                </td>
                                                <td style="color: #64748b; font-size: 14px;">Prepare any documents you'd like to discuss</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Disclaimer -->
                    <tr>
                        <td style="padding: 0 32px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fef3c7; border-radius: 8px; padding: 16px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="margin: 0; color: #92400e; font-size: 13px;">
                                            <strong>Note:</strong> ContractGuard provides educational information only. Consultations with legal professionals are independent services.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                            <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">Questions? Contact us at hello@contractguard.com</p>
                            <p style="margin: 0; color: #94a3b8; font-size: 12px;">© ${new Date().getFullYear()} ContractGuard. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
            `,
        });

        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
}

export { resend };
