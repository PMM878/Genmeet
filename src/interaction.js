import * as BABYLON from "babylonjs";

// 交互系统：靠近检测 + 拾取 + 交互。
// 之后可在 feat/交互系统-拾取与点击 分支里扩展知识卡、拜师、交易等。
export function setupInteraction({ scene, player, items, hud }) {
  let nearItem = null;

  function update() {
    const p = player.mesh.position;
    nearItem = null;
    for (const it of items) {
      if (it.metadata.picked) continue;
      if (BABYLON.Vector3.Distance(p, it.position) < 2.5) {
        nearItem = it;
        break;
      }
    }
    if (nearItem) {
      hud.showPrompt(`靠近「${nearItem.metadata.name}」——按 E 或点「交互」`);
    } else {
      hud.hidePrompt();
    }
  }

  function tryPickup() {
    if (nearItem && nearItem.metadata.type === "ruVase" && !nearItem.metadata.picked) {
      nearItem.metadata.picked = true;
      nearItem.setEnabled(false);
      hud.showToast(`已拾取：${nearItem.metadata.name}（获得汝瓷知识卡）`);
    }
  }

  function tryInteract() {
    if (nearItem) {
      hud.showToast(`正在查看：${nearItem.metadata.name} — 汝窑天青釉，宋代美学代表。`);
    }
  }

  return { update, tryPickup, tryInteract };
}
