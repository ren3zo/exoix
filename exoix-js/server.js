const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const redis = require('redis');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Redis client
let redisClient;
if (process.env.REDIS_URI) {
  redisClient = redis.createClient({
    url: process.env.REDIS_URI
  });
  redisClient.connect().catch(err => {
    console.warn('Redis connection failed:', err.message);
    console.log('Continuing without Redis...');
  });
} else {
  console.log('No REDIS_URI provided, running without Redis');
}

// Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

// Store user presences
const userPresences = new Map();
const webSocketClients = new Set();

// WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Discord bot events
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('you <3', { type: 3 }); // Watching
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
  const userId = newPresence.user.id;
  const presence = {
    user: {
      id: userId,
      username: newPresence.user.username,
      discriminator: newPresence.user.discriminator,
      avatar: newPresence.user.avatar,
      bot: newPresence.user.bot
    },
    status: newPresence.status,
    activities: newPresence.activities,
    clientStatus: newPresence.clientStatus
  };

  userPresences.set(userId, presence);
  
  // Broadcast to WebSocket clients
  const message = JSON.stringify({
    op: 0,
    t: 'PRESENCE_UPDATE',
    d: presence
  });
  
  webSocketClients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
});

client.on('guildMemberAdd', (member) => {
  console.log(`User ${member.user.id} joined guild`);
});

// WebSocket connection handling
wss.on('connection', (ws, request) => {
  webSocketClients.add(ws);
  
  // Send initial state
  const initState = {};
  userPresences.forEach((presence, userId) => {
    initState[userId] = presence;
  });
  
  ws.send(JSON.stringify({
    op: 0,
    t: 'INIT_STATE',
    d: initState
  }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.op === 2) { // Initialize
        // Handle subscription
        if (message.d.subscribe_to_ids) {
          const subscribedUsers = {};
          message.d.subscribe_to_ids.forEach(userId => {
            if (userPresences.has(userId)) {
              subscribedUsers[userId] = userPresences.get(userId);
            }
          });
          ws.send(JSON.stringify({
            op: 0,
            t: 'INIT_STATE',
            d: subscribedUsers
          }));
        }
      } else if (message.op === 3) { // Heartbeat
        // Send heartbeat ack
        ws.send(JSON.stringify({ op: 3 }));
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });

  ws.on('close', () => {
    webSocketClients.delete(ws);
  });
});

// API Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/credits', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'credits.html'));
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});

app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

// API endpoints
app.get('/v1/users/:id', (req, res) => {
  const userId = req.params.id;
  const presence = userPresences.get(userId);
  
  if (presence) {
    res.json({
      success: true,
      data: presence
    });
  } else {
    res.status(404).json({
      success: false,
      error: {
        code: 'user_not_monitored',
        message: 'User is not being monitored by Exoix'
      }
    });
  }
});

app.post('/v1/users/:id/monitor', (req, res) => {
  const userId = req.params.id;
  
  // Create a basic user presence
  const presence = {
    user: {
      id: userId,
      username: 'Uni',
      discriminator: '0000',
      avatar: null,
      bot: false
    },
    status: 'online',
    activities: [
      {
        name: 'Coding',
        type: 0,
        details: 'Building something awesome'
      }
    ],
    clientStatus: {
      desktop: 'online',
      mobile: 'online'
    }
  };
  
  userPresences.set(userId, presence);
  
  res.json({
    success: true,
    message: `User ${userId} added to monitoring`
  });
});

app.get('/socket', (req, res) => {
  res.status(400).json({ error: 'WebSocket endpoint - use WebSocket connection' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Exoix JS server running on port ${PORT}`);
});

// Attach WebSocket server to HTTP server
server.on('upgrade', (request, socket, head) => {
  if (request.url === '/socket') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Login to Discord
const botToken = process.env.BOT_TOKEN;
if (botToken) {
  client.login(botToken).catch(err => {
    console.warn('Discord bot login failed:', err.message);
    console.log('Continuing without Discord bot...');
  });
} else {
  console.warn('No BOT_TOKEN provided - Discord bot will not start');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    client.destroy();
    if (redisClient) {
      redisClient.quit();
    }
    process.exit(0);
  });
});
