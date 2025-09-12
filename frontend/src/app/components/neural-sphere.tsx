"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function NeuralSphere() {
const mountRef = useRef<HTMLDivElement>(null);
const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

useEffect(() => {
  if (!mountRef.current) return;

  const currentMount = mountRef.current;
  const { clientWidth, clientHeight } = currentMount;
  setDimensions({ width: clientWidth, height: clientHeight });

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    clientWidth / clientHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true for transparent background
  renderer.setClearColor(0x000000, 0); // Transparent background
  renderer.setSize(clientWidth, clientHeight);
  currentMount.appendChild(renderer.domElement);

  const neuronRadius = 0.07;
  const totalNeurons = 64;
  const sphereRadius = 2;
  const nearestNeighborCount = 6;

  const neurons: THREE.Mesh[] = [];
  const adjacencyList = new Map<number, number[]>();
  const meteors: THREE.Line[] = [];

  const neuronGeometry = new THREE.SphereGeometry(neuronRadius, 16, 16);
  // Changed baseColorMaterial to be visible
  const baseColorMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff, // White color for neurons
    transparent: true,
    opacity: 0.8,
  });
  const redMaterial = new THREE.MeshBasicMaterial({ color: 0xFC303A });
  const borderMaterial = new THREE.LineBasicMaterial({ color: 0x347498 }); // dark gray border

  // Generate neuron positions using Fibonacci sphere
  function fibonacciSphere(samples: number, radius: number) {
    const points: THREE.Vector3[] = [];
    const offset = 2 / samples;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < samples; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return points;
  }

  const points = fibonacciSphere(totalNeurons, sphereRadius);
  points.forEach((pos, i) => {
    const neuron = new THREE.Mesh(neuronGeometry, baseColorMaterial.clone());
    neuron.position.copy(pos);

    const edge = new THREE.EdgesGeometry(neuronGeometry);
    const outline = new THREE.LineSegments(edge, borderMaterial);
    outline.scale.multiplyScalar(1.05);
    neuron.add(outline);

    scene.add(neuron);
    neurons[i] = neuron;
    adjacencyList.set(i, []);
  });

  // Connect each neuron to its N nearest neighbors
  const connectionMaterial = new THREE.LineBasicMaterial({
    color: 0xcccccc,
    transparent: true,
    opacity: 0.5,
  });
  for (let i = 0; i < neurons.length; i++) {
    const distances: { index: number; distance: number }[] = [];

    for (let j = 0; j < neurons.length; j++) {
      if (i === j) continue;
      const dist = neurons[i].position.distanceTo(neurons[j].position);
      distances.push({ index: j, distance: dist });
    }

    distances.sort((a, b) => a.distance - b.distance);
    const neighbors = distances.slice(0, nearestNeighborCount).map((d) => d.index);

    neighbors.forEach((j) => {
      if (!adjacencyList.get(i)?.includes(j)) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          neurons[i].position,
          neurons[j].position,
        ]);
        const line = new THREE.Line(geometry, connectionMaterial);
        scene.add(line);
        adjacencyList.get(i)?.push(j);
        adjacencyList.get(j)?.push(i);
      }
    });
  }

  // Fire red lines and fill target neuron red
  function fireNeurons() {
    const firingIndices: number[] = [];
    const totalToFire = Math.floor(neurons.length * 0.3);

    while (firingIndices.length < totalToFire) {
      const idx = Math.floor(Math.random() * neurons.length);
      if (!firingIndices.includes(idx)) firingIndices.push(idx);
    }

    firingIndices.forEach((i) => {
      const neighbors = adjacencyList.get(i);
      if (!neighbors || neighbors.length === 0) return;
      const j = neighbors[Math.floor(Math.random() * neighbors.length)];

      const from = neurons[i].position.clone();
      const to = neurons[j].position.clone();

      const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
      const meteorMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 5,
      });
      const meteor = new THREE.Line(geometry, meteorMaterial);
      meteor.userData = {
        createdAt: Date.now(),
        targetIndex: j,
      };

      neurons[j].material = redMaterial.clone(); // temporarily red
      meteors.push(meteor);
      scene.add(meteor);
    });
  }

  const fireInterval = setInterval(fireNeurons, 800);

  // Random scene rotation
  let rotationDirection = { x: 0.002, y: 0.002 };
  function randomizeRotation() {
    rotationDirection.x = (Math.random() - 0.5) * 0.01;
    rotationDirection.y = (Math.random() - 0.5) * 0.01;
  }
  const rotationInterval = setInterval(randomizeRotation, 2000);
  randomizeRotation();

  camera.position.z = 6;

  const animate = () => {
    requestAnimationFrame(animate);
    scene.rotation.x += rotationDirection.x;
    scene.rotation.y += rotationDirection.y;

    const now = Date.now();
    for (let i = meteors.length - 1; i >= 0; i--) {
      const meteor = meteors[i];
      if (now - meteor.userData.createdAt > 600) {
        scene.remove(meteor);
        const targetIdx = meteor.userData.targetIndex;
        neurons[targetIdx].material = baseColorMaterial.clone();
        meteors.splice(i, 1);
      }
    }

    renderer.render(scene, camera);
  };

  animate();

  const handleResize = () => {
    if (mountRef.current) {
      const { clientWidth, clientHeight } = mountRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    }
  };

  window.addEventListener("resize", handleResize);

  // Cleanup function
  return () => {
    clearInterval(fireInterval);
    clearInterval(rotationInterval);
    window.removeEventListener("resize", handleResize);
    currentMount.removeChild(renderer.domElement);
    renderer.dispose();
    // Dispose of all scene objects to prevent memory leaks
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
      if (object instanceof THREE.Line) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  };
}, [dimensions.width, dimensions.height]); // Re-run effect if dimensions change

return (
<div
    ref={mountRef}
    className="w-full h-full max-md:w-full max-md:h-fit mx-auto" // Added max dimensions
    style={{
          width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  />
);
}
