const C=document.getElementById('c'),X=C.getContext('2d'),VW=480,VH=270,WW=3200,WH=2200,TW=1600,TH=1100,PI=Math.PI,MAX=20;
const R=(a,b)=>a+Math.random()*(b-a),P=a=>a[Math.random()*a.length|0],D=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c};
const W=mk(WW,WH),G=W.getContext('2d'),T=mk(WW,WH),H=T.getContext('2d'),MM=mk(84,58);
let winter=0,OX=0,OY=0;const obs=[],benches=[],doors=[],lamps=[],pcars=[],kiosks=[];
const rc=(c,x,y,w,h,g=G)=>{g.fillStyle=c;g.fillRect(x,y,w,h)},r=(c,x,y,w,h)=>rc(c,x,y,w,h,X);
const ob=(x,y,w,h,low)=>obs.push({x:x+OX,y:y+OY,w,h,low});
const tx=(s,x,y,c,f,g=G)=>{g.font=f;g.textAlign='center';g.fillStyle=c;g.fillText(s,x,y)};
function car(g,x,y,L,col,fl){g.save();g.translate(x,y);if(fl)g.scale(-1,1);
 g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-L/2+4,-4,L,13);
 rc(col,-L/2,-8,L,12,g);rc(col,-L*.22,-14,L*.44,7,g);rc('#2c363c',-L*.19,-13,L*.38,5,g);rc('rgba(255,255,255,.18)',-L/2,-8,L,2,g);if(winter)rc('#e8edf2',-L*.22,-15,L*.44,2,g);
 rc('#e8dfa0',L/2-3,-6,3,3,g);rc('#a33',-L/2,-6,2,3,g);g.fillStyle='#111';
 for(const k of[-L*.3,L*.3]){g.beginPath();g.arc(k,4,3.5,0,7);g.fill()}g.restore()}
function bld(x,y,w,h,fh,roof,face,n,tall,sl){
 const b=y+h,bt=b+fh,dxs=[];for(let i=0;i<n;i++)dxs.push(x+w/n*(i+.5));
 rc('rgba(0,0,0,.26)',x+w,y+10,14,h+fh-6);rc('rgba(0,0,0,.26)',x+10,bt,w+4,14);
 rc(roof,x,y,w,h);if(winter)rc('rgba(238,243,248,.92)',x,y,w,h);
 rc('rgba(0,0,0,.2)',x,y,w,2);rc('rgba(0,0,0,.14)',x,y,2,h);rc('rgba(255,255,255,.16)',x+w-2,y,2,h);
 for(let i=x+24;i<x+w;i+=24)rc('rgba(0,0,0,.1)',i,y+2,1,h-3);
 for(let i=0;i<4;i++)rc('#5d5a52',x+R(8,w-20),y+R(6,h-14),R(6,10),R(5,8));
 if(sl)tx(sl,x+w/2,y+h/2+5,'rgba(150,50,40,.8)','bold 13px monospace');
 rc(face,x,b,w,fh);rc('rgba(0,0,0,.28)',x,b,w,3);if(winter)rc('#eef2f6',x,b-1,w,2);
 const rows=tall?4:2,cols=Math.floor((w-10)/16),ox=x+(w-cols*16)/2+4,rh=(fh-10)/rows;
 for(let q=0;q<rows;q++)for(let c=0;c<cols;c++){const wx=ox+c*16,wy=b+5+q*rh;
  if((q==rows-1||!tall)&&dxs.some(e=>Math.abs(wx+4-e)<14))continue;
  const l=Math.random()<(winter?.5:.3);rc('#cfc7b0',wx-1,wy-1,10,rh-2);rc(l?'#e0bb62':'#27323c',wx,wy,8,rh-4);
  if(l&&Math.random()<.6)rc('rgba(150,70,60,.6)',wx,wy,4,rh-4);rc(winter?'#f2f5f8':'#8c8570',wx-1,wy+rh-3,10,1)}
 for(let c=2;c<cols;c+=2)rc('rgba(0,0,0,.1)',ox+c*16-4,b+4,1,fh-8);
 for(let i=0;i<5;i++)rc('rgba(70,55,40,.12)',x+R(0,w-20),b+4,R(8,20),fh-8);
 rc('rgba(0,0,0,.3)',x,bt-3,w,3);
 for(let i=0;i<n;i++){const ex=dxs[i];rc('#3b2e26',ex-9,bt-20,18,20);rc('#6d675b',ex-13,bt-24,26,4);if(winter)rc('#eef2f6',ex-13,bt-25,26,2);tx(''+(i+1),ex,bt-10,'#c9bd94','bold 9px monospace');doors.push({x:ex+OX,y:bt+8+OY})}
 ob(x,y,w,h+fh)}
const bench=(x,y,w=30)=>{rc('#5a3d27',x,y,w,4);rc('#7b5a3a',x,y+4,w,5);rc('#2a2a2a',x+3,y+9,3,2);rc('#2a2a2a',x+w-6,y+9,3,2);benches.push({x:x+OX,y:y+OY,w,h:9,occ:0});ob(x,y,w,9,1)};
const bin=(x,y)=>{rc('#3f5a3f',x,y,14,14);rc('#2f452f',x-1,y-2,16,3);ob(x,y,14,14)};
function kiosk(x,y,lb){const w=56,h=34;rc('rgba(0,0,0,.26)',x+w,y+6,10,h);rc('rgba(0,0,0,.26)',x+6,y+h,w+4,8);
 rc('#6d8b74',x,y+10,w,h-10);rc(winter?'#eef2f6':'#8a8f86',x-2,y,w+4,12);rc('rgba(0,0,0,.25)',x-2,y+11,w+4,2);
 rc('#1f2a2a',x+6,y+16,w-12,10);rc('#d6b25c',x+8,y+18,w-16,6);for(let i=0;i<w-8;i+=8)rc(i%16?'#e8e0c8':'#b03a2e',x+4+i,y+13,8,4);
 rc('#3a4a40',x,y+h-4,w,4);tx(lb,x+w/2,y+9,'#7a2f2a','bold 7px monospace');ob(x,y,w,h);kiosks.push({x:x+w/2+OX,y:y+h+14+OY})}
const lamp=(x,y)=>{rc('#2a2a28',x-1,y-30,3,32);rc('#3a3a38',x-6,y-32,12,3);lamps.push({x:x+OX,y:y-32+OY});ob(x-2,y-2,4,3)};
const gar=(x,y)=>{rc('rgba(0,0,0,.28)',x+8,y+8,52,36);rc('#6a6a62',x,y,52,38);rc('#4e5a50',x+6,y+14,40,24);for(let i=0;i<5;i++)rc('rgba(0,0,0,.25)',x+6,y+18+i*5,40,1);ob(x,y,52,38)};
function tree(x,y){G.fillStyle='rgba(0,0,0,.25)';G.beginPath();G.ellipse(x+14,y+4,18,7,0,0,7);G.fill();rc('#4a3a2a',x-3,y-8,6,10);ob(x-4,y-3,8,6);
 if(winter){H.strokeStyle='#4a3a2a';H.lineCap='round';H.lineWidth=3;H.beginPath();H.moveTo(x,y-6);H.lineTo(x,y-24);H.stroke();
  for(const[dx,dy]of[[-15,-18],[15,-18],[-9,-26],[9,-26],[0,-30],[-18,-6],[18,-6]]){H.lineWidth=1.5;H.beginPath();H.moveTo(x,y-22);H.lineTo(x+dx*.5,y-22+dy*.5);H.lineTo(x+dx,y-22+dy);H.stroke();H.fillStyle='#f2f6fa';H.beginPath();H.arc(x+dx,y-22+dy,2.5,0,7);H.fill()}}
 else{H.fillStyle='#3e4d30';H.beginPath();H.arc(x,y-20,13,0,7);H.fill();
  for(let i=0;i<6;i++){H.fillStyle=P(['#4a5a38','#55663f','#3e4d30']);H.beginPath();H.arc(x+R(-11,11),y-26+R(-8,6),R(10,15),0,7);H.fill()}}}
