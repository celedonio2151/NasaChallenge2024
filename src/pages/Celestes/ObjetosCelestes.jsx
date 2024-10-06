import React, { useState } from "react";
import "./objetos.css";

// Componente de tarjeta para cada objeto celeste
function ObjetoCelesteCard({ objeto }) {
  return (
    <div className="objeto-card">
      <div className="objeto-imagen">
        <img src={objeto.imagen} alt={objeto.nombre} />
      </div>
      <div className="objeto-detalles">
        <h2>{objeto.nombre}</h2>
        <p>{objeto.descripcion}</p>
        <div className="objeto-info">
          <span>Sistema: {objeto.sistema}</span>
          <span>Masa: {objeto.masa}</span>
          <span>Diámetro: {objeto.diametro}</span>
          <span>Gravedad: {objeto.gravedad}</span>
        </div>
        <button className="simulador-btn">Ver en el Simulador</button>
      </div>
    </div>
  );
}

export default function ObjetosCelestes() {
  // Datos de ejemplo de objetos celestes
  const objetosCelestes = [
    {
      nombre: "Marte",
      tipoObjeto: "planeta",
      tamano: "mediano",
      distancia: "cercano",
      excentricidad: "media",
      inclinacion: "baja",
      sistema: "Sistema Solar",
      masa: "6.42 × 10^23 kg",
      diametro: "6,779 km",
      gravedad: "3.71 m/s²",
      descripcion: "Marte es el cuarto planeta del sistema solar...",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAb_29TL6Q6VvrvfU8yzRQ7ka1DxAZ-5VRFg&s",
    },
    {
      nombre: "Tierra",
      tipoObjeto: "planeta",
      tamano: "mediano",
      distancia: "cercano",
      excentricidad: "baja",
      inclinacion: "media",
      sistema: "Sistema Solar",
      masa: "5.97 × 10^24 kg",
      diametro: "12,742 km",
      gravedad: "9.81 m/s²",
      descripcion: "Nuestro hogar en el Sistema Solar...",
      imagen: "https://s1.significados.com/foto/earth-11015-1920-41.jpg?class=article",
    },
    {
      nombre: "Venus",
      tipoObjeto: "planeta",
      tamano: "mediano",
      distancia: "cercano",
      excentricidad: "baja",
      inclinacion: "baja",
      sistema: "Sistema Solar",
      masa: "4.87 × 10^24 kg",
      diametro: "12,104 km",
      gravedad: "8.87 m/s²",
      descripcion: "Un planeta similar a la Tierra en tamaño...",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-RyLfCryPlP4DcgGbZyBQDH77Yx_eOGhbQ&s",
    },
    {
      nombre: "Júpiter",
      tipoObjeto: "planeta",
      tamano: "grande",
      distancia: "medio",
      excentricidad: "baja",
      inclinacion: "media",
      sistema: "Sistema Solar",
      masa: "1.90 × 10^27 kg",
      diametro: "142,984 km",
      gravedad: "24.79 m/s²",
      descripcion: "El gigante del Sistema Solar...",
      imagen: "https://images.squarespace-cdn.com/content/v1/5fa5ec79661ee904d2973ca0/1704744976541-1FRENDSZJAF0FUIZPMVY/jupiter+nasa+photo.jpg",
    },
    {
      nombre: "Saturno",
      tipoObjeto: "planeta",
      tamano: "grande",
      distancia: "medio",
      excentricidad: "media",
      inclinacion: "baja",
      sistema: "Sistema Solar",
      masa: "5.68 × 10^26 kg",
      diametro: "120,536 km",
      gravedad: "10.44 m/s²",
      descripcion: "Famoso por sus anillos...",
      imagen: "https://e.rpp-noticias.io/xlarge/2022/07/24/315731_1289864.jpg",
    },
    {
      nombre: "Urano",
      tipoObjeto: "planeta",
      tamano: "grande",
      distancia: "lejano",
      excentricidad: "media",
      inclinacion: "alta",
      sistema: "Sistema Solar",
      masa: "8.68 × 10^25 kg",
      diametro: "51,118 km",
      gravedad: "8.69 m/s²",
      descripcion: "Un planeta con un eje de rotación inclinado...",
      imagen: "https://humanidades.com/wp-content/uploads/2024/04/Urano-1-e1713384712502-800x400.jpg",
    },
    {
      nombre: "Neptuno",
      tipoObjeto: "planeta",
      tamano: "grande",
      distancia: "lejano",
      excentricidad: "alta",
      inclinacion: "media",
      sistema: "Sistema Solar",
      masa: "1.02 × 10^26 kg",
      diametro: "49,528 km",
      gravedad: "11.15 m/s²",
      descripcion: "El planeta más lejano del Sistema Solar...",
      imagen: "https://content.nationalgeographic.com.es/medio/2022/08/03/el-planeta-neptuno_bfb396f8_1280x1278.jpg",
    },
    {
      nombre: "Mercurio",
      tipoObjeto: "planeta",
      tamano: "pequeno",
      distancia: "cercano",
      excentricidad: "alta",
      inclinacion: "baja",
      sistema: "Sistema Solar",
      masa: "3.30 × 10^23 kg",
      diametro: "4,880 km",
      gravedad: "3.7 m/s²",
      descripcion: "El planeta más cercano al Sol...",
      imagen: "https://content.nationalgeographic.com.es/medio/2022/07/31/el-planeta-mercurio_c7bafef8_1280x720.jpg",
    },
    {
      nombre: "Plutón",
      tipoObjeto: "planeta",
      tamano: "pequeno",
      distancia: "lejano",
      excentricidad: "alta",
      inclinacion: "alta",
      sistema: "Sistema Solar",
      masa: "1.31 × 10^22 kg",
      diametro: "2,377 km",
      gravedad: "0.62 m/s²",
      descripcion: "Un planeta enano más allá de Neptuno...",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT462ZikpWHtWLFWwK-7wUfPdz2IkoRqiwjEA&s",
    },
    {
      nombre: "Ceres",
      tipoObjeto: "planeta",
      tamano: "pequeno",
      distancia: "medio",
      excentricidad: "media",
      inclinacion: "media",
      sistema: "Cinturón de Asteroides",
      masa: "9.39 × 10^20 kg",
      diametro: "946 km",
      gravedad: "0.28 m/s²",
      descripcion: "El objeto más grande del cinturón de asteroides...",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg",
    },
    {
      nombre: "Eros",
      tipoObjeto: "NEO",
      tamano: "pequeno",
      distancia: "cercano",
      excentricidad: "alta",
      inclinacion: "alta",
      sistema: "NEO",
      masa: "6.69 × 10^15 kg",
      diametro: "16.84 km",
      gravedad: "0.0059 m/s²",
      descripcion: "Un asteroide cercano a la Tierra...",
      imagen: "https://svs.gsfc.nasa.gov/vis/a000000/a002000/a002061/eros_still_iso_true_0000.jpg",
    },
    {
      nombre: "Apofis",
      tipoObjeto: "PHA",
      tamano: "pequeno",
      distancia: "cercano",
      excentricidad: "media",
      inclinacion: "baja",
      sistema: "PHA",
      masa: "2.7 × 10^10 kg",
      diametro: "370 m",
      gravedad: "0.001 m/s²",
      descripcion: "Un asteroide con una posible trayectoria de impacto...",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPsKZ3_EXba5fxCuWz5Iz3lE-oJFqvfkeaA&s",
    },
    {
      nombre: "Hale-Bopp",
      tipoObjeto: "cometa",
      tamano: "grande",
      distancia: "lejano",
      excentricidad: "alta",
      inclinacion: "alta",
      sistema: "Cometa",
      masa: "5 × 10^14 kg",
      diametro: "60 km",
      gravedad: "0.0002 m/s²",
      descripcion: "Un cometa brillante y famoso...",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs8HUARBy4CqQy2Diufvw10uncCsMA9WHksg&s",
    },
    {
      nombre: "Bennu",
      tipoObjeto: "NEO",
      tamano: "pequeno",
      distancia: "medio",
      excentricidad: "media",
      inclinacion: "media",
      sistema: "NEO",
      masa: "7.33 × 10^10 kg",
      diametro: "490 m",
      gravedad: "0.00012 m/s²",
      descripcion: "Objetivo de la misión OSIRIS-REx...",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Bennu_mosaic_OSIRIS-REx_%28square%29.png",
    },
    {
      nombre: "Itokawa",
      tipoObjeto: "NEO",
      tamano: "pequeno",
      distancia: "cercano",
      excentricidad: "alta",
      inclinacion: "baja",
      sistema: "NEO",
      masa: "4.2 × 10^7 kg",
      diametro: "0.33 km",
      gravedad: "0.0007 m/s²",
      descripcion: "Un asteroide visitado por la misión Hayabusa...",
      imagen: "https://www.fundacionaquae.org/wp-content/uploads/2019/05/Itokawaportada-1024x982.jpg",
    },
    {
      nombre: "Shoemaker-Levy 9",
      tipoObjeto: "cometa",
      tamano: "grande",
      distancia: "lejano",
      excentricidad: "alta",
      inclinacion: "alta",
      sistema: "Cometa",
      masa: "2 × 10^13 kg",
      diametro: "1.6 km",
      gravedad: "0.001 m/s²",
      descripcion: "Famoso por su colisión con Júpiter...",
      imagen: "https://www.esa.int/var/esa/storage/images/esa_multimedia/videos/1994/06/collision_comet_shoemaker_levy_92/12013002-1-eng-GB/Collision_Comet_Shoemaker_Levy_9_video_production_full.jpg",
    },
    {
      nombre: "Halley",
      tipoObjeto: "cometa",
      tamano: "grande",
      distancia: "lejano",
      excentricidad: "alta",
      inclinacion: "baja",
      sistema: "Cometa",
      masa: "2.2 × 10^14 kg",
      diametro: "15 km",
      gravedad: "0.00003 m/s²",
      descripcion: "Cometa conocido por su regreso cada 76 años...",
      imagen: "https://media.es.wired.com/photos/6578852e605197bf484ebdd0/16:9/w_2560%2Cc_limit/GettyImages-178161865.jpg",
    },
  ];

  // Estado de los filtros y la búsqueda por nombre
  const [filtros, setFiltros] = useState({
    tipoObjeto: "todos",
    tamano: "todos",
    distancia: "todos",
    excentricidad: "todos",
    inclinacion: "todos",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Función para manejar cambios en los filtros
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value,
    }));
  };

  // Función para manejar cambios en la búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Función para filtrar objetos según los filtros seleccionados
  const objetosFiltrados = objetosCelestes.filter((objeto) => {
    return (
      (filtros.tipoObjeto === "todos" || objeto.tipoObjeto === filtros.tipoObjeto) &&
      (filtros.tamano === "todos" || objeto.tamano === filtros.tamano) &&
      (filtros.distancia === "todos" || objeto.distancia === filtros.distancia) &&
      (filtros.excentricidad === "todos" || objeto.excentricidad === filtros.excentricidad) &&
      (filtros.inclinacion === "todos" || objeto.inclinacion === filtros.inclinacion) &&
      (objeto.nombre.toLowerCase().includes(searchTerm))
    );
  });

  const filtrarObjetos = () => {
    console.log("Filtros seleccionados:", filtros);
    // Lógica adicional de filtrado o llamada a la API puede ir aquí
  };

  return (
    <div className="contenedor-objetos">
      <h2>OBJETOS CELESTES</h2>
      <div className="filter-menu-horizontal">
        <div className="filter-group-horizontal">
          <label htmlFor="tipoObjeto">Tipo</label>
          <select id="tipoObjeto" name="tipoObjeto" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="planeta">Planeta</option>
            <option value="NEO">NEO</option>
            <option value="PHA">PHA</option>
            <option value="cometa">Cometa</option>
          </select>

          <label htmlFor="tamano">Tamaño</label>
          <select id="tamano" name="tamano" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="pequeno">&lt; 1 km</option>
            <option value="mediano">1 - 10 km</option>
            <option value="grande">&gt; 10 km</option>
          </select>

          <label htmlFor="distancia">Distancia</label>
          <select id="distancia" name="distancia" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="cercano">&lt; 0.1 UA</option>
            <option value="medio">0.1 - 1 UA</option>
            <option value="lejano">&gt; 1 UA</option>
          </select>

          <label htmlFor="excentricidad">Excentricidad</label>
          <select id="excentricidad" name="excentricidad" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="baja">&lt; 0.1</option>
            <option value="media">0.1 - 0.3</option>
            <option value="alta">&gt; 0.3</option>
          </select>

          <label htmlFor="inclinacion">Inclinación</label>
          <select id="inclinacion" name="inclinacion" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="baja">&lt; 5°</option>
            <option value="media">5° - 20°</option>
            <option value="alta">&gt; 20°</option>
          </select>

          {/* Campo de búsqueda por nombre */}
          <label htmlFor="search">Buscar por nombre</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Escribe el nombre..."
          />

          {/* Botón de búsqueda */}
          <button className="search-btn" onClick={filtrarObjetos}>Buscar</button>
        </div>
      </div>

      {/* Lista de objetos filtrados */}
      <div className="lista-objetos">
        {objetosFiltrados.map((objeto, index) => (
          <ObjetoCelesteCard key={index} objeto={objeto} />
        ))}
      </div>
    </div>
  );
}
