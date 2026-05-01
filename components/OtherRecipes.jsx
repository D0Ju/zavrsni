import { mapMealToRecipe } from "@/utils/api";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";

const cache = {
  data: null,
  query: "",
};

function OtherRecipes({ searchQuery = "" }) {
  const [recipes, setRecipes] = useState(cache.data || []);
  const [loading, setLoading] = useState(!cache.data);
  const [error, setError] = useState(null);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const currentQueryRef = useRef(searchQuery);

  useEffect(() => {
    if (cache.data !== null && cache.query === searchQuery) {
      setRecipes(cache.data);
      setLoading(false);
      return;
    }

    currentQueryRef.current = searchQuery;
    const isSearch = searchQuery.trim().length > 0;

    if (isSearch) {
      setLoading(true);
    }

    const url = isSearch
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchQuery)}`
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((data) => {
        if (currentQueryRef.current !== searchQuery) return;
        const meals = data.meals || [];

        if (!isSearch && meals.length > 0) {
          const detailsPromises = meals.slice(0, 12).map((meal) =>
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`).then((r) => r.json())
          );
          return Promise.all(detailsPromises).then((results) =>
            results.map((r) => r.meals[0]).filter(Boolean)
          );
        }
        return meals;
      })
      .then((finalMeals) => {
        if (currentQueryRef.current !== searchQuery) return;
        const mappedRecipes = finalMeals.map((meal) => mapMealToRecipe(meal));
        cache.data = mappedRecipes;
        cache.query = searchQuery;
        setRecipes(mappedRecipes);
        setError(null);
      })
      .catch((err) => {
        if (currentQueryRef.current !== searchQuery) return;
        setError(err.message);
        setRecipes([]);
      })
      .finally(() => {
        if (currentQueryRef.current === searchQuery) {
          setLoading(false);
        }
      });
  }, [searchQuery]);

  useEffect(() => {
    if (!showFavoritesOnly || favorites.length === 0) {
      setFavoriteRecipes([]);
      return;
    }

    setFavoritesLoading(true);
    const fetchPromises = favorites.map((id) =>
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((r) => r.json())
        .then((d) => d.meals?.[0])
    );

    Promise.all(fetchPromises)
      .then((meals) => {
        const valid = meals.filter(Boolean).map((meal) => mapMealToRecipe(meal));
        setFavoriteRecipes(valid);
      })
      .catch(() => setFavoriteRecipes([]))
      .finally(() => setFavoritesLoading(false));
  }, [showFavoritesOnly, favorites]);

  const displayRecipes = showFavoritesOnly ? favoriteRecipes : recipes;

  return (
    <section id="recipes" style={{ padding: "40px 0" }}>
      <div className="container">
        <motion.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div>
            <h2 className="section-title" style={{ marginBottom: 4 }}>
              Other Recipes
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              {searchQuery ? `Results for "${searchQuery}"` : "Explore more delicious recipes"}
            </p>
          </div>
          <button
            className={`favorites-toggle ${showFavoritesOnly ? "active" : ""}`}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          >
            <FaHeart size={14} />
            {showFavoritesOnly ? "Show All" : `Favorites (${favorites.length})`}
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading || (favoritesLoading && showFavoritesOnly) ? (
            <motion.div
              key="loading"
              className="recipe-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton-card">
                  <div className="skeleton-image" />
                  <div className="skeleton-text" />
                  <div className="skeleton-text" />
                </div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>Something went wrong</h3>
              <p>{error}</p>
            </motion.div>
          ) : displayRecipes.length === 0 ? (
            <motion.div
              key="empty"
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>No recipes found</h3>
              <p>
                {showFavoritesOnly
                  ? "You haven't saved any favorites yet"
                  : "Try a different search term"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              className="recipe-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {displayRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/dish/${recipe.id}`}>
                    <div className="recipe-card">
                      <div className="recipe-card-image">
                        <img src={recipe.image} alt={recipe.title} loading="lazy" />
                        <button
                          className={`recipe-card-favorite ${favorites.includes(String(recipe.id)) ? "favorited" : ""}`}
                          onClick={(e) => toggleFavorite(recipe.id)}
                        >
                          <FaHeart size={16} />
                        </button>
                      </div>
                      <div className="recipe-card-content">
                        <h3 className="recipe-card-title">{recipe.title}</h3>
                        <div className="recipe-card-meta">
                          {recipe.category && <span>{recipe.category}</span>}
                          {recipe.cuisine && <span>{recipe.cuisine}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default OtherRecipes;