function fence(x,y,w,v){if(v){rc('#4a4236',x,y,4,60);ob(x,y,4,60)}else{rc('#6a5f4c',x,y,w,5);rc('#3a3226',x,y-6,3,12);rc('#3a3226',x+w-3,y-6,3,12);ob(x,y,w,5)}}
const SLG=[['МИР ТРУД МАЙ','СЛАВА ТРУДУ','МИРУ МИР','ТРУД'],['ЛЕНИНГРАД','ХЛЕБ — ВСЕМ','МИР ДОМУ','ВПЕРЁД'],['ВСЕ НА СУББОТНИК','НАШ ДВОР','ЗА ПЯТИЛЕТКУ','СЛАВА'],['ДОМ ТРУДА','ПРОГРЕСС','МИР','ЗВЕЗДА']],SHP=['ПРОДУКТЫ','ГАСТРОНОМ','МОЛОКО','ХЛЕБ'],BUSN=['АВТОБУС 14','АВТОБУС 7','АВТОБУС 31','АВТОБУС 9'],ADS=['ПЕЙТЕ СОВЕТСКОЕ ШАМПАНСКОЕ','ХРАНИТЕ ДЕНЬГИ В СБЕРКАССЕ','ЛЕТАЙТЕ САМОЛЁТАМИ АЭРОФЛОТА','ЧИТАЙТЕ ГАЗЕТУ «ПРАВДА»'];
function district(v){const S=SLG[v],SH=SHP,BUS=BUSN,AD=ADS;
 const dirt=(x,y,w,h)=>{rc(winter?'#bcc2c8':'#7a6d55',x,y,w,h);for(let i=0;i<w*h/90;i++)rc(P(winter?['#aab1b8','#cdd2d6','#9ca3aa']:['#6d604a','#8a7c62','#665a44']),x+R(0,w),y+R(0,h),R(2,5),2)};
 dirt(60,140,670,190);dirt(60,700,670,160);if(v%3==0)dirt(1090,780,480,290);
 {const sw1=winter?'#b4b9bf':'#9b9587',as=winter?'#3e4146':'#46484b';rc(sw1,0,448,TW,124);rc(sw1,738,0,124,TH);rc(as,0,470,TW,80);rc(as,760,0,80,TH);
 if(winter){const sn='rgba(245,248,252,.92)';rc(sn,0,465,756,6);rc(sn,844,465,TW-844,6);rc(sn,0,549,756,6);rc(sn,844,549,TW-844,6);rc(sn,755,0,6,465);rc(sn,755,555,6,TH-555);rc(sn,839,0,6,465);rc(sn,839,555,6,TH-555)}}
 for(let x=0;x<TW;x+=26){rc('rgba(0,0,0,.14)',x,448,1,22);rc('rgba(0,0,0,.14)',x,550,1,22)}
 for(let x=0;x<TW;x+=40)if(x<740||x>840)rc('#b5ae78',x,509,24,3);for(let y=0;y<TH;y+=40)if(y<450||y>570)rc('#b5ae78',799,y,3,24);
 for(let i=0;i<8;i++)rc('#bdb9aa',690,474+i*10,40,5);
 for(let i=0;i<50;i++){G.fillStyle='rgba(20,20,20,.16)';G.beginPath();G.ellipse(R(0,TW),R(474,546),R(8,30),R(2,6),0,0,7);G.fill()}
 bld(60,40,300,70,30,'#8d897c','#a79f86',4,0,S[0]);bld(430,40,300,70,30,'#868276','#a29a84',4);
 bld(60,330,300,70,30,'#8a8579','#aaa088',4);bld(430,330,300,70,30,'#858a80','#a39b83',4);
 bld(900,40,130,190,56,'#807f78','#9a957f',2,1,S[1]);bld(1120,40,130,190,56,'#7b7d78','#9d9884',2,1,S[2]);bld(1300,40,260,70,30,'#8a8579','#a8a086',3);
 bld(60,610,300,70,30,'#8a8579','#a79f86',4);bld(60,860,300,70,30,'#858276','#a39b83',4);
 bld(600,600,130,60,26,'#7b6e5f','#b0a58a',1);rc('#2d5c45',606,662,118,14);tx(SH[v],665,673,'#e8e0c0','bold 11px monospace');
 bld(900,610,130,170,56,'#7e7f78','#9b9680',2,1,S[3]);bld(1120,610,300,70,30,'#8a8579','#a8a086',4);
 for(let i=0;i<8;i++)gar(900+i*58,340);
 for(const[x,y]of[[120,200],[390,180],[690,240],[520,300],[250,168],[120,790],[330,790],[560,790],[1480,260],[1480,350],[880,310],[1100,760],[1450,760],[700,790]])tree(x,y);
 for(const[x,y]of[[372,152],[40,152],[372,380],[385,380],[375,700]])bin(x,y);kiosk(1050,580,'ГАЗВОДА');kiosk(570,262,'КИОСК');
 for(const[x,y]of[[330,205],[450,250],[180,300],[600,215],[160,740],[450,740],[200,830],[880,438]])bench(x,y);
 rc('#6a5a4a',118,205,3,32);rc('#6a5a4a',178,205,3,32);rc('#6a5a4a',118,205,63,3);rc('#8a3a2a',134,228,10,3);rc('#8a3a2a',156,228,10,3);ob(118,232,63,6);
 rc('#6b4e2e',250,255,54,34);rc('#c2ad7a',253,258,48,28);ob(250,255,54,34,1);
 rc('#5d5a52',880,420,60,5);rc('#5d5a52',880,420,3,20);rc('#5d5a52',937,420,3,20);tx(BUS[v],910,418,'#d8cfa0','bold 8px monospace');ob(880,420,60,8);
 rc('#2e2e2c',960,412,3,22);rc('#2e2e2c',1085,412,3,22);rc('#7a2f2a',950,404,140,18);tx(AD[v],1020,416,'#ead9a0','bold 8px monospace');ob(950,412,140,10);
 for(const[x,y]of[[380,150],[410,330],[500,455],[760,450],[1000,455],[1300,455],[450,575],[830,575],[1100,575],[700,300]])lamp(x,y);
 for(const[m,x,y,L,c,f]of[['ВАЗ-2101',1000,314,46,'#8f3b2c',0],['ВАЗ-2106',1100,314,47,'#b9ae88',1],['Москвич-412',1220,314,48,'#47685f',0],['ЗАЗ-968',1330,314,40,'#a8641f',1],['ВАЗ-2101',150,780,46,'#3d5a80',1],['ВАЗ-2106',470,780,47,'#cfc8b0',0]]){car(G,x,y,L,c,f);ob(x-L/2,y-9,L,16);pcars.push({n:m,x:x+OX,y:y+OY})}
 if(v%3==0){car(G,1200,980,46,'#6a6558',0);ob(1177,972,46,16);
 for(let i=0;i<7;i++)fence(1090+i*70,770,60);for(let j=0;j<4;j++)if(j!=2)fence(1090,780+j*70,0,1);
 for(const[x,y]of[[1180,850],[1195,860],[1400,990],[1300,920]]){rc('#7a3a2a',x-7,y-7,14,14);rc('#2a1a14',x-7,y-7,14,3);ob(x-7,y-7,14,14)}
 for(const[x,y,w,h]of[[1250,820,60,22],[1420,880,50,30]]){rc('#8a8a84',x,y,w,h);ob(x,y,w,h,1)}
 for(let i=0;i<60;i++)rc(winter?'#b8ad93':'#6b7a3e',R(1100,1560),R(790,1050),2,R(4,9));
 tx('ВИТЯ+ЛЕНА',1500,1060,'rgba(200,190,150,.4)','bold 9px monospace')}
 else{rc(winter?'#d0d8de':'#667a4a',1090,780,480,290);rc(winter?'#c0c6cc':'#a89f88',1090,910,480,20);rc(winter?'#c0c6cc':'#a89f88',1310,780,20,290);
  for(const[x,y]of[[1150,830],[1250,830],[1400,830],[1500,840],[1150,990],[1250,1000],[1400,990],[1500,1000]])tree(x,y);for(const[x,y]of[[1200,935],[1400,935],[1280,880]])bench(x,y)};
 H.strokeStyle='rgba(15,15,15,.75)';H.lineWidth=1;
 for(const[a,b,c,d]of[[380,118,500,423],[760,418,1000,423],[1000,423,1300,423],[450,543,830,543],[830,543,1100,543],[360,110,430,110],[1030,100,1120,100]]){H.beginPath();H.moveTo(a,b);H.quadraticCurveTo((a+c)/2,Math.max(b,d)+22,c,d);H.stroke()}}
