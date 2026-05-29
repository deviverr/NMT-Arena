export class ArenaHUD {
  private host: HTMLDivElement | null = null;
  private timerInterval: number | null = null;
  private readonly startTime = Date.now();

  mount() {
    if (this.host) return;
    this.host = document.createElement("div");
    this.host.id = "nmt-arena-hud-host";
    const root = this.host.attachShadow({ mode: "open" });
    root.innerHTML = `
      <style>
        :host { all: initial; }
        .hud { position: fixed; top: 18px; right: 18px; z-index: 2147483647; width: 260px; border-radius: 24px; background: #f6faf7; color: #062e18; box-shadow: 0 16px 40px rgba(6,46,24,.18); border: 1px solid #a8d5b5; font-family: Nunito, system-ui, sans-serif; overflow: hidden; }
        .bar { cursor: move; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 12px 14px; background: #1b8a4c; color: white; font-weight: 900; }
        .body { padding: 14px; display: grid; gap: 10px; }
        .stat { display: flex; align-items: center; justify-content: space-between; background: white; border-radius: 18px; padding: 10px 12px; font-weight: 800; }
        button { width: 32px; height: 32px; border: 0; border-radius: 999px; background: rgba(255,255,255,.2); color: white; font-size: 18px; cursor: pointer; }
        .min .body { display: none; }
        .toast { margin-top: 8px; border-radius: 18px; background: #f59e0b; color: #fff; padding: 10px; text-align: center; font-weight: 900; animation: pop .6s ease; }
        @keyframes pop { 0% { transform: scale(.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      </style>
      <section class="hud" aria-label="NMT Arena HUD">
        <div class="bar"><span>🏟️ NMT Arena</span><button id="min" title="Згорнути">−</button></div>
        <div class="body">
          <div class="stat"><span>Час</span><span id="timer">0:00</span></div>
          <div class="stat"><span>Стрік</span><span id="streak">0</span></div>
          <div class="stat"><span>XP</span><span id="xp">0</span></div>
          <div id="messages"></div>
        </div>
      </section>
    `;
    document.body.appendChild(this.host);
    root.getElementById("min")?.addEventListener("click", () => root.querySelector(".hud")?.classList.toggle("min"));
    const hud = root.querySelector<HTMLElement>(".hud");
    if (hud) this.makeDraggable(hud);
    this.timerInterval = window.setInterval(() => this.tick(root), 1000);
  }

  showResult(xpEarned: number, newTotal: number) {
    const root = this.host?.shadowRoot;
    root?.getElementById("xp")?.replaceChildren(document.createTextNode(newTotal.toLocaleString("uk-UA")));
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = `+${xpEarned} XP`;
    root?.getElementById("messages")?.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2400);
  }

  showMessage(message: string) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    this.host?.shadowRoot?.getElementById("messages")?.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3000);
  }

  private tick(root: ShadowRoot) {
    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    root.getElementById("timer")?.replaceChildren(document.createTextNode(`${mins}:${secs.toString().padStart(2, "0")}`));
  }

  private makeDraggable(el: HTMLElement) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;
    el.addEventListener("mousedown", (event) => {
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      const rect = el.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
    });
    document.addEventListener("mousemove", (event) => {
      if (!dragging) return;
      el.style.left = `${startLeft + event.clientX - startX}px`;
      el.style.top = `${startTop + event.clientY - startY}px`;
      el.style.right = "auto";
    });
    document.addEventListener("mouseup", () => { dragging = false; });
  }

  destroy() {
    if (this.timerInterval) window.clearInterval(this.timerInterval);
    this.host?.remove();
    this.host = null;
  }
}
