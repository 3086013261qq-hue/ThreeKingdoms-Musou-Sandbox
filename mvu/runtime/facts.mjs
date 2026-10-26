// Read-only projections. Nothing in this module writes chat, character or MVU variables.
export const FACTIONS = ['曹魏', '蜀汉', '孙吴', '晋', '群雄'];
export const COLORS = ['#405E8D', '#4F7D63', '#A94436', '#695579', '#846240'];
export const zeroAffinity = () => Object.fromEntries(FACTIONS.map(n => [n, {value: 0, delta: 0, reason: '无'}]));
export function textOf(m) { return String(m?.message ?? m?.mes ?? m?.content ?? ''); }
export function isModel(m) {
  return !!m && m.is_user !== true && m.is_system !== true && !['user', 'system', 'tool'].includes(m.role);
}
export function parseFaction(text) {
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
export function latestFaction(messages, fallback = zeroAffinity()) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (!isModel(messages[i])) continue;
    const value = parseFaction(textOf(messages[i]));
    if (value) return value;
  }
  return fallback;
}
export function phase(n) {
  return n <= -80 ? '不死不休' : n <= -50 ? '敌视' : n <= -20 ? '对立' : n < 0 ? '警戒' : n < 20 ? '中立' : n < 40 ? '友善' : n < 60 ? '认可' : n < 80 ? '信赖' : n < 100 ? '同盟' : '生死与共';
}
export function nativeRelations(messages, roster) {
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
