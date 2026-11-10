'use strict';
(()=>{
 const root=document.documentElement,loader=document.getElementById('loader'),word=document.getElementById('loader-word'),skip=document.getElementById('skip-opening'),replay=document.getElementById('replay-intro'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const greetings=['Hello','Bonjour','स्वागत हे','Ciao','Olá','おい','Hallå','Guten tag','你好'];let timers=[],running=false;
 const later=(fn,ms)=>timers.push(setTimeout(fn,ms));
 function clear(){timers.forEach(clearTimeout);timers=[];clearTimeout(window.openingFallback)}
 function finish(){clear();running=false;root.classList.remove('opening','opening-exit');loader.setAttribute('aria-hidden','true');skip.tabIndex=-1}
 function exit(){if(!running||root.classList.contains('opening-exit'))return;clear();root.classList.add('opening-exit');skip.tabIndex=-1;later(finish,1750)}
 function start(isReplay=false){finish();if(reduced.matches)return;running=true;if(isReplay)scrollTo({top:0,behavior:'instant'});word.textContent=greetings[0];loader.setAttribute('aria-hidden','false');skip.tabIndex=0;root.classList.add('opening');for(let i=1;i<greetings.length;i++)later(()=>word.textContent=greetings[i],900+(i-1)*150);later(exit,2350);later(finish,4800)}
 skip.addEventListener('click',exit);replay.addEventListener('click',()=>start(true));document.addEventListener('keydown',e=>{if(!running)return;if(e.key==='Escape'){e.preventDefault();finish()}if(e.key==='Tab'){e.preventDefault();skip.focus()}});reduced.addEventListener('change',()=>{if(reduced.matches)finish()});addEventListener('pageshow',e=>{if(e.persisted)finish()});if(root.classList.contains('opening'))start();
})();
