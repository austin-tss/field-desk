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
setTimeout(go,fast?800:8000);next();})();

if(th==="halloween"){try{var key="introSeen",today=y+"-"+p.month+"-"+p.day,force=/[?&]intro=1/.test(location.search);
 if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&(force||localStorage.getItem(key)!==today)){localStorage.setItem(key,today);
 var ov2=document.createElement("div");ov2.id="intro";ov2.setAttribute("aria-hidden","true");
 var W=innerWidth,H=innerHeight,h='';
 [[.15,.35,"Boo! \uD83D\uDC4B"],[.5,.5,"Hi Kristin & Callie! \uD83D\uDC4B"],[.82,.28,"Happy haunting! \uD83D\uDC4B"]].forEach(function(a,i){h+='<div class="sp'+(i===1?' big':'')+'" style="left:'+(a[0]*100)+'%;--y:'+Math.round(a[1]*H)+'px;animation-delay:'+(i*.25)+'s">\uD83D\uDD77\uFE0F<div class="wave">'+(i===1?(document.title.indexOf("Callie")>-1||location.pathname.indexOf("kristin")<0?"Hi Callie! \uD83D\uDC4B":"Hi Kristin! \uD83D\uDC4B"):a[2])+'</div></div>'});
 h+='<div class="cr">\uD83D\uDD77\uFE0F</div><div class="cr" style="bottom:4%;animation-delay:.8s;left:-40px">\uD83D\uDD77\uFE0F</div>';
 h+='<div class="witch">\uD83E\uDDD9\u200D\u2640\uFE0F</div><div class="skip">Tap anywhere to skip</div>';
 ov2.innerHTML=h;b.appendChild(ov2);
 var wt=ov2.querySelector(".witch"),si=setInterval(function(){var r=wt.getBoundingClientRect();if(r.left<-60||r.left>W)return;var k=document.createElement("div");k.className="spk";k.textContent=Math.random()<.5?"\u2728":"\u2B50";k.style.left=(r.left+50)+"px";k.style.top=(r.top+40)+"px";ov2.appendChild(k)},90);
 var done=function(){clearInterval(si);if(ov2.parentNode)ov2.remove();document.removeEventListener("pointerdown",done,true)};
 document.addEventListener("pointerdown",done,true);setTimeout(done,5600)}}catch(e){}}
})();
