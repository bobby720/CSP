import {useState,useMemo} from 'react';import {useNavigate,useSearchParams,Link,useParams} from 'react-router-dom';
import {MapPin,Search,Crosshair,SlidersHorizontal,X} from 'lucide-react';import {useApp} from './store';import {LOCS,CATS,HUBS} from './data';import {P,S,G,inp,fmt,Field,Card,Img,Demo,Badge,ICONS} from './ui';
const RADII=[5,10,25,50,0];
export function LocationPicker({compact}){const {t,loc,setLoc,toast}=useApp();const [err,setErr]=useState('');
const gps=()=>{setErr('');if(!navigator.geolocation){setErr('Location is not available in this browser. Please choose a location manually.');return}
navigator.geolocation.getCurrentPosition(p=>{const {latitude:a,longitude:b}=p.coords;let best=LOCS.filter(l=>l.lat).map(l=>({l,d:Math.hypot(l.lat-a,l.lng-b)})).sort((x,y)=>x.d-y.d)[0].l;
setLoc({...best,gps:true});toast(`Location found. Showing sample results near ${best.name}.`)},
e=>setErr(e.code===1?'Location permission was denied. Please choose a location manually.':e.code===3?'Location request timed out. Please choose manually.':'Your location could not be determined. Please choose manually.'),{timeout:10000})};
return <div><div className="flex gap-2"><label className="flex-1 relative"><span className="sr-only">{t('loc')}</span><MapPin className="absolute left-3 top-3 text-forest" size={20}/>
<select value={loc.id} onChange={e=>setLoc(LOCS.find(l=>l.id===e.target.value))} className={inp+' pl-10'}>{LOCS.map(l=><option key={l.id} value={l.id}>{l.name}, {l.mandal}, {l.district}, Andhra Pradesh</option>)}</select></label>
<button type="button" onClick={gps} className={S} title={t('useLoc')}><Crosshair size={18}/><span className={compact?'sr-only':'hidden sm:inline'}>{t('useLoc')}</span></button></div>
{err&&<p role="alert" className="text-red-700 text-sm mt-2">{err}</p>}
{loc.gps&&<p className="text-xs text-mute mt-2">GPS used only to pick the nearest sample area. Distances are illustrative, not measured.</p>}</div>}
export function Chips(){const {t,radius,setRadius}=useApp();return <div role="group" aria-label="Distance" className="flex flex-wrap gap-2">{RADII.map(r=><button key={r} type="button" aria-pressed={radius===r} onClick={()=>setRadius(r)}
className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${radius===r?'bg-forest text-white border-forest':'bg-white border-line'}`}>{r?`${t('within')} ${r} ${t('km')}`:t('all')}</button>)}</div>}
export function useResults(f){const {listings,dist,radius,favs}=useApp();return useMemo(()=>{
let r=listings.filter(l=>!l.paused);const q=(f.q||'').toLowerCase().trim();
if(q)r=r.filter(l=>[l.name,l.place,l.district,l.mandal,l.cat].join(' ').toLowerCase().includes(q));
if(f.cat)r=r.filter(l=>l.cat===f.cat);if(radius)r=r.filter(l=>dist(l)<=radius);
if(f.min)r=r.filter(l=>l.price>=+f.min);if(f.max)r=r.filter(l=>l.price<=+f.max);if(f.avail)r=r.filter(l=>l.avail);if(f.unit)r=r.filter(l=>l.unit===f.unit);if(f.pd)r=r.filter(l=>l.pickup.includes(f.pd));if(f.saved)r=r.filter(l=>favs.includes(l.id));
const s={near:(a,b)=>dist(a)-dist(b),low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,recent:(a,b)=>b.listed-a.listed}[f.sort||'near'];return [...r].sort(s)},[listings,dist,radius,f,favs])}
export function Home(){const {t,lang}=useApp();const nav=useNavigate();const [q,setQ]=useState('');const res=useResults({});const recent=(()=>{try{return JSON.parse(localStorage.getItem('fr_recent'))||[]}catch{return []}})();
return <>
<section className="bg-forest text-white"><div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
<div><h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{t('hero')}</h1><p className="mt-4 text-white/85 text-lg max-w-md">{t('sub')}</p></div>
<form onSubmit={e=>{e.preventDefault();if(q.trim()){try{localStorage.setItem('fr_recent',JSON.stringify([q.trim(),...recent.filter(x=>x!==q.trim())].slice(0,5)))}catch{}}nav('/browse?q='+encodeURIComponent(q))}} className="bg-white text-ink rounded-2xl p-5 shadow-xl space-y-4">
<div><div className="text-sm font-semibold mb-1">{t('loc')}</div><LocationPicker/></div>
<label className="block text-sm font-semibold">{t('equip')}<div className="relative mt-1"><Search className="absolute left-3 top-3 text-mute" size={20}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tractor, rotavator, village…" className={inp+' pl-10'}/></div></label>
{recent.length>0&&<div className="flex flex-wrap gap-2 items-center text-sm"><span className="text-mute">Recent:</span>{recent.map(r=><button type="button" key={r} onClick={()=>nav('/browse?q='+encodeURIComponent(r))} className="underline">{r}</button>)}</div>}<Chips/><button className={G+' w-full text-lg'}><Search size={20}/>{t('find')}</button><Demo/></form></div></section>
<section className="max-w-6xl mx-auto px-4 py-12"><h2 className="text-2xl font-extrabold mb-5">{t('cats')}</h2>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{CATS.map(c=>{const I=ICONS[c.id];return <Link key={c.id} to={'/browse?cat='+c.id} className="bg-white border border-line rounded-xl p-5 flex flex-col items-center gap-2 hover:border-fresh font-semibold text-center"><I className="text-forest" size={32} strokeWidth={1.5}/>{c[lang]}</Link>})}</div></section>
<section className="max-w-6xl mx-auto px-4 pb-12"><div className="flex justify-between items-end mb-5"><h2 className="text-2xl font-extrabold">{t('nearby')}</h2><Link to="/browse" className="font-semibold text-forest underline">{t('viewAll')}</Link></div>
{res.length?<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{res.slice(0,4).map(l=><Card key={l.id} l={l}/>)}</div>:<Empty/>}</section>
<section id="how" className="bg-white border-y border-line"><div className="max-w-6xl mx-auto px-4 py-12"><h2 className="text-2xl font-extrabold mb-6">{t('how')}</h2><ol className="grid md:grid-cols-3 gap-4">
{['step1','step2','step3'].map((s,i)=><li key={s} className="flex gap-4 items-start"><span className="w-9 h-9 rounded-full bg-gold font-extrabold flex items-center justify-center shrink-0">{i+1}</span><span className="font-semibold pt-1.5">{t(s)}</span></li>)}</ol></div></section>
<section className="max-w-6xl mx-auto px-4 py-12"><h2 className="text-2xl font-extrabold">{t('impact')}</h2><p className="mt-3 text-mute max-w-2xl">FarmRent is designed to help farmers find machinery they cannot afford to buy, by sharing equipment within the community. This prototype makes no claims about measured savings or social impact.</p></section></>}
export function Empty({reset}){const {t,setRadius,radius}=useApp();return <div className="bg-white border border-dashed border-line rounded-xl p-8 text-center"><p className="font-bold text-lg">{t('noRes')}</p>
<div className="flex flex-wrap gap-2 justify-center mt-4"><button className={P} onClick={()=>setRadius(radius===5?10:radius===10?25:radius===25?50:0)}>Expand search radius</button>
<button className={S} onClick={()=>{window.scrollTo({top:0,behavior:'smooth'});document.querySelector('select')?.focus()}}>Select another location</button>
<button className={S} onClick={()=>{setRadius(0);reset&&reset()}}>View all areas</button></div></div>}
export function Browse(){const {t,lang}=useApp();const [sp]=useSearchParams();const init={q:sp.get('q')||'',cat:sp.get('cat')||'',min:'',max:'',avail:false,unit:'',pd:'',saved:sp.get('saved')==='1',sort:'near'};
const [f,setF]=useState(init);const [open,setOpen]=useState(false);const [view,setView]=useState('list');const res=useResults(f);const set=k=>e=>setF({...f,[k]:e.target.type==='checkbox'?e.target.checked:e.target.value});
const Filters=<div className="space-y-1"><Field label={t('equip')}><input className={inp} value={f.q} onChange={set('q')}/></Field><div className="mb-3"><div className="text-sm font-semibold mb-1">{t('loc')}</div><LocationPicker compact/></div>
<div className="mb-3"><Chips/></div><Field label={t('category')}><select className={inp} value={f.cat} onChange={set('cat')}><option value="">All</option>{CATS.map(c=><option key={c.id} value={c.id}>{c[lang]}</option>)}</select></Field>
<div className="grid grid-cols-2 gap-2"><Field label={t('price')+' min'}><input type="number" min="0" className={inp} value={f.min} onChange={set('min')}/></Field><Field label={t('price')+' max'}><input type="number" min="0" className={inp} value={f.max} onChange={set('max')}/></Field></div>
<Field label="Rental unit"><select className={inp} value={f.unit} onChange={set('unit')}><option value="">Hourly & daily</option><option value="hour">Hourly</option><option value="day">Daily</option></select></Field>
<Field label="Pickup / delivery"><select className={inp} value={f.pd} onChange={set('pd')}><option value="">Any</option><option value="Pickup">Pickup</option><option value="Delivery">Delivery</option></select></Field>
<label className="flex gap-2 items-center text-sm font-semibold mb-3"><input type="checkbox" checked={f.avail} onChange={set('avail')} className="w-5 h-5 accent-forest"/>{t('avail')} only</label>
<label className="flex gap-2 items-center text-sm font-semibold mb-3"><input type="checkbox" checked={f.saved} onChange={set('saved')} className="w-5 h-5 accent-forest"/>Saved equipment only</label>
<button className={S+' w-full'} onClick={()=>setF({...init,q:'',cat:''})}>{t('clear')}</button></div>;
return <div className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-[300px_1fr] gap-8">
<aside className="hidden lg:block bg-white border border-line rounded-xl p-5 h-fit sticky top-20"><h2 className="font-extrabold mb-3">{t('filters')}</h2>{Filters}</aside>
{open&&<div className="fixed inset-0 z-50 bg-white overflow-auto p-5 lg:hidden"><div className="flex justify-between mb-3"><h2 className="font-extrabold text-xl">{t('filters')}</h2><button aria-label="Close filters" onClick={()=>setOpen(false)}><X/></button></div>{Filters}<button className={P+' w-full mt-3'} onClick={()=>setOpen(false)}>Show {res.length} results</button></div>}
<section><div className="flex flex-wrap gap-3 justify-between items-center mb-4"><p className="font-bold" aria-live="polite">{res.length} {t('results')}</p>
<div className="flex gap-2"><div className="flex rounded-lg border border-line overflow-hidden" role="group" aria-label="View">{['list','map'].map(v=><button key={v} aria-pressed={view===v} onClick={()=>setView(v)} className={`px-3 py-2 text-sm font-semibold capitalize ${view===v?'bg-forest text-white':'bg-white'}`}>{v}</button>)}</div><button className={S+' lg:hidden'} onClick={()=>setOpen(true)}><SlidersHorizontal size={18}/>{t('filters')}</button>
<label className="flex items-center gap-2 text-sm font-semibold">{t('sort')}<select className={inp+' w-auto'} value={f.sort} onChange={set('sort')}>{[['near','nearest'],['low','low'],['high','high'],['recent','recent']].map(([v,k])=><option key={v} value={v}>{t(k)}</option>)}</select></label></div></div>
<div className="mb-4"><Demo/></div>
{!res.length?<Empty reset={()=>setF(init)}/>:view==='map'?<MapPreview res={res}/>:<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">{res.map(l=><Card key={l.id} l={l}/>)}</div>}</section></div>}
export function MapPreview({res}){const {dist,loc}=useApp();const mx=Math.max(10,...res.map(l=>dist(l)));
return <div className="bg-white border border-line rounded-xl p-3"><svg viewBox="0 0 600 420" className="w-full" role="img" aria-label="Illustrative sample map of equipment around the selected location"><rect width="600" height="420" fill="#EEF3E9" rx="12"/>
{[.25,.5,.75,1].map(r=><g key={r}><circle cx="300" cy="210" r={r*185} fill="none" stroke="#C9D6C3" strokeDasharray="4 4"/><text x={300+r*185-4} y="206" fontSize="11" textAnchor="end" fill="#70786F">{Math.round(r*mx)} km</text></g>)}
{res.map(l=>{const a=l.id*2.4,r=Math.min(dist(l)/mx,1)*185;const x=300+r*Math.cos(a),y=210+r*Math.sin(a);return <Link key={l.id} to={'/equipment/'+l.id}><title>{l.name}</title><circle cx={x} cy={y} r="11" fill={l.avail?'#245C3A':'#9aa39a'} stroke="#fff" strokeWidth="2"/><text x={x} y={y+4} fontSize="10" textAnchor="middle" fill="#fff" fontWeight="700">{l.id}</text></Link>})}
<circle cx="300" cy="210" r="9" fill="#E8B44A" stroke="#202820" strokeWidth="2"/><text x="300" y="236" textAnchor="middle" fontSize="12" fontWeight="700">{loc.name}</text></svg>
<p className="text-xs text-mute mt-2">Illustrative sample map. Only the ring distance reflects sample data; marker angles are arbitrary and are not real equipment positions. Numbers are listing IDs. Grey = not available.</p>
<ul className="grid sm:grid-cols-2 gap-1 mt-2 text-sm">{res.map(l=><li key={l.id}><Link className="underline" to={'/equipment/'+l.id}>{l.id}. {l.name}: {dist(l)} km</Link></li>)}</ul></div>}

