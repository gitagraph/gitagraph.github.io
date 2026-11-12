// ===================== icons =====================
const IC = {
  read:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5c2.8-1 5.8-1 9 1v13c-3.2-2-6.2-2-9-1z"/><path d="M21 5.5c-2.8-1-5.8-1-9 1v13c3.2-2 6.2-2 9-1z"/></svg>',
  themes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7.5 12 3.5l8 4-8 4z"/><path d="M4 12l8 4 8-4"/><path d="M4 16.5l8 4 8-4"/></svg>',
  index:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8.5" cy="8" r="3.2"/><path d="M2.8 19.5c.8-3.3 3-5 5.7-5s4.9 1.7 5.7 5"/><path d="M15.5 6.5h6M15.5 10.5h6M17.5 14.5h4"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>',
  saved:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>',
  set:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></svg>',
  fwd:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"/></svg>'
};

// ===================== interface text =====================
const UI = {
  en:{ app:"Upanishads", stories:"Stories", themes:"Themes", index:"People & ideas", indexShort:"Index", search:"Search", saved:"Saved", settings:"Display",
    sotd:"Story of the day", startHere:"Start here", startHereT:"New to the Upanishads? Five short stories, in an order that builds one idea at a time.", deeper:"Go deeper", deeperT:"Denser teachings and debates, for when the stories above feel familiar.", insight:"The insight", readStory:"Read the story", share:"Share", linkCopied:"Link copied", copyFail:"Copying is blocked here. Select the text instead.",
    browseTheme:"Browse by theme", allStories:"All stories", browseMore:"Other ways in", byUp:"By Upanishad", byUpT:"The nine texts these stories come from",
    byPerson:"By person", byPersonT:"Nachiketa, Maitreyi, Gargi, Yajnavalkya…", byIdea:"By idea", byIdeaT:"The self, truth, breath, Om…",
    min:n=>`${n} min read`, nStories:n=>n===1?"1 story":`${n} stories`, story:"Story", teaching:"Teaching",
    forWho:"Who this is for", legendOff:"To see which passages follow the Sanskrit closely, turn on \"Mark passages close to the text\" in Display.", legend:"Passages marked on the left follow the Sanskrit closely; the rest is connective narration.",
    sources:"The source verses", sourcesT:"The Sanskrit this story rests on, with fresh English and Hindi translations.",
    learning:"The learning", moreT:"More: where this comes from, the Sanskrit, other readings", carry:"Carry this with you", readings:"Readings differ",
    whereFrom:"Where this comes from", upanishad:"Upanishad", veda:"Veda", section:"Section", period:"Period", people:"People", ideas:"Ideas",
    edition:"Sanskrit text", checked:"Checked against", themesH:"Themes", related:"Related stories", sameIdea:"The same idea elsewhere",
    gita:"Bhagavad Gita", ashtavakra:"Ashtavakra Gita", prev:"Previous story", next:"Next story", save:"Save", savedL:"Saved",
    searchPh:"Search Nachiketa, truth, salt, Om…", none:"No matches. Try a name, an idea, an image from a story, or a Sanskrit word.",
    savedEmpty:"Stories you save appear here. Tap Save on any story to keep it.", recent:"Recently read", noRecent:"Stories you open will be listed here.",
    back:"Back", done:"Done", sanskrit:"Sanskrit", iast:"Transliteration", second:"Second translation", marks:"Mark passages close to the text",
    size:"Text size", theme:"Theme", language:"Language", system:"System", light:"Light", dark:"Dark", proto:"Beta",
    texts:"The Upanishads", textsT:"The stories here come from nine of the principal Upanishads. Each is listed with the Veda it belongs to.",
    type:{person:"Person",idea:"Idea"}, theme1:"Theme", storiesIn:"Stories", allIn:n=>`All ${n} stories`,
    aboutPage:"About this project", about:"About this text",
    aboutT:"The Sanskrit comes from Sanskrit Wikisource (CC BY-SA 4.0), checked passage by passage against the GRETIL e-texts (Göttingen), which were used only for checking. The transliteration is generated from that Devanagari. The stories, translations and notes were written fresh for this project from the Sanskrit with AI assistance and reviewed for faithfulness; they are not taken from any published translation or retelling.",
    tagT:"Upanishads for all", tagLede:"For curious minds — read, explore, reflect. Short stories from India's oldest philosophy, retold from the Sanskrit.",
    tagHook:"A boy argues with Death. A woman turns down a fortune to ask what does not die. A proud son is asked one question he cannot answer. Each story says where it comes from, what it teaches and who it might help.",
    note:"The retellings are new and written to be easy to read. Suggestions and corrections are welcome.", aboutLink:"About this project →",
    suggest:'Spotted a mistake or have a better translation? <a href="https://github.com/gitagraph/gitagraph.github.io/issues" target="_blank" rel="noopener">Tell us on GitHub</a>.',
    howT:"How to use", whyT:"Why stories?",
    why:["<b>The Upanishads teach through people.</b> A student who is sent away, a king who is corrected, a wife who asks the hardest question. These scenes are the best way in.",
      "<b>Every story says where it comes from.</b> The Upanishad, its Veda, the exact section, and the Sanskrit it rests on, with fresh translations.",
      "<b>Every story says who it is for.</b> Facing a loss, doubting yourself, too proud to listen: pick the story that fits the day."],
    how:[["Read",["Open any story from the home page or a theme. The story comes first, then its source verses, then what it teaches.",
        "Passages with a line on the left follow the Sanskrit closely; tap the reference to see the verse. Unmarked passages are connective narration.",
        "Tap <b>हि / EN</b> at the top to switch language. <b>Display</b> sets text size, theme and what is shown."]],
      ["Find",["<b>Themes</b> groups the stories by what they are about: facing death, truth, the teacher and the seeker…",
        "<b>Index</b> lists every person and idea. <b>Search</b> finds a name, an image or a word in any story.",
        "Tap <b>Save</b> to keep a story; it appears under <b>Saved</b>."]]]},
  hi:{ app:"उपनिषद्", stories:"कथाएँ", themes:"विषय", index:"पात्र और विचार", indexShort:"सूची", search:"खोजें", saved:"सहेजे", settings:"प्रदर्शन",
    sotd:"आज की कथा", startHere:"यहाँ से शुरू करें", startHereT:"उपनिषदों में नए हैं? पाँच छोटी कथाएँ, ऐसे क्रम में जो एक-एक कदम एक विचार बनाती हैं।", deeper:"और गहराई में", deeperT:"गहरे उपदेश और शास्त्रार्थ, जब ऊपर की कथाएँ परिचित लगने लगें।", insight:"मूल बात", readStory:"कथा पढ़ें", share:"साझा करें", linkCopied:"लिंक कॉपी हो गया", copyFail:"यहाँ कॉपी नहीं हो सकता। पाठ चुनकर कॉपी करें।",
    browseTheme:"विषय के अनुसार देखें", allStories:"सभी कथाएँ", browseMore:"और तरीके", byUp:"उपनिषद् के अनुसार", byUpT:"वे नौ ग्रंथ जिनसे ये कथाएँ आती हैं",
    byPerson:"पात्र के अनुसार", byPersonT:"नचिकेता, मैत्रेयी, गार्गी, याज्ञवल्क्य…", byIdea:"विचार के अनुसार", byIdeaT:"आत्मा, सत्य, प्राण, ॐ…",
    min:n=>`${n} मिनट`, nStories:n=>`${n} कथाएँ`, story:"कथा", teaching:"उपदेश",
    forWho:"यह किसके लिए है", legendOff:"कौन-से अंश संस्कृत के करीब हैं, यह देखने के लिए प्रदर्शन में \"मूल के करीब वाले अंश चिह्नित करें\" चालू करें।", legend:"बाईं ओर रेखा वाले अंश संस्कृत के करीब हैं; बाकी जोड़ने वाला वर्णन है।",
    sources:"मूल मंत्र", sourcesT:"वह संस्कृत जिस पर यह कथा टिकी है, नए हिंदी और अंग्रेज़ी अनुवाद के साथ।",
    learning:"सीख", moreT:"और: यह कहाँ से है, संस्कृत, अन्य व्याख्याएँ", carry:"इसे साथ रखें", readings:"अलग-अलग व्याख्याएँ",
    whereFrom:"यह कहाँ से है", upanishad:"उपनिषद्", veda:"वेद", section:"खंड", period:"समय", people:"पात्र", ideas:"विचार",
    edition:"संस्कृत पाठ", checked:"मिलान", themesH:"विषय", related:"संबंधित कथाएँ", sameIdea:"यही विचार अन्यत्र",
    gita:"भगवद्गीता", ashtavakra:"अष्टावक्र गीता", prev:"पिछली कथा", next:"अगली कथा", save:"सहेजें", savedL:"सहेजा गया",
    searchPh:"खोजें: नचिकेता, सत्य, नमक, ॐ…", none:"कुछ नहीं मिला। कोई नाम, विचार, कथा का कोई दृश्य या संस्कृत शब्द आज़माएँ।",
    savedEmpty:"आप जो कथाएँ सहेजेंगे, वे यहाँ दिखेंगी। किसी भी कथा पर 'सहेजें' दबाएँ।", recent:"हाल में पढ़ी", noRecent:"आप जो कथाएँ खोलेंगे, वे यहाँ दिखेंगी।",
    back:"वापस", done:"ठीक है", sanskrit:"संस्कृत", iast:"लिप्यंतरण", second:"दूसरा अनुवाद", marks:"मूल के करीब वाले अंश चिह्नित करें",
    size:"अक्षर का आकार", theme:"थीम", language:"भाषा", system:"सिस्टम", light:"हल्की", dark:"गहरी", proto:"बीटा",
    texts:"उपनिषद्", textsT:"ये कथाएँ नौ प्रमुख उपनिषदों से हैं। हर उपनिषद् उस वेद के साथ दिया गया है जिससे वह जुड़ा है।",
    type:{person:"पात्र",idea:"विचार"}, theme1:"विषय", storiesIn:"कथाएँ", allIn:n=>`सभी ${n} कथाएँ`,
    aboutPage:"इस परियोजना के बारे में", about:"इस पाठ के बारे में",
    aboutT:"संस्कृत पाठ संस्कृत विकिस्रोत (CC BY-SA 4.0) से है, गॉटिंगेन के GRETIL पाठों से अंश-दर-अंश मिलाया गया (GRETIL का उपयोग केवल मिलान के लिए हुआ)। लिप्यंतरण इसी देवनागरी से बनाया गया है। कथाएँ, अनुवाद और टिप्पणियाँ इस परियोजना के लिए AI की सहायता से संस्कृत से नई लिखी गईं और सटीकता के लिए जाँची गईं; ये किसी प्रकाशित अनुवाद या पुनर्कथन से नहीं ली गईं।",
    tagT:"सबके लिए उपनिषद्", tagLede:"जिज्ञासु मन के लिए — पढ़ें, खोजें, मनन करें। भारत के सबसे पुराने दर्शन की छोटी कथाएँ, संस्कृत से नए सिरे से कही गईं।",
    tagHook:"एक बालक मृत्यु से बहस करता है। एक स्त्री धन ठुकराकर पूछती है कि क्या नहीं मरता। एक घमंडी बेटे से एक ऐसा प्रश्न पूछा जाता है जिसका उत्तर उसके पास नहीं। हर कथा बताती है कि वह कहाँ से है, क्या सिखाती है और किसके काम आ सकती है।",
    note:"पुनर्कथन नए हैं और सरल भाषा में लिखे गए हैं। सुझाव और सुधार का स्वागत है।", aboutLink:"इस परियोजना के बारे में →",
    suggest:'कोई त्रुटि दिखी या बेहतर अनुवाद सुझाना है? <a href="https://github.com/gitagraph/gitagraph.github.io/issues" target="_blank" rel="noopener">GitHub पर बताएँ</a>।',
    howT:"कैसे उपयोग करें", whyT:"कथाएँ ही क्यों?",
    why:["<b>उपनिषद् लोगों के माध्यम से सिखाते हैं।</b> एक शिष्य जिसे लौटा दिया जाता है, एक राजा जिसे टोका जाता है, एक पत्नी जो सबसे कठिन प्रश्न पूछती है। ये दृश्य सबसे अच्छा प्रवेश-द्वार हैं।",
      "<b>हर कथा बताती है कि वह कहाँ से है।</b> उपनिषद्, उसका वेद, ठीक-ठीक खंड, और वह संस्कृत जिस पर कथा टिकी है, नए अनुवाद के साथ।",
      "<b>हर कथा बताती है कि वह किसके लिए है।</b> कोई हानि, खुद पर संदेह, सुनने में घमंड: उस दिन के लिए उपयुक्त कथा चुनें।"],
    how:[["पढ़ें",["होम पेज या किसी विषय से कोई भी कथा खोलें। पहले कथा, फिर उसके मूल मंत्र, फिर उसकी सीख।",
        "बाईं ओर रेखा वाले अंश संस्कृत के करीब हैं; मंत्र देखने के लिए संदर्भ पर टैप करें। बिना रेखा वाले अंश जोड़ने वाला वर्णन हैं।",
        "ऊपर <b>हि / EN</b> से भाषा बदलें। <b>प्रदर्शन</b> में अक्षर का आकार, थीम और क्या दिखे, चुनें।"]],
      ["खोजें",["<b>विषय</b> में कथाएँ उनके विषय के अनुसार हैं: मृत्यु का सामना, सत्य, गुरु और जिज्ञासु…",
        "<b>सूची</b> में हर पात्र और विचार है। <b>खोजें</b> से किसी भी कथा में नाम, दृश्य या शब्द ढूँढें।",
        "<b>सहेजें</b> से कथा सहेजें; वह <b>सहेजे</b> में मिलेगी।"]]]}
};
const SITE = window.APP_SITE || "https://gitagraph.com/upanishads/";
const LIBROOT = SITE.replace(/upanishads\/$/, "");

