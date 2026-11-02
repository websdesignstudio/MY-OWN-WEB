/* =========================================================
   EDIT ME: your business details and prices live here.
   ========================================================= */
const CONFIG = {
  brand: "Calling Card",
  email: "hello@example.com",     // where orders are sent
  whatsapp: "910000000000",       // country code + number, no "+" or spaces
  instagram: "callingcard",       // your Instagram username, no "@"
  prices: {
    INR: { currency: "INR", locale: "en-IN", starter: 999, site: 1499, shop: 1999, renewal: 499 },
    USD: { currency: "USD", locale: "en-US", starter: 12,   site: 18,   shop: 24,   renewal: 6 }
  }
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;
const canHover = matchMedia("(hover:hover)").matches;

/* Icons */
document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
<symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 8l8 6 8-6"/></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path d="M5 18l-1 3 4-2h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v7a3 3 0 0 0 1 3z"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.2-4.2"/></symbol>
<symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="3"/><path d="M11 18h2"/></symbol>
<symbol id="i-insta" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>
<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></symbol>
</svg>`);

/* Brand, year, contact links */
$$("[data-brand]").forEach(el => el.textContent = CONFIG.brand);
$$("[data-email]").forEach(el => el.textContent = CONFIG.email);
const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();
const mailLink = $("#mailLink"); if (mailLink) mailLink.href = "mailto:" + CONFIG.email;
const waLink = $("#waLink"); if (waLink) waLink.href = "https://wa.me/" + CONFIG.whatsapp;
const igLink = $("#igLink"); if (igLink) { igLink.href = "https://instagram.com/" + CONFIG.instagram; const t = $("[data-ig-text]", igLink); if (t) t.textContent = "Instagram: @" + CONFIG.instagram; }
$$("[data-wa]").forEach(a => a.href = "https://wa.me/" + CONFIG.whatsapp);
$$("[data-wa-text]").forEach(a => a.href = a.href.replace(/wa\.me\/\d+/, "wa.me/" + CONFIG.whatsapp));
$$("[data-ig]").forEach(a => a.href = "https://instagram.com/" + CONFIG.instagram);
/* Floating WhatsApp and Instagram buttons on every page */
(function(){ const f = document.createElement("div"); f.className = "fab";
  f.innerHTML = `<a class="wa" href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/></svg></a><a class="ig" href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Follow on Instagram"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.2 6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg></a>`;
  document.body.appendChild(f); })();

const toast = $("#toast");
function say(msg){ toast.textContent = msg; toast.classList.add("show"); clearTimeout(say.t); say.t = setTimeout(() => toast.classList.remove("show"), 3400); }

/* Header, nav, progress */
const header = $("#siteHeader"), bar = $("#progress"), navT = $("#navToggle"), nav = $("#nav");
function onScroll(){
  header.classList.toggle("is-scrolled", scrollY > 8);
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();
navT.addEventListener("click", () => {
  const open = navT.getAttribute("aria-expanded") === "true";
  navT.setAttribute("aria-expanded", !open); nav.classList.toggle("open", !open);
});

/* Live site previews: render a real page at its design width, scaled to fit its box */
function fitPreview(vf){
  const f = vf.querySelector("iframe"), dw = +vf.dataset.w || 1280;
  const k = vf.clientWidth / dw;
  if (!k) return;
  f.style.setProperty("--fw", dw + "px");
  f.style.transform = "scale(" + k + ")";
  f.style.height = (vf.clientHeight / k) + "px";
}
if ("ResizeObserver" in window) {
  const ro = new ResizeObserver(es => es.forEach(e => fitPreview(e.target)));
  $$(".vf").forEach(v => ro.observe(v));
} else { const all = () => $$(".vf").forEach(fitPreview); addEventListener("resize", all); addEventListener("load", all); }

/* Hero: word-by-word headline, rotating audience, tilt and parallax */
const h1 = $("#heroTitle");
if (h1) {
  h1.innerHTML = h1.textContent.trim().split(/\s+/).map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
  const words = ["small businesses", "shops and cafés", "clinics and schools", "freelancers", "photographers", "creators"], rot = $("#rot");
  let wi = 0, ci = words[0].length, del = true;
  (function type(){
    if (reduceMotion) return;
    if (del) { ci--; if (ci <= 0) { del = false; wi = (wi + 1) % words.length; } }
    else { ci++; if (ci >= words[wi].length) { del = true; rot.textContent = words[wi]; return setTimeout(type, 1700); } }
    rot.textContent = words[wi].slice(0, Math.max(ci, 0)) || " ";
    setTimeout(type, del ? 45 : 85);
  })();
  const hero = $(".hero"), tilt = $(".tilt");
  if (canHover && !reduceMotion) hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    hero.style.setProperty("--mx", x * 100 + "%"); hero.style.setProperty("--my", y * 100 + "%");
    $$(".fl", hero).forEach(f => { f.style.setProperty("--px", (x - .5).toFixed(2)); f.style.setProperty("--py", (y - .5).toFixed(2)); });
    const t = $(".stage").getBoundingClientRect();
    const tx = (e.clientX - (t.left + t.width / 2)) / t.width, ty = (e.clientY - (t.top + t.height / 2)) / t.height;
    tilt.style.setProperty("--ry", Math.max(-1, Math.min(1, tx)) * 9 + "deg"); tilt.style.setProperty("--rx", Math.max(-1, Math.min(1, ty)) * -8 + "deg");
  });
}

