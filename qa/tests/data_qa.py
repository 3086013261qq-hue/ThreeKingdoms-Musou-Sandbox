#!/usr/bin/env python3
import importlib.util,json,re,hashlib,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];sys.path.insert(0,str(ROOT/'tools'))
import build_candidate as b
card,mapping=b.assemble();entries=card['data']['character_book']['entries']
for path,want in b.load('qa/frozen-source-hashes.json')['files'].items():assert b.sha(path)==want,path
for m in mapping:
 e=next(e for e in entries if e['extensions'].get('tkm_source')==m['source'])
 assert e['content']==b.read(m['source']),m['source']
 assert e['keys']==m['keys']
 assert e['insertion_order']==m['order']
 assert e['enabled']==m['enabled']
assert len(mapping)==310
assert sum(m['source'].startswith('worldbook/characters/main/') for m in mapping)==89
assert sum(m['source'].startswith('worldbook/settings/green-triggered/characters/') for m in mapping)==89
assert sum(m['source'].startswith('worldbook/settings/blue-global/') for m in mapping)==8
assert sum(m['source'].startswith('worldbook/locations/') for m in mapping)==60
assert len(b.load('manifest/green-triggered-settings.v1.json')['entries'])==50
assert sum(len(re.findall(r'^-事件[A-Z]\d*:',e['content'],re.M)) for e in entries if e['comment'].startswith('时间线-'))==1121
assert sum(e['enabled'] for e in entries if e['comment'].startswith('时间线-'))==1
assert len([e for e in entries if e['comment'].startswith('时间线-')])==10
assert not any('MAIN11' in e['comment'] for e in entries)
assert len({e['id'] for e in entries})==len(entries)
assert len({e['comment'] for e in entries})==len(entries)
assert len(b.load('mvu/roster.json'))==89
assert all(r['name'] not in ['多娜','咩娘'] for r in b.load('mvu/roster.json'))
assert entries==b.pack.sort_entries(entries)
for e in entries:
 c=e['comment'];o=e['insertion_order']
 if c.startswith('核心设定:'):assert 301<o<400
 if c.startswith('角色:') and e['extensions'].get('tkm_source','').startswith('worldbook/characters/main'):assert 201<o<300
 if c.startswith('地点:'):assert 1<o<100
 if not e['constant']:assert e['keys']
for x in b.load('manifest/blue-global-settings.v1.json')['entries']+b.load('manifest/green-triggered-settings.v1.json')['entries']:
 e=next(e for e in entries if e['extensions'].get('tkm_source')==x['source']);assert e['insertion_order']==x['order_hint'];assert e['keys']==x['keywords']
scripts=card['data']['extensions']['tavern_helper']['scripts'];assert [s['name'] for s in scripts]==['MVU','MVU ZOD','变量状态栏']
assert scripts[0]['content']=="import 'https://testingcf.jsdelivr.net/gh/MagicalAstrogy/MagVarUpdate/artifact/bundle.js';"
assert '</script>' not in scripts[2]['content']
assert not re.search(r"role\s*={2,3}\s*['\"]assistant",scripts[2]['content'])
assert '.passthrough()' in scripts[1]['content']
assert not re.search(r'\b(?:setVariables|replaceVariables|updateVariables)\s*\(',scripts[2]['content'])
assert len(card['data']['extensions']['regex_scripts'])==3
media=b.load('mvu/media-manifest.v1.json')
for image in media['lockscreen']+[media['mvu_background']]:
 assert '@'+media['source_commit']+'/' in image['url']
 assert '@main' not in image['url']
 assert 'data:' not in image['url']
 blob=hashlib.sha1(b'blob '+str((ROOT/image['path']).stat().st_size).encode()+b'\0'+(ROOT/image['path']).read_bytes()).hexdigest();assert blob==image['blob_sha']
if len(sys.argv)>1:
 saved=json.loads((ROOT/sys.argv[1]).read_text());assert saved['spec']=='chara_card_v3';assert saved['data']['character_book']['entries']==entries
 for p in ['first_mes','alternate_greetings','post_history_instructions']:assert saved['data'][p]==card['data'][p]
print('PASS: frozen hashes; 89+89+8+50+60+10+4 eggs; 1121 nodes; byte-exact payloads; nine-piece wiring; 6 commit-pinned media blobs; native order sections')