// ===================== storage (best effort) =====================
const store = {
  get(k,d){ try{ const v = localStorage.getItem("upa-"+k); return v==null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem("upa-"+k, JSON.stringify(v)); }catch(e){} }
};
let lang = store.get("lang", null);
if(lang!=="en" && lang!=="hi"){ try{ lang = localStorage.getItem("gita-lang") ? JSON.parse(localStorage.getItem("gita-lang")) : "en"; }catch(e){ lang = "en"; } if(lang!=="hi") lang = "en"; }
const prefs = Object.assign({sa:true, iast:true, other:false, marks:false, size:1, theme:"system"}, store.get("prefs2",{}));
const savedSet = new Set(store.get("saved",[]));
const readSet = new Set(store.get("read",[]));
let recent = store.get("recent",[]);

// ===================== data =====================
let START = [], S = [], SB = new Map(), TH = [], THB = new Map(), HB = new Map(), UP = [], UPB = new Map(), XG = {}, XA = {};
const u = () => UI[lang];
const isHi = () => lang==="hi";
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const L = (o, k) => o ? (isHi() ? (o[k+"_hi"] ?? o[k+"_en"]) : o[k+"_en"]) : "";
const hname = h => h ? (isHi() ? (h.label_hi || h.label) : h.label) : "";
const hdesc = h => h ? (isHi() ? h.desc_hi : h.desc_en) : "";
const words = s => (s.story_en||[]).reduce((n,p) => n + p.t.split(/\s+/).length, 0);

