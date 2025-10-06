// /js/include.js
(async function () {
  const base = "/"; // 你的網站在根目錄，直接用絕對路徑

  const resolve = (path) => (path.startsWith("/") ? path : base + path);

  const targets = document.querySelectorAll("[data-include]");
  for (const el of targets) {
    const url = resolve(el.getAttribute("data-include"));
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      el.outerHTML = html; // 以片段（含<header>/<footer>）覆蓋占位
    } catch (e) {
      console.error("Include failed:", url, e);
    }
  }
})();
