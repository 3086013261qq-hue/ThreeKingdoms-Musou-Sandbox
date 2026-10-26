# 绿灯 Batch05｜无双武人与战场法则 QA

## 范围
- `worldbook/settings/green-triggered/battlefield/001_攻城与守城.md`
- `worldbook/settings/green-triggered/battlefield/002_先登夺旗.md`
- `worldbook/settings/green-triggered/battlefield/003_战阵压制.md`
- `worldbook/settings/green-triggered/battlefield/004_围攻强者.md`
- `worldbook/settings/green-triggered/battlefield/005_士气崩溃.md`
- `worldbook/settings/green-triggered/battlefield/006_战场伤亡与救治.md`
- `worldbook/settings/green-triggered/battlefield/007_撤退追击与断后.md`
- `manifest/green-triggered-settings.v1.json`

## 检查结果
- [PASS] 七条正文均使用咩咩制卡·全栈 v1.0.0 的 `<核心设定:名称>...</核心设定:名称>` 格式。
- [PASS] 七条均为蓝灯 `004_无双武人与战场法则` 的关键词触发展开，没有把宏观战争规则复制成第二套蓝灯。
- [PASS] `攻城与守城` 保留城墙、城门、工程、守军、粮草、围困与持续作战的战略价值，高武者不能一击让整套城防失效。
- [PASS] `先登夺旗` 被独立定义为高风险军功：先登、夺旗、立旗、夺门可制造突破支点与士气冲击，但不会自动结束战斗。
- [PASS] `战阵压制` 与 `围攻强者` 明确军势依靠纪律、队形、远程火力、轮换和封锁形成压力，而非普通士卒突然获得不合理战力。
- [PASS] `士气崩溃` 将斩将、夺旗、断粮、援军和军旗等战场事实与军心变化相连，使个人武勇能够合理影响大规模战局。
- [PASS] `战场伤亡与救治` 保留刀伤、箭伤、失血、骨折、内伤、感染与长期恢复等真实代价；气只能辅助稳定状态，不能自动治愈重伤。
- [PASS] `撤退追击与断后` 区分有序撤退、溃退、诈退、追击与断后，胜军追击也存在孤军深入与伏击风险。
- [PASS] 本批与 `combat/` 个人战斗层职责分离：battlefield 管战争组织与战场结果，combat 管武姬个人兵器与招式表现。
- [PASS] 关键词避免使用裸“城”“旗”“伤”“退”等过宽单字，降低误触发风险。
- [PASS] manifest 已升级为 v1.4，绿灯总数由 28 条扩展至 35 条；本批 order hint 为 352 至 346。

## 结论
Batch05 已完成蓝灯 `004_无双武人与战场法则` 的第一轮正式拆分。攻城、先登、军阵、围攻强者、士气、伤亡与撤退均已获得世界内生的高武战争解释，可直接作为后续具体战役、城池与人物军功描写的底层规则。
