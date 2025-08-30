# 🤖 Complete Telegram Bot Setup for Trattoria Italiana

## Step 1: Create Your Telegram Bot

### 1.1 Open Telegram and Find BotFather
1. Open Telegram on your phone or computer
2. In the search bar, type: `@BotFather`
3. Click on the official BotFather (it will have a blue checkmark)
4. Click **"START"** or send `/start`

### 1.2 Create Your Bot
Send this command:
```
/newbot
```

BotFather will ask you two questions:

**Question 1: "Alright, a new bot. How are we going to call it?"**
Answer: `Trattoria Italiana Bookings`

**Question 2: "Good. Now let's choose a username for your bot."**
Answer: `trattoria_italiana_bookings_bot`

### 1.3 Save Your Bot Token
BotFather will respond with something like:
```
Done! Congratulations on your new bot. You will find it at t.me/trattoria_italiana_bookings_bot

Use this token to access the HTTP API:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz123456789

Keep your token secure and store it safely, it can be used by anyone to control your bot.
```

**🚨 IMPORTANT**: Copy this token and save it somewhere safe! You'll need it in Step 3.

## Step 2: Get Your Chat ID

### Option A: Personal Notifications (Simple)
1. Find your new bot by searching `@trattoria_italiana_bookings_bot` in Telegram
2. Click **"START"** and send any message like "Hello"
3. Open this URL in your web browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. You'll see JSON data. Look for something like:
   ```json
   "chat":{"id":123456789,"first_name":"Your Name"
   ```
   The number `123456789` is your Chat ID - save it!

### Option B: Group Notifications (Recommended for Business)
1. Create a new group in Telegram
2. Add your bot to the group (search for `@trattoria_italiana_bookings_bot`)
3. Make your bot an admin (optional but recommended)
4. Send a message in the group: `@trattoria_italiana_bookings_bot hello`
5. Use the same URL as above
6. Look for a negative number like `-987654321` - this is your group Chat ID

## Step 3: Configure Supabase Environment Variables

### 3.1 Access Supabase Dashboard
1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: `gorqsjxkvbtqdwasddoi`
4. Go to **Settings** → **Environment Variables**

### 3.2 Add Your Bot Configuration
Click **"Add variable"** and create these two variables:

**Variable 1:**
- **Name**: `TELEGRAM_BOT_TOKEN`
- **Value**: Your bot token from Step 1.3 (the long string like `1234567890:ABC...`)

**Variable 2:**
- **Name**: `TELEGRAM_CHAT_ID`
- **Value**: Your chat ID from Step 2 (like `123456789` or `-987654321`)

### 3.3 Save Changes
Click **"Save"** - the variables will be available immediately.

## Step 4: Set Up Database Webhook

### 4.1 Create the Webhook
1. In your Supabase Dashboard, go to **Database** → **Webhooks**
2. Click **"Create a new webhook"**

### 4.2 Configure the Webhook
Fill in these exact details:

| Field | Value |
|-------|-------|
| **Name** | `Telegram Booking Notifications` |
| **Table** | `bookings` |
| **Events** | ✅ Insert (check this box only) |
| **Type** | HTTP Request |
| **HTTP Method** | POST |
| **URL** | `https://gorqsjxkvbtqdwasddoi.supabase.co/functions/v1/telegram-notify` |

### 4.3 Add HTTP Headers
In the **HTTP Headers** section, click **"Add header"** and add:

**Header 1:**
- **Key**: `Content-Type`
- **Value**: `application/json`

**Header 2:**
- **Key**: `Authorization`
- **Value**: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcnFzanhrdmJ0cWR3YXNkZG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMjg3MzksImV4cCI6MjA1MzgwNDczOX0.CrWGrFnIYTYV0Zd05MUVSKZUW2IL0SP-X_lTmCBvpmA`

### 4.4 Save the Webhook
Click **"Create webhook"**

## Step 5: Test Your Setup

### 5.1 Test the Bot First
1. Go to your Telegram bot
2. Send `/start` to activate it
3. Send any message like "Test" - the bot won't respond, but this confirms it's working

### 5.2 Make a Test Booking
1. Go to your website: `http://localhost:5173/booking`
2. Fill out and submit a test booking
3. Check your Telegram chat within 30 seconds

### 5.3 Expected Notification
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

⏰ Booked at: 15/2/2025, 2:30:45 PM

Please review and confirm this booking! 🎉
```

## Step 6: Troubleshooting

### If You Don't Receive Notifications:

**Check 1: Environment Variables**
- Go to Supabase → Settings → Environment Variables
- Verify both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are there
- Make sure there are no extra spaces in the values

**Check 2: Bot Token**
Test your bot token by visiting this URL:
```
https://api.telegram.org/botYOUR_BOT_TOKEN/getMe
```
Should return information about your bot.

**Check 3: Chat ID**
- Make sure you've sent at least one message to the bot
- For groups: ensure the bot is added and you've mentioned it
- Personal chats: Chat ID is positive (e.g., `123456789`)
- Group chats: Chat ID is negative (e.g., `-123456789`)

**Check 4: Webhook Logs**
- Go to Supabase → Database → Webhooks
- Click on your webhook to see logs
- Look for any error messages

### Common Error Messages:

- **"Bot not found"**: Your bot token is incorrect
- **"Chat not found"**: Your chat ID is wrong or you haven't messaged the bot
- **"Forbidden"**: The bot was blocked or removed from the group

## Step 7: Success Confirmation

Once everything is working, you'll see:

1. ✅ **Telegram bot responds** when you send `/start`
2. ✅ **Webhook shows successful calls** in Supabase logs
3. ✅ **Notifications arrive instantly** when bookings are made
4. ✅ **Edge function logs show** successful HTTP requests

## Quick Reference Card

**Your Bot Username**: `@trattoria_italiana_bookings_bot`
**Bot Token**: (Keep this secret!)
**Chat ID**: (Keep this secret!)
**Webhook URL**: `https://gorqsjxkvbtqdwasddoi.supabase.co/functions/v1/telegram-notify`

## Next Steps

Once your bot is working:
- Pin important booking notifications
- Set up quiet hours if needed
- Create different groups for different booking types
- Add team members to the notification group

---

**Need help?** Check each step carefully and make sure all values are copied exactly. The most common issues are typos in the bot token or chat ID.

Your restaurant notification system will be live once you complete these steps! 🚀