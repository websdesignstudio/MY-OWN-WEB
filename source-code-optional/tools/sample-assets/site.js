try{if(self!==top)document.documentElement.classList.add("in-frame")}catch(e){document.documentElement.classList.add("in-frame")}
(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var D=document.documentElement,RM=matchMedia("(prefers-reduced-motion:reduce)").matches,HOVER=matchMedia("(hover:hover)").matches;
D.classList.add("js");

/* images: if a photo fails, show a neutral on-theme placeholder (never an unrelated picture) */
var IC={wedding:"♥",portrait:"☺",food:"🍽",cafe:"☕",salon:"✂",hospital:"✚",school:"✎",fitness:"●",jewel:"◆",fashion:"▲",arch:"⌂",interior:"▭",travel:"✈",work:"▣"};
function ph(i){var a=(i.dataset.alt||"").split("|").filter(Boolean);if(a.length){i.dataset.alt=a.slice(1).join("|");var u=a[0],w=i.getAttribute("width"),h=i.getAttribute("height");i.src=u+(w?"&w="+w+"&h="+h:"");return}if(i.dataset.f)return;i.dataset.f=1;var w=+i.getAttribute("width")||600,h=+i.getAttribute("height")||400,t=IC[i.dataset.pool]||"▣";i.removeAttribute("srcset");i.src="data:image/svg+xml,"+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+h+"' viewBox='0 0 "+w+" "+h+"'><rect width='100%' height='100%' fill='#c9c3b8'/><text x='50%' y='54%' font-size='"+Math.round(Math.min(w,h)/5)+"' text-anchor='middle' fill='#fff' fill-opacity='.75' font-family='sans-serif'>"+t+"</text></svg>")}
document.addEventListener("error",function(e){if(e.target.tagName==="IMG"&&e.target.dataset.pool)ph(e.target)},true);
$$("img[data-pool]").forEach(function(i){if(i.complete&&i.naturalWidth===0)ph(i)});

/* header + progress + menu */
var hd=$(".hd"),pr=$(".progress"),mt=$(".mt"),nv=$(".nv");
function sc(){hd&&hd.classList.toggle("sc",scrollY>8);var m=D.scrollHeight-innerHeight;pr.style.transform="scaleX("+(m>0?scrollY/m:0)+")"}
addEventListener("scroll",sc,{passive:true});sc();
function closeNav(){if(nv){nv.classList.remove("open");mt&&mt.setAttribute("aria-expanded","false")}}
if(mt)mt.addEventListener("click",function(){var o=nv.classList.toggle("open");mt.setAttribute("aria-expanded",o)});
if(nv)nv.addEventListener("click",function(e){if(e.target.closest("a"))closeNav()});
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeNav()});
document.addEventListener("click",function(e){if(nv&&nv.classList.contains("open")&&!e.target.closest(".hbar"))closeNav()});
addEventListener("resize",function(){if(innerWidth>820)closeNav()});

/* reveal, counters */
function count(el){var to=+el.dataset.count,suf=el.dataset.suf||"",t0=performance.now();if(RM){el.textContent=to+suf;return}(function s(t){var p=Math.min(1,(t-t0)/1500);el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString("en-IN")+suf;if(p<1)requestAnimationFrame(s)})(t0)}
$$("[data-grid]").forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.classList.add("rv");c.style.setProperty("--d",i*80+"ms")})});
$$(".sh,.sp .sx,.sp .tx,.qt blockquote,.fq details,.tl li,.it").forEach(function(e){e.classList.add("rv")});
var els=$$(".rv,.st li,.cl,.sh,[data-count]");
if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add("in");if(e.target.dataset.count)count(e.target);io.unobserve(e.target)})},{threshold:.12,rootMargin:"0px 0px -5% 0px"});els.forEach(function(e){io.observe(e)})}else{els.forEach(function(e){e.classList.add("in");if(e.dataset.count)count(e)})}

/* parallax */
var par=$$(".hbg img");if(par.length&&!RM)addEventListener("scroll",function(){var y=Math.min(scrollY,900);par.forEach(function(p){p.style.transform="translateY("+y*.18+"px)"})},{passive:true});

/* signature: cursor glow, 3D tilt */
var sig=document.body.dataset.sig||"";
if(HOVER&&!RM&&sig.indexOf("cursor")>-1){var c=document.createElement("div");c.className="cur";document.body.appendChild(c);addEventListener("pointermove",function(e){c.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)";c.classList.add("on")},{passive:true})}
if(HOVER&&!RM&&sig.indexOf("tilt")>-1)$$(".card,.pd .im,.gal figure").forEach(function(el){el.addEventListener("pointermove",function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform="perspective(700px) rotateY("+x*10+"deg) rotateX("+-y*10+"deg) translateY(-6px)"});el.addEventListener("pointerleave",function(){el.style.transform=""})});

/* toast */
var tt=document.createElement("div");tt.className="toast";tt.setAttribute("role","status");document.body.appendChild(tt);
function toast(h){tt.innerHTML=h;tt.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){tt.classList.remove("show")},4600)}

