// HUD：右侧操作面板（拾取 / 交互）+ 靠近提示 + 顶部 toast。
// 纯 DOM 覆盖层，网页和小程序里都是同一套按钮逻辑。
export function createHud() {
  const panel = document.createElement("div");
  panel.id = "action-panel";

  const btnPick = document.createElement("button");
  btnPick.textContent = "拾取";
  const btnInter = document.createElement("button");
  btnInter.textContent = "交互";

  panel.append(btnPick, btnInter);
  document.body.appendChild(panel);

  const prompt = document.createElement("div");
  prompt.id = "prompt";
  prompt.style.display = "none";
  document.body.appendChild(prompt);

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.style.display = "none";
  document.body.appendChild(toast);

  let toastTimer = null;

  const hud = {
    onPickup: null,
    onInteract: null,
    showPrompt: (text) => {
      prompt.textContent = text;
      prompt.style.display = "block";
    },
    hidePrompt: () => {
      prompt.style.display = "none";
    },
    showToast: (text) => {
      toast.textContent = text;
      toast.style.display = "block";
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.style.display = "none";
      }, 2200);
    },
  };

  btnPick.addEventListener("click", () => hud.onPickup && hud.onPickup());
  btnInter.addEventListener("click", () => hud.onInteract && hud.onInteract());

  return hud;
}
