# 🤖 Telegram Bot Setup for Trattoria Italiana

## Overview
This guide will help you set up a Telegram bot to receive instant notifications whenever a customer makes a booking on your website.

## Step 1: Create Your Telegram Bot

### 1.1 Start with BotFather
1. Open Telegram and search for `@BotFather`
2. Start a chat and send `/newbot`
3. Choose a name: `Trattoria Italiana Bookings`
4. Choose a username: `trattoria_italiana_bot` (or similar)
5. **Save the Bot Token** - you'll need this later!

### 1.2 Configure Your Bot
Send these commands to BotFather:
```
/setdescription
Receive instant notifications for new bookings at Trattoria Italiana
```

```
/setabouttext
Private chef booking notifications for Trattoria Italiana by Sound of Love with Luca
```

## Step 2: Get Your Chat ID

### Option A: Personal Notifications
1. Start a chat with your new bot
2. Send any message (e.g., "Hello")
3. Visit this URL in your browser:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
4. Look for `"chat":{"id":XXXXXXX` - this number is your Chat ID

### Option B: Group Notifications (Recommended)
1. Create a new group in Telegram
2. Add your bot to the group
3. Make the bot an admin (optional but recommended)
4. Send a message mentioning the bot: `@your_bot_name hello`
5. Visit the same URL as above
6. Look for the group's chat ID (will be negative, like `-123456789`)

## Step 3: Configure Supabase

### 3.1 Set Environment Variables
1. Go to your Supabase Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these two variables:

| Variable Name | Value | Example |
|---------------|-------|---------|
| `TELEGRAM_BOT_TOKEN` | Your bot token from BotFather | `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz` |
| `TELEGRAM_CHAT_ID` | Your chat ID from Step 2 | `123456789` or `-123456789` |

### 3.2 Set Up Database Webhook
1. In Supabase Dashboard, go to **Database** → **Webhooks**
2. Click **"Create a new webhook"**
3. Configure as follows:

| Field | Value |
|-------|-------|
| **Name** | `Telegram Booking Notifications` |
| **Table** | `bookings` |
| **Events** | ✅ Insert |
| **Type** | HTTP Request |
| **Method** | POST |
| **URL** | `https://YOUR_PROJECT_REF.supabase.co/functions/v1/telegram-notify` |

4. Add HTTP Headers:
   ```
   Content-Type: application/json
   Authorization: Bearer YOUR_SUPABASE_ANON_KEY
   ```

## Step 4: Test the Integration

### 4.1 Make a Test Booking
1. Go to your website's booking page
2. Complete a test booking
3. Check your Telegram chat for the notification

### 4.2 Expected Notification Format
You should receive a message like this:

```
🍝 New Booking Alert! 🍝

📋 Booking Details:
• ID: abc12345...
• Type: DINING
• Package: I love Italian Food
• Date: Saturday, February 15, 2025
• Guests: 8
• Total: $1700 SGD

👤 Customer Info:
• Phone: +65 9123 4567
• Email: customer@example.com

🏠 Venue: Customer's Home
• Address: 123 Orchard Road, Singapore

🥗 Dietary Requirements: 2 vegetarian guests

📝 Notes: Anniversary celebration

⏰ Booked at: 15/2/2025, 2:30:45 PM

Please review and confirm this booking! 🎉
```

## Step 5: Troubleshooting

### Bot Not Responding
- ✅ Verify you've started a chat with the bot
- ✅ Check the bot token is correct
- ✅ Ensure the bot username is unique

### No Notifications Received
- ✅ Check webhook logs in Supabase Dashboard
- ✅ Verify environment variables are set correctly
- ✅ Ensure the webhook URL is correct
- ✅ Check that the chat ID is correct (positive for personal, negative for groups)

### Webhook Errors
1. Go to **Database** → **Webhooks** in Supabase
2. Click on your webhook to see logs
3. Look for error messages and status codes

### Testing the Edge Function Directly
You can test the function manually:
```bash
curl -X POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/telegram-notify' \
  -H 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "INSERT",
    "table": "bookings",
    "record": {
      "id": "test-123",
      "booking_type": "dining",
      "phone_number": "+65 9123 4567",
      "email": "test@example.com"
    }
  }'
```

## Step 6: Advanced Configuration

### Multiple Notification Channels
You can set up different bots for different types of bookings:
- `TELEGRAM_DINING_CHAT_ID` for dining bookings
- `TELEGRAM_SPECIAL_CHAT_ID` for special orders
- `TELEGRAM_COLLAB_CHAT_ID` for collaborations

### Custom Message Formatting
Edit the edge function to customize notification messages, add emojis, or include additional booking details.

### Notification Scheduling
Set up quiet hours by modifying the edge function to check the time before sending notifications.

## Security Best Practices

1. **Keep Tokens Secret**: Never share your bot token publicly
2. **Use Groups**: Consider using a private group instead of personal chat
3. **Monitor Logs**: Regularly check webhook logs for issues
4. **Backup Configuration**: Save your bot token and chat ID securely

## Support

If you encounter issues:
1. Check the Supabase webhook logs
2. Verify all environment variables are set
3. Test the bot manually by sending messages
4. Ensure the edge function is deployed correctly

Your Telegram bot integration is now ready! You'll receive instant notifications for every booking, helping you stay on top of your private dining business. 🍝✨