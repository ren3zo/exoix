import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Credits() {
	return (
		<div className="container" style={{maxWidth:800,margin:'0 auto'}}>
			<Navbar />
			<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
				<a href="/status" style={{color:'#7289da',textDecoration:'none',fontWeight:500}}>← Back to Status Tracker</a>
				<a href="/" style={{color:'#7289da',textDecoration:'none',fontWeight:500}}>Home</a>
			</div>

			<div style={{textAlign:'center',marginBottom:'3rem'}}>
				<motion.h1 style={{fontSize:'2.5rem',fontWeight:700,marginBottom:'.5rem',background:'linear-gradient(45deg, #7289da, #5865f2)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>Credits</motion.h1>
				<motion.p style={{opacity:.8}} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .05, duration: .4 }}>Acknowledgements for Exoix</motion.p>
			</div>

			<section className="credit-section">
				<h2 style={{color:'#7289da',fontSize:'1.5rem',marginBottom:'1rem',fontWeight:600}}>Special Thanks</h2>
				<motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .25 }}>
					<strong>Lanyard</strong>: Real-time Discord presence data is powered by the Lanyard API.
				</motion.p>
				<motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .25, delay: .03 }}>
					<strong>Phineas</strong>: Owner and creator of Lanyard. Thank you for maintaining such a great service for the community.
				</motion.p>
				<motion.p initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .25, delay: .06 }}>
					<strong>Discord</strong>: For providing the platform and APIs that make this possible.
				</motion.p>
			</section>

			<section className="credit-section">
				<h2 style={{color:'#7289da',fontSize:'1.5rem',marginBottom:'1rem',fontWeight:600}}>Developer</h2>
				<div style={{display:'flex',alignItems:'center',marginBottom:'1.5rem'}}>
					<motion.img src="https://cdn.discordapp.com/avatars/701092816419553330/a_f7d228f95c2a8910e86eef37f82be186.gif?size=1024" alt="Uni" style={{width:60,height:60,borderRadius:'50%',marginRight:'1rem',border:'2px solid #7289da'}} onError={(e)=>{e.currentTarget.src='https://cdn.discordapp.com/embed/avatars/0.png'}} initial={{ scale: .95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .3 }} />
					<div>
						<h3 style={{fontSize:'1.2rem',marginBottom:'.3rem'}}>Uni</h3>
						<p style={{opacity:.8,fontSize:'.9rem'}}>Full-stack developer and creator of Exoix</p>
					</div>
				</div>
				<div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
					<motion.a href="https://exoix.lol" target="_blank" rel="noreferrer" style={{color:'#7289da',textDecoration:'none',padding:'.5rem 1rem',border:'1px solid rgba(114,137,218,.3)',borderRadius:6}} whileHover={{ y: -2 }} whileTap={{ scale: .98 }}>Website</motion.a>
					<motion.a href="https://discord.gg/qJeqC2m8Jc" target="_blank" rel="noreferrer" style={{color:'#7289da',textDecoration:'none',padding:'.5rem 1rem',border:'1px solid rgba(114,137,218,.3)',borderRadius:6}} whileHover={{ y: -2 }} whileTap={{ scale: .98 }}>Discord Server</motion.a>
				</div>
			</section>

			<footer className="footer">
				<p>Built with ❤️ by Uni • <a href="https://exoix.lol" target="_blank" rel="noreferrer">exoix.lol</a></p>
				<small>Last updated: December 2025</small>
			</footer>
		</div>
	);
}