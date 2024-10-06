import React, { useState } from "react";
import "./objetos.css";

// Componente de tarjeta para cada PHA potencial
function PHAcard({ pha }) {
  return (
    <div className="objeto-card">
      <div className="objeto-imagen">
        <img src={pha.imagen} alt={pha.nombre} />
      </div>
      <div className="objeto-detalles">
        <h2>{pha.nombre}</h2>
        <p>{pha.descripcion}</p>
        <div className="objeto-info">
          <span>Sistema: {pha.sistema}</span>
          <span>Masa: {pha.masa}</span>
          <span>Diámetro: {pha.diametro}</span>
          <span>Gravedad: {pha.gravedad}</span>
          <span>Distancia mínima a la Tierra: {pha.distanciaMin}</span>
        </div>
        <button className="simulador-btn">Ver en el Simulador</button>
      </div>
    </div>
  );
}

export default function PHAsPotenciales() {
  // Datos de ejemplo de PHAs potenciales
  const phasPotenciales = [
    {
      nombre: "Apofis",
      sistema: "Sistema Solar",
      masa: "2.7 × 10^10 kg",
      diametro: "370 m",
      gravedad: "0.001 m/s²",
      distanciaMin: "0.0001 UA",
      descripcion: "Un asteroide con una posible trayectoria de impacto en el año 2029.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwPsKZ3_EXba5fxCuWz5Iz3lE-oJFqvfkeaA&s",
    },
    {
      nombre: "Bennu",
      sistema: "Sistema Solar",
      masa: "7.33 × 10^10 kg",
      diametro: "490 m",
      gravedad: "0.00012 m/s²",
      distanciaMin: "0.0004 UA",
      descripcion: "Objetivo de la misión OSIRIS-REx, potencialmente peligroso para la Tierra.",
      imagen: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Bennu_mosaic_OSIRIS-REx_%28square%29.png",
    },
    {
      nombre: "2010 RF12",
      sistema: "Sistema Solar",
      masa: "1.5 × 10^9 kg",
      diametro: "20 m",
      gravedad: "0.00006 m/s²",
      distanciaMin: "0.0002 UA",
      descripcion: "Asteroide de tamaño pequeño con un paso cercano a la Tierra en 2025.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPPjj2TTTexUeKdFddp4w1HNNW1D-i9SNptw&s",
    },
    {
      nombre: "2017 AG13",
      sistema: "Sistema Solar",
      masa: "1.0 × 10^9 kg",
      diametro: "40 m",
      gravedad: "0.0001 m/s²",
      distanciaMin: "0.0003 UA",
      descripcion: "Asteroide que pasó cerca de la Tierra en 2017 y es monitoreado por astronomos.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSra4RNWKYhuT_ApihzlW6KdTrQoRdt_U-Vvg&s",
    },
    {
      nombre: "2020 QG",
      sistema: "Sistema Solar",
      masa: "5.0 × 10^8 kg",
      diametro: "15 m",
      gravedad: "0.00004 m/s²",
      distanciaMin: "0.00005 UA",
      descripcion: "Asteroide que pasó muy cerca de la Tierra en 2020 sin consecuencias.",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThEF9oKI245S2TsmuejYUUnUaFKDkT2enyWT_bw-7S_CyOexxgc-V-m20XbnDu2mLfDNQ&usqp=CAU",
    },
  ];

  // Estado de los filtros y la búsqueda por nombre
  const [filtros, setFiltros] = useState({
    sistema: "todos",
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

  // Función para filtrar PHAs según los filtros seleccionados
  const phasFiltrados = phasPotenciales.filter((pha) => {
    return (
      (filtros.sistema === "todos" || pha.sistema === filtros.sistema) &&
      (pha.nombre.toLowerCase().includes(searchTerm))
    );
  });

  const filtrarPHAs = () => {
    console.log("Filtros seleccionados:", filtros);
    // Lógica adicional de filtrado o llamada a la API puede ir aquí
  };

  return (
    <div className="contenedor-objetos">
      <h2>PHAs POTENCIALES</h2>
      <div className="filter-menu-horizontal">
        <div className="filter-group-horizontal">
          <label htmlFor="sistema">Sistema</label>
          <select id="sistema" name="sistema" onChange={handleFilterChange}>
            <option value="todos">Todos</option>
            <option value="Sistema Solar">Sistema Solar</option>
            {/* Agrega más opciones si es necesario */}
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
          <button className="search-btn" onClick={filtrarPHAs}>Buscar</button>
        </div>
      </div>

      {/* Lista de PHAs filtrados */}
      <div className="lista-objetos">
        {phasFiltrados.map((pha, index) => (
          <PHAcard key={index} pha={pha} />
        ))}
      </div>
    </div>
  );
}
