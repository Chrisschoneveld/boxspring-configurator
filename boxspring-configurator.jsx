import React, { useState, useMemo, useEffect } from "react";
import { Check, ChevronRight, ChevronLeft, BedDouble, Send } from "lucide-react";

// ─── Huisstijl: blauw / wit / rood ───
const C = {
  blue: "#1E3C8E", blueDark: "#15306F", blueTint: "#EAEFFA",
  red: "#D81E27", redDark: "#B5151D",
  bg: "#F5F7FB", surface: "#FFFFFF", line: "#E3E8F0",
  text: "#1A2333", muted: "#5B6675", light: "#C9D4EC",
};
const B = C.blue, R = C.red;
const LOGO = "data:image/png;base64,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";
// ── Live data uit Business Central ──
// Vul hier de basis-URL van je Azure Function in (zonder / op het eind). Leeg = voorbeelddata.
const API_BASE = "https://boxspring-bc-api.vercel.app";
const mapBcItem = (it) => {
  const naam = it.displayName || it.naam || it.number || "Boxspring";
  const verstelbaar = /verstelbaar|elektrisch/i.test(naam);
  return {
    id: it.number || it.id || naam,
    naam,
    uitvoering: verstelbaar ? "Elektrisch verstelbaar" : "Vlak",
    type: verstelbaar ? "verstelbaar" : "vlak",
    vanaf: Math.round(it.unitPrice ?? it.vanaf ?? 0),
    tekst: it.description || "Volledig naar wens samen te stellen.",
    foto: it.pictureUrl || it.foto || null,
  };
};
const euro = (n) => "€ " + n.toLocaleString("nl-NL");

const O = {
  type: [
    { id: "vlak", label: "Vlak", prijs: 1299 },
    { id: "verstelbaar", label: "Elektrisch verstelbaar", prijs: 2199 },
  ],
  maat: [
    { id: "080X200", label: "80 × 200", prijs: 0 }, { id: "090X200", label: "90 × 200", prijs: 0 },
    { id: "120X200", label: "120 × 200", prijs: 120 }, { id: "140X200", label: "140 × 200", prijs: 180 },
    { id: "160X200", label: "160 × 200", prijs: 240 }, { id: "180X200", label: "180 × 200", prijs: 300 },
    { id: "180X210", label: "180 × 210", prijs: 360 }, { id: "180X220", label: "180 × 220", prijs: 420 },
  ],
  matras: [
    { id: "pocket", label: "Pocketvering", prijs: 449 },
    { id: "koud", label: "Koudschuim", prijs: 399 },
    { id: "traag", label: "Traagschuim", prijs: 549 },
  ],
  hardheid: ["Zacht", "Medium", "Stevig"],
  topper: [
    { id: "geen", label: "Geen", prijs: 0 }, { id: "koud", label: "Koudschuim", prijs: 199 },
    { id: "traag", label: "Traagschuim", prijs: 249 }, { id: "latex", label: "Latex", prijs: 299 },
  ],
  hoofdbord: [
    { id: "recht", label: "Recht", prijs: 0 }, { id: "gestoffeerd", label: "Gestoffeerd", prijs: 199 },
    { id: "luxe", label: "Luxe getuft", prijs: 399 },
  ],
  poten: [
    { id: "standaard", label: "Standaard", prijs: 0 }, { id: "rvs", label: "RVS", prijs: 79 },
    { id: "hout", label: "Hout", prijs: 99 },
  ],
  stofgroep: [
    { id: "g1", label: "Stofgroep 1", kleur: "#CDB89B", prijs: 0 },
    { id: "g2", label: "Stofgroep 2", kleur: "#3E6BB0", prijs: 150 },
    { id: "g3", label: "Stofgroep 3", kleur: "#5B2733", prijs: 350 },
  ],
  toebehoren: [
    { id: "dekbed", label: "Dekbed", prijs: 499 }, { id: "kussen", label: "Kussen", prijs: 119 },
    { id: "hoeslaken", label: "Hoeslaken", prijs: 89 }, { id: "molton", label: "Molton", prijs: 39 },
  ],
};

