import * as BABYLON from "babylonjs";
import { createInput } from "./input.js";
import { createSongCity } from "./scene.js";
import { createCharacter } from "./player.js";
import { setupInteraction } from "./interaction.js";
import { createHud } from "./hud.js";
import "./style.css";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, { stencil: true });

const scene = new BABYLON.Scene(engine);
scene.clearColor = new BABYLON.Color3(0.83, 0.86, 0.88); // 米白天空
scene.collisionsEnabled = true;

// 相机：环绕跟随角色（等距感）
const camera = new BABYLON.ArcRotateCamera(
  "camera",
  -Math.PI / 2,
  Math.PI / 3.2,
  16,
  new BABYLON.Vector3(0, 1, 0),
  scene
);
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 8;
camera.upperRadiusLimit = 28;
camera.wheelPrecision = 24;
camera.minZ = 0.1;

const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.3, 1, 0.2), scene);
light.intensity = 0.95;
const dir = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(-0.5, -1, -0.3), scene);
dir.intensity = 0.5;

// 输入抽象层（键盘 + 虚拟摇杆）
const input = createInput();

// 场景：宋代城池（low-poly 占位）
const city = createSongCity(scene);

// 角色
const player = createCharacter(scene, city.spawn);

// HUD（右侧按钮 + 提示 + toast）
const hud = createHud();

// 交互系统
const interaction = setupInteraction({ scene, player, items: city.specialItems, hud });
hud.onPickup = () => interaction.tryPickup();
hud.onInteract = () => interaction.tryInteract();

// 主循环
engine.runRenderLoop(() => {
  const dt = Math.min(engine.getDeltaTime() / 1000, 0.05);
  input.update();
  player.update(dt, input.state);
  camera.target.copyFrom(player.mesh.position);
  interaction.update();
  if (input.state.pickup) interaction.tryPickup();
  if (input.state.interact) interaction.tryInteract();
  input.consume();
  scene.render();
});

window.addEventListener("resize", () => engine.resize());
