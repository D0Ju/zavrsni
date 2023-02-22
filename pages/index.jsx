import Nezz from "@/components/Nezzjos";
import Suggestions from "@/components/Suggestions";
import Veggie from "@/components/Veggie";
import useSWR from "swr";

export default function Home() {
	return (
		<div>
			<h2>Suggestions</h2>
			<div className="post-container">
				<Suggestions />
			</div>
			<h2 style={{ marginTop: "100px" }}>Nes random</h2>
			<div className="body-post-container">
				<Nezz />
			</div>
		</div>
	);
}
