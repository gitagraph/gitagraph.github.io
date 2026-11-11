// ===================== icons =====================
const IC = {
  read:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5c2.8-1 5.8-1 9 1v13c-3.2-2-6.2-2-9-1z"/><path d="M21 5.5c-2.8-1-5.8-1-9 1v13c3.2-2 6.2-2 9-1z"/></svg>',
  explore:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="2.6"/><circle cx="4.5" cy="6" r="1.8"/><circle cx="19.5" cy="5" r="1.8"/><circle cx="18.5" cy="18.5" r="1.8"/><circle cx="5" cy="18" r="1.8"/><path d="M6 7l4.2 3.4M17.9 6.2l-4 4M17.2 17.2l-3.4-3.4M6.5 16.8l3.6-3"/></svg>',
  index:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="8.5" cy="8" r="3.2"/><path d="M2.8 19.5c.8-3.3 3-5 5.7-5s4.9 1.7 5.7 5"/><path d="M15.5 6.5h6M15.5 10.5h6M17.5 14.5h4"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>',
  saved:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>',
  set:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></svg>',
  fwd:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="8.5" y="8.5" width="11" height="11" rx="2.2"/><path d="M15.5 8.5V6.7a2.2 2.2 0 0 0-2.2-2.2H6.7a2.2 2.2 0 0 0-2.2 2.2v6.6a2.2 2.2 0 0 0 2.2 2.2h1.8"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  minus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>',
  fit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  star:'<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/></svg>'
};

// ===================== interface text =====================
const UI = {
  en:{ app:"Bhagavad Gita", read:"Read", explore:"Explore", index:"People & ideas", indexShort:"Index", search:"Search", saved:"Saved", settings:"Display",
    lede:"The song of the Lord: Krishna's teaching to Arjuna on the field of Kurukshetra, in 18 chapters and 700 verses. Sanskrit with fresh English and Hindi translations, linked to every person and idea.",
    chapters:"Chapters", chapter:"Chapter", verse:"Verse", verses:"verses", vOf:(a,b)=>`Verse ${a} of ${b}`, readOf:(a,b)=>`${a} of ${b} read`,
    cont:"Continue reading", votd:"Verse of the day", start:"Start at the beginning", startT:"Chapter 1 opens on the battlefield, with a blind king asking what happened.",
    whoSpeaks:"Who speaks", peopleHere:"People in this chapter", ideasHere:"Ideas in this chapter", inVerse:"In this verse", people:"People & places", ideas:"Ideas", paths:"Yogas & gunas", sections:"Sections",
    often:"Often appears with", speaks:"Speaks", appears:"Appears", all:"All", inVerses:"verses", spokenBy:"verses spoken", mentionedIn:"verses mentioned", chaptersIn:"chapters",
    perChapter:"Verses by chapter", tapCh:"Tap a chapter to filter", prevCh:"Previous chapter", nextCh:"Next chapter", prev:"Previous", next:"Next",
    save:"Save", savedL:"Saved", copy:"Copy verse", copied:"Copied", copyFail:"Copying is blocked here. Select the text instead.",
    searchPh:"Search Krishna, dharma, karmaṇy… or 2.47", tryThese:"Try", none:"No matches. Try a name, an idea, a Sanskrit word or a verse number like 2.47.",
    topics:"People & ideas", versesH:"Verses", savedEmpty:"Verses you save appear here. Tap Save on any verse to keep it.", recent:"Recently read", noRecent:"Verses you open will be listed here.",
    showMore:n=>`Show ${n} more`, back:"Back", open:"Open", openCh:"Read chapter", allVerses:n=>`All ${n} verses`,
    ghint:"Pinch or scroll to zoom · drag to move · tap any dot", sanskrit:"Sanskrit", iast:"Transliteration", second:"Second translation", size:"Text size", theme:"Theme",
    language:"Language", system:"System", light:"Light", dark:"Dark", done:"Done", swipe:"Swipe left or right for the next verse",
    about:"About this text", aboutT:"Sanskrit text: Sanskrit Wikisource (sa.wikisource.org, \"भगवद्गीता\"), used under CC BY-SA 4.0, checked verse by verse against the GRETIL e-text (Göttingen), with five typing errors corrected. The transliteration is generated from that Devanagari. The English and Hindi translations were written fresh for this project with AI assistance. 700 verses, as in Wikisource and GRETIL.",
    proto:"Beta", type:{chapter:"Chapter",person:"Person / place",concept:"Idea",path:"Yoga",guna:"Guna",section:"Section"},
    leg:{krishna:"Krishna",arjuna:"Arjuna",sanjaya:"Sanjaya",hub:"Person / idea"} },
  hi:{ app:"भगवद्गीता", read:"पढ़ें", explore:"नक्शा", index:"पात्र और विचार", indexShort:"सूची", search:"खोजें", saved:"सहेजे", settings:"प्रदर्शन",
    lede:"भगवान का गीत: कुरुक्षेत्र में कृष्ण का अर्जुन को उपदेश, 18 अध्यायों और 700 श्लोकों में। संस्कृत के साथ नए हिंदी और अंग्रेज़ी अनुवाद, हर पात्र और विचार से जुड़े।",
    chapters:"अध्याय", chapter:"अध्याय", verse:"श्लोक", verses:"श्लोक", vOf:(a,b)=>`श्लोक ${a} / ${b}`, readOf:(a,b)=>`${b} में से ${a} पढ़े`,
    cont:"पढ़ना जारी रखें", votd:"आज का श्लोक", start:"शुरुआत से पढ़ें", startT:"पहला अध्याय युद्धभूमि पर खुलता है, जहाँ एक अंधे राजा पूछते हैं कि क्या हुआ।",
    whoSpeaks:"कौन बोलता है", peopleHere:"इस अध्याय के पात्र", ideasHere:"इस अध्याय के विचार", inVerse:"इस श्लोक में", people:"पात्र और स्थान", ideas:"विचार", paths:"योग और गुण", sections:"खंड",
    often:"अक्सर साथ में", speaks:"वक्ता", appears:"उल्लेख", all:"सभी", inVerses:"श्लोक", spokenBy:"श्लोक बोले", mentionedIn:"श्लोकों में उल्लेख", chaptersIn:"अध्याय",
    perChapter:"अध्याय के अनुसार श्लोक", tapCh:"छाँटने के लिए अध्याय चुनें", prevCh:"पिछला अध्याय", nextCh:"अगला अध्याय", prev:"पिछला", next:"अगला",
    save:"सहेजें", savedL:"सहेजा गया", copy:"श्लोक कॉपी करें", copied:"कॉपी हो गया", copyFail:"यहाँ कॉपी नहीं हो सकता। पाठ चुनकर कॉपी करें।",
    searchPh:"खोजें: कृष्ण, धर्म, कर्म… या 2.47", tryThese:"आज़माएँ", none:"कुछ नहीं मिला। कोई नाम, विचार, संस्कृत शब्द या 2.47 जैसी श्लोक संख्या आज़माएँ।",
    topics:"पात्र और विचार", versesH:"श्लोक", savedEmpty:"आप जो श्लोक सहेजेंगे, वे यहाँ दिखेंगे। किसी भी श्लोक पर 'सहेजें' दबाएँ।", recent:"हाल में पढ़े", noRecent:"आप जो श्लोक खोलेंगे, वे यहाँ दिखेंगे।",
    showMore:n=>`${n} और दिखाएँ`, back:"वापस", open:"खोलें", openCh:"अध्याय पढ़ें", allVerses:n=>`सभी ${n} श्लोक`,
    ghint:"ज़ूम के लिए पिंच या स्क्रॉल करें · खींचकर घुमाएँ · किसी भी बिंदु को छुएँ", sanskrit:"संस्कृत", iast:"लिप्यंतरण", second:"दूसरा अनुवाद", size:"अक्षर का आकार", theme:"थीम",
    language:"भाषा", system:"सिस्टम", light:"हल्की", dark:"गहरी", done:"ठीक है", swipe:"अगले श्लोक के लिए बाएँ या दाएँ स्वाइप करें",
    about:"इस पाठ के बारे में", aboutT:"संस्कृत पाठ: संस्कृत विकिस्रोत (sa.wikisource.org, \"भगवद्गीता\"), CC BY-SA 4.0 के अंतर्गत, गॉटिंगेन के GRETIL पाठ से श्लोक-दर-श्लोक मिलाकर, पाँच टंकण त्रुटियाँ सुधारी गईं। लिप्यंतरण इसी देवनागरी से बनाया गया है। हिंदी और अंग्रेज़ी अनुवाद इस परियोजना के लिए AI की सहायता से नए लिखे गए हैं। विकिस्रोत और GRETIL की तरह 700 श्लोक।",
    proto:"बीटा", type:{chapter:"अध्याय",person:"व्यक्ति / स्थान",concept:"विचार",path:"योग",guna:"गुण",section:"खंड"},
    leg:{krishna:"कृष्ण",arjuna:"अर्जुन",sanjaya:"संजय",hub:"पात्र / विचार"} }
};
Object.assign(UI.en, {
  forallT:"Gita for all", forallLede:"For someone opening the Gita for the first time, and for someone who has read it many times.",
  forall:[["New to it?","Start at Chapter 1 and read the story verse by verse in simple Hindi or English."],
    ["Know it well?","Jump to any shloka, read the Sanskrit beside the translation, or follow one person or idea through all the verses."],
    ["Curious?",'Tap <a href="#t-karna">Karna</a> to read every scene he is in, or tap <a href="#t-dharma">dharma</a> to read every verse that teaches it.']],
  forallNote:"The translations are new and written to be easy to read. Suggestions and corrections are welcome.", aboutLink:"About this project →",
  startR:"Start reading", startSub:"Chapter 1, verse 1", contL:"Continue", readCtx:"Read in context →", share:"Share", linkCopied:"Verse and link copied",
  howT:"How to use", aboutPage:"About this project",
  suggest:'Spotted a mistake or have a better translation? <a href="https://github.com/gitagraph/gitagraph.github.io/issues" target="_blank" rel="noopener">Tell us on GitHub</a>.',
  how:[["Read",["<b>Start reading</b> opens Chapter 1, verse 1. Use <b>Next →</b> under a verse, or the <b>›</b> arrow at the top, to go verse by verse.",
      "Each verse shows the Sanskrit, how to say it, and its meaning. Tap <b>हि / EN</b> at the top to switch language. <b>Display</b> sets text size, theme and what is shown.",
      "Tap <b>Save</b> to keep a verse. Your saved verses are under <b>Saved</b>."]],
    ["Explore the map",["Open <b>Explore</b>. Every dot is a shloka. Its colour shows who is speaking: Krishna, Arjuna, Sanjaya, Dhritarashtra or Duryodhana.",
      "Pinch or scroll to zoom in and out, and drag to move around. The <b>⤢</b> button shows everything again.",
      "Tap a <b>chapter</b> on the ring, then <b>Read chapter</b>, to read it from start to end.",
      "Tap a <b>person</b>, like Karna, to read every scene they are in.",
      "Tap an <b>idea</b>, like dharma or karma, to read every verse that speaks of it."]],
    ["Find",["Open <b>Search</b> and type a name, an idea, a Sanskrit word, or a verse number like <b>2.47</b>.",
      "<b>Index</b> lists every person and idea, with how many verses each appears in."]]]
});
Object.assign(UI.hi, {
  forallT:"सबके लिए गीता", forallLede:"उनके लिए जो पहली बार गीता खोल रहे हैं, और उनके लिए भी जो इसे कई बार पढ़ चुके हैं।",
  forall:[["पहली बार?","अध्याय 1 से शुरू करें और सरल हिंदी या अंग्रेज़ी में कहानी श्लोक-दर-श्लोक पढ़ें।"],
    ["पहले से परिचित?","किसी भी श्लोक पर जाएँ, संस्कृत को अनुवाद के साथ पढ़ें, या किसी एक पात्र या विचार को सभी श्लोकों में खोजें।"],
    ["जिज्ञासु?",'<a href="#t-karna">कर्ण</a> पर टैप करके उनके सभी प्रसंग पढ़ें, या <a href="#t-dharma">धर्म</a> पर टैप करके उसे सिखाने वाले सभी श्लोक।']],
  forallNote:"अनुवाद नए हैं और सरल भाषा में लिखे गए हैं। सुझाव और सुधार का स्वागत है।", aboutLink:"इस परियोजना के बारे में →",
  startR:"पढ़ना शुरू करें", startSub:"अध्याय 1, श्लोक 1", contL:"जारी रखें", readCtx:"संदर्भ में पढ़ें →", share:"साझा करें", linkCopied:"श्लोक और लिंक कॉपी हो गए",
  howT:"कैसे उपयोग करें", aboutPage:"इस परियोजना के बारे में",
  suggest:'कोई त्रुटि दिखी या बेहतर अनुवाद सुझाना है? <a href="https://github.com/gitagraph/gitagraph.github.io/issues" target="_blank" rel="noopener">GitHub पर बताएँ</a>।',
  how:[["पढ़ें",["<b>पढ़ना शुरू करें</b> दबाएँ, अध्याय 1 का पहला श्लोक खुलेगा। श्लोक के नीचे <b>अगला →</b> या ऊपर <b>›</b> से श्लोक-दर-श्लोक आगे बढ़ें।",
      "हर श्लोक में संस्कृत, उसका उच्चारण और अर्थ है। ऊपर <b>हि / EN</b> से भाषा बदलें। <b>प्रदर्शन</b> में अक्षर का आकार, थीम और क्या दिखे, चुनें।",
      "<b>सहेजें</b> से श्लोक सहेजें। सहेजे गए श्लोक <b>सहेजे</b> में मिलेंगे।"]],
    ["नक्शा देखें",["<b>नक्शा</b> खोलें। हर बिंदु एक श्लोक है। रंग बताता है कि कौन बोल रहा है: श्रीकृष्ण, अर्जुन, संजय, धृतराष्ट्र या दुर्योधन।",
      "पिंच या स्क्रॉल करके ज़ूम करें, खींचकर नक्शा घुमाएँ। <b>⤢</b> से फिर पूरा नक्शा दिखेगा।",
      "घेरे पर किसी <b>अध्याय</b> को टैप करें, फिर <b>अध्याय पढ़ें</b>, और पूरा अध्याय शुरू से पढ़ें।",
      "किसी <b>पात्र</b>, जैसे कर्ण, पर टैप करें और उनके सभी प्रसंग पढ़ें।",
      "किसी <b>विचार</b>, जैसे धर्म या कर्म, पर टैप करें और उससे जुड़े सभी श्लोक पढ़ें।"]],
    ["खोजें",["<b>खोजें</b> खोलें और कोई नाम, विचार, संस्कृत शब्द या श्लोक संख्या, जैसे <b>2.47</b>, लिखें।",
      "<b>सूची</b> में हर पात्र और विचार है, और वे कितने श्लोकों में आते हैं।"]]]
});
const SITE = window.APP_SITE || "https://gitagraph.github.io/";