/* Magnetic buttons */
if (canHover && !reduceMotion) $$(".magnetic").forEach(el => {
  el.addEventListener("pointermove", e => { const r = el.getBoundingClientRect(); el.style.translate = ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + "px"; });
  el.addEventListener("pointerleave", () => el.style.translate = "");
});

/* Samples page: category filter */
const sg = $("#sampleGrid");
if (sg) $("#filters").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  $$(".chip", $("#filters")).forEach(c => c.setAttribute("aria-pressed", c === b));
  let n = 0;
  $$(".sample", sg).forEach(s => {
    const show = b.textContent === "All" || s.dataset.cat === b.textContent;
    s.hidden = !show; s.classList.remove("pop");
    if (show) { s.style.setProperty("--pd", (n++ * .07) + "s"); void s.offsetWidth; s.classList.add("pop"); }
  });
  $$(".vf", sg).forEach(fitPreview);
});

/* Blog page: filter and search */
const pg = $("#postGrid");
if (pg) {
  let cat = "All", q = "";
  const apply = () => {
    let shown = 0;
    $$(".post-card", pg).forEach(c => {
      const ok = (cat === "All" || c.dataset.cat === cat) && (!q || c.dataset.text.includes(q));
      c.hidden = !ok; if (ok) shown++;
    });
    $("#noPosts").hidden = shown > 0;
  };
  $("#filters").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip", $("#filters")).forEach(c => c.setAttribute("aria-pressed", c === b)); cat = b.textContent; apply();
  });
  $("#postSearch").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); apply(); });
}

/* Device switcher: one real website at three real widths */
const dev = $("#dev");
if (dev) {
  const vfEl = $("#devVf");
  const spec = { laptop: [1280, "Laptop: the full layout, 1280 px wide."], tablet: [900, "Tablet: spacing adjusts, nothing is cut off, 900 px wide."], phone: [390, "Phone: one calm column, easy to tap, 390 px wide."] };
  const setView = v => {
    $$("#devBtns button").forEach(x => x.setAttribute("aria-pressed", x.dataset.v === v));
    dev.dataset.view = v; vfEl.dataset.w = spec[v][0]; $("#devLabel").textContent = spec[v][1];
    fitPreview(vfEl); setTimeout(() => fitPreview(vfEl), 750);
  };
  $("#devBtns").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { seqTouched = true; setView(b.dataset.v); } });
  let seqTouched = false;
  if (!reduceMotion && "IntersectionObserver" in window) {
    const seq = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; seq.disconnect();
      ["tablet", "phone", "laptop"].forEach((v, i) => setTimeout(() => { if (!seqTouched) setView(v); }, 1200 + i * 2200));
    }), { threshold: .6 });
    seq.observe(dev);
  }
}

