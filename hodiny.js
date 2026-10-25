// =========================================================
// Kavárna Pokoj · otevírací doba (sdílená pro všechny stránky)
// Otevírací dobu měňte JEN TADY. Projeví se v horní liště,
// v tabulce na stránce Kde nás najdete i na titulní stránce.
// =========================================================

// [otevření, zavření] ve formátu "HH:MM", null = zavřeno. Index 0 = pondělí.
// POZOR: odhad, ověřit u kavárny.
const HOURS = [
  ["08:00","18:00"], ["08:00","18:00"], ["08:00","18:00"], ["08:00","18:00"],
  ["08:00","18:00"], ["10:00","17:00"], ["10:00","17:00"]
];
const DAYS = ["Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota","Neděle"];

(function(){
  const now = new Date();
  const today = (now.getDay() + 6) % 7;
  const toMin = s => { const [a,b] = s.split(":").map(Number); return a*60+b; };
  const mins = now.getHours()*60 + now.getMinutes();
  const h = HOURS[today];

  // Tabulka otevírací doby (jen na stránkách, kde je <tbody id="hours">)
  const tbody = document.getElementById("hours");
  if (tbody) {
    HOURS.forEach((d, i) => {
      const tr = document.createElement("tr");
      if (i === today) tr.className = "today";
      tr.innerHTML = `<td>${DAYS[i]}</td><td>${d ? d[0] + "–" + d[1] : "zavřeno"}</td>`;
      tbody.appendChild(tr);
    });
  }

  // Dnešní otevírací doba v textu (prvky s atributem data-dnes)
  document.querySelectorAll("[data-dnes]").forEach(el => {
    el.textContent = h ? `Dnes ${h[0]}–${h[1]}` : "Dnes zavřeno";
  });

  // Stav otevření v horní liště
  const status = document.getElementById("status");
  const text = document.getElementById("status-text");
  if (!status || !text) return;
  if (h && mins >= toMin(h[0]) && mins < toMin(h[1])) {
    status.classList.add("open");
    text.textContent = "Dnes otevřeno do " + h[1];
  } else if (h && mins < toMin(h[0])) {
    text.textContent = "Dnes otevíráme v " + h[0];
  } else {
    let n = 1;
    while (n < 7 && !HOURS[(today+n)%7]) n++;
    const next = HOURS[(today+n)%7];
    text.textContent = next ? (n === 1 ? "Zítra od " : DAYS[(today+n)%7] + " od ") + next[0] : "Zavřeno";
  }
})();
