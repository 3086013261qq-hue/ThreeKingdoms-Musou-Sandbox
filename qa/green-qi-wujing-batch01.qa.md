# 绿灯｜气与武境展开 Batch01 QA

## 范围
- `worldbook/settings/green-triggered/qi-wujing/001_气的运行与外显.md`
- `worldbook/settings/green-triggered/qi-wujing/002_武境五阶.md`
- `worldbook/settings/green-triggered/qi-wujing/003_无双爆发.md`
- `worldbook/settings/green-triggered/qi-wujing/004_气的消耗与恢复.md`
- `worldbook/settings/green-triggered/qi-wujing/005_越境战与克制.md`
- `manifest/green-triggered-settings.v1.json`

## 检查结果
- [PASS] 五条正文均严格使用咩咩制卡·全栈 v1.0.0 的 `<核心设定:名称>...</核心设定:名称>` 格式。
- [PASS] 五条均为蓝灯 `007_气与武境` 的具体展开，不复制整条蓝灯正文，也未提升为常驻条目。
- [PASS] `气的运行与外显` 将气限定为依附生命、体魄、精神与武艺运作的力量，不自动扩张为独立法术体系。
- [PASS] 属性化光焰、雷弧、气流等视觉效果不能自动推导为元素魔法或无限远程攻击。
- [PASS] `武境五阶` 保持 `武卒 → 武人 → 骁将 → 名将 → 无双` 五阶，并明确武境是粗粒度综合评价，不是精确数值。
- [PASS] `无双爆发` 是有限时、高消耗的气/意/身/兵统一爆发，不是无限常驻状态。
- [PASS] `气的消耗与恢复` 保留伤病、失血、睡眠、饮食、疲劳和长期作战对恢复的真实影响，高武角色不存在无限气力。
- [PASS] `越境战与克制` 允许地形、兵器、人数、情报、伤势和配合改变胜负，避免“高一境绝对碾压”。
- [PASS] manifest 全部登记为 `green-triggered`，parent_blue 均为 `blue-007`。
- [PASS] 未使用裸 `无双`、裸 `气`、裸 `名将` 等高频单字作为关键词，避免绿灯变相常驻。
- [PASS] order hint 为 380 至 376，位于核心设定区且低于蓝灯层。

## 结论
Batch01 五条气与武境绿灯可以作为正式展开基线。后续可继续拆分阵营、军师、战场、妻妻社会或角色能力绿灯，但不得反向膨胀蓝灯。
