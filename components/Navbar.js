import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	const isActive = (href) => router.pathname === href;

	const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '1rem 0' };
	const linksStyle = { display: 'flex', gap: '2rem' };
	const linkBaseStyle = { textDecoration: 'none', color: '#ffffff', opacity: .9, fontWeight: 500 };
	const activeStyle = { color: '#7289da', opacity: 1 };

	return (
		<nav className="nav-bar" style={navStyle}>
			<div className="logo"><Link href="/"><h2>Exoix</h2></Link></div>
			<div className="nav-links" style={linksStyle}>
				<Link href="/" style={{ ...linkBaseStyle, ...(isActive('/') ? activeStyle : null) }}>Home</Link>
				<Link href="/status" style={{ ...linkBaseStyle, ...(isActive('/status') ? activeStyle : null) }}>Status Tracker</Link>
				<Link href="/credits" style={{ ...linkBaseStyle, ...(isActive('/credits') ? activeStyle : null) }}>Credits</Link>
				<a href="https://exoix.lol" target="_blank" rel="noreferrer" style={linkBaseStyle}>Website</a>
			</div>
		</nav>
	);
}