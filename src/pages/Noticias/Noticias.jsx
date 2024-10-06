import React, { useState } from "react";
import "./noticias.css";

export default function Noticias() {
  const [noticias] = useState([
    {
      id: 1,
      titulo: "Asteroides cercanos a la Tierra en agosto de 2024",
      contenido: "Detalles sobre los asteroides que se aproximarán a la Tierra.",
      categoria: "Asteroides",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/06/5-jpeg.webp?w=2048&format=webp",
    },
    {
      id: 2,
      titulo: "Lo que necesitas saber sobre los eclipses solares",
      contenido: "Un eclipse es un fenómeno celeste que causa admiración y cambia drásticamente el ...",
      categoria: "Eventos",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2024/03/eclipses-portada.png?w=2048&format=webp",
    },
    {
      id: 3,
      titulo: "Exoplanetas helados podrían tener océanos habitables y géiseres",
      contenido: "Una investigación científica de la NASA amplía la búsqueda de vida más allá de nuestro sistema solar al indicar que 17 exoplanetas..",
      categoria: "Planetas",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/12/encelado.png?w=2048&format=webp",
    },
    {
      id: 4,
      titulo: "El espacio por el que viajamos",
      contenido: "En el pasado, cuando las naciones navegaban, exploraban nuevas regiones del mundo y una de sus mayores pre...",
      categoria: "Galaxias",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/06/292_SpaceWeTravelThrough-poster-jpg.webp?w=2048&format=webp",
    },
    {
      id: 5,
      titulo: "La NASA y los astrónomos esperan la extraordinaria explosión de una nova",
      contenido: "Este verano, astrónomos anticipan una nova en la Corona Boreal, visible a simple vista, que revelará más sobre explosiones estelares.",
      categoria: "Misiones",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2024/07/1-nova-explosion.webp?w=2048&format=webp",
    },
    {
      id: 6,
      titulo: "¿Qué es la energía oscura?",
      contenido: "Explora el interior de un universo que se acelera y expande.",
      categoria: "Galaxias",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2024/06/energia-oscura.png?w=2048&format=webp",
    },
    {
      id: 7,
      titulo: "¿Qué son los agujeros negros?",
      contenido: "Un agujero negro es un objeto astronómico con una fuerza gravitatoria tan fuerte que nada, ni...",
      categoria: "Galaxias",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2024/05/screenshot-2024-05-09-at-4-51-54%E2%80%AFpm.png?w=2048&format=webp",
    },
    {
      id: 8,
      titulo: "Más planetas que estrellas: El legado de Kepler",
      contenido: "Esta misión permitió descubrir miles de exoplanetas, revelando que existen más planetas que estrellas en la galaxia de la Vía…",
      categoria: "Planetas",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2024/03/kepler-4.png?w=2048&format=webp",
    },
    {
      id: 9,
      titulo: "Spitzer y TESS encuentran un mundo del tamaño de la Tierra que estaría cubierto de volcanes",
      contenido: "Un equipo de astrónomos ha descubierto un exoplaneta, o un mundo más allá de nuestro sistema solar, que tendría el…",
      categoria: "Planetas",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/07/lp79118d_beautyshot_Ilustracion-1-jpeg.webp?w=2048&format=webp",
    },
    {
      id: 10,
      titulo: "La misión TESS de la NASA detecta su primer agujero negro desgarrando una estrella",
      contenido: "Por primera vez, el Satélite de Sondeo de Exoplanetas en Tránsito de la NASA (TESS por sus siglas en inglés)…",
      categoria: "Eventos",
      imagen: "https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/06/TESS_TDE_Still-jpg.webp?w=2048&format=webp",
    },
  ]);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const manejarFiltro = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  return (
    <div className="noticias-container">
      <h2>Página de Noticias</h2>
      <div className="filtros">
        <button onClick={() => manejarFiltro("Todos")}>Todos</button>
        <button onClick={() => manejarFiltro("Asteroides")}>Asteroides</button>
        <button onClick={() => manejarFiltro("Galaxias")}>Galaxias</button>
        <button onClick={() => manejarFiltro("Estrellas")}>Estrellas</button>
        <button onClick={() => manejarFiltro("Eventos")}>Eventos</button>
      </div>
      <div className="noticias-grid">
        {noticias
          .filter((noticia) =>
            categoriaSeleccionada === "Todos" || noticia.categoria === categoriaSeleccionada
          )
          .map((noticia) => (
            <div className="noticia-card" key={noticia.id}>
              <div className="noticia-imagen-container">
                <img src={noticia.imagen} alt={noticia.titulo} className="noticia-imagen" />
                <div className="noticia-info">
                  <h3>{noticia.titulo}</h3>
                </div>
              </div>
              <p>{noticia.contenido}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
