import {createContext,useContext,useEffect,useState} from 'react';
import {LISTINGS,BOOKINGS,LOCS,HUBS} from './data';import {T} from './i18n';
const C=createContext();export const useApp=()=>useContext(C);
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
export function AppProvider({children}){
const [lang,setLang]=useState(()=>ld('fr_lang','en'));const [loc,setLoc]=useState(()=>ld('fr_loc',LOCS[0]));
const [radius,setRadius]=useState(()=>ld('fr_r',25));const [listings,setListings]=useState(()=>ld('fr_l',LISTINGS));
const [bookings,setBookings]=useState(()=>ld('fr_b',BOOKINGS));const [cmp,setCmp]=useState([]);const [favs,setFavs]=useState(()=>ld('fr_f',[]));const [toastMsg,setToast]=useState('');
useEffect(()=>{try{Object.entries({fr_lang:lang,fr_loc:loc,fr_r:radius,fr_l:listings,fr_b:bookings,fr_f:favs}).forEach(([k,v])=>localStorage.setItem(k,JSON.stringify(v)))}catch{}},[lang,loc,radius,listings,bookings,favs]);
const t=k=>T[lang][k]||T.en[k]||k;
const toast=m=>{setToast(m);setTimeout(()=>setToast(''),3500)};
const toggleFav=id=>{setFavs(f=>f.includes(id)?f.filter(x=>x!==id):[...f,id]);toast(favs.includes(id)?'Removed from saved':'Saved to your list')};
const toggleCmp=id=>setCmp(c=>c.includes(id)?c.filter(x=>x!==id):c.length>=3?(toast('You can compare up to 3 items'),c):[...c,id]);
const dist=l=>l.km[HUBS.indexOf(loc.hub)];
const resetDemo=()=>{setListings(LISTINGS);setBookings(BOOKINGS);toast('Demo data reset')};
return <C.Provider value={{lang,setLang,loc,setLoc,radius,setRadius,listings,setListings,bookings,setBookings,favs,toggleFav,cmp,setCmp,toggleCmp,t,toast,dist,resetDemo}}>{children}
<div role="status" aria-live="polite" className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[60]">{toastMsg&&<div className="bg-ink text-white px-4 py-3 rounded-lg shadow-lg text-sm">{toastMsg}</div>}</div></C.Provider>}
