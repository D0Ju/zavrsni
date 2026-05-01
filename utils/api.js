const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const fetcherSwr = (...args) => fetch(...args).then((res) => res.json());

export function parseIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        amount: measure || "",
        image: `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`,
      });
    }
  }
  return ingredients;
}

export function mapMealToRecipe(meal) {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    summary: "",
    instructions: meal.strInstructions,
    readyInMinutes: null,
    servings: null,
    cuisine: meal.strArea || "",
    category: meal.strCategory || "",
    ingredients: parseIngredients(meal),
  };
}
