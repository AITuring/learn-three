import "./styles.css";
import * as THREE from "three";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
  opacity: 0.6,
  transparent: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 球半径，水平、竖直细分精度
const box = new THREE.SphereGeometry(60, 40, 40);
const boxMaterial = new THREE.MeshLambertMaterial({
  color: 0xe3edfa,
});
const boxMesh = new THREE.Mesh(box, boxMaterial);
// 沿y轴正向平移120
boxMesh.translateY(120);
scene.add(boxMesh);

// 圆柱网格模型
var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25);
var material3 = new THREE.MeshPhongMaterial({
  color: 0xffff00,
  specular: 0x4488ee,
  shininess: 12,
});
var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
// mesh3.translateX(120); //球体网格模型沿Y轴正方向平移120
mesh3.position.set(120, 0, 0); //设置mesh3模型对象的xyz坐标为120,0,0
scene.add(mesh3); //

const point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);

const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);

// 创建辅助坐标系, 250是坐标系最大刻度
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

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
