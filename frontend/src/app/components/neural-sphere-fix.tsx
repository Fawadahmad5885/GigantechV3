"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface NeuralHeroProps {
  className?: string;
  showOverlay?: boolean;
  overlayContent?: React.ReactNode;
}

export default function NeuralHero({ 
  className = "", 
  showOverlay = true,
  overlayContent 
}: NeuralHeroProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    const { clientWidth, clientHeight } = currentMount;
    setDimensions({ width: clientWidth, height: clientHeight });

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setSize(clientWidth, clientHeight);
    currentMount.appendChild(renderer.domElement);

    // --- Parameters ---
    const neuronRadius = 0.06;
    const totalNeurons = 100;
    const sphereRadius = 2.2;
    const nearestNeighborCount = 5;
    const neurons: THREE.Mesh[] = [];
    const adjacencyList = new Map<number, number[]>();
    const connections: Array<{ line: THREE.Line; from: number; to: number }> = [];

    // --- Colors & Materials ---
    const defaultColor = 0x4595A0; // Softer blue for hero
    const glowColor = 0x03466E; // Softer red for hero
    const borderMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.5 
    });
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x87CEEB, 
      transparent: true, 
      opacity: 0.5 
    });

    // --- Fibonacci Sphere ---
    function fibonacciSphere(samples: number, radius: number): THREE.Vector3[] {
      const pts: THREE.Vector3[] = [];
      const offset = 2 / samples;
      const increment = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < samples; i++) {
        const y = ((i * offset) - 1) + (offset / 2);
        const r = Math.sqrt(1 - y * y);
        const phi = i * increment;
        pts.push(new THREE.Vector3(
          Math.cos(phi) * r * radius,
          y * radius,
          Math.sin(phi) * r * radius
        ));
      }
      return pts;
    }

    // --- Create Neurons ---
    const neuronGeometry = new THREE.SphereGeometry(neuronRadius, 12, 12);
    fibonacciSphere(totalNeurons, sphereRadius).forEach((pos, i) => {
      const mat = new THREE.MeshBasicMaterial({ 
        color: defaultColor,
        transparent: true,
        opacity: 0.8
      });
      const neuron = new THREE.Mesh(neuronGeometry, mat);
      neuron.position.copy(pos);
      
      const outline = new THREE.LineSegments(
        new THREE.EdgesGeometry(neuronGeometry), 
        borderMaterial
      );
      outline.scale.multiplyScalar(1.05);
      neuron.add(outline);
      
      scene.add(neuron);
      neurons[i] = neuron;
      adjacencyList.set(i, []);
    });

    // --- Create Connections ---
    for (let i = 0; i < neurons.length; i++) {
      const d = neurons.map((n, j) => ({ 
        j, 
        dist: i === j ? Infinity : n.position.distanceTo(neurons[i].position) 
      }));
      d.sort((a, b) => a.dist - b.dist);
      d.slice(0, nearestNeighborCount).forEach(({ j }) => {
        if (!adjacencyList.get(i)?.includes(j)) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            neurons[i].position, 
            neurons[j].position
          ]);
          const line = new THREE.Line(geo, connectionMaterial.clone());
          scene.add(line);
          connections.push({ line, from: i, to: j });
          adjacencyList.get(i)?.push(j);
          adjacencyList.get(j)?.push(i);
        }
      });
    }

    // --- Animate Link & Neuron in Sync ---
    function animateConnectionAndFire(fromIdx: number, toIdx: number) {
      const con = connections.find(c =>
        (c.from === fromIdx && c.to === toIdx) ||
        (c.from === toIdx && c.to === fromIdx)
      );
      if (!con) return;
      
      const lineMaterial = con.line.material as THREE.LineBasicMaterial;
      const origColor = lineMaterial.color.getHex();
      let step = 0;
      const maxSteps = 30;
      
      function linkStep() {
        step++;
        const t = step / maxSteps;
        lineMaterial.color.lerpColors(
          new THREE.Color(glowColor),
          new THREE.Color(origColor),
          1 - t
        );
        if (step < maxSteps) {
          requestAnimationFrame(linkStep);
        } else {
          lineMaterial.color.setHex(glowColor);
          fireNeuron(toIdx, () => {
            lineMaterial.color.setHex(origColor);
          });
        }
      }
      linkStep();
    }

    function fireNeuron(idx: number, onDone?: () => void) {
      const n = neurons[idx];
      const neuronMaterial = n.material as THREE.MeshBasicMaterial;
      const originalOpacity = neuronMaterial.opacity;
      neuronMaterial.color.setHex(glowColor);
      neuronMaterial.opacity = 1;
      n.scale.set(1.3, 1.3, 1.3);
      
      setTimeout(() => {
        neuronMaterial.color.setHex(defaultColor);
        neuronMaterial.opacity = originalOpacity;
        n.scale.set(1, 1, 1);
        if (onDone) onDone();
      }, 400);
    }

    // --- Firing Loop ---
    function fireNeurons() {
      const count = Math.max(1, Math.floor(neurons.length * 0.15));
      const chosen = new Set<number>();
      while (chosen.size < count) {
        chosen.add(Math.floor(Math.random() * neurons.length));
      }
      chosen.forEach(i => {
        const nbrs = adjacencyList.get(i);
        if (!nbrs || !nbrs.length) return;
        const j = nbrs[Math.floor(Math.random() * nbrs.length)];
        animateConnectionAndFire(i, j);
      });
    }
    
    const fireInterval = setInterval(fireNeurons, 1500);

    // --- Gentle Rotation ---
    let rot = { x: 0.001, y: 0.0015 };
    const rotationInterval = setInterval(() => {
      rot.x = (Math.random() - 0.5) * 0.005;
      rot.y = (Math.random() - 0.5) * 0.005;
    }, 3000);
    
    camera.position.z = 5.5;

    // --- Render ---
    function render() {
      requestAnimationFrame(render);
      scene.rotation.x += rot.x;
      scene.rotation.y += rot.y;
      renderer.render(scene, camera);
    }
    render();

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
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
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
  }, [dimensions.width, dimensions.height]);

  

  return (
    <div 
      className={`w-full h-full max-md:w-full max-md:h-fit mx-auto ${className}`} 
    >
      {/* Neural Sphere Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        
      />
      
      {/* Overlay Content */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center px-4">
          {overlayContent }
        </div>
      )}
      
     
    </div>
  );
}