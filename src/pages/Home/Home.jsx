// SolarSystem.js
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader } from 'three';

// Texturas de los planetas
const textures = {
  Mercury: 'https://img.freepik.com/fotos-premium/textura-mercurio-otro-mundo_889432-1298.jpg',
  Venus: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7q_NoC49WiU1JYZAZdMEHD5sl_Bli3TiOw&s',
  Earth: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjGGrxMfKYheHNg2DnIdvvNweojYqtO9ZzQ&s',
  Mars: 'https://img.freepik.com/fotos-premium/primer-plano-planeta-textura-planeta-marte_729592-1590.jpg',
  Jupiter: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWNSiRfbJKR8IWh4dsb472ZzXAbwA1t30jQ&s',
  Saturn: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEBAq2y8p5pY3Q3JR4DE-fAiyFrXeGTj6VA&s',
  Uranus: 'https://static.vecteezy.com/system/resources/previews/001/998/851/non_2x/abstract-background-of-uranus-surface-free-vector.jpg',
  Neptune: 'https://img.freepik.com/fotos-premium/fondo-textura-superficie-neptuno_889432-963.jpg',
  Sun: 'https://cdn.pixabay.com/photo/2014/10/12/12/06/sun-485034_1280.png', // Textura del Sol
};

const planetsData = [
  { name: 'Mercury', size: 0.1, distance: 3, speed: 0.04, eccentricity: 0.2056, inclination: 7, texture: textures.Mercury },
  { name: 'Venus', size: 0.15, distance: 5, speed: 0.035, eccentricity: 0.0067, inclination: 3.4, texture: textures.Venus },
  { name: 'Earth', size: 0.15, distance: 7, speed: 0.03, eccentricity: 0.0167, inclination: 0, texture: textures.Earth },
  { name: 'Mars', size: 0.1, distance: 9, speed: 0.024, eccentricity: 0.0935, inclination: 1.85, texture: textures.Mars },
  { name: 'Jupiter', size: 0.8, distance: 12, speed: 0.013, eccentricity: 0.0489, inclination: 1.3, texture: textures.Jupiter },
  { name: 'Saturn', size: 0.7, distance: 15, speed: 0.009, eccentricity: 0.0565, inclination: 2.49, texture: textures.Saturn },
  { name: 'Uranus', size: 0.4, distance: 18, speed: 0.007, eccentricity: 0.0463, inclination: 0.77, texture: textures.Uranus },
  { name: 'Neptune', size: 0.4, distance: 20, speed: 0.005, eccentricity: 0.0097, inclination: 1.77, texture: textures.Neptune },
];

const SolarSystem = () => {
  const sceneRef = useRef();
  const [speedMultiplier, setSpeedMultiplier] = useState(50);
  const [showOrbits, setShowOrbits] = useState(true);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 20, 40); // Aumenté la distancia de la cámara

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    sceneRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    const textureLoader = new TextureLoader();

    // Crear Sol con textura
    const sunGeometry = new THREE.SphereGeometry(1.5, 32, 32); // Tamaño del Sol
    const sunMaterial = new THREE.MeshStandardMaterial({ map: textureLoader.load(textures.Sun) });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);

    const planets = planetsData.map(({ name, size, distance, speed, eccentricity, inclination, texture }) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Capa de atmósfera para la Tierra y Venus
      if (name === 'Earth' || name === 'Venus') {
        const atmosphereGeometry = new THREE.SphereGeometry(size * 1.1, 32, 32);
        const atmosphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
        const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        scene.add(atmosphereMesh);
      }

      const orbitCurve = new THREE.EllipseCurve(
        0, 0,
        distance * (1 - eccentricity),
        distance,
        0, 2 * Math.PI, false, 0
      );
      const points = orbitCurve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0, p.y)));
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa, transparent: true, opacity: 0.4 });
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2 - THREE.MathUtils.degToRad(inclination);
      orbit.rotation.z = Math.PI / 2;
      orbit.visible = showOrbits;
      scene.add(orbit);

      return { mesh, distance, speed, eccentricity, inclination, theta: 0, orbit };
    });

    function calculateTrueAnomaly(eccentricity, meanAnomaly) {
      let eccentricAnomaly = meanAnomaly;
      for (let i = 0; i < 10; i++) {
        eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(eccentricAnomaly);
      }
      return 2 * Math.atan2(Math.sqrt(1 + eccentricity) * Math.sin(eccentricAnomaly / 2), Math.sqrt(1 - eccentricity) * Math.cos(eccentricAnomaly / 2));
    }

    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach((planet) => {
        const meanAnomaly = (Date.now() * planet.speed * speedMultiplier) / 1000;
        const trueAnomaly = calculateTrueAnomaly(planet.eccentricity, meanAnomaly);
        const distance = planet.distance * (1 - Math.pow(planet.eccentricity, 2)) / (1 + planet.eccentricity * Math.cos(trueAnomaly));

        const xPos = distance * Math.cos(trueAnomaly);
        const yPos = distance * Math.sin(THREE.MathUtils.degToRad(planet.inclination));
        const zPos = distance * Math.sin(trueAnomaly);

        planet.mesh.position.set(xPos, yPos, zPos);
        planet.orbit.rotation.y += planet.speed * speedMultiplier * 0.001; // Rotación para enfatizar movimiento
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      sceneRef.current.removeChild(renderer.domElement);
    };
  }, [speedMultiplier, showOrbits]);

  const toggleOrbits = () => {
    setShowOrbits(!showOrbits);
  };

  const handleSpeedChange = (e) => {
    setSpeedMultiplier(Number(e.target.value));
  };

  return (
    <div>
      <div ref={sceneRef} style={{ width: '100%', height: '600px' }}></div>
      <div>
        <button onClick={toggleOrbits}>
          {showOrbits ? 'Ocultar órbitas' : 'Mostrar órbitas'}
        </button>
        <input
          type="range"
          min="1"
          max="200"
          defaultValue={speedMultiplier}
          onChange={handleSpeedChange}
        />
        <label>Velocidad: {speedMultiplier}</label>
      </div>
    </div>
  );
};

export default SolarSystem;
