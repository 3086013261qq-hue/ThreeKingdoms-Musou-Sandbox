# ThreeKingdoms-Musou-Sandbox

原创三国角色卡 / 世界书工程。

## 正式基线
- 制卡工具：咩咩制卡·全栈 v1.0.0
- 最终卡格式：chara_card_v3
- 世界书：内嵌 character_book
- 运行预设：咩咩预设 ver 0.9.0（不修改预设本体）
- Git：`main` 为唯一正式分支

## 项目方向
- 剧情与历史骨架：以《三国演义》为主线时间线来源
- 人物表现：参考《真·三国无双》式英雄化、华丽化、强战力表现
- 世界设定：核心人物全员娘化

## 咩咩全栈资料分区
正式世界书资料仅维护四类：
1. 核心设定
2. 时间线
3. 角色
4. 地点

角色条目严格采用 `chara-v1`；角色能力另拆为 `<核心设定:角色名·能力>`；时间线采用 `<world_timeline>` 与 A/A1/A2/B... 事件结构。

## 仓库目录
- `docs/`：施工规范与交接单
- `sources/`：资料来源、检索索引与来源说明
- `worldbook/settings/`：核心设定与角色能力配套
- `worldbook/characters/main/`：主要角色
- `worldbook/characters/other/`：其他角色
- `worldbook/locations/`：地点
- `timeline/`：三国演义主线时间线
- `mvu/`：MVU 源码与接线
- `manifest/`：清单与装配映射
- `qa/`：QA 与审计报告
- `build/`：候选 JSON / PNG 等构建产物

禁止从零另造一套格式；后续施工直接服从咩咩制卡·全栈 v1.0.0 母版。