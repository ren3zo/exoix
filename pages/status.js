import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

function FloatingIcons() {
	const icons = Array.from({ length: 12 }).map((_, i) => ({ id: i }));
	return (
		<div aria-hidden className="floating-icons">
			{icons.map((icon) => (
				<motion.img
					key={icon.id}
					src="/discord.svg"
					alt=""
					className="floating-icon"
					initial={{ opacity: 0, y: 20, scale: 0.8 }}
					animate={{
						opacity: [0.4, 0.8, 0.4],
						y: [0, -30, 0],
						x: [0, 10, -10, 0],
						scale: [0.9, 1.05, 0.95],
					}}
					transition={{ duration: 8 + icon.id * 0.2, repeat: Infinity, ease: "easeInOut" }}
					style={{ left: `${(icon.id * 9) % 100}%`, top: `${(icon.id * 13) % 100}%` }}
				/>
			))}
		</div>
	);
}

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
		const id = setInterval(() => { fetchData(); }, 30000);
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
			<Navbar />
			<FloatingIcons />
			<header className="header">
				<motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>Exoix</motion.h1>
				<motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05, duration: .6 }}>Check what your friends are up to in real-time! 🎮</motion.p>
				<motion.div className="subtitle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .6 }}>Made with ❤️ by Uni</motion.div>
				<div style={{ marginTop: "1rem" }}>
					<a href="/" style={{ color: "#7289da", textDecoration: "none", fontSize: ".9rem" }}>← Back to Home</a>
				</div>
			</header>

			<div className="search-section">
				<motion.div className="search-box" initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .4 }}>
					<input value={userId} onChange={e => setUserId(e.target.value.trim())} placeholder="Paste a Discord User ID here..." />
					<motion.button whileTap={{ scale: .98 }} whileHover={{ y: -1, boxShadow: "0 4px 12px rgba(114, 137, 218, 0.3)" }} onClick={fetchData}>Check Status</motion.button>
				</motion.div>
				<div className="help-text">
					<small>💡 Don't know your Discord ID? Right-click your profile and copy ID!</small>
				</div>
			</div>

			<div className="status-container">
				<AnimatePresence mode="wait">
					{loading && (
						<motion.div key="loading" className="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
							<div className="spinner" />
							<p>Loading user data...</p>
							<small>This might take a few seconds</small>
						</motion.div>
					)}

					{!loading && error && (
						<motion.div key="error" className="error-message" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }}>
							<i className="fas fa-exclamation-triangle"></i>
							<p>{error}</p>
						</motion.div>
					)}

					{!loading && !error && data && (
						<motion.div key="card" className="user-card" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}>
							<div className="user-header">
								<motion.img src={avatarUrl} alt={discordUser.username || "User"} className="user-avatar" onError={(e)=>{e.currentTarget.src='https://cdn.discordapp.com/embed/avatars/0.png'}} initial={{ scale: .95 }} animate={{ scale: 1 }} transition={{ duration: .3 }} />
								<div className="user-info">
									<h2>{data.discord_user.username}#{data.discord_user.discriminator}</h2>
									<div className="status">
										<motion.div className={`status-indicator ${getStatusClass(data.discord_status)}`} layoutId="status-indicator" />
										{getStatusText(data.discord_status)}
									</div>
								</div>
							</div>

							{data.listening_to_spotify && data.spotify && (
								<div className="activity-section">
									<h3><i className="fab fa-spotify"></i> Currently Listening</h3>
									<motion.div className="activity-card spotify-card" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .35 }}>
										<img src={data.spotify.album_art_url} alt="Album Art" className="spotify-album-art" />
										<div className="spotify-info">
											<h4>{data.spotify.song}</h4>
											<p>by {data.spotify.artist} • {data.spotify.album}</p>
										</div>
									</motion.div>
								</div>
							)}

							{data.activities && data.activities.filter(a => a.name !== "Spotify" && a.type !== 2).length > 0 && (
								<div className="activity-section">
									<h3><i className="fas fa-gamepad"></i> Current Activity</h3>
									{data.activities.filter(a => a.name !== "Spotify" && a.type !== 2).map((activity, idx) => (
										<motion.div className="activity-card" key={idx} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .25, delay: idx * .05 }}>
											<h4>{activity.name}</h4>
											{activity.details && <p><strong>{activity.details}</strong></p>}
											{activity.state && <p>{activity.state}</p>}
										</motion.div>
									))}
								</div>
							)}

							{data.kv && Object.keys(data.kv).length > 0 && (
								<div className="activity-section">
									<h3><i className="fas fa-info-circle"></i> Custom Info</h3>
									{Object.entries(data.kv).map(([key, value]) => (
										<motion.div className="activity-card" key={key} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .25 }}>
											<h4>{key}</h4>
											<p>{String(value)}</p>
										</motion.div>
									))}
								</div>
							)}

							{!data?.listening_to_spotify && (!data?.activities || data.activities.length === 0) && (
								<div className="no-activity">
									<p>No current activity detected. Maybe they're just chilling? 😴</p>
								</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className="features">
				{[
					{ icon: "fas fa-music", title: "Spotify Integration", desc: "See what music they're vibing to right now 🎵" },
					{ icon: "fas fa-gamepad", title: "Game Activity", desc: "Find out what games they're playing (or losing at 😄)" },
					{ icon: "fas fa-code", title: "Dev Status", desc: "See if they're coding something cool or just debugging" },
				].map((f, idx) => (
					<motion.div key={f.title} className="feature-card" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: idx * .05, duration: .35 }}>
						<i className={f.icon}></i>
						<h3>{f.title}</h3>
						<p>{f.desc}</p>
					</motion.div>
				))}
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