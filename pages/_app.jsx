import Navbar from "@/components/navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Navbar />
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}