function build(){obs.length=benches.length=doors.length=lamps.length=pcars.length=kiosks.length=0;G.clearRect(0,0,WW,WH);H.clearRect(0,0,WW,WH);OX=OY=0;
 rc(winter?'#d8dee4':'#5d6449',0,0,WW,WH);for(let i=0;i<8800;i++)rc(P(winter?['#c4ccd4','#e8edf2','#b8c0c8','#f4f7fa']:['#6a7152','#4f5640','#7b7b5b','#555038']),R(0,WW),R(0,WH),R(2,6),R(1,3));
 for(let iy=0;iy<2;iy++)for(let ix=0;ix<2;ix++){OX=ix*TW;OY=iy*TH;G.save();G.translate(OX,OY);H.save();H.translate(OX,OY);district(ix+iy*2);G.restore();H.restore()}
 OX=OY=0;MM.getContext('2d').drawImage(W,0,0,84,58)}
const NT=[{n:'прохожий',hp:30,sp:42,c:['#6d7078','#34343a'],h:'#3a2c22',w:5,a:.05},{n:'парень',hp:40,sp:52,c:['#4b6288','#2a2a30'],h:'#5a4026',w:3,a:.35},{n:'рабочий',hp:50,sp:40,c:['#8b7b3c','#27384e'],h:'#2a2a2a',w:3,a:.2,hat:'cap'},{n:'пенсионер',hp:25,sp:26,c:['#7d6350','#44403c'],h:'#bdbdb5',w:3,a:.04,hat:'ush'},{n:'подросток',hp:28,sp:62,c:['#b4703c','#3b4156'],h:'#8a6a30',w:3,a:.25},{n:'хулиган',hp:55,sp:58,c:['#8e3030','#1f1f22'],h:'#111',w:2,a:1,hat:'cap'},{n:'милиционер',hp:60,sp:50,c:['#4f5f78','#2a3140'],h:'#2a2a2a',w:0,a:0,hat:'mil',mil:1}];
const WT={'прохожий':'#55606e','парень':'#2f4a6a','рабочий':'#5a5a3a','пенсионер':'#5e4a3c','подросток':'#a04030','хулиган':'#3a3a3e','милиционер':'#58606c'},WHT={'прохожий':'#3a3a40','парень':'#222','рабочий':'#4a3a2a','пенсионер':'#6a5a4a','подросток':'#8a3a2a','хулиган':'#1a1a1a','милиционер':'#4a4f58'};
const FL=Array.from({length:70},()=>({x:R(0,480),y:R(0,270),v:R(.4,1.1),s:R(1,2),p:R(0,6)}));
const CM=[{n:'ВАЗ-2101',L:46,c:'#a04030'},{n:'ВАЗ-2106',L:47,c:'#c9c0a0'},{n:'Москвич-412',L:48,c:'#47685f'},{n:'ЗАЗ-968',L:40,c:'#b0702a'}];
const blocked=(x,y,q,z)=>{if(x<q||y<q||x>WW-q||y>WH-q)return 1;for(const o of obs){if(o.low&&z>5)continue;if(x+q>o.x&&x-q<o.x+o.w&&y+q>o.y&&y-q<o.y+o.h)return 1}return 0};
const move=(e,dx,dy,q,z)=>{if(!blocked(e.x+dx,e.y,q,z))e.x+=dx;if(!blocked(e.x,e.y+dy,q,z))e.y+=dy};
let AC,NB;
function aud(){if(AC)return;AC=new(window.AudioContext||window.webkitAudioContext)();NB=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=NB.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 const s=AC.createBufferSource();s.buffer=NB;s.loop=true;const f=AC.createBiquadFilter();f.frequency.value=320;const g=AC.createGain();g.gain.value=.06;s.connect(f);f.connect(g);g.connect(AC.destination);s.start()}
function nz(fr,du,v,ty='lowpass'){if(!AC)return;const s=AC.createBufferSource();s.buffer=NB;const f=AC.createBiquadFilter();f.type=ty;f.frequency.value=fr;const g=AC.createGain(),n=AC.currentTime;g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+du);s.connect(f);f.connect(g);g.connect(AC.destination);s.start(0,Math.random());s.stop(n+du)}
function tone(a,b,du,v,ty='sine',dl=0){if(!AC)return;const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+dl;o.type=ty;o.frequency.setValueAtTime(a,n);o.frequency.linearRampToValueAtTime(b,n+du);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+du);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+du)}
const keys={},M={x:480,y:270};let p,npcs,cars,t,over,cam,spT,carT,birdT,kills,coins=[],nk=0,note={s:'',t:0},bul=[],stars=0,esc=0,pk=0,sv=0,arr=0,reinfT=0,shake=0,on=0,pz=0,fT=6,sd=0,sdT=0;
const BUMP=['Эй, осторожнее!','Куда прёшь?!','Ну ты даёшь...'],ANG=['Ты чё, а?','Иди сюда!','Щас получишь!'],FLEE=['Помогите!','Милиция!','Ой-ой!'];
function reset(){p={x:400,y:240,z:0,vz:0,hp:100,f:1.57,punch:0,hurt:0,ph:0,mv:0,inv:0,cd:0,st:0,fl:0,w:0,ammo:12,rl:0,money:5};bul=[];coins=[];note.t=0;sdT=0;stars=0;esc=0;pk=0;sv=0;arr=0;reinfT=0;document.getElementById('am').style.display='none';bp.className='';C.style.cursor='crosshair';npcs=[];cars=[];t=0;over=0;kills=0;spT=0;carT=2;birdT=3;cam={x:p.x-VW/2,y:p.y-VH/2};benches.forEach(b=>b.occ=0);for(let i=0;i<10;i++)spawn(1);spawn(1,1);spawn(1,1)}
const offs=o=>Math.abs(o.x-cam.x-VW/2)>VW/2+30||Math.abs(o.y-cam.y-VH/2)>VH/2+30;
const gone=n=>{const d=D(n,p);return n.dead||d>900||(d>620&&Math.abs(n.x-cam.x-VW/2)>VW/2+40||d>620&&Math.abs(n.y-cam.y-VH/2)>VH/2+40)};
function spawn(init,mil){if(npcs.filter(m=>m.st!='down').length>=MAX&&!mil)return;
 for(let i=0;i<30;i++){const ag=R(0,6.28),rd=init?R(120,450):R(250,520),x=p.x+Math.cos(ag)*rd,y=p.y+Math.sin(ag)*rd,off=Math.abs(x-cam.x-VW/2)>VW/2+30||Math.abs(y-cam.y-VH/2)>VH/2+30;
  if((!init&&!off)||D({x,y},p)>(init?450:mil?550:900)||D({x,y},p)<120||blocked(x,y,8,0))continue;
  let q=R(0,19),ti=0;for(;ti<5&&(q-=NT[ti].w)>0;ti++);const Y=mil?NT[6]:Math.random()<.14&&!stars&&npcs.filter(m=>m.Y.mil).length<3?NT[6]:NT[ti];
  const n={x,y,Y,hp:Y.hp,mh:Y.hp,st:'walk',tm:0,tx:x,ty:y,f:R(0,6.28),ph:0,hurt:0,say:'',sayT:0,bar:0,cd:0,atk:0,kx:0,ky:0,agr:Math.random()<Y.a,brave:Math.random()<(Y.n=='пенсионер'?.1:Y.n=='рабочий'||Y.n=='парень'?.45:.25),stun:0,sc:0,mv:0,stk:0};
  const u=Math.random();
  if(u<.18){const b=benches.find(b=>!b.occ&&D(b,p)<520&&(init||offs(b)));if(b){b.occ=1;n.b=b;n.x=b.x+b.w/2;n.y=b.y+b.h+1;n.st='sit';n.tm=R(10,25)}else newWalk(n)}
  else if(u<.33){const nd=doors.filter(d=>D(d,p)<520&&(init||offs(d)));if(nd.length){const d=P(nd);n.x=d.x+R(-14,14);n.y=d.y+R(0,6);if(blocked(n.x,n.y,6,0)){n.x=x;n.y=y;newWalk(n)}else{n.st='idle';n.tm=R(8,20)}}else newWalk(n)}
  else newWalk(n);
  npcs.push(n);return}}
