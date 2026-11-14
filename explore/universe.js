'use strict';
// Reads the canonical text files of each reader (../gita/, ../ashtavakra/, ../upanishads/). No text or relationship
// is written here: structure comes from chapter/verse numbers, questions from gita/questions.json, ideas from the
// tags on each Gita verse, and the Gita/Ashtavakra references of a story from upanishads/data.json.
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
let lang = "en";
try{ const g = localStorage.getItem("gg-lang")||localStorage.getItem("library-lang"); if(g === "hi" || g === "en") lang = g; }catch(e){}
const T = {
 en:{sub:"A living library of wisdom", back:"← Back", home:"✧ Overview", pause:"Pause motion", play:"Play motion", lang:"हिन्दी",
  chapters2:"Chapters", qs:"Questions", chapD:"Every chapter is a constellation. Tap one to see its shlokas.", eb:"Bhagavad Gita · Ashtavakra Gita · Upanishads", h1:"One idea,<br><em>many texts.</em>", hp:"See how chapters, verses and stories connect, then follow those links from one verse to the next.", ideasTitle:"Ideas across the texts", sameIdea:"The same idea in other texts", inText:"In this text", tales:"Stories", crossNote:"An editorial link: our editors read these passages as expressing related ideas. Their philosophical contexts may differ, and traditions read them differently.", start:"Start with a question", startD:"Choose a life question and the verses that speak to it light up. Or tap any chapter to explore it.",
  texts:"The three scriptures", chapters:"Chapters", verses:"Shlokas", stories:"Stories", read:"Read the whole chapter", readS:"Read the story",readV:"Read in the original reader",
  open:"Open", close:"Close", min:"Hide", show:"Show", prev:"← Previous", next:"Next →", ideas:"Ideas in this verse", people:"People",
  all:"All verses on this idea", chapter:"Chapter", verse:"Shloka", story:"Story", question:"Question", idea:"Idea", n:k => `${k} shlokas`, ns:k => `${k} stories`,
  notedIn:"Suggested alongside these Upanishad stories", noted:"Suggested alongside", gitaV:"Bhagavad Gita", ashV:"Ashtavakra Gita", qStories:"Stories on this question", versesQ:"Verses for this question",
  readIn:"Reading", pass:"Passages from the text", more:n => `…and ${n} more`, intro:"About this", hint:"Drag to move · pinch / double-tap to zoom",
  scripture:"Scripture", names:{g:"Bhagavad Gita", a:"Ashtavakra Gita", u:"Upanishads"}, loadErr:"The graph did not load. Reload the page to try again.",
  legend:"Legend", legendKey:"Each text has its own colour. Bigger points are chapters and stories; the smallest are shlokas.", legendEv:"Labels on the lines say how two things relate. A dashed label is an editorial link: our reading, not the text's own statement.", hideT:"Hide", showT:"Show",
  focus:"Focus", whole:"Whole graph", conn:k => k === 1 ? "1 connection" : `${k} connections`, clearSel:"Clear selection", fit:"Fit to screen",
  moved:"Selected", care:"The Gita offers a way of seeing, not a substitute for support. If this is weighing on you, please talk to someone you trust or a doctor.", up:"Upanishad"},
 hi:{sub:"ज्ञान का जीवंत ग्रंथालय", back:"← वापस", home:"✧ पूरा ग्राफ़", pause:"गति रोकें", play:"गति चलाएँ", lang:"English",
  chapters2:"अध्याय", qs:"प्रश्न", chapD:"हर अध्याय एक तारामंडल है। किसी अध्याय को छूकर उसके श्लोक देखें।", eb:"भगवद्गीता · अष्टावक्र गीता · उपनिषद्", h1:"एक विचार,<br><em>कई ग्रंथों में।</em>", hp:"देखें कि अध्याय, श्लोक और कथाएँ कैसे जुड़ते हैं। फिर इन संबंधों के सहारे एक श्लोक से दूसरे तक पहुँचें।", ideasTitle:"ग्रंथों के विचार", sameIdea:"दूसरे ग्रंथों में यही विचार", inText:"इस ग्रंथ में", tales:"कथाएँ", crossNote:"यह संपादकीय संबंध है: हमारे संपादकों की समझ में इन अंशों के विचार मिलते-जुलते हैं। इनके दार्शनिक संदर्भ अलग हो सकते हैं, और परंपराएँ इन्हें अलग-अलग ढंग से पढ़ती हैं।", start:"किसी प्रश्न से शुरू करें", startD:"जीवन का कोई प्रश्न चुनें, उससे जुड़े श्लोक जगमगा उठेंगे। या किसी अध्याय को छूकर देखें।",
  texts:"तीन ग्रंथ", chapters:"अध्याय", verses:"श्लोक", stories:"कथाएँ", read:"पूरा अध्याय पढ़ें", readS:"कथा पढ़ें",readV:"मूल पाठक में पढ़ें",
  open:"खोलें", close:"बंद करें", min:"छिपाएँ", show:"दिखाएँ", prev:"← पिछला", next:"अगला →", ideas:"इस श्लोक के विचार", people:"पात्र",
  all:"इस विचार के सभी श्लोक", chapter:"अध्याय", verse:"श्लोक", story:"कथा", question:"प्रश्न", idea:"विचार", n:k => `${k} श्लोक`, ns:k => `${k} कथाएँ`,
  notedIn:"इन उपनिषद कथाओं के साथ सुझाया गया", noted:"साथ में पढ़ने का सुझाव", gitaV:"भगवद्गीता", ashV:"अष्टावक्र गीता", qStories:"इस प्रश्न की कथाएँ", versesQ:"इस प्रश्न के श्लोक",
  readIn:"पढ़ रहे हैं", pass:"मूल पाठ के अंश", more:n => `…और ${n}`, intro:"परिचय", hint:"खींचकर घुमाएँ · पिंच / दो बार टैप से ज़ूम करें",
  scripture:"ग्रंथ", names:{g:"भगवद्गीता", a:"अष्टावक्र गीता", u:"उपनिषद्"}, loadErr:"ग्राफ़ लोड नहीं हुआ। दोबारा कोशिश करें।",
  legend:"संकेत", legendKey:"हर ग्रंथ का अपना रंग है। बड़े बिंदु अध्याय और कथाएँ हैं; सबसे छोटे श्लोक।", legendEv:"रेखाओं पर लिखा शब्द बताता है कि दो चीज़ें कैसे जुड़ी हैं। बिंदीदार घेरे वाला शब्द संपादकीय संबंध है: यह हमारी समझ है, पाठ का अपना कथन नहीं।", hideT:"छिपाएँ", showT:"दिखाएँ",
  focus:"केवल यह", whole:"पूरा ग्राफ़", conn:k => `${k} संबंध`, clearSel:"चयन हटाएँ", fit:"पूरा दिखाएँ",
  moved:"चुना गया", care:"गीता देखने का एक नज़रिया देती है, सहारे का विकल्प नहीं। अगर यह मन पर भारी है, तो किसी भरोसेमंद व्यक्ति या डॉक्टर से बात करें।", up:"उपनिषद्"}
};
const t = k => T[lang][k];
const COL = {g:"#e8cb8e", a:"#c4a6c6", u:"#93bacd"};
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
let theme='system';try{const saved=localStorage.getItem('gg-theme');if(['system','dark','light'].includes(saved))theme=saved;}catch{}
let palette={};
const THEME_ICONS={system:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>',dark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',light:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'};
function drawTheme(){const dark=theme==='dark'||theme==='system'&&systemTheme.matches;if(theme==='system')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',theme);
Object.assign(COL,dark?{g:'#e8cb8e',a:'#c4a6c6',u:'#93bacd'}:{g:'#8b631e',a:'#895582',u:'#0b6b70'});
const style=getComputedStyle(document.documentElement);palette={dark,bg:style.getPropertyValue('--bg').trim()||'#faf8f4',ink:style.getPropertyValue('--ink').trim()||'#1b1838',muted:style.getPropertyValue('--muted').trim()||'#5a596b',gold:COL.g};
const b=$('themebtn'),label=lang==='hi'?({system:'थीम: सिस्टम',dark:'थीम: गहरी',light:'थीम: हल्की'})[theme]:`Theme: ${theme}`;b.innerHTML=THEME_ICONS[theme];b.setAttribute('aria-label',label);b.title=label;dirty=true;}
$('themebtn').onclick=()=>{theme=({system:'dark',dark:'light',light:'system'})[theme];try{localStorage.setItem('gg-theme',theme)}catch{}drawTheme();refreshWords();kick();};
systemTheme.addEventListener('change',()=>{if(theme==='system'){drawTheme();if(started)refreshWords();kick();}});

let paused = reduce.matches;

// ---------- data ----------
let GV = [], GH = new Map(), QS = [], AV = [], AH = new Map(), UP = [], ST = [], UD = {};
const nodes = [], byId = new Map(), roots = {};
const overviewEdges=[],overviewStars=new Set();
const depthOf=id=>{let h=2166136261;for(const c of id){h=Math.imul(h^c.charCodeAt(0),16777619);}return((h>>>0)%1000)/1000*2-1;};

const gRef = new Map(), aRef = new Map();      // "2.47" -> node
const chapOf = {g:[], a:[], u:[]};
const lgrp = (en, hi) => lang === "hi" ? (hi || en) : en;

function build(){
  const place = (key, cx, cy, ring, count, label) => {
    const r = {id:key, kind:"root", t:key, x:cx, y:cy, r:7, name:{en:T.en.names[key], hi:T.hi.names[key]}};
    roots[key] = r; add(r); return r;
  };
  function add(n){ nodes.push(n); byId.set(n.id, n); return n; }
  const G = place("g", -720, 80), A = place("a", 700, 50), U = place("u", 100, -680);
  const gch = [...GH.values()].filter(h => h.type === "chapter").sort((a,b) => a.num - b.num);
  const spiral = (c, n, step, mk) => { for(let i = 0; i < n; i++){ const rr = step*Math.sqrt(i + .6), th = i*2.39996; mk(i, c.x + rr*Math.cos(th), c.y + rr*Math.sin(th), rr, th); } };
  gch.forEach(h => {
    const a=h.num*2.399963-.8, radius=155+460*Math.sqrt((h.num-.4)/18), c = add({id:"g"+h.num, kind:"chap", t:"g", num:h.num, h, x:G.x + radius*Math.cos(a), y:G.y + radius*Math.sin(a)*.86, r:5, name:{en:h.label, hi:h.hl || h.label}, sk:h.skt});
    chapOf.g.push(c); c.kids = []; c.om = (c.num % 2 ? 1 : -1)*(.00003 + (c.num % 5)*.000006);
    const vs = GV.filter(v => v.c === h.num);
    spiral(c, vs.length, 10.5, (i, x, y, rr, th) => { const v = vs[i], n = add({id:`g${v.c}.${v.v}`, kind:"verse", t:"g", ch:c, d:v, ref:`${v.c}.${v.v}`, x, y, orr:rr, oth:th}); gRef.set(n.ref, n); c.kids.push(n); });
  });
  const ach = [...AH.values()].filter(h => h.type === "chapter").sort((a,b) => a.num - b.num);
  ach.forEach(h => {
    const a=h.num*2.399963+.4, radius=135+360*Math.sqrt((h.num-.4)/ach.length), c = add({id:"a"+h.num, kind:"chap", t:"a", num:h.num, h, x:A.x + radius*Math.cos(a), y:A.y + radius*Math.sin(a)*.86, r:5, name:{en:h.label, hi:h.hl || h.label}, sk:h.skt});
    chapOf.a.push(c); c.kids = []; c.om = (c.num % 2 ? 1 : -1)*(.00004 + (c.num % 4)*.000008);
    const vs = AV.filter(v => v.c === h.num);
    spiral(c, vs.length, 10, (i, x, y, rr, th) => { const v = vs[i], n = add({id:`a${v.c}.${v.v}`, kind:"verse", t:"a", ch:c, d:v, ref:`${v.c}.${v.v}`, x, y, orr:rr, oth:th}); aRef.set(n.ref, n); c.kids.push(n); });
  });
  UP.forEach((u, i) => {
    const a=i*2.399963-.5, radius=100+200*Math.sqrt((i+.5)/UP.length), c = add({id:"ut:"+u.id, kind:"chap", t:"u", up:u, x:U.x + radius*Math.cos(a), y:U.y + radius*Math.sin(a)*.85, r:5, name:{en:u.name_en, hi:u.name_hi}, sk:u.native});
    chapOf.u.push(c); c.kids = [];
    const ss = ST.filter(s => s.up === u.id);
    c.om = .00005 + (i % 3)*.00001;
    ss.forEach((s, j) => { const b = a + (j - (ss.length-1)/2)*.5 ; const rr = 46 + (j%2)*14;
      const n = add({id:"u:"+s.id, kind:"story", t:"u", ch:c, s, x:c.x + rr*Math.cos(b), y:c.y + rr*Math.sin(b), r:4, name:{en:s.title_en, hi:s.title_hi}, orr:rr, oth:b}); c.kids.push(n); });
  });
  ST.forEach(s=>{const story=byId.get('u:'+s.id);story.passages=(s.verses||[]).map((d,i)=>{const angle=i/(s.verses.length||1)*Math.PI*2,n=add({id:`up:${s.id}:${i}`,kind:'passage',t:'u',story,ch:story.ch,d,ref:d.ref,index:i,x:story.x+22*Math.cos(angle),y:story.y+22*Math.sin(angle),orr:22,oth:angle});return n;});});
  buildIdeas(G, A, U);
  // story -> verse references that already live in the Upanishads data
  ST.forEach(s => { const n = byId.get("u:"+s.id); n.xg = (s.gita||[]).map(r => gRef.get(r)).filter(Boolean); n.xa = (s.ashtavakra||[]).map(r => aRef.get(r)).filter(Boolean); });
  ST.forEach(s => { const n = byId.get("u:"+s.id); n.xg.forEach(v => (v.cites = v.cites || []).push(n)); n.xa.forEach(v => (v.cites = v.cites || []).push(n)); });
  for(const n of nodes)n.depth=depthOf(n.id)*(n.kind==='root'?80:n.kind==='verse'||n.kind==='passage'?180:240);
  ST.filter((_,i)=>i%4===0).forEach(s=>{const story=byId.get('u:'+s.id);for(const verse of [story.xg[0],story.xa[0]].filter(Boolean)){overviewEdges.push([story,verse]);overviewStars.add(story);overviewStars.add(verse);}});

}

// Idea web (overview): the most-tagged ideas of each text, joined when they share verses (or stories), within one text
// only: the same idea id in two texts is never joined across them. Nothing here is written by hand.
const ideas = [], iedges = [], iBy = new Map();
function buildIdeas(G, A, U){
  const cnt = (tag) => { const m = new Map(); tag.forEach(ids => ids.forEach(id => m.set(id, (m.get(id) || 0) + 1))); return m; };
  const mk = (t, root, list, name, rad) => list.forEach((o, i) => {
    const a = -Math.PI/2 + i*2*Math.PI/list.length + (t === "g" ? .3 : .6), r = rad*(.62 + (i % 3)*.19);
    const n = {id:`i:${t}:${o.id}`, kind:"idea", t, hid:o.id, root, bx:root.x + r*Math.cos(a), by:root.y + r*Math.sin(a), x:root.x + r*Math.cos(a), y:root.y + r*Math.sin(a), ph:i*1.7, r:4, name:name(o), tags:o.tags};
    nodes.push(n); byId.set(n.id, n); ideas.push(n); iBy.set(`${t}:${o.id}`, n);
  });
  const links = (t, list) => { list.forEach(a => { const sc = list.filter(b => b !== a).map(b => [b, [...a.tags].filter(x => b.tags.has(x)).length]).filter(x => x[1] > 0).sort((x, y) => y[1] - x[1]).slice(0, 2);
    sc.forEach(([b]) => { if(!iedges.some(e => (e.a === a && e.b === b) || (e.a === b && e.b === a))) iedges.push({a, b, cross:false}); }); }); };
  const top = (m, ok, n) => [...m.entries()].filter(([id]) => ok(id)).sort((x, y) => y[1] - x[1]).slice(0, n).map(([id]) => id);
  // Gita
  const gt = GV.map(v => new Set([...(v.k || []), ...(v.p || [])].filter(id => GH.has(id) && ["concept","path","guna"].includes(GH.get(id).type))));
  const gl = top(cnt(gt), () => true, 12).map(id => ({id, tags:new Set(GV.map((v, i) => gt[i].has(id) ? `${v.c}.${v.v}` : null).filter(Boolean)), h:GH.get(id)}));
  mk("g", G, gl, o => ({en:o.h.label, hi:o.h.hl || o.h.label}), 360);
  // Ashtavakra
  const at = AV.map(v => new Set([...(v.k || []), ...(v.p || [])].filter(id => AH.has(id) && AH.get(id).type === "concept")));
  const al = top(cnt(at), () => true, 10).map(id => ({id, tags:new Set(AV.map((v, i) => at[i].has(id) ? `${v.c}.${v.v}` : null).filter(Boolean)), h:AH.get(id)}));
  mk("a", A, al, o => ({en:o.h.label, hi:o.h.hl || o.h.label}), 190);
  // Upanishads
  const IDX = new Map((UD.ideas || []).map(i => [i.id, i]));
  const uc = new Map(); ST.forEach(s => (s.ideas || []).forEach(id => IDX.has(id) && uc.set(id, (uc.get(id) || 0) + 1)));
  const ul = top(uc, () => true, 11).map(id => ({id, tags:new Set(ST.filter(s => (s.ideas || []).includes(id)).map(s => s.id)), h:IDX.get(id)}));
  mk("u", U, ul, o => ({en:o.h.label, hi:o.h.label_hi || o.h.label}), 210);
  links("g", ideas.filter(n => n.t === "g")); links("a", ideas.filter(n => n.t === "a")); links("u", ideas.filter(n => n.t === "u"));
  // Cross-text edges require explicit source references; identical tag IDs are not evidence.
}
// everything drifts: shlokas orbit their chapter, ideas sway, chapters turn slowly around their scripture
function setPositions(now){
  if(reduce.matches||ptrs.size)return;
  for(const n of ideas){ n.x = n.bx + 9*Math.sin(now*.0004 + n.ph); n.y = n.by + 9*Math.cos(now*.00033 + n.ph*1.3); }
  const still = S.kind === "chap" ? S.n : S.kind === "verse" || S.kind === "passage" ? S.n.ch : S.kind === "story" ? S.n.ch : null;
  for(const c of chapOf.g.concat(chapOf.a, chapOf.u)){ if(c === still || c.om == null) continue;
    const ang = now*c.om*2.5; for(const k of c.kids){ const th = k.oth + ang; k.x = c.x + k.orr*Math.cos(th); k.y = c.y + k.orr*Math.sin(th)*.65;k.depth=c.depth+k.orr*Math.sin(th)*.8; } }
}

// ---------- state + routing ----------
// #/  #/g  #/g/2  #/g/2/47  #/a/1/2  #/u/katha  #/u/nachiketa  #/q/grief  #/i/dharma  and "/read" in front of a text path
let S = {kind:"home"}, readOpen = false, collapsed = false, lit = null, edges = [];
// phones: tapping the map zooms in and shows a small card; tapping the card opens the details full screen.
// Links followed inside the full screen (and the Chapters list) stay full screen. Back returns to where the reader was.
const phone = matchMedia("(max-width:900px)");
let fullNext = false, peekOpen = false;
function parse(h){
  const p = h.replace(/^#\/?/, "").split("/").filter(Boolean);
  let read = false; if(p[0] === "read"){ read = true; p.shift(); }
  let st = {kind:"home"};
  if(p[0] === "q" && QS.find(q => q.slug === p[1])) st = {kind:"q", q:QS.find(q => q.slug === p[1])};
  else if(p[0] === "chapters") st = {kind:"chapters"};
  else if(p[0] === "i" && ideaMeta(p[1], p[2])) st = {kind:"idea", t:p[1], id:p[2], m:ideaMeta(p[1], p[2])};
  else if((p[0] === "g" || p[0] === "a") && !p[1]) st = {kind:"root", n:roots[p[0]]};
  else if(p[0] === "g" || p[0] === "a"){
    const ch = byId.get(p[0] + p[1]);
    if(ch && p[2] && byId.get(`${p[0]}${p[1]}.${p[2]}`)) st = {kind:"verse", n:byId.get(`${p[0]}${p[1]}.${p[2]}`)};
    else if(ch) st = {kind:"chap", n:ch};
  } else if(p[0] === "u" && !p[1]) st = {kind:"root", n:roots.u};
  else if(p[0]==='u'&&p[1]==='text'&&byId.has('ut:'+p[2]))st={kind:'chap',n:byId.get('ut:'+p[2])};
  else if(p[0]==='u'&&p[1]==='story'&&byId.has('u:'+p[2]))st={kind:'story',n:byId.get('u:'+p[2])};
  else if(p[0]==='u'&&p[1]==='passage'&&byId.has('up:'+p[2]+':'+p[3]))st={kind:'passage',n:byId.get('up:'+p[2]+':'+p[3])};
  else if(p[0] === "u" && byId.get("u:"+p[1])){ const n = byId.get("u:"+p[1]); st = {kind:n.kind === "story" ? "story" : "chap", n}; }
  else if(p[0]==='u'&&byId.has('ut:'+p[1]))st={kind:'chap',n:byId.get('ut:'+p[1])};
  if(read && !(st.kind === "chap" || st.kind === "verse" || st.kind === "story" || st.kind==='passage')) read = false;
  return {st, read};
}
const hashOf = n => n.kind === "idea" ? `#/i/${n.t}/${n.hid}` : n.kind === "root" ? `#/${n.t}` : n.kind === "verse" ? `#/${n.t}/${n.d.c}/${n.d.v}` : n.t === "u" ? (n.kind==="chap"?`#/u/text/${n.up.id}`:n.kind==="passage"?`#/u/passage/${n.story.s.id}/${n.index}`:`#/u/story/${n.s.id}`) : `#/${n.t}/${n.num}`;
const hashFor = st => st.kind === "q" ? `#/q/${st.q.slug}` : st.kind === "chapters" ? "#/chapters" : st.kind === "idea" ? `#/i/${st.t}/${st.id}` : st.n ? hashOf(st.n) : "#/";
function apply(){
  const r = parse(location.hash); S = r.st;
  readOpen = false;
  if(r.read){history.replaceState({...history.state,universe:true},"",hashFor(S));rememberView();location.assign(readerHref(S.n));return;}
  const view = history.state?.view, restoring = view && view.hash === (location.hash || "#/");
  if(restoring){ collapsed = !!view.collapsed; peekOpen = !!view.peek; }
  else if(phone.matches){ collapsed = !fullNext; peekOpen = false; }   // phones: the map first; a tray opens only when asked for
  fullNext = false;
  computeLit();orderLit();renderPanel();
  if(!restoreView(history.state?.view))fly();
  $("back").disabled = !history.state || !history.state.nav;
  $("home").setAttribute("aria-current", S.kind === "home" ? "true" : "false"); $("chaps").setAttribute("aria-current", S.kind === "chapters" ? "true" : "false"); $("qs").setAttribute("aria-current", S.kind === "home" && !collapsed ? "true" : "false"); $("hero").classList.toggle("on", S.kind === "home");
  const label = S.kind === "q" ? qn(S.q) : S.kind === "idea" ? lgrp(S.m.en, S.m.hi) : S.n ? nm(S.n) : "";
  $("live").textContent = label ? `${t("moved")}: ${label}` : "";
  dirty = true;
}
function nav(hash,replace){cancelTap();if(location.hash===hash)return;rememberView();if(replace)history.replaceState({universe:true,nav:history.state?.nav||0},'',hash);else history.pushState({universe:true,nav:(history.state?.nav||0)+1},'',hash);apply();}
// phones: hopping from bubble to bubble on the map replaces the entry, so Back returns to where the reader came from
const mapNav = n => nav(hashOf(n), phone.matches && collapsed && S.kind !== "home");
addEventListener("popstate",()=>{if(!$('help').hidden&&!history.state?.guide)hideHelp();apply();kick();});addEventListener("hashchange",()=>{if(started&&hashFor(S)!==location.hash){apply();kick();}});

// ---------- names ----------
const nm = n => (n.kind === "verse"||n.kind === "passage") ? (n.t === "a" ? "अ" : "") + n.ref : lang === "hi" ? (n.name.hi || n.name.en) : n.name.en;
const qn = q => lang === "hi" ? q.q_hi : q.q_en, qi = q => lang === "hi" ? q.intro_hi : q.intro_en;
const idn = h => lang === "hi" ? (h.hl || h.label) : h.label;
const tr = d => lang === "hi" ? (d.hi || d.en) : d.en;
function sa(d){return String(d.sa||"");}
const col = n => COL[n.t || "g"];

// ---------- ideas across the texts ----------
function ideaMeta(t, id){
  if(t === "g"){ const h = GH.get(id); return h && ["concept","path","guna","person"].includes(h.type) ? {en:h.label, hi:h.hl || h.label, de:h.desc, dh:h.hd || h.desc} : null; }
  if(t === "a"){ const h = AH.get(id); return h && h.type !== "chapter" ? {en:h.label, hi:h.hl || h.label, de:h.desc, dh:h.hd || h.desc} : null; }
  if(t === "u"){ const i = (UD.ideas || []).find(x => x.id === id); return i ? {en:i.label, hi:i.label_hi || i.label, de:i.desc_en, dh:i.desc_hi} : null; }
  return null;
}
function ideaNodes(t, id){
  if(t === "g") return GV.map(v => gRef.get(`${v.c}.${v.v}`)).filter(n => n && ((n.d.k || []).includes(id) || (n.d.p || []).includes(id)));
  if(t === "a") return AV.map(v => aRef.get(`${v.c}.${v.v}`)).filter(n => n && ((n.d.k || []).includes(id) || (n.d.p || []).includes(id)));
  return ST.filter(s => (s.ideas || []).includes(id)).map(s => byId.get("u:" + s.id));
}

// ---------- lit set (question / idea) and connection paths ----------
// the idea being explored stays on screen as a hub; its threads run from it to each verse (or story) that carries it
let hub = null;
// while a question or idea is lit: the chapters/texts holding lit items, and a drawing order that gives their names first claim on space
let litCh = new Set(), drawOrder = null;
function orderLit(){ if(!lit) return; for(const n of lit) if(n.ch) litCh.add(n.ch);
  // names first (stories, then the chapters/texts that hold lit items), then verse numbers, then the rest
  const v = n => n.kind === "verse" || n.kind === "passage";
  drawOrder = nodes.filter(n => lit.has(n) && !v(n)).concat(nodes.filter(n => litCh.has(n)), nodes.filter(n => lit.has(n) && v(n)), nodes.filter(n => !lit.has(n) && !litCh.has(n))); }
function computeLit(){
  lit = null; edges = []; hub = null; litCh = new Set(); drawOrder = null;
  const chain = list => { for(let i = 0; i < list.length - 1 && i < 60; i++) edges.push([list[i], list[i+1], "explores"]); };
  if(S.kind === "q"){
    const vs = [...S.q.verses.map(r => gRef.get(r)), ...(S.q.av?.items||[]).map(v=>aRef.get(v.ref))].filter(Boolean);
    const storyIds=new Set([...(S.q.up||[]).map(s=>s.id),...ST.filter(s=>(s.life_questions||[]).includes(S.q.slug)).map(s=>s.id)]);const ss=[...storyIds].map(id=>byId.get("u:"+id)).filter(Boolean);
    lit = new Set([...vs, ...ss]); S.vs = vs; S.ss = ss; chain(vs.filter(v => v.t === "g")); chain(vs.filter(v => v.t === "a"));
  } else if(S.kind === "idea"){
    const own = ideaNodes(S.t, S.id); S.sets = {}; S.sets[S.t] = own; const all = [...own];
    lit = new Set(own); S.vs=own;
    if(own.length){ hub = iBy.get(`${S.t}:${S.id}`) || {id:`i:${S.t}:${S.id}`, kind:"idea", t:S.t, depth:0, name:{en:S.m.en, hi:S.m.hi},
      x:own.reduce((a, n) => a + n.x, 0)/own.length, y:own.reduce((a, n) => a + n.y, 0)/own.length};
      own.slice(0, 80).forEach(v => edges.push([hub, v, "speaks"])); }
  } else if(S.kind === "verse"){
    lit = new Set([S.n, ...(S.n.cites || [])]); (S.n.cites || []).forEach(c => edges.push([S.n, c, "echoes"]));
  } else if(S.kind === "story"){
    lit = new Set([S.n, ...S.n.xg, ...S.n.xa]); [...S.n.xg, ...S.n.xa].forEach(v => edges.push([S.n, v, "echoes"]));
  }
}

// ---------- panel ----------
function qRow(q){ return `<a class="item" href="#/q/${q.slug}"><span class="tt">${esc(qn(q))}<small>${esc(t("n")(q.verses.length+(q.av?.items?.length||0)))}</small></span></a>`; }
function vRow(n, extra){
  const d = n.d; return `<a class="item" style="--c:${col(n)}" href="${hashOf(n)}"><span class="rf">${n.ref}</span><span class="tt">${esc(tr(d))}${extra ? `<small>${esc(extra)}</small>` : ""}</span></a>`;
}
const sRow = n => `<a class="item" style="--c:${col(n)}" href="${hashOf(n)}"><span class="rf">✦</span><span class="tt">${esc(nm(n))}<small>${esc(lgrp(n.s.hook_en, n.s.hook_hi))}</small></span></a>`;
const cRow = n => `<a class="item" style="--c:${col(n)}" href="${hashOf(n)}"><span class="rf">${n.num != null ? n.num : "✦"}</span><span class="tt">${esc(nm(n))}<small>${esc(n.kind === "chap" && n.t !== "u" ? t("n")(n.kids.length) : t("ns")(n.kids.length))}</small></span></a>`;
function head(eye, title, c){
  return `<div class="phead"><div><div class="eyebrow" style="--c:${c || "var(--gold)"}"><i></i>${esc(eye)}</div><h2 id="ptitle" tabindex="-1">${esc(title)}</h2></div>
  ${phone.matches && !collapsed ? `<button class="x mapbtn" data-pback>${esc(t("back"))}</button>` : `<button class="x" data-min aria-label="${esc(collapsed ? t("show") : t("min"))}" aria-expanded="${!collapsed}">${collapsed ? "⌃" : "⌄"}</button>`}</div><div class="pbody">`;
}
function ideaChips(v){
  const map=v.t==="a"?AH:GH;const ids=[...new Set([...(v.d.k||[]),...(v.d.p||[])])].filter(id=>map.has(id)&&ideaMeta(v.t,id));
  return ids.length ? `<h3>${evc("speaks")}${esc(t("ideas"))}</h3><div class="chips">${ids.map(id => `<a class="chip" href="#/i/${v.t}/${id}">${esc(idn(map.get(id)))}</a>`).join("")}</div>` : "";
}
function renderPanel(focus=true){
  const p = $("panel"); let h = ""; const r0 = p.getBoundingClientRect(), was = p.classList.contains("min");
  if(S.kind === "home"){
    h = head(t("scripture"), t("start")) + `<p class="desc">${esc(t("startD"))}</p>` + QS.map(qRow).join("") +
      `<a class="item" href="#/chapters"><span class="tt">${esc(t("chapters2"))}<small>${esc(t("chapD"))}</small></span></a>` +
      `<h3>${esc(t("texts"))}</h3>` + ["g","a","u"].map(k => `<a class="item" style="--c:${COL[k]}" href="#/${k}"><span class="tt">${esc(lgrp(T.en.names[k], T.hi.names[k]))}<small>${esc(k === "u" ? t("ns")(ST.length) : t("n")((k === "g" ? GV : AV).length))}</small></span></a>`).join("");
  } else if(S.kind === "chapters"){
    h = head(t("scripture"), t("chapters2")) + `<p class="desc">${esc(t("chapD"))}</p>` + ["g","a","u"].map(k => `<a class="item" style="--c:${COL[k]}" href="#/${k}"><span class="tt">${esc(lgrp(T.en.names[k], T.hi.names[k]))}<small>${esc(k === "u" ? t("ns")(ST.length) : t("n")((k === "g" ? GV : AV).length))}</small></span></a>`).join("");
    h += ["g","a","u"].map(k=>`<h3>${esc(T[lang].names[k])}</h3>${chapOf[k].map(cRow).join('')}`).join('');
  } else if(S.kind === "root"){
    const k = S.n.t, list = chapOf[k];
    h = head(t("scripture"), nm(S.n), COL[k]) + `<h3>${esc(k === "u" ? t("up") : t("chapters"))}</h3>` + list.map(cRow).join("");
  } else if(S.kind === "chap"){
    const n = S.n, k = n.t;
    h = head(k === "u" ? t("up") : `${t("chapter")} ${n.num}`, nm(n), COL[k]);
    if(k === "u") h += `<p class="desc">${esc(lgrp(n.up.desc_en, n.up.desc_hi))}</p>` + n.kids.map(sRow).join("");
    else{ const hb = n.h; h += `<p class="xnote" lang="sa">${esc(n.sk || "")}</p><p class="desc">${esc(lang === "hi" ? (hb.hd || hb.desc) : hb.desc)}</p><a class="btn fill" data-reader href="${readerHref(n)}">${esc(t("read"))}</a>` +
      `<h3>${evc("contains")}${esc(t("verses"))}</h3>` + `<div class="orbit-index">${n.kids.map(v=>`<a href="${hashOf(v)}" aria-label="${esc(t("verse"))} ${v.ref}">${v.ref}</a>`).join('')}</div>`; }
  } else if(S.kind === "verse"){
    const n = S.n, d = n.d, ch = n.ch, i = ch.kids.indexOf(n), pv = ch.kids[i-1], nx = ch.kids[i+1], k = n.t;
    h = head(`${t("chapter")} ${ch.num} · ${t("verse")}`, `${k === "a" ? lgrp("Ashtavakra", "अष्टावक्र") + " " : ""}${n.ref}`, COL[k]) +
      `<p class="sk" lang="sa">${esc(sa(d))}</p><p class="tx" lang="${lang}">${esc(tr(d))}</p>` +
      `<div class="nav2">${pv ? `<a class="chip" href="${hashOf(pv)}">${esc(t("prev"))}</a>` : "<span></span>"}${nx ? `<a class="chip" href="${hashOf(nx)}">${esc(t("next"))}</a>` : "<span></span>"}</div>` +
      `<a class="btn" data-reader href="${readerHref(n)}">${esc(t("readV"))}</a><a class="btn" href="${hashOf(ch)}">${esc(nm(ch))}</a>` + ideaChips(n) +
      (n.cites ? `<h3>${evc("echoes")}${esc(t("notedIn"))}</h3>` + n.cites.map(sRow).join("") + `<p class="xnote">${esc(t("crossNote"))}</p>` : "");
  } else if(S.kind === "story"){
    const n = S.n, s = n.s;
    h = head(t("story"), nm(n), COL.u) + `<p class="desc">${esc(lgrp(s.hook_en, s.hook_hi))}</p><a class="btn fill" data-reader href="${readerHref(n)}">${esc(t("readS"))}</a>` +
      (n.xg.length ? `<h3>${evc("echoes")}${esc(t("noted"))} · ${esc(t("gitaV"))}</h3>` + n.xg.map(v => vRow(v)).join("") : "") +
      (n.xa.length ? `<h3>${evc("echoes")}${esc(t("noted"))} · ${esc(t("ashV"))}</h3>` + n.xa.map(v => vRow(v)).join("") : "") +
      (n.xg.length || n.xa.length ? `<p class="xnote">${esc(t("crossNote"))}</p>` : "");
    if(n.passages?.length)h+=`<h3>${evc("draws")}${esc(t('pass'))}</h3><div class="orbit-index">${n.passages.map(v=>`<a href="${hashOf(v)}" aria-label="${esc(v.ref)}">${esc(v.ref)}</a>`).join('')}</div>`;
  } else if(S.kind === 'passage'){
    const n=S.n;h=head(t('pass'),n.ref,COL.u)+`<p class="sk" lang="sa">${esc(sa(n.d))}</p><p class="tx" lang="${lang}">${esc(tr(n.d))}</p><a class="btn fill" data-reader href="${readerHref(n)}">${esc(t('readS'))}</a>${sRow(n.story)}`;
  } else if(S.kind === "q"){
    h = head(t("question"), qn(S.q)) + `<p class="desc">${esc(qi(S.q))}</p>` + (S.q.care ? `<p class="xnote">${esc(t("care"))}</p>` : "") +
      [["g","gitaV"],["a","ashV"]].map(([k,nm]) => { const l = S.vs.filter(v => v.t === k); return l.length ? `<h3>${evc("explores")}${esc(t("versesQ"))} · ${esc(t(nm))}</h3>` + l.map(v => vRow(v)).join("") : ""; }).join("") + (S.ss.length ? `<h3>${evc("explores")}${esc(t("qStories"))}</h3>` + S.ss.map(sRow).join("") : "") +
      (new Set([...S.vs, ...S.ss].map(n => n.t)).size > 1 ? `<p class="xnote">${esc(t("crossNote"))}</p>` : "") +
      `<a class="btn" href="../gita/questions/${S.q.slug}/">${esc(t("intro"))} →</a>`;
  } else if(S.kind === "idea"){
    const m = S.m; h = head(t("idea"), lgrp(m.en, m.hi), COL[S.t]) + `<p class="desc">${esc(lgrp(m.de, m.dh) || "")}</p>`;
    ["g","a","u"].filter(k => S.sets[k] && S.sets[k].length).sort((x, y) => (y === S.t) - (x === S.t)).forEach(k => {
      const list = S.sets[k]; h += `<h3>${evc("speaks")}${esc(lgrp(T.en.names[k], T.hi.names[k]))} · ${list.length}</h3>` + (k === "u" ? list.map(sRow).join("") : list.slice(0, k === S.t ? 12 : 6).map(v => vRow(v)).join("")) +
        (k !== "u" && list.length > (k === S.t ? 12 : 6) ? `<p class="xnote">${esc(t("more")(list.length - (k === S.t ? 12 : 6)))}</p>` : "");
      if(k !== S.t) h += `<p class="xnote">${esc(t("crossNote"))}</p>`; });
  }
  p.innerHTML = h + "</div>"; setMin(p, r0, was); p.scrollTop = 0;
  renderChrome();
  const hd = $("ptitle"); if(hd && started && focus) hd.focus({preventScroll:true});
}
// The furniture around the graph: a legend that is also the filter (bottom left), and a pill saying what is selected (top centre).
let legendOpen = !phone.matches;
try{ const v = localStorage.getItem("gg-graph-legend"); if(v) legendOpen = v === "1"; }catch(e){}
function renderChrome(){
  const lg = $("legend"), cx = $("ctx");
  if(lg){
    lg.classList.toggle("open", legendOpen);
    lg.innerHTML = `<button class="lg-h" type="button" data-lg aria-expanded="${legendOpen}">${esc(t("legend"))}<i aria-hidden="true"></i></button>` + (legendOpen ?
      `<ul>${["g","a","u"].map(k => `<li><button type="button" data-hide="${k}" aria-pressed="${!hid.has(k)}" aria-label="${esc((hid.has(k) ? t("showT") : t("hideT")) + " · " + t("names")[k])}" class="${hid.has(k) ? "off" : ""}"><i class="dot" style="background:${COL[k]}"></i><span>${esc(t("names")[k])}</span><em>${chapOf[k].length}</em><b class="eye" aria-hidden="true"></b></button></li>`).join("")}</ul><p>${esc(t("legendKey"))}</p><p>${esc(t("legendEv"))}</p>` : "");
  }
  if(cx){
    const on = S.kind !== "home" && S.kind !== "chapters" && !(phone.matches && !collapsed);
    cx.hidden = !on;
    if(on){
      const name = S.kind === "q" ? qn(S.q) : S.kind === "idea" ? (lang === "hi" ? S.m.hi || S.m.en : S.m.en) : S.n ? (S.n.kind === "verse" || S.n.kind === "passage" ? (lang === "hi" ? S.n.ch.name.hi || S.n.ch.name.en : S.n.ch.name.en) + " " + nm(S.n) : nm(S.n)) : "";
      const k = S.kind === "chap" || S.kind === "root" ? (S.n.kids || chapOf[S.n.t] || []).length : lit ? Math.max(0, lit.size - (S.n && lit.has(S.n) ? 1 : 0)) : 0;
      const col = S.n ? COL[S.n.t] : S.kind === "idea" ? COL[S.t] : palette.gold, canFocus = S.kind !== "root";
      cx.innerHTML = `<i class="dot" style="background:${col}"></i><span class="nm">${esc(name)}</span>${k ? `<span class="ct">${esc(t("conn")(k))}</span>` : ""}` +
        (canFocus ? `<span class="seg" role="group"><button type="button" data-focus="1" aria-pressed="${focusMode}">${esc(t("focus"))}</button><button type="button" data-focus="0" aria-pressed="${!focusMode}">${esc(t("whole"))}</button></span>` : "") +
        `<button type="button" class="x" data-clear aria-label="${esc(t("clearSel"))}">×</button>`;
    }
  }
  const zf = $("zfit"); if(zf) zf.setAttribute("aria-label", t("fit"));
}
document.addEventListener("click", e => {
  const lgb = e.target.closest("#legend [data-lg]"), hb = e.target.closest("#legend [data-hide]"), fb = e.target.closest("#ctx [data-focus]"), cb = e.target.closest("#ctx [data-clear]");
  if(lgb){ legendOpen = !legendOpen; try{ localStorage.setItem("gg-graph-legend", legendOpen ? "1" : "0"); }catch(err){} renderChrome(); }
  else if(hb){ const k = hb.dataset.hide; if(hid.has(k)) hid.delete(k); else if(hid.size < 2) hid.add(k); renderChrome(); kick(); }   // never hide all three
  else if(fb){ focusMode = fb.dataset.focus === "1"; renderChrome(); kick(); }
  else if(cb){ nav("#/"); }
});
$("panel").addEventListener("click", e => {
  // phone full screen: Back returns to where the reader was (previous view, its camera and scroll); with nowhere to go back to, fold down to the map
  if(e.target.closest("[data-pback]")){ if(history.state?.nav) history.back(); else { collapsed = true; peekOpen = false; renderPanel(); fly(); } return; }
  if(phone.matches && !collapsed && e.target.closest('a[href^="#"]')) fullNext = true;
  if(e.target.closest("[data-min]") || (collapsed && phone.matches)){ if(phone.matches && collapsed){ riseTray(); return; } collapsed = !collapsed; renderPanel(); fly(); } });
// phones: open the tray as its own history step, so the phone's Back closes it back to the bubble
function riseTray(){ rememberView(); history.pushState({universe:true, nav:(history.state?.nav || 0) + 1}, "", location.href);
  collapsed = false; peekOpen = true; renderPanel(); $("qs").setAttribute("aria-current", S.kind === "home" ? "true" : "false"); }
// phones: the tray slides between card and full page (transform only, run by the compositor); on the overview the card is hidden
function setMin(p, r0, was){ const gone = phone.matches && collapsed && S.kind === "home";
  p.classList.toggle("min", collapsed); p.classList.toggle("gone", gone);
  if(was === collapsed || !phone.matches || reduce.matches || gone || !r0.height || !p.animate) return;
  const by = r0.top - p.getBoundingClientRect().top; if(Math.abs(by) < 2) return;
  const a = p.animate([{transform:`translateY(${by}px)`}, {transform:"none"}], {duration:280, easing:"cubic-bezier(.2,.8,.2,1)"}); setTimeout(() => a.cancel(), 450); }

// Existing native reading routes are the sole reading UI.
function readerHref(n){if(n.t==='u'&&n.kind==='chap')return `../upanishads/upanishad/${encodeURIComponent(n.up.id)}/`;if(n.t==='u')return `../upanishads/story/${encodeURIComponent((n.story||n).s.id)}/`;const book=n.t==='g'?'gita':'ashtavakra',c=n.kind==='verse'?n.d.c:n.num;return `../${book}/chapter/${c}/${n.kind==='verse'?`verse/${n.d.v}/`:''}`;}
function rememberView(){history.replaceState({...history.state,universe:true,view:{hash:location.hash||'#/',cam:tgt?{x:tgt.x,y:tgt.y,z:tgt.z}:{...cam},collapsed,peek:peekOpen,scroll:$('panel').scrollTop}},'',location.href);}
function restoreView(view){if(!view||view.hash!==(location.hash||'#/'))return false;Object.assign(cam,view.cam);tgt=null;cv.setAttribute("data-camera-state","settled");collapsed=!!view.collapsed;peekOpen=!!view.peek;$('panel').classList.toggle('min',collapsed);$('panel').classList.toggle('gone',phone.matches&&collapsed&&S.kind==='home');$('panel').scrollTop=view.scroll||0;dirty=true;return true;}
addEventListener('pagehide',rememberView);addEventListener('pageshow',e=>{if(started){try{const l=localStorage.getItem('gg-lang'),t=localStorage.getItem('gg-theme');if(['en','hi'].includes(l))lang=l;if(['system','dark','light'].includes(t))theme=t;}catch{}refreshWords();if(e.persisted)restoreView(history.state?.view);kick();}});
document.addEventListener('click',e=>{const a=e.target.closest('a[data-reader]');if(a&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey)rememberView();});
// links: real hrefs so everything works without the canvas; same-page hashes go through history
document.addEventListener("click", e => {
  const a = e.target.closest("a[href^='#/']"); if(!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault(); nav(a.getAttribute("href"));
});

// ---------- camera ----------
const cam = {x:0, y:0, z:.3}; let tgt = null, W = 0, H = 0, dpr = 1, dirty = true, started = false, hover = null, clock = 0;
const cv = $("cv"), ctx = cv.getContext("2d");
const viewTilt={x:0,y:0},tiltGoal={x:0,y:0};
function projected(n){const depth=n.depth||0,k=1+depth/1800;return{x:n.x*k+depth*.12+depth*viewTilt.x*.08,y:n.y*k*.92-depth*.18+depth*viewTilt.y*.06};}
const toS=n=>{const p=projected(n);return{x:(p.x-cam.x)*cam.z+W/2,y:(p.y-cam.y)*cam.z+H/2};};
function sphere(x,y,r,color){const rgb=color.match(/[a-f0-9]{2}/gi).slice(0,3).map(v=>parseInt(v,16));const bright=rgb.map(v=>Math.round(v+(255-v)*.65));const edge=rgb.map(v=>Math.round(v*.76));const g=ctx.createRadialGradient(x-r*.3,y-r*.38,0,x,y,r);g.addColorStop(0,`rgb(${bright})`);g.addColorStop(.6,color);g.addColorStop(1,`rgb(${edge})`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}

function insets(){ const wide = W > 900, pn = $("panel").getBoundingClientRect();
  return wide ? {l:S.kind === "home" && W >= 1100 ? 310 : 20, r:pn.width + 50, t:85, b:105} : {l:10, r:10, t:70, b:collapsed ? 150 : Math.min(H*.34, pn.height) + 120}; }
function boundsOf(list){ const pts=list.map(projected),xs=pts.map(n=>n.x),ys=pts.map(n=>n.y); return {x0:Math.min(...xs), x1:Math.max(...xs), y0:Math.min(...ys), y1:Math.max(...ys)}; }
function camFor(list, maxZ){
  if(!list.length)list=Object.values(roots);
  const b = boundsOf(list), I = insets(), aw = W - I.l - I.r, ah = H - I.t - I.b, bw = Math.max(40, b.x1 - b.x0 + 70 + (S.kind === "home" ? 150 : 0)), bh = Math.max(40, b.y1 - b.y0 + 70);
  const z = Math.max(.08,Math.min(maxZ,Math.max(40,aw)/bw,Math.max(40,ah)/bh)), cx = (b.x0 + b.x1)/2, cy = (b.y0 + b.y1)/2;
  // keep the focus in the free part of the screen (not under the panel)
  return {z, x:cx - ((I.l - I.r)/2)/z, y:cy - ((I.t - I.b)/2)/z};
}
function fly(){
  if(!W) return;
  let c;
  if(S.kind === "home") c = camFor([...Object.values(roots), ...ideas], 2);
  else if(S.kind === "chapters") c = camFor(nodes.filter(n => n.kind !== "idea"), 2);
  else if(S.kind === "root") c = camFor(nodes.filter(n => n.t === S.n.t && n.kind !== "idea"), 2);
  else if(S.kind === "chap") c = camFor([S.n, ...S.n.kids], S.n.t === "u" ? 4 : 5);
  else if(S.kind === "verse"||S.kind === "passage") c = camFor([S.n],4);
  else if(S.kind === "story") c = camFor([S.n, ...S.n.xg, ...S.n.xa, S.n.ch], 3);
  // a phone's small card: zoom in on the tapped idea itself, not out to every verse that carries it
  else if(S.kind === "idea" && phone.matches && collapsed && iBy.get(`${S.t}:${S.id}`)) c = camFor([iBy.get(`${S.t}:${S.id}`)], .8);
  else c = camFor([...(lit || [])].slice(0, 600).concat(hub ? [hub] : []), 3.2);
  if(readOpen){ dirty = true; }
  tgt = reduce.matches ? null : {...c, t0:performance.now(), from:{...cam}}; if(!tgt) Object.assign(cam, c);
  cv.setAttribute("data-camera-state",tgt?"moving":"settled");dirty = true; kick();
}
const ease = u => u < .5 ? 4*u*u*u : 1 - Math.pow(-2*u + 2, 3)/2;
function step(now){
 if(!reduce.matches&&!paused){viewTilt.x+=(tiltGoal.x-viewTilt.x)*.045;viewTilt.y+=(tiltGoal.y-viewTilt.y)*.045;}

  if(tgt){ const u = Math.min(1, (now - tgt.t0)/700), e = ease(u), f = tgt.from;
    cam.z = Math.exp(Math.log(f.z) + (Math.log(tgt.z) - Math.log(f.z))*e); cam.x = f.x + (tgt.x - f.x)*e; cam.y = f.y + (tgt.y - f.y)*e; if(u>=1){tgt=null;cv.setAttribute("data-camera-state","settled");}dirty=true; }
}

// ---------- draw ----------
const stars = Array.from({length:150}, (_, i) => ({x:(Math.sin(i*12.9898)*43758.5453)%1, y:(Math.sin(i*78.233)*12345.678)%1, r:.4 + (i%5)*.2, a:.25 + (i%4)*.12}));
function glow(x,y,r,c,a){const rgb=c.match(/[a-f0-9]{2}/gi).slice(0,3).map(v=>parseInt(v,16));const hue=palette.dark?rgb:rgb.map((v,i)=>Math.round(v*.25+[255,239,205][i]*.75));const rgba=alpha=>`rgba(${hue.join(',')},${alpha})`;ctx.save();ctx.shadowBlur=0;ctx.shadowColor='rgba(0,0,0,0)';ctx.globalAlpha=a*(palette.dark?1:.7);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,rgba(1));g.addColorStop(.45,rgba(.3));g.addColorStop(1,rgba(0));ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore();}
function draw(){
  const fontRead=getComputedStyle(document.documentElement).getPropertyValue(lang==='hi'?'--f-hi':'--f-read').trim()||'Georgia';
  const panelRect=$('panel').getBoundingClientRect();
  const labelBoxes=[{x0:panelRect.left,x1:panelRect.left+panelRect.width,y0:panelRect.top-60,y1:panelRect.top-60+panelRect.height}];
  if(S.kind==='home'&&W>=1100)labelBoxes.push({x0:0,x1:310,y0:40,y1:400});
  const overlaps=b=>labelBoxes.some(a=>!(b.x1<a.x0||b.x0>a.x1||b.y1<a.y0||b.y0>a.y1));
  const reserve=(text,x,y,center=false)=>{const w=ctx.measureText(text).width+12;const box={x0:center?x-w/2:x-3,x1:center?x+w/2:x+w,y0:y-10,y1:y+12};labelBoxes.push(box);return box;};
  ctx.font=(W<600?'15px':'20px')+' '+getComputedStyle(document.documentElement).getPropertyValue('--f-read');
  for(const root of Object.values(roots)){const p=toS(root);reserve(nm(root),p.x,p.y+26,true);}

  ctx.setTransform(dpr,0,0,dpr,0,0); ctx.fillStyle = palette.bg; ctx.fillRect(0,0,W,H);
  ctx.fillStyle = palette.muted;
  for(const s of stars){ ctx.globalAlpha = Math.abs(s.a); ctx.beginPath(); ctx.arc(Math.abs((s.x*W - cam.x*.03 + W*3) % W), Math.abs((s.y*H - cam.y*.03 + H*3) % H), s.r, 0, 7); ctx.fill(); }
  ctx.globalAlpha = 1;
  const ideaPeek = isIdeaPeek(), web = webMode(), z = cam.z, deep = deepOf(z), home = S.kind === "home", filtering = !!lit && (S.kind === "q" || S.kind === "idea" && !ideaPeek), selId = ideaPeek ? `i:${S.t}:${S.id}` : S.n ? S.n.id : null, chapSel = S.kind === "chap" ? S.n : S.kind === "verse" ? S.n.ch : null;
  const focusing = isFocus(), relT = focusing ? relTexts() : null;
  for(const k of ['g','a','u']){if(hid.has(k))continue;const p=toS(roots[k]);glow(p.x,p.y,Math.min(520,(k==='g'?760:560)*z),COL[k],palette.dark?.12:.055);glow(p.x-80*z,p.y+65*z,Math.min(330,470*z),COL[k==='g'?'u':'g'],palette.dark?.055:.025);}
  // constellation threads: text -> each chapter
  ctx.lineWidth = .7;
  const wa = 1 - .75*deep;   // the idea web's strength as the overview is zoomed in
  if(home){ const o = String(Math.max(0, 1 - deep*1.6).toFixed(2)), hero = $("hero"); if(hero.style.opacity !== o){ hero.style.opacity = o; hero.style.pointerEvents = o === "0.00" ? "none" : ""; } }
  if(web){
    const live0 = !paused && !reduce.matches;
    for(const n of ideas){ if(hid.has(n.t)) continue; const rp = toS(roots[n.t]), p = toS(n); ctx.strokeStyle = COL[n.t]; ctx.globalAlpha = .12*wa; ctx.beginPath(); ctx.moveTo(rp.x, rp.y); ctx.lineTo(p.x, p.y); ctx.stroke(); }
    iedges.forEach((e, i) => { if(hid.has(e.a.t) || hid.has(e.b.t)) return; const a = toS(e.a), b = toS(e.b), cx = (a.x + b.x)/2 + (b.y - a.y)*.13, cy = (a.y + b.y)/2 - (b.x - a.x)*.13;
      ctx.strokeStyle = e.cross ? palette.gold : COL[e.a.t]; ctx.globalAlpha = (e.cross ? .5 : .3)*wa; ctx.lineWidth = e.cross ? 1 : .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cx, cy, b.x, b.y); ctx.stroke();
      if(live0 && wa > .5 && (e.cross || i % 3 === 0)){ const u = (clock*.00006 + i*.211) % 1, v = 1 - u, x = v*v*a.x + 2*v*u*cx + u*u*b.x, y = v*v*a.y + 2*v*u*cy + u*u*b.y; glow(x, y, 8, palette.gold, .4); ctx.globalAlpha = 1; ctx.fillStyle = palette.gold; ctx.beginPath(); ctx.arc(x, y, 1.3, 0, 7); ctx.fill(); } });
    ctx.globalAlpha = 1;
  }
  if(!web || home && deep > 0) for(const k of ['g','a','u']){if(hid.has(k)||focusing)continue;const rp=toS(roots[k]);ctx.strokeStyle=COL[k];ctx.lineWidth=.65;
    chapOf[k].forEach((c,i)=>{const p=toS(c),bend=(i%2?1:-1)*.15;ctx.globalAlpha=(filtering?.035:.11)*(home?deep:1);ctx.beginPath();ctx.moveTo(rp.x,rp.y);ctx.quadraticCurveTo((rp.x+p.x)/2+(p.y-rp.y)*bend,(rp.y+p.y)/2-(p.x-rp.x)*bend,p.x,p.y);ctx.stroke();
    if(i>0){const q=toS(chapOf[k][i-1]);ctx.globalAlpha=(filtering?.025:.16)*(home?deep:1);ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.quadraticCurveTo((q.x+p.x)/2+(p.y-q.y)*.08,(q.y+p.y)/2-(p.x-q.x)*.08,p.x,p.y);ctx.stroke();}
    });ctx.globalAlpha=1;}
  // These bridge threads are the existing story-to-verse citations, not tag-name equivalences.
  if(web){overviewEdges.forEach(([a,b],i)=>{if(hid.has(a.t)||hid.has(b.t))return;const p=toS(a),q=toS(b),cx=(p.x+q.x)/2+(q.y-p.y)*.2,cy=(p.y+q.y)/2-(q.x-p.x)*.2;ctx.strokeStyle=COL[a.t];ctx.globalAlpha=(palette.dark?.18:.13)*wa;ctx.lineWidth=.75;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.quadraticCurveTo(cx,cy,q.x,q.y);ctx.stroke();if(!paused&&!reduce.matches){const t=(clock*.000045+i*.171)%1,u=1-t,x=u*u*p.x+2*u*t*cx+t*t*q.x,y=u*u*p.y+2*u*t*cy+t*t*q.y;glow(x,y,10,palette.gold,.35);ctx.globalAlpha=.9;ctx.fillStyle=palette.gold;ctx.beginPath();ctx.arc(x,y,1.2,0,7);ctx.fill();}});ctx.globalAlpha=1;}

  if(!web&&z>.35){for(const c of chapOf.g.concat(chapOf.a)){if(S.n!==c&&S.n?.ch!==c)continue;const p=toS(c);if(p.x<-180||p.x>W+180||p.y<-180||p.y>H+180)continue;ctx.strokeStyle=COL[c.t];ctx.globalAlpha=.1;ctx.lineWidth=.6;ctx.beginPath();ctx.ellipse(p.x,p.y,Math.max(30,...c.kids.map(n=>n.orr))*z,Math.max(30,...c.kids.map(n=>n.orr))*.65*z,-.12,0,Math.PI*2);ctx.stroke();if(S.n===c||S.n?.ch===c){for(const n of c.kids){const q=toS(n);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}}ctx.globalAlpha=1;}
  // glowing connections (question path, idea thread, story references)
  const live = !paused && !reduce.matches;
  if(!ideaPeek) edges.forEach((e, i) => {
    if(hid.has(e[0].t) || hid.has(e[1].t)) return;
    const a = toS(e[0]), b = toS(e[1]), cx = (a.x + b.x)/2 + (b.y - a.y)*.12, cy = (a.y + b.y)/2 - (b.x - a.x)*.12;
    ctx.strokeStyle = palette.gold; ctx.globalAlpha = .55; ctx.lineWidth = 1.1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(cx, cy, b.x, b.y); ctx.stroke();
    if(live && i < 30){ const u = (clock*.00009 + i*.173) % 1, v = 1 - u, x = v*v*a.x + 2*v*u*cx + u*u*b.x, y = v*v*a.y + 2*v*u*cy + u*u*b.y; glow(x, y, 9, palette.gold, .5); ctx.globalAlpha = 1; ctx.fillStyle = palette.gold; ctx.beginPath(); ctx.arc(x, y, 1.6, 0, 7); ctx.fill(); }
  });
  ctx.globalAlpha = 1;
  // what the lines mean: one label per relationship in view (focus only, so it never crowds the whole graph)
  const relTags = [];
  if(focusing && !ideaPeek){
    const groups = new Map();
    edges.forEach(e => { if(!e[2] || hid.has(e[0].t) || hid.has(e[1].t)) return; const g = groups.get(e[2]) || {n:0, e}; g.n++; groups.set(e[2], g); });
    groups.forEach((g, id) => { const a = toS(g.e[0]), b = toS(g.e[1]); relTags.push({id, n:g.n, x:(a.x + b.x)/2, y:(a.y + b.y)/2}); });
    const c = S.kind === "chap" ? S.n : S.kind === "verse" ? S.n.ch : null;
    if(c && c.kids && c.kids.length && z > .35){ const a = toS(c), b = toS(c.kids[Math.floor(c.kids.length/3)]); relTags.push({id:"contains", n:c.kids.length, x:a.x + (b.x - a.x)*.55, y:a.y + (b.y - a.y)*.55}); }
  }
  // points
  const vr = z < .5 ? 1.2 : z < 1.2 ? 1.8 : z < 3 ? 2.6 : 3.6;
  for(const n of (filtering && drawOrder) || nodes){
    if(n.kind === "root" || hid.has(n.t) || focusing && !rel(n)) continue;
    const f = fadeOf(n, deep);
    if(f < .03 && small(n)) continue;
    if(home ? f < .03 : web ? n.kind !== "idea"&&!overviewStars.has(n) : n.kind === "idea") continue;
    const p = toS(n); if(p.x < -40 || p.x > W + 40 || p.y < -40 || p.y > H + 40) continue;
    const isLit = lit && lit.has(n), sel = n.id === selId, dimC = chapSel && n.kind === "verse" && n.ch !== chapSel;
    if(dimC && !isLit && !sel && n !== hover) continue;   // with a chapter open, only its own shlokas are drawn
    const alpha=(filtering?(isLit||sel?1:litCh.has(n)?.85:.12):1)*(0.78+(n.depth||0)/1100)*f;
    ctx.globalAlpha = alpha; ctx.fillStyle = COL[n.t];
    const r = n.kind === "idea" ? 3 + Math.sqrt(n.tags.size)*.6 : (n.kind === "verse"||n.kind === "passage") ? (isLit ? vr*1.7 : vr) : n.kind === "story" ? 3.5 + z*.4 : 3.5 + Math.min(3, z*1.2);
    if((n.kind !== "verse"&&n.kind!=="passage") || isLit || sel || n === hover) glow(p.x, p.y, isLit || sel ? 20 : 12, COL[n.t], isLit || sel ? .45 : .25);
    ctx.beginPath(); ctx.arc(p.x,p.y,sel?r*1.5:n===hover?r*1.4:r,0,7);ctx.fill();if(n.kind==='chap'||n.kind==='idea'||n.kind==='story'||sel)sphere(p.x,p.y,sel?r*1.5:n===hover?r*1.4:r,COL[n.t]);
    if(sel){ ctx.strokeStyle = COL[n.t]; ctx.lineWidth = .9; ctx.globalAlpha = .55; ctx.beginPath(); ctx.arc(p.x, p.y, r + 7 + (live ? Math.sin(clock*.002)*1.3 : 0), 0, 7); ctx.stroke(); }
    ctx.globalAlpha = alpha;
    const label = f < .5 && n !== hover ? false : web&&overviewStars.has(n)&&n!==hover&&deep<.5?false:n.kind === "idea" ? true : n.kind === "chap" ? (z > .45 && !filtering || litCh.has(n) || sel || n === hover) : n.kind === "story" ? (z > 1.3 && !filtering || isLit || sel || n === hover) : (z > 3 && !filtering) || isLit || sel || n === hover;
    if(label){
      const txt = n.kind === "idea" ? nm(n) : (n.kind === "verse"||n.kind === "passage") ? n.ref : n.kind === "chap" ? (n.num ? (sel?`${t("chapter")} ${n.num}`:`${n.num} · ${nm(n)}`) : nm(n)) : nm(n);
      ctx.font = n.kind === "verse" ? "10px system-ui,sans-serif" : n.kind === "idea" ? "12.5px "+fontRead : "11.5px "+fontRead; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.shadowColor = palette.bg; ctx.shadowBlur = 6;
      const lx=p.x+r+5,w=ctx.measureText(txt).width+8,box={x0:lx-3,x1:lx+w,y0:p.y-9,y1:p.y+10};
      if(sel||n===hover||box.x0>=8&&box.x1<=W-8&&box.y0>=8&&box.y1<=H-8&&!overlaps(box)){labelBoxes.push(box);ctx.fillStyle=sel?palette.ink:n.kind==='chap'?COL[n.t]:n.kind==='idea'?palette.ink:palette.muted;ctx.fillText(txt,lx,p.y);}ctx.shadowBlur=0;
    } else if(n.kind === "chap" && z <= .45 && n.num && !filtering){ ctx.font = "9px system-ui"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillStyle = COL[n.t]; ctx.globalAlpha = .8; ctx.fillText(String(n.num), p.x, p.y + 12); }
  }
  ctx.globalAlpha = 1;
  if(hub && !web){ const p = toS(hub), c = COL[hub.t]; glow(p.x, p.y, 40, c, .45); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, 7); ctx.fill(); sphere(p.x, p.y, 9, c);
    ctx.strokeStyle = c; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, 7); ctx.stroke();
    ctx.font = "600 15px "+fontRead; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.shadowColor = palette.bg; ctx.shadowBlur = 8; ctx.fillStyle = palette.ink; ctx.fillText(nm(hub), p.x + 20, p.y); ctx.shadowBlur = 0; }
  for(const tg of relTags){ const txt = `${relName(tg.id)} · ${tg.n}`; ctx.font = "500 11.5px system-ui,sans-serif"; const w = ctx.measureText(txt).width + 16, x = Math.max(8, Math.min(W - w - (phone.matches ? 8 : 430), tg.x - w/2)), y = Math.max(70, Math.min(H - 30, tg.y - 11));
    ctx.globalAlpha = .96; ctx.fillStyle = palette.bg; ctx.strokeStyle = REL[tg.id].ev === "text" ? palette.muted : palette.gold; ctx.lineWidth = 1; if(REL[tg.id].ev !== "text") ctx.setLineDash([3, 3]);
    ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(x, y, w, 22, 6); else ctx.rect(x, y, w, 22); ctx.fill(); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = 1; ctx.fillStyle = palette.ink; ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.fillText(txt, x + 8, y + 11.5); }
  for(const k of ["g","a","u"]){ if(hid.has(k) || focusing && !relT.has(k)) continue; const r = roots[k], p = toS(r); glow(p.x, p.y, 34, COL[k], .35); ctx.fillStyle = COL[k]; ctx.beginPath(); ctx.arc(p.x,p.y,6,0,7);ctx.fill();sphere(p.x,p.y,7,COL[k]);
    ctx.font = (W < 600 ? "15px" : "20px") + " "+fontRead; ctx.textAlign = "center"; ctx.textBaseline = "top"; ctx.shadowColor = palette.bg; ctx.shadowBlur = 8; ctx.fillStyle = COL[k]; ctx.globalAlpha = filtering ? .55 : 1; ctx.fillText(nm(r), p.x, p.y + 16); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
}
let last = 0, lastDraw = 0;
const animated = () => !paused && !reduce.matches;
function loop(now){
  // nothing to draw while hidden, or while a phone's full-screen page covers the map (Back/collapse calls kick() again)
  if(document.hidden || phone.matches && !collapsed){raf=0;return;}
  clock = paused ? clock : clock + Math.min(50, now - (last || now)); last = now;
  step(now);
  const go = tgt || animated();
  if(dirty || (go && now - lastDraw > 30)){ setPositions(clock); draw(); dirty = false; lastDraw = now; }
  raf = go ? requestAnimationFrame(loop) : 0;
}
document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0;}else{dirty=true;kick();}});
let raf = 0; function kick(){ if(!document.hidden&&!raf) raf = requestAnimationFrame(loop); }
function size(){ W = innerWidth; H = innerHeight - 60; dpr = Math.min(2, devicePixelRatio || 1); cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); dirty = true; }
addEventListener("resize", () => { const first = !W; size(); if(first || !tgt) fly(); kick(); });

