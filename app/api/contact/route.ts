/**
 * Contact Form Submission API
 * Handles general contact inquiries from /contact page
 */

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = formData

    // Validation - check for required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return Response.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return Response.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    if (!subject || typeof subject !== 'string' || subject.trim() === '') {
      return Response.json(
        { error: 'Subject is required' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return Response.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Sanitize input lengths to prevent abuse
    if (name.length > 100) {
      return Response.json(
        { error: 'Name is too long' },
        { status: 400 }
      )
    }

    if (email.length > 255) {
      return Response.json(
        { error: 'Email address is too long' },
        { status: 400 }
      )
    }

    if (phone && phone.length > 20) {
      return Response.json(
        { error: 'Phone number is too long' },
        { status: 400 }
      )
    }

    if (subject.length > 200) {
      return Response.json(
        { error: 'Subject is too long' },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return Response.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      )
    }

    // Log the submission (in production, send to CRM/email service)
    console.log('Contact Form Submission:', {
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
      submittedAt: new Date().toISOString(),
    })

    // TODO: Integrate with email service (SendGrid, Mailchimp, Resend, etc.)
    // TODO: Store in CRM/database
    // TODO: Send confirmation email to submitter
    // TODO: Send notification to Auburn Chamber of Commerce

    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // 
    // // Send to Auburn Chamber
    // await sgMail.send({
    //   to: process.env.CONTACT_EMAIL || 'info@auburnchamber.net',
    //   from: process.env.FROM_EMAIL,
    //   replyTo: email,
    //   subject: `Contact Form: ${subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    //     <p><strong>Subject:</strong> ${subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //     <hr>
    //     <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
    //   `,
    // })
    //
    // // Send confirmation to user
    // await sgMail.send({
    //   to: email,
    //   from: process.env.FROM_EMAIL,
    //   subject: 'Thank you for contacting Visit Auburn',
    //   html: `
    //     <h2>Thank You for Contacting Us!</h2>
    //     <p>Hi ${name},</p>
    //     <p>We've received your message and will get back to you within 1-2 business days.</p>
    //     <p><strong>Your Message:</strong></p>
    //     <p>${message.replace(/\n/g, '<br>')}</p>
    //     <hr>
    //     <p>Best regards,<br>Visit Auburn Team</p>
    //   `,
    // })

    return Response.json({
      success: true,
      message: 'Thank you for contacting us! We will respond within 1-2 business days.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
