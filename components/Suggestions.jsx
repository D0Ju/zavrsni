import { ApiKey, fetcherSwr } from "@/utils/api";
import Link from "next/link";
import React from "react";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import useSWR from "swr";

function Suggestions() {
	const Api = `https://api.spoonacular.com/recipes/random?apiKey=${ApiKey}&includeNutrition=true&number=12`;

	const { data, error } = useSWR(Api, fetcherSwr, {
		revalidateOnFocus: false,
	});
	if (!data) return null;
	return (
		<Splide
			options={{
				perPage: 4,
				arrows: false,
				pagination: false,
				drag: "free",
				gap: "3rem",
			}}
		>
			{data.recipes.map((recipe) => {
				return (
					<SplideSlide key={recipe.id}>
						<Link href={`/dish/${recipe.id}`}>
							<div className="card">
								<h1>{recipe.title}</h1>
								<img src={recipe.image} />
							</div>
						</Link>
					</SplideSlide>
				);
			})}
		</Splide>
	);
}

export default Suggestions;
