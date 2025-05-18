// ✅ app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/dbConnect';
import Inquiry from '@/models/Inquiry';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    await Inquiry.create({
      type: 'CONTACT-US',
      name,
      email,
      phone,
      message
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

const mailOptions = {
  from: process.env.SMTP_USER,
  to: 'sales@epimech.com',
  subject: `New Contact Request: ${name}`,
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Request</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        
        body {
          font-family: 'Roboto', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f9f9f9;
        }
        .container {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin: 20px auto;
          border: 1px solid #e0e0e0;
        }
        .header {
          background-color: #2c3e50;
          color: white;
          padding: 15px 20px;
          border-bottom: 4px solid #e74c3c;
        }
        .header h2 {
          margin: 0;
          font-size: 20px;
          display: flex;
          align-items: center;
        }
        .header-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: #e74c3c;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          margin-right: 10px;
          font-weight: bold;
        }
        .content {
          padding: 25px 20px;
          background-color: #ffffff;
        }
        .contact-details {
          background-color: #f5f7fa;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          border-left: 4px solid #3498db;
        }
        .detail-row {
          margin-bottom: 8px;
          display: flex;
        }
        .detail-label {
          font-weight: 500;
          width: 80px;
          color: #7f8c8d;
        }
        .detail-value {
          font-weight: 400;
          flex-grow: 1;
          word-break: break-word;
        }
        .message-box {
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          padding: 15px;
          border-radius: 6px;
          margin-top: 20px;
        }
        .message-title {
          font-weight: 500;
          margin-bottom: 10px;
          color: #2c3e50;
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 5px;
        }
        .message-content {
          white-space: pre-line;
          color: #34495e;
          font-size: 14px;
        }
        .buttons {
          margin-top: 25px;
          text-align: center;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          margin: 0 5px;
          text-align: center;
          min-width: 120px;
        }
        .urgent {
          background-color: #e74c3c;
        }
        .timestamp {
          text-align: right;
          font-size: 12px;
          color: #95a5a6;
          margin-top: 20px;
          font-style: italic;
        }
        .footer {
          background-color: #ecf0f1;
          padding: 12px 20px;
          font-size: 12px;
          color: #7f8c8d;
          text-align: center;
          border-top: 1px solid #dfe6e9;
        }
        .priority-tag {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          color: white;
          background-color: #3498db;
          margin-left: 10px;
          vertical-align: middle;
        }
        @media (max-width: 480px) {
          .detail-row {
            flex-direction: column;
          }
          .detail-label {
            width: 100%;
            margin-bottom: 3px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>
            <span class="header-icon">!</span>
            New Contact Request
            <span class="priority-tag">New Lead</span>
          </h2>
        </div>
        
        <div class="content">
          <div class="contact-details">
            <div class="detail-row">
              <div class="detail-label">Name:</div>
              <div class="detail-value"><strong>${name}</strong></div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Email:</div>
              <div class="detail-value"><a href="mailto:${email}" style="color: #3498db; text-decoration: none;">${email}</a></div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Phone:</div>
              <div class="detail-value">${phone || '<span style="color: #95a5a6;">Not provided</span>'}</div>
            </div>
          </div>
          
          <div class="message-box">
            <div class="message-title">Customer Message:</div>
            <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="buttons">
            <a href="https://crm.epimech.com/leads/new?email=${encodeURIComponent(email)}" class="button">Add to CRM</a>
            <a href="mailto:${email}?subject=RE: Your inquiry to Epimech" class="button">Reply Now</a>
          </div>
          
          <div class="timestamp">
            Received on ${new Date().toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
        
        <div class="footer">
          This is an automated internal notification. Please respond to the customer promptly.
          <br>
          Epimech Lead Management System
        </div>
      </div>
    </body>
    </html>
  `,
  text: `NEW CONTACT REQUEST
  
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

CUSTOMER MESSAGE:
${message}

Received on ${new Date().toLocaleString()}

Please respond to this lead promptly.
Epimech Lead Management System`
};

const customerMailOptions = {
  from: process.env.SMTP_USER,
  to: email,
  subject: `Thank You for Contacting Epimech`,
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Epimech</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        
        body {
          font-family: 'Montserrat', Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f9f9f9;
        }
        .container {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          margin: 20px auto;
        }
        .header {
          background: linear-gradient(135deg, #1e5799 0%, #207cca 51%, #2989d8 100%);
          color: white;
          padding: 25px 15px;
          text-align: center;
        }
        .header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .logo {
          margin-bottom: 15px;
        }
        .logo img {
          height: 50px;
        }
        .content {
          padding: 30px 25px;
          background-color: #ffffff;
          border-left: 1px solid #eaeaea;
          border-right: 1px solid #eaeaea;
        }
        .content p {
          margin-bottom: 15px;
          font-size: 16px;
        }
        .greeting {
          font-size: 18px;
          font-weight: 600;
          color: #1e5799;
        }
        .highlight {
          background-color: #f0f7ff;
          border-left: 4px solid #2989d8;
          padding: 12px 15px;
          margin: 20px 0;
          border-radius: 0 4px 4px 0;
        }
        .signature {
          margin-top: 30px;
        }
        .signature p:first-child {
          margin-bottom: 5px;
          font-weight: 600;
        }
        .footer {
          font-size: 12px;
          text-align: center;
          color: #666666;
          background-color: #f5f5f5;
          padding: 20px 15px;
          border-top: 3px solid #2989d8;
        }
        .footer p {
          margin: 5px 0;
        }
        .footer a {
          color: #2989d8;
          text-decoration: none;
          font-weight: 600;
        }
        .footer a:hover {
          text-decoration: underline;
        }
        .social-icons {
          margin: 15px 0;
        }
        .social-icons a {
          display: inline-block;
          margin: 0 8px;
          width: 32px;
          height: 32px;
          background-color: #2989d8;
          border-radius: 50%;
          color: white;
          text-align: center;
          line-height: 32px;
          font-size: 16px;
        }
        .divider {
          height: 3px;
          background: linear-gradient(90deg, transparent, #2989d8, transparent);
          margin: 20px 0;
          border: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <!-- Replace with your actual logo -->
            <svg width="150" height="40" viewBox="0 0 150 40">
              <text x="0" y="25" fill="white" font-size="24" font-weight="bold">EPIMECH</text>
            </svg>
          </div>
          <h2>Thanks for Reaching Out!</h2>
        </div>
        
        <div class="content">
          <p class="greeting">Dear ${name},</p>
          
          <p>Thank you for contacting Epimech. We've received your message and are reviewing it.</p>
          
          <div class="highlight">
            <p><strong>What happens next?</strong> A member of our expert team will review your inquiry and get back to you within <strong>24 Hours</strong>.</p>
          </div>
          
          <hr class="divider">
          
          <div class="signature">
            <p>Best regards,</p>
            <p>The Epimech Team</p>
          </div>
        </div>
        
      </div>
    </body>
    </html>
  `,
  text: `
    Dear ${name},

    Thank you for contacting Epimech. We've received your message and are reviewing it.

    What happens next? A member of our expert team will review your inquiry and get back to you within 24 Hours.
    
    Best regards,
    The Epimech Team
    
    © ${new Date().getFullYear()} Epimech, Inc. All rights reserved.
    1234 Innovation Drive, Tech City, TC 98765
  `
};

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(customerMailOptions);

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending contact message:', error);
    return NextResponse.json({ message: 'Failed to send contact message' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const inquiries = await Inquiry.find({ type: 'CONTACT-US' }).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return NextResponse.json({ message: 'Failed to fetch contact inquiries' }, { status: 500 });
  }
}
