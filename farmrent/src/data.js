export const HUBS=['gud','vja','mtm'];
export const LOCS=[
{id:'gudivada',name:'Gudivada',mandal:'Gudivada',district:'Krishna',hub:'gud',lat:16.435,lng:80.995},
{id:'gudlavalleru',name:'Gudlavalleru',mandal:'Gudlavalleru',district:'Krishna',hub:'gud'},
{id:'pamarru',name:'Pamarru',mandal:'Pamarru',district:'Krishna',hub:'gud'},
{id:'vijayawada',name:'Vijayawada',mandal:'Vijayawada Rural',district:'NTR',hub:'vja',lat:16.506,lng:80.648},
{id:'kankipadu',name:'Kankipadu',mandal:'Kankipadu',district:'Krishna',hub:'vja'},
{id:'machilipatnam',name:'Machilipatnam',mandal:'Machilipatnam',district:'Krishna',hub:'mtm',lat:16.187,lng:81.138},
{id:'pedana',name:'Pedana',mandal:'Pedana',district:'Krishna',hub:'mtm'}];
export const CATS=[['tractor','Tractors','ట్రాక్టర్లు'],['harvester','Harvesters','హార్వెస్టర్లు'],['rotavator','Rotavators','రోటావేటర్లు'],['seeddrill','Seed Drills','సీడ్ డ్రిల్స్'],
['sprayer','Sprayers','స్ప్రేయర్లు'],['tiller','Tillers','టిల్లర్లు'],['plough','Ploughs','నాగళ్లు'],['irrigation','Irrigation Equipment','నీటిపారుదల పరికరాలు']].map(([id,en,te])=>({id,en,te}));
const R=[
['Rotavator 7-ft','rotavator',1200,'day','Gudlavalleru','Ramesh Babu',[4.5,36,40],'Good'],
['Mahindra 475 DI Tractor','tractor',2200,'day','Gudivada','Ramesh Babu',[1.5,32,38],'Excellent'],
['Mini Power Tiller','tiller',350,'hour','Pamarru','Ramesh Babu',[9,30,27],'Good'],
['Boom Sprayer 400L','sprayer',500,'day','Gudivada','Ramesh Babu',[2,33,37],'Good'],
['Paddy Combine Harvester','harvester',6500,'day','Machilipatnam','Suresh Kumar',[44,70,3],'Excellent'],
['Seed Drill 9-Row','seeddrill',800,'day','Vijayawada','Anil Varma',[32,3,60],'Good'],
['John Deere 5050D Tractor','tractor',2500,'day','Kankipadu','Venkat Rao',[28,12,55],'Excellent'],
['Disc Plough 3-Bottom','plough',700,'day','Pedana','Lakshmi Devi',[18,50,14],'Fair'],
['Drip Irrigation Kit','irrigation',300,'day','Pamarru','Srinivas',[8,34,30],'Good'],
['Power Sprayer 16L','sprayer',250,'hour','Machilipatnam','K. Rao',[43,69,4],'Good'],
['Rotavator 6-ft','rotavator',1000,'day','Vijayawada','Naidu',[31,4,58],'Fair'],
['Sonalika Tractor 50HP','tractor',2000,'day','Gudivada','Prasad',[3,34,40],'Good'],
['Mould Board Plough','plough',600,'day','Gudlavalleru','Murthy',[5,37,42],'Good'],
['Pump Set 5HP','irrigation',150,'hour','Pedana','Babu',[20,52,12],'Good'],
['Power Tiller 9HP','tiller',450,'hour','Kankipadu','Raju',[27,10,54],'Excellent'],
['Seed Drill 11-Row','seeddrill',900,'day','Gudivada','Reddy',[2.5,33,39],'Good'],
['Small Paddy Harvester','harvester',4800,'day','Pamarru','Chowdary',[8,31,29],'Good'],
['Sprinkler Set 20-pipe','irrigation',400,'day','Vijayawada','Devi',[33,3.5,59],'Fair'],
['Tractor with Trailer','tractor',2800,'day','Machilipatnam','Satyam',[45,71,5],'Good'],
['Rotavator Heavy Duty','rotavator',1400,'day','Kankipadu','Krishna Murthy',[29,11,56],'Excellent']];
export const LISTINGS=R.map(([name,cat,price,unit,place,owner,km,cond],i)=>{const loc=LOCS.find(l=>l.name===place);return{
id:i+1,name,cat,price,unit,place,mandal:loc.mandal,district:loc.district,state:'Andhra Pradesh',owner,ownerId:owner==='Ramesh Babu'?'o1':'o'+(i+1),km,cond,
avail:![4,9,14].includes(i),paused:false,listed:i,img:'',fee:i%3===0?300:0,pickup:i%3===0?'Pickup or delivery':'Pickup only',
desc:`${name} in ${cond.toLowerCase()} condition, listed by ${owner}. Sample description for demonstration only.`,terms:'Return clean and refuelled. Damage is the renter’s responsibility. (Sample terms)'}});
const bk=(id,lid,renter,s,e,status,msg='')=>{const l=LISTINGS[lid-1];return{id,lid,renter,start:s,end:e,hrs:l.unit==='hour'?4:1,status,msg,
total:l.price*(l.unit==='hour'?4:1)*(Math.round((new Date(e)-new Date(s))/864e5)+1),created:s}};
export const BOOKINGS=[bk('b1',5,'You','2026-11-10','2026-11-11','pending','Need for paddy harvest.'),bk('b2',7,'You','2026-09-02','2026-09-03','completed'),
bk('b3',1,'Suresh (sample)','2026-11-02','2026-11-03','pending','Preparing field for rabi.'),bk('b4',2,'Anil (sample)','2026-11-05','2026-11-07','approved'),
bk('b5',2,'Venkat (sample)','2026-11-06','2026-11-08','pending','Can I get it on the 6th?'),bk('b6',4,'Lakshmi (sample)','2026-09-12','2026-09-12','completed'),bk('b7',12,'You','2026-10-01','2026-10-02','rejected')];
