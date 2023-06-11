import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import OtherRecipes from "./OtherRecipes";

function Navbar() {
	const router = useRouter();

	const ClickTest = (id) => {
		const Scroll = () => {
			var element = document.getElementById(id);
			var headerOffset = 100;
			var elementPosition = element.getBoundingClientRect().top;
			var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		};
		if (router.asPath === "/") {
			Scroll();
		} else {
			router.push("/").then(() => {
				setTimeout(() => {
					Scroll();
				}, 250);
			});
		}
	};

	return (
		<div className="nav-container">
			<Link href={"/"}>
				<h1 className="heading-nav">Dominik's cuisine</h1>
			</Link>
			<ul>
				<li>
					{" "}
					<button
						className="btn-nav"
						onClick={() => ClickTest("Title-Suggestions")}
					>
						Suggestions
					</button>
				</li>
				<li>
					{" "}
					<button
						className="btn-nav"
						onClick={() => ClickTest("Title-OtherRecipes")}
					>
						Other Recipes
					</button>{" "}
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