function prepare(d){
  UP = d.upanishads; UP.forEach(x => { x.ss = []; UPB.set(x.id, x); });
  TH = d.themes; TH.forEach(t => { t.ss = []; THB.set(t.id, t); });
  [...d.people, ...d.ideas].forEach(h => { h.ss = []; HB.set(h.id, h); });
  XG = d.gita || {}; XA = d.ashtavakra || {}; START = (d.start_here || []).filter(id => d.stories.some(s => s.id===id));
  S = d.stories;
  S.forEach((s,i) => {
    s.i = i; SB.set(s.id, s); s.mins = Math.max(2, Math.round(words(s)/200));
    UPB.get(s.up).ss.push(s);
    s.themes.forEach(t => THB.has(t) && THB.get(t).ss.push(s));
    [...s.people, ...s.ideas].forEach(t => HB.has(t) && HB.get(t).ss.push(s));
    s.s_txt = norm([s.title_en, s.title_hi, s.insight_en, s.insight_hi, s.hook_en, s.hook_hi, s.for_en, s.for_hi, ...s.story_en.map(p=>p.t), ...s.story_hi.map(p=>p.t),
      ...s.verses.map(v=>v.sa+" "+(v.iast||"")+" "+v.en+" "+v.hi)].join(" "));
  });
  HB.forEach(h => { h.s = norm([h.label, h.label_hi, h.skt, h.desc_en].join(" ")); });
}
function norm(s){
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()
    .replace(/sh/g,"s").replace(/ri/g,"r").replace(/aa/g,"a").replace(/ee/g,"i").replace(/oo/g,"u").replace(/w/g,"v").replace(/[^a-z0-9ऀ-ॿ ]/g," ");
}
const saLines = v => v.sa.split("\n").map(s=>s.trim()).filter(Boolean);
const trLines = v => (v.iast||"").split("\n").map(s=>s.trim()).filter(Boolean);

// ===================== shell =====================
const NAV = [["home","stories",IC.read],["themes","themes",IC.themes],["index","index",IC.index],["search","search",IC.search]];
function section(r){ return r.name==="themes"||r.name==="theme" ? "themes" : r.name==="index"||r.name==="topic"||r.name==="texts"||r.name==="up" ? "index" : r.name==="search" ? "search" : r.name==="saved" ? "saved" : "home"; }
function drawShell(route){
  const sec = section(route);
  const tab = ([t,k,ic]) => `<a href="#${t}" ${sec===t?'aria-current="page"':""}><span class="ico">${ic}</span>${esc(k==="index"?u().indexShort:u()[k])}</a>`;
  document.getElementById("rail").innerHTML = `<div class="brand" aria-hidden="true">उ</div>` + NAV.map(tab).join("") +
    `<div class="spacer"></div><button type="button" id="railset"><span class="ico">${IC.set}</span>${esc(u().settings)}</button>`;
  document.getElementById("tabs").innerHTML = NAV.map(tab).join("");
  const cur = route.name==="story" ? route.s.id : "";
  document.getElementById("side").innerHTML = UP.filter(x=>x.ss.length).map(x => `<h2>${esc(L(x,"name"))}</h2><ol>` + x.ss.map(s =>
    `<li><a href="#s-${s.id}" ${cur===s.id?'aria-current="true"':""}><span class="n">${readSet.has(s.id)?"•":""}</span><span>${esc(L(s,"title"))}</span><span class="c"></span></a></li>`).join("") + `</ol>`).join("");
  document.getElementById("railset").onclick = openSettings;
  const back = document.getElementById("back");
  back.hidden = ["home","themes","index","search","saved"].includes(route.name);
  back.innerHTML = IC.back; back.setAttribute("aria-label", u().back);
  const fwd = document.getElementById("fwd");
  const nxt = route.name==="story" ? S[route.s.i+1] : null;
  fwd.hidden = true; fwd.innerHTML = IC.fwd;
  if(nxt){ fwd.href = link("s-"+nxt.id); fwd.setAttribute("aria-label", `${u().next}: ${L(nxt,"title")}`); fwd.title = `${u().next}: ${L(nxt,"title")}`; }
  document.getElementById("setbtn").innerHTML = IC.set;
  const st = document.getElementById("sharetop"); st.hidden = !["story","theme","up","topic"].includes(route.name); st.innerHTML = IC.share;
  st.setAttribute("aria-label", u().share); st.title = u().share; st.onclick = () => route.name==="story" ? share(route.s) : sharePage();
  const hb = document.getElementById("helpbtn"); hb.setAttribute("aria-label", u().howT); hb.title = u().howT;
  const lb = document.getElementById("langbtn"); lb.textContent = isHi() ? "EN" : "हि"; lb.setAttribute("aria-label", isHi() ? "Switch to English" : "हिन्दी में देखें");
}
document.getElementById("back").onclick = () => { if(history.length > 1) history.back(); else go("home"); };
document.getElementById("langbtn").onclick = () => setLang(isHi() ? "en" : "hi");
document.getElementById("setbtn").onclick = openSettings;
document.getElementById("helpbtn").onclick = () => sheet(`<h2>${esc(u().whyT)}</h2><div class="howbody"><ul>${u().why.map(i=>`<li>${i}</li>`).join("")}</ul></div><h2 style="margin-top:18px">${esc(u().howT)}</h2>${howBody()}<div class="row"><span></span><button class="btn primary" data-close>${esc(u().done)}</button></div>`);
window.addEventListener("scroll", () => document.getElementById("top").classList.toggle("scrolled", window.scrollY > 4), {passive:true});
const howBody = () => `<div class="howbody">${u().how.map(([h,items]) => `<h3>${esc(h)}</h3><ul>${items.map(i=>`<li>${i}</li>`).join("")}</ul>`).join("")}</div>`;

