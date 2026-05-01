import { fetcher, parseIngredients } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { FaHeart, FaUsers, FaUtensils, FaVideo } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";

function SkeletonDish() {
  return (
    <div className="dish-page container">
      <div className="dish-header">
        <div className="skeleton-text" style={{ width: "50%", height: 40 }} />
      </div>
      <div className="dish-image-container">
        <div className="skeleton-image" style={{ height: 400 }} />
      </div>
      <div className="dish-meta-bar">
        {[1, 2].map((i) => (
          <div key={i} className="nutrition-card">
            <div className="skeleton-text" style={{ width: 60, height: 24, margin: "0 0 8px 0" }} />
            <div className="skeleton-text" style={{ width: 40, height: 14, margin: 0 }} />
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="dish-instructions" style={{ marginTop: 40 }}>
          <div className="skeleton-text" style={{ width: "30%" }} />
          <div className="skeleton-text" />
          <div className="skeleton-text" />
          <div className="skeleton-text" />
          <div className="skeleton-text" />
          <div className="skeleton-text" />
        </div>
      </div>
    </div>
  );
}

export default function Dish() {
  const router = useRouter();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  if (!data && !error) {
    return <SkeletonDish />;
  }

  const meal = data?.meals?.[0];

  if (error || !meal) {
    return (
      <div className="dish-page container">
        <div className="empty-state">
          <h3>Recipe not found</h3>
          <p>The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const ingredients = parseIngredients(meal);
  const instructions = meal.strInstructions
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line, i) => <p key={i}>{line}</p>);

  const tags = meal.strTags ? meal.strTags.split(",") : [];

  return (
    <motion.div
      className="dish-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="dish-header">
          <motion.div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <h1 className="dish-title">{meal.strMeal}</h1>
            <button
              className={`recipe-card-favorite ${isFavorite(id) ? "favorited" : ""}`}
              onClick={() => toggleFavorite(id)}
              style={{ position: "relative", top: 0, right: 0, flexShrink: 0 }}
            >
              <FaHeart size={18} />
            </button>
          </motion.div>

          <div style={{ display: "flex", gap: 24, marginTop: 12, color: "var(--color-text-muted)", fontSize: "0.9rem", flexWrap: "wrap" }}>
            {meal.strCategory && (
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FaUtensils /> {meal.strCategory}
              </span>
            )}
            {meal.strArea && (
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FaUsers /> {meal.strArea}
              </span>
            )}
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-sage)" }}>
                <FaVideo /> Watch tutorial
              </a>
            )}
          </div>
        </div>

        <motion.div
          className="dish-image-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </motion.div>

        {tags.length > 0 && (
          <motion.div
            style={{ maxWidth: 900, margin: "0 auto 32px", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "6px 16px",
                  background: "var(--color-sage-light)",
                  color: "var(--color-sage-dark)",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                {tag.trim()}
              </span>
            ))}
          </motion.div>
        )}

        <motion.div
          className="dish-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {ingredients.length > 0 && (
            <div className="dish-ingredients">
              <h2>Ingredients</h2>
              <div className="ingredients-grid">
                {ingredients.map((ingredient, i) => (
                  <motion.div
                    key={ingredient.name}
                    className="ingredient-bubble"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.03 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="ingredient-bubble-image">
                      <img
                        src={ingredient.image}
                        alt={ingredient.name}
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    </div>
                    <span className="ingredient-bubble-name">{ingredient.name}</span>
                    <span className="ingredient-bubble-amount">
                      {ingredient.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="dish-instructions">
            <h2>Instructions</h2>
            {instructions}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
