export default function Home() {
	return (
		<div className="container">
			<nav className="nav-bar" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem',padding:'1rem 0'}}>
				<div className="logo"><h2>Exoix</h2></div>
				<div className="nav-links" style={{display:'flex',gap:'2rem'}}>
					<a href="/">Status Tracker</a>
					<a href="/credits">Credits</a>
					<a href="https://exoix.lol" target="_blank" rel="noreferrer">Website</a>
				</div>
			</nav>

			<div className="hero-section" style={{textAlign:'center',padding:'4rem 2rem',background:'linear-gradient(135deg, rgba(114, 137, 218, 0.1) 0%, rgba(88, 101, 242, 0.1) 100%)',borderRadius:20,marginBottom:'3rem'}}>
				<h1 style={{fontSize:'3.5rem',fontWeight:700,marginBottom:'1rem',background:'linear-gradient(45deg, #7289da, #5865f2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Welcome to Exoix</h1>
				<p style={{fontSize:'1.3rem',opacity:.9,marginBottom:'2rem',maxWidth:600,margin:'0 auto'}}>The ultimate Discord status tracker that shows real-time information about Discord users, including their current status, Spotify activity, gaming sessions, and more!</p>
				<div className="cta-buttons" style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
					<a href="/" className="cta-button" style={{background:'linear-gradient(45deg, #7289da, #5865f2)',color:'#fff',padding:'1rem 2rem',borderRadius:10,textDecoration:'none',fontWeight:600}}>Try Status Tracker</a>
					<a href="https://discord.gg/qJeqC2m8Jc" target="_blank" rel="noreferrer" className="cta-button secondary" style={{background:'transparent',border:'2px solid #7289da',color:'#7289da',padding:'1rem 2rem',borderRadius:10,textDecoration:'none',fontWeight:600}}>Join Discord</a>
				</div>
			</div>

			<div className="features-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:'2rem',marginBottom:'3rem'}}>
				{[
					{icon:'🎵', title:'Spotify Integration', desc:'See what music your friends are listening to in real-time, complete with album artwork and track information.'},
					{icon:'🎮', title:'Game Activity', desc:'Track what games your friends are playing, including custom status messages and activity details.'},
					{icon:'💻', title:'Development Status', desc:'Monitor coding activities, see what projects your developer friends are working on, and track their progress.'},
					{icon:'⏱️', title:'Real-time Updates', desc:'Get instant updates when your friends\' status changes, with automatic refresh every 30 seconds.'},
					{icon:'📱', title:'Mobile Friendly', desc:'Responsive design that works perfectly on desktop, tablet, and mobile devices.'},
					{icon:'🛡️', title:'Privacy Focused', desc:'Only shows information that users have publicly shared on Discord - no private data is accessed.'}
				].map((f, i) => (
					<div key={i} className="feature-item" style={{background:'rgba(255,255,255,0.05)',borderRadius:16,padding:'2rem',border:'1px solid rgba(255,255,255,0.1)'}}>
						<h3 style={{fontSize:'1.3rem',marginBottom:'1rem',color:'#fff'}}>{f.title}</h3>
						<p style={{opacity:.8,lineHeight:1.6}}>{f.desc}</p>
					</div>
				))}
			</div>

			<div className="how-it-works" style={{background:'rgba(255,255,255,0.03)',borderRadius:16,padding:'2rem',marginBottom:'3rem',border:'1px solid rgba(255,255,255,0.1)'}}>
				<h2 style={{fontSize:'2rem',marginBottom:'1.5rem',color:'#7289da',textAlign:'center'}}>How It Works</h2>
				<div className="steps" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',gap:'2rem'}}>
					{[
						{n:1,title:'Get Discord ID',desc:'Right-click on any Discord user\'s profile and copy their User ID'},
						{n:2,title:'Paste & Search',desc:'Paste the Discord ID into the search box and click "Check Status"'},
						{n:3,title:'View Results',desc:'See real-time information about their status, activities, and more!'}
					].map(s => (
						<div className="step" key={s.n} style={{textAlign:'center',padding:'1.5rem'}}>
							<div className="step-number" style={{width:50,height:50,background:'linear-gradient(45deg, #7289da, #5865f2)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 1rem',fontWeight:700,fontSize:'1.2rem'}}>{s.n}</div>
							<h3 style={{fontSize:'1.2rem',marginBottom:'.5rem'}}>{s.title}</h3>
							<p style={{opacity:.8,fontSize:'.9rem'}}>{s.desc}</p>
						</div>
					))}
				</div>
			</div>

			<footer className="footer">
				<p>Built with ❤️ by Uni • <a href="https://exoix.lol" target="_blank" rel="noreferrer">exoix.lol</a></p>
				<small>Last updated: December 2025 • Powered by Lanyard API</small>
			</footer>
		</div>
	);
}