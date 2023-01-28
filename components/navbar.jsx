import React from "react";

function Navbar() {
	const ClickTest = () => {
		console.log("Clickable");
	};

	return (
		<div>
			<div className="nav-container">
				<h1 className="heading-nav">The Home page</h1>
				<ul>
					<li>
						{" "}
						<button className="btn-nav" onClick={ClickTest}>
							Home
						</button>
					</li>
					<li>
						{" "}
						<button className="btn-nav" onClick={ClickTest}>
							About
						</button>{" "}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
