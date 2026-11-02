// Generates every page of the Calling Card site into /home/claude/site
// Run:  node tools/build.js
const fs = require("fs"), path = require("path");
const OUT = path.join(__dirname, "..", "site");
const SITE = { url: "https://www.example.com", brand: "Calling Card", email: "hello@example.com", wa: "910000000000", ig: "callingcard" }; // <-- change url, wa, ig before you publish
const SAMPLES_DATA = require("./gen-samples.js");   // also (re)generates /site/samples
const POSTS = require("./blog-data.js");
const w = (f, s) => { const p = path.join(OUT, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s); };
const ck = '<svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>';
const ticks = a => '<ul class="ticks">' + a.map(x => "<li>" + ck + x + "</li>").join("") + "</ul>";
const esc = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const logo = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="2" y="6" width="28" height="20" rx="5" fill="#2B35F5"/><circle cx="10" cy="16" r="3" fill="#fff"/><rect x="16" y="13" width="10" height="2.5" rx="1.2" fill="#fff"/><rect x="16" y="18" width="7" height="2.5" rx="1.2" fill="#fff" opacity=".7"/></svg>';
const BRAND_DIR = require("path").join(__dirname, "brand");
const BRAND_LOGO = (require("fs").existsSync(BRAND_DIR) ? require("fs").readdirSync(BRAND_DIR) : []).find(f => /^logo\.(svg|png|webp|jpg|jpeg)$/i.test(f));
const ORDER6 = ["aura-salon", "carepoint-hospital", "dev-malhotra", "form-and-field", "travelo", "brew-and-bound"];
const logoFor = root => BRAND_LOGO ? `<img class="brand-img" src="${root}assets/${BRAND_LOGO}" alt="" width="32" height="32">` : logo;
const arrow = '<svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg>';

const SAMPLES = SAMPLES_DATA.map(s => ({ slug: s.slug, name: s.name, role: s.role, cat: s.cat, desc: s.desc, pages: s.nav.length, nav: s.nav, shop: !!s.shop }));
const ORDER = ["aura-salon", "carepoint-hospital", "dev-malhotra", "form-and-field", "travelo", "brew-and-bound", "greenfield-school", "meera-nair", "ember-and-oak", "spice-route-kitchen", "ishaan-rao", "loom-and-thread", "studio-marigold", "nila-jewels"];
SAMPLES.sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));
const CATS = ["All", "Portfolio", "Ecommerce", "Education", "Healthcare", "Food", "Services"];

const FAQ = [
  ["How long does it take?", "Your website is ready in about 3 days after we receive your photos and text. A mini e-commerce site with payments takes around 5 days because we also set up your products and the payment gateway."],
  ["What do you need from me?", "Your name and business, a clear photo or logo, your links and contact details, and a few samples of your work or products. If you have brand colours, send those too. If not, we will suggest some. Rough notes are fine, we do the writing."],
  ["Do I own my website and domain?", "Yes. The domain is registered in your name, and you can take your site files to another host whenever you like. You are not renting a template."],
  ["Can I change things after it goes live?", "Yes. Changes to text, links and photos are free for 30 days after launch. After that, small edits are quick and we tell you the price before we start."],
  ["Will people find my site on Google?", "We set up the search basics: page titles, descriptions, fast loading, clean structure, structured data and a sitemap. Ranking also depends on your content and your competition, and a blog helps because it gives search engines more to find."],
  ["Will my website work on phones?", "Yes. Most visitors open a site on a phone, so we design for small screens first and then scale up to tablets and laptops. You can test this on our sample sites by resizing the window or opening them on your phone."],
  ["Can customers order from my website?", "Yes. We can add a cart so customers tap Add to cart, see a confirmation, and send the order to your WhatsApp. It suits shops, bakeries, cloud kitchens and boutiques. Try it on our Loom & Thread and Spice Route samples."],
  ["Can you build a website for a school, clinic or restaurant?", "Yes. Our samples include a school, a hospital, a café, a cloud kitchen, a salon, an architecture studio, a jewellery store and more. Each one has separate pages such as home, services, admissions or menu, and contact."],
  ["What happens after the first year?", "Hosting renews yearly at a small fee. You can cancel anytime and take your files with you."],
  ["Do you make logos or take photos?", "No. We build and write the website. If you need a logo or photography we can point you to people we trust, and we will make your site look good with whatever you already have."],
  ["How do I pay?", "After you send your order we reply with next steps and a payment link. You pay once for the design, and the first year of hosting is included."],
  ["Can I add a blog later?", "Yes. You can start with the business site and upgrade to the blog plan any time. We will only charge the difference."]
];

