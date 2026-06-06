import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, companyName, email, phone, serviceType, location, message, howDidYouHear } = body;

  const { error } = await resend.emails.send({
    from: 'Red & White Cleaning <onboarding@resend.dev>',
    to: ['maffin.killer007@gmail.com'],
    subject: `New Quote Request — ${serviceType} (${name})`,
    html: `
      <h2 style="color:#c0392b;">New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px;">
        <tr><td style="padding:8px 12px;font-weight:bold;width:160px;">Name</td><td style="padding:8px 12px;">${name}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;">Company</td><td style="padding:8px 12px;">${companyName || 'N/A'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;">Email</td><td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;">Phone</td><td style="padding:8px 12px;">${phone || 'N/A'}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;">Service</td><td style="padding:8px 12px;">${serviceType}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;">Location</td><td style="padding:8px 12px;">${location}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;">How they heard</td><td style="padding:8px 12px;">${howDidYouHear || 'N/A'}</td></tr>
      </table>
      <hr style="margin:20px 0;border:none;border-top:1px solid #eee;"/>
      <p style="font-weight:bold;font-family:sans-serif;">Message:</p>
      <p style="font-family:sans-serif;white-space:pre-wrap;">${message}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