function newWalk(n){n.st='walk';n.tg=0;for(let i=0;i<9;i++){const a=R(0,6.28),d=R(60,260),x=n.x+Math.cos(a)*d,y=n.y+Math.sin(a)*d;if(!blocked(x,y,8,0)){n.tx=x;n.ty=y;return}}n.tx=n.x;n.ty=n.y}
function go(n,tx,ty,sp,dt){const dx=tx-n.x,dy=ty-n.y,l=Math.hypot(dx,dy);if(l<5)return 1;const ox=n.x,oy=n.y;n.f=Math.atan2(dy,dx);move(n,dx/l*sp*dt,dy/l*sp*dt,6,0);n.ph+=dt*sp*.22;n.mv=1;
 if(Math.hypot(n.x-ox,n.y-oy)<sp*dt*.3){n.stk+=dt;if(n.stk>.6){n.stk=0;return 2}}else n.stk=0;return 0}
function hitP(dm,a,nl){if(p.inv>0||over)return;p.hp-=dm;if(nl&&p.hp<10)p.hp=10;p.hurt=.3;p.inv=.6;try{navigator.vibrate(40)}catch(e){}shake=.2;move(p,Math.cos(a)*10,Math.sin(a)*10,6,p.z);nz(300,.15,.4);tone(110,50,.15,.25,'square');if(p.hp<=0){p.hp=0;over=1}}
function setStars(n){if(n<=stars)return;stars=n;esc=0;if(n>=4)reinfT=7;say('★'.repeat(n)+' РОЗЫСК: '+n);tone(600,300,.25,.12,'square')}
function clearStars(msg){stars=0;esc=0;pk=0;sv=0;reinfT=0;for(const m of npcs)if(m.Y.mil&&(m.st=='shoot'||m.st=='catch')&&!m.tg)newWalk(m);if(msg)say(msg)}
function fine(){if(p.money<10){over=2;say('Нет 10 рублей на штраф — вас арестовали');nz(300,.4,.3);return}p.money-=10;clearStars('Штраф 10 руб. Розыск снят');nz(800,.3,.3)}
function openArrest(){if(arr||over)return;arr=1;for(const k in keys)keys[k]=0;mh=0;jr();document.getElementById('am').style.display='flex'}
function arrestAct(r){document.getElementById('am').style.display='none';arr=0;if(r){setStars(3);p.inv=1.5;for(const m of npcs)if(m.Y.mil&&D(m,p)<60){const a=Math.atan2(m.y-p.y,m.x-p.x);m.kx=Math.cos(a)*200;m.ky=Math.sin(a)*200;m.stun=.4}say('Вы сопротивляетесь! Милиция стреляет на поражение')}else over=2}
function hurtN(n,dm,a,g){const sdf=!n.prov&&(n.att>0||(n.st=='chase'&&n.agr));
 if(!sdf){n.prov=1;const kl=n.hp-dm<=0;if(n.Y.mil)setStars(g?5:3);else if(g){if(!n.vic){n.vic=1;sv++}setStars(sv>=3?5:4)}else if(kl){pk++;setStars(pk>=2?3:2)}else setStars(1)}
 for(const q of npcs)if(q!=n&&!q.Y.mil&&q.st!='down'&&q.sc<=0&&D(q,n)<220&&Math.random()<.5){q.sc=4;q.say=P(['Драка!','Милиция!','Хулиганьё!']);q.sayT=2}
 if(Math.random()<.3)drop(n,0);n.hp-=dm;n.hurt=.25;n.stun=.3;n.bar=3.5;n.kx=Math.cos(a)*220;n.ky=Math.sin(a)*220;nz(400,.15,.45);tone(140,60,.12,.3,'square');shake=.1;
 if(n.b){n.b.occ=0;n.b=0;n.y+=9}
 if(n.hp<=0){n.st='down';n.tm=30;kills++;n.say='';drop(n,1)}else if(n.Y.mil){n.st='shoot';n.tg=0;n.tm=15;n.say='Стоять! Милиция!';n.sayT=2}else if(n.agr||n.brave){n.st='chase';n.tm=10;n.say=P(ANG);n.sayT=1.8}else{n.st='flee';n.tm=R(3,5);n.say=P(FLEE);n.sayT=1.8}}
function shout(n,r=220){for(const q of npcs)if(q!=n&&!q.Y.mil&&q.st!='down'&&q.st!='fight'&&q.sc<=0&&D(q,n)<r&&Math.random()<.6){q.sc=4;q.say=P(['Драка!','Милиция!','Хулиганьё!','Прекратите!']);q.sayT=2}}
function hurtF(q,dm,a){shout(q);q.hp-=dm;q.hurt=.25;q.stun=.15;q.bar=3;q.kx=Math.cos(a)*120;q.ky=Math.sin(a)*120;nz(450,.1,.25);if(q.hp<=0){q.st='down';q.tm=30;q.say='';q.ft=0;drop(q,1)}}
function startFight(){const c=npcs.filter(n=>!n.Y.mil&&(n.st=='walk'||n.st=='idle')&&D(n,p)<420);if(c.length<2)return;
 const a=P(c),b=c.find(q=>q!=a&&D(q,a)<260);if(!b)return;
 for(const[x,y]of[[a,b],[b,a]]){if(x.b){x.b.occ=0;x.b=0;x.y+=9}x.st='fight';x.ft=y;x.tm=R(7,12);x.cd=0;x.say=P(['Ах ты!','Ну давай!','Ты чё?!']);x.sayT=1.8}shout(a,300)}
function drop(n,big){const k=big?1+(Math.random()<.5):1;for(let i=0;i<k;i++)coins.push({x:n.x+R(-12,12),y:n.y+R(-6,8),v:Math.floor(big?(n.Y.mil?R(3,7):n.Y.n=='хулиган'?R(2,6):R(1,4)):1),t:40})}
const say=s=>{note.s=s;note.t=2.2};
function buy(i){if(!on||over||!nk)return;const it=[['газировка',2,20],['сухарики',3,30]][i];
 if(p.money<it[1]){say('Не хватает рублей!');return}if(p.hp>=100){say('Здоровье и так полное');return}
 p.money-=it[1];p.hp=Math.min(100,p.hp+it[2]);say('+'+it[2]+' HP: '+it[0]);
 if(i)for(let k=0;k<4;k++)setTimeout(()=>nz(1500,.05,.2,'bandpass'),k*70);else nz(3000,.5,.2,'highpass')}
function hurtM(q,dm,a){q.hp-=dm;q.hurt=.25;q.stun=.3;q.bar=3.5;q.kx=Math.cos(a)*200;q.ky=Math.sin(a)*200;q.crim=0;if(q.b){q.b.occ=0;q.b=0;q.y+=9}if(q.hp<=0){q.st='down';q.tm=30;q.say='';drop(q,1)}else{q.st='flee';q.tm=R(3,5);q.say='Ай!';q.sayT=1.5}}
function punch(){if(!on||over||p.cd>0)return;p.cd=.36;p.punch=.28;if(tm){let b=null,bd=100;for(const n of npcs)if(n.st!='down'){const d=D(n,p);if(d<bd){bd=d;b=n}}if(b)p.f=Math.atan2(b.y-p.y,b.x-p.x)}else p.f=Math.atan2(M.y+cam.y-(p.y-14),M.x+cam.x-p.x);nz(700,.1,.25);
 const hx=p.x+Math.cos(p.f)*20,hy=p.y+Math.sin(p.f)*20;for(const n of npcs)if(n.st!='down'&&Math.hypot(n.x-hx,n.y-hy)<22)hurtN(n,R(10,15),p.f)}
