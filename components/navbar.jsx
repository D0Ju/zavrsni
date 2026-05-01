import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (id) => {
    if (router.asPath !== "/") {
      router.push("/").then(() => {
        setTimeout(() => scrollToSection(id), 100);
      });
    } else {
      scrollToSection(id);
    }
  };

  return (
    <motion.nav
      className={`nav-container`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        boxShadow: scrolled ? "var(--shadow-md)" : "none",
      }}
    >
      <Link href="/">
        <span className="nav-logo">
          Dominik<span>'s</span> cuisine
        </span>
      </Link>
      <ul className="nav-links">
        <li>
          <button className="nav-link" onClick={() => handleNavClick("suggestions")}>
            Suggestions
          </button>
        </li>
        <li>
          <button className="nav-link" onClick={() => handleNavClick("recipes")}>
            Recipes
          </button>
        </li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;
