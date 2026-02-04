import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export interface ProfessionalNotificationData {
    professionalName: string;
    professionalEmail: string;
    userName: string;
    userEmail: string;
    userPhone?: string;
    date: string;
    time: string;
    message?: string;
}

export async function sendEmailWithNodemailer(data: ProfessionalNotificationData) {
    try {
        const { professionalName, professionalEmail, userName, userEmail, userPhone, date, time, message } = data;



        const mailOptions = {
            from: `ContractGuard <${process.env.GMAIL_USER}>`,
            to: professionalEmail,
            subject: `New Appointment Request from ${userName}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Appointment Request</title>
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
                            <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.8); font-size: 14px;">New Appointment Request</p>
                        </td>
                    </tr>
                    
                    <!-- Alert Icon -->
                    <tr>
                        <td style="padding: 40px 32px 24px; text-align: center;">
                            <div style="width: 64px; height: 64px; background-color: #dbeafe; border-radius: 50%; display: inline-block; text-align: center; line-height: 64px;">
                                <span style="color: #3b82f6; font-size: 32px;">📅</span>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 0 32px 24px; text-align: center;">
                            <h2 style="margin: 0 0 8px; color: #1a1a2e; font-size: 22px; font-weight: 600;">New Consultation Request</h2>
                            <p style="margin: 0; color: #64748b; font-size: 15px;">Hi ${professionalName}, you have a new appointment request.</p>
                        </td>
                    </tr>
                    
                    <!-- Client Details -->
                    <tr>
                        <td style="padding: 0 32px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f9fa; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 12px 16px;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Client Name</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">${userName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Client Email</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 600;"><a href="mailto:${userEmail}" style="color: #3b82a0; text-decoration: none;">${userEmail}</a></p>
                                    </td>
                                </tr>
                                ${userPhone ? `
                                <tr>
                                    <td style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Client Phone</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">${userPhone}</p>
                                    </td>
                                </tr>
                                ` : ''}
                                <tr>
                                    <td style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Requested Date & Time</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 600;">${date} at ${time}</p>
                                    </td>
                                </tr>
                                ${message ? `
                                <tr>
                                    <td style="padding: 12px 16px; border-top: 1px solid #e2e8f0;">
                                        <p style="margin: 0 0 4px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Client Message</p>
                                        <p style="margin: 0; color: #1a1a2e; font-size: 14px;">${message}</p>
                                    </td>
                                </tr>
                                ` : ''}
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Action Required -->
                    <tr>
                        <td style="padding: 0 32px 32px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fef3c7; border-radius: 8px;">
                                <tr>
                                    <td style="padding: 16px;">
                                        <p style="margin: 0; color: #92400e; font-size: 13px;">
                                            <strong>Action Required:</strong> Please respond to the client within 24 hours to confirm or reschedule this appointment.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
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
        };

        const result = await transporter.sendMail(mailOptions);
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to send email via Nodemailer:', error);
        return { success: false, error };
    }
}

export { transporter };
