import { fetcherSwr, mapMealToRecipe } from "@/utils/api";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { FaHeart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useFavorites } from "@/context/FavoritesContext";

function Suggestions() {
  const [meals, setMeals] = useState([]);
  const trackRef = useRef(null);
  const { favorites, toggleFavorite } = useFavorites();

  const { data, error } = useSWR(
    "https://www.themealdb.com/api/json/v1/1/random.php",
    fetcherSwr,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data?.meals && meals.length === 0) {
      const first = data.meals[0];
      const others = Array.from({ length: 11 }, () =>
        fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
          .then((r) => r.json())
          .then((d) => d.meals[0])
      );
      Promise.all(others).then((results) => {
        setMeals([first, ...results.filter(Boolean)]);
      });
    }
  }, [data]);

  const scroll = useCallback((direction) => {
    if (trackRef.current) {
      const cardWidth = 300;
      trackRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  }, []);

  if (error) return null;

  if (meals.length === 0) {
    return (
      <section className="suggestions-section">
        <div className="container">
          <h2 className="section-title">Suggestions</h2>
          <p className="section-subtitle">Handpicked recipes to inspire you</p>
          <div className="suggestions-track">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton-card" style={{ width: 280, flexShrink: 0 }}>
                <div className="skeleton-image" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="suggestions-section" id="suggestions">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Suggestions
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ marginBottom: 0 }}
            >
              Handpicked recipes to inspire you
            </motion.p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => scroll("left")}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              onClick={() => scroll("right")}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        </div>

        <div ref={trackRef} className="suggestions-track">
          {meals.map((meal, index) => {
            const recipe = mapMealToRecipe(meal);
            return (
              <motion.div
                key={meal.idMeal}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link href={`/dish/${meal.idMeal}`}>
                  <div className="recipe-card">
                    <div className="recipe-card-image">
                      <img src={recipe.image} alt={recipe.title} loading="lazy" />
                      <button
                        className={`recipe-card-favorite ${favorites.includes(String(meal.idMeal)) ? "favorited" : ""}`}
                        onClick={(e) => toggleFavorite(meal.idMeal)}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Suggestions;
