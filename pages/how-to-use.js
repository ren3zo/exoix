import { motion } from "framer-motion";

function FloatingIcons() {
	const icons = Array.from({ length: 8 }).map((_, i) => i);
	return (
		<div aria-hidden className="floating-icons">
			{icons.map((i) => (
				<motion.img
					key={i}
					src="/discord.svg"
					alt=""
					className="floating-icon"
					initial={{ opacity: 0, y: 8, scale: .95 }}
					animate={{ opacity: [0.3, .7, .3], y: [0, -20, 0], x: [0, 6, -6, 0], scale: [0.96, 1.02, 0.98] }}
					transition={{ duration: 6 + i * .2, repeat: Infinity, ease: "easeInOut" }}
					style={{ left: `${(i * 13) % 100}%`, top: `${(i * 19) % 100}%` }}
				/>
			))}
		</div>
	);
}

export default function HowToUse() {
	return (
		<div className="container">
			<FloatingIcons />
			<nav className="nav-bar" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem',padding:'1rem 0'}}>
				<a href="/" style={{color:'#7289da',textDecoration:'none',fontWeight:500}}>← Back to Status Tracker</a>
				<div className="nav-links" style={{display:'flex',gap:'2rem'}}>
					<a href="/home">Home</a>
					<a href="/credits">Credits</a>
				</div>
			</nav>

			<motion.div style={{textAlign:'center',marginBottom:'2rem'}} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
				<motion.h1 style={{fontSize:'2.4rem',fontWeight:700,marginBottom:'.5rem',background:'linear-gradient(45deg, #7289da, #5865f2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>How to Use Exoix</motion.h1>
				<p style={{opacity:.85,maxWidth:700,margin:'0 auto'}}>Follow these simple steps to view Discord presence data powered by the Lanyard API.</p>
			</motion.div>

			<section className="credit-section" style={{maxWidth:900,margin:'0 auto'}}>
				<ol style={{lineHeight:1.8,opacity:.95,paddingLeft:'1.25rem'}}>
					<li>Open the <a href="/" style={{color:'#7289da'}}>Status Tracker</a> page.</li>
					<li>Copy your Discord User ID (enable Developer Mode in Discord → Right-click your profile → Copy ID).</li>
					<li>Paste the ID into the input and click "Check Status".</li>
					<li>View live status, activities, and Spotify info if available.</li>
				</ol>

				<div style={{marginTop:'2rem'}}>
					<h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'.5rem'}}>Use the public API directly</h2>
					<p style={{opacity:.85,marginBottom:'.5rem'}}>You can fetch presence data directly from the Lanyard API:</p>
					<pre style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'1rem',borderRadius:10,overflow:'auto'}}>
						<code>{`fetch('https://api.lanyard.rest/v1/users/701092816419553330')\n  .then(r => r.json())\n  .then(({ data }) => console.log(data));`}</code>
					</pre>

					<p style={{opacity:.85,marginTop:'1rem'}}>Or with async/await:</p>
					<pre style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',padding:'1rem',borderRadius:10,overflow:'auto'}}>
						<code>{`const res = await fetch('https://api.lanyard.rest/v1/users/YOUR_DISCORD_USER_ID');\nconst { data } = await res.json();\n// data.discord_status, data.activities, data.spotify, data.discord_user, data.kv`}</code>
					</pre>
				</div>

				<div style={{marginTop:'2rem'}}>
					<h2 style={{color:'#fff',fontSize:'1.2rem',marginBottom:'.5rem'}}>Attribution</h2>
					<p style={{opacity:.9}}>Presence data is provided by <a href="https://lanyard.rest" target="_blank" rel="noreferrer" style={{color:'#7289da'}}>Lanyard</a> by <a href="https://github.com/Phineas" target="_blank" rel="noreferrer" style={{color:'#7289da'}}>Phineas</a>. Thank you for the amazing service.</p>
				</div>
			</section>

			<footer className="footer" style={{marginTop:'3rem'}}>
				<p>Built with ❤️ by Uni • <a href="https://exoix.lol" target="_blank" rel="noreferrer">exoix.lol</a></p>
				<small>Powered by Lanyard API</small>
			</footer>
		</div>
	);
}