function setLang(l){ lang = l; store.set("lang", l); document.documentElement.lang = l; render(true); }
function applyPrefs(boot){
  document.documentElement.style.setProperty("--scale", prefs.size);
  if(prefs.theme==="system"){ if(!boot) document.documentElement.removeAttribute("data-theme"); }
  else document.documentElement.setAttribute("data-theme", prefs.theme);
  store.set("prefs2", prefs);
}

// ===================== router =====================
// Tokens: home, themes, index, texts, search, saved, about, s-<story>, th-<theme>, u-<upanishad>, t-<person or idea>
function parse(h){
  h = (h||"").replace(/^#/,"") || "home";
  let m;
  if((m = /^s-([a-z0-9-]+)$/.exec(h)) && SB.has(m[1])) return {name:"story", s:SB.get(m[1])};
  if((m = /^th-([a-z0-9-]+)$/.exec(h)) && THB.has(m[1])) return {name:"theme", t:THB.get(m[1])};
  if((m = /^u-([a-z0-9-]+)$/.exec(h)) && UPB.has(m[1])) return {name:"up", x:UPB.get(m[1])};
  if((m = /^t-([a-z0-9-]+)$/.exec(h)) && HB.has(m[1])) return {name:"topic", h:HB.get(m[1])};
  if(["themes","index","texts","search","saved","about"].includes(h)) return {name:h};
  return {name:"home"};
}
const BASE = window.APP_BASE || "";
const VER = window.APP_VER ? "?v=" + window.APP_VER : "";
const PATHS = {home:"", themes:"themes/", index:"people-and-ideas/", texts:"texts/", search:"search/", saved:"saved/", about:"about/"};
function pathOf(t){
  let m;
  if(t in PATHS) return BASE + PATHS[t];
  if((m = /^s-(.+)$/.exec(t))) return `${BASE}story/${m[1]}/`;
  if((m = /^th-(.+)$/.exec(t))) return `${BASE}theme/${m[1]}/`;
  if((m = /^u-(.+)$/.exec(t))) return `${BASE}upanishad/${m[1]}/`;
  if((m = /^t-(.+)$/.exec(t))) return `${BASE}topic/${m[1]}/`;
  return BASE;
}
function tokenOf(path){
  let p = path.startsWith(BASE) ? path.slice(BASE.length) : "", m;
  p = p.replace(/index\.html$/,"").replace(/\/+$/,"");
  if((m = /^story\/([a-z0-9-]+)$/.exec(p))) return `s-${m[1]}`;
  if((m = /^theme\/([a-z0-9-]+)$/.exec(p))) return `th-${m[1]}`;
  if((m = /^upanishad\/([a-z0-9-]+)$/.exec(p))) return `u-${m[1]}`;
  if((m = /^topic\/([a-z0-9-]+)$/.exec(p))) return `t-${m[1]}`;
  const hit = Object.entries(PATHS).find(([k,v]) => v && v.replace(/\/$/,"")===p);
  return hit ? hit[0] : "home";
}
const link = t => BASE ? pathOf(t) : "#" + t;
const curToken = () => BASE ? tokenOf(location.pathname) : (location.hash.slice(1).split("~")[0] || "home");
let current = null;
function go(t){
  if(curToken()===t){ render(); return; }
  if(BASE){ history.pushState(null, "", pathOf(t)); render(); } else location.hash = t;
}
if(BASE){
  window.addEventListener("popstate", () => render());
  const fix = n => { const f = a => { const h = a.getAttribute("href").slice(1); if(!h.startsWith("v-")) a.setAttribute("href", pathOf(h)); };
    if(n.matches && n.matches('a[href^="#"]')) f(n); if(n.querySelectorAll) n.querySelectorAll('a[href^="#"]').forEach(f); };
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if(n.nodeType===1) fix(n); }))).observe(document.body, {childList:true, subtree:true});
  fix(document.body);
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest("a[href]");
    if(!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if(url.origin !== location.origin || !url.pathname.startsWith(BASE) || /\.[a-z]+$/.test(url.pathname) || url.hash) return;
    e.preventDefault(); go(tokenOf(url.pathname));
  });
} else window.addEventListener("hashchange", () => { if(!location.hash.startsWith("#v-")) render(); });
// in-page jumps to a source verse ("#v-<ref>") never change the route
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest('a[href^="#v-"]');
  if(!a) return; e.preventDefault();
  const el = document.getElementById(a.getAttribute("href").slice(1));
  if(el){ el.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start"}); el.classList.add("hit"); el.focus({preventScroll:true}); }
});