// ===================== storage (best effort) =====================
const store = {
  get(k,d){ try{ const v = localStorage.getItem("gita-"+k); return v==null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem("gita-"+k, JSON.stringify(v)); }catch(e){} }
};
let lang = store.get("lang","en"); if(lang!=="en" && lang!=="hi") lang = "en";
const prefs = Object.assign({sa:true, iast:true, other:false, size:1, theme:"system"}, store.get("prefs",{}));
const savedSet = new Set(store.get("saved",[]));
const readSet = new Set(store.get("read",[]));
let recent = store.get("recent",[]);

// ===================== data =====================
let V = [], VB = new Map(), H = [], HB = new Map(), CH = [];
const u = () => UI[lang];
const isHi = () => lang==="hi";
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const dev = n => String(n).replace(/\d/g, d => "०१२३४५६७८९"[d]);
const name = h => h ? (isHi() ? (h.hl || h.label) : h.label) : "";
const metaOf = h => h.type==="chapter" ? `${u().chapter} ${h.num} · ${h.vs.length} ${u().verses}` : (isHi() ? (h.hm || h.meta || "") : (h.meta || ""));
const descOf = h => isHi() ? (h.hd || h.desc) : h.desc;
const tr = v => isHi() ? v.hi : v.en;
const tr2 = v => isHi() ? v.en : v.hi;
const voice = v => v.vo || v.sp;

function prepare(verses, hubs){
  H = hubs; H.forEach(h => { h.vs = []; h.speak = []; h.co = new Map(); h.chc = new Array(19).fill(0); HB.set(h.id, h); });
  CH = H.filter(h => h.type==="chapter").sort((a,b)=>a.num-b.num);
  V = verses;
  V.forEach((v,i) => {
    v.i = i; v.id = `v${v.c}-${v.v}`; v.ref = `${v.c}.${v.v}`; VB.set(v.ref, v);
    const set = new Set([voice(v), ...(v.vo ? [v.sp] : []), ...v.p, ...v.k].filter(id => HB.has(id)));
    v.tags = [...set];
    HB.get("ch"+v.c).vs.push(v);
    v.tags.forEach(id => { const h = HB.get(id); h.vs.push(v); h.chc[v.c]++; if(id===voice(v)) h.speak.push(v); });
    v.tags.forEach(a => v.tags.forEach(b => { if(a!==b){ const m = HB.get(a).co; m.set(b,(m.get(b)||0)+1); } }));
    // searchable text
    v.s_en = (v.en||"").toLowerCase(); v.s_tr = norm(v.tr||""); v.s_dev = (v.sa||"") + " " + (v.hi||"");
  });
  H.forEach(h => { h.s = norm([h.label,h.meta,h.hl].join(" ")) + " " + (h.skt||"") + " " + (h.hl||""); });
}
// transliteration-tolerant matching: kṛṣṇa, krishna and krsna all meet at "krsna"
function norm(s){
  return String(s).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()
    .replace(/sh/g,"s").replace(/ri/g,"r").replace(/aa/g,"a").replace(/ee/g,"i").replace(/oo/g,"u").replace(/w/g,"v").replace(/[^a-z0-9ऀ-ॿ ]/g," ");
}
function saLines(v){
  const lines = v.sa.split("\n").map(s=>s.trim()).filter(Boolean);
  let uvaca = "";
  if(lines.length > 1 && /(उवाच|ुवाच)\s*[|।]?\s*$/.test(lines[0])){ uvaca = lines.shift().replace(/[|।]/g,"").trim(); }
  const body = lines.map(l => l.replace(/\s*\|\|\s*([०-९]+)-([०-९]+)\s*\|\|/, "\u00a0॥\u00a0$1.$2\u00a0॥").replace(/\|\|/g,"॥").replace(/\|/g,"।"));
  return {uvaca, body};
}
function trLines(v){
  const lines = v.tr.split("\n").map(s=>s.trim()).filter(Boolean);
  if(lines.length > 1 && /uvāca\s*[|।]?\s*$/.test(lines[0])) lines.shift();
  return lines.map(l => l.replace(/\|\|\s*\d+-\d+\s*\|\|/, "॥").replace(/\|\|/g,"॥").replace(/\|/g,"।"));
}

