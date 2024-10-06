import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const textures = {
  Mercury: 'https://img.freepik.com/fotos-premium/textura-mercurio-otro-mundo_889432-1298.jpg',
  Venus: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7q_NoC49WiU1JYZAZdMEHD5sl_Bli3TiOw&s',
  Earth: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjGGrxMfKYheHNg2DnIdvvNweojYqtO9ZzQ&s',
  Mars: 'https://img.freepik.com/fotos-premium/primer-plano-planeta-textura-planeta-marte_729592-1590.jpg',
  Jupiter: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWNSiRfbJKR8IWh4dsb472ZzXAbwA1t30jQ&s',
  Saturn: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEBAq2y8p5pY3Q3JR4DE-fAiyFrXeGTj6VA&s',
  Uranus: 'https://static.vecteezy.com/system/resources/previews/001/998/851/non_2x/abstract-background-of-uranus-surface-free-vector.jpg',
  Neptune: 'https://img.freepik.com/fotos-premium/fondo-textura-superficie-neptuno_889432-963.jpg',
  Sun: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQVzB_yWBuDTgsoOizvPjKHB5_wWYCGSpZuQ&s',
};

const planetsData = [
  { name: 'Mercury', size: 0.1, distance: 3 },
  { name: 'Venus', size: 0.15, distance: 5 },
  { name: 'Earth', size: 0.15, distance: 7 },
  { name: 'Mars', size: 0.1, distance: 9 },
  { name: 'Jupiter', size: 0.8, distance: 12 },
  { name: 'Saturn', size: 0.7, distance: 15 },
  { name: 'Uranus', size: 0.4, distance: 18 },
  { name: 'Neptune', size: 0.4, distance: 20 },
];

const Comparison = () => {
  const sceneRef = useRef();
  const [planet1, setPlanet1] = useState(planetsData[0]);
  const [planet2, setPlanet2] = useState(planetsData[1]);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10); // Ajusta la posición Z para que sea más visible

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 400); // Define la altura del renderer a 400
    sceneRef.current.appendChild(renderer.domElement);

    const textureLoader = new TextureLoader();

    // Crear los planetas
    const createPlanet = (data, xOffset) => {
      const geometry = new THREE.SphereGeometry(data.size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ map: textureLoader.load(textures[data.name]) });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = xOffset; // Offset en el eje x para separación
      scene.add(mesh);
      return mesh;
    };

    const planetMesh1 = createPlanet(planet1, -2);
    const planetMesh2 = createPlanet(planet2, 2);

    const animate = () => {
      requestAnimationFrame(animate);
      planetMesh1.rotation.y += 0.01; // Rotación del planeta 1
      planetMesh2.rotation.y += 0.01; // Rotación del planeta 2
      camera.position.z = 10 / zoom; // Controlar el zoom
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / 400; // Cambia a 400 para ajustar el contenedor
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 400);
    });

    return () => {
      renderer.dispose();
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, [planet1, planet2, zoom]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <h2>Comparar Planetas</h2>
        <label>
          Planeta 1:
          <select onChange={(e) => setPlanet1(planetsData.find(p => p.name === e.target.value))}>
            {planetsData.map((planet) => (
              <option key={planet.name} value={planet.name}>{planet.name}</option>
            ))}
          </select>
        </label>
        <label>
          Planeta 2:
          <select onChange={(e) => setPlanet2(planetsData.find(p => p.name === e.target.value))}>
            {planetsData.map((planet) => (
              <option key={planet.name} value={planet.name}>{planet.name}</option>
            ))}
          </select>
        </label>
        <label>
          Zoom:
          <input type="range" min="1" max="5" step="0.1" value={zoom} onChange={(e) => setZoom(e.target.value)} />
        </label>
      </div>

      {/* Contenedor para la animación */}
      <div 
        ref={sceneRef} 
        style={{ 
          width: '100%', 
          height: '400px', // Define la altura del recuadro
          position: 'absolute', 
          top: '100px', // Espacio debajo de las opciones
          border: '2px solid white', // Añade un borde para definir el área
          borderRadius: '10px',
          overflow: 'hidden', // Para evitar que los elementos se salgan del contenedor
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Color de fondo semitransparente
        }} 
      />

      {/* Tabla de Comparación */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translate(-50%, 0)', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', backgroundColor: 'rgba(128, 128, 128, 0.5)' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px' }}></th>
              <th style={{ padding: '8px' }}>{planet1.name}</th>
              <th style={{ padding: '8px' }}>{planet2.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px' }}>Tamaño</td>
              <td style={{ padding: '8px' }}>{planet1.size}</td>
              <td style={{ padding: '8px' }}>{planet2.size}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px' }}>Distancia</td>
              <td style={{ padding: '8px' }}>{planet1.distance}</td>
              <td style={{ padding: '8px' }}>{planet2.distance}</td>
            </tr>
            {/* Agrega más filas según sea necesario */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comparison;
