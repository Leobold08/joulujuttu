// JS: spawn multiple flying santa sleighs using Web Animations API
// Clones the inline SVG template from the demo and animates transform with randomized params.

(function(){
  const containerSelector = '.bg-container';
  const templateSelector = '.sleigh.s1 .sleigh-svg';
  const defaultCount = 3;
  let running = true;
  let sleighs = [];

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function getSvgTemplate(){
    const svg = document.querySelector(templateSelector);
    if (!svg) return null;
    return svg.outerHTML;
  }

  function spawnOne(svgHtml){
    const container = document.querySelector(containerSelector);
    if (!container) return null;

    const el = document.createElement('div');
    el.className = 'sleigh js-santa';
    // randomize starting vertical position and scale
    const topPct = rand(6, 40); // percent from top
    const scale = rand(0.6, 1.05);
    const width = Math.round(220 * scale) + 'px';
    el.style.top = topPct + '%';
    el.style.width = width;
    el.style.position = 'absolute';
    el.style.right = '0';
    el.style.pointerEvents = 'none';
    el.style.opacity = Math.min(1, 0.6 + (scale-0.6));
    el.innerHTML = svgHtml;
    container.appendChild(el);

    // movement: from right outside screen to left outside
    const startX = window.innerWidth + 200; // px
    const endX = - (window.innerWidth * 1.2);
    const duration = rand(14000, 32000); // ms
    const delay = rand(0, 5000);
    const startRot = rand(-8, -2);
    const endRot = rand(2, 8);
    const bobY = rand(-40, 40);

    // main flight animation
    const flight = el.animate([
      { transform: `translateX(${startX}px) translateY(0px) rotate(${startRot}deg) scale(${scale})`, opacity: 0 },
      { offset: 0.06, transform: `translateX(${startX - (0.06*(startX - (window.innerWidth*0.4)))}px) translateY(${rand(-30,-10)}px) rotate(${startRot/2}deg) scale(${scale})`, opacity: 1 },
      { offset: 0.5, transform: `translateX(${(startX+endX)/2}px) translateY(${bobY}px) rotate(${(startRot+endRot)/2}deg) scale(${scale})` },
      { offset: 0.9, transform: `translateX(${endX + (window.innerWidth*0.1)}px) translateY(${rand(-20,30)}px) rotate(${endRot}deg) scale(${scale})`, opacity: 0.8 },
      { transform: `translateX(${endX}px) translateY(0px) rotate(${endRot}deg) scale(${scale})`, opacity: 0 }
    ], {
      duration: duration,
      delay: delay,
      iterations: Infinity,
      easing: 'linear'
    });

    // small bobbing for reindeers
    const bob = el.animate([
      { transform: `translateY(0px)` },
      { transform: `translateY(-6px)` },
      { transform: `translateY(0px)` }
    ], {
      duration: 800 + rand(0, 500),
      iterations: Infinity,
      easing: 'ease-in-out'
    });

    // cleanup reference so we can stop later
    sleighs.push({el, flight, bob});
    return el;
  }

  function spawnMany(n){
    const svgHtml = getSvgTemplate();
    if (!svgHtml) return;
    for(let i=0;i<n;i++) spawnOne(svgHtml);
  }

  function removeAll(){
    sleighs.forEach(s => {
      try{ s.flight.cancel(); s.bob.cancel(); }catch(e){}
      if (s.el && s.el.parentNode) s.el.parentNode.removeChild(s.el);
    });
    sleighs = [];
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    spawnMany(defaultCount);

    const toggle = document.getElementById('toggle-sleighs');
    if (toggle){
      toggle.addEventListener('click', ()=>{
        running = !running;
        if (!running) removeAll();
        else spawnMany(defaultCount);
        toggle.textContent = running ? 'Stop flying Santa' : 'Start flying Santa';
      });
    }

    // respawn on resize to keep trajectories correct
    let resizeTimer = null;
    window.addEventListener('resize', ()=>{
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=>{
        // restart animations to recalc widths/positions
        removeAll();
        if (running) spawnMany(defaultCount);
      }, 300);
    });
  });
})();
