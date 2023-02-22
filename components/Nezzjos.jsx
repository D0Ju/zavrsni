import fetcher, { ApiKey } from "@/utils/api";
import Link from "next/link";
import React from "react";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import useSWR from "swr";

function Nezz() {
	const Suggestionsrecipes = `https://api.spoonacular.com/recipes/random?apiKey=${ApiKey}&includeNutrition=true&number=12`;

	const { data, error } = useSWR(Suggestionsrecipes, fetcher, {
		revalidateOnFocus: false,
	});
	if (!data) return null;
	return (
		<>
			{data.recipes.map((recipe) => {
				return (
					<Link href={`/dish/${recipe.id}`}>
						<div className="card">
							<h1>{recipe.title}</h1>
							<img src={recipe.image} />
						</div>
					</Link>
				);
			})}
		</>
	);
}

export default Nezz;
