import React from "react";

function Navbar() {
	const ClickTest = () => {
		console.log("Clickable");
	};

	return (
		<div className="nav-container">
			<h1 className="heading-nav">The Home page</h1>
			<ul>
				<li>
					{" "}
					<button className="btn-nav" onClick={ClickTest}>
						Popular
					</button>
				</li>
				<li>
					{" "}
					<button className="btn-nav" onClick={ClickTest}>
						Veggie
					</button>{" "}
				</li>
			</ul>
		</div>
	);
}

export default Navbar;