// ---------- input ----------
const ptrs = new Map(); let drag = null, pinch = null, lastTap=null, tapTimer=null;
function cancelTap(){if(tapTimer!==null)clearTimeout(tapTimer);tapTimer=null;lastTap=null;}
function doubleZoom(sx,sy){const from={...cam};zoomAt(1.8,sx,sy);const next={...cam};if(!reduce.matches){Object.assign(cam,from);tgt={...next,t0:performance.now(),from};cv.setAttribute("data-camera-state","moving");}dirty=true;kick();}
// phones: tapping the bubble that is already selected, or double-tapping a bubble, opens its tray full screen
const isSel = n => !!n && (S.n === n || n.kind === "idea" && S.kind === "idea" && n.t === S.t && n.hid === S.id);
function openTray(n){ if(!isSel(n)) mapNav(n); riseTray(); }
function tap(n,event,touch){if(!touch){if(n){if(phone.matches&&collapsed&&isSel(n))openTray(n);else mapNav(n);}return;}const now=performance.now(),prior=lastTap;if(prior&&now-prior.time<=320&&Math.hypot(prior.x-event.clientX,prior.y-event.clientY)<28){cancelTap();if(phone.matches&&n&&prior.node===n){openTray(n);return;}doubleZoom(event.clientX,event.clientY);return;}
if(tapTimer!==null){clearTimeout(tapTimer);if(prior?.node)mapNav(prior.node);}lastTap={time:now,x:event.clientX,y:event.clientY,node:n};tapTimer=setTimeout(()=>{const selected=lastTap?.node;tapTimer=null;lastTap=null;if(selected){if(phone.matches&&collapsed&&isSel(selected))openTray(selected);else mapNav(selected);}},320);}

