// Kavárna Pokoj · rozbalovací menu na mobilu
(function(){
  const top = document.querySelector(".top");
  const btn = document.querySelector(".nav-toggle");
  if (!top || !btn) return;
  const close = () => { top.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
  btn.addEventListener("click", () => {
    const open = top.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && top.classList.contains("open")) { close(); btn.focus(); } });
  document.addEventListener("click", e => { if (!top.contains(e.target)) close(); });
  window.matchMedia("(min-width: 821px)").addEventListener("change", e => { if (e.matches) close(); });
})();
