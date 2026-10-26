#!/usr/bin/env python3
"""Assemble frozen sources through the unmodified 咩咩全栈 v1.0.0 templates/tools."""
import argparse, copy, hashlib, importlib.util, json, re, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(p): return (ROOT/p).read_text(encoding='utf-8')
def load(p): return json.loads(read(p))
def sha(p): return hashlib.sha256((ROOT/p).read_bytes()).hexdigest()
def vendor(name,file):
 spec=importlib.util.spec_from_file_location(name,ROOT/file);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
embed=vendor('miemie_embed','tools/vendor/embed_worldbook.py')
pack=vendor('miemie_pack','tools/vendor/package_card.py')

def bundle():
 config={'css':read('mvu/ui/panel.css'),'media':load('mvu/media-manifest.v1.json'),'roster':load('mvu/roster.json')}
 def module(p):
  s=re.sub(r'^import .*?;\s*$', '',read(p),flags=re.M)
  return re.sub(r'\bexport\s+(?=(?:const|function|class)\b)','',s)
 return '(() => {\nconst CONFIG = '+json.dumps(config,ensure_ascii=False)+';\n'+module('mvu/runtime/facts.mjs')+'\n'+module('mvu/ui/panel.mjs')+'\n'+read('mvu/runtime/bridge.mjs')+'\n})();'