const toW = (sx, sy) => ({x:(sx - W/2)/cam.z + cam.x, y:(sy - H/2)/cam.z + cam.y});
function zoomAt(f, sx, sy){ const w = toW(sx, sy-60), z = Math.max(.12, Math.min(9, cam.z*f)); cam.z = z; cam.x = w.x - (sx - W/2)/z; cam.y = w.y - (sy - 60 - H/2)/z; tgt=null;cv.setAttribute("data-camera-state","settled");dirty=true;kick();}
// phone small card on an idea: stay in the idea web, zoomed in on it, with the idea marked; its bubbles stay tappable
// Relationships. `ev` is the evidence for a link, kept apart from what the link means, so more precise relations can be
// added later without changing how provenance is shown. A link never borrows authority from what it joins: two verses of
// scripture joined by an editor are still an editorial link.
//   text      stated by the text itself (chapter structure, what a story quotes)
//   editorial identified by our editors (idea tags, cross-text echoes, verses chosen for a question)
//   derived   computed from editorial tags (two ideas occurring in the same verses)
const REL = {
  contains: {en:"contains",       hi:"में है",        ev:"text"},
  draws:    {en:"draws on",       hi:"आधार",         ev:"text"},
  speaks:   {en:"speaks of",      hi:"विषय",         ev:"editorial"},
  echoes:   {en:"echoes",         hi:"समान विचार",    ev:"editorial"},
  explores: {en:"explores",       hi:"विचार",         ev:"editorial"},
  cooccurs: {en:"co-occurs with", hi:"साथ मिलता है",  ev:"derived"},
};
const EV = {
  text:      {en:"From the text", hi:"पाठ से",    n_en:"Stated by the text itself.",                              n_hi:"स्वयं पाठ में कहा गया है।"},
  editorial: {en:"Editorial",     hi:"संपादकीय", n_en:"A connection identified by our editors.",                  n_hi:"यह संबंध हमारे संपादकों ने पहचाना है।"},
  derived:   {en:"Computed",      hi:"गणना से",  n_en:"Worked out from our editors' idea tags, not stated in the text.", n_hi:"हमारे संपादकों के विषय-टैग से निकाला गया, पाठ में कहा नहीं गया।"},
};
const relName = id => REL[id][lang === "hi" ? "hi" : "en"];
// a small provenance tag for a panel heading: what kind of link the list below is, and what supports it
const evc = id => { const e = EV[REL[id].ev]; return `<span class="evc ev-${REL[id].ev}" title="${esc(lang === "hi" ? e.n_hi : e.n_en)}">${esc(relName(id))} · ${esc(lang === "hi" ? e.hi : e.en)}</span>`; };
// Legend filter: texts the reader has switched off. Focus: with something selected, draw only it and what it connects to.
const hid = new Set(); let focusMode = true;
const isFocus = () => focusMode && !!S.n && (S.kind === "chap" || S.kind === "verse" || S.kind === "story" || S.kind === "passage") || focusMode && (S.kind === "q" || S.kind === "idea" && !isIdeaPeek());
const rel = n => n === S.n || !!lit && lit.has(n) || litCh.has(n) || !!S.n && (n.ch === S.n || n === S.n.ch || n.story === S.n || n === S.n.story || !!S.n.ch && n.ch === S.n.ch || !!S.n.story && n.story === S.n.story);
const relTexts = () => new Set([S.n && S.n.t, S.kind === "idea" ? S.t : null, ...(lit ? [...lit].map(n => n.t) : [])].filter(Boolean));
const isIdeaPeek = () => S.kind === "idea" && phone.matches && collapsed;
const webMode = () => S.kind === "home" || isIdeaPeek();
// overview zoom works like a map: zooming in fades the idea web into the chapter constellations and their shlokas (0 = web, 1 = constellations)
const deepOf = z => S.kind !== "home" ? (webMode() ? 0 : 1) : Math.max(0, Math.min(1, (z - .32)/.3));
// On the overview the shlokas (and a story's passages) stay hidden until the reader has zoomed well into a chapter:
// at chapter scale they are clutter around the names. Opening a chapter shows its own shlokas.
const closeUp = () => Math.max(0, Math.min(1, (cam.z - 1.6)/.5));
// the same holds on the Chapters view and on a single text: chapter names first, shlokas only close up
const small = n => n.kind === "verse" || n.kind === "passage";
const fadeOf = (n, deep) => S.kind === "chapters" || S.kind === "root" ? (small(n) && !(lit && lit.has(n)) ? closeUp() : 1) : S.kind !== "home" ? 1 : n.kind === "idea" ? 1 - .65*deep : n.kind === "root" || overviewStars.has(n) ? 1 : (n.kind === "verse" || n.kind === "passage") ? closeUp() : deep;
function hit(sx, sy, touch){
  const R = touch ? 22 : 14; let best = null, bd = 1e9;
  const openCh = S.kind === "chap" ? S.n : S.kind === "verse" ? S.n.ch : null;
  const fc = isFocus();
  for(const n of nodes){
    if(hid.has(n.t) || fc && n.kind !== "root" && !rel(n)) continue;
    if(S.kind === "home" ? fadeOf(n, deepOf(cam.z)) < .4 : webMode() ? n.kind !== "idea" && n.kind !== "root" && !overviewStars.has(n) : n.kind === "idea") continue;
    if((n.kind === "verse"||n.kind==="passage") && cam.z < 1.1 && !(lit && lit.has(n))) continue;
    if(openCh && n.kind === "verse" && n.ch !== openCh && !(lit && lit.has(n))) continue;   // not drawn, so not tappable
    if(small(n) && fadeOf(n, 1) < .4) continue;
    const p = toS(n), d = Math.hypot(p.x - sx, p.y - (sy-60)) - ((n.kind === "verse"||n.kind==="passage") ? 0 : 4);
    if(d < R && d < bd){ bd = d; best = n; }
  }
  return best;
}
cv.addEventListener("pointerdown", e => { cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, {x:e.clientX, y:e.clientY, t:e.pointerType});
  if(ptrs.size > 1)cancelTap();
  if(ptrs.size === 1) drag = {x:e.clientX, y:e.clientY, cx:cam.x, cy:cam.y, moved:false}; else { drag = null; const [a,b] = [...ptrs.values()]; pinch = {d:Math.hypot(a.x-b.x, a.y-b.y), z:cam.z}; } });