const STEPS = [
  { key: "type", titel: "Type boxspring", sub: "Waarmee begin je?" },
  { key: "maat", titel: "Afmeting", sub: "Kies de maat" },
  { key: "matras", titel: "Matras", sub: "Welk comfort past bij je?" },
  { key: "topper", titel: "Topper", sub: "Extra comfortlaag" },
  { key: "hoofdbord", titel: "Hoofdbord", sub: "Kies een model" },
  { key: "poten", titel: "Poten", sub: "De afwerking" },
  { key: "stofgroep", titel: "Stof & kleur", sub: "650+ stoffen — kies een groep" },
  { key: "toebehoren", titel: "Toebehoren", sub: "Maak het compleet" },
  { key: "overzicht", titel: "Bijna klaar", sub: "Controleer en maak de offerte" },
];
const COLLECTIE = [
  { id: "robert-vlak", naam: "Robert", uitvoering: "Vlak", type: "vlak", vanaf: 1748, tekst: "Strak en tijdloos — ons best verkochte model." },
  { id: "robert-verstelbaar", naam: "Robert", uitvoering: "Elektrisch verstelbaar", type: "verstelbaar", vanaf: 2648, tekst: "Hoofd- en voeteneinde traploos verstelbaar voor maximaal comfort." },
  { id: "oskar-vlak", naam: "Oskar", uitvoering: "Vlak", type: "vlak", vanaf: 1748, tekst: "Modern silhouet met een zachte, warme uitstraling." },
  { id: "oskar-opbox", naam: "Oskar", uitvoering: "Opbox · opbergruimte", type: "vlak", vanaf: 1998, tekst: "Slimme opbergruimte onder het matras — strak en praktisch." },
  { id: "outlet", naam: "Showroommodel", uitvoering: "Outlet", type: "vlak", vanaf: 1299, tekst: "Showroommodellen met aantrekkelijke korting, inclusief onze service en garantie." },
];

const find = (arr, id) => arr.find((x) => x.id === id) || {};

// ─── Sprekende beelden (SVG) ───
const S = { w: "100%", height: 84, viewBox: "0 0 120 84" };
const sx = { fill: "none", stroke: B, strokeWidth: 2.2, strokeLinejoin: "round", strokeLinecap: "round" };

