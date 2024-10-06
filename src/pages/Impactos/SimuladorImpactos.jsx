import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as THREE from 'three';
import { TextureLoader } from 'three';

// Agrega texturas de los cuerpos celestes
const textures = {
	Mercury: 'https://img.freepik.com/fotos-premium/textura-mercurio-otro-mundo_889432-1298.jpg',
	Venus: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7q_NoC49WiU1JYZAZdMEHD5sl_Bli3TiOw&s',
	Earth: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjGGrxMfKYheHNg2DnIdvvNweojYqtO9ZzQ&s',
	Mars: 'https://img.freepik.com/fotos-premium/primer-plano-planeta-textura-planeta-marte_729592-1590.jpg',
	Jupiter: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWNSiRfbJKR8IWh4dsb472ZzXAbwA1t30jQ&s',
	Saturn: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFEBAq2y8p5pY3Q3JR4DE-fAiyFrXeGTj6VA&s',
	Uranus: 'https://static.vecteezy.com/system/resources/previews/001/998/851/non_2x/abstract-background-of-uranus-surface-free-vector.jpg',
	Neptune: 'https://img.freepik.com/fotos-premium/fondo-textura-superficie-neptuno_889432-963.jpg',
};

const bodiesData = [
	{ name: 'Mercury', size: 0.1 },
	{ name: 'Venus', size: 0.15 },
	{ name: 'Earth', size: 0.15 },
	{ name: 'Mars', size: 0.1 },
	{ name: 'Jupiter', size: 0.8 },
	{ name: 'Saturn', size: 0.7 },
	{ name: 'Uranus', size: 0.4 },
	{ name: 'Neptune', size: 0.4 },
];

const ImpactSimulator = () => {
	const sceneRef = useRef();
	const [body1, setBody1] = useState(bodiesData[0]);
	const [body2, setBody2] = useState(bodiesData[1]);
	const [speed, setSpeed] = useState(0.05); // Velocidad inicial más baja
	const [isAnimating, setIsAnimating] = useState(false); // Estado de animación
	const [showTrajectories, setShowTrajectories] = useState(true); // Estado de órbitas

	useEffect(() => {
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);

		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 10);

		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, 400);
		sceneRef.current.appendChild(renderer.domElement);

		const textureLoader = new TextureLoader();

		const createBody = (data, xOffset) => {
			const geometry = new THREE.SphereGeometry(data.size, 32, 32);
			const material = new THREE.MeshBasicMaterial({ map: textureLoader.load(textures[data.name]) });
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.x = xOffset; // Offset en el eje x
			scene.add(mesh);
			return mesh;
		};

		const createTrajectory = (data) => {
			const points = [];
			const radius = 5; // Radio fijo para las trayectorias

			for (let i = 0; i < 360; i++) {
				const angle = THREE.MathUtils.degToRad(i);
				const x = radius * Math.cos(angle);
				const y = radius * Math.sin(angle);
				points.push(new THREE.Vector3(x, y, 0));
			}

			const geometry = new THREE.BufferGeometry().setFromPoints(points);
			const material = new THREE.LineBasicMaterial({ color: 0x888888 });
			const line = new THREE.LineLoop(geometry, material);
			return line;
		};

		const bodyMesh1 = createBody(body1, -2);
		const bodyMesh2 = createBody(body2, 2);

		const trajectory1 = showTrajectories ? createTrajectory(body1) : null;
		const trajectory2 = showTrajectories ? createTrajectory(body2) : null;
		if (trajectory1) scene.add(trajectory1);
		if (trajectory2) scene.add(trajectory2);

		const animate = () => {
			requestAnimationFrame(animate);
			bodyMesh1.rotation.y += 0.01; // Rotación del cuerpo 1
			bodyMesh2.rotation.y += 0.01; // Rotación del cuerpo 2

			if (isAnimating) {
				// Movimiento solo del primer cuerpo hacia el segundo
				bodyMesh1.position.x += speed; // Mover el cuerpo 1 hacia la derecha

				// Verificar el impacto
				if (bodyMesh1.position.x + body1.size >= bodyMesh2.position.x - body2.size) {
					// Simular impacto
					bodyMesh1.scale.set(1.5, 1.5, 1.5); // Aumentar tamaño para simular destrucción
					bodyMesh2.scale.set(0, 0, 0); // Desaparecer el segundo cuerpo

					// Añadir una explosión o efecto visual
					const explosionGeometry = new THREE.SphereGeometry(0.5, 32, 32);
					const explosionMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5 });
					const explosionMesh = new THREE.Mesh(explosionGeometry, explosionMaterial);
					explosionMesh.position.copy(bodyMesh2.position);
					scene.add(explosionMesh);

					setTimeout(() => {
						scene.remove(explosionMesh); // Eliminar la explosión después de un tiempo
					}, 500);

					setIsAnimating(false); // Detener animación después del impacto
				}
			}

			renderer.render(scene, camera);
		};

		animate();

		window.addEventListener('resize', () => {
			camera.aspect = window.innerWidth / 400;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, 400);
		});

		return () => {
			renderer.dispose();
			sceneRef.current.removeChild(renderer.domElement);
		};
	}, [body1, body2, speed, isAnimating, showTrajectories]);

	const handleStartSimulation = () => {
		// Reiniciar la posición de los cuerpos para que el primero se dirija al segundo
		setIsAnimating(true); // Iniciar animación
	};

	return (
		<div style={{ position: 'relative', height: '100vh' }}>
			<div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
				<h2>Simulador de Impactos</h2>
				<label>
					Cuerpo Celeste 1:
					<select onChange={(e) => setBody1(bodiesData.find(b => b.name === e.target.value))}>
						{bodiesData.map((body) => (
							<option key={body.name} value={body.name}>{body.name}</option>
						))}
					</select>
				</label>
				<label>
					Cuerpo Celeste 2:
					<select onChange={(e) => setBody2(bodiesData.find(b => b.name === e.target.value))}>
						{bodiesData.map((body) => (
							<option key={body.name} value={body.name}>{body.name}</option>
						))}
					</select>
				</label>
				<label>
					Velocidad:
					<input type="range" min="0.01" max="0.5" step="0.01" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />
				</label>
				<label>
					Mostrar Trayectorias:
					<input
						type="checkbox"
						checked={showTrajectories}
						onChange={(e) => setShowTrajectories(e.target.checked)}
					/>
				</label>
				<button onClick={handleStartSimulation}>Iniciar Simulación</button>
			</div>

			{/* Contenedor para la animación */}
			<div
				ref={sceneRef}
				style={{
					width: '100%',
					height: '400px',
					position: 'absolute',
					top: '100px',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
				}}
			/>

			{/* Sección de PHAs */}
			<div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 1, color: 'white' }}>
				<h3>Posibles Amenazas de Asteroides (PHAs)</h3>
				<p>
					Los Posibles Amenazas de Asteroides (PHAs) son cuerpos celestes que tienen trayectorias que
					podrían llevarlos a acercarse a la Tierra en el futuro. Estos asteroides son de interés
					para la ciencia y la seguridad, ya que pueden representar un riesgo de colisión. La
					detección y seguimiento de PHAs son esenciales para la planificación de estrategias de
					mitigación.
				</p>
				<NavLink  to="/PHAsPotenciales"
					style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
					>
					Ver PHAs Potenciales
					
				</NavLink>
			</div>
		</div>
	);
};

export default ImpactSimulator;
