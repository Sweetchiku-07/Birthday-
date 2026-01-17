
// === Simple Confetti ===
(function(){
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  let w, h, confetti = [], running = false;
  const colors = ['#F6D26B','#0E4A5B','#F7C9C9','#FFF6E8','#D94862'];

  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();

  function addConfetti(count){
    for(let i=0;i<count;i++){
      confetti.push({
        x: Math.random()*w,
        y: -10,
        r: Math.random()*6+3,
        c: colors[(Math.random()*colors.length)|0],
        s: Math.random()*2+1,
        a: Math.random()*Math.PI*2,
        va: (Math.random()-.5)*0.2
      });
    }
  }

  function tick(){
    if(!running) return;
    ctx.clearRect(0,0,w,h);
    confetti.forEach(p=>{ p.y += p.s*2; p.x += Math.sin(p.a)*1.5; p.a += p.va; p.r *= 0.999; });
    confetti = confetti.filter(p=> p.y < h+20 && p.r > .5);
    confetti.forEach(p=>{ ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
    requestAnimationFrame(tick);
  }

  window.launchConfetti = function(){ running = true; addConfetti(260); tick(); setTimeout(()=>running=false, 2200); }
})();

// === Button behavior: confetti + scroll + play YouTube + spin vinyl ===
(function(){
  const btn = document.getElementById('playBtn');
  const vinyl = document.getElementById('vinyl');
  const music = document.getElementById('music');
  const yt = document.getElementById('ytPlayer');

  function playYouTube(){
    try{
      yt.contentWindow.postMessage(JSON.stringify({event:'command', func:'playVideo', args:''}),'*');
    }catch(e){ /* some browsers require a user click on the player */ }
  }

  btn.addEventListener('click', ()=>{
    launchConfetti();
    vinyl.classList.add('playing');
    music.scrollIntoView({behavior:'smooth'});
    setTimeout(playYouTube, 800);
  });
})();

// === Ambient petals (flowers & bells) ===
(function(){
  const layer = document.getElementById('petal-layer');
  const EMOJIS = ['🌹','🌸','💮','🔔'];
  function spawnPetal(){
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = EMOJIS[(Math.random()*EMOJIS.length)|0];
    el.style.left = (Math.random()*100)+'vw';
    el.style.bottom = '-5vh';
    el.style.animationDuration = (9 + Math.random()*6) + 's';
    el.style.fontSize = (18 + Math.random()*14) + 'px';
    layer.appendChild(el);
    setTimeout(()=>el.remove(), 16000);
  }
  setInterval(spawnPetal, 700); // decrease to 500 for more petals
})();

// === Ambient glitter/sparkles ===
(function(){
  const layer = document.getElementById('sparkle-layer');
  const SPARK = ['✨','✶','✷','✸'];
  function spawnSpark(){
    const el = document.createElement('div');
    el.className = 'spark';
    el.textContent = SPARK[(Math.random()*SPARK.length)|0];
    el.style.left = (Math.random()*100)+'vw';
    el.style.bottom = '-5vh';
    el.style.animationDuration = (6 + Math.random()*5) + 's';
    el.style.fontSize = (10 + Math.random()*10) + 'px';
    layer.appendChild(el);
    setTimeout(()=>el.remove(), 12000);
  }
  setInterval(spawnSpark, 600); // decrease to 400 for more sparkle
})();