const NAV = [["index.html", "Home"], ["samples.html", "Samples"], ["pricing.html", "Pricing"], ["blog.html", "Blog"], ["index.html#faq", "FAQ"], ["contact.html", "Contact"]];
function head({ title, desc, file, root = "", type = "website", ld = [], image }) {
  const url = SITE.url + "/" + (file === "index.html" ? "" : file);
  const img = SITE.url + "/" + (image || "assets/og-image.png");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#2B35F5">
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${SITE.brand}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${img}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${img}">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}style.css">
${ld.map(o => '<script type="application/ld+json">' + JSON.stringify(o) + "</script>").join("\n")}
</head>`;
}
function header(active, root = "") {
  return `<body>
<a class="skip" href="#main">Skip to content</a>
<div class="progress" id="progress"></div>
<header class="site-header" id="siteHeader">
  <div class="wrap header-row">
    <a class="brand" href="${root}index.html" aria-label="${SITE.brand} home">${logoFor(root)}<span data-brand>${SITE.brand}</span></a>
    <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="nav" aria-label="Menu"><svg class="icon i-menu"><use href="#i-menu"/></svg><svg class="icon i-close"><use href="#i-close"/></svg></button>
    <nav class="nav" id="nav" aria-label="Main"><ul>${NAV.map(([f, n]) => `<li><a href="${root}${f}"${f === active ? ' aria-current="page"' : ""}>${n}</a></li>`).join("")}</ul>
      <a class="btn btn-primary btn-small magnetic" href="${root}contact.html">Order now</a></nav>
  </div>
</header>
<main id="main">`;
}
function footer(root = "") {
  return `</main>
<footer class="site-footer"><div class="wrap">
  <div class="foot-row"><a class="brand" href="${root}index.html">${logoFor(root)}<span data-brand>${SITE.brand}</span></a>
  <nav class="foot-links" aria-label="Footer">${NAV.map(([f, n]) => `<a href="${root}${f}">${n}</a>`).join("")}<a href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener" data-wa>WhatsApp</a><a href="https://instagram.com/${SITE.ig}" target="_blank" rel="noopener" data-ig>Instagram</a></nav>
  <p>&copy; <span id="year">2026</span> <span data-brand>${SITE.brand}</span>. Websites for small businesses.</p></div>
  <div class="wordmark" aria-hidden="true" data-brand>${SITE.brand}</div>
</div></footer>
<a class="dock" id="dock" href="${root}contact.html">${arrow}<span>Order now</span></a>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="${root}main.js"></script>
</body>
</html>`;
}
const crumbs = items => ({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map(([n, f], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: SITE.url + "/" + f })) });
const pageHead = (h, p) => `<section class="page-hero"><div class="wrap"><h1>${h}</h1><p>${p}</p></div></section>`;
const vf = (src, wd, ratio, extra = "", name = "sample") => `<div class="vf" data-w="${wd}" style="aspect-ratio:${ratio}"><iframe src="${src}" title="Live preview of the ${esc(name)} sample website" loading="lazy" scrolling="no" ${extra}></iframe></div>`;
const art = (p, cls = "") => `<div class="art ${cls}" style="--c:${p.color}"><i></i><i></i><b>${p.glyph}</b></div>`;
const fmtDate = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
const faqHtml = items => `<div class="faq" data-stagger>${items.map(([q, a]) => `<details><summary>${q}<svg class="icon" aria-hidden="true"><use href="#i-plus"/></svg></summary><p>${a}</p></details>`).join("")}</div>`;
const sampleHref = s => `samples/${s.slug}/index.html`;
const urls = [];

/* ---------------- HOME ---------------- */
{
  const file = "index.html";
  const orgLd = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", name: SITE.brand, url: SITE.url, email: SITE.email, sameAs: ["https://instagram.com/" + SITE.ig], description: "Website design for small businesses, freelancers and creators in India." },
    { "@type": "WebSite", name: SITE.brand, url: SITE.url },
    { "@type": "Service", name: "Small business website design", provider: { "@type": "Organization", name: SITE.brand }, areaServed: "India", offers: { "@type": "Offer", priceCurrency: "INR", price: "999" } }
  ] };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const heroSlides = ["greenfield-school", "nila-jewels", "carepoint-hospital", "spice-route-kitchen", "studio-marigold"].map(s => SAMPLES.find(x => x.slug === s));
  const html = head({ title: "Calling Card | Websites for small businesses, freelancers and creators", desc: "We design fast, animated websites for small businesses, shops, clinics, schools, restaurants and freelancers. One-time pricing, your own domain, ready in 3 days.", file, ld: [orgLd, faqLd] }) + header(file) + `
  <section class="hero" id="top">
    <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="fl ring" aria-hidden="true"><i></i></div><div class="fl sq" aria-hidden="true"><i></i></div><div class="fl plus" aria-hidden="true"><i></i></div><div class="fl dots" aria-hidden="true"><i></i></div><div class="fl half" aria-hidden="true"><i></i></div>
    <div class="wrap hero-grid">
      <div>
        <h1 id="heroTitle">A website that shows your work and wins you clients.</h1>
        <p class="rotator" aria-live="off">Made for <span class="rot" id="rot">small businesses</span></p>
        <p class="hero-lead">A fast, one-of-a-kind website written and designed around your business, with your own domain, WhatsApp ordering and search basics built in.</p>
        <div class="hero-actions"><a class="btn btn-primary btn-shine magnetic" href="contact.html">Get my website</a><a class="btn btn-ghost magnetic" href="samples.html">See 14 real samples</a></div>
        <p class="hero-note">One-time price. First year of hosting included. Ready in 3 days.</p>
      </div>
      <div class="stage live" id="heroSlides" aria-label="Live sample websites">
        <div class="float"><div class="tilt"><div class="slides">
          ${heroSlides.map((s, i) => `<div class="slide${i === 0 ? " on" : ""}" aria-hidden="${i !== 0}"><div class="vbrowser"><div class="vbar"><i></i><i></i><i></i><span>${s.slug}.example</span></div>${vf(sampleHref(s), 1280, "16/11", 'tabindex="-1"', s.name)}</div></div>`).join("")}
        </div></div></div>
        <div class="slide-cap"><div class="dots" role="tablist" aria-label="Choose a sample">${heroSlides.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="${esc(s.name)}"></button>`).join("")}</div><a id="slideLink" href="${sampleHref(heroSlides[0])}"><span id="slideName">${esc(heroSlides[0].name)}</span> · open site ${arrow}</a></div>
        <div class="chipf a"><span class="dot"><svg class="icon"><use href="#i-bolt"/></svg></span>Loads fast</div>
        <div class="chipf b"><span class="dot"><svg class="icon"><use href="#i-phone"/></svg></span>Phone friendly</div>
        <div class="chipf c"><span class="dot"><svg class="icon"><use href="#i-chat"/></svg></span>Orders on WhatsApp</div>
      </div>
    </div>
  </section>

  <div class="marquee-wrap" aria-hidden="true"><div class="marquee">
    ${[1, 2].map(() => '<div class="marquee-track">' + ["Small businesses", "Shops and cafés", "Schools and clinics", "Your own domain", "Pay once"].map(t => `<span>${t}</span><svg viewBox="0 0 24 24"><path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"/></svg>`).join("") + "</div>").join("")}
  </div></div>

  <section class="facts" aria-label="At a glance"><div class="wrap facts-grid">
    <div class="fact"><b data-count="14">0</b><span>full sample websites you can open and try</span></div>
    <div class="fact"><b data-count="7">0</b><span>days on average from message to live</span></div>
    <div class="fact"><b data-count="9">0</b><span>free guides to help your business grow</span></div>
    <div class="fact"><b data-count="1">0</b><span>year of hosting included</span></div>
  </div></section>

  <section class="section" id="offer"><div class="wrap">
    <div class="section-head"><h2>A site that makes people trust you faster.</h2><p>Everything you need to look professional online, set up for you.</p></div>
    <div class="offer-grid" data-stagger>
      <article class="panel panel-web">
        <div><h3>Business website</h3><p class="lead">A fast, one-of-a-kind site that shows your work, tells your story and makes it obvious how to buy or book.</p></div>
        ${ticks(["Up to six sections, written and laid out around your business", "Looks right on phones, tablets and laptops", "Your own domain name connected", "Contact form, WhatsApp and Instagram buttons", "Speed and search basics included"])}
        <div class="visual">
          <p class="vlabel">Website view <small>A real sample you can scroll</small></p>
          <div class="vbrowser"><div class="vbar"><i></i><i></i><i></i><span>studiomarigold.example</span></div>${vf("samples/studio-marigold/index.html", 1280, "16/10", "", "Studio Marigold")}</div>
          <a class="textlink" href="samples/studio-marigold/index.html">Open this sample full size ${arrow}</a>
        </div>
      </article>
      <article class="panel panel-ink">
        <div><h3>Made to be owned</h3><p class="lead">You are not renting a template. The domain is in your name and the files are yours to keep.</p></div>
        ${ticks(["Domain registered in your name", "Take your files to another host anytime", "Smooth animation, never slow", "Optional blog so you can post updates", "Free edits for 30 days after launch"])}
        <div class="visual phone-wrap">
          <p class="vlabel">Mobile view <small>The same site on a phone</small></p>
          <div class="phone"><div class="phone-notch"></div>${vf("samples/spice-route-kitchen/index.html", 390, "9/18.5", "", "Spice Route Kitchen")}</div>
        </div>
      </article>
    </div>
    <div class="together"><strong>Want to write articles too?</strong><p>Add a blog to your site so customers can find you through search. <a href="pricing.html">See the plans</a> or <a href="blog.html">read our free guides</a>.</p></div>
  </div></section>

  <section class="section band-ink on-dark" id="devices"><div class="wrap dev-grid">
    <div>
      <div class="section-head" style="margin-bottom:0"><h2>One website, every screen.</h2><p>This is a real, working website shown at real laptop, tablet and phone widths. Switch the size and scroll inside it. Nothing is a mock-up.</p></div>
      <div class="seg" id="devBtns" role="group" aria-label="Preview size">
        <button type="button" data-v="laptop" aria-pressed="true">Laptop</button><button type="button" data-v="tablet" aria-pressed="false">Tablet</button><button type="button" data-v="phone" aria-pressed="false">Phone</button>
      </div>
      <p class="dev-label" id="devLabel" aria-live="polite">Laptop: the full layout, 1280 px wide.</p>
    </div>
    <div class="dev-stage"><div class="dev" id="dev" data-view="laptop"><div class="vf" id="devVf" data-w="1280"><iframe src="samples/carepoint-hospital/index.html" title="Responsive preview of a hospital sample website" loading="lazy" scrolling="no"></iframe></div></div></div>
  </div></section>

  <section class="section" id="samples-teaser"><div class="wrap">
    <div class="section-head"><h2>Real websites for real kinds of business.</h2><p>Twelve complete samples: portfolio, online shop, school, hospital, food business, salon and more. Each one has separate pages and its own animated design.</p></div>
    <div class="samples" data-stagger>${ORDER6.map(sl => SAMPLES.find(x => x.slug === sl)).map(s => `<article class="sample"><a class="vf-card" href="${sampleHref(s)}" aria-label="Open the ${esc(s.name)} sample">${vf(sampleHref(s), 1280, "4/3", 'tabindex="-1"', s.name)}</a><div><h3>${esc(s.name)}</h3><p>${s.role} · ${s.pages} pages</p></div></article>`).join("")}</div>
    <p style="margin-top:34px"><a class="btn btn-primary" href="samples.html">Browse all 14 samples</a></p>
  </div></section>

  <section class="section band-white" id="pricing-teaser"><div class="wrap teaser-row">
    <div><h2 class="h2">Simple, one-time prices.</h2><p class="muted">Pay once for the design. The first year of hosting is included. Plans start at <strong data-price="starter">₹999</strong>.</p></div>
    <a class="btn btn-ghost" href="pricing.html">See pricing</a>
  </div></section>

  <section class="section band-ink on-dark" id="process"><div class="wrap">
    <div class="section-head"><h2>From message to live in four steps.</h2><p>You never need to know how any of it works.</p></div>
    <ol class="steps">
      <li style="--i:0"><div class="step-n">1</div><h3>Send your details</h3><p>Your bio, photos, products and links. Rough notes are fine.</p></li>
      <li style="--i:1"><div class="step-n">2</div><h3>See a preview</h3><p>You get a private link to a working design within a few days.</p></li>
      <li style="--i:2"><div class="step-n">3</div><h3>Ask for changes</h3><p>Tell us what to adjust. We update it until it feels right.</p></li>
      <li style="--i:3"><div class="step-n">4</div><h3>Go live</h3><p>We connect your domain and launch. You start sharing your link.</p></li>
    </ol>
  </div></section>

  <section class="section" id="blog-teaser"><div class="wrap">
    <div class="section-head"><h2>Free guides to grow your business.</h2><p>Plain-English advice on websites, search, local customers and online orders.</p></div>
    <div class="posts" data-stagger>${POSTS.slice(0, 3).map(p => `<a class="post-card" href="blog/${p.slug}.html">${art(p)}<span class="tag">${p.cat}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p></a>`).join("")}</div>
    <p style="margin-top:34px"><a class="btn btn-ghost" href="blog.html">Read all 9 guides</a></p>
  </div></section>

  <section class="section band-white" id="faq"><div class="wrap faq-grid">
    <div class="section-head"><h2>Questions people ask first.</h2><p>Something missing? Message us on WhatsApp or Instagram and we’ll answer within a day.</p>
      <div class="row-links"><a class="btn btn-small wa-btn" href="https://wa.me/${SITE.wa}" target="_blank" rel="noopener" data-wa>WhatsApp us</a><a class="btn btn-small btn-ghost" href="https://instagram.com/${SITE.ig}" target="_blank" rel="noopener" data-ig>Instagram</a></div></div>
    ${faqHtml(FAQ)}
  </div></section>

  <section class="section band-blue on-dark cta-band"><div class="drift d1" aria-hidden="true"></div><div class="drift d2" aria-hidden="true"></div>
    <div class="wrap"><div class="section-head"><h2>Tell us about your business and we’ll start.</h2><p>Choose a plan, add a few lines about your work, and send. We reply with next steps and a payment link.</p></div>
    <a class="btn btn-light btn-shine" href="contact.html">Start my website</a></div></section>
` + footer();
  w(file, html); urls.push(["", "1.0"]);
}

/* ---------------- SAMPLES ---------------- */
{
  const file = "samples.html";
  const lds = [crumbs([["Home", "index.html"], ["Samples", file]]), { "@context": "https://schema.org", "@type": "CollectionPage", name: "Sample websites for small businesses", url: SITE.url + "/" + file }];
  w(file, head({ title: "14 sample websites: portfolio, online shop, school, hospital, food and more | Calling Card", desc: "Open 14 complete multi-page sample websites: animated portfolio, ecommerce with WhatsApp cart, school, hospital, restaurant, café, salon, architect and more.", file, ld: lds }) + header(file) + `
  ${pageHead("14 real websites. Open any of them.", "Every sample has its own design, animation and separate pages such as home, services and contact. Try the cart on the shops and food menus: add an item and the order goes to WhatsApp.")}
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="filters" id="filters" role="group" aria-label="Filter samples">${CATS.map((c, i) => `<button class="chip" type="button" aria-pressed="${i === 0}">${c}</button>`).join("")}</div>
    <div class="samples big" id="sampleGrid">${SAMPLES.map(s => `<article class="sample" data-cat="${s.cat}">
      <div class="vbrowser"><div class="vbar"><i></i><i></i><i></i><span>${s.slug}.example</span></div><a class="vf-card" href="${sampleHref(s)}" aria-label="Open the ${esc(s.name)} sample full size">${vf(sampleHref(s), 1280, "16/10", 'tabindex="-1"', s.name)}</a></div>
      <div class="s-info"><div><h2 class="h3">${esc(s.name)}</h2><p>${s.role}</p><p class="s-desc">${s.desc}</p>
        <p class="s-tags"><span>${s.cat}</span><span>${s.pages} pages</span>${s.shop ? "<span>Cart + WhatsApp order</span>" : ""}</p>
        <p class="s-pages">${s.nav.map(([f, l]) => `<a href="samples/${s.slug}/${f}">${l}</a>`).join("")}</p></div><a class="btn btn-ghost btn-small" href="${sampleHref(s)}">Open site</a></div>
    </article>`).join("")}</div>
    <p class="fine">These are illustrative concepts, not client work. Photos are stock images used as placeholders.</p>
  </div></section>
  <section class="section band-ink on-dark"><div class="wrap teaser-row"><div><h2 class="h2">Want one like these?</h2><p class="muted-d">Tell us about your business and we will design yours.</p></div><a class="btn btn-light btn-shine" href="contact.html">Get my website</a></div></section>
` + footer()); urls.push([file, "0.9"]);
}

/* ---------------- PRICING ---------------- */
{
  const file = "pricing.html";
  const SAME = ["Up to 3 pages", "Your own domain connected", "Mobile friendly design", "Contact form, WhatsApp and Instagram buttons", "Free edits for 30 days"];
  const plans = [
    ["starter", "Starter Website", "A clean, fast website for people who need to be found online now.", SAME, "Order Starter", false],
    ["site", "Business Website", "The same complete package for your business, ready in 3 days.", SAME, "Order Business", true],
    ["shop", "Mini E-commerce Website", "Sell online. Customers add products to the cart and pay online.", ["Product list set up for you", "Add to cart and checkout", "Online payment gateway connected", "Online payment only, so every order is confirmed", "Up to 3 pages and your own domain", "Free edits for 30 days"], "Order Online Store", false]
  ];
  const rows = [["Pages", "Up to 3", "Up to 3", "Up to 3 + product list"], ["Own domain connected", "✓", "✓", "✓"], ["Mobile friendly design", "✓", "✓", "✓"], ["Contact form, WhatsApp and Instagram buttons", "✓", "✓", "✓"], ["SEO basics (titles, descriptions, sitemap)", "✓", "✓", "✓"], ["Product list and add to cart", "–", "–", "✓"], ["Online payment (customers pay online to confirm the order)", "–", "–", "✓"], ["Free edits", "30 days", "30 days", "30 days"], ["Typical delivery", "About 3 days", "About 3 days", "About 5 days"], ["First year of hosting", "Included", "Included", "Included"]];
  const ld = [crumbs([["Home", "index.html"], ["Pricing", file]]), { "@context": "https://schema.org", "@type": "ItemList", name: "Calling Card plans", itemListElement: [["Starter Website", "999"], ["Business Website", "1499"], ["Mini E-commerce Website", "1999"]].map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Service", name: n, provider: { "@type": "Organization", name: SITE.brand }, offers: { "@type": "Offer", price: p, priceCurrency: "INR" } } })) }];
  w(file, head({ title: "Pricing: one-time website plans from ₹999 | Calling Card", desc: "Simple one-time pricing for small business websites. Starter website ₹999, business website ₹1,499, mini e-commerce website ₹1,999. First year of hosting included.", file, ld }) + header(file) + `
  ${pageHead("Simple, one-time prices.", "Pay once for the design. The first year of hosting is included.")}
  <section class="section" style="padding-top:0"><div class="wrap">
    <div class="price-tools"><div class="currency" role="radiogroup" aria-label="Currency"><label><input type="radio" name="currency" value="INR"><span>INR ₹</span></label><label><input type="radio" name="currency" value="USD"><span>USD $</span></label></div></div>
    <div class="plans" data-stagger>${plans.map(([k, n, d, t, b, best]) => `<article class="plan${best ? " plan--best" : ""}">${best ? '<span class="flag">Most chosen</span>' : ""}<div><h2 class="h3">${n}</h2><p class="what">${d}</p></div><div class="price" data-price="${k}">₹0<small>one-time</small></div>${ticks(t)}<a class="btn ${best ? "btn-light btn-shine" : "btn-ghost"}" href="contact.html?plan=${k}">${b}</a></article>`).join("")}</div>
    <p class="plan-note" id="planNote">Hosting renews yearly after the first year. You can cancel anytime and take your files with you.</p>
  </div></section>
  <section class="section band-white"><div class="wrap"><div class="section-head"><h2>Compare the plans</h2><p>Every plan is designed from scratch and built to load fast.</p></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">What you get</th><th scope="col">Starter</th><th scope="col">Business</th><th scope="col">E-commerce</th></tr></thead><tbody>${rows.map(r => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join("")}</tbody></table></div>
  </div></section>
  <section class="section"><div class="wrap faq-grid"><div class="section-head"><h2>Pricing questions.</h2><p>More answers in the <a href="index.html#faq">FAQ on the home page</a>.</p></div>
    ${faqHtml([FAQ[10], FAQ[8], FAQ[3], FAQ[11]])}</div></section>
  <section class="section band-blue on-dark cta-band"><div class="drift d1" aria-hidden="true"></div><div class="wrap"><div class="section-head"><h2>Not sure which plan?</h2><p>Tell us about your business and we will recommend one. No pressure.</p></div><a class="btn btn-light btn-shine" href="contact.html">Talk to us</a></div></section>
` + footer()); urls.push([file, "0.9"]);
}

/* ---------------- BLOG INDEX ---------------- */
{
  const file = "blog.html", f = POSTS[0];
  const cats = ["All", ...new Set(POSTS.map(p => p.cat))];
  const ld = [crumbs([["Home", "index.html"], ["Blog", file]]), { "@context": "https://schema.org", "@type": "Blog", name: SITE.brand + " blog", url: SITE.url + "/" + file, blogPost: POSTS.map(p => ({ "@type": "BlogPosting", headline: p.title, url: SITE.url + "/blog/" + p.slug + ".html", datePublished: p.date })) }];
  w(file, head({ title: "Blog: website, SEO and growth guides for small businesses | Calling Card", desc: "Nine free guides for small business owners: website cost, local SEO, Google Maps, WhatsApp ordering, homepage tips, domain names and more.", file, ld }) + header(file) + `
  ${pageHead("Guides to help your small business grow.", "Plain-English advice on websites, search, local customers and online orders.")}
  <section class="section" style="padding-top:0"><div class="wrap">
    <a class="featured" href="blog/${f.slug}.html">${art(f)}<div class="txt"><span class="tag">Featured · ${f.cat}</span><h2>${esc(f.title)}</h2><p>${esc(f.desc)}</p><span class="meta">${fmtDate(f.date)} · ${f.mins} min read</span></div></a>
    <div class="blog-tools"><div class="filters" id="filters" role="group" aria-label="Filter posts">${cats.map((c, i) => `<button class="chip" type="button" aria-pressed="${i === 0}">${c}</button>`).join("")}</div>
      <label class="search"><span class="sr">Search articles</span><svg class="icon" aria-hidden="true"><use href="#i-search"/></svg><input id="postSearch" type="search" placeholder="Search articles"></label></div>
    <div class="posts" id="postGrid">${POSTS.map(p => `<a class="post-card" href="blog/${p.slug}.html" data-cat="${p.cat}" data-text="${esc((p.title + " " + p.desc).toLowerCase())}">${art(p)}<div><span class="tag">${p.cat}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><span class="meta">${fmtDate(p.date)} · ${p.mins} min read</span></a>`).join("")}</div>
    <p class="empty" id="noPosts" hidden>No articles match that search.</p>
  </div></section>
  <section class="section band-ink on-dark"><div class="wrap teaser-row"><div><h2 class="h2">Ready for a site of your own?</h2><p class="muted-d">We design it, write it and launch it in 3 days.</p></div><a class="btn btn-light btn-shine" href="contact.html">Get my website</a></div></section>
` + footer()); urls.push([file, "0.8"]);
}

/* ---------------- BLOG POSTS ---------------- */
const WHY = [["Built for small businesses", "Simple one-time pricing, no agency jargon and no monthly rent on your own website."], ["You own everything", "Your domain is registered in your name and your files are yours to take anywhere."], ["Found on Google", "Titles, descriptions, structured data, a sitemap and fast loading are included in every plan."], ["Customers reach you easily", "WhatsApp and Instagram buttons, contact forms and optional add-to-cart ordering."], ["Real help after launch", "Free edits for 30 days and a team that replies within a day."]];
POSTS.forEach(p => {
  const file = "blog/" + p.slug + ".html", root = "../";
  const related = POSTS.filter(x => x !== p).slice((POSTS.indexOf(p) % 3), (POSTS.indexOf(p) % 3) + 3);
  const ld = [crumbs([["Home", "index.html"], ["Blog", "blog.html"], [p.title, file]]), { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.desc, datePublished: p.date, dateModified: p.date, mainEntityOfPage: SITE.url + "/" + file, author: { "@type": "Organization", name: SITE.brand }, publisher: { "@type": "Organization", name: SITE.brand } }];
  w(file, head({ title: p.title + " | Calling Card", desc: p.desc, file, root, type: "article", ld }) + header("blog.html", root) + `
  <article><div class="wrap"><div class="article-head">
    <a class="back" href="../blog.html">${arrow} All articles</a>
    <span class="tag">${p.cat}</span><h1>${esc(p.title)}</h1>
    <p class="meta"><time datetime="${p.date}">${fmtDate(p.date)}</time> · ${p.mins} min read · By the ${SITE.brand} team</p></div>
    ${art(p, "article-art")}
    <div class="prose">${p.body}</div>
    <aside class="why" aria-labelledby="why-h"><h2 id="why-h">Why small businesses choose ${SITE.brand}</h2><p>We help small business owners get found, look trustworthy and get more enquiries and orders, without the cost or confusion of a big agency.</p>
      <ul>${WHY.map(([t, d]) => `<li><strong>${t}.</strong> ${d}</li>`).join("")}</ul>
      <div class="why-cta"><a class="btn btn-light btn-shine" href="../contact.html">Get my website</a><a class="btn btn-wa" href="https://wa.me/${SITE.wa}?text=${encodeURIComponent("Hi, I read your guide: " + p.title)}" target="_blank" rel="noopener" data-wa-text>Chat on WhatsApp</a><a class="btn btn-ghost-l" href="https://instagram.com/${SITE.ig}" target="_blank" rel="noopener" data-ig>Follow on Instagram</a></div></aside>
  </div></article>
  <section class="related"><div class="wrap"><div class="section-head"><h2>Keep reading</h2></div><div class="posts">${related.map(r => `<a class="post-card" href="${r.slug}.html">${art(r)}<span class="tag">${r.cat}</span><h3>${esc(r.title)}</h3><p>${esc(r.desc)}</p></a>`).join("")}</div></div></section>
` + footer(root)); urls.push([file, "0.7"]);
});

/* ---------------- CONTACT ---------------- */
{
  const file = "contact.html";
  const ld = [crumbs([["Home", "index.html"], ["Contact", file]]), { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact " + SITE.brand, url: SITE.url + "/" + file }];
  w(file, head({ title: "Order your website or contact us | Calling Card", desc: "Choose a plan, tell us about your business and we reply within a day with next steps and a payment link. Email, WhatsApp or Instagram us.", file, ld }) + header(file) + `
  <section class="section band-blue on-dark" style="padding-top:clamp(48px,7vw,88px)"><div class="drift d1" aria-hidden="true"></div><div class="drift d2" aria-hidden="true"></div><div class="drift d3" aria-hidden="true"></div>
    <div class="wrap order-grid"><div>
      <div class="section-head"><h1 class="h2">Tell us about your business and we’ll start.</h1><p>Choose a plan, add a few lines about your work, and send. We reply within a day with next steps and a payment link.</p></div>
      <div class="contact-lines"><a href="#" id="waLink" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-chat"/></svg>WhatsApp: message us now</a><a href="#" id="igLink" target="_blank" rel="noopener"><svg class="icon" aria-hidden="true"><use href="#i-insta"/></svg><span data-ig-text>Instagram</span></a><a href="#" id="mailLink"><svg class="icon" aria-hidden="true"><use href="#i-mail"/></svg><span data-email>${SITE.email}</span></a></div>
    </div>
    <form class="order-form rv" id="orderForm" novalidate>
      <div class="two"><div class="field"><label for="oName">Your name</label><input id="oName" name="name" required autocomplete="name"></div><div class="field"><label for="oEmail">Email</label><input id="oEmail" name="email" type="email" required autocomplete="email"></div></div>
      <div class="field"><label for="oPlan">What do you need?</label><select id="oPlan" name="plan"><option value="site">Business Website (₹1,499)</option><option value="starter">Starter Website (₹999)</option><option value="shop">Mini E-commerce Website (₹1,999)</option></select></div>
      <div class="field"><label for="oMsg">About you and your business</label><textarea id="oMsg" name="message" placeholder="What you do, who you work with, and any sites you like."></textarea></div>
      <div class="form-foot"><button class="btn btn-primary btn-shine" type="submit">Send my order</button><p>This opens your email app with the details filled in.</p></div>
    </form></div></section>
` + footer()); urls.push([file, "0.8"]);
}

/* ---------------- assets, sitemap, robots ---------------- */
w("assets/favicon.svg", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="2" y="6" width="28" height="20" rx="5" fill="#2B35F5"/><circle cx="10" cy="16" r="3" fill="white"/><rect x="16" y="13" width="10" height="2.5" rx="1.2" fill="white"/><rect x="16" y="18" width="7" height="2.5" rx="1.2" fill="white" opacity=".7"/></svg>');
w("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(([f, pr]) => `  <url><loc>${SITE.url}/${f}</loc><lastmod>2026-10-25</lastmod><priority>${pr}</priority></url>`).join("\n") + "\n</urlset>\n");
w("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
try { fs.unlinkSync(path.join(OUT, "faq.html")); } catch (e) {}
console.log("built", urls.length, "pages +", SAMPLES.length, "sample sites");
