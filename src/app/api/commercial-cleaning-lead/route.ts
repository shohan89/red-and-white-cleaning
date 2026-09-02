import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json();
  const { name, phone, email, service, location } = body;

  if (
    typeof name !== 'string' || name.trim().length < 2 ||
    typeof phone !== 'string' || phone.trim().length < 7 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof service !== 'string' || service.trim().length === 0 ||
    typeof location !== 'string' || location.trim().length < 2
  ) {
    return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
  }

  // Save lead to DB (non-blocking — don't fail the request if this errors)
  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        serviceType: service,
        location: location.trim(),
        message: `Commercial & Construction Cleaning landing page request — service requested: ${service}`,
        howDidYouHear: 'Google Ads – Commercial & Construction Cleaning Landing Page',
        status: 'NEW',
      },
    });
    await prisma.leadEvent.create({
      data: { leadId: lead.id, type: 'created', note: 'Lead created via /commercial-construction-cleaning landing page' },
    });
  } catch (dbError) {
    console.error('Failed to save commercial-cleaning lead to DB:', dbError);
  }

  const { error } = await resend.emails.send({
    from: 'Red & White Cleaning <onboarding@resend.dev>',
    to: ['redandwhiteclean@gmail.com'],
    subject: `New Commercial Cleaning Lead – ${service} (${name})`,
    html: `
      <h2 style="color:#c0392b;">New Commercial &amp; Construction Cleaning Landing Page Lead</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:15px;">
        <tr><td style="padding:8px 12px;font-weight:bold;width:160px;">Name</td><td style="padding:8px 12px;">${name}</td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;">Phone</td><td style="padding:8px 12px;"><a href="tel:${phone}">${phone}</a></td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;">Email</td><td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr style="background:#f9f9f9;"><td style="padding:8px 12px;font-weight:bold;">Service</td><td style="padding:8px 12px;">${service}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;">Location</td><td style="padding:8px 12px;">${location}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:bold;">Source</td><td style="padding:8px 12px;">/commercial-construction-cleaning (Google Ads landing page)</td></tr>
      </table>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
