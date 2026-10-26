# mvu

MVU 源码、schema、桥接与 UI 装配区。

正式装配沿用咩咩全栈 v1.0.0 的 MVU 九件套接口，不修改咩咩预设本体。

## 当前冻结设计

业务规格:
- `001_MVU业务冻结_v1.0.md`

视觉规格:
- `002_MVU美化冻结_v1.0.md`

远程媒体:
- `media-manifest.v1.json`
- 五阵营锁屏: `media/lockscreen/`
- 咩姬×多娜 MVU 背景: `media/background/`

## 固定结构

- 锁屏: 5 阵营画廊（曹魏 / 蜀汉 / 孙吴 / 晋 / 群雄）
- MVU Page 1: 阵营亲和
- MVU Page 2: 名姬风华录

## 数据原则

- 阵营亲和唯一真值: 最新合法 `<faction_affinity>`。
- 角色好感唯一真值: 咩咩原生人物关系/好感系统。
- 禁止建立第二套角色好感。
- 名姬风华录只镜像 89 名正式角色的邂逅状态与咩咩好感度。
- 多娜、咩姬为彩蛋，不计入 89 名收藏。

当前状态: `DESIGN_FROZEN_RUNTIME_PENDING`
