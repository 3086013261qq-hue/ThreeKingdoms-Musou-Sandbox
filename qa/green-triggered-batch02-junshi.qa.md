# 绿灯 Batch02｜文武并立与军师之道 QA

## 范围
- `worldbook/settings/green-triggered/junshi/001_军师之气.md`
- `worldbook/settings/green-triggered/junshi/002_阵法与军势.md`
- `worldbook/settings/green-triggered/junshi/003_情报与谋略.md`
- `worldbook/settings/green-triggered/junshi/004_计策成立条件.md`
- `worldbook/settings/green-triggered/junshi/005_军师亲临战场.md`
- `manifest/green-triggered-settings.v1.json`

## 检查结果
- [PASS] 五条正文均使用咩咩制卡·全栈 v1.0.0 的 `<核心设定:名称>...</核心设定:名称>` 格式。
- [PASS] 五条均为蓝灯 `008_文武并立与军师之道` 的按需展开，没有复制蓝灯全文或升级为常驻条目。
- [PASS] `军师之气` 与武姬共用同一“气”体系，只改变修习与运用方向，没有新增魔力、法力、仙术或第二套能源。
- [PASS] `阵法与军势` 依托真实兵员、纪律、旗号、鼓角、传令、地形与执行组织，不生成凭空存在的能量结界。
- [PASS] `情报与谋略` 明确信息存在延迟、误差、欺骗与失效风险，军师不具备无依据读心、全知或预知未来能力。
- [PASS] `计策成立条件` 要求情报、条件、执行与时机同时成立，并允许对手识破、拒绝配合、反制或迫使计策只取得部分效果。
- [PASS] `军师亲临战场` 允许军师参战与自保，但不把所有军师强行塑造成名将或无双武姬；个人正面战力仍由角色自身设定决定。
- [PASS] manifest 已登记本批五条为 `green-triggered`，父级统一为 `blue-008`，order hint 为 375 至 371。
- [PASS] 触发词优先使用“军师之气 / 军阵 / 情报网 / 计策条件 / 军师参战”等具体词组，没有直接使用“军师”“谋略”等高频单词导致变相常驻。
- [PASS] 本批与 Batch01 的“气与武境”体系兼容，不引入第二套强弱体系。

## 结论
Batch02 已将军师体系拆成气的运用、阵法军势、情报谋略、计策成立条件与亲临战场五个独立绿灯模块。高武世界仍保持“文武并立”，但军师强大建立在信息、组织、准备和执行之上，不滑向万能法师或作者开挂。