function Illu({ cat, id }) {
  if (cat === "type") {
    if (id === "vlak") return (
      <svg {...S}><rect x="12" y="22" width="9" height="40" rx="3" fill="#fff" stroke={B} strokeWidth="2.2" />
        <rect x="20" y="46" width="86" height="16" rx="3" fill="#fff" stroke={B} strokeWidth="2.2" />
        <rect x="20" y="36" width="86" height="12" rx="5" fill={C.blueTint} stroke={B} strokeWidth="2.2" />
        <rect x="28" y="31" width="20" height="8" rx="3" fill="#fff" stroke={B} strokeWidth="2.2" />
        <line x1="26" y1="62" x2="26" y2="70" stroke={B} strokeWidth="2.2" strokeLinecap="round" />
        <line x1="100" y1="62" x2="100" y2="70" stroke={B} strokeWidth="2.2" strokeLinecap="round" /></svg>);
    return (
      <svg {...S}><rect x="12" y="18" width="9" height="44" rx="3" fill="#fff" stroke={B} strokeWidth="2.2" />
        <path d="M20 44 L46 44 L40 32 L24 34 Z" fill={C.blueTint} stroke={B} strokeWidth="2.2" />
        <rect x="46" y="40" width="34" height="8" rx="4" fill={C.blueTint} stroke={B} strokeWidth="2.2" />
        <path d="M80 44 L106 44 L104 34 L86 36 Z" fill={C.blueTint} stroke={B} strokeWidth="2.2" />
        <rect x="20" y="48" width="86" height="14" rx="3" fill="#fff" stroke={B} strokeWidth="2.2" />
        <circle cx="100" cy="55" r="2.4" fill={R} /></svg>);
  }
  if (cat === "maat") {
    const w = parseInt(id, 10); const bw = 30 + ((w - 80) / 100) * 64; const x = (120 - bw) / 2;
    const two = w >= 120;
    return (
      <svg {...S}><rect x={x} y="14" width={bw} height="56" rx="6" fill={C.blueTint} stroke={B} strokeWidth="2.2" />
        {two ? (<>
          <rect x={x + 5} y="19" width={(bw - 16) / 2} height="13" rx="3" fill="#fff" stroke={B} strokeWidth="2" />
          <rect x={x + 11 + (bw - 16) / 2} y="19" width={(bw - 16) / 2} height="13" rx="3" fill="#fff" stroke={B} strokeWidth="2" /></>
        ) : (<rect x={x + 5} y="19" width={bw - 10} height="13" rx="3" fill="#fff" stroke={B} strokeWidth="2" />)}
      </svg>);
  }
  if (cat === "matras") {
    return (
      <svg {...S}><rect x="14" y="28" width="92" height="28" rx="6" fill="#fff" stroke={B} strokeWidth="2.2" />
        {id === "pocket" && [0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={26 + i * 14} cy="42" r="4.5" {...sx} />)}
        {id === "koud" && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={24 + i * 11} cy="42" r="1.8" fill={B} />)}
        {id === "traag" && [36, 44].map((y, i) => <path key={i} d={`M20 ${y} q10 -5 20 0 t20 0 t20 0 t20 0`} {...sx} strokeWidth="1.8" />)}
      </svg>);
  }
  if (cat === "topper") {
    const colors = { koud: "#9DB2DC", traag: "#C9D4EC", latex: "#F1B8BB" };
    return (
      <svg {...S}><rect x="14" y="38" width="92" height="22" rx="5" fill="#fff" stroke={B} strokeWidth="2.2" />
        {id !== "geen" && <rect x="14" y="28" width="92" height="12" rx="5" fill={colors[id]} stroke={B} strokeWidth="2.2" />}
      </svg>);
  }
  if (cat === "hoofdbord") {
    if (id === "recht") return (<svg {...S}><rect x="34" y="14" width="52" height="56" rx="3" fill={C.blueTint} stroke={B} strokeWidth="2.2" /></svg>);
    if (id === "gestoffeerd") return (<svg {...S}><path d="M34 70 V32 q26 -22 52 0 V70 Z" fill={C.blueTint} stroke={B} strokeWidth="2.2" /></svg>);
    return (<svg {...S}><path d="M32 70 V32 q28 -24 56 0 V70 Z" fill={C.blueTint} stroke={B} strokeWidth="2.2" />
      {[[46, 36], [60, 31], [74, 36], [46, 50], [60, 47], [74, 50]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="2" fill={B} />)}</svg>);
  }
  if (cat === "poten") {
    const base = <rect x="22" y="30" width="76" height="20" rx="3" fill={C.blueTint} stroke={B} strokeWidth="2.2" />;
    if (id === "standaard") return (<svg {...S}>{base}<rect x="26" y="50" width="6" height="10" fill={B} /><rect x="88" y="50" width="6" height="10" fill={B} /></svg>);
    if (id === "rvs") return (<svg {...S}>{base}<line x1="29" y1="50" x2="29" y2="66" stroke="#9AA6B5" strokeWidth="3.5" strokeLinecap="round" /><line x1="91" y1="50" x2="91" y2="66" stroke="#9AA6B5" strokeWidth="3.5" strokeLinecap="round" /></svg>);
    return (<svg {...S}>{base}<path d="M27 50 L31 50 L30 64 L28 64 Z" fill="#B07A45" /><path d="M89 50 L93 50 L92 64 L90 64 Z" fill="#B07A45" /></svg>);
  }
  if (cat === "stofgroep") {
    const o = find(O.stofgroep, id);
    return (<svg {...S}><rect x="26" y="14" width="68" height="56" rx="8" fill={o.kleur} stroke={B} strokeWidth="2.2" />
      {[20, 32, 44, 56].map((d, i) => <line key={i} x1={30} y1={18 + d} x2={90} y2={18 + d - 12} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="3" />)}</svg>);
  }
  if (cat === "toebehoren") {
    if (id === "dekbed") return (<svg {...S}><rect x="20" y="22" width="80" height="44" rx="6" fill={C.blueTint} stroke={B} strokeWidth="2.2" />{[40, 60, 80].map((x) => <line key={x} x1={x} y1="22" x2={x} y2="66" stroke={B} strokeWidth="1.5" />)}<line x1="20" y1="44" x2="100" y2="44" stroke={B} strokeWidth="1.5" /></svg>);
    if (id === "kussen") return (<svg {...S}><path d="M24 34 q6 -12 36 -12 t36 12 q6 12 0 22 -6 8 -36 8 t-36 -8 q-6 -10 0 -22Z" fill={C.blueTint} stroke={B} strokeWidth="2.2" /></svg>);
    if (id === "hoeslaken") return (<svg {...S}><path d="M22 30 h76 a4 4 0 0 1 4 4 v24 a6 6 0 0 1 -6 6 h-72 a6 6 0 0 1 -6 -6 v-24 a4 4 0 0 1 4 -4Z" fill={C.blueTint} stroke={B} strokeWidth="2.2" /></svg>);
    return (<svg {...S}><rect x="18" y="32" width="84" height="20" rx="4" fill="#fff" stroke={B} strokeWidth="2.2" /><rect x="14" y="26" width="92" height="10" rx="5" fill={C.blueTint} stroke={B} strokeWidth="2.2" /></svg>);
  }
  return null;
}

