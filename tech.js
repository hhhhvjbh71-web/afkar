(function(){
var d=document,de=d.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* ---- boot sequence (once per session) ---- */
var el=d.createElement('div');
if(de.classList.contains('apl-boot')){
 var N=[[70,60,'التحكم بالدخول'],[410,60,'المراقبة'],[70,240,'الشبكات'],[410,240,'الأتمتة']];
 var svg='<svg class="b-net" viewBox="0 0 480 300" aria-hidden="true">'+N.map(function(n){return '<path d="M240 150 L'+n[0]+' '+n[1]+'"/>'}).join('')+N.map(function(n){return '<g><circle cx="'+n[0]+'" cy="'+n[1]+'" r="9"/><text x="'+n[0]+'" y="'+(n[1]+(n[1]<150?-20:30))+'">'+n[2]+'</text></g>'}).join('')+'</svg>';
 el.id='apl-boot';el.setAttribute('role','status');el.setAttribute('aria-label','جاري تحميل الموقع');
 el.innerHTML='<div class="b-door b-l"></div><div class="b-door b-r"></div><div class="b-core"><div class="b-stage">'+svg+'<div class="b-logo"><img src="logo.jpg" alt=""></div><i class="b-ring"></i></div><div class="b-status"><span class="b-pct">0%</span><span class="b-msg">تهيئة الأنظمة</span></div><div class="b-bar"><i></i></div></div>';
 d.body.appendChild(el);
 var g=el.querySelectorAll('.b-net g'),pct=el.querySelector('.b-pct'),msg=el.querySelector('.b-msg'),bar=el.querySelector('.b-bar i');
 var M=['تهيئة الأنظمة','ربط التحكم بالدخول','تشغيل المراقبة','فحص الشبكات','تفعيل الأتمتة','تم التحقق — أهلاً بك'];
 var t0=performance.now(),T=rm?500:2300,loaded=document.readyState==='complete',fin=false;
 addEventListener('load',function(){loaded=true});
 function end(){if(fin)return;fin=true;try{sessionStorage.setItem('apl','1')}catch(e){}
  el.classList.add('done');de.classList.remove('apl-boot');setTimeout(function(){el.remove()},1000)}
 el.addEventListener('click',end);
 (function tick(now){var p=Math.min((now-t0)/T,1);if(!loaded&&p>.9)p=.9;
  var v=Math.round(p*100);pct.textContent=v+'%';bar.style.width=v+'%';
  var k=Math.min(Math.floor(p*5),4);msg.textContent=p>=1?M[5]:M[k];
  g.forEach(function(n,i){n.classList.toggle('on',p>(i+1)*.2)});
  if(p>=1&&loaded)setTimeout(end,350);else if(!fin)requestAnimationFrame(tick)})(t0);
 setTimeout(end,6000);
}
/* ---- scroll progress ---- */
var pb=d.createElement('div');pb.id='apl-prog';d.body.appendChild(pb);
function sp(){var h=de.scrollHeight-innerHeight;pb.style.transform='scaleX('+(h>0?scrollY/h:0)+')'}
addEventListener('scroll',sp,{passive:true});sp();
/* ---- card spotlight + magnetic buttons ---- */
d.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.why-card');if(c){var r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}},{passive:true});
if(!rm&&matchMedia('(hover:hover)').matches)d.querySelectorAll('.btn').forEach(function(b){
 b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.12)+'px,'+((e.clientY-r.top-r.height/2)*.18)+'px)'});
 b.addEventListener('pointerleave',function(){b.style.transform=''})});
/* ---- service cards: attach a working visual ---- */
var VT=[[/access|intercom|gate/,'ring','<i></i><u></u>'],[/cctv|video|vehicle|gps|crosshair/,'scan','<i></i>'],[/fire|power|battery/,'pulse','<i></i>'],[/network|cabling|fiber|smart|integration|pabx|phone|sound|house/,'flow','<b></b><b></b><b></b><b></b>']];
d.querySelectorAll('a.why-card').forEach(function(c){
 var k=(c.getAttribute('href')||'')+' '+((c.querySelector('i')||{}).className||''),t=['bars','<b style="height:40%"></b><b style="height:80%"></b><b style="height:55%"></b><b style="height:95%"></b><b style="height:65%"></b>'];
 for(var n=0;n<VT.length;n++)if(VT[n][0].test(k)){t=[VT[n][1],VT[n][2]];break}
 var s=d.createElement('div');s.className='sv sv-'+t[0];s.setAttribute('aria-hidden','true');s.innerHTML=t[1];c.appendChild(s)});
/* ---- process steps become a lit timeline ---- */
d.querySelectorAll('.flow').forEach(function(f){
 var p=f.textContent.split('→').map(function(x){return x.trim()}).filter(Boolean);if(p.length<3)return;
 f.setAttribute('aria-label',p.join('، '));f.classList.add('tl');
 f.innerHTML=p.map(function(x,i){return (i?'<i class="fl-c" style="--i:'+i+'"></i>':'')+'<span class="fl-s" style="--i:'+i+'">'+x+'</span>'}).join('');
 new IntersectionObserver(function(es,o){if(es[0].isIntersecting){f.classList.add('on');o.disconnect()}},{threshold:.4}).observe(f)});
/* ---- showcase tabs + play only when visible ---- */
var tx=d.querySelector('.tx');
if(tx){
 var tabs=tx.querySelectorAll('[role=tab]'),panes=tx.querySelectorAll('.tx-pane');
 function sel(i){tabs.forEach(function(t,j){t.setAttribute('aria-selected',j===i);panes[j].classList.toggle('on',j===i)})}
 tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(i)});
  t.addEventListener('keydown',function(e){var n=e.key==='ArrowDown'||e.key==='ArrowLeft'?1:e.key==='ArrowUp'||e.key==='ArrowRight'?-1:0;if(n){var k=(i+n+tabs.length)%tabs.length;sel(k);tabs[k].focus();e.preventDefault()}})});
 new IntersectionObserver(function(es){tx.classList.toggle('live',es[0].isIntersecting)},{threshold:.15}).observe(tx);
}
})();
