const {chromium}=require('playwright');
const fs=require('fs'); const path=require('path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const bundle=fs.readFileSync(path.join(root,'qa/statusbar-bundle.js'),'utf8');
const media=JSON.parse(fs.readFileSync(path.join(root,'mvu/media-manifest.v1.json')));
const sample=(n=0)=>'<faction_affinity>\n'+['曹魏','蜀汉','孙吴','晋','群雄'].map((f,i)=>`${f}亲和: ${i===0?n:i===1?-23:0}/100 | 本回合: +0 | 原因: 无`).join('\n')+'\n</faction_affinity>';
(async()=>{
 const browser=await chromium.launch({headless:true, executablePath:process.env.TKM_CHROMIUM||undefined,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']}); const page=await browser.newPage({viewport:{width:360,height:900},hasTouch:true});
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.route('https://cdn.jsdelivr.net/**',route=>{
  const url=route.request().url(),asset=[...media.lockscreen,media.mvu_background].find(m=>m.url===url);
  return asset?route.fulfill({path:path.join(root,asset.path),contentType:'image/png'}):route.abort();
 });
 async function setup(floorWidth=248){
  await page.setContent(`<html><body style="margin:0;background:#201c1c;color:#fff"><div id="chat" style="width:${floorWidth}px;margin-left:48px"><div class="mes" mesid="0"><div class="mes_text">开场</div></div><div class="mes" mesid="1"><div class="mes_text">正文</div></div></div></body></html>`);
  await page.evaluate(({block})=>{
   window.__ctx={characterId:1,chatId:'first',chat:[{is_user:false,mes:'<opening>start</opening>'},{is_user:false,mes:'<story_scene>正文</story_scene>'+block}]};
   window.SillyTavern={getContext:()=>window.__ctx};window.__listeners={};
   window.tavern_events=Object.fromEntries(['CHARACTER_MESSAGE_RENDERED','MESSAGE_RECEIVED','MESSAGE_UPDATED','MESSAGE_SWIPED','MESSAGE_DELETED','CHAT_CHANGED'].map(k=>[k,k]));
   window.eventOn=(e,f)=>{(window.__listeners[e]??=[]).push(f);return {stop(){window.__listeners[e]=window.__listeners[e].filter(x=>x!==f)}}};
   window.__emit=(e)=>{for(const f of window.__listeners[e]||[])f()};
  },{block:sample(20)});
  await page.addScriptTag({content:bundle});await page.waitForTimeout(400);
 }
 await setup();
 assert.equal(await page.locator('.tkm-host').count(),1);
 await page.locator('.tkm-next').click();assert.equal(await page.locator('.tkm-page-indicator small').innerText(),'2 / 5');assert.equal(await page.locator('.tkm-lock').isVisible(),true);
 await page.locator('.tkm-prev').click();assert.equal(await page.locator('.tkm-page-indicator small').innerText(),'1 / 5');
 await page.locator('.tkm-lock img').dispatchEvent('error');assert.equal(await page.locator('.tkm-lock img').isVisible(),false);
 await page.locator('.tkm-enter').click();assert.equal(await page.locator('.tkm-lock').isVisible(),false);
 assert.equal(await page.locator('.tkm-value').first().innerText(),'+20');
 // Native roleless message + first encounter, with an actual new AI floor.
 await page.evaluate(block=>{
  window.__ctx.chat.push({is_user:true,mes:'玩家'},{mes:'<story_scene>继续</story_scene>'+block+'<affinity>曹操 💞好感: 67｜🤝信任: 12｜🔗关系: 朋友</affinity>'});
  const m=document.createElement('div');m.className='mes';m.setAttribute('mesid','3');m.innerHTML='<div class="mes_text">新正文</div>';document.querySelector('#chat').append(m);window.__emit('CHARACTER_MESSAGE_RENDERED');
 },sample(38));await page.waitForTimeout(400);
 assert.equal(await page.locator('.tkm-host').count(),1);assert.equal(await page.locator('.tkm-value').first().innerText(),'+38');assert.equal(await page.locator('.tkm-host').getAttribute('data-message-id'),'3');
 await page.locator('[data-page="1"]').click();assert.equal(await page.locator('.tkm-progress').innerText(),'已录 1 / 89');
 assert.equal(await page.locator('.tkm-card:not(.tkm-unseen)').innerText(),'曹操\n♥ 67');assert.equal(await page.locator('.tkm-unseen b').first().innerText(),'???');
 assert.equal(await page.locator('.tkm-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),2);
 // Every visible interaction has a real 44 x 44 touch box, including filters.
 const sizes=await page.locator('.tkm-panel button:visible').evaluateAll(es=>es.map(e=>({name:e.textContent||e.getAttribute('aria-label'),w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
 assert(sizes.every(x=>x.w>=44&&x.h>=44),JSON.stringify(sizes));
 assert.equal(await page.locator('.tkm-panel').evaluate(e=>e.scrollWidth<=e.clientWidth),true);
 await page.screenshot({path:path.join(root,'qa/preview-android-360.png'),fullPage:true});
 // No fake lighting from user tags; latest malformed model block retains previous legal value.
 await page.evaluate(()=>{window.__ctx.chat.push({is_user:true,mes:'<faction_affinity>fake</faction_affinity>'},{mes:'<faction_affinity>broken</faction_affinity>'});window.__emit('MESSAGE_UPDATED')});await page.waitForTimeout(300);
 await page.locator('[data-page="0"]').click();assert.equal(await page.locator('.tkm-value').first().innerText(),'+38');
 await page.locator('.tkm-relock').click();assert.equal(await page.locator('.tkm-page-indicator small').innerText(),'1 / 5');
 // Horizontal swipe and generated click suppression. Vertical drag does not change lock index.
 const panel=page.locator('.tkm-panel');
 await panel.dispatchEvent('pointerdown',{isPrimary:true,button:0,clientX:200,clientY:350});await panel.dispatchEvent('pointerup',{isPrimary:true,clientX:100,clientY:355});
 assert.equal(await page.locator('.tkm-page-indicator small').innerText(),'2 / 5');
 await panel.dispatchEvent('pointerdown',{isPrimary:true,button:0,clientX:100,clientY:350});await panel.dispatchEvent('pointerup',{isPrimary:true,clientX:105,clientY:440});
 assert.equal(await page.locator('.tkm-page-indicator small').innerText(),'2 / 5');
 await page.waitForTimeout(400);await page.locator('.tkm-enter').click();
 await panel.dispatchEvent('pointerdown',{isPrimary:true,button:0,clientX:200,clientY:350});await panel.dispatchEvent('pointerup',{isPrimary:true,clientX:100,clientY:355});
 assert.equal(await page.locator('[data-page="1"]').getAttribute('aria-selected'),'true');
 // Chat change resets the view and never leaks a previous chat's encounters/affinity.
 await page.evaluate(()=>{window.__ctx.chatId='second';window.__ctx.chat=[{mes:'<opening>x</opening>'},{mes:'<story_scene>new</story_scene>'}];window.__emit('CHAT_CHANGED')});await page.waitForTimeout(350);
 await page.locator('.tkm-enter').click();assert.equal(await page.locator('.tkm-value').first().innerText(),'0');assert.equal(await page.locator('.tkm-count').innerText(),'0 / 89');
 // Rerender replacement restores one panel via observer; repeated events never duplicate.
 await page.evaluate(()=>{document.querySelector('.mes[mesid="1"] .mes_text').innerHTML='重绘';for(let i=0;i<10;i++)window.__emit('MESSAGE_UPDATED')});await page.waitForTimeout(350);assert.equal(await page.locator('.tkm-host').count(),1);
 // All CDN images fail; controls and initial values still usable.
 await page.unrouteAll({behavior:'wait'});await page.route('https://cdn.jsdelivr.net/**',route=>route.abort());
 await page.locator('.tkm-relock').click();await page.locator('.tkm-next').click();await page.locator('.tkm-enter').click();assert.equal(await page.locator('.tkm-value').first().innerText(),'0');
 // Full 360px panel: 3-column collection, no overflow.
 await page.unrouteAll({behavior:'wait'});await page.route('https://cdn.jsdelivr.net/**',route=>{const asset=[...media.lockscreen,media.mvu_background].find(m=>m.url===route.request().url());return asset?route.fulfill({path:path.join(root,asset.path),contentType:'image/png'}):route.abort()});
 await page.setViewportSize({width:420,height:950});await setup(360);await page.locator('.tkm-enter').click();await page.locator('[data-page="1"]').click();
 assert.equal(await page.locator('.tkm-grid').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),3);assert.equal(await page.locator('.tkm-panel').evaluate(e=>e.scrollWidth<=e.clientWidth),true);
 await page.screenshot({path:path.join(root,'qa/preview-panel-360.png'),fullPage:true});
 await page.locator('[data-page="0"]').click();await page.screenshot({path:path.join(root,'qa/preview-affinity-360.png'),fullPage:true});
 // Tavern Helper fallback when the SillyTavern context object is not exposed.
 await page.evaluate(()=>{delete window.SillyTavern;window.getLastMessageId=()=>1;window.getChatMessages=()=>window.__ctx.chat;window.__emit('MESSAGE_UPDATED')});await page.waitForTimeout(300);assert.equal(await page.locator('.tkm-value').first().innerText(),'+20');
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.tkm-fill').first().evaluate(e=>getComputedStyle(e).transitionDuration),'0s');
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: simulated 360px Android / 248px actual floor; buttons/swipes/navigation/native affinity/new roleless floors/malformed fallback/chat reset/rerender/no duplicates/fallback/reduced motion. Not real device acceptance.');
})().catch(e=>{console.error(e);process.exit(1)});
