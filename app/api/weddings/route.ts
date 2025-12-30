export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, partnerName, email, phone, weddingDate, guestCount, vision } = data
    
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 })
    }

    // For now, just log the wedding inquiry
    // In production, integrate with CRM, email service, or booking system
    console.log('Wedding inquiry received:', {
      name,
      partnerName,
      email,
      phone,
      weddingDate,
      guestCount,
      vision,
      timestamp: new Date().toISOString(),
    })
    
    // TODO: Integrate with email service provider or CRM
    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: process.env.WEDDINGS_EMAIL,
    //   from: process.env.FROM_EMAIL,
    //   subject: 'New Wedding Inquiry - Visit Auburn',
    //   html: `
    //     <h2>New Wedding Inquiry</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     ${partnerName ? `<p><strong>Partner:</strong> ${partnerName}</p>` : ''}
    //     <p><strong>Email:</strong> ${email}</p>
    //     ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    //     ${weddingDate ? `<p><strong>Wedding Date:</strong> ${weddingDate}</p>` : ''}
    //     ${guestCount ? `<p><strong>Guest Count:</strong> ${guestCount}</p>` : ''}
    //     ${vision ? `<p><strong>Vision:</strong> ${vision}</p>` : ''}
    //   `
    // })
    
    return Response.json({ 
      success: true,
      message: 'Thank you for your inquiry! We\'ll be in touch soon with personalized recommendations for your special day.' 
    })
  } catch (error) {
    console.error('Wedding inquiry error:', error)
    return Response.json({ 
      error: 'Failed to process inquiry. Please try again or contact us directly.' 
    }, { status: 500 })
  }
}
