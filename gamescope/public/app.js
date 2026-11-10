/* ---------- Catálogo ---------- */
const STEAM = "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/";
const CATS = { popular: "Popular", indie: "Indie", metroidvania: "Metroidvania", lucha: "Lucha" };

// appid = ID de Steam (para traer la carátula). Los juegos sin appid usan una carátula de color generada.
const games = [
  { name: "Minecraft", cat: "popular", genre: "Sandbox · Supervivencia", desc: "Construye, explora y sobrevive en mundos infinitos donde tu imaginación pone el límite.", hue: 200, cover: "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Vanilla-Key-Art.jpg" },
  { name: "Fortnite", cat: "popular", genre: "Battle Royale", desc: "Aterriza, construye y sobrevive en el battle royale más famoso del mundo.", hue: 265 },
  { name: "Valorant", cat: "popular", genre: "Shooter táctico", desc: "Shooter 5v5 con agentes y habilidades donde cada ronda cuenta.", hue: 230 },
  { name: "Halo Infinite", cat: "popular", genre: "Shooter · Sci-fi", appid: 1240440, desc: "El Jefe Maestro regresa con campaña abierta y multijugador gratuito." },
  { name: "Counter-Strike 2", cat: "popular", genre: "Shooter táctico", appid: 730, desc: "El shooter competitivo por excelencia, renovado con un nuevo motor." },
  { name: "Apex Legends", cat: "popular", genre: "Battle Royale · Héroes", appid: 1172470, desc: "Escuadras, leyendas con habilidades únicas y combates rapidísimos." },
  { name: "Hollow Knight", cat: "metroidvania", genre: "Metroidvania", appid: 367520, desc: "Explora un reino subterráneo lleno de secretos, criaturas y combates exigentes." },
  { name: "Dead Cells", cat: "metroidvania", genre: "Roguelite · Metroidvania", appid: 588650, desc: "Combate rápido, exploración y niveles cambiantes en una aventura desafiante." },
  { name: "Ori and the Will of the Wisps", cat: "metroidvania", genre: "Metroidvania", appid: 1057090, desc: "Una aventura preciosa, fluida y emotiva por un bosque lleno de vida." },
  { name: "Blasphemous", cat: "metroidvania", genre: "Metroidvania · Oscuro", appid: 774361, desc: "Acción gótica y brutal en un mundo de pixel art inspirado en la España religiosa." },
  { name: "Cuphead", cat: "indie", genre: "Run & gun · Indie", appid: 268910, desc: "Acción dibujada a mano con jefes desafiantes y estética de dibujos clásicos." },
  { name: "Hades", cat: "indie", genre: "Roguelike · Indie", appid: 1145360, desc: "Escapa del inframundo en este intenso roguelike inspirado en la mitología griega." },
  { name: "Celeste", cat: "indie", genre: "Plataformas · Indie", appid: 504230, desc: "Acompaña a Madeline en una escalada exigente y emotiva por la montaña Celeste." },
  { name: "Stardew Valley", cat: "indie", genre: "Granja · Indie", appid: 413150, desc: "Hereda una granja, cultiva, explora cuevas y haz amigos en el pueblo." },
  { name: "Terraria", cat: "indie", genre: "Sandbox · Aventura", appid: 105600, desc: "Cava, construye y pelea contra jefes en un mundo 2D lleno de sorpresas." },
  { name: "Mortal Kombat 1", cat: "lucha", genre: "Lucha", appid: 1971870, desc: "Combates brutales que reinician el universo Mortal Kombat con un nuevo comienzo." },
  { name: "Street Fighter 6", cat: "lucha", genre: "Lucha", appid: 1364780, desc: "La legendaria saga evoluciona con nuevos modos, personajes y escena competitiva." },
  { name: "Tekken 8", cat: "lucha", genre: "Lucha 3D", appid: 1778820, desc: "Puños, patadas y drama familiar en el torneo del Rey del Puño de Hierro." },
  { name: "Guilty Gear -Strive-", cat: "lucha", genre: "Lucha anime", appid: 1384160, desc: "Peleas ultra rápidas con un apartado visual espectacular." }
];

// Los tonos de respaldo se mantienen en la gama azul/cian/índigo para respetar el diseño.
function hueFromName(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360; return 195 + (h % 75); }
const portraitUrl = id => `${STEAM}${id}/library_600x900.jpg`;
const headerUrl = id => `${STEAM}${id}/header.jpg`;