function aim(rg,def){let b=null,bd=rg;for(const n of npcs)if(n.st!='down'){const d=D(n,p)-(n.st=='shoot'?40:0);if(d<bd){bd=d;b=n}}return b?Math.atan2(b.y-p.y,b.x-p.x):def}
function shoot(){if(!on||over||p.cd>0||p.rl>0||p.ammo<=0)return;
 p.f=tm?aim(300,p.f):Math.atan2(M.y+cam.y-(p.y-14),M.x+cam.x-p.x);p.ammo--;p.cd=.28;p.fl=.08;shake=.07;
 const a=p.f+R(-.03,.03);bul.push({x:p.x+Math.cos(a)*12,y:p.y+Math.sin(a)*12,vx:Math.cos(a)*480,vy:Math.sin(a)*480,l:.7,m:0});
 nz(1800,.18,.6,'bandpass');tone(220,40,.12,.25,'sawtooth');if(!sd)setStars(3);
 for(const n of npcs)if(!n.Y.mil&&n.st!='down'&&n.st!='flee'&&D(n,p)<260){n.st='flee';n.tm=R(4,6);n.say='Стреляют!';n.sayT=1.8;if(n.b){n.b.occ=0;n.b=0;n.y+=9}}
 if(p.ammo<=0)p.rl=1.4}
function menu(v){if(!on&&v)return;pz=v?1:0;document.getElementById('pm').style.display=v?'flex':'none';if(v){for(const k in keys)keys[k]=0;mh=0;jr()}}
function setW(v){winter=v?1:0;build();document.getElementById('wb').textContent=winter?'Сменить на лето':'Сменить на зиму';for(const n of npcs)if(n.b){const b=benches.find(q=>q.x==n.b.x&&q.y==n.b.y);if(b){b.occ=1;n.b=b}}}
const act=()=>p.w?shoot():punch();
function sw(w){if(p.w==w)return;p.w=w;p.rl=0;bp.className=w?'g':'';C.style.cursor=w?'none':'crosshair';nz(2000,.04,.15,'bandpass')}
function updN(n,dt){const d=D(n,p);n.mv=0;n.hurt-=dt;n.sayT-=dt;n.bar-=dt;n.cd-=dt;n.sc-=dt;n.stun-=dt;n.fl=(n.fl||0)-dt;n.crim=(n.crim||0)-dt;n.cc=(n.cc||0)-dt;n.att=(n.att||0)-dt;
 if(n.kx||n.ky){move(n,n.kx*dt,n.ky*dt,6,0);const k=Math.pow(.0005,dt);n.kx*=k;n.ky*=k;if(Math.abs(n.kx)+Math.abs(n.ky)<8)n.kx=n.ky=0}
 if(n.stun>0)return;
 if(n.Y.mil&&n.st!='down'&&!over&&stars>0){const ra=stars>=4?900:stars>=3?650:500;
  if(n.st!='shoot'&&n.st!='catch'&&d<ra){if(n.b){n.b.occ=0;n.b=0;n.y+=9}n.st=stars==1?'catch':'shoot';n.tg=0;n.tm=25;n.say=stars==1?'Гражданин, стойте!':'Стоять! Милиция!';n.sayT=2}
  else if(n.st=='catch'&&stars>=2)n.st='shoot';else if(n.st=='shoot'&&!n.tg&&stars==1)n.st='catch'}
 if(n.Y.mil&&n.st!='down'&&n.st!='shoot'&&n.st!='catch'&&!stars&&!over){const c=npcs.find(q=>!q.Y.mil&&q.crim>0&&q.st!='down'&&D(q,n)<420);if(c){if(n.b){n.b.occ=0;n.b=0;n.y+=9}n.st='shoot';n.tg=c;n.tm=12;n.say='Прекратить!';n.sayT=2}}
 switch(n.st){
 case'down':n.tm-=dt;if(n.tm<=0)n.dead=1;break;
 case'idle':n.tm-=dt;if(n.tm<0)newWalk(n);break;
 case'sit':n.tm-=dt;if(n.tm<0){n.b.occ=0;n.b=0;n.y+=9;newWalk(n)}break;
 case'walk':{const q=go(n,n.tx,n.ty,n.Y.sp,dt);if(q){if(Math.random()<.35){n.st='idle';n.tm=R(2,7)}else newWalk(n)}
  if(n.agr&&d<170&&!over){n.st='chase';n.tm=12;n.say=P(ANG);n.sayT=1.8}break}
 case'chase':n.tm-=dt;if(n.atk>0){n.atk-=dt;if(n.atk<.12&&!n.hd){n.hd=1;if(d<34)hitP(R(5,8),Math.atan2(p.y-n.y,p.x-n.x))}}
  else{n.f=Math.atan2(p.y-n.y,p.x-n.x);if(d>22)go(n,p.x,p.y,n.Y.sp*1.35,dt);else if(n.cd<=0&&!over){n.atk=.38;n.hd=0;n.cd=1.2;n.crim=12;n.att=12}}
  if(n.tm<=0||d>320||over)newWalk(n);break;
 case'fight':{n.tm-=dt;const T=n.ft;if(!T||T.st=='down'||T.dead||n.tm<=0||T.st!='fight'){newWalk(n);break}
  n.f=Math.atan2(T.y-n.y,T.x-n.x);
  if(n.atk>0){n.atk-=dt;if(n.atk<.12&&!n.hd){n.hd=1;if(D(n,T)<34)hurtF(T,R(4,7),n.f)}}
  else if(D(n,T)>22)go(n,T.x,T.y,n.Y.sp*1.2,dt);else if(n.cd<=0){n.atk=.38;n.hd=0;n.cd=R(.8,1.3);n.crim=12}break}
 case'catch':{n.tm-=dt;n.f=Math.atan2(p.y-n.y,p.x-n.x);go(n,p.x,p.y,105,dt);if(d<22&&!over&&!arr&&stars==1)fine();if(stars==0||n.tm<=0)newWalk(n);break}
 case'shoot':{n.tm-=dt;if(n.tg&&stars>0&&d<500)n.tg=0;const T=n.tg||p,e=D(n,T),pl=!n.tg,cl=pl&&stars==2;n.f=Math.atan2(T.y-n.y,T.x-n.x);
  if(e>(cl?20:150))go(n,T.x,T.y,n.Y.sp*(pl?1.3+.12*stars:1.3),dt);else if(e<80&&!cl){move(n,-Math.cos(n.f)*n.Y.sp*dt,-Math.sin(n.f)*n.Y.sp*dt,6,0);n.mv=1;n.ph+=dt*8}
  if(cl&&e<26&&!arr&&!over)openArrest();
  if(n.cd<=0&&!over&&e<210){n.cd=R(1,1.6)/(stars>=5?1.5:1);n.fl=.12;const a=n.f+R(-.12,.12);bul.push({x:n.x+Math.cos(a)*12,y:n.y+Math.sin(a)*12,vx:Math.cos(a)*400,vy:Math.sin(a)*400,l:.9,m:1,t:n.tg,nl:stars<3?1:0});nz(1500,.15,.35,'bandpass');tone(180,40,.1,.15,'sawtooth')}
  if(n.tg?(n.tm<=0||n.tg.st=='down'||n.tg.dead||n.tg.st=='flee'||!(n.tg.crim>0)):(n.tm<=0||over||stars==0))newWalk(n);break}
 case'flee':n.tm-=dt;{const a=Math.atan2(n.y-p.y,n.x-p.x);n.f=a;move(n,Math.cos(a)*n.Y.sp*1.5*dt,Math.sin(a)*n.Y.sp*1.5*dt,6,0);n.ph+=dt*14;n.mv=1}if(n.tm<=0)newWalk(n);break}
 if(d<15&&n.sc<=0&&(n.st=='walk'||n.st=='idle')){n.sc=5;n.say=P(BUMP);n.sayT=1.8;if(n.agr){n.st='chase';n.tm=10}}}
