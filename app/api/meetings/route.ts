/**
 * Meetings RFP Form Submission API
 * Handles meeting proposal requests from /plan/meetings page
 */

export async function POST(request: Request) {
  try {
    const formData = await request.json()
    
    const {
      organizationName,
      contactName,
      email,
      phone,
      eventType,
      preferredDate,
      numberOfAttendees,
      eventDetails,
    } = formData

    // Validation
    if (!organizationName || !contactName || !email || !phone || !eventType || !numberOfAttendees || !eventDetails) {
      return Response.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return Response.json(
        { error: 'Valid email address required' },
        { status: 400 }
      )
    }

    // Log the submission (in production, send to CRM/email service)
    console.log('Meeting RFP Submission:', {
      organizationName,
      contactName,
      email,
      phone,
      eventType,
      preferredDate,
      numberOfAttendees,
      eventDetails,
      submittedAt: new Date().toISOString(),
    })

    // TODO: Integrate with email service (SendGrid, Mailchimp, etc.)
    // TODO: Store in CRM/database
    // TODO: Send confirmation email to submitter
    // TODO: Send notification to Auburn Chamber of Commerce

    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: process.env.MEETINGS_EMAIL,
    //   from: process.env.FROM_EMAIL,
    //   subject: `New Meeting RFP: ${organizationName}`,
    //   html: `
    //     <h2>New Meeting Proposal Request</h2>
    //     <p><strong>Organization:</strong> ${organizationName}</p>
    //     <p><strong>Contact:</strong> ${contactName}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Event Type:</strong> ${eventType}</p>
    //     <p><strong>Preferred Date:</strong> ${preferredDate || 'Not specified'}</p>
    //     <p><strong>Attendees:</strong> ${numberOfAttendees}</p>
    //     <p><strong>Details:</strong></p>
    //     <p>${eventDetails}</p>
    //   `,
    // })

    return Response.json({
      success: true,
      message: 'Your proposal request has been received. We will respond within 2-3 business days.',
    })
  } catch (error) {
    console.error('Meeting RFP submission error:', error)
    return Response.json(
      { error: 'Failed to process your request. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

