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
(function(){var A={halloween:[["\uD83E\uDD87","flap"],["\uD83D\uDD77\uFE0F","drop"],["\uD83D\uDC7B","drift"],["\uD83D\uDC08\u200D\u2B1B","peek"]],
thanksgiving:[["\uD83E\uDD83","strut"],["\uD83C\uDF42\uD83C\uDF41\uD83C\uDF42","cross"]],
christmas:[["\uD83C\uDF85\uD83D\uDEF7\uD83E\uDD8C\uD83E\uDD8C","cross"],["\u26C4\uD83D\uDC4B","wave"]]}[th];
function zones(){var w=document.querySelector(".wrap").getBoundingClientRect(),h=document.getElementById("hist"),hr=h.getBoundingClientRect(),L=(hr.right>0&&!b.classList.contains("hclosed"))?hr.right:0,z=[];
 if(w.left-L>=130)z.push([L+10,w.left-10]);if(innerWidth-w.right>=130)z.push([w.right+10,innerWidth-10]);return z}
function go(){if(innerWidth<1100||matchMedia("(prefers-reduced-motion: reduce)").matches||document.hidden)return;var z=zones();if(!z.length)return;
 var Z=z[Math.floor(Math.random()*z.length)],it=A[Math.floor(Math.random()*A.length)],e=document.createElement("div"),W=Z[1]-Z[0],k=it[1];
 e.className="amb "+k;e.setAttribute("aria-hidden","true");e.innerHTML=(k=="cross"||k=="flap"||k=="strut")?"<i>"+it[0]+"</i>":it[0];
 if(k=="cross"||k=="flap"||k=="strut"){e.style.left=Z[0]+"px";e.style.setProperty("--w",(W-60)+"px");e.style.top=(80+Math.random()*(innerHeight-200))+"px";e.style.maxWidth=W+"px";e.style.whiteSpace="nowrap";e.style.fontSize=(it[0].length>4?Math.min(36,W/5):40)+"px";e.classList.add("flip")}
 else{e.style.left=(Z[0]+Math.random()*Math.max(0,W-60))+"px";e.style.top=(k=="peek"?innerHeight-50:120+Math.random()*(innerHeight-300))+"px"}
 b.appendChild(e);setTimeout(function(){e.remove()},10000)}
var fast=/[?&]ambient=1/.test(location.search);
function next(){setTimeout(function(){go();next()},fast?3000:20000+Math.random()*20000)}
setTimeout(go,fast?800:8000);next();
var P={halloween:["Trick or Treat! \uD83C\uDF6C","Boo! \uD83D\uDC7B","Happy Haunting \uD83C\uDF83","Spooky Season \uD83E\uDD87","Eat, Drink & Be Scary \uD83E\uDDD9\u200D\u2640\uFE0F","Got Candy? \uD83C\uDF6D"],thanksgiving:["Gobble Gobble \uD83E\uDD83","Thankful \uD83C\uDF42","Pass the Pie \uD83E\uDD67"],christmas:["Ho Ho Ho \uD83C\uDF85","Merry & Bright \u2728","Let It Snow \u2744\uFE0F"]}[th];
function phrase(){if(innerWidth<1100||matchMedia("(prefers-reduced-motion: reduce)").matches||document.hidden)return;var z=zones();if(!z.length)return;
 var Z=z[Math.floor(Math.random()*z.length)],W=Z[1]-Z[0],e=document.createElement("div"),pw=Math.min(W-20,240);
 e.className="amb phr";e.setAttribute("aria-hidden","true");e.textContent=P[Math.floor(Math.random()*P.length)];
 e.style.width=pw+"px";e.style.left=(Z[0]+(W-pw)/2)+"px";e.style.top=(innerHeight-60)+"px";e.style.fontSize=Math.max(18,Math.min(28,pw/8))+"px";
 e.style.setProperty("--up",(innerHeight-120)+"px");e.style.setProperty("--r0",(Math.random()*16-8)+"deg");e.style.setProperty("--r1",(Math.random()*16-8)+"deg");e.style.setProperty("--t",(11+Math.random()*4)+"s");
 b.appendChild(e);setTimeout(function(){e.remove()},16000)}
function nextP(){setTimeout(function(){phrase();nextP()},fast?2500:10000+Math.random()*10000)}
setTimeout(phrase,fast?300:4000);nextP();})();


if(th==="halloween"){try{var key="introSeen",today=y+"-"+p.month+"-"+p.day,force=/[?&]intro=1/.test(location.search),noi=/[?&]intro=0/.test(location.search);
 if(!noi&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&(force||localStorage.getItem(key)!==today)){localStorage.setItem(key,today);
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
 h+='<div class="witch"><svg viewBox="0 0 160 120" width="100%"><line x1="6" y1="88" x2="128" y2="74" stroke="#7c4a1e" stroke-width="5" stroke-linecap="round"/><path d="M10 88 L-2 76 M10 88 L-4 86 M10 88 L-2 98 M12 88 L0 70 M12 88 L2 104" stroke="#d6a540" stroke-width="3" stroke-linecap="round"/><path class="cape" d="M58 40 Q40 60 22 66 Q34 72 26 82 Q46 80 54 86 L84 80 Q80 56 72 40Z" fill="#111"/><path d="M62 42 Q60 66 70 82 L92 78 Q90 56 80 42Z" fill="#1c1c1c"/><path d="M86 78 L100 90 L108 88" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M78 50 L104 68" stroke="#1c1c1c" stroke-width="6" stroke-linecap="round"/><circle cx="105" cy="69" r="4" fill="#4ade80"/><path d="M66 28 Q52 40 50 62 Q60 52 64 44Z" fill="#1a1110"/><ellipse cx="74" cy="30" rx="11" ry="12" fill="#4ade80"/><path d="M84 30 L92 34 L84 36Z" fill="#4ade80"/><circle cx="79" cy="27" r="1.6" fill="#111"/><path d="M62 22 Q74 26 90 22 L86 18 Q76 20 66 18Z" fill="#111"/><path d="M66 19 L72 -6 Q76 4 84 19Z" fill="#111"/></svg></div><div class="skip">'+((('ontouchstart' in window)||navigator.maxTouchPoints>0)?'\uD83D\uDC46 Tap anywhere to skip':'\uD83D\uDC46 Click anywhere to skip')+'</div>';
 ov2.innerHTML=h;b.appendChild(ov2);
 var wt=ov2.querySelector(".witch"),si=setInterval(function(){var r=wt.getBoundingClientRect();if(r.left<-60||r.left>W)return;var k=document.createElement("div");k.className="spk";k.textContent="\u2726";k.style.color=Math.random()<.5?"#10b981":"#facc15";k.style.textShadow="0 0 6px "+k.style.color;k.style.left=(r.left+4)+"px";k.style.top=(r.top+r.height*.7)+"px";ov2.appendChild(k)},90);
 var done=function(){clearInterval(si);if(ov2.parentNode)ov2.remove();document.removeEventListener("pointerdown",done,true)};
 document.addEventListener("pointerdown",done,true);setTimeout(done,6700)}}catch(e){}}
})();
