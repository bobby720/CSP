import {Link} from 'react-router-dom';import {Heart,MapPin,User,Tractor,Wheat,Cog,Sprout,SprayCan,Shovel,Axe,Droplets} from 'lucide-react';import {useApp} from './store';
export const ICONS={tractor:Tractor,harvester:Wheat,rotavator:Cog,seeddrill:Sprout,sprayer:SprayCan,tiller:Shovel,plough:Axe,irrigation:Droplets};
const b='inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition disabled:opacity-50 ';
export const P=b+'bg-forest text-white hover:bg-fresh';export const S=b+'border border-line bg-white hover:bg-cream';export const G=b+'bg-gold text-ink hover:brightness-95';
export const inp='w-full rounded-lg border border-line bg-white px-3 py-2.5';
export const fmt=n=>'₹'+Number(n).toLocaleString('en-IN');
export const Field=({label,error,children})=><label className="block text-sm font-semibold mb-3">{label}<div className="mt-1 font-normal">{children}</div>{error&&<p role="alert" className="text-red-700 text-xs mt-1">{error}</p>}</label>;
export const STAT={pending:'bg-amber-100 text-amber-900',approved:'bg-green-100 text-green-900',rejected:'bg-red-100 text-red-900',completed:'bg-slate-200 text-slate-800',cancelled:'bg-slate-100 text-slate-700'};
export const Badge=({s})=>{const {t}=useApp();return <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STAT[s]}`}>{s==='pending'?'⏳ ':s==='approved'?'✓ ':s==='rejected'?'✕ ':''}{t(s)}</span>};
export const Img=({l,cls=''})=>{const I=ICONS[l.cat]||Tractor;return l.img?<img src={l.img} alt={`${l.name} (listing photo)`} className={'object-cover '+cls}/>:
<div role="img" aria-label={`${l.name} placeholder image`} className={'bg-gradient-to-br from-forest to-fresh flex items-center justify-center text-white/80 '+cls}><I size={56} strokeWidth={1.2}/></div>};
export const FavBtn=({id})=>{const {favs,toggleFav}=useApp();const on=favs.includes(id);return <button type="button" aria-pressed={on} aria-label={on?'Remove from saved':'Save equipment'} onClick={()=>toggleFav(id)} className="absolute top-2 right-2 bg-white/95 rounded-full p-2 shadow"><Heart size={18} className={on?'fill-red-600 text-red-600':'text-ink'}/></button>};
export function Card({l}){const {t,dist,lang,cmp,toggleCmp}=useApp();const d=dist(l);return <article className="bg-white border border-line rounded-xl overflow-hidden shadow-sm flex flex-col">
<div className="relative"><Img l={l} cls="h-40 w-full"/>{l.id>0&&<FavBtn id={l.id}/>}</div><div className="p-4 flex-1 flex flex-col gap-1">
<span className="text-xs text-mute">{CATS.find(c=>c.id===l.cat)?.[lang]}</span><h3 className="font-bold text-lg leading-tight">{l.name}</h3>
<p className="text-forest font-extrabold text-xl">{fmt(l.price)}<span className="text-sm text-mute font-semibold">/{l.unit==='day'?'day':'hour'}</span></p>
<p className="text-sm flex items-center gap-1 text-mute"><MapPin size={14}/>{l.place} · {d} {t('away')}</p>
<p className="text-sm flex items-center gap-1 text-mute"><User size={14}/>{t('owner')}: {l.owner}</p>
<p className="text-sm font-semibold">{l.avail&&!l.paused?<span className="text-green-800">● {t('avail')}</span>:<span className="text-red-800">○ {t('unavail')}</span>}</p>
<Link to={`/equipment/${l.id}`} className={P+' mt-3'}>{t('details')}</Link>{l.id>0&&<label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" checked={cmp.includes(l.id)} onChange={()=>toggleCmp(l.id)} className="w-4 h-4 accent-forest"/>Compare</label>}</div></article>}
export const Demo=()=>{const {t}=useApp();return <p className="text-xs text-mute bg-gold/20 rounded-md px-3 py-2">{t('demo')}</p>};
