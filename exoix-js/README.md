# Exoix JS - Discord Presence Tracker

A JavaScript/Node.js version of the Discord presence tracker.

## Features

✅ **Discord Bot** - Tracks user presences  
✅ **REST API** - `/v1/users/{id}` endpoint  
✅ **WebSocket** - Real-time updates  
✅ **Website** - Status tracker, home page, credits  
✅ **Redis** - Optional caching (if REDIS_URI is provided)  

## Quick Deploy

### Railway
1. Go to [Railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. Select this repository
4. Add environment variable: `BOT_TOKEN=your_discord_bot_token`
5. Add Redis database (optional)

### Render
1. Go to [Render.com](https://render.com)
2. **New** → **Blueprint**
3. Connect this repository
4. Add your bot token
5. Deploy!

## Local Development

```bash
# Install dependencies
npm install

# Set environment variables
export BOT_TOKEN="your_discord_bot_token"
export REDIS_URI="redis://localhost:6379"  # Optional

# Start the server
npm start

# Or for development
npm run dev
```

## API Endpoints

- `GET /` - Website home
- `GET /home` - Website home page
- `GET /credits` - Credits page
- `GET /v1/users/{id}` - User presence data
- `POST /v1/users/{id}/monitor` - Add user to monitoring
- `GET /socket` - WebSocket connection
- `GET /health` - Health check

## Environment Variables

- `BOT_TOKEN` - Your Discord bot token (required)
- `REDIS_URI` - Redis connection string (optional)
- `PORT` - Server port (default: 4001)

## Discord Bot Setup

1. Create a Discord application at https://discord.com/developers/applications
2. Create a bot and get the token
3. Add these permissions:
   - View Channels
   - Read Message History
   - Send Messages
   - Use Slash Commands
4. Invite the bot to your server

## Support

Need help? Join our Discord: https://discord.gg/qJeqC2m8Jc
