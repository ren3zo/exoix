# 🚀 Exoix Deployment Guide

## Quick Deploy Options

### 1. Railway (Recommended - Free)
1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables:
   - `BOT_TOKEN`: Your Discord bot token
   - `REDIS_URI`: Railway will provide this automatically
4. Deploy!

### 2. Render (Alternative - Free)
1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set build command: `mix deps.get && mix compile`
5. Set start command: `mix run --no-halt`
6. Add environment variables (same as above)

## Environment Variables Required

```bash
BOT_TOKEN=your_discord_bot_token_here
REDIS_URI=redis://localhost:6379  # Will be auto-provided by platform
```

## Features Included

✅ **Discord Bot** - Commands and presence tracking  
✅ **REST API** - `/v1/users/{id}` endpoint  
✅ **WebSocket** - Real-time updates  
✅ **Website** - Status tracker, home page, credits  
✅ **Redis** - Caching and session storage  

## API Endpoints

- `GET /` - Website home
- `GET /home` - Website home page
- `GET /credits` - Credits page
- `GET /v1/users/{id}` - User presence data
- `GET /socket` - WebSocket connection
- `GET /metrics` - Application metrics

## Discord Bot Commands

- `/get {user_id}` - Get user presence
- `/set {key} {value}` - Set KV data
- `/kv {key}` - Get KV data
- `/del {key}` - Delete KV data
- `/api_key` - Generate API key

## Custom Domain Setup

1. Deploy to your chosen platform
2. Add custom domain: `exoix.lol`
3. Update DNS records as instructed by platform
4. Enable HTTPS

## Local Development

```bash
# Install dependencies
mix deps.get

# Set environment variables
$env:BOT_TOKEN="your_token"
$env:REDIS_URI="redis://localhost:6379"

# Run the application
mix run --no-halt
```

## Support

Need help? Join our Discord: https://discord.gg/qJeqC2m8Jc
