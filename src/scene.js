import * as BABYLON from "babylonjs";

// 宋代城池场景（low-poly 占位版）。
// 之后可在 feat/场景-宋代城池 分支里替换为更精细的城墙、城门、交易街、档案馆等。
export function createSongCity(scene) {
  const root = new BABYLON.TransformNode("songCity", scene);

  // 地面（青灰）
  const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 80, height: 80 }, scene);
  const gMat = new BABYLON.StandardMaterial("groundMat", scene);
  gMat.diffuseColor = new BABYLON.Color3(0.78, 0.8, 0.78);
  ground.material = gMat;
  ground.checkCollisions = true;

  // 主街道（木色长条）
  const road = BABYLON.MeshBuilder.CreateGround("road", { width: 9, height: 80 }, scene);
  const rMat = new BABYLON.StandardMaterial("roadMat", scene);
  rMat.diffuseColor = new BABYLON.Color3(0.7, 0.6, 0.48);
  road.material = rMat;
  road.position.y = 0.02;
  road.checkCollisions = true;

  // 低多边形建筑（米白墙 + 青灰瓦顶）
  const wallMat = new BABYLON.StandardMaterial("wallMat", scene);
  wallMat.diffuseColor = new BABYLON.Color3(0.92, 0.9, 0.85);
  const roofMat = new BABYLON.StandardMaterial("roofMat", scene);
  roofMat.diffuseColor = new BABYLON.Color3(0.42, 0.48, 0.54);

  for (let i = 0; i < 12; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = side * 9;
    const z = -30 + i * 5;
    const h = 4 + (i % 3);
    const box = BABYLON.MeshBuilder.CreateBox("house" + i, { width: 5, height: h, depth: 5 }, scene);
    box.position.set(x, h / 2, z);
    box.material = wallMat;
    box.checkCollisions = true;

    const roof = BABYLON.MeshBuilder.CreateCylinder(
      "roof" + i,
      { diameter: 7.5, height: 1.6, tessellation: 4 },
      scene
    );
    roof.position.set(x, h + 0.8, z);
    roof.rotation.y = Math.PI / 4;
    roof.material = roofMat;
    roof.checkCollisions = true;
  }

  // 中央广场标记（圆盘）
  const plaza = BABYLON.MeshBuilder.CreateDisc("plaza", { radius: 5, tessellation: 32 }, scene);
  plaza.rotation.x = Math.PI / 2;
  plaza.position.set(0, 0.03, 0);
  const pMat = new BABYLON.StandardMaterial("plazaMat", scene);
  pMat.diffuseColor = new BABYLON.Color3(0.82, 0.78, 0.68);
  plaza.material = pMat;

  // 特殊可交互物品：汝窑天青釉瓶
  const vase = BABYLON.MeshBuilder.CreateCylinder(
    "ruVase",
    { diameterTop: 0.85, diameterBottom: 0.6, height: 1.6, tessellation: 10 },
    scene
  );
  vase.position.set(0, 0.8, -2);
  const vaseMat = new BABYLON.StandardMaterial("vaseMat", scene);
  vaseMat.diffuseColor = new BABYLON.Color3(0.62, 0.8, 0.82); // 汝窑天青
  vase.material = vaseMat;
  vase.metadata = { type: "ruVase", name: "汝窑天青釉瓶", picked: false };

  return {
    root,
    spawn: new BABYLON.Vector3(0, 0, 12),
    specialItems: [vase],
  };
}
