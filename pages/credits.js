export default function Credits() {
	return (
		<div className="container" style={{maxWidth:800,margin:'0 auto'}}>
			<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
				<a href="/" style={{color:'#7289da',textDecoration:'none',fontWeight:500}}>← Back to Status Tracker</a>
				<a href="/home" style={{color:'#7289da',textDecoration:'none',fontWeight:500}}>Home</a>
			</div>

			<div style={{textAlign:'center',marginBottom:'3rem'}}>
				<h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:'.5rem',background:'linear-gradient(45deg, #7289da, #5865f2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Credits</h1>
				<p style={{opacity:.8}}>Acknowledgements for Exoix</p>
			</div>

			<section className="credit-section">
				<h2 style={{color:'#7289da',fontSize:'1.5rem',marginBottom:'1rem',fontWeight:600}}>Special Thanks</h2>
				<p>
					<strong>Lanyard</strong>: Real-time Discord presence data is powered by the Lanyard API.
				</p>
				<p>
					<strong>Phineas</strong>: Owner and creator of Lanyard. Thank you for maintaining such a great service for the community.
				</p>
				<p>
					<strong>Discord</strong>: For providing the platform and APIs that make this possible.
				</p>
			</section>

			<section className="credit-section">
				<h2 style={{color:'#7289da',fontSize:'1.5rem',marginBottom:'1rem',fontWeight:600}}>Developer</h2>
				<div style={{display:'flex',alignItems:'center',marginBottom:'1.5rem'}}>
					<img src="https://cdn.discordapp.com/avatars/701092816419553330/a_f7d228f95c2a8910e86eef37f82be186.gif?size=1024" alt="Uni" style={{width:60,height:60,borderRadius:'50%',marginRight:'1rem',border:'2px solid #7289da'}} onError={(e)=>{e.currentTarget.src='https://cdn.discordapp.com/embed/avatars/0.png'}} />
					<div>
						<h3 style={{fontSize:'1.2rem',marginBottom:'.3rem'}}>Uni</h3>
						<p style={{opacity:.8,fontSize:'.9rem'}}>Full-stack developer and creator of Exoix</p>
					</div>
				</div>
				<div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
					<a href="https://exoix.lol" target="_blank" rel="noreferrer" style={{color:'#7289da',textDecoration:'none',padding:'.5rem 1rem',border:'1px solid rgba(114,137,218,.3)',borderRadius:6}}>Website</a>
					<a href="https://discord.gg/qJeqC2m8Jc" target="_blank" rel="noreferrer" style={{color:'#7289da',textDecoration:'none',padding:'.5rem 1rem',border:'1px solid rgba(114,137,218,.3)',borderRadius:6}}>Discord Server</a>
				</div>
			</section>

			<footer className="footer">
				<p>Built with ❤️ by Uni • <a href="https://exoix.lol" target="_blank" rel="noreferrer">exoix.lol</a></p>
				<small>Last updated: December 2025</small>
			</footer>
		</div>
	);
}