// ===================== shell =====================
const NAV = [["home","read",IC.read],["explore","explore",IC.explore],["index","index",IC.index],["search","search",IC.search],["saved","saved",IC.saved]];
function section(route){ return route.name==="explore" ? "explore" : route.name==="index" || route.name==="topic" ? "index" : route.name==="search" ? "search" : route.name==="saved" ? "saved" : "home"; }
function drawShell(route){
  const sec = section(route);
  document.getElementById("rail").innerHTML = `<div class="brand" aria-hidden="true">ॐ</div>` +
    NAV.map(([t,k,ic]) => `<a href="#${t}" ${sec===t?'aria-current="page"':""}><span class="ico">${ic}</span>${esc(k==="index"?u().indexShort:u()[k])}</a>`).join("") +
    `<div class="spacer"></div><button type="button" id="railset"><span class="ico">${IC.set}</span>${esc(u().settings)}</button>`;
  document.getElementById("tabs").innerHTML = NAV.map(([t,k,ic]) =>
    `<a href="#${t}" ${sec===t?'aria-current="page"':""}><span class="ico">${ic}</span>${esc(k==="index"?u().indexShort:u()[k])}</a>`).join("");
  const curCh = route.name==="chapter" ? route.c : route.name==="verse" ? route.v.c : 0;
  document.getElementById("side").innerHTML = `<h2>${esc(u().chapters)}</h2><ol>` + CH.map(c => {
    const read = c.vs.filter(v=>readSet.has(v.ref)).length;
    return `<li><a href="#c${c.num}" ${curCh===c.num?'aria-current="true"':""}><span class="n">${dev(c.num)}</span><span>${esc(name(c))}</span><span class="c">${read?`${read}/`:""}${c.vs.length}</span></a></li>`;
  }).join("") + `</ol>`;
  document.getElementById("railset").onclick = openSettings;
  const back = document.getElementById("back");
  back.hidden = route.name==="home" || route.name==="explore" || route.name==="index" || route.name==="search" || route.name==="saved";
  back.innerHTML = IC.back; back.setAttribute("aria-label", u().back);
  // forward goes to the next page in reading order: next verse, or a chapter's first verse
  const fwd = document.getElementById("fwd");
  const nxt = route.name==="verse" ? V[route.v.i+1] : route.name==="chapter" ? CH[route.c-1].vs[0] : null;
  fwd.hidden = !nxt; fwd.innerHTML = IC.fwd;
  if(nxt){ fwd.href = link(nxt.id); fwd.setAttribute("aria-label", `${u().next}: ${nxt.ref}`); fwd.title = `${u().next}: ${nxt.ref}`; }
  document.getElementById("setbtn").innerHTML = IC.set;
  document.getElementById("helpbtn").setAttribute("aria-label", u().howT); document.getElementById("helpbtn").title = u().howT;
  document.getElementById("langbtn").textContent = isHi() ? "EN" : "हि";
  document.getElementById("langbtn").setAttribute("aria-label", isHi() ? "Switch to English" : "हिन्दी में देखें");
}
document.getElementById("back").onclick = () => { if(history.length > 1) history.back(); else go("home"); };
document.getElementById("langbtn").onclick = () => setLang(isHi() ? "en" : "hi");
document.getElementById("setbtn").onclick = openSettings;
document.getElementById("helpbtn").onclick = () => sheet(`<h2>${esc(u().howT)}</h2>${howBody()}<div class="row"><span></span><button class="btn primary" data-close>${esc(u().done)}</button></div>`);
window.addEventListener("scroll", () => document.getElementById("top").classList.toggle("scrolled", window.scrollY > 4), {passive:true});

function setLang(l){ lang = l; store.set("lang", l); document.documentElement.lang = l; render(true); }
function applyPrefs(boot){
  document.documentElement.style.setProperty("--scale", prefs.size);
  if(prefs.theme==="system"){ if(!boot) document.documentElement.removeAttribute("data-theme"); }
  else document.documentElement.setAttribute("data-theme", prefs.theme);
  store.set("prefs", prefs);
}