/* floating WhatsApp + Instagram */
var S=window.SITE||{};
var fab=document.createElement("div");fab.className="fab";
fab.innerHTML='<a class="wa" href="https://wa.me/'+(S.wa||"910000000000")+'" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.6-.1 1.2z"/></svg></a><a class="ig" href="https://instagram.com/'+(S.ig||"callingcard")+'" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM17.2 6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/></svg></a>';
document.body.appendChild(fab);

/* forms: compose a WhatsApp message with the form details */
$$("form[data-wa]").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();var t=[(f.dataset.subject||"New enquiry")+" - "+(S.name||"")];$$("input,select,textarea",f).forEach(function(i){if(i.value&&i.name)t.push(i.name+": "+i.value)});window.open("https://wa.me/"+(S.wa||"910000000000")+"?text="+encodeURIComponent(t.join("\n")),"_blank");toast("Thank you! WhatsApp is opening with your details ready to send.")})});

/* shop: add to cart, drawer, WhatsApp order */
if(S.shop){
  var key="cart_"+S.slug,cart=[],cur=S.cur||"₹";
  try{cart=JSON.parse(localStorage.getItem(key)||"[]")}catch(e){}
  var save=function(){try{localStorage.setItem(key,JSON.stringify(cart))}catch(e){}};
  var cb=document.createElement("button");cb.className="cartbtn";cb.innerHTML='Cart <b>0</b>';cb.setAttribute("aria-label","Open cart");
  var bar=$(".hbar");bar.insertBefore(cb,$(".mt"));
  var dr=document.createElement("div");dr.className="dr";dr.setAttribute("role","dialog");dr.setAttribute("aria-modal","true");dr.setAttribute("aria-label","Your cart");dr.innerHTML='<div class="bk"></div><aside aria-label="Your cart"><button class="x" aria-label="Close cart">×</button><h3>Your cart</h3><div class="ls"></div><div class="tot"><span>Total</span><span class="tv"></span></div><a class="btn wa" target="_blank" rel="noopener" href="#">Order on WhatsApp</a><small class="mut">Your order opens in WhatsApp so you can confirm it with us.</small></aside>';
  document.body.appendChild(dr);
  var esc=function(t){return String(t).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};var fmt=function(n){return cur+n.toLocaleString("en-IN")};
  var msg=function(items){var l=["Hello "+S.name+", I would like to order:"];var t=0;items.forEach(function(i){l.push("- "+i.name+" x "+i.q+" = "+fmt(i.p*i.q));t+=i.p*i.q});l.push("Total: "+fmt(t));l.push("Name and delivery address:");return"https://wa.me/"+(S.wa||"910000000000")+"?text="+encodeURIComponent(l.join("\n"))};
  function draw(){
    var n=cart.reduce(function(a,i){return a+i.q},0),t=cart.reduce(function(a,i){return a+i.q*i.p},0);
    $("b",cb).textContent=n;$(".tv",dr).textContent=fmt(t);
    $(".ls",dr).innerHTML=cart.length?cart.map(function(i,x){return'<div class="li"><img src="'+esc(i.img)+'" alt=""><div><strong>'+i.name+'</strong><div class="q"><button data-x="'+x+'" data-d="-1" aria-label="Less">−</button><span>'+i.q+'</span><button data-x="'+x+'" data-d="1" aria-label="More">+</button></div></div><b>'+fmt(i.p*i.q)+'</b></div>'}).join(""):'<p class="em">Your cart is empty. Add something you like.</p>';
    var w=$(".wa",dr);w.href=cart.length?msg(cart):"#";w.style.opacity=cart.length?1:.45;w.setAttribute("aria-disabled",cart.length?"false":"true");save();
  }
  $(".ls",dr).addEventListener("click",function(e){var b=e.target.closest("button[data-x]");if(!b)return;var i=cart[+b.dataset.x];i.q+=+b.dataset.d;if(i.q<1)cart.splice(+b.dataset.x,1);draw()});
  var open=function(o){dr.classList.toggle("open",o);document.body.classList.toggle("lock",o);var f=$(".fab");f&&f.classList.toggle("hide",o);if(o)$(".x",dr).focus();else cb.focus()};cb.addEventListener("click",function(){open(true)});$(".bk",dr).addEventListener("click",function(){open(false)});$(".x",dr).addEventListener("click",function(){open(false)});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")open(false)});
  document.addEventListener("click",function(e){var b=e.target.closest(".add");if(!b)return;e.preventDefault();
    var d=b.dataset,it=cart.filter(function(i){return i.id===d.id})[0];if(it)it.q++;else cart.push({id:d.id,name:d.name,p:+d.price,q:1,img:d.img||""});
    draw();cb.classList.add("bump");setTimeout(function(){cb.classList.remove("bump")},350);
    toast('<span>✓ <strong>'+esc(d.name)+'</strong> added to cart</span><a target="_blank" rel="noopener" href="'+msg([{name:d.name,p:+d.price,q:1}])+'">Send on WhatsApp</a>')});
  draw();
}
})();