cv.addEventListener("pointermove", e => {
  const pt = ptrs.get(e.pointerId);
  if(!pt){ if(e.pointerType === "mouse"){ tiltGoal.x=e.clientX/W-.5;tiltGoal.y=(e.clientY-60)/H-.5;const h = hit(e.clientX, e.clientY); if(h !== hover){ hover = h; cv.style.cursor = h ? "pointer" : "grab"; dirty = true; kick(); } } return; }
  pt.x = e.clientX; pt.y = e.clientY;
  if(ptrs.size === 2 && pinch){ const [a,b] = [...ptrs.values()]; zoomAt(pinch.z*Math.hypot(a.x-b.x, a.y-b.y)/pinch.d/cam.z, (a.x+b.x)/2, (a.y+b.y)/2); return; }
  if(drag){ const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if(Math.hypot(dx,dy)>5){drag.moved=true;cancelTap();} if(drag.moved){ cam.x = drag.cx - dx/cam.z; cam.y = drag.cy - dy/cam.z; tgt = null; dirty = true; kick(); } }
});
const endp = e => { const was = ptrs.get(e.pointerId); ptrs.delete(e.pointerId); if(ptrs.size < 2) pinch = null;
  if(drag && !drag.moved && was && e.type === "pointerup"){ const h = hit(e.clientX, e.clientY, was.t !== "mouse"); tap(h,e,was.t==="touch"); }
  if(e.type==="pointercancel")cancelTap();
  if(ptrs.size===1){const p=[...ptrs.values()][0];drag={x:p.x,y:p.y,cx:cam.x,cy:cam.y,moved:true};}else if(!ptrs.size)drag=null; };