function render(keepScroll){
  if(!S.length) return;
  const route = parse(curToken()), key = curToken();
  const same = current && current.key===key, firstRender = !current;
  const run = () => {
    current = route; route.key = key; drawShell(route);
    const view = document.getElementById("view"), ttl = document.getElementById("ttl");
    let t = u().app;
    if(route.name==="home"){ view.innerHTML = page(homeView(), ""); }
    else if(route.name==="story"){ t = L(route.s,"title"); view.innerHTML = page(storyView(route.s), ""); markRead(route.s); wireStory(route.s); }
    else if(route.name==="theme"){ t = L(route.t,"label"); view.innerHTML = page(themeView(route.t), themesCtx()); }
    else if(route.name==="themes"){ t = u().themes; view.innerHTML = page(themesView(), aboutCtx()); }
    else if(route.name==="up"){ t = L(route.x,"name"); view.innerHTML = page(upView(route.x), textsCtx()); }
    else if(route.name==="texts"){ t = u().texts; view.innerHTML = page(textsView(), aboutCtx()); }
    else if(route.name==="topic"){ t = hname(route.h); view.innerHTML = page(topicView(route.h), aboutCtx()); }
    else if(route.name==="index"){ t = u().index; view.innerHTML = page(indexView(), aboutCtx()); }
    else if(route.name==="search"){ t = u().search; view.innerHTML = page(searchView(), aboutCtx()); wireSearch(); }
    else if(route.name==="saved"){ t = u().saved; view.innerHTML = page(savedView(), aboutCtx()); }
    else if(route.name==="about"){ t = u().aboutPage; view.innerHTML = page(aboutView(), aboutCtx()); }
    ttl.textContent = t;
    wireCommon();
    if(!(BASE && firstRender)) document.title = route.name==="home" ? (isHi() ? "उपनिषद् की कथाएँ · गीताग्राफ़" : "Upanishad stories · Gitagraph") : `${t} · ${isHi() ? "उपनिषद्" : "Upanishads"}`;
    if(!(keepScroll || same)) window.scrollTo(0,0);
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(document.startViewTransition && !reduce && !same && current) document.startViewTransition(run); else run();
}
const page = (main, ctx) => `<div class="page"><div class="content">${main}</div><aside class="ctx">${ctx}</aside></div>`;

// ===================== components =====================
const kindTag = s => `<span class="kind">${esc(s.kind==="teaching" ? u().teaching : u().story)}</span>`;
function storyCard(s, opts={}){
  const x = UPB.get(s.up);
  return `<li><a class="scard" href="#s-${s.id}"><span class="lab">${esc(L(x,"name"))} · ${esc(s.ref)}${savedSet.has(s.id)?`<span class="mk">${IC.saved}</span>`:""}</span>
    <span class="nm">${opts.n ? `<span class="stepn">${opts.n}</span>` : ""}${esc(L(s,"title"))}</span>${opts.plain ? "" : `<p class="hk" lang="${lang}">${esc(opts.insight ? L(s,"insight") : L(s,"hook"))}</p>`}
    ${opts.noFor ? "" : `<span class="for" lang="${lang}">${esc(L(s,"for"))}</span>`}</a></li>`;
}
const storyGrid = (list, opts={}) => `<ul class="sgrid${opts.cls?" "+opts.cls:""}">${list.map((s,i) => storyCard(s, Object.assign({}, opts, opts.numbered ? {n:i+1} : {}))).join("")}</ul>`;
const chip = (href, label, k, cls) => `<a class="chip" href="${href}">${cls?`<i class="dot ${cls}"></i>`:""}${esc(label)}${k!=null?`<span class="k">${k}</span>`:""}</a>`;
const themeChips = list => `<div class="chips themechips">${list.map(t => chip(`#th-${t.id}`, L(t,"label"), t.ss.length, "d-theme")).join("")}</div>`;
function aboutCtx(){
  return `<h3>${esc(u().about)}</h3><p class="about">${esc(u().aboutT)}</p><p class="about" style="margin-top:10px"><span class="proto">${esc(u().proto)}</span></p>`;
}
function themesCtx(){ return `<h3>${esc(u().themes)}</h3><div class="box">${TH.map(t => `<a class="crow" href="#th-${t.id}"><i class="dot d-theme"></i><span class="nm">${esc(L(t,"label"))}</span><span class="ct">${t.ss.length}</span></a>`).join("")}</div>${aboutCtx()}`; }
function textsCtx(){ return `<h3>${esc(u().byUp)}</h3><div class="box">${UP.map(x => `<a class="crow" href="#u-${x.id}"><i class="dot d-up"></i><span class="nm">${esc(L(x,"name"))}</span><span class="ct">${x.ss.length}</span><span class="mt">${esc(L(x,"veda"))}</span></a>`).join("")}</div>${aboutCtx()}`; }

// ===================== home =====================
// Story of the day: the same story for everyone on a given date in India (IST), stepping through
// the list in a fixed scrambled order so consecutive days come from different Upanishads.
function sotd(){
  const gcd = (a,b) => b ? gcd(b, a % b) : a;
  const step = [7,11,13,17,19,23].find(k => gcd(k, S.length)===1);
  const day = Math.floor((Date.now() + 5.5*3600e3) / 864e5);
  return S[(day * step) % S.length];
}
const storyUrl = s => BASE ? location.origin + pathOf("s-"+s.id) : `${SITE}story/${s.id}/`;
function homeView(){
  const core = S.filter(s=>s.tier!=="deeper"), deep = S.filter(s=>s.tier==="deeper");
  return `<header class="thead"><h1>${isHi() ? "उपनिषदों की कथाएँ" : "Stories from the Upanishads"}</h1><p class="desc" lang="${lang}">${esc(u().tagLede)}</p></header>
  ${START.length ? `<h2 class="sec">${esc(u().startHere)}</h2>${storyGrid(START.map(id=>SB.get(id)), {numbered:true, insight:true, noFor:true, cls:"path"})}` : ""}
  <h2 class="sec">${esc(u().themes)}</h2>${themeChips(TH.filter(t=>t.ss.length))}
  <h2 class="sec">${esc(u().allStories)}</h2>${storyGrid(core, {plain:true})}
  ${deep.length ? `<h2 class="sec">${esc(u().deeper)}</h2>${storyGrid(deep, {plain:true})}` : ""}`;
}
function homeCtx(){
  const ppl = [...HB.values()].filter(h=>h.type==="person"&&h.ss.length).sort((a,b)=>b.ss.length-a.ss.length).slice(0,7);
  return `<h3>${esc(u().themes)}</h3><div class="box">${TH.slice(0,8).map(t => `<a class="crow" href="#th-${t.id}"><i class="dot d-theme"></i><span class="nm">${esc(L(t,"label"))}</span><span class="ct">${t.ss.length}</span></a>`).join("")}</div>
    <h3>${esc(u().people)}</h3><div class="box">${ppl.map(h => `<a class="crow" href="#t-${h.id}"><i class="dot d-person"></i><span class="nm">${esc(hname(h))}</span><span class="ct">${h.ss.length}</span></a>`).join("")}</div>${aboutCtx()}`;
}
function share(s){
  const url = storyUrl(s), title = `${L(s,"title")} · ${isHi() ? "उपनिषद्" : "Upanishads"}`, text = `${L(s,"title")}: ${L(s,"hook")}`;
  const copy = () => { try{ navigator.clipboard.writeText(`${text}\n${url}`).then(()=>toast(u().linkCopied), ()=>toast(u().copyFail)); }catch(e){ toast(u().copyFail); } };
  if(navigator.share) navigator.share({title, text, url}).catch(err => { if(err && err.name !== "AbortError") copy(); }); else copy();
}
// themes, Upanishads, people and ideas: share this page, with its own description as the text
function sharePage(){
  const h1 = document.querySelector("#view h1"), d = document.querySelector("#view .thead .desc");
  const name = h1 ? h1.textContent.trim() : document.title;
  const url = BASE ? location.origin + location.pathname : SITE, title = `${name} · ${isHi() ? "उपनिषद्" : "Upanishads"}`;
  const text = d ? `${name}: ${d.textContent.trim()}` : title;
  const copy = () => { try{ navigator.clipboard.writeText(`${text}\n${url}`).then(()=>toast(u().linkCopied), ()=>toast(u().copyFail)); }catch(e){ toast(u().copyFail); } };
  if(navigator.share) navigator.share({title, text, url}).catch(err => { if(err && err.name !== "AbortError") copy(); }); else copy();
}
function wireShare(){ document.querySelectorAll("[data-share],#sharebtn").forEach(b => b.onclick = () => share(SB.get(b.dataset.id))); }

// ===================== story =====================
const vid = ref => "v-" + ref.replace(/[^0-9a-z]+/gi, "-");
function storyView(s){
  const x = UPB.get(s.up), refs = new Set(s.verses.map(v=>v.ref));
  const paras = (isHi() ? s.story_hi : s.story_en).map(p => {
    const r = p.src==="text" && p.ref ? (refs.has(p.ref) ? `<a class="srcref" href="#${vid(p.ref)}">${esc(p.ref)}</a>` : `<span class="srcref">${esc(p.ref)}</span>`) : "";
    return `<p class="${p.src==="text"?"text":"narr"}" lang="${lang}">${esc(p.t)}${r}</p>`;
  }).join("");
  const next = S[s.i+1];
  const hub = id => HB.get(id);
  const ppl = s.people.map(hub).filter(Boolean), ide = s.ideas.map(hub).filter(Boolean), ths = s.themes.map(t=>THB.get(t)).filter(Boolean);
  const take = isHi() ? s.takeaways_hi : s.takeaways_en;
  const xref = (list, src, name, path) => list.filter(r => src[r]).map(r => { const [c,v] = r.split(".");
    return `<a href="${LIBROOT}${path}/chapter/${c}/verse/${v}/"><span class="w">${esc(name)} ${esc(r)}</span><span class="t" lang="${lang}">${esc(isHi() ? src[r].hi : src[r].en)}</span></a>`; }).join("");
  const xr = xref(s.gita||[], XG, u().gita, "gita") + xref(s.ashtavakra||[], XA, u().ashtavakra, "ashtavakra");
  return `<article class="story">
  <h1>${esc(L(s,"title"))}</h1>
  <p class="forline" lang="${lang}">${esc(L(s,"for"))}</p>
  ${L(s,"insight") ? `<p class="insight1" lang="${lang}">${esc(L(s,"insight"))}</p>` : ""}
  <div class="tale ${prefs.marks?"":"nomarks"}">${paras}</div>

  <h2 class="big">${esc(u().learning)}</h2>
  <div class="learn" lang="${lang}">${String(L(s,"learning")).split(/\n+/).map(p=>`<p>${esc(p)}</p>`).join("")}</div>
  ${take && take.length ? `<div class="carry"><p class="eyebrow">${esc(u().carry)}</p><ul lang="${lang}">${take.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></div>` : ""}

  <details class="more" id="more"><summary>${esc(u().moreT)}</summary>
  <p class="legend2"><i></i>${esc(prefs.marks ? u().legend : u().legendOff)}</p>
  <h2 class="sec">${esc(u().whereFrom)}</h2>
  <dl class="prov">
    <dt>${esc(u().upanishad)}</dt><dd><a href="#u-${x.id}">${esc(L(x,"name"))}</a> <span class="skt muted">${esc(x.native)}</span></dd>
    <dt>${esc(u().veda)}</dt><dd>${esc(L(x,"veda"))}</dd>
    <dt>${esc(u().section)}</dt><dd>${esc(L(s,"section"))}</dd>
    <dt>${esc(u().period)}</dt><dd>${esc(L(x,"period"))}</dd>
    ${ppl.length ? `<dt>${esc(u().people)}</dt><dd>${ppl.map(h=>`<a href="#t-${h.id}">${esc(hname(h))}</a>`).join(", ")}</dd>` : ""}
    ${ide.length ? `<dt>${esc(u().ideas)}</dt><dd>${ide.map(h=>`<a href="#t-${h.id}">${esc(hname(h))}</a>`).join(", ")}</dd>` : ""}
    ${ths.length ? `<dt>${esc(u().themesH)}</dt><dd>${ths.map(t=>`<a href="#th-${t.id}">${esc(L(t,"label"))}</a>`).join(", ")}</dd>` : ""}
    <dt>${esc(u().edition)}</dt><dd><a href="${esc(s.source_url)}" target="_blank" rel="noopener">${isHi()?"संस्कृत विकिस्रोत":"Sanskrit Wikisource"}: ${esc(s.source_title)}</a> (CC BY-SA 4.0)</dd>
  </dl>
  <h2 class="sec" id="sources">${esc(u().sources)}</h2>
  ${s.verses.map(v => `<section class="sv" id="${vid(v.ref)}" tabindex="-1"><div class="rf"><b>${esc(L(x,"name"))} ${esc(v.ref)}</b>${v.speaker && HB.has(v.speaker) ? `<span>${esc(hname(HB.get(v.speaker)))}</span>` : ""}</div>
    ${prefs.sa ? `<p class="vsa" lang="sa">${saLines(v).map(l=>`<span class="ln">${esc(l)}</span>`).join("")}</p>` : ""}
    ${prefs.iast && v.iast ? `<p class="viast" lang="sa-Latn">${trLines(v).map(l=>`<span class="ln">${esc(l)}</span>`).join("")}</p>` : ""}
    <p class="vtr ${isHi()?"hi":""}" lang="${lang}">${esc(isHi()?v.hi:v.en)}</p>
    ${prefs.other ? `<p class="vtr2 ${isHi()?"":"hi"}" lang="${isHi()?"en":"hi"}"><b>${isHi()?"EN":"हिन्दी"}</b>${esc(isHi()?v.en:v.hi)}</p>` : ""}</section>`).join("")}
  ${s.readings && s.readings.length ? `<h2 class="sec">${esc(u().readings)}</h2><div class="readings" lang="${lang}">${s.readings.map(r=>`<p>${esc(isHi()?r.hi:r.en)}</p>`).join("")}</div>` : ""}
  ${xr ? `<h2 class="sec">${esc(u().sameIdea)}</h2><div class="xref">${xr}</div>` : ""}
  <p class="credits">${u().suggest}</p>
  </details>
  ${next ? `<nav class="snav one"><a class="nx" href="#s-${next.id}"><small>${esc(u().next)} →</small><b>${esc(L(next,"title"))}</b></a></nav>` : ""}
</article>`;
}
function storyCtx(s){
  const ths = s.themes.map(t=>THB.get(t)).filter(Boolean);
  const more = [...new Set(ths.flatMap(t=>t.ss))].filter(x=>x!==s).slice(0,6);
  return `<h3>${esc(u().themesH)}</h3><div class="box">${ths.map(t => `<a class="crow" href="#th-${t.id}"><i class="dot d-theme"></i><span class="nm">${esc(L(t,"label"))}</span><span class="ct">${t.ss.length}</span><span class="mt">${esc(L(t,"desc"))}</span></a>`).join("")}</div>
    ${more.length ? `<h3>${isHi()?"इन विषयों पर और":"More on these themes"}</h3><div class="box">${more.map(x => `<a class="crow" href="#s-${x.id}"><i class="dot d-story"></i><span class="nm">${esc(L(x,"title"))}</span><span class="mt">${esc(L(x,"for"))}</span></a>`).join("")}</div>` : ""}`;
}
function markRead(s){
  readSet.add(s.id); store.set("read",[...readSet]);
  recent = [s.id, ...recent.filter(r=>r!==s.id)].slice(0,30); store.set("recent",recent);
}
function wireStory(s){
  // a jump to a source verse opens "More" first
  document.querySelectorAll('a[href^="#v-"]').forEach(l => l.addEventListener("click", () => { const d = document.getElementById("more"); if(d) d.open = true; }, true));
}

// ===================== themes, texts, topics =====================
function themesView(){
  return `<header class="thead"><h1>${esc(u().themes)}</h1><p class="desc" lang="${lang}">${isHi() ? "हर कथा किसी न किसी के काम आ सकती है। विषय चुनें, और उससे जुड़ी कथाएँ पढ़ें।" : "Every story can be relevant to someone. Pick what you are carrying, and read the stories about it."}</p></header>
  <ul class="ilist">${TH.map(t => `<li><a class="irow" href="#th-${t.id}"><i class="dot d-theme"></i><span class="nm">${esc(L(t,"label"))}</span><span class="ct"><b>${t.ss.length}</b></span><span class="mt" lang="${lang}">${esc(L(t,"desc"))}</span></a></li>`).join("")}</ul>`;
}
function themeView(t){
  return `<header class="thead"><span class="pill"><i class="dot d-theme"></i>${esc(u().theme1)}</span><h1>${esc(L(t,"label"))}</h1>
    <p class="desc" lang="${lang}">${esc(L(t,"desc"))}</p><p class="meta">${esc(u().nStories(t.ss.length))}</p></header>${storyGrid(t.ss)}`;
}
function textsView(){
  return `<header class="thead"><h1>${esc(u().texts)}</h1><p class="desc" lang="${lang}">${esc(u().textsT)}</p></header>
  <ul class="ilist">${UP.map(x => `<li><a class="uprow" href="#u-${x.id}"><span class="nm">${esc(L(x,"name"))}<span class="skt">${esc(x.native)}</span></span>
    <span class="ct"><b>${x.ss.length}</b>${esc(isHi()?"कथाएँ":"stories")}</span><span class="mt" lang="${lang}">${esc(L(x,"veda"))} · ${esc(L(x,"desc"))}</span></a></li>`).join("")}</ul>`;
}
function upView(x){
  return `<header class="thead"><span class="pill"><i class="dot d-up"></i>${esc(u().upanishad)}</span><h1>${esc(L(x,"name"))}</h1><p class="sk">${esc(x.native)}</p>
    <p class="meta">${esc(L(x,"veda"))}</p><p class="desc" lang="${lang}">${esc(L(x,"desc"))}</p><p class="desc muted" lang="${lang}" style="font-size:15px">${esc(L(x,"period"))}</p></header>
    <h2 class="sec">${esc(u().nStories(x.ss.length))}</h2>${storyGrid(x.ss)}`;
}
function topicView(h){
  return `<header class="thead"><span class="pill"><i class="dot d-${h.type}"></i>${esc(u().type[h.type])}</span><h1>${esc(hname(h))}</h1><p class="sk">${esc(h.skt||"")}</p>
    <p class="desc" lang="${lang}">${esc(hdesc(h))}</p><p class="meta">${esc(u().nStories(h.ss.length))}</p></header>${storyGrid(h.ss)}`;
}
function indexView(){
  const row = h => `<li><a class="irow" href="#t-${h.id}"><i class="dot d-${h.type}"></i><span class="nm">${esc(hname(h))}${h.skt?`<span class="skt">${esc(h.skt)}</span>`:""}</span><span class="ct"><b>${h.ss.length}</b></span><span class="mt" lang="${lang}">${esc(hdesc(h))}</span></a></li>`;
  const all = [...HB.values()].filter(h=>h.ss.length);
  const by = t => all.filter(h=>h.type===t).sort((a,b)=>b.ss.length-a.ss.length || hname(a).localeCompare(hname(b)));
  return `<h1 style="font-family:var(--f-read);font-weight:600">${esc(u().index)}</h1>
    <p class="muted"><a href="#texts" style="color:var(--accent);text-decoration:underline">${esc(u().byUp)} →</a></p>
    <h2 class="sec">${esc(u().people)}</h2><ul class="ilist">${by("person").map(row).join("")}</ul>
    <h2 class="sec">${esc(u().ideas)}</h2><ul class="ilist">${by("idea").map(row).join("")}</ul>`;
}

// ===================== search, saved, about =====================
let lastQ = "";
function searchView(){
  return `<h1 class="sr" style="position:absolute;left:-9999px">${esc(u().search)}</h1>
    <div class="sbox">${IC.search}<input id="q" type="search" placeholder="${esc(u().searchPh)}" value="${esc(lastQ)}" autocomplete="off" aria-label="${esc(u().search)}"></div><div id="res"></div>`;
}
function wireSearch(){
  const q = document.getElementById("q"), res = document.getElementById("res");
  const run = () => {
    lastQ = q.value; const n = norm(q.value).trim();
    if(n.length < 2){ res.innerHTML = ""; return; }
    const hs = [...HB.values()].filter(h => h.ss.length && h.s.includes(n)).slice(0,12);
    const ts = TH.filter(t => norm(t.label_en+" "+t.label_hi).includes(n));
    const ss = S.filter(s => s.s_txt.includes(n));
    res.innerHTML = (!hs.length && !ts.length && !ss.length) ? `<p class="empty">${esc(u().none)}</p>` :
      ((hs.length || ts.length) ? `<div class="chips" style="margin-top:14px">${ts.map(t=>chip(`#th-${t.id}`, L(t,"label"), t.ss.length, "d-theme")).join("")}${hs.map(h=>chip(`#t-${h.id}`, hname(h), h.ss.length, "d-"+h.type)).join("")}</div>` : "") +
      (ss.length ? `<h2 class="sec">${esc(u().stories)} · ${ss.length}</h2>${storyGrid(ss)}` : "");
  };
  q.oninput = run; run();
  if(matchMedia("(hover:hover)").matches) q.focus();
}
function savedView(){
  const sv = S.filter(s => savedSet.has(s.id)), rc = recent.map(id=>SB.get(id)).filter(Boolean).slice(0,8);
  return `<h1 style="font-family:var(--f-read);font-weight:600">${esc(u().saved)}</h1>
    ${sv.length ? storyGrid(sv) : `<p class="empty">${esc(u().savedEmpty)}</p>`}
    <h2 class="sec">${esc(u().recent)}</h2>${rc.length ? storyGrid(rc, {noFor:true}) : `<p class="empty">${esc(u().noRecent)}</p>`}`;
}
function aboutView(){
  return `<header class="thead"><h1>${esc(u().aboutPage)}</h1></header>
  <p class="desc" lang="${lang}" style="font-family:var(--f-read);line-height:1.7;max-width:62ch">${esc(u().tagLede)}</p>
  <h2 class="sec">${esc(u().about)}</h2><p style="line-height:1.7;max-width:62ch" lang="${lang}">${esc(u().aboutT)}</p>
  <p style="line-height:1.7;max-width:62ch" lang="${lang}">${isHi()
    ? "हर कथा में बाईं ओर रेखा वाले अंश संस्कृत के करीब हैं और उनके साथ मंत्र-संदर्भ दिया गया है; बाकी अंश केवल जोड़ने वाला वर्णन है, जो दृश्य या पात्रों का परिचय देता है। जहाँ अद्वैत, विशिष्टाद्वैत, द्वैत या आधुनिक विद्वान किसी अंश को अलग पढ़ते हैं, वहाँ यह बताया गया है। तिथियाँ अनुमानित हैं; विद्वानों में इन पर मतभेद है।"
    : "In every story, passages with a line on the left follow the Sanskrit closely and carry their reference; the rest is connective narration that sets a scene or introduces someone. Where Advaita, Vishishtadvaita, Dvaita or modern scholars read a passage differently, the story says so. Dates are approximate and scholars disagree about them."}</p>
  <p style="line-height:1.7;max-width:62ch"><i>${esc(u().note)}</i> ${u().suggest}</p>
  <p style="line-height:1.7"><a href="${LIBROOT}how-its-made/" style="color:var(--accent);text-decoration:underline">${isHi()?"यह साइट कैसे बनी →":"How this site is made →"}</a></p>`;
}

// ===================== sheets, toast, settings =====================
function wireCommon(){}
let toastT = 0;
function toast(msg){
  let t = document.querySelector(".toast"); if(!t){ t = document.createElement("div"); t.className = "toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(()=>{ t.hidden = true; }, 1600);
}
function sheet(html){
  const layer = document.getElementById("layer");
  layer.innerHTML = `<div class="scrim" id="scrim"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>${html}</div></div>`;
  const close = () => { layer.innerHTML = ""; document.removeEventListener("keydown", onKey); };
  const onKey = e => { if(e.key==="Escape") close(); };
  document.addEventListener("keydown", onKey);
  document.getElementById("scrim").onclick = e => { if(e.target.id==="scrim" || e.target.closest("a") || e.target.closest("[data-close]")) close(); };
  const first = layer.querySelector("button, a"); if(first) first.focus({preventScroll:true});
  return layer;
}
function openSettings(){
  const sw = (k,l) => `<div class="row"><span class="lbl">${esc(l)}</span><button class="switch" role="switch" aria-checked="${prefs[k]}" data-sw="${k}" aria-label="${esc(l)}"></button></div>`;
  const seg = (k, opts) => `<div class="seg" role="group">${opts.map(([v,l]) => `<button data-${k}="${v}" aria-pressed="${String(prefs[k])===String(v)}">${esc(l)}</button>`).join("")}</div>`;
  const layer = sheet(`<h2>${esc(u().settings)}</h2>
    <div class="row"><span class="lbl">${esc(u().language)}</span><div class="seg" role="group"><button data-lg="en" aria-pressed="${!isHi()}">English</button><button data-lg="hi" aria-pressed="${isHi()}" lang="hi">हिन्दी</button></div></div>
    ${sw("sa", u().sanskrit)}${sw("iast", u().iast)}${sw("other", u().second)}${sw("marks", u().marks)}
    <div class="row"><span class="lbl">${esc(u().size)}</span>${seg("size", [[0.9,"A−"],[1,"A"],[1.12,"A+"],[1.25,"A++"]])}</div>
    <div class="row"><span class="lbl">${esc(u().theme)}</span>${seg("theme", [["system",u().system],["light",u().light],["dark",u().dark]])}</div>
    <div class="row"><span></span><button class="btn primary" data-close>${esc(u().done)}</button></div>`);
  layer.querySelectorAll("[data-sw]").forEach(b => b.onclick = () => { const k = b.dataset.sw; prefs[k] = !prefs[k]; b.setAttribute("aria-checked", prefs[k]); applyPrefs(); render(true); });
  layer.querySelectorAll("[data-size]").forEach(b => b.onclick = () => { prefs.size = +b.dataset.size; layer.querySelectorAll("[data-size]").forEach(x=>x.setAttribute("aria-pressed", x===b)); applyPrefs(); });
  layer.querySelectorAll("[data-theme]").forEach(b => b.onclick = () => { prefs.theme = b.dataset.theme; layer.querySelectorAll("[data-theme]").forEach(x=>x.setAttribute("aria-pressed", x===b)); applyPrefs(); });
  layer.querySelectorAll("[data-lg]").forEach(b => b.onclick = () => { document.getElementById("layer").innerHTML = ""; setLang(b.dataset.lg); openSettings(); });
}
// keyboard: / search, ←/→ stories, s save
document.addEventListener("keydown", e => {
  if(e.target.closest && e.target.closest("input,textarea") || e.metaKey || e.ctrlKey || e.altKey || document.querySelector(".scrim")) return;
  if(e.key==="/"){ e.preventDefault(); go("search"); }
  else if(current && current.name==="story" && (e.key==="ArrowRight" || e.key==="ArrowLeft")){ const w = S[current.s.i + (e.key==="ArrowRight"?1:-1)]; if(w) go("s-"+w.id); }
  else if(current && current.name==="story" && e.key==="s"){ const b = document.getElementById("savebtn"); if(b) b.click(); }
});

// ===================== boot =====================
document.documentElement.lang = lang;
applyPrefs(true);
(window.UPA_DATA ? Promise.resolve(window.UPA_DATA) : fetch(BASE + "data.json" + VER).then(r => { if(!r.ok) throw 0; return r.json(); }))
  .then(d => { prepare(d); render(); })
  .catch(() => { document.getElementById("view").innerHTML = `<p class="loading">The stories did not load. Reload the page to try again.</p>`; });
