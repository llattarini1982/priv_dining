# 🤖 Complete Telegram Bot Setup for Booking Notifications

## Current Status
✅ Edge function is deployed and running  
❌ Telegram bot not created yet  
❌ Environment variables not configured  

## Step 1: Create Your Telegram Bot

### 1.1 Open Telegram and Find BotFather
1. Open Telegram on your phone or computer
2. Search for `@BotFather` (official Telegram bot for creating bots)
3. Start a chat with BotFather

### 1.2 Create Your Bot
Send these commands one by one:

```
/newbot
```

BotFather will ask for:
1. **Bot name**: `Trattoria Italiana Bookings`
2. **Bot username**: `trattoria_italiana_bookings_bot` (must end with 'bot')

### 1.3 Save Your Bot Token
BotFather will give you a message like:
```
Congratulations! Here is your token:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**IMPORTANT**: Copy and save this token - you'll need it in Step 3!

## Step 2: Get Your Chat ID

### Option A: Personal Chat (Simple)
1. Start a chat with your new bot
2. Send any message to the bot (e.g., "Hello")
3. Open this URL in your browser (replace YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for something like:
   ```json
   "chat":{"id":123456789,"first_name":"Your Name"
   ```
   The number `123456789` is your Chat ID

### Option B: Group Chat (Recommended for Business)
1. Create a new group in Telegram
2. Add your bot to the group
3. Send a message in the group: `@your_bot_name hello`
4. Use the same URL as above
5. Look for a negative number like `-987654321` - this is your group Chat ID

## Step 3: Configure Supabase Environment Variables

### 3.1 Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in and select your project
3. Go to **Settings** → **Environment Variables**

### 3.2 Add Environment Variables
Click **"Add variable"** and add these two:

**Variable 1:**
- Name: `TELEGRAM_BOT_TOKEN`
- Value: Your bot token from Step 1.3 (e.g., `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789`)

**Variable 2:**
- Name: `TELEGRAM_CHAT_ID`
- Value: Your chat ID from Step 2 (e.g., `123456789` or `-987654321`)

### 3.3 Save and Deploy
Click **"Save"** - the environment variables will be available immediately.

## Step 4: Set Up Database Webhook

### 4.1 Create Webhook
1. In Supabase Dashboard, go to **Database** → **Webhooks**
2. Click **"Create a new webhook"**

### 4.2 Configure Webhook
Fill in these details:

| Field | Value |
|-------|-------|
| **Name** | `Telegram Booking Notifications` |
| **Table** | `bookings` |
| **Events** | ✅ Insert (check this box) |
| **Type** | HTTP Request |
| **Method** | POST |
| **URL** | `https://gorqsjxkvbtqdwasddoi.supabase.co/functions/v1/telegram-notify` |

### 4.3 Add Headers
In the **HTTP Headers** section, add:
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcnFzanhrdmJ0cWR3YXNkZG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMjg3MzksImV4cCI6MjA1MzgwNDczOX0.CrWGrFnIYTYV0Zd05MUVSKZUW2IL0SP-X_lTmCBvpmA
```

### 4.4 Save Webhook
Click **"Create webhook"**

## Step 5: Test Your Setup

### 5.1 Test the Bot
1. Go to your Telegram bot
2. Send `/start` to activate it
3. Send any message - the bot won't respond yet, but this confirms it's working

### 5.2 Test a Booking
1. Go to your website: https://localhost:5173/booking
2. Make a test booking
3. Check your Telegram chat for a notification

### 5.3 Expected Notification
You should receive something like:
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

Please review and confirm this booking! 🎉
```

## Step 6: Troubleshooting

### If No Notification Appears:

1. **Check Environment Variables**
   - Go to Supabase → Settings → Environment Variables
   - Verify both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are set

2. **Check Webhook Logs**
   - Go to Supabase → Database → Webhooks
   - Click on your webhook to see logs
   - Look for any error messages

3. **Verify Bot Token**
   - Test your bot token by visiting:
     ```
     https://api.telegram.org/botYOUR_BOT_TOKEN/getMe
     ```
   - Should return bot information

4. **Check Chat ID**
   - Make sure you've sent at least one message to the bot/group
   - Verify the Chat ID format (positive for personal, negative for groups)

### Common Issues:

**"Bot not found"**: Bot token is incorrect
**"Chat not found"**: Chat ID is wrong or bot hasn't been messaged
**"Forbidden"**: Bot was blocked or removed from group

## Step 7: Advanced Configuration

### Multiple Notification Types
You can set up different chats for different booking types by adding more environment variables:
- `TELEGRAM_SPECIAL_ORDERS_CHAT_ID`
- `TELEGRAM_COLLABORATIONS_CHAT_ID`

### Quiet Hours
Modify the edge function to not send notifications during certain hours.

### Custom Messages
Edit the edge function to customize notification format and content.

## Quick Reference

**Your Bot Token**: (Save this securely)
**Your Chat ID**: (Save this securely)
**Webhook URL**: `https://gorqsjxkvbtqdwasddoi.supabase.co/functions/v1/telegram-notify`

## Need Help?

1. Check the edge function logs in Supabase
2. Verify all steps above are completed
3. Test each component individually
4. Make sure the bot is not blocked

Once completed, you'll receive instant Telegram notifications for every booking! 🚀