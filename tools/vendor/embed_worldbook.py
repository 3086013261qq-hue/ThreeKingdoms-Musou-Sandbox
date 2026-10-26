# -*- coding: utf-8 -*-
"""世界书嵌卡：把填好的世界书 JSON（酒馆原生/母版格式）转成内嵌世界书的整卡 PNG。

解决"导入卡后世界书没绑定角色卡"：单独导入的世界书在酒馆里只会变成独立 Lorebook，
不会自动绑到角色上。用本脚本把世界书嵌进角色卡，导入 PNG 即自动绑定。

用法：
    python 世界书嵌卡.py <世界书.json> [--name 卡名] [--greeting 开场白.txt ...] [-i 立绘.png] [-o 输出.png]

输入格式：{"entries": {...}}（酒馆导出的原生世界书，母版填制后的导出物同此格式）
输出：同目录 <卡名>.json（chara_card_v3，内嵌 character_book）+ <卡名>.png（直接导入酒馆）
"""
import argparse
import base64
import io
import json
import os
import struct
import sys
import zlib

POS_MAP = {0: "before_char", 1: "after_char", 2: "before_an", 3: "after_an", 4: "at_depth", 5: "at_depth"}
# 原生条目里需要搬进 ccv3 extensions 的 ST 专有字段
EXT_FIELDS = ("position", "depth", "role", "probability", "useProbability", "sticky", "cooldown",
              "delay", "excludeRecursion", "preventRecursion", "delayUntilRecursion", "scanDepth",
              "caseSensitive", "matchWholeWords", "useGroupScoring", "selectiveLogic", "automationId",
              "triggers", "vectorized", "ignoreBudget", "group", "groupOverride", "groupWeight",
              "outletName", "displayIndex", "matchPersonaDescription", "matchCharacterDescription",
              "matchCharacterPersonality", "matchCharacterDepthPrompt", "matchScenario", "matchCreatorNotes")


def convert_entry(e, idx):
    """原生条目 -> ccv3 条目（ST 专有字段全部保留进 extensions，行为零丢失）。"""
    ext = {}
    for k in EXT_FIELDS:
        if k in e and k != "position":
            ext[k] = e[k]
    if "position" in e:
        ext["position"] = e["position"]  # 数值位，ST 优先读 extensions.position
    if isinstance(e.get("extensions"), dict):
        ext.update(e["extensions"])
    pos_num = e.get("position", 1)
    return {
        "id": idx,
        "keys": list(e.get("key", [])),
        "secondary_keys": list(e.get("keysecondary", [])),
        "comment": e.get("comment", ""),
        "content": e.get("content", ""),
        "constant": bool(e.get("constant", False)),
        "selective": bool(e.get("selective", True)),
        "insertion_order": e.get("order", 100),
        "enabled": not bool(e.get("disable", False)),
        "position": POS_MAP.get(pos_num, "after_char"),
        "extensions": ext,
        "use_regex": bool(e.get("use_regex", e.get("useRegex", False))),
    }


def read_worldbook(path):
    d = json.load(io.open(path, encoding="utf-8"))
    raw = d.get("entries")
    if isinstance(raw, dict):
        items = [raw[k] for k in sorted(raw, key=lambda x: int(x))]
    elif isinstance(raw, list):
        items = raw
    else:
        sys.exit("错误：JSON 里没有 entries——请用酒馆导出的世界书文件")
    return items


def make_placeholder_png(w=400, h=600):
    raw = b''.join(b'\x00' + b'\x33\x36\x3e' * w for _ in range(h))
    def chunk(ctype, data):
        return struct.pack('>I', len(data)) + ctype + data + struct.pack('>I', zlib.crc32(ctype + data) & 0xffffffff)
    return (b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(raw, 9)) + chunk(b'IEND', b''))


def embed_png(png_bytes, payload_b64):
    pos, chunks = 8, []
    while pos < len(png_bytes):
        n = struct.unpack('>I', png_bytes[pos:pos+4])[0]
        t = png_bytes[pos+4:pos+8]
        chunks.append((t, png_bytes[pos+8:pos+8+n]))
        pos += 12 + n
        if t == b'IEND':
            break
    out = [b'\x89PNG\r\n\x1a\n']
    def emit(t, body):
        out.append(struct.pack('>I', len(body)) + t + body + struct.pack('>I', zlib.crc32(t + body) & 0xffffffff))
    inserted = False
    for t, body in chunks:
        if not inserted and t == b'IDAT':
            emit(b'tEXt', b'chara\x00' + payload_b64)
            emit(b'tEXt', b'ccv3\x00' + payload_b64)
            inserted = True
        emit(t, body)
    if not inserted:
        emit(b'tEXt', b'chara\x00' + payload_b64)
        emit(b'tEXt', b'ccv3\x00' + payload_b64)
    return b''.join(out)


def main():
    ap = argparse.ArgumentParser(description='世界书 → 内嵌整卡 PNG（导入即绑定）')
    ap.add_argument('book', help='世界书 JSON（酒馆原生/母版格式）')
    ap.add_argument('--name', help='卡名（缺省取文件名）')
    ap.add_argument('--greeting', action='append', default=[], help='开场白文本文件，可多次：第1个为主开场，其余为备选')
    ap.add_argument('-i', '--image', help='立绘 PNG（缺省纯色占位图）')
    ap.add_argument('-o', '--output', help='输出 PNG 路径（缺省与卡名同名）')
    args = ap.parse_args()

    name = args.name or os.path.splitext(os.path.basename(args.book))[0]
    items = read_worldbook(args.book)
    entries = [convert_entry(e, i) for i, e in enumerate(items)]
    greetings = [io.open(g, encoding='utf-8').read().strip() for g in args.greeting]

    card = {"spec": "chara_card_v3", "spec_version": "3.0", "data": {
        "name": name, "description": "", "personality": "", "scenario": "",
        "first_mes": greetings[0] if greetings else "",
        "mes_example": "", "creator_notes": "由咩咩制卡·世界书嵌卡生成",
        "system_prompt": "", "post_history_instructions": "",
        "alternate_greetings": greetings[1:],
        "tags": ["咩咩制卡"], "creator": "", "character_version": "1.0",
        "extensions": {},
        "character_book": {"name": name + "世界书", "entries": entries},
    }}
    jpath = os.path.join(os.getcwd(), name + ".json")
    json.dump(card, io.open(jpath, "w", encoding="utf-8", newline="\n"), ensure_ascii=False, indent=1)

    img = io.open(args.image, 'rb').read() if args.image else make_placeholder_png()
    payload = base64.b64encode(json.dumps(card, ensure_ascii=False).encode('utf-8'))
    out = args.output or os.path.splitext(jpath)[0] + '.png'
    io.open(out, 'wb').write(embed_png(img, payload))

    on = sum(1 for e in entries if e["enabled"])
    keyed = sum(1 for e in entries if e["keys"])
    print(f"完成：{out}")
    print(f"  卡 JSON：{jpath}（内嵌世界书 {len(entries)} 条，启用 {on} 条，带主要关键字 {keyed} 条，开场白 {len(greetings)} 条）")
    print(f"  导入酒馆后世界书自动绑定到本卡；原世界书如已单独导入，可在世界书页删除以免重复注入")


if __name__ == '__main__':
    main()
