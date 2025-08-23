import { motion } from "framer-motion";

function FloatingIcons() {
	const icons = Array.from({ length: 10 }).map((_, i) => i);
	return (
		<div aria-hidden className="floating-icons">
			{icons.map((i) => (
				<motion.img
					key={i}
					src="/discord.svg"
					alt=""
					className="floating-icon"
					initial={{ opacity: 0, y: 10, scale: .9 }}
					animate={{ opacity: [0.3, .7, .3], y: [0, -25, 0], x: [0, 8, -6, 0], scale: [0.95, 1.03, 0.97] }}
					transition={{ duration: 7 + i * .25, repeat: Infinity, ease: "easeInOut" }}
					style={{ left: `${(i * 11) % 100}%`, top: `${(i * 17) % 100}%` }}
				/>
			))}
		</div>
	);
}

export default function Home() {
	return (
		<div className="container">
			<FloatingIcons />
			<nav className="nav-bar" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem',padding:'1rem 0'}}>
				<div className="logo"><h2>Exoix</h2></div>
				<div className="nav-links" style={{display:'flex',gap:'2rem'}}>
					<a href="/">Status Tracker</a>
					<a href="/credits">Credits</a>
					<a href="https://exoix.lol" target="_blank" rel="noreferrer">Website</a>
				</div>
			</nav>

			<motion.div className="hero-section" style={{textAlign:'center',padding:'4rem 2rem',background:'linear-gradient(135deg, rgba(114, 137, 218, 0.1) 0%, rgba(88, 101, 242, 0.1) 100%)',borderRadius:20,marginBottom:'3rem'}} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
				<motion.h1 style={{fontSize:'3.5rem',fontWeight:700,marginBottom:'1rem',background:'linear-gradient(45deg, #7289da, #5865f2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05, duration: .5 }}>Welcome to Exoix</motion.h1>
				<motion.p style={{fontSize:'1.3rem',opacity:.9,marginBottom:'2rem',maxWidth:600,margin:'0 auto'}} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .5 }}>The ultimate Discord status tracker that shows real-time information about Discord users, including their current status, Spotify activity, gaming sessions, and more!</motion.p>
				<div className="cta-buttons" style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
					<motion.a href="/" className="cta-button" style={{background:'linear-gradient(45deg, #7289da, #5865f2)',color:'#fff',padding:'1rem 2rem',borderRadius:10,textDecoration:'none',fontWeight:600}} whileHover={{ y: -2 }} whileTap={{ scale: .98 }}>Try Status Tracker</motion.a>
					<motion.a href="https://discord.gg/qJeqC2m8Jc" target="_blank" rel="noreferrer" className="cta-button secondary" style={{background:'transparent',border:'2px solid #7289da',color:'#7289da',padding:'1rem 2rem',borderRadius:10,textDecoration:'none',fontWeight:600}} whileHover={{ y: -2 }} whileTap={{ scale: .98 }}>Join Discord</motion.a>
				</div>
			</motion.div>

			<div className="features-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'2rem',marginBottom:'3rem'}}>
				{[
					{icon:'🎵', title:'Spotify Integration', desc:'See what music your friends are listening to in real-time, complete with album artwork and track information.'},
					{icon:'🎮', title:'Game Activity', desc:'Track what games your friends are playing, including custom status messages and activity details.'},
					{icon:'💻', title:'Development Status', desc:'Monitor coding activities, see what projects your developer friends are working on, and track their progress.'},
					{icon:'⏱️', title:'Real-time Updates', desc:'Get instant updates when your friends\' status changes, with automatic refresh every 30 seconds.'},
					{icon:'📱', title:'Mobile Friendly', desc:'Responsive design that works perfectly on desktop, tablet, and mobile devices.'},
					{icon:'🛡️', title:'Privacy Focused', desc:'Only shows information that users have publicly shared on Discord - no private data is accessed.'}
				].map((f, i) => (
					<motion.div key={i} className="feature-item" style={{background:'rgba(255,255,255,0.05)',borderRadius:16,padding:'2rem',border:'1px solid rgba(255,255,255,0.1)'}} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .35, delay: i * .04 }}>
						<h3 style={{fontSize:'1.3rem',marginBottom:'1rem',color:'#fff'}}>{f.title}</h3>
						<p style={{opacity:.8,lineHeight:1.6}}>{f.desc}</p>
					</motion.div>
				))}
			</div>

			<footer className="footer">
				<p>Built with ❤️ by Uni • <a href="https://exoix.lol" target="_blank" rel="noreferrer">exoix.lol</a></p>
				<small>Last updated: December 2025 • Powered by Lanyard API</small>
			</footer>
		</div>
	);
}