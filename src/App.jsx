import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import ObjetosCelestes from "./pages/Celestes/ObjetosCelestes";
import SimuladorImpactos from "./pages/Impactos/SimuladorImpactos";
import Noticias from "./pages/Noticias/Noticias";
import ComparacionObjetos from "./pages/Comparacion/ComparacionObjetos";
import NavBar from "./components/NavBar/NavBar";



function App() {
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/objetos-celestes" element={<ObjetosCelestes />} />
				<Route path="/comparacion-objetos" element={<ComparacionObjetos />} />
				<Route path="/simulador-impactos" element={<SimuladorImpactos />} />
				<Route path="/noticias" element={<Noticias />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
