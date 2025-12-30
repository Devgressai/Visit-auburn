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

    // Validation - check for required fields
    if (!organizationName || typeof organizationName !== 'string' || organizationName.trim() === '') {
      return Response.json(
        { error: 'Organization name is required' },
        { status: 400 }
      )
    }

    if (!contactName || typeof contactName !== 'string' || contactName.trim() === '') {
      return Response.json(
        { error: 'Contact name is required' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return Response.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== 'string' || phone.trim() === '') {
      return Response.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    if (!eventType || typeof eventType !== 'string' || eventType.trim() === '') {
      return Response.json(
        { error: 'Event type is required' },
        { status: 400 }
      )
    }

    if (!numberOfAttendees || isNaN(Number(numberOfAttendees)) || Number(numberOfAttendees) < 1) {
      return Response.json(
        { error: 'Number of attendees must be at least 1' },
        { status: 400 }
      )
    }

    if (!eventDetails || typeof eventDetails !== 'string' || eventDetails.trim() === '') {
      return Response.json(
        { error: 'Event details are required' },
        { status: 400 }
      )
    }

    // Sanitize input lengths to prevent abuse
    if (organizationName.length > 200) {
      return Response.json(
        { error: 'Organization name is too long' },
        { status: 400 }
      )
    }

    if (contactName.length > 100) {
      return Response.json(
        { error: 'Contact name is too long' },
        { status: 400 }
      )
    }

    if (email.length > 255) {
      return Response.json(
        { error: 'Email address is too long' },
        { status: 400 }
      )
    }

    if (eventDetails.length > 5000) {
      return Response.json(
        { error: 'Event details are too long' },
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

