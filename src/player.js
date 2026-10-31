import * as BABYLON from "babylonjs";

// 角色控制器：只读取 inputState 的方向来移动，不关心输入来源。
export function createCharacter(scene, spawn) {
  const mesh = BABYLON.MeshBuilder.CreateCapsule(
    "player",
    { height: 1.8, radius: 0.4 },
    scene
  );
  mesh.position.copyFrom(spawn);
  mesh.ellipsoid = new BABYLON.Vector3(0.4, 0.9, 0.4);
  mesh.checkCollisions = true;

  const mat = new BABYLON.StandardMaterial("playerMat", scene);
  mat.diffuseColor = new BABYLON.Color3(0.78, 0.36, 0.33); // 暗红衣
  mesh.material = mat;

  const speed = 6;

  function update(dt, state) {
    const dir = new BABYLON.Vector3(state.moveX, 0, -state.moveY); // 上=前进=-Z
    if (dir.lengthSquared() > 0.0001) {
      dir.normalize();
      mesh.moveWithCollisions(dir.scale(speed * dt));
      mesh.rotation.y = Math.atan2(dir.x, dir.z);
    }
  }

  return { mesh, update };
}
