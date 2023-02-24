import OtherRecipes from "@/components/OtherRecipes";
import Suggestions from "@/components/Suggestions";
export default function Home() {
	return (
		<div>
			<h2 id="Title-Suggestions">Suggestions</h2>
			<div className="post-container">
				<Suggestions />
			</div>
			<OtherRecipes />
		</div>
	);
}