// ===================== router =====================
function parse(h){
  h = (h||"").replace(/^#/,"") || "home";
  let m;
  if((m = /^c(\d{1,2})$/.exec(h)) && +m[1]>=1 && +m[1]<=18) return {name:"chapter", c:+m[1]};
  if((m = /^v(\d{1,2})-(\d{1,2})$/.exec(h)) && VB.has(`${m[1]}.${m[2]}`)) return {name:"verse", v:VB.get(`${m[1]}.${m[2]}`)};
  if((m = /^t-([a-z0-9]+)$/.exec(h)) && HB.has(m[1])) return {name:"topic", h:HB.get(m[1])};
  if(["explore","index","search","saved","about"].includes(h)) return {name:h};
  return {name:"home"};
}
// Two link modes: the built site sets window.APP_BASE and uses real paths (/chapter/2/verse/47/);
// the Artifact preview has no APP_BASE and keeps #tokens.  Templates always write "#token".
const BASE = window.APP_BASE || "";
const VER = window.APP_VER ? "?v=" + window.APP_VER : "";   // build stamp on the built site; empty in the preview
const PATHS = {home:"", explore:"explore/", index:"people-and-ideas/", search:"search/", saved:"saved/", about:"about/"};
function pathOf(t){
  let m;
  if(t in PATHS) return BASE + PATHS[t];
  if((m = /^c(\d+)$/.exec(t))) return `${BASE}chapter/${m[1]}/`;
  if((m = /^v(\d+)-(\d+)$/.exec(t))) return `${BASE}chapter/${m[1]}/verse/${m[2]}/`;
  if((m = /^t-([a-z0-9]+)$/.exec(t))) return `${BASE}topic/${m[1]}/`;
  return BASE;
}
function tokenOf(path){
  let p = path.startsWith(BASE) ? path.slice(BASE.length) : "", m;
  p = p.replace(/index\.html$/,"").replace(/\/+$/,"");
  if((m = /^chapter\/(\d+)\/verse\/(\d+)$/.exec(p))) return `v${m[1]}-${m[2]}`;
  if((m = /^chapter\/(\d+)$/.exec(p))) return `c${m[1]}`;
  if((m = /^topic\/([a-z0-9]+)$/.exec(p))) return `t-${m[1]}`;
  const hit = Object.entries(PATHS).find(([k,v]) => v && v.replace(/\/$/,"")===p);
  return hit ? hit[0] : "home";
}
const link = t => BASE ? pathOf(t) : "#" + t;
const curToken = () => BASE ? tokenOf(location.pathname) : (location.hash.slice(1) || "home");
let current = null;
function go(t){
  if(curToken()===t){ render(); return; }
  if(BASE){ history.pushState(null, "", pathOf(t)); render(); } else location.hash = t;
}
if(BASE){
  window.addEventListener("popstate", () => render());
  // turn every "#token" link the templates write into a real path
  const fix = n => { if(n.matches && n.matches('a[href^="#"]')) n.setAttribute("href", pathOf(n.getAttribute("href").slice(1)));
    if(n.querySelectorAll) n.querySelectorAll('a[href^="#"]').forEach(a => a.setAttribute("href", pathOf(a.getAttribute("href").slice(1)))); };
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if(n.nodeType===1) fix(n); }))).observe(document.body, {childList:true, subtree:true});
  fix(document.body);
  // follow internal links without reloading the page
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest("a[href]");
    if(!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
    const url = new URL(a.getAttribute("href"), location.href);
    if(url.origin !== location.origin || !url.pathname.startsWith(BASE) || /\.[a-z]+$/.test(url.pathname)) return;
    e.preventDefault(); go(tokenOf(url.pathname));
  });
} else window.addEventListener("hashchange", () => render());
function render(keepScroll){
  if(!V.length) return;
  const route = parse(curToken());
  const key = curToken();
  const same = current && current.key===key;
  const firstRender = !current;
  const run = () => {
    current = route; route.key = key; drawShell(route);
    const view = document.getElementById("view");
    const ttl = document.getElementById("ttl");
    stopGraph();
    if(route.name==="home"){ ttl.textContent = u().app; view.innerHTML = page(homeView(), homeCtx()); wireHome(); }
    else if(route.name==="chapter"){ const c = CH[route.c-1]; ttl.textContent = `${u().chapter} ${c.num} · ${name(c)}`; view.innerHTML = page(chapterView(c), chapterCtx(c)); }
    else if(route.name==="verse"){ const v = route.v; ttl.textContent = `${u().verse} ${v.ref}`; view.innerHTML = page(verseView(v), verseCtx(v)); markRead(v); wireVerse(v); }
    else if(route.name==="topic"){ const h = route.h; if(lastTopic !== h.id){ tFilter = {mode:"all", ch:0}; lastTopic = h.id; } ttl.textContent = name(h); view.innerHTML = page(topicView(h), topicCtx(h)); wireTopic(h); }
    else if(route.name==="index"){ ttl.textContent = u().index; view.innerHTML = page(indexView(), aboutCtx()); wireIndex(); }
    else if(route.name==="search"){ ttl.textContent = u().search; view.innerHTML = page(searchView(), aboutCtx()); wireSearch(); }
    else if(route.name==="saved"){ ttl.textContent = u().saved; view.innerHTML = page(savedView(), aboutCtx()); }
    else if(route.name==="about"){ ttl.textContent = u().aboutPage; view.innerHTML = page(aboutView(), homeCtx()); }
    else if(route.name==="explore"){ ttl.textContent = u().explore; view.innerHTML = exploreView(); startGraph(); }
    wireCommon();
    // a built page arrives with its own search-friendly title; keep it until the reader moves on
    if(!(BASE && firstRender)) document.title = route.name==="home" ? (isHi() ? "भगवद्गीता · संस्कृत, हिंदी और अंग्रेज़ी" : "Bhagavad Gita · Sanskrit, English and Hindi") : `${ttl.textContent} · ${isHi() ? "भगवद्गीता" : "Bhagavad Gita"}`;
    if(!(keepScroll || same)) window.scrollTo(0,0);
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(document.startViewTransition && !reduce && !same && current) document.startViewTransition(run); else run();
}
const page = (main, ctx) => `<div class="page"><div class="content">${main}</div><aside class="ctx">${ctx}</aside></div>`;

// ===================== components =====================
function verseRow(v, opts={}){
  const s = saLines(v);
  const q = opts.q;
  const txt = q ? hl(tr(v), q) : esc(tr(v));
  const sp = HB.get(voice(v));
  return `<li><a class="vrow" href="#${v.id}">
    <span class="rf">${v.ref}<span class="marks">${readSet.has(v.ref)?'<i class="seen" title="read"></i>':""}${savedSet.has(v.ref)?IC.star:""}</span></span>
    <span>${opts.who ? `<span class="who"><i class="dot d-${voice(v)}"></i>${esc(name(sp))}</span>` : ""}
      ${prefs.sa ? `<p class="sa">${esc(s.body[0])}${s.body.length>1?"…":""}</p>` : ""}
      <p class="tx" lang="${lang}">${txt}</p></span></a></li>`;
}
function hl(text, q){
  const t = esc(text); if(!q || q.length < 2) return t;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if(i < 0) return t;
  return esc(text.slice(0,i)) + "<mark>" + esc(text.slice(i,i+q.length)) + "</mark>" + esc(text.slice(i+q.length));
}
function topicRows(list, countFn){
  return `<div class="box">` + list.map(h => `<a class="crow" href="#t-${h.id}"><i class="dot d-${h.type}"></i><span class="nm">${esc(name(h))}</span><span class="ct">${countFn(h)}</span><span class="mt">${esc(metaOf(h))}</span></a>`).join("") + `</div>`;
}
function aboutCtx(){
  return `<h3>${esc(u().about)}</h3><p class="about">${esc(u().aboutT)}</p><p class="about" style="margin-top:10px"><span class="proto">${esc(u().proto)}</span></p>`;
}
const listMore = (id, rows, n) => rows.length > n ? `<button class="btn more" data-more="${id}">${esc(u().showMore(rows.length - n))}</button>` : "";

// ===================== home =====================
// Verse of the day: the same verse for everyone on a given date in India (IST). The pool skips
// chapter 1 (the battlefield roll and Arjuna's lists of kin), narration by Sanjaya, Dhritarashtra
// and Duryodhana, and any verse naming three or more people, then steps through it in a fixed
// scrambled order so consecutive days land in different chapters.
let VPOOL = null, VSTEP = 1;
function votd(){
  if(!VPOOL){
    VPOOL = V.filter(v => v.c !== 1 && !["sanjaya","dhrit","duryo"].includes(voice(v)) && v.tags.filter(id => HB.get(id).type==="person").length < 3);
    const gcd = (a,b) => b ? gcd(b, a % b) : a;
    VSTEP = [97,101,103,107,109].find(k => gcd(k, VPOOL.length)===1);
  }
  const day = Math.floor((Date.now() + 5.5*3600e3) / 864e5);
  return VPOOL[(day * VSTEP) % VPOOL.length];
}
const howBody = () => `<div class="howbody">${u().how.map(([h,items]) => `<h3>${esc(h)}</h3><ul>${items.map(i=>`<li>${i}</li>`).join("")}</ul>`).join("")}</div>`;
const verseUrl = v => BASE ? location.origin + pathOf(v.id) : `${SITE}chapter/${v.c}/verse/${v.v}/`;
function homeView(){
  const last = recent.length ? VB.get(recent[0]) : null;
  const vd = votd(), s = saLines(vd);
  let how = store.get("how", null);
  if(how===null) store.set("how", "closed");          // open by itself on the first visit only
  return `<section class="hero"><p class="skt">श्रीमद्भगवद्गीता</p><h1>${isHi() ? "भगवद्गीता" : "The Bhagavad Gita"}</h1></section>
  <section class="forall"><h2>${esc(u().forallT)}</h2><p class="lede2">${esc(u().forallLede)}</p>
    <ul>${u().forall.map(([b,t]) => `<li><b>${esc(b)}</b> ${t}</li>`).join("")}</ul>
    <p class="note"><i>${esc(u().forallNote)}</i> · <a href="#about">${esc(u().aboutLink)}</a></p></section>
  ${last ? `<a class="contbar" href="#${last.id}"><span><b>${esc(u().contL)}</b> · ${last.ref} ${esc(name(CH[last.c-1]))}</span><span aria-hidden="true">→</span></a>` : ""}
  <section class="votd" aria-label="${esc(u().votd)}"><p class="eyebrow">${esc(u().votd)} · ${vd.ref}</p>
    ${prefs.sa ? `<p class="sa" lang="sa">${s.body.map(esc).join("<br>")}</p>` : ""}
    <p class="tx" lang="${lang}">${esc(tr(vd))}</p>
    <div class="row"><a class="btn primary" href="#${vd.id}">${esc(u().readCtx)}</a><button class="btn" id="sharebtn" data-ref="${vd.ref}">${esc(u().share)}</button></div></section>
  ${last ? "" : `<a class="btn primary startbtn" href="#v1-1">${esc(u().startR)} <small>· ${esc(u().startSub)}</small></a>`}
  <h2 class="sec">${esc(u().chapters)}</h2>
  <ol class="chgrid">${CH.map(c => {
    const r = c.vs.filter(v=>readSet.has(v.ref)).length;
    return `<li><a class="chcard" href="#c${c.num}"><span class="num" aria-hidden="true">${dev(c.num)}</span>
      <span class="lab">${esc(u().chapter)} ${c.num}</span><span class="nm">${esc(name(c))}</span><span class="sk">${esc(c.skt)}</span>
      <span class="foot"><span class="prog"><i style="width:${(r/c.vs.length*100).toFixed(1)}%"></i></span>${r ? esc(u().readOf(r,c.vs.length)) : `${c.vs.length} ${esc(u().verses)}`}</span></a></li>`;
  }).join("")}</ol>
  <details class="how" id="how" ${how===null || how==="open" ? "open" : ""}><summary>${esc(u().howT)}</summary>${howBody()}</details>`;
}
function wireHome(){
  const d = document.getElementById("how");
  // record only the reader's own clicks: browsers also fire "toggle" when an open <details> is first drawn
  if(d) d.querySelector("summary").addEventListener("click", () => store.set("how", d.open ? "closed" : "open"));
  const sb = document.getElementById("sharebtn");
  if(sb) sb.onclick = () => {
    const v = VB.get(sb.dataset.ref), url = verseUrl(v);
    const text = `${tr(v)} — ${isHi() ? "भगवद्गीता" : "Bhagavad Gita"} ${v.ref}`;
    const copy = () => { try{ navigator.clipboard.writeText(`${text}\n${url}`).then(()=>toast(u().linkCopied), ()=>toast(u().copyFail)); }catch(e){ toast(u().copyFail); } };
    if(navigator.share) navigator.share({title:`${isHi() ? "भगवद्गीता" : "Bhagavad Gita"} ${v.ref}`, text, url}).catch(err => { if(err && err.name !== "AbortError") copy(); });
    else copy();
  };
}
function aboutView(){
  return `<header class="thead"><h1>${esc(u().aboutPage)}</h1></header>
  <p class="desc" lang="${lang}" style="font-family:var(--f-read);line-height:1.7;max-width:62ch">${esc(u().forallLede)}</p>
  <h2 class="sec">${esc(u().about)}</h2><p style="line-height:1.7;max-width:62ch">${esc(u().aboutT)}</p>
  <p style="line-height:1.7;max-width:62ch"><i>${esc(u().forallNote)}</i> ${u().suggest}</p>`;
}
function homeCtx(){
  const people = H.filter(h=>h.type==="person").sort((a,b)=>b.vs.length-a.vs.length).slice(0,6);
  const ideas = H.filter(h=>h.type==="concept").sort((a,b)=>b.vs.length-a.vs.length).slice(0,6);
  return `<h3>${esc(u().people)}</h3>${topicRows(people, h=>h.vs.length)}<h3>${esc(u().ideas)}</h3>${topicRows(ideas, h=>h.vs.length)}${aboutCtx()}`;
}

// ===================== chapter =====================
function speakerMix(list){
  const m = new Map(); list.forEach(v => m.set(voice(v), (m.get(voice(v))||0)+1));
  return [...m.entries()].sort((a,b)=>b[1]-a[1]);
}
function chapterView(c){
  const mix = speakerMix(c.vs), n = c.vs.length;
  const prev = c.num > 1 ? CH[c.num-2] : null, next = c.num < 18 ? CH[c.num] : null;
  return `<header class="chhead"><p class="bignum skt" aria-hidden="true">${dev(c.num)}</p>
    <p class="eyebrow">${esc(u().chapter)} ${c.num} · ${n} ${esc(u().verses)}</p>
    <h1>${esc(name(c))}</h1><p class="sk">${esc(c.skt)}</p><p class="desc" lang="${lang}">${esc(descOf(c))}</p>
    <div class="spkbar" aria-hidden="true">${mix.map(([id,k]) => `<i class="d-${id}" style="width:${(k/n*100).toFixed(2)}%"></i>`).join("")}</div>
    <div class="spkleg">${mix.map(([id,k]) => `<span><i class="dot d-${id}"></i>${esc(name(HB.get(id)))} ${k}</span>`).join("")}</div></header>
  <ol class="vlist" id="vl">${c.vs.map(v => verseRow(v,{who:mix.length>1})).join("")}</ol>
  <nav class="pager">${prev ? `<a class="btn" href="#c${prev.num}">${IC.back}<span>${prev.num}. ${esc(name(prev))}</span></a>` : "<span></span>"}
    ${next ? `<a class="btn" href="#c${next.num}"><span>${next.num}. ${esc(name(next))}</span><span style="transform:rotate(180deg);display:inline-flex">${IC.back}</span></a>` : ""}</nav>`;
}
function topIn(list, types, n){
  const m = new Map(); list.forEach(v => v.tags.forEach(id => { const h = HB.get(id); if(types.includes(h.type)) m.set(id,(m.get(id)||0)+1); }));
  return [...m.entries()].sort((a,b)=>b[1]-a[1]).slice(0,n).map(([id,k]) => ({h:HB.get(id), k}));
}
function chapterCtx(c){
  const ppl = topIn(c.vs, ["person"], 7), ide = topIn(c.vs, ["concept","guna","path"], 8);
  const row = ({h,k}) => `<a class="crow" href="#t-${h.id}"><i class="dot d-${h.type}"></i><span class="nm">${esc(name(h))}</span><span class="ct">${k}</span><span class="mt">${esc(metaOf(h))}</span></a>`;
  return (ppl.length ? `<h3>${esc(u().peopleHere)}</h3><div class="box">${ppl.map(row).join("")}</div>` : "") +
         (ide.length ? `<h3>${esc(u().ideasHere)}</h3><div class="box">${ide.map(row).join("")}</div>` : "");
}

// ===================== verse =====================
function verseView(v){
  const c = CH[v.c-1], s = saLines(v), sp = HB.get(voice(v));
  const prev = V[v.i-1], next = V[v.i+1];
  const ppl = v.tags.map(id=>HB.get(id)).filter(h=>h.type==="person");
  const ide = v.tags.map(id=>HB.get(id)).filter(h=>h.type!=="person");
  const chip = h => `<button class="chip" data-tag="${h.id}"><i class="dot d-${h.type}"></i>${esc(name(h))}<span class="k">${h.vs.length}</span></button>`;
  const saved = savedSet.has(v.ref);
  return `<article class="verse" id="verse">
    <div class="vtop"><a href="#c${c.num}">${esc(u().chapter)} ${c.num} · ${esc(name(c))}</a><span>${esc(u().vOf(v.v, c.vs.length))}</span></div>
    <h2 class="vref">${v.ref}</h2>
    <p class="speaker"><i class="dot d-${voice(v)}"></i>${esc(name(sp))}${s.uvaca ? ` <span class="uvaca">· ${esc(s.uvaca)}</span>` : ""}</p>
    ${prefs.sa ? `<p class="vsa" lang="sa">${s.body.map(l=>`<span class="ln">${esc(l)}</span>`).join("")}</p>` : ""}
    ${prefs.iast ? `<p class="viast" lang="sa-Latn">${trLines(v).map(l=>`<span class="ln">${esc(l)}</span>`).join("")}</p>` : ""}
    <p class="vtr ${isHi()?"hi":""}" lang="${lang}">${esc(tr(v))}</p>
    ${prefs.other ? `<p class="vtr2 ${isHi()?"":"hi"}" lang="${isHi()?"en":"hi"}"><b>${isHi()?"EN":"हिन्दी"}</b>${esc(tr2(v))}</p>` : ""}
    <div class="vactions">
      <button class="btn ${saved?"on":""}" id="savebtn" aria-pressed="${saved}">${IC.saved}<span>${esc(saved?u().savedL:u().save)}</span></button>
      <button class="btn" id="copybtn">${IC.copy}<span>${esc(u().copy)}</span></button>
    </div>
    <div class="vtags">
      ${ppl.length ? `<div class="grp"><p class="eyebrow">${esc(u().people)}</p><div class="chips">${ppl.map(chip).join("")}</div></div>` : ""}
      ${ide.length ? `<div class="grp"><p class="eyebrow">${esc(u().ideas)}</p><div class="chips">${ide.map(chip).join("")}</div></div>` : ""}
    </div>
    <nav class="vnav">
      ${prev ? `<a href="#${prev.id}"><small>← ${esc(u().prev)}</small><b>${prev.ref}</b><span class="t">${esc(tr(prev))}</span></a>` : "<span></span>"}
      ${next ? `<a class="nx" href="#${next.id}"><small>${esc(u().next)} →</small><b>${next.ref}</b><span class="t">${esc(tr(next))}</span></a>` : "<span></span>"}
    </nav>
    <span class="swipehint">${esc(u().swipe)}</span>
  </article>`;
}
function verseCtx(v){
  const tags = v.tags.map(id=>HB.get(id));
  const c = CH[v.c-1];
  return `<h3>${esc(u().inVerse)}</h3>` + topicRows(tags, h=>h.vs.length) +
    `<h3>${esc(u().chapter)} ${c.num}</h3><a class="card" href="#c${c.num}"><span class="ref">${esc(name(c))}</span><p class="tx" lang="${lang}" style="margin-top:6px;font-size:14.5px">${esc(descOf(c))}</p></a>`;
}
function markRead(v){
  readSet.add(v.ref); store.set("read",[...readSet]);
  recent = [v.ref, ...recent.filter(r=>r!==v.ref)].slice(0,30); store.set("recent",recent);
}
function wireVerse(v){
  const sb = document.getElementById("savebtn");
  sb.onclick = () => {
    if(savedSet.has(v.ref)) savedSet.delete(v.ref); else savedSet.add(v.ref);
    store.set("saved",[...savedSet]);
    const on = savedSet.has(v.ref);
    sb.classList.toggle("on", on); sb.setAttribute("aria-pressed", on); sb.querySelector("span").textContent = on ? u().savedL : u().save;
    toast(on ? u().savedL : u().save);
  };
  document.getElementById("copybtn").onclick = () => {
    const text = `${saLines(v).body.join("\n")}\n\n${tr(v)}\n\nBhagavad Gita ${v.ref}`;
    try{ navigator.clipboard.writeText(text).then(()=>toast(u().copied), ()=>toast(u().copyFail)); }catch(e){ toast(u().copyFail); }
  };
  // swipe between verses on touch screens
  const el = document.getElementById("verse"); let sx=0, sy=0, st=0;
  el.addEventListener("touchstart", e => { const t = e.touches[0]; sx=t.clientX; sy=t.clientY; st=Date.now(); }, {passive:true});
  el.addEventListener("touchend", e => {
    const t = e.changedTouches[0], dx = t.clientX-sx, dy = t.clientY-sy;
    if(Date.now()-st < 600 && Math.abs(dx) > 70 && Math.abs(dy) < 50){ const w = V[v.i + (dx<0?1:-1)]; if(w) go(w.id); }
  }, {passive:true});
}

// ===================== topic =====================
let tFilter = {mode:"all", ch:0};
function topicView(h){
  const isP = h.type==="person";
  const list = topicList(h);
  const max = Math.max(1, ...h.chc.slice(1));
  const chs = h.chc.slice(1).filter(Boolean).length;
  return `<header class="thead"><span class="pill"><i class="dot d-${h.type}"></i>${esc(u().type[h.type]||"")}</span>
    <h1>${esc(name(h))}</h1><p class="sk">${esc(h.skt||"")}</p><p class="meta">${esc(metaOf(h))}</p><p class="desc" lang="${lang}">${esc(descOf(h))}</p>
    <div class="stats">${isP && h.speak.length ? `<div><b>${h.speak.length}</b><span>${esc(u().spokenBy)}</span></div>` : ""}
      <div><b>${isP ? h.vs.length - h.speak.length : h.vs.length}</b><span>${esc(isP ? u().mentionedIn : u().inVerses)}</span></div>
      <div><b>${chs}</b><span>${esc(u().chaptersIn)}</span></div></div></header>
  <div class="striplab"><span>${esc(u().perChapter)}</span><span>${esc(u().tapCh)}</span></div>
  <div class="strip" role="group" aria-label="${esc(u().perChapter)}">${h.chc.slice(1).map((k,i) =>
    `<button data-ch="${i+1}" aria-pressed="${tFilter.ch===i+1}" title="${u().chapter} ${i+1}: ${k}" style="background:${k ? `color-mix(in srgb, var(--t-${h.type==="chapter"?"concept":h.type}) ${Math.round(18 + 82*k/max)}%, var(--sunk))` : "var(--sunk)"}"><span>${i+1}</span></button>`).join("")}</div>
  <div class="tools">${isP && h.speak.length && h.speak.length < h.vs.length ? `<div class="seg" role="group">
      <button data-mode="all" aria-pressed="${tFilter.mode==="all"}">${esc(u().all)}</button>
      <button data-mode="speaks" aria-pressed="${tFilter.mode==="speaks"}">${esc(u().speaks)}</button>
      <button data-mode="appears" aria-pressed="${tFilter.mode==="appears"}">${esc(u().appears)}</button></div>` : "<span></span>"}
    <span class="muted">${list.length} ${esc(u().verses)}</span></div>
  <ol class="vlist" id="tl">${list.slice(0,40).map(v=>verseRow(v,{who:true})).join("")}</ol>${listMore("tl", list, 40)}`;
}
function topicList(h){
  let list = h.vs;
  if(tFilter.mode==="speaks") list = h.speak;
  if(tFilter.mode==="appears") list = h.vs.filter(v => voice(v)!==h.id);
  if(tFilter.ch) list = list.filter(v => v.c===tFilter.ch);
  return list;
}
function topicCtx(h){
  const co = [...h.co.entries()].sort((a,b)=>b[1]-a[1]).slice(0,10).map(([id,k])=>({h:HB.get(id),k})).filter(x=>x.h.type!=="chapter");
  return `<h3>${esc(u().often)}</h3><div class="box">${co.map(({h:x,k}) => `<a class="crow" href="#t-${x.id}"><i class="dot d-${x.type}"></i><span class="nm">${esc(name(x))}</span><span class="ct">${k}</span><span class="mt">${esc(metaOf(x))}</span></a>`).join("")}</div>`;
}
let lastTopic = null;
function wireTopic(h){
  const rerender = () => { const y = window.scrollY; document.querySelector(".content").innerHTML = topicView(h); wireTopic(h); wireCommon(); window.scrollTo(0,y); };
  document.querySelectorAll(".strip button").forEach(b => b.onclick = () => { const c = +b.dataset.ch; tFilter.ch = tFilter.ch===c ? 0 : c; rerender(); });
  document.querySelectorAll(".tools .seg button").forEach(b => b.onclick = () => { tFilter.mode = b.dataset.mode; rerender(); });
  const mb = document.querySelector('[data-more="tl"]');
  if(mb) mb.onclick = () => { const list = topicList(h); document.getElementById("tl").innerHTML = list.map(v=>verseRow(v,{who:true})).join(""); mb.remove(); };
}

// ===================== index =====================
let iTab = store.get("itab","person");
function indexView(){
  const tabs = [["person",u().people],["concept",u().ideas],["path",u().paths]];
  const list = H.filter(h => iTab==="path" ? ["path","guna","section"].includes(h.type) : h.type===iTab).filter(h=>h.vs.length).sort((a,b)=>b.vs.length-a.vs.length);
  return `<div style="padding-top:14px"><div class="seg" role="group">${tabs.map(([k,l]) => `<button data-it="${k}" aria-pressed="${iTab===k}">${esc(l)}</button>`).join("")}</div></div>
  <ul class="ilist">${list.map(h => `<li><a class="irow" href="#t-${h.id}"><i class="dot d-${h.type}"></i>
    <span class="nm">${esc(name(h))}<span class="skt">${esc(h.skt||"")}</span></span><span class="ct"><b>${h.vs.length}</b>${esc(u().verses)}</span>
    <span class="mt">${esc(metaOf(h))}</span></a></li>`).join("")}</ul>`;
}
function wireIndex(){ document.querySelectorAll("[data-it]").forEach(b => b.onclick = () => { iTab = b.dataset.it; store.set("itab", iTab); render(true); }); }

// ===================== search =====================
let lastQ = "";
function searchView(){
  return `<div class="sbox">${IC.search}<input id="q" type="search" enterkeyhint="search" autocomplete="off" placeholder="${esc(u().searchPh)}" value="${esc(lastQ)}" aria-label="${esc(u().search)}"></div>
    <div id="sres">${lastQ ? "" : suggestions()}</div>`;
}
function suggestions(){
  const ex = isHi() ? ["कर्ण","धर्म","2.47","समत्व","काल"] : ["Karna","dharma","2.47","karmaṇy","fear"];
  return `<p class="eyebrow" style="margin:20px 0 10px">${esc(u().tryThese)}</p><div class="chips">${ex.map(x=>`<button class="chip" data-try="${esc(x)}">${esc(x)}</button>`).join("")}</div>`;
}
function runSearch(q){
  lastQ = q; const out = document.getElementById("sres");
  q = q.trim(); if(!q){ out.innerHTML = suggestions(); wireTry(); return; }
  const m = /^(\d{1,2})\s*[.:\-\s]\s*(\d{1,3})$/.exec(q);
  if(m && VB.has(`${+m[1]}.${+m[2]}`)){ const v = VB.get(`${+m[1]}.${+m[2]}`); out.innerHTML = `<h2 class="sec">${esc(u().versesH)}</h2><ol class="vlist">${verseRow(v,{who:true})}</ol>`; return; }
  const nq = norm(q).trim(), lq = q.toLowerCase(), isDev = /[ऀ-ॿ]/.test(q);
  const topics = H.filter(h => h.vs.length && (isDev ? h.s.includes(q) : h.s.includes(nq))).sort((a,b)=>b.vs.length-a.vs.length).slice(0,8);
  const verses = V.filter(v => isDev ? v.s_dev.includes(q) : (v.s_en.includes(lq) || (nq.length>=3 && v.s_tr.includes(nq))));
  if(!topics.length && !verses.length){ out.innerHTML = `<p class="empty">${esc(u().none)}</p>`; return; }
  out.innerHTML = (topics.length ? `<h2 class="sec">${esc(u().topics)}</h2><ul class="ilist">${topics.map(h => `<li><a class="irow" href="#t-${h.id}"><i class="dot d-${h.type}"></i>
      <span class="nm">${esc(name(h))}<span class="skt">${esc(h.skt||"")}</span></span><span class="ct"><b>${h.vs.length}</b>${esc(u().verses)}</span><span class="mt">${esc(metaOf(h))}</span></a></li>`).join("")}</ul>` : "") +
    (verses.length ? `<h2 class="sec">${esc(u().versesH)} · ${verses.length}</h2><ol class="vlist" id="sl">${verses.slice(0,30).map(v=>verseRow(v,{who:true,q: isHi()||isDev ? "" : q})).join("")}</ol>${listMore("sl", verses, 30)}` : "");
  const mb = document.querySelector('[data-more="sl"]');
  if(mb) mb.onclick = () => { document.getElementById("sl").innerHTML = verses.map(v=>verseRow(v,{who:true,q: isHi()||isDev ? "" : q})).join(""); mb.remove(); };
}
function wireTry(){ document.querySelectorAll("[data-try]").forEach(b => b.onclick = () => { const i = document.getElementById("q"); i.value = b.dataset.try; runSearch(i.value); }); }
function wireSearch(){
  const i = document.getElementById("q"); let t;
  i.addEventListener("input", () => { clearTimeout(t); t = setTimeout(()=>runSearch(i.value), 120); });
  if(lastQ) runSearch(lastQ); else wireTry();
  if(matchMedia("(min-width:700px)").matches) i.focus();
}

// ===================== saved =====================
function savedView(){
  const sv = V.filter(v => savedSet.has(v.ref));
  const rc = recent.map(r => VB.get(r)).filter(Boolean).slice(0,12);
  return `<h2 class="sec">${esc(u().saved)} · ${sv.length}</h2>` + (sv.length ? `<ol class="vlist">${sv.map(v=>verseRow(v,{who:true})).join("")}</ol>` : `<p class="empty">${esc(u().savedEmpty)}</p>`) +
    `<h2 class="sec">${esc(u().recent)}</h2>` + (rc.length ? `<ol class="vlist">${rc.map(v=>verseRow(v,{who:true})).join("")}</ol>` : `<p class="empty">${esc(u().noRecent)}</p>`);
}

// ===================== common wiring, sheet, toast =====================
function wireCommon(){
  document.querySelectorAll("[data-tag]").forEach(b => b.onclick = () => tagSheet(HB.get(b.dataset.tag)));
}
function tagSheet(h){
  if(matchMedia("(min-width:1320px)").matches){ go("t-"+h.id); return; }
  sheet(`<span class="pill"><i class="dot d-${h.type}"></i>${esc(u().type[h.type]||"")}</span><h2>${esc(name(h))}</h2>
    <p class="muted" style="margin:0">${esc(h.skt||"")} · ${esc(metaOf(h))}</p>
    <p style="font-family:${isHi()?"var(--f-hi)":"var(--f-read)"};line-height:1.65;margin:12px 0 16px" lang="${lang}">${esc(descOf(h))}</p>
    <a class="btn primary" href="#t-${h.id}" style="width:100%;justify-content:center">${esc(u().allVerses(h.vs.length))}</a>`);
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
    ${sw("sa", u().sanskrit)}${sw("iast", u().iast)}${sw("other", u().second)}
    <div class="row"><span class="lbl">${esc(u().size)}</span>${seg("size", [[0.9,"A−"],[1,"A"],[1.12,"A+"],[1.25,"A++"]])}</div>
    <div class="row"><span class="lbl">${esc(u().theme)}</span>${seg("theme", [["system",u().system],["light",u().light],["dark",u().dark]])}</div>
    <div class="row"><span></span><button class="btn primary" data-close>${esc(u().done)}</button></div>`);
  layer.querySelectorAll("[data-sw]").forEach(b => b.onclick = () => { const k = b.dataset.sw; prefs[k] = !prefs[k]; b.setAttribute("aria-checked", prefs[k]); applyPrefs(); render(true); });
  layer.querySelectorAll("[data-size]").forEach(b => b.onclick = () => { prefs.size = +b.dataset.size; layer.querySelectorAll("[data-size]").forEach(x=>x.setAttribute("aria-pressed", x===b)); applyPrefs(); if(current?.name==="explore") render(true); });
  layer.querySelectorAll("[data-theme]").forEach(b => b.onclick = () => { prefs.theme = b.dataset.theme; layer.querySelectorAll("[data-theme]").forEach(x=>x.setAttribute("aria-pressed", x===b)); applyPrefs(); if(graph) graph.recolor(); });
  layer.querySelectorAll("[data-lg]").forEach(b => b.onclick = () => { document.getElementById("layer").innerHTML = ""; setLang(b.dataset.lg); openSettings(); });
}
let toastT;
function toast(msg){
  let t = document.querySelector(".toast"); if(!t){ t = document.createElement("div"); t.className = "toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
  t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(()=>{ t.hidden = true; }, 1600);
}

// keyboard: / search, ←/→ or j/k verses, s save, g map
document.addEventListener("keydown", e => {
  if(e.target.closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey || document.querySelector(".scrim")) return;
  const r = current; if(!r) return;
  if(e.key==="/"){ e.preventDefault(); go("search"); }
  else if(e.key==="g"){ go("explore"); }
  else if(r.name==="verse" && (e.key==="ArrowRight" || e.key==="j")){ const w = V[r.v.i+1]; if(w) go(w.id); }
  else if(r.name==="verse" && (e.key==="ArrowLeft" || e.key==="k")){ const w = V[r.v.i-1]; if(w) go(w.id); }
  else if(r.name==="verse" && e.key==="s"){ document.getElementById("savebtn")?.click(); }
});

// ===================== explore (canvas map) =====================
let graph = null;
function exploreView(){
  return `<div class="explore" id="ex"><canvas id="cv" aria-label="${esc(u().explore)}"></canvas>
    <div class="ghint">${esc(u().ghint)}</div>
    <div class="zbtns"><button id="zin" aria-label="Zoom in">${IC.plus}</button><button id="zout" aria-label="Zoom out">${IC.minus}</button><button id="zfit" aria-label="Fit">${IC.fit}</button></div>
    <div class="legend"><span><i class="dot d-krishna"></i>${esc(u().leg.krishna)}</span><span><i class="dot d-arjuna"></i>${esc(u().leg.arjuna)}</span><span><i class="dot d-sanjaya"></i>${esc(u().leg.sanjaya)}</span><span><i class="dot d-person"></i>${esc(u().people)}</span><span><i class="dot d-concept"></i>${esc(u().ideas)}</span></div>
    <div id="gp"></div></div>`;
}
function stopGraph(){ if(graph){ graph.destroy(); graph = null; } }
function startGraph(){ graph = makeGraph(); }
const RC = 360, R0 = RC + 46, COLS = 8, ROWH = 13, SPAN = 2*Math.PI/18*0.8;
const angOf = c => -Math.PI/2 + (c-1)*2*Math.PI/18;
let layout = null;
function buildLayout(){
  const nodes = [];
  CH.forEach(c => { const a = angOf(c.num); nodes.push({h:c, kind:"chapter", x:RC*Math.cos(a), y:RC*Math.sin(a), fx:RC*Math.cos(a), fy:RC*Math.sin(a), r:15}); });
  const hubs = H.filter(h => h.type!=="chapter" && h.type!=="section" && h.vs.length);
  hubs.forEach(h => {
    // start each hub near the chapter it appears in most
    let best = 1; for(let i=1;i<=18;i++) if(h.chc[i] > h.chc[best]) best = i;
    const a = angOf(best) + (Math.random()-.5)*.3, rr = RC*(0.35 + Math.random()*0.4);
    nodes.push({h, kind:"hub", x:rr*Math.cos(a), y:rr*Math.sin(a), r: Math.max(4.5, Math.min(16, 3 + Math.sqrt(h.vs.length)*1.05))});
  });
  const idx = new Map(nodes.map((n,i)=>[n.h.id,i]));
  const links = [];
  hubs.forEach(h => { for(let i=1;i<=18;i++) if(h.chc[i]) links.push({source:idx.get(h.id), target:idx.get("ch"+i), w:h.chc[i]}); });
  const sim = d3.forceSimulation(nodes).stop()
    .force("link", d3.forceLink(links).strength(l => Math.min(.5, .03 + l.w/40)).distance(l => RC*0.55))
    .force("charge", d3.forceManyBody().strength(-45))
    .force("collide", d3.forceCollide(n => n.r + 7))
    .force("center", d3.forceRadial(RC*0.35, 0, 0).strength(n => n.kind==="hub" ? 0.04 : 0));
  for(let i=0;i<320;i++){ sim.tick(); nodes.forEach(n => { if(n.kind==="hub"){ const d = Math.hypot(n.x,n.y), lim = RC - 46; if(d > lim){ n.x *= lim/d; n.y *= lim/d; } } }); }
  const dots = V.map(v => {
    const i = v.v-1, row = Math.floor(i/COLS), col = i%COLS, a = angOf(v.c);
    const th = a - SPAN/2 + SPAN*(col+0.5)/COLS, r = R0 + row*ROWH;
    return {v, x:r*Math.cos(th), y:r*Math.sin(th)};
  });
  const nb = new Map(nodes.map(n=>[n.h.id,new Set()]));
  links.forEach(l => { nb.get(nodes[l.source.index ?? l.source].h.id).add(nodes[l.target.index ?? l.target].h.id); nb.get(nodes[l.target.index ?? l.target].h.id).add(nodes[l.source.index ?? l.source].h.id); });
  return {nodes, links, dots, nb};
}
function makeGraph(){
  if(!layout) layout = buildLayout();
  const {nodes, links, dots, nb} = layout;
  const wrap = document.getElementById("ex"), cv = document.getElementById("cv"), ctx = cv.getContext("2d");
  let W = 0, Hh = 0, dpr = 1, T = d3.zoomIdentity, sel = null, col = {};
  const recolor = () => {
    const cs = getComputedStyle(document.documentElement);
    ["--ink","--muted","--line","--surface","--accent","--mark","--t-person","--t-concept","--t-path","--t-guna","--sp-krishna","--sp-arjuna","--sp-sanjaya","--sp-dhrit","--sp-duryo"].forEach(k => col[k] = cs.getPropertyValue(k).trim());
    draw();
  };
  const fill = n => n.kind==="chapter" ? col["--accent"] : col["--t-"+n.h.type] || col["--muted"];
  const spc = v => col["--sp-"+voice(v)] || col["--muted"];
  function size(){
    const r = wrap.getBoundingClientRect(); W = r.width; Hh = r.height; dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = Math.round(W*dpr); cv.height = Math.round(Hh*dpr);
  }
  function fitT(){ const ext = R0 + 10*ROWH + 70; const k = Math.min(W, Hh) / (2*ext) * 0.98; return d3.zoomIdentity.translate(W/2, Hh/2).scale(k); }
  function draw(){
    if(!W) return;
    const k = T.k;
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,cv.width,cv.height);
    ctx.setTransform(dpr*k,0,0,dpr*k,dpr*T.x,dpr*T.y);
    const focus = sel ? new Set([sel.id, ...(nb.get(sel.id)||[])]) : null;
    const vfocus = sel && sel.type!=="chapter" && HB.get(sel.id) ? new Set(HB.get(sel.id).vs.map(v=>v.ref)) : null;
    // links
    ctx.lineWidth = 1/k;
    links.forEach(l => {
      const a = l.source, b = l.target; const on = focus && (a.h.id===sel.id || b.h.id===sel.id);
      if(focus && !on) return;
      ctx.strokeStyle = on ? col["--muted"] : col["--line"]; ctx.globalAlpha = on ? .75 : .55;
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    });
    ctx.globalAlpha = 1;
    // verse dots
    const vr = Math.max(2.4, Math.min(4.6, 3.2));
    dots.forEach(d => {
      const dim = (vfocus && !vfocus.has(d.v.ref)) || (sel && sel.type==="chapter" && d.v.c!==sel.num);
      ctx.globalAlpha = dim ? .13 : 1; ctx.fillStyle = spc(d.v);
      ctx.beginPath(); ctx.arc(d.x,d.y,vr,0,7); ctx.fill();
    });
    ctx.globalAlpha = 1;
    // nodes
    nodes.forEach(n => {
      const dim = focus && !focus.has(n.h.id);
      ctx.globalAlpha = dim ? .15 : 1; ctx.fillStyle = fill(n);
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,7); ctx.fill();
      ctx.lineWidth = (sel && sel.id===n.h.id ? 3 : 1.5)/k; ctx.strokeStyle = sel && sel.id===n.h.id ? col["--ink"] : col["--surface"]; ctx.stroke();
    });
    ctx.globalAlpha = 1;
    // labels
    ctx.textBaseline = "middle"; ctx.lineJoin = "round";
    const label = (txt, x, y, px, weight, align, color) => {
      ctx.font = `${weight} ${px/k}px Mukta, system-ui, sans-serif`; ctx.textAlign = align;
      ctx.lineWidth = 3.5/k; ctx.strokeStyle = col["--surface"]; ctx.strokeText(txt,x,y); ctx.fillStyle = color; ctx.fillText(txt,x,y);
    };
    CH.forEach(c => {
      const a = angOf(c.num), rows = Math.ceil(c.vs.length/COLS), r = R0 + rows*ROWH + 14/k + 4;
      const x = r*Math.cos(a), y = r*Math.sin(a), ca = Math.cos(a);
      const dim = sel && sel.type==="chapter" && sel.num!==c.num;
      ctx.globalAlpha = dim ? .3 : 1;
      label(k < 0.75 ? String(c.num) : `${c.num}. ${name(c)}`, x, y, k < 0.75 ? 14 : 13, 600, Math.abs(ca) < .25 ? "center" : ca > 0 ? "left" : "right", col["--accent"]);
    });
    ctx.globalAlpha = 1;
    nodes.forEach(n => {
      if(n.kind==="chapter") return;
      const show = (focus && focus.has(n.h.id)) || (!focus && (n.r*k > 9 || k > 1.7));
      if(!show) return;
      label(name(n.h), n.x, n.y + n.r + 9/k, 12.5, n.r > 9 ? 600 : 500, "center", col["--ink"]);
    });
    if(k > 2.6){
      dots.forEach(d => { const dim = (vfocus && !vfocus.has(d.v.ref)); if(dim) return; label(String(d.v.v), d.x, d.y - 7/k, 9.5, 500, "center", col["--muted"]); });
    }
  }
  function hit(px, py){
    const [x,y] = T.invert([px,py]), k = T.k, slop = 8/k;
    let best = null, bd = Infinity;
    nodes.forEach(n => { const d = Math.hypot(n.x-x, n.y-y) - n.r; if(d < slop && d < bd){ bd = d; best = {node:n}; } });
    if(best) return best;
    if(k >= 1.2) dots.forEach(d => { const dd = Math.hypot(d.x-x, d.y-y) - 3.2; if(dd < slop && dd < bd){ bd = dd; best = {dot:d}; } });
    return best;
  }
  function panel(h, v){
    const gp = document.getElementById("gp");
    if(!h && !v){ gp.innerHTML = ""; return; }
    if(v){
      gp.innerHTML = `<div class="gpanel"><button class="ibtn x" data-gx aria-label="Close">${IC.close}</button><span class="pill"><i class="dot d-${voice(v)}"></i>${esc(name(HB.get(voice(v))))}</span>
        <p class="nm">${v.ref}</p><p class="ds" lang="${lang}">${esc(tr(v))}</p><div class="row"><a class="btn primary" href="#${v.id}">${esc(u().open)}</a></div></div>`;
    } else {
      const isC = h.type==="chapter";
      gp.innerHTML = `<div class="gpanel"><button class="ibtn x" data-gx aria-label="Close">${IC.close}</button><span class="pill"><i class="dot d-${h.type}"></i>${esc(u().type[h.type]||"")}</span>
        <p class="nm">${esc(isC ? `${h.num}. ${name(h)}` : name(h))}</p><p class="mt">${esc(h.skt||"")} · ${esc(metaOf(h))}</p><p class="ds" lang="${lang}">${esc(descOf(h))}</p>
        <div class="row"><a class="btn primary" href="#${isC?`c${h.num}`:`t-${h.id}`}">${esc(isC ? u().openCh : u().allVerses(h.vs.length))}</a></div></div>`;
    }
    gp.querySelector("[data-gx]").onclick = () => { sel = null; panel(); draw(); };
  }
  const zoom = d3.zoom().scaleExtent([0.15, 8]).on("zoom", e => { T = e.transform; draw(); });
  const sv = d3.select(cv).call(zoom).on("dblclick.zoom", null);
  let down = null;
  cv.addEventListener("pointerdown", e => { down = [e.clientX, e.clientY]; });
  cv.addEventListener("pointerup", e => {
    if(!down || Math.hypot(e.clientX-down[0], e.clientY-down[1]) > 6) return;
    const r = cv.getBoundingClientRect(), hres = hit(e.clientX-r.left, e.clientY-r.top);
    if(hres?.node){ sel = hres.node.h; panel(sel); }
    else if(hres?.dot){ sel = null; panel(null, hres.dot.v); }
    else { sel = null; panel(); }
    draw();
  });
  const dur = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280;
  document.getElementById("zin").onclick = () => sv.transition().duration(dur).call(zoom.scaleBy, 1.6);
  document.getElementById("zout").onclick = () => sv.transition().duration(dur).call(zoom.scaleBy, 1/1.6);
  document.getElementById("zfit").onclick = () => sv.transition().duration(dur).call(zoom.transform, fitT());
  const ro = new ResizeObserver(() => { const first = !W; size(); if(first) sv.call(zoom.transform, fitT()); else draw(); });
  ro.observe(wrap);
  const mq = matchMedia("(prefers-color-scheme: dark)"); const onMq = () => recolor(); mq.addEventListener("change", onMq);
  const mo = new MutationObserver(recolor); mo.observe(document.documentElement, {attributes:true, attributeFilter:["data-theme"]});
  if(document.fonts) document.fonts.ready.then(draw);
  size(); recolor(); sv.call(zoom.transform, fitT());
  return { recolor, destroy(){ ro.disconnect(); mq.removeEventListener("change", onMq); mo.disconnect(); } };
}

// ===================== boot =====================
document.documentElement.lang = lang;
applyPrefs(true);
Promise.all([fetch(BASE + "verses.json" + VER).then(r=>{ if(!r.ok) throw 0; return r.json(); }), fetch(BASE + "hubs.json" + VER).then(r=>{ if(!r.ok) throw 0; return r.json(); })])
  .then(([verses, hubs]) => { prepare(verses, hubs); render(); })
  .catch(() => { document.getElementById("view").innerHTML = `<p class="loading">The verses did not load. Reload the page to try again.</p>`; });