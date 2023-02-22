import fetcher, { ApiKey } from "@/utils/api";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Dish() {
	const router = useRouter();
	const DishUrl = `https://api.spoonacular.com/recipes/${router.query.id}/information?apiKey=${ApiKey}&includeNutrition=true`;

	const { data, error } = useSWR(DishUrl, fetcher, {
		revalidateOnFocus: false,
	});
	const recipe = data;
	if (!recipe) return <div>Recipe not found</div>;
	recipe.summary = recipe.summary.replaceAll("<a ", "<a target='_blank' ");
	return (
		<div className="dish-container">
			<h1>{recipe.title}</h1>
			<img src={recipe.image} alt={recipe.title} />
			<p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
		</div>
	);
}
