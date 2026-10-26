# 绿灯 Batch04｜无双武姬的战斗方式 QA

## 范围
- `worldbook/settings/green-triggered/combat/001_兵器类别与战斗距离.md`
- `worldbook/settings/green-triggered/combat/002_骑战与马上武艺.md`
- `worldbook/settings/green-triggered/combat/003_弓战与投射武艺.md`
- `worldbook/settings/green-triggered/combat/004_重兵器与巨型兵装.md`
- `worldbook/settings/green-triggered/combat/005_奇门兵器与特殊操控.md`
- `worldbook/settings/green-triggered/combat/006_双持连段与连续攻防.md`
- `worldbook/settings/green-triggered/combat/007_破阵与斩将.md`
- `worldbook/settings/green-triggered/combat/008_无双乱舞与终结技.md`
- `manifest/green-triggered-settings.v1.json`

## 检查结果
- [PASS] 八条正文均使用咩咩制卡·全栈 v1.0.0 的 `<核心设定:名称>...</核心设定:名称>` 格式。
- [PASS] 八条均属于蓝灯 `006_无双武姬的战斗方式` 的按需展开，没有重复复制蓝灯总则。
- [PASS] 兵器类别条目把长兵、短兵、远程等差异落在战斗距离、节奏与地形，而不是把兵器类型写成固定强弱序列。
- [PASS] 骑战保留战马体力、伤势、恐惧、地形与拒马等限制；高武骑将不能把战马视为无限耐久载具。
- [PASS] 弓战与投射保留风向、距离、遮挡、弹道和贴身风险，不允许默认必中、无限追踪或无视掩体。
- [PASS] 重兵器允许高武武姬高速挥舞，但仍保留质量、惯性、收势、下盘与气力消耗，不退化成无重量巨型玩具。
- [PASS] 奇门兵器的特殊性来自结构与操控，不自动获得传送、无限延伸、自动锁敌或无视防御等法器能力。
- [PASS] 双持连段被定义为由命中、逼退、失衡、封位与读招形成的连续攻势；对手仍可格挡、闪避、反击和打断，不存在强制木桩连招。
- [PASS] 破阵与斩将强调军阵节点、护卫、时机、撤退与己方跟进，个人突破不能长期替代整支军队。
- [PASS] `无双乱舞与终结技` 仅定义爆发状态中的个人杀招表现；`qi-wujing/003_无双爆发.md` 继续负责爆发状态的产生、消耗和机制，两者职责不重叠。
- [PASS] 角色专属无双乱舞名称、动作、属性与兵器联动明确下沉至对应 `<核心设定:角色名·能力>`，本批不提前写死角色能力。
- [PASS] manifest 已升级至 v1.3，共登记 28 条绿灯；本批 8 条 order hint 为 360 至 353，全部父级指向 `blue-006`。
- [PASS] 关键词使用 `骑战/马上武艺`、`弓战/投射武艺`、`重兵器`、`奇门兵器`、`双持/连段`、`破阵/斩将`、`无双乱舞/终结技` 等明确短语，未把裸 `武器`、`攻击`、`战斗` 等超高频词设为触发词。

## 结论
Batch04 已完成蓝灯 `006_无双武姬的战斗方式` 的第一轮正式拆分。战斗体系已经能够区分距离、骑步、远近、重量、操控、连段、军阵作用与爆发终结，同时保持高武世界的物理与消耗约束，可以作为后续人物专属兵器和角色能力生产的基础。