/* Hero: live sample websites sliding in and out */
const hs = $("#heroSlides");
if (hs) {
  const slides = $$(".slide", hs), dots = $$(".dots button", hs), nameEl = $("#slideName"), linkEl = $("#slideLink");
  let cur = 0, timer;
  const go = n => {
    cur = (n + slides.length) % slides.length;
    slides.forEach((s, i) => { s.classList.toggle("on", i === cur); s.classList.toggle("out", i === (cur + slides.length - 1) % slides.length); s.setAttribute("aria-hidden", i !== cur); });
    dots.forEach((d, i) => d.setAttribute("aria-selected", i === cur));
    const f = $("iframe", slides[cur]).getAttribute("src"); linkEl.href = f; nameEl.textContent = dots[cur].getAttribute("aria-label");
  };
  const auto = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => go(cur + 1), 4800); };
  dots.forEach((d, i) => d.addEventListener("click", () => { go(i); auto(); }));
  hs.addEventListener("pointerenter", () => clearInterval(timer)); hs.addEventListener("pointerleave", auto); auto();
}

/* Pricing with currency switch (the pricing page has the toggle, other pages follow the saved choice) */
const money = (cur, n) => new Intl.NumberFormat(CONFIG.prices[cur].locale, { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n);
function setCurrency(cur, animate){
  const p = CONFIG.prices[cur];
  $$("[data-price]").forEach(el => {
    el.firstChild.textContent = money(cur, p[el.dataset.price]);
    if (animate && !reduceMotion) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }
  });
  const note = $("#planNote"); if (note) note.textContent = `Hosting renews at ${money(cur, p.renewal)} a year after the first year. You can cancel anytime and take your files with you.`;
  try { localStorage.setItem("cur", cur); } catch (e) {}
}
if ($("[data-price]")) {
  let cur = "INR"; try { const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; cur = localStorage.getItem("cur") || "INR"; } catch (e) {}
  const r = $(`.currency input[value="${cur}"]`); if (r) r.checked = true; setCurrency(cur, false);
  $$(".currency input").forEach(i => i.addEventListener("change", () => setCurrency(i.value, true)));
}

/* Contact page: preselect plan from ?plan= and open the visitor's email app */
const form = $("#orderForm");
if (form) {
  try { const pl = new URLSearchParams(location.search).get("plan"); if (pl && $(`#oPlan option[value="${pl}"]`)) $("#oPlan").value = pl; } catch (e) {}
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    [["#oName", v => v.trim()], ["#oEmail", v => /^\S+@\S+\.\S+$/.test(v)]].forEach(([id, test]) => {
      const el = $(id), good = test(el.value);
      el.setAttribute("aria-invalid", !good); ok = ok && good;
      let er = el.parentNode.querySelector(".err");
      if (!good) { if (!er) { er = document.createElement("span"); er.className = "err"; el.parentNode.append(er); } er.textContent = id === "#oName" ? "Please add your name." : "Please enter a valid email."; } else if (er) er.remove();
    });
    if (!ok) return say("Please fix the highlighted fields.");
    const plan = $("#oPlan").selectedOptions[0].textContent;
    const body = `Name: ${$("#oName").value}\nEmail: ${$("#oEmail").value}\nPlan: ${plan}\n\n${$("#oMsg").value}`;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Website order: " + plan)}&body=${encodeURIComponent(body)}`;
    say("Thank you! Your email app should open with the details ready to send.");
  });
}

/* Scroll reveals, counters, steps */
function countUp(el){
  const to = +el.dataset.count; if (reduceMotion) { el.textContent = to; return; }
  const t0 = performance.now();
  (function step(t){ const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(t0);
}
$$("[data-stagger]").forEach(g => [...g.children].forEach((c, i) => { c.classList.add("rv"); c.style.setProperty("--d", i * 90 + "ms"); }));
$$(".section-head, .fact, .together").forEach(el => el.classList.add("rv"));
$$(".fact").forEach((el, i) => el.style.setProperty("--d", i * 90 + "ms"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const el = e.target; el.classList.add("in");
    if (el.matches(".steps li")) el.classList.add("on");
    if (el.matches(".fact")) countUp($("b", el));
    io.unobserve(el);
  }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  $$(".rv, .steps li").forEach(el => io.observe(el));
} else { $$(".rv, .steps li").forEach(el => el.classList.add("in", "on")); $$(".fact b").forEach(b => b.textContent = b.dataset.count); }

/* Floating order dock */
const dock = $("#dock"), order = $("#order");
if (dock) {
  const upd = () => dock.classList.toggle("show", scrollY > innerHeight * .8 && !(order && order.getBoundingClientRect().top < innerHeight * .65));
  addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
}

document.documentElement.classList.add("js");
