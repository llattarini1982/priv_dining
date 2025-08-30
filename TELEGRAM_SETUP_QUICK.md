# 🚀 Quick Telegram Bot Setup

## Your edge function is working! Now let's connect it to Telegram.

### Step 1: Create Bot (2 minutes)
1. Open Telegram, search `@BotFather`
2. Send `/newbot`
3. Name: `Trattoria Italiana Bookings`
4. Username: `trattoria_italiana_bot`
5. **SAVE THE TOKEN** you receive!

### Step 2: Get Chat ID (1 minute)
1. Start chat with your new bot
2. Send "hello"
3. Visit: `https://api.telegram.org/botYOUR_TOKEN/getUpdates`
4. Find `"chat":{"id":123456789` - save this number!

### Step 3: Add to Supabase (1 minute)
Go to Supabase → Settings → Environment Variables:

**Add Variable 1:**
- Name: `TELEGRAM_BOT_TOKEN`
- Value: Your token from step 1

**Add Variable 2:**
- Name: `TELEGRAM_CHAT_ID` 
- Value: Your chat ID from step 2

### Step 4: Test (30 seconds)
1. Make a test booking on your website
2. Check Telegram for notification!

## Troubleshooting
If no notification comes:
1. Check the edge function logs show your environment variables
2. Verify bot token works: `https://api.telegram.org/botYOUR_TOKEN/getMe`
3. Make sure you sent a message to the bot first

The edge function will now show detailed logs to help debug any issues!