/*
  # Fix HTTP POST function calls

  1. Updates
    - Update notify_telegram_booking function to use extensions.http_post instead of net.http_post
    - Ensure proper error handling for HTTP requests
    
  2. Security
    - Maintains existing RLS policies
    - No changes to table permissions
*/

-- Update the notify_telegram_booking function to use the correct extensions.http_post
CREATE OR REPLACE FUNCTION notify_telegram_booking()
RETURNS TRIGGER AS $$
DECLARE
  telegram_token TEXT := 'YOUR_TELEGRAM_BOT_TOKEN';
  chat_id TEXT := 'YOUR_TELEGRAM_CHAT_ID';
  message_text TEXT;
  webhook_url TEXT;
  response_data JSONB;
BEGIN
  -- Build the notification message
  message_text := format(
    '🍝 New Booking Alert! 🍝\n\n' ||
    'Booking ID: %s\n' ||
    'Type: %s\n' ||
    'Date: %s\n' ||
    'Guests: %s\n' ||
    'Phone: %s\n' ||
    'Email: %s\n' ||
    'Package: %s\n' ||
    'Total: $%s\n\n' ||
    'Please review and confirm this booking.',
    NEW.id,
    COALESCE(NEW.booking_type, 'N/A'),
    COALESCE(NEW.booking_date::TEXT, 'N/A'),
    COALESCE(NEW.guest_count::TEXT, 'N/A'),
    COALESCE(NEW.phone_number, 'N/A'),
    COALESCE(NEW.email, 'N/A'),
    COALESCE(NEW.selected_package, 'N/A'),
    COALESCE(NEW.total_amount::TEXT, NEW.estimated_total::TEXT, 'N/A')
  );

  -- Construct the Telegram webhook URL
  webhook_url := format('https://api.telegram.org/bot%s/sendMessage', telegram_token);

  -- Only attempt to send if we have valid tokens (not placeholder values)
  IF telegram_token != 'YOUR_TELEGRAM_BOT_TOKEN' AND chat_id != 'YOUR_TELEGRAM_CHAT_ID' THEN
    BEGIN
      -- Use extensions.http_post instead of net.http_post
      SELECT extensions.http_post(
        webhook_url,
        jsonb_build_object(
          'Content-Type', 'application/json'
        ),
        jsonb_build_object(
          'chat_id', chat_id,
          'text', message_text,
          'parse_mode', 'HTML'
        )
      ) INTO response_data;
      
      -- Log the response for debugging (optional)
      INSERT INTO pending_booking_logs (booking_id, payload)
      VALUES (NEW.id, jsonb_build_object(
        'telegram_response', response_data,
        'message_sent', message_text,
        'timestamp', NOW()
      ));
      
    EXCEPTION WHEN OTHERS THEN
      -- Log any errors but don't fail the booking creation
      INSERT INTO pending_booking_logs (booking_id, payload)
      VALUES (NEW.id, jsonb_build_object(
        'error', SQLERRM,
        'message_attempted', message_text,
        'timestamp', NOW()
      ));
    END;
  ELSE
    -- Log that notification was skipped due to missing configuration
    INSERT INTO pending_booking_logs (booking_id, payload)
    VALUES (NEW.id, jsonb_build_object(
      'status', 'notification_skipped',
      'reason', 'telegram_tokens_not_configured',
      'timestamp', NOW()
    ));
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS booking_notify_trigger ON public.bookings;
DROP TRIGGER IF EXISTS trigger_on_new_booking ON public.bookings;

CREATE TRIGGER booking_notify_trigger
  AFTER INSERT ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION notify_telegram_booking();