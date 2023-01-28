import React from "react";
import useSWR from "swr";

function Veggie() {
	const fetcher = (...args) => fetch(...args).then((res) => res.json());
	const Popularrecipes =
		"https://api.spoonacular.com/recipes/random?apiKey=5eed65202a8b460f89e2e698859e7e2e&includeNutrition=true&number=9";

	const { data, error } = useSWR(Popularrecipes, fetcher);
	if (!data) return null;
	console.log(data.recipes);
	return (
		<div>
			{data.recipes.map((recipes, i) => {
				return (
					<div key={recipes.id} className="card">
						<h1 className="pok-name">{data.recipes[i].title}</h1>
					</div>
				);
			})}
		</div>
	);
}

export default Veggie;