// Crea la carátula; si una imagen falla prueba la siguiente y al final muestra una carátula de color.
function coverNode(game, kind = "portrait") {
  const wrap = document.createElement("div");
  wrap.className = "cover-box";
  const srcs = [];
  if (game.appid) {
    if (kind === "portrait") srcs.push(portraitUrl(game.appid), headerUrl(game.appid));
    else srcs.push(headerUrl(game.appid), portraitUrl(game.appid));
  }
  if (game.cover) srcs.push(game.cover);
  const fallback = () => {
    wrap.innerHTML = "";
    const f = document.createElement("div");
    f.className = "cover-fallback";
    f.style.setProperty("--h", game.hue ?? hueFromName(game.name));
    const t = document.createElement("span");
    t.textContent = game.name;
    f.append(t);
    wrap.append(f);
  };
  if (!srcs.length) { fallback(); return wrap; }
  const img = document.createElement("img");
  img.loading = "lazy";
  img.alt = `Carátula de ${game.name}`;
  let i = 0;
  img.src = srcs[0];
  img.addEventListener("error", () => { i++; if (i < srcs.length) img.src = srcs[i]; else fallback(); });
  wrap.append(img);
  return wrap;
}

function findGame(name) {
  const n = String(name || "").trim().toLowerCase();
  if (!n) return null;
  return games.find(g => g.name.toLowerCase() === n)
    || games.find(g => g.name.toLowerCase().includes(n) || (n.length > 3 && n.includes(g.name.toLowerCase()))) || null;
}

/* ---------- Hero ---------- */
const heroCovers = document.querySelector("#hero-covers");
["Mortal Kombat 1", "Hollow Knight", "Hades"].forEach((name, i) => {
  const g = games.find(x => x.name === name);
  const card = document.createElement("div");
  card.className = `hero-cover hc-${i + 1}`;
  card.append(coverNode(g));
  heroCovers.append(card);
});

/* ---------- Catálogo ---------- */
const grid = document.querySelector("#game-grid");
function renderGrid(cat = "all") {
  grid.innerHTML = "";
  games.filter(g => cat === "all" || g.cat === cat).forEach(g => {
    const card = document.createElement("article");
    card.className = "game-card";
    const cover = document.createElement("div");
    cover.className = "game-cover";
    cover.append(coverNode(g));
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = CATS[g.cat];
    cover.append(badge);
    const info = document.createElement("div");
    info.className = "game-info";
    const h = document.createElement("h3"); h.textContent = g.name;
    const p = document.createElement("p"); p.textContent = g.desc;
    const meta = document.createElement("div"); meta.className = "game-meta";
    const s1 = document.createElement("span"); s1.textContent = g.genre;
    const s2 = document.createElement("span"); s2.textContent = "ANALIZAR ↗";
    meta.append(s1, s2);
    info.append(h, p, meta);
    card.append(cover, info);
    card.addEventListener("click", () => {
      document.querySelector("#game-input").value = g.name;
      document.querySelector("#analyze-form").scrollIntoView({ behavior: "smooth", block: "center" });
      toast(`${g.name} seleccionado`);
    });
    grid.append(card);
  });
}
renderGrid();
document.querySelectorAll(".cat-tab").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".cat-tab").forEach(x => x.classList.toggle("active", x === b));
  renderGrid(b.dataset.cat);
}));