def assemble():
 template=load('tools/vendor/worldbook-template.json')['entries']
 mvu=load('tools/vendor/mvu-card-template.json')
 result=[]; mapping=[]
 def base(idx): return copy.deepcopy(template[str(idx)])
 def add(idx,comment,content,order,keys=(),constant=False,enabled=True,source=None,regex=False):
  e=base(idx);e.update(comment=comment,content=content,order=order,key=list(keys),keysecondary=[],constant=constant,disable=not enabled,selective=False,use_regex=regex)
  # Keep trigger lookup within two previous messages and out of recursive lore scanning.
  e.update(matchWholeWords=False,excludeRecursion=True,preventRecursion=True)
  e['extensions'].update(match_whole_words=False,exclude_recursion=True,prevent_recursion=True,scan_depth=2)
  out=embed.convert_entry(e,len(result)); result.append(out)
  if source:
   out['extensions']['tkm_source']=source
   mapping.append({'source':source,'sha256':sha(source),'comment':comment,'order':order,'keys':list(keys),'constant':constant,'enabled':enabled})
  return out
 # The mother book's fixed wrappers and disabled native memory slots are retained.
 for idx in [0,1,2,3,4,5,6]:
  e=base(idx)
  if idx in [0,1,5,6]:
   if idx: e['content']=''
  result.append(embed.convert_entry(e,len(result)))
 for p in sorted((ROOT/'manifest').glob('timeline-main*.json')):
  meta=json.loads(p.read_text()); src=meta['files']['timeline'];vol=meta['volume']
  add(7,'时间线-'+vol+'-'+meta['title'],read(src),454,constant=True,enabled=vol=='MAIN01',source=src)
 # No new plot drivers or parallel state engines: preset 0.9.0 retains those duties.
 for idx in [10,11,14,15]:
  e=base(idx); e['content']='';result.append(embed.convert_entry(e,len(result)))
 for x in load('manifest/blue-global-settings.v1.json')['entries']:
  add(16,'核心设定:'+x['name'],read(x['source']),x['order_hint'],constant=True,source=x['source'])
 for x in load('manifest/green-triggered-settings.v1.json')['entries']:
  add(16,'核心设定:'+x['name'],read(x['source']),x['order_hint'],x['keywords'],source=x['source'])
 formal=[];eggs=[]
 for p in sorted((ROOT/'manifest').glob('character-batch*.json')):
  meta=json.loads(p.read_text());formal.extend(meta.get('entries',meta.get('formal',[])));eggs.extend(meta.get('easter_eggs',[]))
 assert len(formal)==89 and len(eggs)==2
 # Assembly-only order allocation: all ability entries stay inside the native core-setting section.
 # Original relative sequence, names, content and keys remain exact; frozen files are untouched.
 for i,x in enumerate(formal+eggs):
  add(16,'核心设定:'+x['name']+'·能力',read(x['ability_source']),330-i*28//90,x['ability_keywords'],source=x['ability_source'])
 for idx in [17,18]:
  e=base(idx);e['content']='';result.append(embed.convert_entry(e,len(result)))
 for i,x in enumerate(formal):
  out=add(19,'角色:'+x['name'],read(x['character_source']),299-i,x['ability_keywords'],source=x['character_source'])
  if x['name'] not in out['keys']: out['keys'].insert(0,x['name'])
  out['extensions'].update(excludeRecursion=False,exclude_recursion=False,preventRecursion=True,prevent_recursion=True)
 for idx in [20,21]:
  e=base(idx);e['content']='';result.append(embed.convert_entry(e,len(result)))
 for i,x in enumerate(eggs):
  add(22,'角色:'+x['name'],read(x['character_source']),199-i,x['ability_keywords'],source=x['character_source'])
 for idx in [23,24]:
  e=base(idx);e['content']='';result.append(embed.convert_entry(e,len(result)))
 for p in sorted((ROOT/'manifest').glob('location-batch*.json')):
  for x in json.loads(p.read_text())['entries']:
   add(25,'地点:'+x['name'],read(x['source']),x['order_hint']-1,x['keywords'],source=x['source'])
 e=base(26);e['content']='';result.append(embed.convert_entry(e,len(result)))
 prompt_paths=['mvu/prompts/update.yaml','mvu/prompts/output.yaml','mvu/prompts/list.txt','mvu/schema/initvar.yaml']
 for e,p in zip(copy.deepcopy(mvu['data']['character_book']['entries']),prompt_paths):
  e['content']=read(p);result.append(e)
 data=copy.deepcopy(mvu['data']);greetings=load('card/openings.json')
 data.update(name='三国无双姬',description='',personality='',scenario='',first_mes=greetings[0],alternate_greetings=greetings[1:],mes_example='',system_prompt='',post_history_instructions=read('mvu/prompts/faction-output.txt'),creator='多娜',character_version='1.0.0-candidate1',tags=['三国无双姬','咩咩制卡','沙盒'],creator_notes='Candidate1：待真实 Android / SillyTavern 实机验收。需要酒馆助手并启用卡内脚本和正则。内嵌世界书自动绑定；时间线MAIN01默认开启，MAIN02～MAIN10内嵌且关闭，按咩咩原生时间线多选一使用，不由MVU推进。')
 data['character_book']={'name':'三国无双姬世界书','entries':result}
 scripts=data['extensions']['tavern_helper']['scripts']
 scripts[0]['content']=read('mvu/runtime/MVU.js').strip()
 scripts[1]['content']=read('mvu/schema/MVU_ZOD.js')
 scripts[2]['content']=bundle()
 scripts[2]['info']='五阵营锁屏、阵营亲和、名姬风华录；只读聊天原文，挂最新AI楼层。'
 # Native nine-piece cleanup regexes plus a display-only faction block hider.
 data['extensions']['regex_scripts'].append({'id':'tkm-hide-faction','scriptName':'[三国无双姬]阵营标签仅隐藏显示','findRegex':'/<faction_affinity>\\s*[\\s\\S]*?<\\/faction_affinity>\\s*/g','replaceString':'','trimStrings':[],'placement':[2],'disabled':False,'markdownOnly':True,'promptOnly':False,'runOnEdit':True,'substituteRegex':0,'minDepth':None,'maxDepth':None})
 data['extensions']['world']='三国无双姬世界书'
 data['extensions']['tkm_build']={'baseline':'002d6280a977be44b1425d336475eb94bbc5a325','toolkit':'咩咩制卡·全栈 v1.0.0','preset':'0.9.0','media_commit':load('mvu/media-manifest.v1.json')['source_commit'],'source_commit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=ROOT,text=True).strip(),'cover_master':'mvu/media/cover/三国无双姬_群雄战场争锋.png','cover_master_sha256':sha('mvu/media/cover/三国无双姬_群雄战场争锋.png')}
 warnings,n=pack.finalize_book(data)
 assert not warnings,warnings
 return {'spec':'chara_card_v3','spec_version':'3.0','data':data},mapping

def write_json(path,data): path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
def main():
 ap=argparse.ArgumentParser();ap.add_argument('stage',choices=['source','json','png']);args=ap.parse_args()
 if args.stage in ['source','json']:
  card,mapping=assemble()
  if args.stage=='source':
   write_json(ROOT/'qa/assembly-map.json',mapping)
   (ROOT/'qa/statusbar-bundle.js').write_text(card['data']['extensions']['tavern_helper']['scripts'][2]['content'])
   print('Source assembled:',len(card['data']['character_book']['entries']),'entries;',len(mapping),'byte-preserved source payloads')
  else:
   path=ROOT/'build/三国无双姬_v1.0.0-candidate1.json';write_json(path,card);print(path.name,path.stat().st_size,'bytes')
 else:
  from PIL import Image
  master=ROOT/'mvu/media/cover/三国无双姬_群雄战场争锋.png';before=hashlib.sha256(master.read_bytes()).hexdigest()
  cover=ROOT/'build/三国无双姬_cover-optimized.png'
  with Image.open(master) as im:
   assert im.width*4==im.height*3
   im.convert('RGB').resize((768,1024),Image.Resampling.LANCZOS).save(cover,optimize=True,compress_level=9)
  assert hashlib.sha256(master.read_bytes()).hexdigest()==before
  path=ROOT/'build/三国无双姬_v1.0.0-candidate1.json';card=json.loads(path.read_text())
  png=pack.build(pack.read_chunks(cover.read_bytes()),__import__('base64').b64encode(json.dumps(card,ensure_ascii=False).encode()))
  out=ROOT/'build/三国无双姬_v1.0.0-candidate1.png';out.write_bytes(png)
  print('Cover',cover.stat().st_size,'bytes; Candidate PNG',len(png),'bytes')
if __name__=='__main__':main()
