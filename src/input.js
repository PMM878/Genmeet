// 输入抽象层：键盘 与 虚拟摇杆 都写入同一个 inputState。
// 游戏逻辑只读取 inputState，不关心输入来自键盘还是触屏，
// 因此同一套代码在网页（键盘）和微信小程序（摇杆）下行为一致。
export function createInput() {
  const state = { moveX: 0, moveY: 0, pickup: false, interact: false };

  // —— 键盘 ——
  const keys = Object.create(null);
  const keyMap = {
    ArrowUp: [0, 1], KeyW: [0, 1],
    ArrowDown: [0, -1], KeyS: [0, -1],
    ArrowLeft: [-1, 0], KeyA: [-1, 0],
    ArrowRight: [1, 0], KeyD: [1, 0],
  };

  window.addEventListener("keydown", (e) => {
    if (keyMap[e.code]) {
      keys[e.code] = true;
      e.preventDefault();
    }
    if (e.code === "KeyE" || e.code === "Space") {
      state.pickup = true;
      e.preventDefault();
    }
  });
  window.addEventListener("keyup", (e) => {
    if (keyMap[e.code]) keys[e.code] = false;
  });

  // —— 虚拟摇杆（触屏显示，桌面隐藏；桌面也可用鼠标拖拽调试）——
  let joyActive = false;
  let joyX = 0;
  let joyY = 0;

  const stick = document.getElementById("joystick");
  const knob = document.getElementById("joystick-knob");
  if (stick && knob) {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouch) stick.style.display = "none";

    let active = false;
    let cx = 0;
    let cy = 0;
    const max = 36;

    const start = (e) => {
      active = true;
      const r = stick.getBoundingClientRect();
      cx = r.left + r.width / 2;
      cy = r.top + r.height / 2;
      move(e);
    };
    const move = (e) => {
      if (!active) return;
      const t = e.touches ? e.touches[0] : e;
      let dx = t.clientX - cx;
      let dy = t.clientY - cy;
      const len = Math.hypot(dx, dy);
      if (len > max) {
        dx = (dx / len) * max;
        dy = (dy / len) * max;
      }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      joyX = dx / max;
      joyY = -dy / max; // 屏幕向上(负 y) = 前进(正 moveY)
      joyActive = true;
    };
    const end = () => {
      active = false;
      joyActive = false;
      joyX = 0;
      joyY = 0;
      knob.style.transform = "translate(0px, 0px)";
    };

    if (isTouch) {
      stick.addEventListener("touchstart", start, { passive: true });
      stick.addEventListener("touchmove", move, { passive: true });
      stick.addEventListener("touchend", end);
    }
    // 桌面也允许鼠标拖拽，方便调试
    stick.addEventListener("mousedown", start);
    window.addEventListener("mousemove", (e) => {
      if (active) move(e);
    });
    window.addEventListener("mouseup", end);
  }

  // 每帧调用：把键盘 / 摇杆 归并成统一方向
  function update() {
    let kx = 0;
    let ky = 0;
    for (const code in keys) {
      if (keys[code] && keyMap[code]) {
        kx += keyMap[code][0];
        ky += keyMap[code][1];
      }
    }
    if (kx !== 0 || ky !== 0) {
      state.moveX = Math.max(-1, Math.min(1, kx));
      state.moveY = Math.max(-1, Math.min(1, ky));
    } else if (joyActive) {
      state.moveX = joyX;
      state.moveY = joyY;
    } else {
      state.moveX = 0;
      state.moveY = 0;
    }
  }

  // 每帧末调用：清除一次性触发的动作
  function consume() {
    state.pickup = false;
    state.interact = false;
  }

  return { state, update, consume };
}
