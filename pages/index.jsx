import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import OtherRecipes from "@/components/OtherRecipes";
import Suggestions from "@/components/Suggestions";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <HeroSection onSearch={setSearchQuery} />
      <Suggestions />
      <OtherRecipes searchQuery={searchQuery} />
    </>
  );
}