cv.addEventListener("dblclick",e=>{e.preventDefault();if(phone.matches&&!collapsed&&peekOpen)return;doubleZoom(e.clientX,e.clientY);});
cv.addEventListener("pointerup", endp); cv.addEventListener("pointercancel", endp);
cv.addEventListener("pointerleave", () => { if(hover){ hover = null; dirty = true; kick(); } });
cv.addEventListener("wheel", e => { e.preventDefault(); zoomAt(Math.exp(-e.deltaY*.0015), e.clientX, e.clientY); }, {passive:false});
cv.addEventListener("keydown", e => {
  const s = 60/cam.z; let d = true;
  if(e.key === "ArrowLeft") cam.x -= s; else if(e.key === "ArrowRight") cam.x += s; else if(e.key === "ArrowUp") cam.y -= s; else if(e.key === "ArrowDown") cam.y += s;
  else if(e.key === "+" || e.key === "=") zoomAt(1.3, W/2, H/2+60); else if(e.key === "-") zoomAt(1/1.3, W/2, H/2+60);
  else if(e.key === "Escape"){ if(history.state?.nav)history.back();else nav("#/"); } else d = false;
  if(d){ e.preventDefault(); tgt = null; dirty = true; kick(); }
});
if($("zfit")) $("zfit").onclick = () => { fly(); kick(); };
$("zin").onclick = () => zoomAt(1.4, W/2, H/2+60); $("zout").onclick = () => zoomAt(1/1.4, W/2, H/2+60);
$("home").onclick = () => nav("#/"); $("chaps").onclick = () => nav("#/chapters");   // phones: stay on the graph (every chapter as a constellation); the list opens only when asked for
$("qs").onclick = () => { if(S.kind !== "home"){ fullNext = true; nav("#/"); } else if(phone.matches){ if(collapsed) riseTray(); } else if(collapsed){ collapsed = false; renderPanel(); fly(); } };
$("back").onclick = () => { if(history.state && history.state.nav) history.back(); else nav("#/"); };
function words(){
  document.documentElement.lang = lang; $("back").textContent = t("back"); $("home").textContent = t("home"); $("chaps").textContent = t("chapters2"); $("qs").textContent = t("qs"); $("heb").textContent = t("eb"); $("hh").innerHTML = t("h1"); $("hp").textContent = t("hp");
  $('cv').setAttribute('aria-label',lang==='hi'?'शास्त्र ब्रह्मांड। कीबोर्ड के लिए अध्याय सूची चुनें। तीर से घूमें और + / − से ज़ूम करें।':'Scripture universe. Use the chapter list for accessible navigation; arrow keys pan and plus or minus zoom.');$('panel').setAttribute('aria-label',lang==='hi'?'विवरण':'Details');$('zin').setAttribute('aria-label',lang==='hi'?'पास देखें':'Zoom in');$('zout').setAttribute('aria-label',lang==='hi'?'दूर देखें':'Zoom out');
  document.title=(lang==="hi"?"ग्राफ़":"Graph")+" · Gitagraph";$("hint").textContent=t("hint");$("guide").setAttribute("aria-label",lang==="hi"?"मार्गदर्शिका":"Guide");
  $("lang").textContent = lang==="hi"?"EN":"हि"; $("lang").setAttribute("aria-label", lang === "hi" ? "Switch to English" : "हिन्दी में देखें");
  $("motion").textContent = paused ? "▷" : "Ⅱ"; $("motion").setAttribute("aria-label", t(paused ? "play" : "pause")); $("motion").setAttribute("aria-pressed", String(paused));
}
$("lang").onclick = () => { lang = lang === "hi" ? "en" : "hi"; try{ localStorage.setItem("gg-lang",lang);localStorage.setItem("library-lang",lang); }catch(e){} refreshWords();dirty=true;kick(); };
$("motion").onclick = () => { paused = !paused; words(); dirty = true; kick(); };
reduce.addEventListener("change", () => { paused = reduce.matches; words(); dirty = true; kick(); });

