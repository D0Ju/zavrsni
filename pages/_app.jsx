import Navbar from "@/components/navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Navbar />
			<div style={{ marginTop: "100px" }}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
