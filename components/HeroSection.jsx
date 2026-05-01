import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

function HeroSection({ onSearch }) {
  const [query, setQuery] = useState("");
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (onSearch) onSearch(value);
      if (value.trim().length > 0) {
        setTimeout(() => {
          const el = document.getElementById("recipes");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover <span>delicious</span> recipes
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Find inspiration for your next meal from a world of flavors and cuisines
        </motion.p>
        <motion.div
          className="search-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="search-input-wrapper">
            <FaSearch size={18} />
            <input
              type="text"
              placeholder="Search for recipes..."
              value={query}
              onChange={handleChange}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HeroSection;