function upd(dt){if(over||arr)return;t+=dt;reinfT-=dt;p.fl-=dt;if(npcs.some(q=>!q.Y.mil&&q.st!='down'&&(q.att>0||q.st=='chase'&&q.agr)&&!q.prov&&D(q,p)<400))sdT=12;else sdT-=dt;sd=sdT>0;if(mh)act();note.t-=dt;fT-=dt;if(fT<=0){fT=R(5,10);if(Math.random()<.4)startFight()}nk=kiosks.find(q=>D(q,p)<55)||0;const kd=nk?'flex':'none';if(kb.style.display!=kd)kb.style.display=kd;for(let i=coins.length-1;i>=0;i--){const c=coins[i];c.t-=dt;if(c.t<=0){coins.splice(i,1);continue}if(D(c,p)<14&&p.z<10){p.money+=c.v;say('+'+c.v+' руб.');tone(900,1500,.1,.08);coins.splice(i,1)}}if(p.rl>0){p.rl-=dt;if(p.rl<=0)p.ammo=12}
 const k=keys;let dx=((k.KeyD||k.ArrowRight)?1:0)-((k.KeyA||k.ArrowLeft)?1:0),dy=((k.KeyS||k.ArrowDown)?1:0)-((k.KeyW||k.ArrowUp)?1:0),l=Math.hypot(dx,dy);
 p.cd-=dt;p.inv-=dt;p.punch-=dt;p.hurt-=dt;const run=k.ShiftLeft||k.ShiftRight,sp=(run?136:84)*(p.hurt>0?.4:1);p.mv=l>0;
 if(p.mv){dx/=l;dy/=l;move(p,dx*sp*dt,dy*sp*dt,6,p.z);if(p.punch<=0&&!(p.w&&!tm))p.f=Math.atan2(dy,dx);p.ph+=dt*(run?15:10);const s=Math.sin(p.ph)>0;if(s!=p.st&&p.z==0){p.st=s;nz(1100,.05,.1,'bandpass')}}
 if(p.w&&!tm)p.f=Math.atan2(M.y+cam.y-(p.y-14),M.x+cam.x-p.x);if(k.Space&&p.z==0){p.vz=190;p.z=.01;tone(200,320,.1,.05)}
 if(p.z>0){p.vz-=620*dt;p.z+=p.vz*dt;if(p.z<=5.5){if(blocked(p.x,p.y,6,0)){p.z=6.2;p.vz=0}else if(p.z<=0){p.z=0;p.vz=0}}}
 for(let i=bul.length-1;i>=0;i--){const b=bul[i];b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;let h=b.l<=0||blocked(b.x,b.y,1,6);
  if(!h){if(b.m){if(b.t){if(b.t.st!='down'&&Math.hypot(b.x-b.t.x,b.y-b.t.y)<11){hurtM(b.t,25,Math.atan2(b.vy,b.vx));h=1}}else if(Math.hypot(b.x-p.x,b.y-p.y)<11&&p.z<14){hitP(R(7,10),Math.atan2(b.vy,b.vx),b.nl);h=1}}else for(const n of npcs)if(n.st!='down'&&Math.hypot(b.x-n.x,b.y-n.y)<9){hurtN(n,25,Math.atan2(b.vy,b.vx),1);h=1;break}}
  if(h)bul.splice(i,1)}
 for(const n of npcs)updN(n,dt);
 for(let i=npcs.length-1;i>=0;i--)if(gone(npcs[i])){if(npcs[i].b)npcs[i].b.occ=0;npcs.splice(i,1)}
 if((spT-=dt)<=0){spT=.5;spawn();if(npcs.length<MAX*.6)spawn();const ma=npcs.filter(m=>m.Y.mil&&m.st!='down').length,mg=stars>=5?10:stars>=4?5:0;if(!stars&&ma<2)spawn(0,1);else if(reinfT>0&&ma<mg){spawn(0,1);spawn(0,1)}}
 if(stars>0){let md=1e9;for(const m of npcs)if(m.Y.mil&&m.st!='down')md=Math.min(md,D(m,p));if(md>600)esc+=dt;else esc=0;if(esc>=8)clearStars('Вы оторвались от погони. Розыск снят')}
 if((carT-=dt)<=0){carT=R(5,11);const e=Math.random()<.5;cars.push({x:e?-60:WW+60,y:(e?530:488)+(Math.random()<.5?0:TH),v:(e?1:-1)*R(110,170),m:P(CM),fl:!e});if(Math.random()<.4)tone(420,420,.3,.04,'square')}
 for(let i=cars.length-1;i>=0;i--){const c=cars[i];c.x+=c.v*dt;if(c.x<-100||c.x>WW+100){cars.splice(i,1);continue}
  if(Math.abs(p.x-c.x)<c.m.L/2+4&&Math.abs(p.y-c.y)<10&&p.z<8)hitP(10,c.v>0?0:PI);
  for(const n of npcs)if(n.st!='down'&&n.cc<=0&&Math.abs(n.x-c.x)<c.m.L/2+4&&Math.abs(n.y-c.y)<10){n.cc=1.2;hurtM(n,R(25,40),c.v>0?0:PI)}
  if(D(c,p)<400&&!c.s){c.s=1;tone(70,60,1.5,.1,'sawtooth')}}
 if((birdT-=dt)<=0){birdT=R(4,9);for(let i=0;i<3;i++)tone(P([3000,3400,3800]),P([4200,3600]),.08,.03,'sine',i*.14)}
 cam.x+=(p.x-VW/2-cam.x)*Math.min(1,dt*6);cam.y+=(p.y-VH/2-cam.y)*Math.min(1,dt*6);cam.x=Math.max(0,Math.min(WW-VW,cam.x));cam.y=Math.max(0,Math.min(WH-VH,cam.y));shake=Math.max(0,shake-dt)}
