global.EXTRA_SITES = [require("./extra-furniture"), require("./extra-travelo")];
const sites=[...require("./samples-data-1"),...require("./samples-data-2")];
// content tweaks requested for specific sites
const by = k => sites.find(x => x.slug === k);
const eachBlock = (slug, fn) => Object.values(by(slug).pages).forEach(pg => { pg.blocks = pg.blocks.filter(b => fn(b) !== false); });
["studio-marigold", "brew-and-bound"].forEach(k => eachBlock(k, b => b[0] !== "marquee"));   // remove the running word strip
["ishaan-rao", "greenfield-school", "spice-route-kitchen", "nila-jewels", "brew-and-bound", "studio-marigold"].forEach(k => eachBlock(k, b => { if (b[0] === "cards") b[1].images = true; }));
eachBlock("ishaan-rao", b => { if (b[0] === "hero") b[1].strip = ["figma,design", "mobile,app", "dashboard,ui", "wireframe,sketch"]; });
const n=require("./samples-engine")(sites);
console.log("sample sites:",sites.length+global.EXTRA_SITES.length,"engine pages:",n);
const extras=[
{slug:"ember-and-oak",name:"Ember & Oak",role:"Furniture store",cat:"Ecommerce",desc:"Your uploaded furniture design: hero, features, inspiration, range and how-it-works, plus shop, inspiration and contact pages.",nav:[["index.html","Home"],["shop.html","Shop"],["inspiration.html","Inspiration"],["contact.html","Contact"]],shop:true},
{slug:"travelo",name:"Travelo",role:"Travel booking",cat:"Services",desc:"Your uploaded travel design: carousel, filters, trip cart and testimonials, split into home, destinations, about and contact pages.",nav:[["index.html","Home"],["destinations.html","Destinations"],["about.html","About"],["contact.html","Contact"]],shop:true}];
module.exports=[...sites,...extras];