/* ---------- Navegación ---------- */
const views = { checker: document.querySelector("#checker-view"), chat: document.querySelector("#chat-view") };
function setView(name) {
  Object.entries(views).forEach(([key, el]) => el.classList.toggle("active", key === name));
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
document.querySelectorAll("[data-jump]").forEach(b => b.addEventListener("click", () => setView(b.dataset.jump)));
document.querySelectorAll("[data-game]").forEach(b => b.addEventListener("click", () => document.querySelector("#game-input").value = b.dataset.game));
function toast(msg) { const t = document.querySelector("#toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 2400); }
function formatText(s) { return s.replace(/\*\*(.*?)\*\*/g, "$1").replace(/^#{1,4}\s*/gm, "").replace(/^\s*[-*]\s/gm, "• "); }

/* ---------- Game Checker ---------- */
function parseVerdict(text) {
  const m = text.match(/^\s*VEREDICTO:\s*(.+)$/im);
  if (!m) return { verdict: null, body: text };
  return { verdict: m[1].trim(), body: text.replace(m[0], "").trim() };
}
function verdictClass(v) {
  const s = v.toUpperCase();
  if (s.includes("NO RECOMEND")) return "bad";
  if (s.includes("AJUSTES") || s.includes("BAJO")) return "warn";
  if (s.includes("INCIERTO")) return "mid";
  return "good";
}

async function showResultGame(form) {
  const title = document.querySelector("#result-title");
  const coverBox = document.querySelector("#result-cover");
  title.textContent = form.game;
  document.querySelector("#result-specs").textContent = `${form.cpu} · ${form.gpu} · ${form.ram} GB RAM`;
  let g = findGame(form.game);
  coverBox.innerHTML = "";
  if (!g) {
    try {
      const r = await fetch("/api/cover?name=" + encodeURIComponent(form.game));
      const d = await r.json();
      g = d.found ? { name: d.name, appid: d.appid } : { name: form.game };
    } catch { g = { name: form.game }; }
  }
  title.textContent = g.name;
  coverBox.append(coverNode(g, "banner"));
}

const analyzeForm = document.querySelector("#analyze-form");
analyzeForm.addEventListener("submit", async e => {
  e.preventDefault();
  const btn = document.querySelector("#analyze-btn");
  const form = Object.fromEntries(new FormData(analyzeForm));
  const verdictEl = document.querySelector("#result-verdict");
  const textEl = document.querySelector("#result-text");
  btn.disabled = true;
  btn.textContent = "Analizando tu equipo...";
  document.querySelector("#empty-state").classList.add("hidden");
  document.querySelector("#result-content").classList.remove("hidden");
  verdictEl.classList.add("hidden");
  textEl.textContent = "GameScope está revisando tus componentes y los requisitos del juego. Esto puede tardar unos segundos...";
  showResultGame(form);
  if (window.innerWidth < 800) document.querySelector("#result-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  try {
    const r = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "No se pudo analizar.");
    const { verdict, body } = parseVerdict(data.answer);
    if (verdict) {
      verdictEl.textContent = verdict;
      verdictEl.className = `verdict ${verdictClass(verdict)}`;
    }
    textEl.textContent = formatText(body);
  } catch (err) {
    textEl.textContent = "No se pudo completar el análisis.\n\n" + err.message + "\n\nInténtalo de nuevo en unos segundos.";
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Analizar compatibilidad <span>✦</span>';
  }
});
document.querySelector("#copy-result").addEventListener("click", async () => {
  try {
    const v = document.querySelector("#result-verdict");
    const head = v.classList.contains("hidden") ? "" : v.textContent + "\n\n";
    await navigator.clipboard.writeText(head + document.querySelector("#result-text").textContent);
    toast("Análisis copiado");
  } catch { toast("No se pudo copiar"); }
});

/* ---------- Game Chat ---------- */
const messagesEl = document.querySelector("#messages");
let history = [];
function addMessage(text, role) {
  const wrap = document.createElement("div");
  wrap.className = `message ${role === "user" ? "user" : "bot"}`;
  const av = document.createElement("div");
  av.className = "message-avatar";
  av.textContent = role === "user" ? "T" : "G";
  const inner = document.createElement("div");
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = role === "user" ? text : formatText(text);
  const meta = document.createElement("small");
  meta.textContent = role === "user" ? "TÚ" : "GAMESCOPE AI";
  inner.append(bubble, meta);
  wrap.append(av, inner);
  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}
async function sendChat(text) {
  if (!text.trim()) return;
  addMessage(text, "user");
  history.push({ role: "user", text });
  const btn = document.querySelector("#send-btn");
  btn.disabled = true;
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "GameScope está pensando...";
  messagesEl.appendChild(typing);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  try {
    const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Error al conectar con Gemini.");
    const answer = data.answer || "No tengo una respuesta por ahora.";
    typing.remove();
    addMessage(answer, "model");
    history.push({ role: "model", text: answer });
  } catch (err) {
    typing.remove();
    history.pop();
    addMessage("No pude responder: " + err.message, "model");
  } finally {
    btn.disabled = false;
    document.querySelector("#chat-input").focus();
  }
}
document.querySelector("#chat-form").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.querySelector("#chat-input");
  const value = input.value.trim();
  input.value = "";
  sendChat(value);
});
document.querySelectorAll(".suggestions button").forEach(b => b.addEventListener("click", () => sendChat(b.textContent)));
document.querySelector("#clear-chat").addEventListener("click", () => {
  history = [];
  messagesEl.innerHTML = "";
  addMessage("¡Nueva conversación iniciada! ¿Qué videojuego exploramos hoy?", "model");
});
document.querySelector("#chat-input").addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); document.querySelector("#chat-form").requestSubmit(); }
});