function refreshWords(){const scroll=$('panel').scrollTop;words();drawTheme();renderPanel(false);$('panel').scrollTop=scroll;if(!$('help').hidden)helpWords();}
function helpWords(){$('help-title').textContent=lang==='hi'?'जिज्ञासा के साथ चलें':'Follow your curiosity';$('help-copy').innerHTML=lang==='hi'?'<p>खींचकर घूमें। दो उँगलियों, स्क्रॉल या दो बार टैप करके ज़ूम करें। अध्याय का तारा चुनें, फिर उसका श्लोक चुनें। सूत्र अध्याय क्रम, एक ग्रंथ में साथ आए विषय या मौजूदा कथा संदर्भ दिखाते हैं—शिक्षाओं की समानता नहीं। पूरा पाठ मौजूदा Gitagraph पाठक में खुलेगा; ब्राउज़र के वापस बटन से अपनी जगह पर लौटें।</p><p>कीबोर्ड: तीर से घूमें, + / − से ज़ूम करें। अध्याय सूची कैनवास का सुलभ विकल्प है। गति रोकने के लिए Ⅱ चुनें।</p>':'<p>Drag to wander. Pinch, scroll, or double-tap to zoom toward a spot. A mouse double-click also zooms in. Select a chapter star, then one of its shloka satellites. Threads show chapter order, tagged co-occurrence within a text, or existing story citations—not equivalent teachings. Full readings open in the existing Gitagraph reader; use your browser’s Back button to return to your place.</p><p>Keyboard: arrows pan; + / − zoom. The chapter list is an accessible alternative to the canvas. Select Ⅱ to pause motion.</p>';$('help-close').textContent=lang==='hi'?'खोज जारी रखें':'Continue exploring';}
let helpFocus=null;// the guide is its own Back step: the phone's Back (or Close) returns to the Explore view underneath
$('guide').onclick=()=>{helpFocus=document.activeElement;helpWords();rememberView();history.pushState({universe:true,nav:(history.state?.nav||0)+1,guide:true},'',location.href);$('help').hidden=false;$('app').inert=true;document.querySelector('.top').inert=true;$('help-close').focus();};function closeHelp(){if(history.state?.guide)history.back();else hideHelp();}function hideHelp(){$('help').hidden=true;$('app').inert=false;document.querySelector('.top').inert=false;helpFocus?.focus();}$('help-close').onclick=closeHelp;$('help').addEventListener('click',e=>{if(e.target===$('help'))closeHelp();});$('help').addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();closeHelp();}if(e.key==='Tab'){const fs=[...$('help').querySelectorAll('a[href],button:not(:disabled)')],i=fs.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();fs[fs.length-1].focus();}if(!e.shiftKey&&i===fs.length-1){e.preventDefault();fs[0].focus();}}});
addEventListener('storage',e=>{if(e.key==='gg-theme'){theme=['system','dark','light'].includes(e.newValue)?e.newValue:'system';drawTheme();if(started)refreshWords();kick();}if(e.key==='gg-lang'&&['en','hi'].includes(e.newValue)){lang=e.newValue;if(started)refreshWords();kick();}});
// ---------- boot ----------
const J = u => fetch(u).then(r => { if(!r.ok) throw 0; return r.json(); });
Promise.all([J("../gita/verses.json"), J("../gita/hubs.json"), J("../gita/questions.json"), J("../ashtavakra/verses.json"), J("../ashtavakra/hubs.json"), J("../upanishads/data.json")])
  .then(([gv, gh, qs, av, ah, ud]) => {
    GV = gv; QS = qs; AV = av; UD = ud; UP = ud.upanishads; ST = ud.stories;
    gh.forEach(h => { h.vs = []; GH.set(h.id, h); });
    GV.forEach(v => [...(v.k || []), ...(v.p || [])].forEach(id => { const h = GH.get(id); if(h && !h.vs.includes(v)) h.vs.push(v); }));
    ah.forEach(h => AH.set(h.id, h));
    build();
    GH.forEach(h => { h.vs = h.vs.map(v => gRef.get(`${v.c}.${v.v}`)).filter(Boolean); });
    $('loading').remove();words();size();drawTheme();if(!history.state?.universe)history.replaceState({universe:true,nav:0},'',location.href);apply();started=true;kick();
  })
  .catch(error=>{console.error('Universe data load failed',error);$('loading').innerHTML=`<div class="error"><p>${esc(T[lang].loadErr)}</p><button class="langpill" id="retry">${lang==='hi'?'फिर कोशिश करें':'Try again'}</button><p><a href="../">${lang==='hi'?'सभी ग्रंथ':'All texts'} →</a></p></div>`;$('retry').onclick=()=>location.reload();});
