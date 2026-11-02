const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..", "site", "samples");
const ent = s => s.replace(/&(?!amp;|#\d+;|[a-z]+;)/g, "&amp;");
const attr = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const IM = require("./images");
let POOL = "work", FIRST = true;
const POOLS = { "studio-marigold": "wedding", "ishaan-rao": "work", "meera-nair": "finance", "brew-and-bound": "cafe", "dev-malhotra": "fitness", "loom-and-thread": "fashion", "greenfield-school": "school", "carepoint-hospital": "hospital", "spice-route-kitchen": "food", "nila-jewels": "jewel", "aura-salon": "salon", "form-and-field": "arch", "ember-and-oak": "interior", "travelo": "travel" };
const img = (kw, w, h, lock, cls = "", alt = "", pool = POOL) => { const top = FIRST; FIRST = false; const src = IM.photo(pool, kw, lock, w, h); return `<img class="${cls}" src="${src}" data-alt="${IM.alts(pool, src).replace(/ /g, "|")}" data-pool="${pool}" alt="${attr(alt)}" ${top ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} width="${w}" height="${h}">`; };
const thumb = (kw, lock) => IM.photo(POOL, kw, lock, 120, 120);
const words = t => t.split(" ").map((w, i) => `<span class="wd"><span style="--i:${i}">${w}</span></span>`).join(" ");
const btns = b => (b || []).map(([l, h, s]) => `<a class="btn ${s || ""}" href="${h}">${l}</a>`).join("");
const sh = (t, p, eb) => t ? `<div class="sh">${eb ? `<p class="eyebrow">${eb}</p>` : ""}<h2>${t}</h2>${p ? `<p>${p}</p>` : ""}</div>` : "";
const sec = (inner, o = {}) => `<section class="s ${o.cls || ""}"${o.id ? ` id="${o.id}"` : ""}><div class="w">${inner}</div></section>`;

const B = {
  hero: o => `<section class="hero hero-${o.kind}${o.rev ? " rev" : ""}">${o.kind === "full" ? `<div class="hbg">${img(o.kw, 1600, 900, o.lock || 1, "", o.alt || "")}</div>` : ""}
<div class="w hgrid"><div class="ht">${o.eyebrow ? `<p class="eyebrow">${o.eyebrow}</p>` : ""}<h1>${words(o.h1)}</h1><p class="lead">${o.p}</p><div class="row">${btns(o.cta)}</div>${o.note ? `<p class="note">${o.note}</p>` : ""}</div>
${o.kind === "split" ? `<div class="hi">${img(o.kw, 900, 1050, o.lock || 1, "", o.alt || "")}${o.badge ? `<div class="badge float">${o.badge}</div>` : ""}</div>` : ""}</div>
${(o.kind === "center" || o.kind === "type") && o.strip ? `<div class="w strip">${o.strip.map((k, i) => `<div class="si">${img(k, 600, 780, i + 2)}</div>`).join("")}</div>` : ""}</section>`,
  marquee: o => `<div class="mq" aria-hidden="true">${[1, 2].map(() => `<div>${o.words.map(w => `<span>${w}</span>`).join("")}</div>`).join("")}</div>`,
  stats: o => `<section class="stats"><div class="w g4">${o.items.map(([n, l, s]) => `<div><b data-count="${n}" data-suf="${s || ""}">0</b><span>${l}</span></div>`).join("")}</div></section>`,
  cards: o => sec(sh(o.t, o.p, o.eb) + `<div class="g${o.cols || 3}" data-grid>${o.items.map((i, n) => `<article class="card">${o.images ? `<div class="ci">${img(i.kw || i.t, 640, 400, (o.lock || 30) + n, "", i.t)}</div>` : i.ic ? `<div class="ic">${i.ic}</div>` : o.num ? `<span class="k">${String(n + 1).padStart(2, "0")}</span>` : ""}<h3>${i.t}</h3><p>${i.p}</p>${i.pr ? `<span class="pr">${i.pr}</span>` : ""}</article>`).join("")}</div>`, o),
  split: o => sec(`<div class="sp${o.rev ? " rev" : ""}"><div class="sx"><div class="im ${o.tall ? "t" : ""} cl">${img(o.kw, 900, o.tall ? 1100 : 700, o.lock || 5, "", o.alt || "")}</div></div><div class="tx">${o.eb ? `<p class="eyebrow">${o.eb}</p>` : ""}<h2 class="h2">${o.t}</h2><p>${o.p}</p>${o.list ? `<ul>${o.list.map(l => `<li>${l}</li>`).join("")}</ul>` : ""}${o.cta ? `<div class="row">${btns(o.cta)}</div>` : ""}</div></div>`, o),
  gallery: o => sec(sh(o.t, o.p, o.eb) + `<div class="gal" data-grid>${o.items.map(([k, c], i) => `<figure>${img(k, 700, i % 5 === 0 ? 1000 : 600, (o.lock || 10) + i, "", c)}<figcaption>${c}</figcaption></figure>`).join("")}</div>`, o),
  products: o => sec(sh(o.t, o.p, o.eb) + `<div class="prods" data-grid>${o.items.map((p, i) => `<article class="pd"><div class="im">${p.tag ? `<span class="tg">${p.tag}</span>` : ""}${img(p.kw, 600, 800, p.lock || i + 20, "", p.name)}</div><h3>${p.name}</h3><p class="pp">${o.cur || "₹"}${p.price.toLocaleString("en-IN")}</p><button class="btn o sm add" data-id="${p.id}" data-name="${attr(p.name)}" data-price="${p.price}" data-img="${thumb(p.kw, p.lock || i + 20)}">Add to cart</button></article>`).join("")}</div>`, o),
  menu: o => sec(sh(o.t, o.p, o.eb) + `<div class="menu">${o.sections.map(s => `<h3>${s.t}</h3>${s.items.map(i => `<div class="it"><div><strong>${i.n}</strong><small>${i.d}</small></div><div class="rt">${o.cur || "₹"}${i.p}${o.order ? `<button class="add" aria-label="Add ${attr(i.n)} to cart" data-id="${i.n.replace(/\W/g, "")}" data-name="${attr(i.n)}" data-price="${i.p}" data-img="${thumb(o.kw || "food", i.p)}">+</button>` : ""}</div></div>`).join("")}`).join("")}</div>`, o),
  team: o => sec(sh(o.t, o.p, o.eb) + `<div class="g${o.cols || 4} team" data-grid>${o.items.map((p, i) => `<div><div class="im">${img(p.kw || "portrait", 500, 500, p.lock || i + 40, "", p.n, "portrait")}</div><h3>${p.n}</h3><p>${p.r}</p></div>`).join("")}</div>`, o),
  steps: o => sec(sh(o.t, o.p, o.eb) + `<ol class="st">${o.items.map(([t, p]) => `<li><h3>${t}</h3><p>${p}</p></li>`).join("")}</ol>`, o),
  quotes: o => sec(sh(o.t, o.p, o.eb) + `<div class="qt">${o.items.map(([q, n]) => `<blockquote>“${q}”<cite>${n}</cite></blockquote>`).join("")}</div>`, o),
  faq: o => sec(sh(o.t, o.p, o.eb) + `<div class="fq" style="max-width:820px">${o.items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>`, o),
  timeline: o => sec(sh(o.t, o.p, o.eb) + `<ul class="tl">${o.items.map(([y, t]) => `<li><b>${y}</b><span>${t}</span></li>`).join("")}</ul>`, o),
  text: o => sec(`<div class="prose">${o.t ? `<h2 class="h2" style="margin-bottom:22px">${o.t}</h2>` : ""}${o.paras.map(p => `<p>${p}</p>`).join("")}</div>`, o),
  cta: o => `<section class="s cta"><div class="w"><h2>${o.t}</h2><p>${o.p}</p><div class="row" style="justify-content:center">${btns(o.cta)}</div></div></section>`,
  head: o => `<section class="pg"><div class="w">${o.eb ? `<p class="eyebrow">${o.eb}</p>` : ""}<h1>${words(o.t)}</h1>${o.p ? `<p class="lead">${o.p}</p>` : ""}</div></section>`,
  contact: (o, S) => sec(`<div class="cf"><div>${sh(o.t, o.p, o.eb).replace("<h2>", "<h1 class=\"h2\">").replace("</h2>", "</h1>")}<ul class="info">${o.info.map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`).join("")}<li><b>WhatsApp</b><a href="https://wa.me/${S.wa}" target="_blank" rel="noopener">Chat with us</a></li><li><b>Instagram</b><a href="https://instagram.com/${S.ig}" target="_blank" rel="noopener">@${S.ig}</a></li></ul></div>
<form class="fm" data-wa data-subject="${attr(o.subject)}"><div class="two"><label>Name<input name="Name" required autocomplete="name"></label><label>Phone<input name="Phone" type="tel" inputmode="tel" autocomplete="tel"></label></div>
${(o.fields || []).map(f => f.opts ? `<label>${f.l}<select name="${f.l}">${f.opts.map(x => `<option>${x}</option>`).join("")}</select></label>` : `<label>${f.l}<input name="${f.l}" ${f.type ? `type="${f.type}"` : ""}></label>`).join("")}
<label>Message<textarea name="Message" placeholder="${attr(o.ph || "Tell us what you need")}"></textarea></label><button class="btn wa" type="submit">${o.btn || "Send on WhatsApp"}</button><small>Your details open in WhatsApp, ready to send. This is a sample form.</small></form></div>`, o)
};

function page(S, file, pg, root) {
  const T = S.theme, url = f => f; POOL = S.pool || POOLS[S.slug] || "work"; FIRST = true; IM.reset();
  const title = pg.title.includes(S.name) ? pg.title : pg.title + " | " + S.name;
  const body = pg.blocks.map(b => { const [k, o] = b; return B[k](o, S); }).join("\n");
  const ld = { "@context": "https://schema.org", "@type": S.ld || "LocalBusiness", name: S.name, description: S.short, areaServed: S.city };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${ent(title)}</title>
<meta name="description" content="${attr(pg.desc)}">
<meta name="robots" content="noindex, follow">
<meta name="twitter:card" content="summary_large_image">
<meta property="og:site_name" content="${attr(S.name)}"><meta property="og:locale" content="en_IN">
<meta name="theme-color" content="${T.ac}">
<meta property="og:title" content="${attr(title)}"><meta property="og:description" content="${attr(pg.desc)}"><meta property="og:type" content="website">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='${encodeURIComponent(T.ac)}'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${T.fonts}&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../_shared/base.css">
<style>:root{--bg:${T.bg};--fg:${T.fg};--ac:${T.ac};--ac2:${T.ac2 || T.ac};--mut:${T.mut};--card:${T.card};--line:${T.line};--r:${T.r}px;--fd:${T.fd};--fb:${T.fb};--onac:${T.onac || "#fff"};${T.dk ? `--dk:${T.dk};--dkt:${T.dkt};` : ""}${T.ls ? `--ls:${T.ls};` : ""}${T.hd ? `--hd:${T.hd};` : ""}}${T.css || ""}</style>\n<link rel="stylesheet" href="../_shared/layouts.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body data-sig="${S.sig || ""}" class="lay-${S.slug}">
<a class="skip" href="#main">Skip to content</a><div class="progress"></div>
<header class="hd"><div class="w hbar"><a class="logo" href="index.html"><i></i>${ent(S.logo || S.name)}</a><button class="mt" aria-label="Menu" aria-expanded="false" aria-controls="nv"><span></span></button>
<nav class="nv" id="nv" aria-label="Main">${S.nav.map(([f, l]) => `<a href="${f}"${f === file ? ' aria-current="page"' : ""}>${l}</a>`).join("")}<a class="btn sm" href="${S.navcta[1]}">${S.navcta[0]}</a></nav></div></header>
<main>
${ent(body)}
</main>
<footer class="ft"><div class="w"><div class="fg"><div><a class="logo" href="index.html"><i></i>${ent(S.logo || S.name)}</a><p>${ent(S.short)}</p></div>
<div><h4>Pages</h4><ul>${S.nav.map(([f, l]) => `<li><a href="${f}">${l}</a></li>`).join("")}</ul></div>
<div><h4>Get in touch</h4><ul>${S.foot.map(x => `<li>${x}</li>`).join("")}<li><a href="https://wa.me/${S.wa}" target="_blank" rel="noopener">WhatsApp</a> · <a href="https://instagram.com/${S.ig}" target="_blank" rel="noopener">Instagram</a></li></ul></div></div>
<div class="fb"><span>© 2026 ${ent(S.name)}</span><span>Sample website by <a href="../../index.html">Calling Card</a> · <a href="../../samples.html">See all samples</a></span></div></div></footer>
<script>window.SITE=${JSON.stringify({ slug: S.slug, name: S.name, wa: S.wa, ig: S.ig, shop: !!S.shop, cur: S.cur || "₹" })}</script>
<script src="../_shared/site.js"></script>
</body></html>`;
}

module.exports = function (sites) {
  fs.rmSync(ROOT, { recursive: true, force: true });
  fs.mkdirSync(path.join(ROOT, "_shared"), { recursive: true });
  fs.copyFileSync(path.join(__dirname, "sample-assets", "base.css"), path.join(ROOT, "_shared", "base.css"));
  fs.copyFileSync(path.join(__dirname, "sample-assets", "site.js"), path.join(ROOT, "_shared", "site.js"));
  fs.copyFileSync(path.join(__dirname, "sample-assets", "layouts.css"), path.join(ROOT, "_shared", "layouts.css"));
  (global.EXTRA_SITES || []).forEach(f => f(ROOT));
  let n = 0;
  sites.forEach(S => {
    fs.mkdirSync(path.join(ROOT, S.slug), { recursive: true });
    Object.entries(S.pages).forEach(([f, pg]) => { fs.writeFileSync(path.join(ROOT, S.slug, f), page(S, f, pg)); n++; });
  });
  return n;
};