function person(x,y,o){const z=o.z||0,f=o.f,cx=Math.cos(f),cy=Math.sin(f),h=o.hurt>0,top=h?'#d9453b':o.c[0],bot=o.c[1],sk=h?'#e0584a':'#d6a587';
 X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(x,y,7,3,0,0,7);X.fill();
 if(o.down){r(top,x-9,y-8,12,8);r(bot,x+3,y-7,8,6);r(sk,x-13,y-9,6,6);r(o.hair,x-13,y-9,6,2);return}
 const y0=y-z,s=Math.sin(o.ph)*3*(o.mv?1:0),v=Math.abs(cx)>Math.abs(cy),lh=o.sit?3:8;
 if(v){r(bot,x-4+s,y0-lh,3,lh);r(bot,x+1-s,y0-lh,3,lh);r('#1d1b19',x-4+s,y0-2,4,2);r('#1d1b19',x+1-s,y0-2,4,2)}
 else{r(bot,x-4,y0-lh+s*.5,3,lh);r(bot,x+1,y0-lh-s*.5,3,lh);r('#1d1b19',x-4,y0-2+s*.5,3,2);r('#1d1b19',x+1,y0-2-s*.5,3,2)}
 const by=y0-17+(o.sit?3:0);r(top,x-5,by,10,10);if(o.coat){r(top,x-6,by+9,12,6);r('#2a1a10',x-5,by+6,10,1)}else if(o.jk){r(top,x-6,by,12,11);r('rgba(0,0,0,.25)',x-6,by+10,12,1)}if(o.str)r(o.str,x-5,by+5,10,1);
 if(o.punch>0){const e=o.punch>.14?(.28-o.punch)/.14:o.punch/.14,ax=x+cx*(6+10*e),ay=y0-14+cy*(6+10*e);X.strokeStyle=top;X.lineWidth=3;X.beginPath();X.moveTo(x,y0-14);X.lineTo(ax,ay);X.stroke();r(sk,ax-2,ay-2,4,4);r(top,x+(cx>0?-7:5),y0-16,2,7)}
 else if(o.gun){const ax=x+cx*10,ay=y0-13+cy*10;X.strokeStyle=top;X.lineWidth=3;X.beginPath();X.moveTo(x,y0-14);X.lineTo(ax,ay);X.stroke();r(sk,ax-1,ay-1,3,3);r('#1a1a1a',ax+(cx>0?0:-4),ay-2,5,3);r(top,x+(cx>0?-7:5),y0-16,2,7);if(o.fl>0)r('#ffd35a',ax+cx*6-2,ay+cy*6-2,5,5)}else{r(top,x-7,by-1+s*.4,2,8);r(top,x+5,by-1-s*.4,2,8);r(sk,x-7,by+7+s*.4,2,2);r(sk,x+5,by+7-s*.4,2,2)}
 const hy=by-8;r(sk,x-4,hy,8,8);r(o.hair,x-4,hy,8,cy<-.7?7:3);
 if(cy>-.7){if(v)r('#222',x+cx*2,hy+4,1,1);else{r('#222',x-2,hy+4,1,1);r('#222',x+1,hy+4,1,1)}}
 if(o.hat=='cap'){r('#3b3b3b',x-5,hy-2,10,3);r('#2a2a2a',x+(cx>0?1:-5),hy+1,5,1)}else if(o.hat=='mil'){r('#3f4d63',x-6,hy-4,12,3);r('#a02a2a',x-5,hy-1,10,1);r('#222',x-5,hy,10,1)}else if(o.hat=='ush'){const hc=o.hc||'#5a4a3a';r(hc,x-5,hy-3,10,5);r(hc,x-5,hy,2,4);r(hc,x+3,hy,2,4);if(o.star)r('#c0392b',x-1,hy-2,2,2)}}
function draw(){const cx=cam.x+(shake?R(-3,3):0)|0,cy=cam.y+(shake?R(-3,3):0)|0;
 X.drawImage(W,cx,cy,VW,VH,0,0,VW,VH);X.save();X.translate(-cx,-cy);
 const dr=[];for(const n of npcs)dr.push([n.y,()=>{const Y=n.Y;X.globalAlpha=n.st=='down'?Math.max(0,Math.min(1,n.tm/3)):1;person(n.x,n.y,{c:winter?[WT[Y.n],Y.c[1]]:Y.c,hair:Y.h,hat:winter?'ush':Y.hat,hc:winter?WHT[Y.n]:0,coat:winter&&Y.mil,jk:winter&&!Y.mil,star:winter&&Y.mil,f:n.f,ph:n.ph,mv:n.mv,hurt:n.hurt,down:n.st=='down',sit:n.st=='sit',punch:n.atk>0?Math.min(.28,n.atk*.74):0,gun:n.st=='shoot',fl:n.fl});X.globalAlpha=1;
  if(n.bar>0&&n.st!='down'){r('#000',n.x-11,n.y-37,22,4);r(n.hp/n.mh>.4?'#6aa84f':'#c0392b',n.x-10,n.y-36,20*Math.max(0,n.hp/n.mh),2)}
  if(n.sayT>0){X.font='10px monospace';X.textAlign='center';X.lineWidth=3;X.strokeStyle='#000';X.strokeText(n.say,n.x,n.y-42);X.fillStyle='#f0e8c8';X.fillText(n.say,n.x,n.y-42)}}]);
 for(const c of cars)dr.push([c.y,()=>car(X,c.x,c.y,c.m.L,c.m.c,c.fl)]);
 for(const c of coins)dr.push([c.y,()=>{if(c.t<5&&((c.t*6|0)%2))return;const bo=Math.sin(t*5+c.x)*1.5;X.fillStyle='rgba(0,0,0,.3)';X.beginPath();X.ellipse(c.x,c.y,3,1.5,0,0,7);X.fill();X.fillStyle='#e0b43a';X.beginPath();X.arc(c.x,c.y-4+bo,c.v>2?4:3,0,7);X.fill();r('#fff2b0',c.x-1,c.y-6+bo,1,1)}]);
 for(const b of bul)dr.push([b.y,()=>r('#fff2b0',b.x-2,b.y-15,4,3)]);
 dr.push([p.y,()=>person(p.x,p.y,{c:winter?['#6b4a2e','#202228']:['#2f4f8f','#202228'],str:winter?0:'#e8e8e8',hair:'#4a3420',hat:winter?'ush':0,hc:'#14141a',coat:winter,f:p.f,ph:p.ph,mv:p.mv&&p.z==0,z:p.z,hurt:p.hurt,punch:p.w?0:p.punch,gun:p.w,fl:p.fl})]);
 dr.sort((a,b)=>a[0]-b[0]).forEach(d=>d[1]());
 X.globalAlpha=.94;X.drawImage(T,cx,cy,VW,VH,cx,cy,VW,VH);X.globalAlpha=1;
 for(const c of pcars)if(Math.hypot(c.x-p.x,c.y-p.y)<90){X.font='bold 10px monospace';X.textAlign='center';X.lineWidth=3;X.strokeStyle='#000';X.strokeText(c.n,c.x,c.y-20);X.fillStyle='#e8dfa0';X.fillText(c.n,c.x,c.y-20)}
 X.restore();
 X.globalCompositeOperation='multiply';X.fillStyle=winter?'#aab6c6':'#bdb3a2';X.fillRect(0,0,VW,VH);X.globalCompositeOperation='lighter';
 for(const l of lamps){const sx=l.x-cx,sy=l.y-cy;if(sx<-100||sx>VW+100||sy<-100||sy>VH+100)continue;const g=X.createRadialGradient(sx,sy,2,sx,sy,100);g.addColorStop(0,'rgba(255,190,100,.28)');g.addColorStop(1,'rgba(255,190,100,0)');X.fillStyle=g;X.fillRect(sx-100,sy-100,200,200)}
 X.globalCompositeOperation='source-over';X.drawImage(VG,0,0);
 if(p.hurt>0){const f=Math.min(1,p.hurt/.3);X.globalAlpha=f*.9;X.drawImage(RV,0,0);X.globalAlpha=1;X.fillStyle='rgba(170,10,10,'+(.16*f)+')';X.fillRect(0,0,VW,VH)}
 if(winter){X.fillStyle='rgba(255,255,255,.85)';for(const f of FL){f.y+=f.v;f.x+=Math.sin(f.y*.05+f.p)*.4;if(f.y>VH){f.y=-3;f.x=R(0,VW)}X.fillRect(f.x,f.y,f.s,f.s)}}
 X.save();X.translate(R(0,128)|0,R(0,128)|0);X.globalAlpha=.09;X.fillStyle=NP;X.fillRect(-128,-128,VW+128,VH+128);X.restore();
 if(Math.random()<.05)rc('rgba(255,255,230,.1)',R(0,VW),0,1,VH,X);
 {const k=84/WW,mx=6,my=6;X.globalAlpha=.85;X.drawImage(MM,mx,my);X.globalAlpha=1;X.strokeStyle='#000';X.lineWidth=1;X.strokeRect(mx,my,84,58);
 for(const n of npcs)if(n.st!='down')r(n.Y.mil?'#4a7bd0':'#888',mx+n.x*k-.5,my+n.y*k-.5,1.5,1.5);
 for(const q of kiosks)r('#d6b25c',mx+q.x*k-1,my+q.y*k-1,2,2);r('#fff',mx+p.x*k-1.5,my+p.y*k-1.5,3,3);X.strokeStyle='rgba(255,255,255,.7)';X.strokeRect(mx+cam.x*k,my+cam.y*k,VW*k,VH*k)}
 r('#000',100,10,164,18);r('#3a1d1a',102,12,160,14);r(p.hp>35?'#8fae4a':'#c0392b',102,12,160*p.hp/100,14);tx('ЗДОРОВЬЕ',182,23,'#fff','bold 11px monospace',X);
 X.textAlign='left';X.font='bold 10px monospace';{let sx=100;for(const[a_,c_]of[['₽ '+p.money,'#e8c860'],[p.w?'ПМ '+(p.rl>0?'перезаряд.':p.ammo+'/12'):'Кулаки','#e8dfc0'],['Сбито: '+kills,'#c9a8a0']]){X.fillStyle=c_;X.fillText(a_,sx,42);sx+=X.measureText(a_).width+14}}X.font='11px monospace';
 X.fillStyle='rgba(232,223,192,.6)';X.fillText(winter?'Зима 1985, микрорайон':'Лето 1985, микрорайон',10,VH-10);
 
 if(p.w&&!tm&&!over){X.strokeStyle='rgba(224,90,74,.9)';X.lineWidth=1;X.beginPath();X.arc(M.x,M.y,5,0,7);X.moveTo(M.x-9,M.y);X.lineTo(M.x-3,M.y);X.moveTo(M.x+3,M.y);X.lineTo(M.x+9,M.y);X.moveTo(M.x,M.y-9);X.lineTo(M.x,M.y-3);X.moveTo(M.x,M.y+3);X.lineTo(M.x,M.y+9);X.stroke()}
 
 if(nk)tx('E — газировка 2р (+20)   C — сухарики 3р (+30)',VW/2,VH-20,'#e8dfc0','bold 11px monospace',X);
 if(note.t>0){X.globalAlpha=Math.min(1,note.t);tx(note.s,VW/2,VH-44,'#ffe9a0','bold 11px monospace',X);X.globalAlpha=1}
 if(stars>0){const bl=esc>0&&((t*4|0)%2);for(let i=0;i<5;i++){const cx=107+i*17,cy=58;X.fillStyle=i<stars?(bl?'rgba(224,60,50,.3)':'#e03c32'):'rgba(255,255,255,.16)';X.beginPath();for(let k=0;k<10;k++){const r_=k%2?3.2:7.5,an=-PI/2+k*PI/5;X.lineTo(cx+Math.cos(an)*r_,cy+Math.sin(an)*r_)}X.closePath();X.fill();X.strokeStyle='rgba(0,0,0,.6)';X.lineWidth=1;X.stroke()}}
 if(over){r('rgba(0,0,0,.7)',0,0,VW,VH);tx(over==2?'АРЕСТОВАН':'ВЫ ПОТЕРЯЛИ СОЗНАНИЕ',VW/2,250,'#c9a84a','bold 28px monospace',X);tx('Нажмите R, чтобы начать заново',VW/2,285,'#e8dfc0','14px monospace',X)}}
