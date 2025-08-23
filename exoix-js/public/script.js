// Exoix Discord Status Tracker - Made by Uni
let currentUserId = '701092816419553330';

// Load user data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
});

async function loadUserData() {
    const userId = document.getElementById('userId').value.trim();
    if (!userId) {
        showError('Please enter a Discord User ID!');
        return;
    }

    currentUserId = userId;
    showLoading();

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (!response.ok) {
            throw new Error('User not found or API is down');
        }
        const data = await response.json();
        displayUserData(data.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        showError(`Oops! Something went wrong: ${error.message}`);
    }
}

function displayUserData(userData) {
    const container = document.getElementById('statusContainer');
    
    if (!userData) {
        showError('No data found for this user. Maybe they\'re offline?');
        return;
    }

    const statusClass = getStatusClass(userData.discord_status);
    const statusText = getStatusText(userData.discord_status);
    
    const discordUser = userData.discord_user || {};
    const avatarHash = discordUser.avatar || '';
    const isGif = typeof avatarHash === 'string' && avatarHash.startsWith('a_');
    const avatarExt = isGif ? 'gif' : 'png';
    const fallbackIndex = Number(discordUser.discriminator ?? 0) % 5;
    const avatarUrl = avatarHash
        ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${avatarHash}.${avatarExt}?size=1024`
        : `https://cdn.discordapp.com/embed/avatars/${fallbackIndex}.png`;
    
    let html = `
        <div class="user-card">
            <div class="user-header">
                <img src="${avatarUrl}" 
                     alt="${discordUser.username || 'User'}" 
                     class="user-avatar"
                     onerror="this.src='https://cdn.discordapp.com/embed/avatars/0.png'">
                <div class="user-info">
                    <h2>${userData.discord_user.username}#${userData.discord_user.discriminator}</h2>
                    <div class="status">
                        <div class="status-indicator ${statusClass}"></div>
                        ${statusText}
                    </div>
                </div>
            </div>
    `;

    // Spotify section
    if (userData.listening_to_spotify && userData.spotify) {
        html += `
            <div class="activity-section">
                <h3><i class="fab fa-spotify"></i> Currently Listening</h3>
                <div class="activity-card spotify-card">
                    <img src="${userData.spotify.album_art_url}" alt="Album Art" class="spotify-album-art">
                    <div class="spotify-info">
                        <h4>${userData.spotify.song}</h4>
                        <p>by ${userData.spotify.artist} • ${userData.spotify.album}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Other activities
    if (userData.activities && userData.activities.length > 0) {
        const otherActivities = userData.activities.filter(activity => 
            activity.name !== 'Spotify' && activity.type !== 2
        );
        
        if (otherActivities.length > 0) {
            html += `
                <div class="activity-section">
                    <h3><i class="fas fa-gamepad"></i> Current Activity</h3>
            `;
            
            otherActivities.forEach(activity => {
                html += `
                    <div class="activity-card">
                        <h4>${activity.name}</h4>
                        ${activity.details ? `<p><strong>${activity.details}</strong></p>` : ''}
                        ${activity.state ? `<p>${activity.state}</p>` : ''}
                    </div>
                `;
            });
            
            html += `</div>`;
        }
    }

    // KV data (custom user data)
    if (userData.kv && Object.keys(userData.kv).length > 0) {
        html += `
            <div class="activity-section">
                <h3><i class="fas fa-info-circle"></i> Custom Info</h3>
        `;
        
        Object.entries(userData.kv).forEach(([key, value]) => {
            html += `
                <div class="activity-card">
                    <h4>${key}</h4>
                    <p>${value}</p>
                </div>
            `;
        });
        
        html += `</div>`;
    }

    // If no activities at all
    if (!userData.listening_to_spotify && (!userData.activities || userData.activities.length === 0)) {
        html += `
            <div class="no-activity">
                <p>No current activity detected. Maybe they're just chilling? 😴</p>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function getStatusClass(status) {
    switch (status) {
        case 'online': return 'status-online';
        case 'idle': return 'status-idle';
        case 'dnd': return 'status-dnd';
        default: return 'status-offline';
    }
}

function getStatusText(status) {
    switch (status) {
        case 'online': return 'Online';
        case 'idle': return 'Idle';
        case 'dnd': return 'Do Not Disturb';
        default: return 'Offline';
    }
}

function showLoading() {
    const container = document.getElementById('statusContainer');
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading user data...</p>
            <small>This might take a few seconds</small>
        </div>
    `;
}

function showError(message) {
    const container = document.getElementById('statusContainer');
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Add some personality to the input field
document.getElementById('userId').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadUserData();
    }
});

// Auto-refresh every 30 seconds (optional)
setInterval(() => {
    if (currentUserId) {
        loadUserData();
    }
}, 30000);
