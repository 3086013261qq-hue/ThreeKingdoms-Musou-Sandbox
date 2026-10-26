import { FACTIONS, COLORS, phase } from "../runtime/facts.mjs";
export function createPanel(host, config, state, onState) {
  const d = host.ownerDocument;
  host.innerHTML = `<style>${config.css}</style><section class="tkm-panel" aria-label="三国无双姬">
    <header class="tkm-head"><button type="button" class="tkm-relock" aria-label="返回锁屏">⌑</button><div class="tkm-heading"><strong>三国无双姬</strong><small class="tkm-subtitle">阵营亲和</small></div><span class="tkm-count">0 / 89</span></header>
    <div class="tkm-portrait-space"></div><main class="tkm-body"><section class="tkm-affinity"><div class="tkm-jade"><h2 class="tkm-board-title">五 方 玉 榜</h2><div class="tkm-rows"></div></div></section>
    <section class="tkm-collection" hidden><div class="tkm-gallery-head">名姬风华录<small class="tkm-progress">已录 0 / 89</small></div><nav class="tkm-filters" aria-label="阵营筛选"></nav><div class="tkm-grid"></div></section></main>
    <nav class="tkm-foot" aria-label="MVU页面"><button type="button" data-page="0" role="tab">阵营</button><button type="button" data-page="1" role="tab">风华</button></nav>
    <section class="tkm-lock"><img alt="阵营锁屏"><div class="tkm-lock-title">三国无双姬</div><button type="button" class="tkm-enter" aria-label="进入MVU"></button><button type="button" class="tkm-arrow tkm-prev" aria-label="上一张锁屏">‹</button><button type="button" class="tkm-arrow tkm-next" aria-label="下一张锁屏">›</button><div class="tkm-page-indicator"><span></span><small></small></div></section>
  </section>`;
  const q = s => host.querySelector(s), panel = q('.tkm-panel');
  panel.style.setProperty('--tkm-bg', `url("${config.media.mvu_background.url}")`);
  const lock = q('.tkm-lock'), img = q('.tkm-lock img');
  img.addEventListener('error', () => { img.hidden = true; });
  const previews = new Map(); let loadedIndex = -1;
  function changeLock(delta) { state.lockIndex = (state.lockIndex + delta + 5) % 5; drawState(); }
  function drawState() {
    lock.hidden = !state.locked;
    if (state.locked && loadedIndex !== state.lockIndex) {
      loadedIndex = state.lockIndex; img.hidden = false;
      img.src = config.media.lockscreen[state.lockIndex].url;
      img.alt = config.media.lockscreen[state.lockIndex].faction + '阵营锁屏';
      q('.tkm-page-indicator span').textContent = config.media.lockscreen[state.lockIndex].faction;
      q('.tkm-page-indicator small').textContent = `${state.lockIndex + 1} / 5`;
      lock.classList.remove('tkm-turn'); void lock.offsetWidth; lock.classList.add('tkm-turn');
      const adjacent = [-1,1].map(n => (state.lockIndex + n + 5) % 5);
      for (const [key, value] of previews) if (!adjacent.includes(key)) { value.removeAttribute('src'); previews.delete(key); }
      adjacent.forEach(i => { if (!previews.has(i)) { const p = new (d.defaultView.Image)(); p.src = config.media.lockscreen[i].url; previews.set(i,p); } });
    }
    q('.tkm-affinity').hidden = state.page !== 0;
    q('.tkm-collection').hidden = state.page !== 1;
    q('.tkm-subtitle').textContent = state.page ? '名姬风华录' : '阵营亲和';
    host.querySelectorAll('[data-page]').forEach(b => b.setAttribute('aria-selected', String(Number(b.dataset.page) === state.page)));
    host.querySelectorAll('.tkm-filter').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.faction === state.filter)));
    onState();
  }
  q('.tkm-prev').addEventListener('click', e => { e.stopPropagation(); changeLock(-1); });
  q('.tkm-next').addEventListener('click', e => { e.stopPropagation(); changeLock(1); });
  q('.tkm-enter').addEventListener('click', () => { if (Date.now() < state.suppressClickUntil) return; state.locked = false; drawState(); });
  q('.tkm-relock').addEventListener('click', () => { state.locked = true; drawState(); });
  host.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => { state.page = Number(b.dataset.page); drawState(); }));
  let pointer = null;
  panel.addEventListener('pointerdown', e => { if (!e.isPrimary || (e.button && e.button !== 0)) return; pointer = {x:e.clientX,y:e.clientY}; });
  panel.addEventListener('pointercancel', () => { pointer = null; });
  panel.addEventListener('pointerup', e => {
    if (!pointer) return;
    const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y; pointer=null;
    if (Math.abs(dx) < 42 || Math.abs(dx) <= Math.abs(dy)*1.5) return;
    state.suppressClickUntil = Date.now()+350;
    if (state.locked) changeLock(dx<0?1:-1);
    else { state.page=dx<0?1:0; drawState(); }
  });
  let currentRelations = new Map(), lastSignature = '', lastFaction = '';
  const everDrawn = new Set();
  function drawCards() {
    const grid=q('.tkm-grid'); grid.replaceChildren();
    config.roster.forEach(r => {
      if (state.filter !== '全部' && r.faction !== state.filter) return;
      const known=currentRelations.has(r.name), card=d.createElement('div'); card.className='tkm-card';
      card.style.setProperty('--accent', known ? COLORS[FACTIONS.indexOf(r.faction)] : '#71644b');
      if (!known) card.classList.add('tkm-unseen');
      else if (!everDrawn.has(r.name)) { card.classList.add('tkm-new'); everDrawn.add(r.name); }
      const name=d.createElement('b'), value=d.createElement('span');
      name.textContent=known?r.name:'???'; value.textContent=known?`♥ ${currentRelations.get(r.name)}`:'未邂逅';
      card.append(name,value); grid.append(card);
    });
  }
  ['全部',...FACTIONS].forEach(f => {
    const b=d.createElement('button'); b.type='button'; b.className='tkm-filter'; b.dataset.faction=f; b.textContent=f;
    b.addEventListener('click', () => { state.filter=f; drawState(); drawCards(); }); q('.tkm-filters').append(b);
  });
  FACTIONS.forEach((f,i) => {
    const row=d.createElement('div'); row.className='tkm-row'; row.dataset.faction=f; row.style.setProperty('--accent',COLORS[i]);
    row.innerHTML=`<div class="tkm-row-top"><span class="tkm-seal">${f==='群雄'?'群':f==='曹魏'?'魏':f==='蜀汉'?'蜀':f==='孙吴'?'吴':'晋'}</span><span class="tkm-faction">${f}</span><span class="tkm-phase"></span><b class="tkm-value"></b><span class="tkm-delta"></span></div><div class="tkm-track" role="meter" aria-label="${f}亲和" aria-valuemin="-100" aria-valuemax="100"><span class="tkm-fill"></span></div>`;
    q('.tkm-rows').append(row);
  });
  drawState(); drawCards();
  return {
    render(affinity,relations) {
      const sig=JSON.stringify([...relations]);
      if (sig!==lastSignature) { lastSignature=sig; currentRelations=relations; drawCards(); }
      q('.tkm-progress').textContent=`已录 ${relations.size} / 89`; q('.tkm-count').textContent=`${relations.size} / 89`;
      const af=JSON.stringify(affinity);
      if (af!==lastFaction) {
        lastFaction=af;
        host.querySelectorAll('.tkm-row').forEach(row => {
          const data=affinity[row.dataset.faction],n=data.value;
          row.querySelector('.tkm-value').textContent=n>0?`+${n}`:String(n);
          row.querySelector('.tkm-phase').textContent=phase(n);
          const track=row.querySelector('.tkm-track'), fill=row.querySelector('.tkm-fill'); track.setAttribute('aria-valuenow',String(n));
          fill.style.left=`${n<0?50+n/2:50}%`; fill.style.width=`${Math.abs(n)/2}%`;
          const delta=row.querySelector('.tkm-delta'); delta.textContent=data.delta===0?'':data.delta>0?`+${data.delta}`:String(data.delta);
        });
      } else host.querySelectorAll('.tkm-delta').forEach(e => { e.textContent=''; });
    },
    dispose() { previews.forEach(p=>p.removeAttribute('src')); previews.clear(); host.remove(); }
  };
}