const VG=mk(VW,VH),NP0=mk(128,128),RV=mk(VW,VH);
{const g=RV.getContext('2d'),q=g.createRadialGradient(VW/2,VH/2,VH*.25,VW/2,VH/2,VW*.62);q.addColorStop(0,'rgba(190,20,20,0)');q.addColorStop(1,'rgba(190,20,20,.8)');g.fillStyle=q;g.fillRect(0,0,VW,VH)}
{const g=VG.getContext('2d'),q=g.createRadialGradient(VW/2,VH/2,100,VW/2,VH/2,300);q.addColorStop(0,'rgba(0,0,0,0)');q.addColorStop(1,'rgba(0,0,0,.65)');g.fillStyle=q;g.fillRect(0,0,VW,VH);
 const n=NP0.getContext('2d'),im=n.createImageData(128,128);for(let i=0;i<im.data.length;i+=4){const v=Math.random()*255;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}n.putImageData(im,0,0)}
const NP=X.createPattern(NP0,'repeat');
addEventListener('keydown',e=>{keys[e.code]=1;if(e.code=='Space')e.preventDefault();if(e.code=='KeyR'&&on){reset();menu(0)}if((e.code=='KeyP'||e.code=='Escape')&&on)menu(!pz);if(e.code=='KeyT'&&on)setW(!winter);if(on){if(e.code=='KeyQ')sw(p.w^1);if(e.code=='Digit1')sw(0);if(e.code=='Digit2')sw(1);if(e.code=='KeyF'&&p.w&&p.ammo<12&&p.rl<=0)p.rl=1.2;if(e.code=='KeyE')buy(0);if(e.code=='KeyC')buy(1)}});addEventListener('keyup',e=>keys[e.code]=0);
C.addEventListener('mousedown',e=>{if(e.button==0){if(pz){pz=0;return}mh=1;act()}});C.addEventListener('mousemove',e=>{M.x=e.offsetX*VW/C.clientWidth;M.y=e.offsetY*VH/C.clientHeight});C.addEventListener('contextmenu',e=>e.preventDefault());addEventListener('mouseup',()=>mh=0);addEventListener('blur',()=>{if(!tm&&on)menu(1);for(const k in keys)keys[k]=0;mh=0});document.addEventListener('visibilitychange',()=>{if(document.hidden&&on)menu(1)});addEventListener('wheel',()=>{if(on)sw(p.w^1)},{passive:true});
document.getElementById('ov').onclick=function(){this.remove();on=1;aud();try{document.documentElement.requestFullscreen().catch(()=>{})}catch(e){}try{screen.orientation.lock('landscape').catch(()=>{})}catch(e){}};
let tm=0,jid=null,mh=0;const JS=document.getElementById('js'),JK=document.getElementById('jk');
function jm(e){const b=JS.getBoundingClientRect(),m=b.width/2;let dx=e.clientX-b.left-m,dy=e.clientY-b.top-m;const l=Math.hypot(dx,dy);if(l>m){dx*=m/l;dy*=m/l}JK.style.transform='translate('+dx+'px,'+dy+'px)';const h=m*.3;keys.KeyA=dx<-h;keys.KeyD=dx>h;keys.KeyW=dy<-h;keys.KeyS=dy>h;keys.ShiftLeft=l>m*.95}
function jr(){jid=null;JK.style.transform='';keys.KeyA=keys.KeyD=keys.KeyW=keys.KeyS=keys.ShiftLeft=0}
const JZ=document.getElementById('jz');
JZ.onpointerdown=e=>{e.preventDefault();pz=0;tm=1;jid=e.pointerId;JZ.setPointerCapture(jid);JS.style.left=(e.clientX-65)+'px';JS.style.top=(e.clientY-65)+'px';JS.style.bottom='auto';JS.style.opacity=1;jm(e)};
JZ.onpointermove=e=>{if(e.pointerId==jid)jm(e)};JZ.onpointerup=JZ.onpointercancel=()=>{jr();JS.style.opacity=.5};
const bp=document.getElementById('bp'),bj=document.getElementById('bj');
bp.onpointerdown=e=>{e.preventDefault();tm=1;mh=1;act()};bp.onpointerup=bp.onpointercancel=()=>mh=0;bj.onpointerdown=e=>{e.preventDefault();tm=1;keys.Space=1};bj.onpointerup=bj.onpointercancel=()=>keys.Space=0;
const bw=document.getElementById('bw');bw.onpointerdown=e=>{e.preventDefault();tm=1;sw(p.w^1)};
const kb=document.getElementById('kb');document.getElementById('kg').onpointerdown=e=>{e.preventDefault();tm=1;buy(0)};document.getElementById('ks').onpointerdown=e=>{e.preventDefault();tm=1;buy(1)};
function fitBtns(){const b=C.getBoundingClientRect(),k=b.width/VW,s=document.getElementById('pb').style,z=Math.max(26,18*k);s.left=(b.right-6*k-z)+'px';s.top=(b.top+6*k)+'px';s.right='auto';s.width=z+'px';s.height=z+'px';s.padding='0';s.fontSize=Math.max(10,9*k)+'px'}
addEventListener('resize',fitBtns);fitBtns();
build();reset();let last=performance.now();
(function loop(n){const dt=Math.min(.05,(n-last)/1000);last=n;if(on&&!pz)upd(dt);draw();requestAnimationFrame(loop)})(last);
