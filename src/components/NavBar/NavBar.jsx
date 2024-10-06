// // NavBar.js
// import React from "react";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "./NavBar.css"; // Para cualquier estilo personalizado que desees agregar

// export default function NavBar() {
// 	return (
// 		<nav className="navbar navbar-dark bg-primary w-100">
// 			<div className="container-fluid">
// 				<Link className="navbar-brand" to="/">
// 					<img
// 						src="/path/to/your/logo.png"
// 						alt="Logo"
// 						style={{ width: "40px", height: "40px" }}
// 					/>
// 				</Link>
// 				<button
// 					className="navbar-toggler"
// 					type="button"
// 					data-bs-toggle="collapse"
// 					data-bs-target="#navbarNav"
// 					aria-controls="navbarNav"
// 					aria-expanded="false"
// 					aria-label="Toggle navigation"
// 				>
// 					<span className="navbar-toggler-icon"></span>
// 				</button>
// 				<div className="collapse navbar-collapse" id="navbarNav">
// 					<ul className="navbar-nav ms-auto">
// 						<li className="nav-item">
// 							<Link className="nav-link" to="/">
// 								Inicio
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link className="nav-link" to="/objetos-celestes">
// 								Objetos Celestes
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link className="nav-link" to="/comparacion-objetos">
// 								Comparación de Objetos
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link className="nav-link" to="/simulador-impactos">
// 								Simulador de Impactos
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link className="nav-link" to="/noticias">
// 								Noticias
// 							</Link>
// 						</li>
// 					</ul>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// }

import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import viteLogo from "../../assets/nasa-logo.svg";
import avatar from "../../assets/Avatar001.jpg";
import "./navBar.css";
// import usePost from "../../Hooks/usePost";

function Navbar({ token, user, isOnline, setUser, setToken }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [error, setError] = useState(null);
	// const postData = usePost("auth/logout", token);

	// const logoutUser = () => {
	// 	console.log("Cerrar session");
	// 	postData()
	// 		.then((response) => {
	// 			// Lógica a realizar después de un registro exitoso
	// 			console.log("Close session succesful:", response.data);
	// 			setUser(null); // Para actualizar el navBar
	// 			setToken(null); // Para actualizar el navBar
	// 			localStorage.removeItem("tokenUser");
	// 			localStorage.removeItem("userProfile");
	// 			navigate("/login");
	// 		})
	// 		.catch((err) => {
	// 			// Lógica a realizar en caso de error
	// 			// console.error("Error al registrar el evento:", err);
	// 			setError(err);
	// 		});
	// };

	return (
		<nav className="nav_container">
			<div className="nav_logo">
				<Link to="/">
					<img src={viteLogo} alt="Logo" />
				</Link>
			</div>
			<div className="nav_links">
				{/* <NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Home
				</NavLink> */}
				{/* <NavLink
					to="/register"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Register
				</NavLink> */}
				<NavLink
					to="/"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Inicio
				</NavLink>
				<NavLink
					to="/objetos-celestes"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Objetos celestes
				</NavLink>
				<NavLink
					to="/comparacion-objetos"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Comparacion Objetos
				</NavLink>
				<NavLink
					to="/simulador-impactos"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Simulador de impactos
				</NavLink>
				<NavLink
					to="/noticias"
					className={({ isActive }) => (isActive ? "active" : "")}
				>
					Noticias
				</NavLink>
			</div>
		</nav>
	);
}

export default Navbar;
