// Runs as the native Tavern Helper ③「变量状态栏」 script, appended after facts/UI.
// CONFIG and helpers are embedded at build time; no network-fetched business source.
(() => {
  const top = window.parent, d = top.document, HOST = 'tkm-host';
  const disposePrevious = top.__tkmDispose;
  if (typeof disposePrevious === 'function') disposePrevious();
  let disposed=false, timer=0, observer=null, host=null, view=null, sessionKey='';
  let lastMessages=[], previousAffinity=zeroAffinity();
  const state={locked:true,lockIndex:0,page:0,filter:'全部',suppressClickUntil:0};
  const unbind=[];
  function context() { try { return top.SillyTavern?.getContext?.() || {}; } catch { return {}; } }
  function history() {
    const ctx=context();
    if (Array.isArray(ctx.chat)) return {messages:ctx.chat,key:String(ctx.characterId??'')+':'+String(ctx.chatId??'')};
    try {
      const end=getLastMessageId(), rows=end>=0?getChatMessages(`0-${end}`):[];
      return {messages:Array.isArray(rows)?rows:[],key:sessionKey};
    } catch { return {messages:lastMessages,key:sessionKey}; }
  }
  function schedule() { if (disposed) return; clearTimeout(timer); timer=setTimeout(refresh,120); }
  function removeView() { if (view) view.dispose(); else if (host) host.remove(); host=null; view=null; }
  function refresh() {
    if (disposed) return;
    const snapshot=history();
    if (snapshot.key!==sessionKey) { removeView(); sessionKey=snapshot.key; previousAffinity=zeroAffinity(); state.locked=true; state.lockIndex=0; state.page=0; state.filter='全部'; }
    lastMessages=snapshot.messages;
    previousAffinity=latestFaction(lastMessages,previousAffinity);
    const relations=nativeRelations(lastMessages,CONFIG.roster);
    let latest=-1, box=null;
    for (let i=lastMessages.length-1;i>0;i--) {
      const m=lastMessages[i]; if (!isModel(m) || !textOf(m) || /<\/?opening>|\[TKM_OPENING_FLOW\]/i.test(textOf(m))) continue;
      const id=Number(m.message_id??m.id??i);
      box=d.querySelector(`#chat > .mes[mesid="${id}"] .mes_text`);
      if (box) { latest=id; break; }
    }
    if (!box) { removeView(); return; }
    // One active panel on the newest available AI floor; history stays light.
    if (!host?.isConnected || host.parentElement!==box) {
      removeView(); d.querySelectorAll('.'+HOST).forEach(e=>e.remove());
      host=d.createElement('div'); host.className=HOST; host.dataset.messageId=String(latest); box.append(host);
      view=createPanel(host,CONFIG,state,()=>{});
    }
    view.render(previousAffinity,relations);
  }
  function resetChat() {
    removeView(); lastMessages=[]; previousAffinity=zeroAffinity(); sessionKey='';
    Object.assign(state,{locked:true,lockIndex:0,page:0,filter:'全部'}); schedule();
  }
  function listen(name,callback) {
    if (!name || typeof eventOn!=='function') return;
    const result=eventOn(name,callback);
    if (typeof result?.stop==='function') unbind.push(()=>result.stop());
    else if (typeof eventRemoveListener==='function') unbind.push(()=>eventRemoveListener(name,callback));
  }
  const events=typeof tavern_events==='object'?tavern_events:{};
  ['CHARACTER_MESSAGE_RENDERED','MESSAGE_RECEIVED','MESSAGE_UPDATED','MESSAGE_SWIPED','MESSAGE_DELETED'].forEach(k=>listen(events[k],schedule));
  listen(events.CHAT_CHANGED,resetChat);
  const mvu=typeof Mvu==='object'?Mvu.events||{}:{};
  listen(mvu.VARIABLE_UPDATE_ENDED||'mag_variable_update_ended',schedule);
  listen(mvu.VARIABLE_INITIALIZED||'mag_variable_initiailized',schedule);
  function watchChat() {
    const chat=d.querySelector('#chat'); if (!chat) return;
    observer=new top.MutationObserver(records=>{
      if (records.some(r=>!r.target.closest?.('.'+HOST))) schedule();
    });
    observer.observe(chat,{childList:true,subtree:true,characterData:true});
  }
  const cleanup=()=>{
    if(disposed)return; disposed=true; clearTimeout(timer); observer?.disconnect();
    unbind.forEach(f=>{try{f();}catch{}}); removeView();
    if(top.__tkmDispose===cleanup)delete top.__tkmDispose;
  };
  top.__tkmDispose=cleanup;
  window.addEventListener('pagehide',cleanup,{once:true});
  watchChat(); refresh();
})();
