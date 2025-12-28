export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()
    
    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Valid email required' }, { status: 400 })
    }

    // For now, just log the signup
    // In production, integrate with SendGrid, Mailchimp, or similar
    console.log('Newsletter signup:', { email, name })
    
    // TODO: Integrate with email service provider
    // Example SendGrid integration:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: process.env.NEWSLETTER_LIST_EMAIL,
    //   from: process.env.FROM_EMAIL,
    //   subject: 'New Newsletter Signup',
    //   text: `New signup: ${email} (${name})`
    // })
    
    return Response.json({ 
      success: true,
      message: 'Thank you for subscribing!' 
    })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return Response.json({ 
      error: 'Failed to process signup' 
    }, { status: 500 })
  }
}


