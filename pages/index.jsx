import Popular from "@/components/Popular";
import Veggie from "@/components/Veggie";
import useSWR from "swr";
import Navbar from "../components/navbar";

//API KEY -- 5eed65202a8b460f89e2e698859e7e2e
export default function Home() {
	return (
		<div>
			<Navbar />

			<div className="post-container">
				<Popular />
			</div>
		</div>
	);
}
