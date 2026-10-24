addEventListener("pageshow",function(e){if(e.persisted)location.reload()});
(function(){
var tz="America/Chicago",b=document.body;
function parts(d){var o={};new Intl.DateTimeFormat("en-US",{timeZone:tz,year:"numeric",month:"numeric",day:"numeric"}).formatToParts(d).forEach(function(p){o[p.type]=+p.value});return o}
function thanksDay(y){var d=new Date(Date.UTC(y,10,1)).getUTCDay();return 1+((4-d+7)%7)+21}
var now=new Date(),p=parts(now),y=p.year,m=p.month,dd=p.day,th=null;
if(m===10)th="halloween";else if(m===11)th="thanksgiving";else if(m===12&&dd<=25)th="christmas";
var ov=(location.search.match(/[?&]theme=(\w+)/)||[])[1];
if(ov){th=/^(halloween|thanksgiving|christmas)$/.test(ov)?ov:null;
 if(th){m={halloween:10,thanksgiving:11,christmas:12}[th]; if((th==="halloween"&&p.month!==10)||(th==="thanksgiving"&&p.month!==11)||(th==="christmas"&&p.month!==12)){dd=1;if(p.month>m)y++;}}}
if(!th)return;
b.classList.add("theme-"+th);
var cfg={halloween:{day:31,off:"-05:00",to:"Halloween",hi:"Happy Halloween! \uD83C\uDF83",fx:["\uD83E\uDD87","\uD83D\uDC7B","\uD83C\uDF83","\uD83E\uDD87"],dir:"up"},
thanksgiving:{day:thanksDay(y),off:"-06:00",to:"Thanksgiving",hi:"Happy Thanksgiving! \uD83E\uDD83",after:"\uD83C\uDF42 Thankful for you! Thanks for a great year of teamwork. \uD83E\uDDE1",fx:["\uD83C\uDF42","\uD83C\uDF41","\uD83C\uDF42","\uD83E\uDD67"]},
christmas:{day:25,off:"-06:00",to:"Christmas",hi:"Merry Christmas! \uD83C\uDF84",fx:["\u2744","\u2745","\u2746","\u2744"]}}[th];
var mm=th==="halloween"?"10":th==="thanksgiving"?"11":"12";
var target=new Date(y+"-"+mm+"-"+(cfg.day<10?"0":"")+cfg.day+"T00:00:00"+cfg.off);
var cd=document.getElementById("cd");
if(th==="christmas"){var l=document.createElement("div");l.className="lights";cd.parentNode.insertBefore(l,cd)}
function pad(n){return (n<10?"0":"")+n}
function tick(){var cur=ov?null:parts(new Date());var dayNow=cur?cur.day:dd;
 if(dayNow===cfg.day){cd.innerHTML='<div class="big">'+cfg.hi+'</div>';return}
 if(dayNow>cfg.day&&cfg.after){cd.innerHTML='<div class="t">'+cfg.after+'</div>';return}
 var s=Math.max(0,Math.floor((target-new Date())/1000));
 if(ov&&s<=0){s=0}
 var D=Math.floor(s/86400),H=Math.floor(s%86400/3600),M=Math.floor(s%3600/60),S=s%60;
 cd.innerHTML='<div class="t">'+cfg.fx[2]+' Countdown to '+cfg.to+' '+cfg.fx[2]+'</div><div class="n"><div><b>'+D+'</b><small>days</small></div><div><b>'+pad(H)+'</b><small>hours</small></div><div><b>'+pad(M)+'</b><small>min</small></div><div><b>'+pad(S)+'</b><small>sec</small></div></div>'}
tick();setInterval(tick,1000);
var fx=document.createElement("div");fx.id="fx";fx.setAttribute("aria-hidden","true");
var n=innerWidth<700?8:16;
for(var i=0;i<n;i++){var s=document.createElement("span");s.textContent=cfg.fx[i%cfg.fx.length];
 s.style.left=(Math.random()*100)+"%";s.style.fontSize=(14+Math.random()*16)+"px";
 s.style.animationDuration=(10+Math.random()*12)+"s";s.style.animationDelay=(-Math.random()*20)+"s";
 s.style.setProperty("--dx",(Math.random()*120-60)+"px");s.style.setProperty("--r",(Math.random()*720-360)+"deg");fx.appendChild(s)}
b.insertBefore(fx,b.firstChild);
(function(){var A={halloween:[["\uD83E\uDD87","flap"],["\uD83D\uDD77\uFE0F","drop"],["\uD83D\uDC7B","drift"],["\uD83D\uDC08\u200D\u2B1B","peek"],["\uD83C\uDF6C","drift"],["\uD83C\uDF6D","drift"]],
thanksgiving:[["\uD83E\uDD83","strut"],["\uD83E\uDD83","strut"],["\uD83C\uDF41","drift"],["\uD83C\uDF42\uD83C\uDF41\uD83C\uDF42","cross"]],
christmas:[["\uD83C\uDF85\uD83D\uDEF7\uD83E\uDD8C\uD83E\uDD8C","cross"],["\uD83C\uDF85\uD83D\uDEF7\uD83E\uDD8C\uD83E\uDD8C","cross"],["\uD83C\uDF81","drift"],["\u26C4\uD83D\uDC4B","wave"]]}[th];
function zones(){var w=document.querySelector(".wrap").getBoundingClientRect(),h=document.getElementById("hist"),hr=h.getBoundingClientRect(),L=(hr.right>0&&!b.classList.contains("hclosed"))?hr.right:0,z=[];
 if(w.left-L>=130)z.push([L+10,w.left-10]);if(innerWidth-w.right>=130)z.push([w.right+10,innerWidth-10]);return z}
function go(ro){if(innerWidth<1100||matchMedia("(prefers-reduced-motion: reduce)").matches||document.hidden)return;var z=zones();if(ro)z=z.filter(function(q){return q[0]>innerWidth/2});if(!z.length)return;
 var Z=z[Math.floor(Math.random()*z.length)],it=A[Math.floor(Math.random()*A.length)],e=document.createElement("div"),W=Z[1]-Z[0],k=it[1];
 e.className="amb "+k;e.setAttribute("aria-hidden","true");e.innerHTML=(k=="cross"||k=="flap"||k=="strut")?"<i>"+it[0]+"</i>":it[0];
 if(k=="cross"||k=="flap"||k=="strut"){e.style.left=Z[0]+"px";e.style.setProperty("--w",(W-60)+"px");e.style.top=(80+Math.random()*(innerHeight-200))+"px";e.style.maxWidth=W+"px";e.style.whiteSpace="nowrap";e.style.fontSize=(it[0].length>4?Math.min(36,W/5):40)+"px";e.classList.add("flip")}
 else{e.style.left=(Z[0]+Math.random()*Math.max(0,W-60))+"px";e.style.top=(k=="peek"?innerHeight-50:120+Math.random()*(innerHeight-300))+"px"}
 b.appendChild(e);setTimeout(function(){e.remove()},10000)}
var fast=/[?&]ambient=1/.test(location.search);
function next(){setTimeout(function(){go();next()},fast?3000:20000+Math.random()*20000)}
setTimeout(go,fast?800:8000);next();
function RZ(){var z=zones().filter(function(q){return q[0]>innerWidth/2});return z[0]}
var rd=document.createElement("div");rd.id="rdeco";rd.setAttribute("aria-hidden","true");
rd.innerHTML={halloween:'<div class="moon"></div><div class="mbat b1">\uD83E\uDD87</div><div class="mbat b2">\uD83E\uDD87</div><svg class="web" viewBox="0 0 120 120"><g stroke="rgba(255,255,255,.55)" fill="none" stroke-width="1"><path d="M120 0L0 120M120 0L30 120M120 0L0 30M120 0L70 120M120 0L0 70"/><path d="M95 0Q100 20 120 25M70 0Q78 40 120 50M45 0Q55 60 120 75M20 0Q32 82 120 100"/></g></svg><div class="wsp">\uD83D\uDD77\uFE0F</div>',
 thanksgiving:'<div class="tree">\uD83C\uDF33</div><div class="tl l1">\uD83C\uDF42</div><div class="tl l2">\uD83C\uDF41</div><div class="tl l3">\uD83C\uDF42</div><div class="pump">\uD83C\uDF83\uD83C\uDF3D\uD83E\uDD67</div>',
 christmas:'<div class="lights rl"></div><div class="xtree">\uD83C\uDF84</div><div class="gifts">\uD83C\uDF81\uD83C\uDF81\uD83E\uDDE6</div><div class="star">\u2B50</div>'}[th];
b.appendChild(rd);
function place(){var Z=RZ();if(!Z||innerWidth<1100){rd.style.display="none";return}rd.style.display="block";rd.style.left=Z[0]+"px";rd.style.width=(Z[1]-Z[0])+"px"}
place();addEventListener("resize",place);setInterval(place,1500);
var WS='<svg viewBox="0 0 160 120" width="100%"><line x1="6" y1="88" x2="128" y2="74" stroke="#7c4a1e" stroke-width="5" stroke-linecap="round"/><path d="M10 88 L-2 76 M10 88 L-4 86 M10 88 L-2 98 M12 88 L0 70 M12 88 L2 104" stroke="#d6a540" stroke-width="3" stroke-linecap="round"/><path class="cape" d="M58 40 Q40 60 22 66 Q34 72 26 82 Q46 80 54 86 L84 80 Q80 56 72 40Z" fill="#111"/><path d="M62 42 Q60 66 70 82 L92 78 Q90 56 80 42Z" fill="#1c1c1c"/><path d="M86 78 L100 90 L108 88" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M78 50 L104 68" stroke="#1c1c1c" stroke-width="6" stroke-linecap="round"/><circle cx="105" cy="69" r="4" fill="#4ade80"/><path d="M66 28 Q52 40 50 62 Q60 52 64 44Z" fill="#1a1110"/><ellipse cx="74" cy="30" rx="11" ry="12" fill="#4ade80"/><path d="M84 30 L92 34 L84 36Z" fill="#4ade80"/><circle cx="79" cy="27" r="1.6" fill="#111"/><path d="M62 22 Q74 26 90 22 L86 18 Q76 20 66 18Z" fill="#111"/><path d="M66 19 L72 -6 Q76 4 84 19Z" fill="#111"/></svg>';
var WZ=function(sd){var w=document.querySelector(".wrap").getBoundingClientRect(),x0,x1;if(sd==="L"){var h=document.getElementById("hist").getBoundingClientRect();x0=(h.right>0&&!b.classList.contains("hclosed"))?h.right+12:8;x1=w.left-12}else{x0=w.right+12;x1=innerWidth-8}return x1-x0>=110?[x0,x1]:null};
var Wk={st:"hover",t0:performance.now(),el:null,spot:null,lf:Date.now(),lsp:0,pos:null,mv:null,w:140};window.__witch=Wk;
var RM=matchMedia("(prefers-reduced-motion: reduce)");
function wOK(){return th==="halloween"&&!document.hidden&&(innerWidth>=1100||Wk.st==="intro")}
function obst(){var r=[],q=function(el){if(!el)return;var x=el.getBoundingClientRect();if(x.width&&x.height&&x.right>0&&x.left<innerWidth&&getComputedStyle(el).display!=="none")r.push(x)};
 q(document.querySelector(".wrap"));var h=document.getElementById("hist");if(!b.classList.contains("hclosed"))q(h);q(document.getElementById("htog"));if(GW.el&&GW.st==="sit")q(GW.el);return r}
function clearAt(x,y,w,O){var hh=w*.75,p=26;if(x<4||y<4||x+w>innerWidth-4||y+hh>innerHeight-4)return false;for(var i=0;i<O.length;i++){var o=O[i];if(x-p<o.right&&x+w+p>o.left&&y-p<o.bottom&&y+hh+p>o.top)return false}return true}
function rightSpot(){var Z=WZ("R")||WZ("L");if(!Z)return null;var w=Math.min(140,(Z[1]-Z[0])*.6);return{x:Z[0]+(Z[1]-Z[0]-w)/2,y:innerHeight*.42,w:w,home:1}}
function randSpot(){var O=obst(),w=Math.min(140,Wk.w||140);for(var i=0;i<60;i++){var x=Math.random()*(innerWidth-w),y=Math.random()*(innerHeight-w);if(clearAt(x,y,w,O)&&(!Wk.spot||Math.hypot(x-Wk.spot.x,y-Wk.spot.y)>200))return{x:x,y:y,w:w}}
 var Z=Wk.spot&&Wk.spot.x>innerWidth/2?WZ("L"):WZ("R");if(Z){w=Math.min(140,(Z[1]-Z[0])*.6);return{x:Z[0]+(Z[1]-Z[0]-w)/2,y:innerHeight*(.2+Math.random()*.4),w:w}}return rightSpot()}
function wEl(){if(!Wk.el||!Wk.el.isConnected){document.querySelectorAll(".awitch").forEach(function(x){x.remove()});var e=Wk.el=document.createElement("div");e.className="amb awitch";e.setAttribute("aria-hidden","true");e.innerHTML=WS;b.appendChild(e);
 e.addEventListener("click",function(){if(Wk.st!=="hover"||!Wk.pos)return;var S=randSpot();if(!S)return;Wk.mv={from:Wk.pos.slice(),fw:Wk.w};if(!Wk.said){Wk.said=1;Wk.talkT=performance.now()}Wk.spot=S;Wk.st="boom";Wk.t0=performance.now()})}return Wk.el}
function ease(k){return k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2}
function spark(x,y){var sp=document.createElement("div");sp.className="amb wspk";if(Wk.st==="intro")sp.style.zIndex=56,sp.style.display="block";sp.textContent="\u2726";var c=Math.random()<.5?"#10b981":"#facc15";sp.style.color=c;sp.style.textShadow="0 0 6px "+c;sp.style.left=x+"px";sp.style.top=y+"px";b.appendChild(sp);setTimeout(function(){sp.remove()},1300)}
Wk.intro=function(){Wk.st="intro";Wk.t0=performance.now()+600;Wk.lf=Date.now();wEl().classList.add("intro-on")};
Wk.settle=function(){if(Wk.st!=="intro")return;if(Wk.el)Wk.el.classList.remove("intro-on");if(innerWidth>=1100){Wk.spot=rightSpot();Wk.st="hover";Wk.t0=performance.now()}else{Wk.st="gone";if(Wk.el)Wk.el.style.display="none"}};
function wTalk(now,pos,w){var d=Wk.talkEl;if(!Wk.talkT){if(d)d.style.opacity=0;return}if(!d||!d.isConnected){d=Wk.talkEl=document.createElement("div");d.className="gws wtalk";d.textContent="Defying gravity \u2728";b.appendChild(d)}var t=(now-Wk.talkT)/1000;d.style.opacity=t<.3?t/.3:t<2.6?1:Math.max(0,1-(t-2.6)/.5);d.style.left=Math.max(6,Math.min(innerWidth-190,pos[0]+w/2-60))+"px";d.style.top=Math.max(6,pos[1]-w*.4-46)+"px";if(t>3.2){Wk.talkT=0;d.style.opacity=0}}
function wTick(now){requestAnimationFrame(wTick);Wk.lf=Date.now();try{
 var el=wEl();if(!wOK()){el.style.display="none";return}
 if(Wk.st==="gone"){el.style.display="none";if(innerWidth>=1100){Wk.st="hover";Wk.spot=null}return}
 var pos,fl=false,w,H=innerHeight,iw=innerWidth;
 if(Wk.st==="intro"){var k=(now-Wk.t0)/4200;w=Math.min(150,iw*.26);if(k<0){el.style.display="none";return}
  var T=iw>=1100?(Wk.spot=rightSpot()):null,tx=T?T.x:iw+40,ty=T?T.y:H*.2;if(T)w=T.w;
  var u=Math.min(1,k),v=1-u;pos=[v*v*(-w-20)+2*v*u*(iw*.5)+u*u*tx,v*v*(H*.3)+2*v*u*(H*.08)+u*u*ty];
  if(now-Wk.lsp>80){Wk.lsp=now;spark(pos[0],pos[1]+w*.2)}
  if(k>=1){Wk.settle();return}}
 else{if(!Wk.spot||(Wk.st==="hover"&&Wk.spot.home&&Math.abs(Wk.spot.x-((rightSpot()||Wk.spot).x))>2))Wk.spot=rightSpot();
  if(Wk.st==="hover"&&Wk.spot&&!Wk.spot.home&&!clearAt(Wk.spot.x,Wk.spot.y,Wk.spot.w,obst()))Wk.spot=rightSpot();
  var S=Wk.spot;if(!S){el.style.display="none";return}w=S.w;
  if(Wk.st==="boom"){var k2=Math.min(1,(now-Wk.t0)/1000),e2=ease(k2),m=Wk.mv;w=m.fw+(S.w-m.fw)*k2;pos=[m.from[0]+(S.x-m.from[0])*e2,m.from[1]+(S.y-m.from[1])*e2-Math.sin(k2*Math.PI)*60];fl=S.x<m.from[0];
   if(!RM.matches&&now-Wk.lsp>16){Wk.lsp=now;for(var i=0;i<2;i++)spark(pos[0]+(fl?w:0)+Math.random()*20-10,pos[1]+w*.15+Math.random()*24-12)}
   if(k2>=1){Wk.st="hover";Wk.t0=now}}
  else{Wk.st="hover";var t=(now-Wk.t0)/1000;if(RM.matches){pos=[S.x,S.y];fl=S.x>iw/2}else{pos=[S.x+Math.sin(t*.5)*14,S.y+Math.sin(t*1.3)*8];fl=Math.cos(t*.5)<0;if(now-Wk.lsp>260){Wk.lsp=now;spark(pos[0]+(fl?w:0),pos[1]+w*.15)}}}}
 el.style.display="block";Wk.pos=pos;Wk.w=w;wTalk(now,pos,w);el.style.width=w+"px";el.style.pointerEvents=Wk.st==="hover"?"auto":"none";
 el.style.transform="translate("+pos[0]+"px,"+(pos[1]-w*.4)+"px)"+(Wk.st==="hover"&&!RM.matches?" rotate("+(Math.sin((now-Wk.t0)/700)*3)+"deg)":"")+(fl?" scaleX(-1)":"");
}catch(e){Wk.st="hover";Wk.spot=null;Wk.t0=performance.now()}}
var GWS='<svg viewBox="0 0 120 170" width="100%"><defs><linearGradient id="gwg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9a8d4"/><stop offset="1" stop-color="#db2777"/></linearGradient></defs>'
+'<path d="M60 70 L18 166 Q60 176 102 166Z" fill="url(#gwg)" stroke="#be185d" stroke-width="1.5"/><path d="M30 140q30 10 60 0M24 155q36 12 72 0" stroke="#fbcfe8" stroke-width="2" fill="none"/>'
+'<path d="M48 58 L72 58 L68 80 L52 80Z" fill="#f472b6"/><path d="M47 60 Q38 64 34 76 M73 60 Q84 62 92 48" stroke="#fcd9c4" stroke-width="6" stroke-linecap="round" fill="none"/>'
+'<line x1="92" y1="48" x2="104" y2="20" stroke="#e5e7eb" stroke-width="2.5"/><path class="gwstar" d="M104 10l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#fde047" stroke="#f59e0b"/>'
+'<circle cx="60" cy="42" r="13" fill="#fcd9c4"/><circle cx="55" cy="41" r="1.5" fill="#1e293b"/><circle cx="65" cy="41" r="1.5" fill="#1e293b"/><path d="M56 48q4 3 8 0" stroke="#be185d" stroke-width="1.5" fill="none"/>'
+'<g fill="#fde68a" stroke="#eab308" stroke-width="1"><circle cx="46" cy="38" r="6"/><circle cx="44" cy="49" r="6"/><circle cx="47" cy="59" r="5"/><circle cx="74" cy="38" r="6"/><circle cx="76" cy="49" r="6"/><circle cx="73" cy="59" r="5"/><circle cx="52" cy="30" r="6"/><circle cx="68" cy="30" r="6"/><circle cx="60" cy="28" r="6"/></g>'
+'<path d="M46 26 L48 4 L53 18 L60 0 L67 18 L72 4 L74 26Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.2"/><circle cx="60" cy="16" r="2.5" fill="#f472b6"/>'
+'<g fill="#fff"><circle cx="40" cy="120" r="1.4"/><circle cx="70" cy="110" r="1.4"/><circle cx="55" cy="140" r="1.4"/><circle cx="84" cy="135" r="1.4"/><circle cx="35" cy="155" r="1.4"/></g></svg>';
var GW={st:"sit",t0:performance.now(),el:null,back:0};window.__gw=GW;
function gwSpot(){var Z=WZ("R"),L=WZ("L"),gw=110;var z=Z||L;if(!z)return null;gw=Math.min(110,(z[1]-z[0])*.6);return{x:z[0]+12,y:innerHeight-gw*1.42-6,w:gw}}
function gwEl(){if(!GW.el||!GW.el.isConnected){var e=GW.el=document.createElement("div");e.className="amb gwitch";e.setAttribute("aria-hidden","true");e.innerHTML='<div class="gwb"></div><div class="gws">Galinda \u2728</div>'+GWS;b.appendChild(e);
 e.addEventListener("click",function(){if(GW.st!=="sit")return;GW.talk=!GW.said;GW.said=1;GW.st="grow";GW.t0=performance.now()})}return GW.el}
function gwTick(now){requestAnimationFrame(gwTick);try{var e=gwEl();if(th!=="halloween"||innerWidth<1100||document.hidden){e.style.display="none";return}
 var S=gwSpot();if(!S){e.style.display="none";return}e.style.display="block";e.style.width=S.w+"px";var bub=e.firstChild,t=(now-GW.t0)/1000,y=S.y,x=S.x,rot=0,bs=0,rm=RM.matches;
 if(GW.st==="sit"){rot=rm?0:Math.sin(now/900)*3;if(!rm&&Math.random()<.006){var r=e.getBoundingClientRect();spark(r.left+r.width*.87,r.top+r.height*.06)}}
 else if(GW.st==="grow"){bs=Math.min(1,t/1.2);if(t>=1.2){GW.st="rise";GW.t0=now}}
 else if(GW.st==="rise"){bs=1;var k=Math.min(1,t/(rm?1:6));y=S.y-(S.y+S.w*2)*k*k;x=S.x+(rm?0:Math.sin(t*1.2)*18);if(k>=1){GW.st="away";GW.t0=now;GW.back=30+Math.random()*30}}
 else if(GW.st==="away"){e.style.display="none";if(t>=GW.back){GW.st="down";GW.t0=now}return}
 else if(GW.st==="down"){bs=1;var k3=Math.min(1,t/(rm?1:6)),q=1-k3;y=S.y-(S.y+S.w*2)*q*q;x=S.x+(rm?0:Math.sin(t*1.2)*18);if(k3>=1){GW.st="pop";GW.t0=now}}
 else if(GW.st==="pop"){bs=1+t*1.2;bub.style.opacity=Math.max(0,1-t/.4);if(t>=.4){GW.st="sit";GW.t0=now}}
 var sb=e.querySelector('.gws'),so=GW.st==='grow'?Math.min(1,t/.4):GW.st==='rise'?Math.max(0,Math.min(1,3-t)):0;sb.style.opacity=GW.talk?so:0;if(GW.st!=="pop")bub.style.opacity=bs?1:0;bub.style.transform="translate(-50%,-50%) scale("+bs+")";
 e.style.pointerEvents=GW.st==="sit"?"auto":"none";e.style.transform="translate("+x+"px,"+y+"px) rotate("+rot+"deg)";
}catch(err){GW.st="sit"}}
if(th==="halloween"){requestAnimationFrame(wTick);requestAnimationFrame(gwTick);
 setInterval(function(){if(document.hidden)return;if(Date.now()-Wk.lf>30000||!Wk.el||!Wk.el.isConnected){Wk.el=null;Wk.st="hover";Wk.spot=null;Wk.t0=performance.now();requestAnimationFrame(wTick)}},5000)}
(function nr(){setTimeout(function(){go(1);if(Math.random()<.35)setTimeout(function(){go(1)},1500);nr()},fast?2000:6000+Math.random()*6000)})();

var P={halloween:["Trick or Treat! \uD83C\uDF6C","Boo! \uD83D\uDC7B","Happy Haunting \uD83C\uDF83","Spooky Season \uD83E\uDD87","Eat, Drink & Be Scary \uD83E\uDDD9\u200D\u2640\uFE0F","Got Candy? \uD83C\uDF6D"],thanksgiving:["Gobble Gobble \uD83E\uDD83","Thankful \uD83C\uDF42","Pass the Pie \uD83E\uDD67"],christmas:["Ho Ho Ho \uD83C\uDF85","Merry & Bright \u2728","Let It Snow \u2744\uFE0F"]}[th];
function phrase(){if(innerWidth<1100||matchMedia("(prefers-reduced-motion: reduce)").matches||document.hidden)return;var z=zones();if(!z.length)return;
 var Z=z[Math.floor(Math.random()*z.length)],W=Z[1]-Z[0],e=document.createElement("div"),pw=Math.min(W-20,240);
 e.className="amb phr";e.setAttribute("aria-hidden","true");e.textContent=P[Math.floor(Math.random()*P.length)];
 e.style.width=pw+"px";e.style.left=(Z[0]+(W-pw)/2)+"px";e.style.top=(innerHeight-60)+"px";e.style.fontSize=Math.max(18,Math.min(28,pw/8))+"px";
 e.style.setProperty("--up",(innerHeight-120)+"px");e.style.setProperty("--r0",(Math.random()*16-8)+"deg");e.style.setProperty("--r1",(Math.random()*16-8)+"deg");e.style.setProperty("--t",(11+Math.random()*4)+"s");
 b.appendChild(e);setTimeout(function(){e.remove()},16000)}
function nextP(){setTimeout(function(){phrase();nextP()},fast?2500:10000+Math.random()*10000)}
setTimeout(phrase,fast?300:4000);nextP();})();


(function(){if(th!=="halloween"||location.pathname.indexOf("kristin")<0)return;var h1=document.querySelector("h1");if(!h1)return;
var m=document.createElement("span");m.className="monkey";m.setAttribute("aria-hidden","true");m.title="";
m.innerHTML='<svg viewBox="0 0 120 110" width="100%"><g class="wl"><path d="M44 52 Q10 20 2 40 Q14 44 6 54 Q20 54 12 64 Q30 62 42 62Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/><path d="M40 56 Q20 46 10 50M40 59 Q24 56 14 60" stroke="#475569" fill="none"/></g><g class="wr"><path d="M76 52 Q110 20 118 40 Q106 44 114 54 Q100 54 108 64 Q90 62 78 62Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/><path d="M80 56 Q100 46 110 50M80 59 Q96 56 106 60" stroke="#475569" fill="none"/></g>'
+'<path d="M84 92 Q104 96 100 76" stroke="#2563eb" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="60" cy="74" rx="20" ry="24" fill="#2563eb"/><path d="M44 62 L60 86 L76 62 L72 96 L48 96Z" fill="#b91c1c"/><circle cx="60" cy="76" r="2" fill="#facc15"/><circle cx="60" cy="86" r="2" fill="#facc15"/>'
+'<ellipse cx="52" cy="100" rx="8" ry="5" fill="#2563eb"/><ellipse cx="68" cy="100" rx="8" ry="5" fill="#2563eb"/>'
+'<g class="al"><path d="M44 66 Q34 78 50 80" stroke="#2563eb" stroke-width="7" fill="none" stroke-linecap="round"/></g><g class="ar"><path d="M76 66 Q86 78 70 80" stroke="#2563eb" stroke-width="7" fill="none" stroke-linecap="round"/></g>'
+'<circle cx="40" cy="34" r="8" fill="#2563eb"/><circle cx="80" cy="34" r="8" fill="#2563eb"/><circle cx="40" cy="34" r="4" fill="#bfdbfe"/><circle cx="80" cy="34" r="4" fill="#bfdbfe"/>'
+'<circle cx="60" cy="36" r="19" fill="#2563eb"/><ellipse cx="60" cy="41" rx="13" ry="12" fill="#bfdbfe"/><circle cx="54" cy="35" r="2.6" fill="#111"/><circle cx="66" cy="35" r="2.6" fill="#111"/><path d="M54 46 Q60 50 66 46" stroke="#1e3a8a" stroke-width="2" fill="none"/>'
+'<path d="M50 20 L52 10 L68 10 L70 20Z" fill="#b91c1c"/><rect x="49" y="18" width="22" height="3" fill="#facc15"/></svg>';
h1.appendChild(m);var busy=0;
m.addEventListener("click",function(){if(busy)return;busy=1;var rm=matchMedia("(prefers-reduced-motion: reduce)").matches,r=m.getBoundingClientRect(),f=m.cloneNode(true);
 f.style.cssText="position:fixed;left:"+r.left+"px;top:"+r.top+"px;width:"+r.width+"px;margin:0;z-index:70;transform-origin:50% 50%";document.body.appendChild(f);m.style.visibility="hidden";
 var sc=Math.min(10,innerWidth*.8/r.width,innerHeight*.8/r.height),dx=innerWidth/2-(r.left+r.width/2),dy=innerHeight/2-(r.top+r.height/2),C="translate("+dx+"px,"+dy+"px) scale("+sc+")";
 f.animate([{transform:"none"},{transform:C}],{duration:rm?1:800,easing:"cubic-bezier(.3,1.3,.5,1)",fill:"forwards"});
 setTimeout(function(){f.classList.add("wings")},rm?0:900);
 setTimeout(function(){f.classList.add("bang")},rm?0:1600);
 setTimeout(function(){f.classList.remove("bang");f.classList.add("flying");f.animate([{transform:C},{transform:"translate("+(dx+60)+"px,"+(dy-30)+"px) scale("+sc*.8+") rotate(360deg)"},{transform:"translate("+(innerWidth*.9)+"px,"+(-innerHeight)+"px) scale("+sc*.3+") rotate(720deg)"}],{duration:rm?300:2200,easing:"ease-in",fill:"forwards"}).onfinish=function(){f.remove()}},rm?400:3600);
 setTimeout(function(){var r2=m.getBoundingClientRect(),g=m.cloneNode(true);g.classList.add("flying","wings");g.style.cssText="position:fixed;left:"+r2.left+"px;top:"+r2.top+"px;width:"+r2.width+"px;margin:0;z-index:60;visibility:visible";document.body.appendChild(g);
  g.animate([{transform:"translate("+(innerWidth-r2.left+80)+"px,"+(-r2.top-120)+"px)"},{transform:"translate(0,0)"}],{duration:rm?300:2400,easing:"ease-out",fill:"forwards"}).onfinish=function(){g.remove();m.style.visibility="";m.classList.remove("wings");busy=0}},60000)});
})();

if(th==="halloween"){try{var key="introSeen",today=y+"-"+p.month+"-"+p.day,force=/[?&]intro=1/.test(location.search),noi=/[?&]intro=0/.test(location.search);
 if(!noi&&!matchMedia("(prefers-reduced-motion: reduce)").matches){try{localStorage.removeItem(key)}catch(e){}
 var ov2=document.createElement("div");ov2.id="intro";ov2.setAttribute("aria-hidden","true");
 var W=innerWidth,H=innerHeight,h='';
 var nm=(document.title.indexOf("Callie")>-1||location.pathname.indexOf("kristin")<0)?"Callie":"Kristin";
 [[.12,.3,"Boo! \uD83D\uDC4B"],[.86,.26,"Happy haunting! \uD83D\uDC4B"]].forEach(function(a,i){h+='<div class="sp" style="left:'+(a[0]*100)+'%;--y:'+Math.round(a[1]*H)+'px;animation-delay:'+(i*.3)+'s">\uD83D\uDD77\uFE0F<div class="wave">'+a[2]+'</div></div>'});
 h+='<div class="pk"><svg viewBox="0 0 200 190"><defs><radialGradient id="pg" cx="45%" cy="40%"><stop offset="0" stop-color="#fdba74"/><stop offset=".6" stop-color="#f97316"/><stop offset="1" stop-color="#c2410c"/></radialGradient><radialGradient id="gl"><stop offset="0" stop-color="#fef08a"/><stop offset="1" stop-color="#f59e0b"/></radialGradient></defs><path d="M96 34c-4-14 0-26 10-32l8 5c-8 6-9 15-7 27z" fill="#15803d"/><ellipse cx="60" cy="110" rx="52" ry="70" fill="url(#pg)"/><ellipse cx="140" cy="110" rx="52" ry="70" fill="url(#pg)"/><ellipse cx="100" cy="110" rx="48" ry="76" fill="url(#pg)" stroke="#c2410c" stroke-width="2"/><path d="M58 50q-14 60 0 120M142 50q14 60 0 120" stroke="#c2410c" stroke-width="2" fill="none"/><g class="fl" fill="url(#gl)" stroke="#7c2d12" stroke-width="2"><path d="M50 92l26-4-10 26z"/><path d="M150 92l-26-4 10 26z"/><path d="M100 108l10 18h-20z"/><path d="M42 132q58 34 116 0l-6 22q-10 8-20 0l-8 12-10-10-14 10-10-12-10 10-8-12q-12 8-22-2z"/></g></svg></div>';
 h+='<div class="hig">Hi '+nm+'! \uD83D\uDC4B</div>';
 setTimeout(function(){if(!ov2.parentNode)return;var C=["#f97316","#fb923c","#a855f7","#7e22ce","#111","#22c55e","#facc15"],E=["\uD83C\uDF6C","\uD83E\uDD87","\u2728"],sc=Math.min(1,innerWidth/800);
  for(var i=0;i<90;i++){var d=document.createElement("div");d.className="cf";var em=i%9===0;
   if(em){d.textContent=E[i%3];d.style.fontSize="20px"}else{d.style.width=(6+Math.random()*8)+"px";d.style.height=(4+Math.random()*6)+"px";d.style.background=C[i%C.length]}
   ov2.appendChild(d);var an=Math.random()*Math.PI*2,v=(220+Math.random()*380)*sc,dx=Math.cos(an)*v,dy=Math.sin(an)*v,r=Math.random()*720;
   d.animate([{transform:"translate(-50%,-50%)",opacity:1},{transform:"translate("+dx*.7+"px,"+dy*.7+"px) rotate("+r/2+"deg)",opacity:1,offset:.45},{transform:"translate("+dx+"px,"+(dy+260*sc)+"px) rotate("+r+"deg)",opacity:0}],{duration:1800+Math.random()*900,easing:"cubic-bezier(.15,.7,.4,1)",fill:"forwards"})}},2600);
h+='<div class="cr">\uD83D\uDD77\uFE0F</div><div class="cr" style="bottom:4%;animation-delay:.8s;left:-40px">\uD83D\uDD77\uFE0F</div>';
 h+='<div class="skip">'+((('ontouchstart' in window)||navigator.maxTouchPoints>0)?'\uD83D\uDC46 Tap anywhere to skip':'\uD83D\uDC46 Click anywhere to skip')+'</div>';
 ov2.innerHTML=h;b.appendChild(ov2);
 var si=0;if(window.__witch)window.__witch.intro();(function(){return;var k=document.createElement("div");k.className="spk";k.textContent="\u2726";k.style.color=Math.random()<.5?"#10b981":"#facc15";k.style.textShadow="0 0 6px "+k.style.color;k.style.left=(r.left+4)+"px";k.style.top=(r.top+r.height*.7)+"px";ov2.appendChild(k)})();
 var done=function(){if(window.__witch)window.__witch.settle();if(ov2.parentNode)ov2.remove();document.removeEventListener("pointerdown",done,true)};
 document.addEventListener("pointerdown",done,true);setTimeout(done,6700)}}catch(e){}}
})();
