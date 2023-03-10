import "./styles.css";
import * as THREE from "three";
import { useEffect } from "react";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x0000ff
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);

const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 200;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1);

const render = () => {
  const dom = document.getElementById("node");
  dom.appendChild(renderer.domElement);
  renderer.render(scene, camera);
};

export default function App() {
  useEffect(() => {
    render();
  }, []);
  return <div className="App" id="node"></div>;
}
