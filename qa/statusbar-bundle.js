(() => {
const CONFIG = {"css": ".tkm-host{width:100%;min-width:0;container-type:inline-size;margin:18px 0;color:#F6EBD3;font-family:system-ui,-apple-system,\"PingFang SC\",\"Microsoft YaHei\",sans-serif}\n.tkm-host *{box-sizing:border-box}.tkm-host [hidden]{display:none!important}\n.tkm-panel{--gold:#D9B96E;position:relative;isolation:isolate;width:100%;max-width:480px;height:740px;margin:auto;overflow:hidden;background:#100D0C;border:1px solid #D9B96E88;border-radius:18px;box-shadow:0 12px 30px #0005;color:#F6EBD3;touch-action:pan-y}\n.tkm-panel::before{content:\"\";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,#100d0c30 0%,transparent 32%,#100d0c85 75%,#100d0ce8 100%),var(--tkm-bg) center top/cover no-repeat}\n.tkm-panel button{font:inherit;cursor:pointer;min-height:44px;min-width:44px;border:0;color:#F6EBD3;background:transparent;padding:8px;touch-action:pan-y;box-shadow:none;line-height:1.2}\n.tkm-panel button:focus-visible{outline:2px solid #D9B96E;outline-offset:-3px}.tkm-panel button:disabled{opacity:.4;cursor:default}\n.tkm-head{height:62px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:#100d0c99;border-bottom:1px solid #D9B96E55}\n.tkm-heading{text-align:center;flex:1;min-width:0}.tkm-heading strong{display:block;font-family:\"Songti SC\",\"Noto Serif CJK SC\",\"Source Han Serif SC\",serif;letter-spacing:.16em;font-size:19px;color:#D9B96E}.tkm-heading small{font-size:11px;letter-spacing:.18em;color:#CDBFAD}\n.tkm-head .tkm-count{font-size:11px;font-variant-numeric:tabular-nums;min-width:46px;text-align:right}.tkm-portrait-space{height:174px;pointer-events:none}\n.tkm-body{height:calc(100% - 298px);overflow-y:auto;overscroll-behavior:contain;padding:0 12px 16px;scrollbar-width:thin;scrollbar-color:#846240 #100d0c55}\n.tkm-jade{background:rgba(18,13,11,.58);border:1px solid #D9B96E66;border-radius:14px;padding:10px 12px;box-shadow:inset 0 0 0 3px #100d0c22}\n.tkm-board-title{margin:2px 0 10px;text-align:center;font-family:\"Songti SC\",\"Noto Serif CJK SC\",serif;font-size:14px;letter-spacing:.3em;color:#D9B96E}\n.tkm-row{padding:9px 0;border-top:1px solid #d9b96e22}.tkm-row-top{display:flex;align-items:center;gap:7px;min-width:0;font-size:13px}.tkm-seal{width:23px;height:25px;display:grid;place-items:center;flex:none;background:var(--accent);border:1px solid #D9B96E88;border-radius:3px;color:#F6EBD3;font-family:serif;font-size:15px}.tkm-faction{font-size:14px;font-weight:600}.tkm-phase{color:#CDBFAD;font-size:11px;margin-left:auto}.tkm-value{min-width:36px;text-align:right;font-variant-numeric:tabular-nums;color:#F6EBD3}.tkm-delta{font-size:10px;color:#D9B96E;animation:tkm-gold-in .22s ease-out}.tkm-delta:empty{display:none}\n.tkm-track{height:5px;margin:10px 1px 3px 30px;position:relative;background:#100d0ca8;border-top:1px solid #d9b96e66;border-bottom:1px solid #d9b96e22;border-radius:2px}.tkm-track::after{content:\"\";position:absolute;left:50%;top:-4px;width:1px;height:11px;background:#D9B96Eaa}.tkm-fill{position:absolute;top:0;height:3px;background:linear-gradient(0deg,var(--accent),#d9b96eaa);transition:left .24s,width .24s}\n.tkm-filters{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:2px;margin:0 0 10px}.tkm-panel .tkm-filter{min-width:0;padding:7px 1px;font-size:11px;border-bottom:1px solid #d9b96e44;background:#100d0c88;border-radius:5px}.tkm-filter[aria-pressed=true]{color:#D9B96E;border-bottom:2px solid #D9B96E}\n.tkm-gallery-head{display:flex;justify-content:space-between;gap:4px;margin-bottom:10px;font-family:serif;font-size:14px;color:#D9B96E}.tkm-gallery-head small{font-family:system-ui;font-size:12px}.tkm-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.tkm-card{min-width:0;min-height:62px;display:flex;flex-direction:column;justify-content:center;align-items:center;background:#120d0ba8;border:1px solid #d9b96e44;border-top:2px solid var(--accent);border-radius:9px;padding:8px 2px;color:#F6EBD3}.tkm-card b{font-size:12px;font-family:serif;font-weight:500}.tkm-card span{font-size:12px;color:#cd7460;margin-top:5px;font-variant-numeric:tabular-nums}.tkm-card.tkm-unseen{background:#100d0c88;border-top-color:#71644b;color:#b8a98d}.tkm-card.tkm-unseen span{color:#9e9484;font-size:11px}.tkm-card.tkm-new{animation:tkm-gold-in .22s ease-out}\n.tkm-foot{position:absolute;bottom:0;left:0;right:0;display:flex;height:62px;background:linear-gradient(#100d0ce8,#100d0c);border-top:1px solid #d9b96e55;padding:4px 14px 8px;gap:14px}.tkm-foot button{flex:1;letter-spacing:.4em;font-family:serif;font-size:15px}.tkm-foot button[aria-selected=true]{color:#D9B96E;border-top:1px solid #D9B96E;text-shadow:0 0 9px #d9b96e55}\n.tkm-lock{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,#6f211b,#100d0c 80%);z-index:2}.tkm-lock img{display:block;width:100%;height:100%;max-width:none!important;object-fit:cover;object-position:center top;pointer-events:none}.tkm-lock::after{content:\"\";position:absolute;inset:0;background:linear-gradient(#100d0c66,transparent 18%,transparent 70%,#100d0cc9);pointer-events:none}.tkm-lock-title{position:absolute;top:19px;left:12px;right:12px;text-align:center;font:20px \"Songti SC\",\"Noto Serif CJK SC\",serif;letter-spacing:.23em;color:#F6EBD3;text-shadow:0 2px 6px #100d0c;z-index:1;pointer-events:none}\n.tkm-panel .tkm-enter{position:absolute;inset:74px 52px 98px;width:calc(100% - 104px);height:calc(100% - 172px);z-index:1;border:0;background:transparent}.tkm-panel .tkm-arrow{position:absolute;top:48%;z-index:3;width:48px;height:48px;padding:0;background:transparent;border:0;border-radius:50%;font-size:23px;color:#D9B96E}.tkm-arrow::before{content:\"\";position:absolute;inset:8px;border:1px solid #d9b96e99;background:#100d0c88;border-radius:50%;z-index:-1}.tkm-prev{left:3px}.tkm-next{right:3px}.tkm-page-indicator{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);padding:9px 18px;text-align:center;background:#100d0caa;border:1px solid #D9B96E77;border-radius:8px;color:#F6EBD3;font:15px serif;letter-spacing:.15em;z-index:1;white-space:nowrap}.tkm-page-indicator small{display:block;font:11px system-ui;letter-spacing:.1em;color:#D9B96E;margin-top:5px}.tkm-lock.tkm-turn img{animation:tkm-slide .24s ease-out}\n@keyframes tkm-slide{from{opacity:.6;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}@keyframes tkm-gold-in{from{border-color:#ffe6a4;opacity:.55}to{opacity:1}}\n@container(max-width:380px){.tkm-panel{height:680px}.tkm-portrait-space{height:152px}.tkm-body{height:calc(100% - 276px)}.tkm-head{padding:7px}.tkm-heading strong{font-size:17px}.tkm-jade{padding:9px}.tkm-body{padding-left:9px;padding-right:9px}}\n@container(max-width:280px){.tkm-panel{height:650px}.tkm-portrait-space{height:137px}.tkm-body{height:calc(100% - 261px)}.tkm-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.tkm-heading strong{font-size:15px;letter-spacing:.07em}.tkm-filters{grid-template-columns:repeat(3,minmax(0,1fr))}.tkm-phase{font-size:10px}.tkm-head .tkm-count{font-size:10px;min-width:36px}.tkm-row-top{gap:4px}.tkm-faction{font-size:12px}.tkm-value{min-width:30px}.tkm-body{padding-left:7px;padding-right:7px}}\n@media(prefers-reduced-motion:reduce){.tkm-host *{animation:none!important;transition:none!important}}\n@container(max-width:320px){.tkm-filters{grid-template-columns:repeat(3,minmax(0,1fr))}}\n", "media": {"schema": "three-kingdoms-musou-mvu-media-v1", "version": "1.0.0", "status": "FROZEN", "repository": "3086013261qq-hue/ThreeKingdoms-Musou-Sandbox", "source_commit": "904a20d68e6ec84773a46cae023a441df01fbca4", "cdn_base": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/", "lockscreen": [{"index": 1, "faction": "曹魏", "key": "caowei", "path": "mvu/media/lockscreen/file_000000008fd082078b02461936d36d8b.png", "blob_sha": "71be37277268c72a4db022a103a07456c0edbe60", "url": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/mvu/media/lockscreen/file_000000008fd082078b02461936d36d8b.png"}, {"index": 2, "faction": "蜀汉", "key": "shuhan", "path": "mvu/media/lockscreen/file_00000000f4048211964151601f11f055.png", "blob_sha": "5862ded29420bdbd9b4af9fff1adbd7cb63d17a6", "url": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/mvu/media/lockscreen/file_00000000f4048211964151601f11f055.png"}, {"index": 3, "faction": "孙吴", "key": "sunwu", "path": "mvu/media/lockscreen/file_00000000dc508211b26c244a012a8c0f.png", "blob_sha": "cd824d3058165795dd145ccab4fbf441cc15f8ce", "url": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/mvu/media/lockscreen/file_00000000dc508211b26c244a012a8c0f.png"}, {"index": 4, "faction": "晋", "key": "jin", "path": "mvu/media/lockscreen/file_00000000ed5c8211a215bd90cb86d19f.png", "blob_sha": "16117840f1e64a9360459ee7ee75ead988384c88", "url": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/mvu/media/lockscreen/file_00000000ed5c8211a215bd90cb86d19f.png"}, {"index": 5, "faction": "群雄", "key": "qunxiong", "path": "mvu/media/lockscreen/file_0000000082cc82119af1704096bb081c.png", "blob_sha": "4f8313ebd62f5bf849d378004a02f2b368fa1ae3", "url": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/mvu/media/lockscreen/file_0000000082cc82119af1704096bb081c.png"}], "mvu_background": {"name": "咩姬×多娜", "path": "mvu/media/background/file_00000000f1188211864d359302685b88.png", "blob_sha": "68c38480c63088f38ecae3e1e75528af9ee17d7b", "url": "https://cdn.jsdelivr.net/gh/3086013261qq-hue/ThreeKingdoms-Musou-Sandbox@904a20d68e6ec84773a46cae023a441df01fbca4/mvu/media/background/file_00000000f1188211864d359302685b88.png"}, "loading_policy": {"transport": "GitHub -> jsDelivr CDN", "pin_commit": true, "embed_base64": false, "lockscreen_preload": "current-and-adjacent-only", "fallback": "dark-ink-vermilion-gold-gradient"}}, "roster": [{"name": "曹操", "faction": "曹魏", "aliases": ["曹操", "孟德", "曹孟德", "魏王", "魏武"]}, {"name": "刘备", "faction": "蜀汉", "aliases": ["刘备", "玄德", "刘玄德", "刘皇叔"]}, {"name": "孙权", "faction": "孙吴", "aliases": ["孙权", "仲谋", "孙仲谋", "吴侯"]}, {"name": "吕布", "faction": "群雄", "aliases": ["吕布", "奉先", "吕奉先", "飞将"]}, {"name": "关羽", "faction": "蜀汉", "aliases": ["关羽", "云长", "关云长", "关二将军"]}, {"name": "张飞", "faction": "蜀汉", "aliases": ["张飞", "翼德", "张翼德"]}, {"name": "赵云", "faction": "蜀汉", "aliases": ["赵云", "子龙", "赵子龙"]}, {"name": "诸葛亮", "faction": "蜀汉", "aliases": ["诸葛亮", "孔明", "诸葛孔明", "卧龙"]}, {"name": "周瑜", "faction": "孙吴", "aliases": ["周瑜", "公瑾", "周公瑾", "大都督"]}, {"name": "司马懿", "faction": "晋", "aliases": ["司马懿", "仲达", "司马仲达"]}, {"name": "孙坚", "faction": "孙吴", "aliases": ["孙坚", "文台", "孙文台", "江东猛虎"]}, {"name": "孙策", "faction": "孙吴", "aliases": ["孙策", "伯符", "孙伯符", "小霸王"]}, {"name": "董卓", "faction": "群雄", "aliases": ["董卓", "仲颖", "董仲颖", "董太师"]}, {"name": "袁绍", "faction": "群雄", "aliases": ["袁绍", "本初", "袁本初"]}, {"name": "张角", "faction": "群雄", "aliases": ["张角", "天公将军", "大贤良师"]}, {"name": "典韦", "faction": "曹魏", "aliases": ["典韦", "恶来", "古之恶来"]}, {"name": "许褚", "faction": "曹魏", "aliases": ["许褚", "仲康", "许仲康", "虎痴"]}, {"name": "张辽", "faction": "曹魏", "aliases": ["张辽", "文远", "张文远"]}, {"name": "马超", "faction": "蜀汉", "aliases": ["马超", "孟起", "马孟起", "锦马超"]}, {"name": "太史慈", "faction": "孙吴", "aliases": ["太史慈", "子义", "太史子义"]}, {"name": "夏侯惇", "faction": "曹魏", "aliases": ["夏侯惇", "元让", "夏侯元让"]}, {"name": "夏侯渊", "faction": "曹魏", "aliases": ["夏侯渊", "妙才", "夏侯妙才"]}, {"name": "徐晃", "faction": "曹魏", "aliases": ["徐晃", "公明", "徐公明"]}, {"name": "张郃", "faction": "曹魏", "aliases": ["张郃", "儁乂", "张儁乂"]}, {"name": "曹仁", "faction": "曹魏", "aliases": ["曹仁", "子孝", "曹子孝"]}, {"name": "郭嘉", "faction": "曹魏", "aliases": ["郭嘉", "奉孝", "郭奉孝"]}, {"name": "荀彧", "faction": "曹魏", "aliases": ["荀彧", "文若", "荀文若"]}, {"name": "贾诩", "faction": "曹魏", "aliases": ["贾诩", "文和", "贾文和"]}, {"name": "庞德", "faction": "曹魏", "aliases": ["庞德", "令明", "庞令明"]}, {"name": "王异", "faction": "曹魏", "aliases": ["王异"]}, {"name": "黄忠", "faction": "蜀汉", "aliases": ["黄忠", "汉升", "黄汉升"]}, {"name": "魏延", "faction": "蜀汉", "aliases": ["魏延", "文长", "魏文长"]}, {"name": "庞统", "faction": "蜀汉", "aliases": ["庞统", "士元", "庞士元", "凤雏"]}, {"name": "徐庶", "faction": "蜀汉", "aliases": ["徐庶", "元直", "徐元直"]}, {"name": "法正", "faction": "蜀汉", "aliases": ["法正", "孝直", "法孝直"]}, {"name": "姜维", "faction": "蜀汉", "aliases": ["姜维", "伯约", "姜伯约"]}, {"name": "刘禅", "faction": "蜀汉", "aliases": ["刘禅", "公嗣", "刘公嗣", "蜀汉后主"]}, {"name": "关平", "faction": "蜀汉", "aliases": ["关平"]}, {"name": "黄月英", "faction": "蜀汉", "aliases": ["黄月英", "月英"]}, {"name": "星彩", "faction": "蜀汉", "aliases": ["星彩"]}, {"name": "鲁肃", "faction": "孙吴", "aliases": ["鲁肃", "子敬", "鲁子敬"]}, {"name": "吕蒙", "faction": "孙吴", "aliases": ["吕蒙", "子明", "吕子明"]}, {"name": "陆逊", "faction": "孙吴", "aliases": ["陆逊", "伯言", "陆伯言"]}, {"name": "甘宁", "faction": "孙吴", "aliases": ["甘宁", "兴霸", "甘兴霸", "锦帆"]}, {"name": "黄盖", "faction": "孙吴", "aliases": ["黄盖", "公覆", "黄公覆"]}, {"name": "周泰", "faction": "孙吴", "aliases": ["周泰", "幼平", "周幼平"]}, {"name": "孙尚香", "faction": "孙吴", "aliases": ["孙尚香", "弓腰姬"]}, {"name": "大乔", "faction": "孙吴", "aliases": ["大乔"]}, {"name": "小乔", "faction": "孙吴", "aliases": ["小乔"]}, {"name": "练师", "faction": "孙吴", "aliases": ["练师"]}, {"name": "司马师", "faction": "晋", "aliases": ["司马师", "子元", "司马子元"]}, {"name": "司马昭", "faction": "晋", "aliases": ["司马昭", "子上", "司马子上"]}, {"name": "邓艾", "faction": "晋", "aliases": ["邓艾", "士载", "邓士载"]}, {"name": "钟会", "faction": "晋", "aliases": ["钟会", "士季", "钟士季"]}, {"name": "诸葛诞", "faction": "晋", "aliases": ["诸葛诞", "公休", "诸葛公休"]}, {"name": "夏侯霸", "faction": "晋", "aliases": ["夏侯霸", "仲权", "夏侯仲权"]}, {"name": "郭淮", "faction": "晋", "aliases": ["郭淮", "伯济", "郭伯济"]}, {"name": "王元姬", "faction": "晋", "aliases": ["王元姬"]}, {"name": "张春华", "faction": "晋", "aliases": ["张春华"]}, {"name": "辛宪英", "faction": "晋", "aliases": ["辛宪英"]}, {"name": "曹丕", "faction": "曹魏", "aliases": ["曹丕", "子桓", "曹子桓"]}, {"name": "甄姬", "faction": "曹魏", "aliases": ["甄姬", "甄宓"]}, {"name": "蔡文姬", "faction": "曹魏", "aliases": ["蔡文姬", "蔡琰", "文姬"]}, {"name": "卞夫人", "faction": "曹魏", "aliases": ["卞夫人"]}, {"name": "曹节", "faction": "曹魏", "aliases": ["曹节"]}, {"name": "邹氏", "faction": "曹魏", "aliases": ["邹氏"]}, {"name": "鲍三娘", "faction": "蜀汉", "aliases": ["鲍三娘"]}, {"name": "关银屏", "faction": "蜀汉", "aliases": ["关银屏"]}, {"name": "夏侯姬", "faction": "蜀汉", "aliases": ["夏侯姬"]}, {"name": "甘夫人", "faction": "蜀汉", "aliases": ["甘夫人"]}, {"name": "糜夫人", "faction": "蜀汉", "aliases": ["糜夫人"]}, {"name": "凌统", "faction": "孙吴", "aliases": ["凌统", "公绩", "凌公绩"]}, {"name": "吴国太", "faction": "孙吴", "aliases": ["吴国太"]}, {"name": "孙鲁班", "faction": "孙吴", "aliases": ["孙鲁班", "大虎"]}, {"name": "孙鲁育", "faction": "孙吴", "aliases": ["孙鲁育", "小虎"]}, {"name": "羊徽瑜", "faction": "晋", "aliases": ["羊徽瑜"]}, {"name": "夏侯徽", "faction": "晋", "aliases": ["夏侯徽"]}, {"name": "貂蝉", "faction": "群雄", "aliases": ["貂蝉"]}, {"name": "吕玲绮", "faction": "群雄", "aliases": ["吕玲绮"]}, {"name": "祝融", "faction": "群雄", "aliases": ["祝融"]}, {"name": "袁术", "faction": "群雄", "aliases": ["袁术", "公路", "袁公路"]}, {"name": "陈宫", "faction": "群雄", "aliases": ["陈宫", "公台", "陈公台"]}, {"name": "华雄", "faction": "群雄", "aliases": ["华雄"]}, {"name": "孟获", "faction": "群雄", "aliases": ["孟获"]}, {"name": "公孙瓒", "faction": "群雄", "aliases": ["公孙瓒", "伯珪", "公孙伯珪", "白马将军"]}, {"name": "董白", "faction": "群雄", "aliases": ["董白"]}, {"name": "何太后", "faction": "群雄", "aliases": ["何太后"], "source_faction": "汉室"}, {"name": "蔡夫人", "faction": "群雄", "aliases": ["蔡夫人"], "source_faction": "群雄·荆州"}, {"name": "樊氏", "faction": "群雄", "aliases": ["樊氏"], "source_faction": "群雄·桂阳"}]};
// Read-only projections. Nothing in this module writes chat, character or MVU variables.
const FACTIONS = ['曹魏', '蜀汉', '孙吴', '晋', '群雄'];
const COLORS = ['#405E8D', '#4F7D63', '#A94436', '#695579', '#846240'];
const zeroAffinity = () => Object.fromEntries(FACTIONS.map(n => [n, {value: 0, delta: 0, reason: '无'}]));
function textOf(m) { return String(m?.message ?? m?.mes ?? m?.content ?? ''); }
function isModel(m) {
  return !!m && m.is_user !== true && m.is_system !== true && !['user', 'system', 'tool'].includes(m.role);
}
function parseFaction(text) {
  let last = null;
  for (const block of String(text).matchAll(/<faction_affinity>\s*([\s\S]*?)\s*<\/faction_affinity>/g)) {
    const lines = block[1].trim().split(/\r?\n/).map(s => s.trim());
    if (lines.length !== 5) continue;
    const out = {}; let valid = true;
    for (let i = 0; i < FACTIONS.length; i++) {
      const match = lines[i].match(/^([^\s:：]+)亲和\s*[:：]\s*([+-]?\d+)\s*\/100\s*\|\s*本回合\s*[:：]\s*([+-]?\d+)\s*\|\s*原因\s*[:：]\s*([^<>\r\n]+)$/);
      if (!match || match[1] !== FACTIONS[i]) { valid = false; break; }
      const value = Number(match[2]), delta = Number(match[3]);
      if (!Number.isSafeInteger(value) || ![0, 1, 3, 5, -1, -5, -10, -50].includes(delta)) { valid = false; break; }
      out[match[1]] = {value: Math.max(-100, Math.min(100, value)), delta, reason: match[4].trim()};
    }
    if (valid) last = out;
  }
  return last;
}
function latestFaction(messages, fallback = zeroAffinity()) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (!isModel(messages[i])) continue;
    const value = parseFaction(textOf(messages[i]));
    if (value) return value;
  }
  return fallback;
}
function phase(n) {
  return n <= -80 ? '不死不休' : n <= -50 ? '敌视' : n <= -20 ? '对立' : n < 0 ? '警戒' : n < 20 ? '中立' : n < 40 ? '友善' : n < 60 ? '认可' : n < 80 ? '信赖' : n < 100 ? '同盟' : '生死与共';
}
function nativeRelations(messages, roster) {
  // Rebuild from native <affinity> history, so dead/absent characters remain encountered.
  // This Map is a disposable view of native records, never an independent affinity store.
  const aliases = new Map();
  roster.forEach(r => [r.name, ...r.aliases].forEach(a => { if (!aliases.has(a)) aliases.set(a, r.name); }));
  const result = new Map();
  for (const m of messages) {
    if (!isModel(m)) continue;
    for (const b of textOf(m).matchAll(/<affinity>\s*([\s\S]*?)<\/affinity>/g)) {
      const clean = b[1].replace(/<!--[\s\S]*?-->/g, '');
      for (const line of clean.split(/\r?\n/)) {
        // 咩咩预设 0.9.0: 角色名 💞好感: 数值｜🤝信任: 数值｜🔗关系: 名词
        const v = line.match(/^\s*(?:[-*]\s*)?([^<>｜|]+?)\s*(?:💞|♥|❤️)?\s*好感(?:度)?\s*[:：]\s*([+-]?\d+(?:\.\d+)?)(?=\s*(?:[｜|]|$))/u);
        if (!v) continue;
        const name = aliases.get(v[1].trim());
        if (name && Number.isFinite(Number(v[2]))) result.set(name, Number(v[2]));
      }
    }
  }
  return result;
}


function createPanel(host, config, state, onState) {
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

})();