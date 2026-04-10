import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';
import ContactEmail from '@/components/email/ContactEmail';
import BookingInquiryEmail from '@/components/email/BookingInquiryEmail';
import SalesInquiryEmail from '@/components/email/SalesInquiryEmail';
import { getProxyImageURL } from '@/utils/email-images';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const VALERIE_EMAIL = 'valerie@sun-beach-house.com';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { 
            type, 
            firstName, 
            lastName, 
            email, 
            phone, 
            message, 
            confirm_website_url, // ContactPage honeypot
            confirm_booking_request, // BookingPage honeypot
            confirm_sales_inquiry, // SalesContactPage honeypot
            // Additional data for specific types
            villaName,
            villaImage,
            location,
            arrival,
            departure,
            guests,
            price
        } = body;

        // Transform Sanity image URL to brand proxy URL to avoid email deliverability issues
        const proxiedVillaImage = getProxyImageURL(villaImage);

        // 1. Unified Spam Check (Honeypot)
        if (confirm_website_url || confirm_booking_request || confirm_sales_inquiry) {
            console.warn('Potential spam detected (honeypot filled)');
            return NextResponse.json({ success: true, message: 'Message filtered as spam' });
        }

        // 2. Validate essential fields
        if (!email || !firstName || !type) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
        }

        const resend = new Resend(RESEND_API_KEY);
        let html = '';
        let subject = '';

        const fullName = `${firstName} ${lastName || ''}`.trim();

        // 3. Select template and subject based on type
        switch (type) {
            case 'booking':
                subject = `Nouvelle demande de réservation : ${villaName} - St Barth`;
                html = await render(
                    React.createElement(BookingInquiryEmail, {
                        villaName,
                        villaImage: proxiedVillaImage,
                        location,
                        arrival,
                        departure,
                        guests,
                        customerName: fullName,
                        customerEmail: email,
                        customerPhone: phone,
                        message
                    })
                );
                break;
            
            case 'sales':
                subject = `Demande d'information VENTE : ${villaName} - St Barth`;
                html = await render(
                    React.createElement(SalesInquiryEmail, {
                        villaName,
                        villaImage: proxiedVillaImage,
                        location,
                        price,
                        customerName: fullName,
                        customerEmail: email,
                        customerPhone: phone,
                        message
                    })
                );
                break;
                
            case 'general':
            default:
                subject = `Nouveau message de contact : ${fullName}`;
                html = await render(
                    React.createElement(ContactEmail, {
                        name: fullName,
                        email: email,
                        message: message,
                        type: 'Demande de contact générale'
                    })
                );
                break;
        }

        // 4. Send the email to Valerie
        const { data, error } = await resend.emails.send({
            from: 'Sun Beach House Website <valerie@sun-beach-house.com>',
            to: [VALERIE_EMAIL],
            replyTo: email, // Allow Valerie to reply directly to the customer
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error?.message || 'Unexpected server error' },
            { status: 500 }
        );
    }
}
