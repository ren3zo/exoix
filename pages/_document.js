import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
				<meta name="theme-color" content="#000000" />
				<meta name="color-scheme" content="dark light" />
				<meta name="description" content="Exoix — real-time Discord status tracker with rich activity, Spotify and game presence." />
				<meta property="og:title" content="Exoix — Discord Status Tracker" />
				<meta property="og:description" content="Check real-time Discord presence: online status, Spotify, games and more." />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/discord.svg" />
				<meta property="og:url" content="https://exoix.lol" />
				<link rel="icon" href="/discord.svg" type="image/svg+xml" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}