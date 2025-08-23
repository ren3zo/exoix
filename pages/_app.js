import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";

export default function App({ Component, pageProps, router }) {
	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div key={router?.route} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>
				<Component {...pageProps} />
			</motion.div>
		</AnimatePresence>
	);
}