function FirmGauge({ level }) {
  return (<svg width="40" height="20" viewBox="0 0 40 20">{[0, 1, 2].map((i) => <rect key={i} x={i * 13} y={14 - i * 5} width="9" height={6 + i * 5} rx="2" fill={i < level ? B : C.line} />)}</svg>);
}

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [cfg, setCfg] = useState({ type: null, maat: null, matras: null, hardheid: null, topper: null, hoofdbord: null, poten: null, stofgroep: null, toebehoren: [] });
  const [klant, setKlant] = useState({ naam: "", email: "", tel: "" });
  const [verzonden, setVerzonden] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [bcResultaat, setBcResultaat] = useState(null);
  const [bcFout, setBcFout] = useState(null);
  const stuurNaarBc = async () => {
    if (!klant.naam) { setBcFout("Vul eerst de naam van de klant in."); return; }
    setBezig(true); setBcFout(null);
    try {
      const res = await fetch(`${API_BASE}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          klant: { naam: klant.naam, email: klant.email, tel: klant.tel },
          regels: regels.map((r) => ({ omschrijving: r.label, aantal: 1, prijs: r.prijs })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Onbekende fout");
      setBcResultaat(data); setVerzonden(true);
    } catch (e) { setBcFout(e.message); }
    finally { setBezig(false); }
  };
  const [mode, setMode] = useState("collectie");
  const [picked, setPicked] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [base, setBase] = useState(COLLECTIE[0]);
  const kies = (m) => { setBase(m); setCfg((c) => ({ ...c, type: m.type })); setPicked(null); setMode("config"); setStep(0); };
  const [collectie, setCollectie] = useState(COLLECTIE);
  const [bron, setBron] = useState("voorbeeld"); // voorbeeld | laden | live | fout
  const loadItems = async () => {
    if (!API_BASE) { setBron("voorbeeld"); return; }
    setBron("laden");
    try {
      const res = await fetch(`${API_BASE}/api/items`);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.value || data.items || []);
      const mapped = items.map(mapBcItem).filter((x) => x.naam);
      if (mapped.length) { setCollectie(mapped); setBase(mapped[0]); setBron("live"); }
      else setBron("voorbeeld");
    } catch (e) { setBron("fout"); }
  };
  useEffect(() => { loadItems(); }, []);
  const set = (k, v) => setCfg((c) => ({ ...c, [k]: v }));
  const toggle = (id) => setCfg((c) => ({ ...c, toebehoren: c.toebehoren.includes(id) ? c.toebehoren.filter((x) => x !== id) : [...c.toebehoren, id] }));
  const wis = (k) => setCfg((c) => ({ ...c, [k]: null, ...(k === "matras" ? { hardheid: null } : {}) }));
  const isDone = (k) => k === "toebehoren" ? cfg.toebehoren.length > 0 : k === "overzicht" ? false : cfg[k] != null;
  const klaar = !!(cfg.type && cfg.maat && cfg.matras);

  const regels = useMemo(() => {
    const r = [];
    if (cfg.type) { const t = find(O.type, cfg.type); r.push({ step: "type", label: t.label, prijs: t.prijs || 0 }); }
    if (cfg.maat) { const m = find(O.maat, cfg.maat); r.push({ step: "maat", label: `Maat ${m.label}`, prijs: m.prijs || 0 }); }
    if (cfg.matras) { const ma = find(O.matras, cfg.matras); r.push({ step: "matras", label: `Matras ${ma.label}${cfg.hardheid ? ` (${cfg.hardheid})` : ""}`, prijs: ma.prijs || 0 }); }
    if (cfg.topper) { const tp = find(O.topper, cfg.topper); r.push({ step: "topper", label: cfg.topper === "geen" ? "Geen topper" : `Topper ${tp.label}`, prijs: tp.prijs || 0 }); }
    if (cfg.hoofdbord) { const hb = find(O.hoofdbord, cfg.hoofdbord); r.push({ step: "hoofdbord", label: `Hoofdbord ${hb.label}`, prijs: hb.prijs || 0 }); }
    if (cfg.poten) { const po = find(O.poten, cfg.poten); r.push({ step: "poten", label: `Poten ${po.label}`, prijs: po.prijs || 0 }); }
    if (cfg.stofgroep) { const sg = find(O.stofgroep, cfg.stofgroep); r.push({ step: "stofgroep", label: sg.label, prijs: sg.prijs || 0 }); }
    cfg.toebehoren.forEach((id) => { const a = find(O.toebehoren, id); r.push({ step: "toebehoren", toeb: id, label: a.label, prijs: a.prijs || 0 }); });
    return r;
  }, [cfg]);
  const totaal = regels.reduce((s, r) => s + r.prijs, 0);
  const omschrijving = useMemo(() => {
    const d = [];
    if (cfg.type) d.push(find(O.type, cfg.type).label);
    if (cfg.maat) d.push(find(O.maat, cfg.maat).label);
    if (cfg.matras) d.push(`matras ${find(O.matras, cfg.matras).label.toLowerCase()}${cfg.hardheid ? ` (${cfg.hardheid.toLowerCase()})` : ""}`);
    if (cfg.topper && cfg.topper !== "geen") d.push(`topper ${find(O.topper, cfg.topper).label.toLowerCase()}`);
    if (cfg.hoofdbord) d.push(`hoofdbord ${find(O.hoofdbord, cfg.hoofdbord).label.toLowerCase()}`);
    if (cfg.poten) d.push(`${find(O.poten, cfg.poten).label.toLowerCase()} poten`);
    if (cfg.stofgroep) d.push(find(O.stofgroep, cfg.stofgroep).label.toLowerCase());
    return `Boxspring ${base.naam} — ${d.join(", ")}`;
  }, [cfg, base]);
  const payload = useMemo(() => ({
    contact: { type: "Person", displayName: klant.naam || "—", email: klant.email || "—", phoneNumber: klant.tel || "—" },
    salesQuote: { customerName: klant.naam || "—", lines: [
      { itemNumber: `BOX${base.naam.toUpperCase()}`, description: omschrijving, quantity: 1, unitPrice: totaal - cfg.toebehoren.reduce((s, id) => s + find(O.toebehoren, id).prijs, 0) },
      ...cfg.toebehoren.map((id) => ({ itemNumber: id.toUpperCase(), description: find(O.toebehoren, id).label, quantity: 1, unitPrice: find(O.toebehoren, id).prijs })),
    ] },
  }), [klant, omschrijving, totaal, cfg.toebehoren, base]);

  if (mode === "collectie") {
    return (
      <div style={{ background: C.bg, minHeight: "100%" }} className="w-full">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap'); *{font-family:'Figtree',ui-sans-serif,system-ui,sans-serif;} .ff-display{font-weight:800;letter-spacing:-0.01em;} .btn-cta{background:#D81E27;transition:background .18s ease;} .btn-cta:hover{background:#B5151D;}`}</style>
        <div style={{ background: B, color: "#fff" }} className="px-5 md:px-10 py-5 flex items-center gap-3">
          <img src={LOGO} alt="Boxspring Slaapcomfort" className="w-10 h-10 rounded-full bg-white" />
          <div><div className="ff-display text-lg leading-none">Boxspring Slaapcomfort</div>
            <div style={{ color: "rgba(255,255,255,0.75)" }} className="text-[11px] tracking-[0.2em] uppercase mt-1">Onze collectie</div></div>
        </div>
        <div className="px-5 md:px-10 py-7 max-w-6xl">
          <h2 style={{ color: B }} className="ff-display text-2xl md:text-3xl">Kies je boxspring als vertrekpunt</h2>
          <p style={{ color: C.muted }} className="text-sm mb-6">Blader door de collectie en kies een model — daarna stel je 'm helemaal naar wens samen.</p>
          <div className="flex items-center gap-3 mb-6 -mt-2">
            <span style={{ background: bron === "live" ? "#E7F6EC" : C.blueTint, color: bron === "live" ? "#1B7A3D" : B }} className="text-[12px] font-bold px-3 py-1 rounded-full">{bron === "live" ? "● Live uit Business Central" : bron === "laden" ? "Bezig met laden…" : bron === "fout" ? "BC niet bereikbaar — voorbeelddata" : "Voorbeelddata"}</span>
            <button onClick={loadItems} style={{ color: B }} className="text-[12px] font-bold underline">Vernieuwen</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {collectie.map((mdl) => (
              <button key={mdl.id} onClick={() => { setPicked(mdl); setZoom(false); }} style={{ background: C.surface, borderColor: C.line }}
                className="rounded-2xl border-2 overflow-hidden text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                <div style={{ background: "#F7F9FD" }} className="h-40 flex items-center justify-center overflow-hidden">{mdl.foto ? <img src={mdl.foto} alt={mdl.naam} className="w-full h-full object-cover" /> : <Illu cat="type" id={mdl.type} />}</div>
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ color: C.text }} className="ff-display text-lg leading-tight">{mdl.naam}</span>
                    <span style={{ color: R }} className="text-[13px] font-bold whitespace-nowrap">vanaf {euro(mdl.vanaf)}</span>
                  </div>
                  <div style={{ color: C.muted }} className="text-[12.5px]">{mdl.uitvoering}</div>
                </div>
              </button>
            ))}
          </div>
          <p style={{ color: C.muted }} className="text-[11px] mt-4">Beelden en prijzen zijn indicatief; de echte collectie en foto's worden hier later uit de site of BC geladen.</p>
        </div>
        {picked && (
          <div onClick={() => { setPicked(null); setZoom(false); }} style={{ background: "rgba(8,14,28,0.94)" }} className="fixed inset-0 z-50">
            <button onClick={() => { setPicked(null); setZoom(false); }} style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">✕</button>
            {picked.foto && <span className="absolute top-5 left-5 z-20 text-[12px] font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>Tik op de foto om in te zoomen</span>}
            <div onClick={(e) => { if (picked.foto) { e.stopPropagation(); setZoom((z) => !z); } }} className="absolute inset-0 flex items-center justify-center overflow-hidden p-4 pb-32">
              {picked.foto ? (
                <img src={picked.foto} alt={picked.naam} className="max-h-full max-w-full object-contain select-none" style={{ transform: zoom ? "scale(2)" : "scale(1)", transition: "transform .3s ease", cursor: zoom ? "zoom-out" : "zoom-in" }} />
              ) : (
                <div style={{ transform: "scale(3.4)" }}><Illu cat="type" id={picked.type} /></div>
              )}
            </div>
            <div onClick={(e) => e.stopPropagation()} className="absolute bottom-0 left-0 right-0 p-5 md:p-7 flex items-end justify-between gap-4" style={{ background: "linear-gradient(to top, rgba(8,14,28,0.96), rgba(8,14,28,0))" }}>
              <div className="min-w-0">
                <h3 className="ff-display text-2xl md:text-3xl text-white leading-tight">{picked.naam}</h3>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>{picked.uitvoering} · vanaf {euro(picked.vanaf)}</div>
                <p className="text-[13px] mt-1 hidden sm:block" style={{ color: "rgba(255,255,255,0.7)" }}>{picked.tekst}</p>
              </div>
              <button onClick={() => kies(picked)} style={{ color: "#fff" }} className="btn-cta rounded-xl px-6 py-3.5 font-bold whitespace-nowrap flex items-center justify-center gap-2"><Check size={16} /> Kies als uitgangspunt</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const cur = STEPS[step]; const last = step === STEPS.length - 1;

  const VCard = ({ active, onClick, cat, id, label, prijs }) => (
    <button onClick={onClick} style={{ borderColor: active ? B : C.line, background: C.surface }}
      className="relative rounded-2xl border-2 overflow-hidden text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {active && <span style={{ background: B }} className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center"><Check size={15} color="#fff" strokeWidth={3} /></span>}
      <div style={{ background: active ? C.blueTint : "#F7F9FD" }} className="flex items-center justify-center px-3 pt-3 pb-1"><Illu cat={cat} id={id} /></div>
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        <span style={{ color: C.text }} className="text-[13.5px] font-bold leading-tight">{label}</span>
        {prijs ? <span style={{ color: R }} className="text-[12px] font-bold whitespace-nowrap">+{euro(prijs)}</span> : <span style={{ color: C.muted }} className="text-[11px]">incl.</span>}
      </div>
    </button>
  );

  const grid = (cat, cols) => (
    <div className={`grid ${cols} gap-3`}>
      {O[cat].map((o) => <VCard key={o.id} cat={cat} id={o.id} label={o.label} prijs={o.prijs}
        active={cat === "toebehoren" ? cfg.toebehoren.includes(o.id) : cfg[cat] === o.id}
        onClick={() => cat === "toebehoren" ? toggle(o.id) : set(cat, o.id)} />)}
    </div>
  );

  const renderStep = () => {
    switch (cur.key) {
      case "type": return grid("type", "grid-cols-2");
      case "maat": return grid("maat", "grid-cols-2 sm:grid-cols-4");
      case "topper": return grid("topper", "grid-cols-2 sm:grid-cols-4");
      case "hoofdbord": return grid("hoofdbord", "grid-cols-3");
      case "poten": return grid("poten", "grid-cols-3");
      case "stofgroep": return grid("stofgroep", "grid-cols-3");
      case "toebehoren": return grid("toebehoren", "grid-cols-2 sm:grid-cols-4");
      case "matras": return (
        <div>{grid("matras", "grid-cols-3")}
          <div className="mt-6"><div style={{ color: C.muted }} className="text-[13px] mb-2 font-bold">Hardheid</div>
            <div className="flex gap-2">{O.hardheid.map((h, i) => (
              <button key={h} onClick={() => set("hardheid", h)} style={{ background: cfg.hardheid === h ? C.blueTint : C.surface, borderColor: cfg.hardheid === h ? B : C.line, color: C.text }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all"><FirmGauge level={i + 1} />{h}</button>
            ))}</div></div></div>);
      case "overzicht": return (
        <div>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[["naam", "Naam klant"], ["email", "E-mail"], ["tel", "Telefoon"]].map(([k, ph]) => (
              <input key={k} placeholder={ph} value={klant[k]} onChange={(e) => setKlant({ ...klant, [k]: e.target.value })}
                style={{ borderColor: C.line, background: C.surface, color: C.text }} className="rounded-lg border-2 px-3 py-2.5 text-sm outline-none focus:border-[#1E3C8E]" />))}
          </div>
          {!verzonden ? (
            <div>
              {!klaar && <p style={{ color: R }} className="text-[13px] font-bold mb-2">Rond eerst de grijze secties bovenin af — type, maat en matras zijn nodig.</p>}
              {bcFout && <p style={{ color: R }} className="text-[13px] font-bold mb-2">{bcFout}</p>}
              <button disabled={!klaar || bezig} onClick={stuurNaarBc} style={{ color: "#fff", opacity: klaar && !bezig ? 1 : 0.45 }} className="btn-cta w-full rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                <Send size={16} /> {bezig ? "Bezig met versturen…" : "Naar offerte in Business Central"}
              </button>
            </div>
          ) : (
            <div style={{ background: "#E8F5E9", borderColor: "#A5D6A7" }} className="rounded-xl border-2 p-5">
              <div className="flex items-center gap-2 mb-3"><span style={{ background: "#4CAF50" }} className="w-3 h-3 rounded-full inline-block" /><span style={{ color: "#2E7D32" }} className="font-bold text-sm">Offerte aangemaakt in Business Central!</span></div>
              <div className="text-sm space-y-1" style={{ color: "#1A2333" }}>
                <div><span className="font-bold">Offertenummer:</span> {bcResultaat?.quoteNumber}</div>
                <div><span className="font-bold">Klant:</span> {bcResultaat?.customerName}</div>
              </div>
              <p className="text-[12px] mt-3" style={{ color: "#5B6675" }}>Open Business Central om de offerte te bekijken, aan te passen en te versturen.</p>
            </div>)}
        </div>);
      default: return null;
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100%" }} className="w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap');
        *{font-family:'Figtree',ui-sans-serif,system-ui,sans-serif;}
        .ff-display{font-weight:800;letter-spacing:-0.01em;}
        input::placeholder{color:#9aa6b2;}
        .btn-primary{background:#1E3C8E;transition:background .18s ease;}
        .btn-primary:hover{background:#D81E27;}
        .btn-cta{background:#D81E27;transition:background .18s ease;}
        .btn-cta:hover{background:#B5151D;}
        .wis{color:#9aa6b2;transition:all .15s ease;}
        .wis:hover{background:#D81E27;color:#fff;}
      `}</style>

      <div style={{ background: B, color: "#fff" }} className="px-5 md:px-10 py-5 flex items-center gap-3">
        <img src={LOGO} alt="Boxspring Slaapcomfort" className="w-10 h-10 rounded-full bg-white" />
        <div><div className="ff-display text-lg leading-none">Boxspring Slaapcomfort</div>
          <div style={{ color: "rgba(255,255,255,0.75)" }} className="text-[11px] tracking-[0.2em] uppercase mt-1">Stel je boxspring samen</div></div>
      </div>

      <div className="px-5 md:px-10 pt-4 flex items-center justify-between">
        <div className="text-[13px]" style={{ color: C.muted }}>Vertrekpunt: <span style={{ color: C.text }} className="font-bold">{base.naam}</span> · {base.uitvoering}</div>
        <button onClick={() => setMode("collectie")} style={{ color: B }} className="text-[13px] font-bold flex items-center gap-1"><ChevronLeft size={14} /> Collectie</button>
      </div>
      <div className="px-5 md:px-10 pt-5">
        <div className="flex items-center gap-1.5">{STEPS.map((s, i) => {
          const done = isDone(s.key); const huidig = i === step;
          return (<button key={s.key} onClick={() => setStep(i)} title={s.titel} className="flex-1 h-1.5 rounded-full transition-colors" style={{ background: huidig ? R : done ? B : C.line }} />);
        })}</div>
        <div style={{ color: C.muted }} className="text-[12px] mt-2 font-bold">{cur.titel} · stap {step + 1}/{STEPS.length}</div>
      </div>

      <div className="px-5 md:px-10 py-6 grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl">
        <div>
          <h2 style={{ color: B }} className="ff-display text-2xl md:text-3xl leading-tight">{cur.titel}</h2>
          <p style={{ color: C.muted }} className="text-sm mb-5">{cur.sub}</p>
          {renderStep()}
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ color: step === 0 ? "#aeb7c2" : B }} className="flex items-center gap-1 text-sm font-bold disabled:cursor-not-allowed"><ChevronLeft size={16} /> Vorige</button>
            {!last && <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} style={{ color: "#fff" }} className="btn-primary flex items-center gap-1.5 rounded-full pl-5 pr-4 py-2.5 text-sm font-bold">Volgende <ChevronRight size={16} /></button>}
          </div>
        </div>

        <div className="md:sticky md:top-5 self-start">
          <div style={{ background: C.surface, borderColor: C.line }} className="rounded-2xl border-2 overflow-hidden">
            <div style={{ background: B, color: "#fff" }} className="px-5 py-3 ff-display text-base">Jouw samenstelling</div>
            <div className="px-5 py-4 space-y-2">
              {regels.length === 0 && <div style={{ color: C.muted }} className="text-[13px] italic">Nog niets gekozen</div>}
              {regels.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-[13px]">
                  <span style={{ color: C.text }} className="leading-snug flex-1">{r.label}</span>
                  <span style={{ color: C.muted }} className="whitespace-nowrap">{r.prijs ? euro(r.prijs) : "incl."}</span>
                  <button onClick={() => (r.toeb ? toggle(r.toeb) : wis(r.step))} title="Verwijderen" className="wis w-5 h-5 flex items-center justify-center rounded text-base leading-none">×</button>
                </div>))}
            </div>
            <div style={{ borderColor: C.line }} className="border-t px-5 py-4 flex items-center justify-between"><span style={{ color: C.text }} className="font-bold">Totaal</span><span style={{ color: B }} className="ff-display text-2xl">{euro(totaal)}</span></div>
          </div>
          <p style={{ color: C.muted }} className="text-[11px] mt-2 px-1 leading-snug">Prijzen indicatief, nog in te stellen. Incl./excl. btw met de accountant.</p>
        </div>
      </div>
    </div>
  );
}
