# Telegram Bot Setup Instructions

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather and send `/newbot`
3. Follow the instructions to create your bot:
   - Choose a name for your bot (e.g., "Trattoria Italiana Bookings")
   - Choose a username for your bot (must end with 'bot', e.g., "trattoria_bookings_bot")
4. BotFather will give you a **Bot Token** - save this securely!

## Step 2: Get Your Chat ID

### Option A: Personal Chat
1. Start a chat with your new bot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for the `"chat":{"id":` field - this is your Chat ID

### Option B: Group Chat
1. Add your bot to a group
2. Send a message in the group mentioning the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for the group's chat ID (will be negative for groups)

## Step 3: Configure Supabase Environment Variables

1. Go to your Supabase Dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   - `TELEGRAM_BOT_TOKEN`: Your bot token from BotFather
   - `TELEGRAM_CHAT_ID`: Your chat ID from step 2

## Step 4: Set Up Database Webhook

1. In Supabase Dashboard, go to Database → Webhooks
2. Click "Create a new webhook"
3. Configure:
   - **Name**: "Telegram Booking Notifications"
   - **Table**: `bookings`
   - **Events**: Check "Insert"
   - **Type**: "HTTP Request"
   - **HTTP Method**: "POST"
   - **URL**: `https://your-project-ref.supabase.co/functions/v1/telegram-notify`
   - **HTTP Headers**: 
     ```
     Content-Type: application/json
     Authorization: Bearer YOUR_SUPABASE_ANON_KEY
     ```

## Step 5: Test the Integration

1. Make a test booking through your website
2. Check your Telegram chat for the notification
3. If no notification appears, check the webhook logs in Supabase Dashboard

## Troubleshooting

### Bot Not Responding
- Make sure you've started a chat with the bot first
- Verify the bot token is correct
- Check that the bot username is unique

### Webhook Not Triggering
- Verify the webhook URL is correct
- Check the webhook logs in Supabase Dashboard
- Ensure the environment variables are set correctly

### Chat ID Issues
- For personal chats, Chat ID is usually a positive number
- For groups, Chat ID is usually a negative number
- Make sure you've sent at least one message to get the chat in the updates

## Example Notification Format

When a booking is created, you'll receive a message like:

```
🍝 New Booking Alert! 🍝

📋 Booking Details:
• ID: abc123-def456
• Type: DINING
• Package: I love Italian Food
• Date: Saturday, February 15, 2025
• Guests: 8
• Total: $1700 SGD

👤 Customer Info:
• Phone: +65 9123 4567
• Email: customer@example.com
• Address: 123 Orchard Road, Singapore

📝 Notes: Vegetarian options needed for 2 guests

⏰ Booked at: 15/2/2025, 2:30:45 PM

Please review and confirm this booking! 🎉
```

## Security Notes

- Keep your bot token secure and never share it publicly
- The webhook URL should only be accessible by Supabase
- Consider using a dedicated group chat for booking notifications
- Regularly monitor the webhook logs for any issues