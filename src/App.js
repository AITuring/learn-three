import "./styles.css";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
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
  // 每次绕y轴旋转0.01弧度
  mesh.rotateY(0.01);
  requestAnimationFrame(render);
};
// 定义了一个鼠标、键盘事件，自动检测鼠标键盘的变化，如果变化了就会自动更新相机的数据
const controls = new OrbitControls(camera, renderer.domElement);
// 如果threejs代码中通过requestAnimationFrame()实现渲染器渲染方法render()的周期性调用，
// 当通过OrbitControls操作改变相机状态的时候，
// 没必要在通过controls.addEventListener('change', render)监听鼠标事件调用渲染函数，
// 因为requestAnimationFrame()就会不停的调用渲染函数。
// controls.addEventListener("change", render);

export default function App() {
  useEffect(() => {
    render();
  }, []);
  return <div className="App" id="node"></div>;
}
