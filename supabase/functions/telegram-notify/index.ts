import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookingPayload {
  type: 'INSERT'
  table: string
  record: {
    id: string
    booking_type: string
    booking_date: string | null
    guest_count: number | null
    phone_number: string
    email: string | null
    selected_package: string | null
    total_amount: number | null
    estimated_total: number | null
    venue_address: string | null
    notes: string | null
    dietary_requirements: string | null
    created_at: string
    venue_type: string | null
    order_type: string
  }
  schema: string
}

serve(async (req) => {
  console.log('🚀 Telegram notify function called')
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('📋 Handling CORS preflight request')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('📥 Processing incoming request...')
    const payload: BookingPayload = await req.json()
    console.log('📦 Payload received:', JSON.stringify(payload, null, 2))
    
    // Only process INSERT operations on the bookings table
    if (payload.type !== 'INSERT' || payload.table !== 'bookings') {
      console.log('⏭️ Skipping: Not a booking insert operation')
      return new Response('Not a booking insert', { 
        status: 200, 
        headers: corsHeaders 
      })
    }

    const booking = payload.record
    console.log('🍝 Processing new booking:', booking.id)
    
    // Get Telegram bot configuration from environment variables
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')
    
    console.log('🔑 Environment check:')
    console.log('- Bot token exists:', !!TELEGRAM_BOT_TOKEN)
    console.log('- Chat ID exists:', !!TELEGRAM_CHAT_ID)
    console.log('- Bot token preview:', TELEGRAM_BOT_TOKEN ? `${TELEGRAM_BOT_TOKEN.substring(0, 10)}...` : 'NOT SET')
    console.log('- Chat ID value:', TELEGRAM_CHAT_ID || 'NOT SET')
    
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.log('❌ Telegram configuration missing')
      return new Response(
        JSON.stringify({ 
          error: 'Telegram configuration not found',
          bot_token_set: !!TELEGRAM_BOT_TOKEN,
          chat_id_set: !!TELEGRAM_CHAT_ID
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Determine booking type emoji and title
    let typeEmoji = '🍝'
    let typeTitle = 'New Booking'
    
    if (booking.order_type === 'special_order') {
      typeEmoji = '📦'
      typeTitle = 'New Special Order'
    } else if (booking.booking_type === 'collaboration') {
      typeEmoji = '🤝'
      typeTitle = 'New Collaboration Request'
    }

    // Format the booking date
    const bookingDate = booking.booking_date 
      ? new Date(booking.booking_date).toLocaleDateString('en-SG', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Not specified'

    // Format the total amount
    const totalAmount = booking.total_amount 
      ? `$${booking.total_amount} SGD`
      : booking.estimated_total 
        ? `$${booking.estimated_total} SGD (estimated)`
        : 'Not specified'

    // Format venue information
    let venueInfo = ''
    if (booking.venue_type === 'home' && booking.venue_address) {
      venueInfo = `🏠 *Venue:* Customer's Home\n📍 Address: ${booking.venue_address}\n\n`
    } else if (booking.venue_type === 'rental') {
      venueInfo = `🏢 *Venue:* Rental Space\n\n`
    }

    // Create the notification message
    let message = `${typeEmoji} *${typeTitle} Alert!* ${typeEmoji}

📋 *Booking Details:*
• ID: \`${booking.id.substring(0, 8)}...\`
• Type: ${booking.booking_type?.toUpperCase() || 'N/A'}
• Package: ${booking.selected_package || 'N/A'}
• Date: ${bookingDate}
• Guests: ${booking.guest_count || 'N/A'}
• Total: ${totalAmount}

👤 *Customer Info:*
• Phone: [${booking.phone_number}](tel:${booking.phone_number})
• Email: ${booking.email || 'Not provided'}

${venueInfo}`

    // Add dietary requirements if present
    if (booking.dietary_requirements) {
      message += `🥗 *Dietary Requirements:* ${booking.dietary_requirements}\n\n`
    }

    // Add notes if present
    if (booking.notes) {
      message += `📝 *Notes:* ${booking.notes}\n\n`
    }

    message += `⏰ *Booked at:* ${new Date(booking.created_at).toLocaleString('en-SG')}

Please review and confirm this booking! 🎉`

    console.log('📝 Message prepared:', message.substring(0, 100) + '...')

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    console.log('📤 Sending to Telegram API...')
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    })

    console.log('📡 Telegram API response status:', telegramResponse.status)

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text()
      console.error('❌ Telegram API error:', errorText)
      
      return new Response(
        JSON.stringify({ 
          error: 'Telegram API error',
          status: telegramResponse.status,
          details: errorText,
          bot_token_preview: TELEGRAM_BOT_TOKEN.substring(0, 10) + '...',
          chat_id: TELEGRAM_CHAT_ID
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const telegramResult = await telegramResponse.json()
    console.log('✅ Telegram notification sent successfully!')
    console.log('📊 Telegram response:', JSON.stringify(telegramResult, null, 2))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Telegram notification sent successfully',
        booking_id: booking.id,
        telegram_result: telegramResult
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('💥 Error in telegram-notify function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})