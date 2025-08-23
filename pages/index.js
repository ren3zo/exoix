import { useEffect, useState, useCallback } from "react";

function getStatusClass(status) {
	switch (status) {
		case "online": return "status-online";
		case "idle": return "status-idle";
		case "dnd": return "status-dnd";
		default: return "status-offline";
	}
}

function getStatusText(status) {
	switch (status) {
		case "online": return "Online";
		case "idle": return "Idle";
		case "dnd": return "Do Not Disturb";
		default: return "Offline";
	}
}

export default function StatusTracker() {
	const [userId, setUserId] = useState("701092816419553330");
	const [data, setData] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(async () => {
		if (!userId) {
			setError("Please enter a Discord User ID!");
			return;
		}
		setLoading(true);
		setError("");
		try {
			const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
			if (!res.ok) throw new Error("User not found or API is down");
			const json = await res.json();
			setData(json.data);
		} catch (e) {
			setError(`Oops! Something went wrong: ${e.message}`);
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [userId]);

	useEffect(() => {
		fetchData();
		const id = setInterval(() => {
			fetchData();
		}, 30000);
		return () => clearInterval(id);
	}, [fetchData]);

	const discordUser = data?.discord_user || {};
	const avatarHash = discordUser.avatar || "";
	const isGif = typeof avatarHash === "string" && avatarHash.startsWith("a_");
	const avatarExt = isGif ? "gif" : "png";
	const fallbackIndex = Number(discordUser.discriminator ?? 0) % 5;
	const avatarUrl = avatarHash
		? `https://cdn.discordapp.com/avatars/${discordUser.id}/${avatarHash}.${avatarExt}?size=1024`
		: `https://cdn.discordapp.com/embed/avatars/${fallbackIndex}.png`;

	return (
		<div className="container">
			<header className="header">
				<h1>Exoix</h1>
				<p>Check what your friends are up to in real-time! 🎮</p>
				<div className="subtitle">Made with ❤️ by Uni</div>
				<div style={{ marginTop: "1rem" }}>
					<a href="/home" style={{ color: "#7289da", textDecoration: "none", fontSize: ".9rem" }}>← Back to Home</a>
				</div>
			</header>

			<div className="search-section">
				<div className="search-box">
					<input value={userId} onChange={e => setUserId(e.target.value.trim())} placeholder="Paste a Discord User ID here..." />
					<button onClick={fetchData}>Check Status</button>
				</div>
				<div className="help-text">
					<small>💡 Don't know your Discord ID? Right-click your profile and copy ID!</small>
				</div>
			</div>

			<div className="status-container">
				{loading && (
					<div className="loading">
						<div className="spinner" />
						<p>Loading user data...</p>
						<small>This might take a few seconds</small>
					</div>
				)}

				{!loading && error && (
					<div className="error-message">
						<i className="fas fa-exclamation-triangle"></i>
						<p>{error}</p>
					</div>
				)}

				{!loading && !error && data && (
					<div className="user-card">
						<div className="user-header">
							<img src={avatarUrl} alt={discordUser.username || "User"} className="user-avatar" onError={(e)=>{e.currentTarget.src='https://cdn.discordapp.com/embed/avatars/0.png'}} />
							<div className="user-info">
								<h2>{data.discord_user.username}#{data.discord_user.discriminator}</h2>
								<div className="status">
									<div className={`status-indicator ${getStatusClass(data.discord_status)}`} />
									{getStatusText(data.discord_status)}
								</div>
							</div>
						</div>

						{data.listening_to_spotify && data.spotify && (
							<div className="activity-section">
								<h3><i className="fab fa-spotify"></i> Currently Listening</h3>
								<div className="activity-card spotify-card">
									<img src={data.spotify.album_art_url} alt="Album Art" className="spotify-album-art" />
									<div className="spotify-info">
										<h4>{data.spotify.song}</h4>
										<p>by {data.spotify.artist} • {data.spotify.album}</p>
									</div>
								</div>
							</div>
						)}

						{data.activities && data.activities.filter(a => a.name !== "Spotify" && a.type !== 2).length > 0 && (
							<div className="activity-section">
								<h3><i className="fas fa-gamepad"></i> Current Activity</h3>
								{data.activities.filter(a => a.name !== "Spotify" && a.type !== 2).map((activity, idx) => (
									<div className="activity-card" key={idx}>
										<h4>{activity.name}</h4>
										{activity.details && <p><strong>{activity.details}</strong></p>}
										{activity.state && <p>{activity.state}</p>}
									</div>
								))}
							</div>
						)}

						{data.kv && Object.keys(data.kv).length > 0 && (
							<div className="activity-section">
								<h3><i className="fas fa-info-circle"></i> Custom Info</h3>
								{Object.entries(data.kv).map(([key, value]) => (
									<div className="activity-card" key={key}>
										<h4>{key}</h4>
										<p>{String(value)}</p>
									</div>
								))}
							</div>
						)}

						{!data?.listening_to_spotify && (!data?.activities || data.activities.length === 0) && (
							<div className="no-activity">
								<p>No current activity detected. Maybe they're just chilling? 😴</p>
							</div>
						)}
					</div>
				)}
			</div>

			<div className="features">
				<div className="feature-card">
					<i className="fas fa-music"></i>
					<h3>Spotify Integration</h3>
					<p>See what music they're vibing to right now 🎵</p>
				</div>
				<div className="feature-card">
					<i className="fas fa-gamepad"></i>
					<h3>Game Activity</h3>
					<p>Find out what games they're playing (or losing at 😄)</p>
				</div>
				<div className="feature-card">
					<i className="fas fa-code"></i>
					<h3>Dev Status</h3>
					<p>See if they're coding something cool or just debugging</p>
				</div>
			</div>

			<footer className="footer">
				<p>
					Built with Next.js • <a href="/credits">Credits</a> • <a href="https://exoix.lol" target="_blank" rel="noreferrer">exoix.lol</a>
				</p>
				<small>Last updated: December 2025 • Probably has bugs 🤷‍♂️</small>
			</footer>
		</div>
	);
}