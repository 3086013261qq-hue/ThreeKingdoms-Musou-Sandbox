#!/usr/bin/env python3
import base64,hashlib,json,struct,subprocess,zlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
png=ROOT/'build/三国无双姬_v1.0.0-candidate1.png';source=ROOT/'build/三国无双姬_v1.0.0-candidate1.json';cover=ROOT/'build/三国无双姬_cover-optimized.png'
master='mvu/media/cover/三国无双姬_群雄战场争锋.png';baseline='002d6280a977be44b1425d336475eb94bbc5a325'
def chunks(p):
 b=p.read_bytes();assert b[:8]==b'\x89PNG\r\n\x1a\n';pos=8;out=[]
 while pos<len(b):
  length=struct.unpack('>I',b[pos:pos+4])[0];tag=b[pos+4:pos+8];body=b[pos+8:pos+8+length];crc=struct.unpack('>I',b[pos+8+length:pos+12+length])[0]
  assert zlib.crc32(tag+body)&0xffffffff==crc
  out.append((tag,body));pos+=12+length
 assert pos==len(b) and out[-1][0]==b'IEND';return out
parts=chunks(png);image=chunks(cover);card=json.loads(source.read_text());texts={}
for tag,body in parts:
 if tag==b'tEXt':
  key,value=body.split(b'\0',1)
  if key in [b'chara',b'ccv3']:
   assert key not in texts
   texts[key]=json.loads(base64.b64decode(value,validate=True))
assert texts[b'chara']==texts[b'ccv3']==card
assert [(t,b) for t,b in parts if t in [b'IHDR',b'IDAT']]==[(t,b) for t,b in image if t in [b'IHDR',b'IDAT']]
assert struct.unpack('>II',dict(image)[b'IHDR'][:8])==(768,1024)
original=subprocess.check_output(['git','show',baseline+':'+master],cwd=ROOT);assert (ROOT/master).read_bytes()==original
summary={'status':'PASS','real_android_sillytavern':'NOT_TESTED','optimized_cover':{'dimensions':[768,1024],'bytes':cover.stat().st_size,'master_unchanged':True,'resample':'LANCZOS','crop':False},'candidate_json':{'bytes':source.stat().st_size,'sha256':hashlib.sha256(source.read_bytes()).hexdigest()},'candidate_png':{'bytes':png.stat().st_size,'sha256':hashlib.sha256(png.read_bytes()).hexdigest(),'chara_and_ccv3_equal_candidate_json':True,'all_chunk_crc_valid':True,'pixel_chunks_equal_optimized_cover':True,'entries':len(card['data']['character_book']['entries'])}}
(ROOT/'qa/candidate1-png.qa.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');print(json.dumps(summary,ensure_ascii=False))
