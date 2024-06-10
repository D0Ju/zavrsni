import fetcher, { ApiKey } from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function OtherRecipes() {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const Suggestionsrecipes = `https://api.spoonacular.com/recipes/random?apiKey=${ApiKey}&includeNutrition=true&number=12`;
		fetchRecipes(Suggestionsrecipes, false);
	}, []);

	const fetchRecipes = (url, isRecipes) => {
		fetcher(url)
			.then((result) => {
				const res = isRecipes ? result : result.recipes;
				res.map((recipe) => {
					recipe.image = `https://spoonacular.com/recipeImages/${recipe.id}-556x370.jpg`;
				});
				setRecipes(res);
			})
			.catch((err) => {});
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			const url = `https://api.spoonacular.com/recipes/autocomplete?apiKey=${ApiKey}&number=24&query=${event.target.value}`;
			fetchRecipes(url, true);
		}
	};

	return (
		<div>
			<h2 id="Title-OtherRecipes" style={{ marginTop: "100px" }}>
				Other Recipes
			</h2>
			<div className="searchBar">
				<FaSearch />
				<input type="text" onKeyDown={handleKeyDown} />
			</div>

			<div className="body-post-container">
				{recipes.map((recipe) => {
					return (
						<Link key={recipe.id} href={`/dish/${recipe.id}`}>
							<div className="card">
								<h1>{recipe.title}</h1>
								<img src={recipe.image} />
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default OtherRecipes;
