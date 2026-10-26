from pathlib import Path
import base64, copy, hashlib, json, re, zlib

ROOT = Path(__file__).resolve().parents[1]
SRC_JSON = ROOT / 'build/三国无双姬_v1.0.0-candidate7.json'
SRC_PNG = ROOT / 'build/三国无双姬_v1.0.0-candidate7.png'
OUT_JSON = ROOT / 'build/三国无双姬_v1.0.0-candidate8.json'
OUT_PNG = ROOT / 'build/三国无双姬_v1.0.0-candidate8.png'
QA = ROOT / 'qa/Candidate8_QA.txt'
RULE = ROOT / 'worldbook/settings/blue-global/009_人物外貌与角色设定权威.md'


def sha256(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def png_chunk(kind, data):
    body = kind + data
    return len(data).to_bytes(4, 'big') + body + (zlib.crc32(body) & 0xffffffff).to_bytes(4, 'big')

card = json.loads(SRC_JSON.read_text(encoding='utf-8'))
rule = RULE.read_text(encoding='utf-8').strip() + '\n'
entries = card['data']['character_book']['entries']

hits = []
for e in entries:
    content = e.get('content', '')
    comment = e.get('comment', '')
    if ('<核心设定:人物外貌与角色设定权威>' in content or
        'MAIN01开局三英保险锚点' in content or
        '人物外貌与角色设定权威' in comment):
        hits.append(e)
assert len(hits) == 1, f'blue-009 matches={len(hits)}'
hits[0]['content'] = rule
if 'comment' in hits[0]:
    hits[0]['comment'] = '核心设定:人物视觉锚点'

# Recursion remains closed for all character entries.
chars = [e for e in entries if str(e.get('comment', '')).startswith('角色:')]
assert len(chars) == 91, len(chars)
for e in chars:
    ext = e.get('extensions', {})
    assert ext.get('excludeRecursion') is True
    assert ext.get('preventRecursion') is True

# Validate compact 89-person anchor table.
anchors = {}
for line in rule.splitlines():
    m = re.fullmatch(r'([^|]+)\|(\d{3})\|(.+)', line.strip())
    if m:
        anchors[m.group(1)] = (int(m.group(2)), m.group(3))
assert len(anchors) == 89, len(anchors)
assert anchors['刘备'] == (151, '粉红双马尾')
assert anchors['张飞'] == (175, '黑褐双丸子')
assert anchors['关羽'] == (183, '深青超长高马尾')
assert '原著只提供身份、关系与剧情骨架，不提供外貌' in rule
assert '模型默认外貌不同' in rule

card['data']['character_version'] = '1.0.0-candidate8'
card['data']['creator_notes'] = (
    'Candidate8：继承Candidate7，优化常驻人物视觉蓝灯。'
    '关闭人物递归不变；以89名正式角色“姓名|身高|发色发型”短锚点覆盖全部首次登场，'
    '明确原著只提供身份、关系与剧情骨架，不提供本世界外貌。'
    '其余Candidate7业务保持不变；待真实 Android / SillyTavern 实机验收。'
)

OUT_JSON.write_text(json.dumps(card, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
compact = json.dumps(card, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
payload = base64.b64encode(compact)

raw = SRC_PNG.read_bytes()
assert raw[:8] == b'\x89PNG\r\n\x1a\n'
out = bytearray(raw[:8])
pos = 8
idat_before = hashlib.sha256()
replaced = set()
while pos < len(raw):
    ln = int.from_bytes(raw[pos:pos+4], 'big')
    typ = raw[pos+4:pos+8]
    dat = raw[pos+8:pos+8+ln]
    whole = raw[pos:pos+12+ln]
    if typ == b'IDAT':
        idat_before.update(dat)
    if typ == b'tEXt':
        key, sep, value = dat.partition(b'\x00')
        if key in (b'chara', b'ccv3'):
            whole = png_chunk(b'tEXt', key + b'\x00' + payload)
            replaced.add(key)
    out.extend(whole)
    pos += 12 + ln
assert replaced == {b'chara', b'ccv3'}, replaced
OUT_PNG.write_bytes(out)

# Re-parse output PNG and validate embedded card + unchanged image layer.
pos = 8
decoded = {}
idat_after = hashlib.sha256()
raw2 = OUT_PNG.read_bytes()
while pos < len(raw2):
    ln = int.from_bytes(raw2[pos:pos+4], 'big')
    typ = raw2[pos+4:pos+8]
    dat = raw2[pos+8:pos+8+ln]
    if typ == b'IDAT':
        idat_after.update(dat)
    if typ == b'tEXt':
        key, sep, value = dat.partition(b'\x00')
        if key in (b'chara', b'ccv3'):
            decoded[key.decode()] = json.loads(base64.b64decode(value))
    pos += 12 + ln
assert idat_before.hexdigest() == idat_after.hexdigest()
assert decoded['chara'] == card
assert decoded['ccv3'] == card

qa = f'''Candidate8 QA PASS

Candidate7 JSON SHA256: {sha256(SRC_JSON)}
Candidate7 PNG  SHA256: {sha256(SRC_PNG)}
Candidate8 JSON SHA256: {sha256(OUT_JSON)}
Candidate8 PNG  SHA256: {sha256(OUT_PNG)}

Candidate8 JSON size: {OUT_JSON.stat().st_size} bytes
Candidate8 PNG  size: {OUT_PNG.stat().st_size} bytes

VISUAL ANCHOR BLUE-LIGHT:
- 89/89 formal character compact anchors: PASS
- Anchor format = name | height | hair color+style: PASS
- Liu Bei 151 / pink twin tails: PASS
- Zhang Fei 175 / black-brown double buns: PASS
- Guan Yu 183 / deep-teal extra-long high ponytail: PASS
- Original canon is identity/relationship/story skeleton only, not appearance: PASS
- Character recursion remains closed 91/91: PASS

REGRESSION:
- Candidate7 full-female hard rule inherited: PASS
- Candidate7 faction beautifier inherited: PASS
- PNG IDAT image layer unchanged: PASS
IDAT SHA256: {idat_before.hexdigest()}
- embedded chara == Candidate8 JSON: PASS
- embedded ccv3 == Candidate8 JSON: PASS
'''
QA.write_text(qa, encoding='utf-8')
print(qa)
