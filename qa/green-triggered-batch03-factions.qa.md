# 绿灯 Batch03｜天下阵营与军势格局 QA

## 范围
- `worldbook/settings/green-triggered/factions/001_归附转阵营与忠诚.md`
- `worldbook/settings/green-triggered/factions/002_主君将领与军师关系.md`
- `worldbook/settings/green-triggered/factions/003_军制兵种与军团.md`
- `worldbook/settings/green-triggered/factions/004_粮草后勤与地盘.md`
- `worldbook/settings/green-triggered/factions/005_联盟外交与临时共同体.md`
- `worldbook/settings/green-triggered/factions/006_曹魏势力.md`
- `worldbook/settings/green-triggered/factions/007_蜀汉势力.md`
- `worldbook/settings/green-triggered/factions/008_孙吴势力.md`
- `worldbook/settings/green-triggered/factions/009_晋势力.md`
- `worldbook/settings/green-triggered/factions/010_群雄诸侯.md`
- `manifest/green-triggered-settings.v1.json`

## 检查结果
- [PASS] 十条正文均使用咩咩制卡·全栈 v1.0.0 的 `<核心设定:名称>...</核心设定:名称>` 格式。
- [PASS] 十条均属于蓝灯 `005_天下阵营与军势格局` 的按需展开，没有复制蓝灯全文形成第二套常驻规则。
- [PASS] 共通机制覆盖归附与忠诚、主君—将领—军师关系、军制兵种、粮草地盘与联盟外交五个高频政治军事问题。
- [PASS] 阵营归属允许随任官、归附、投降、婚盟、继承、旧主覆灭和主动择主变化，不把转阵营自动等同于道德堕落。
- [PASS] 军队被定义为包含步卒、弓弩、骑兵、舟师、斥候、辎重、亲卫等真实分工的组织，不退化成“无双武姬 + 无名杂兵”两层结构。
- [PASS] 粮草、地盘、交通、港口、关隘、仓储与地方治理均保持真实战略价值，高武强者不能长期替代完整后勤体系。
- [PASS] 曹魏、蜀汉、孙吴、晋、群雄五类阵营均采用世界内生口吻，不包含作品来源或制作说明。
- [PASS] 曹魏突出霸业、法度、人才整合与组织效率；蜀汉突出仁义、理想、羁绊与逆境韧性；孙吴突出江东本土、家族纽带、水军与年轻锐气；晋突出士族网络、耐心权术与旧秩序整合；群雄保持多中心、地域化与高度个性化。
- [PASS] 五个阵营都存在优势、代价与内部矛盾，没有被固定写成善恶阵营或绝对强弱序列。
- [PASS] 群雄被明确视为多个独立诸侯与地方势力的统称，而不是一个真正统一的单一阵营。
- [PASS] 阵营关键词使用 `曹魏/魏军/曹操军`、`蜀汉/蜀军/刘备军`、`孙吴/东吴/江东军`、`晋军/司马氏`、`群雄/诸侯势力` 等明确短语，未使用裸 `魏/蜀/吴/晋` 单字，降低误触发风险。
- [PASS] `manifest/green-triggered-settings.v1.json` 已升级至 v1.2，共登记 20 条绿灯；本批 10 条 order hint 为 370 至 361。

## 结论
Batch03 已完成蓝灯 `005_天下阵营与军势格局` 的第一轮正式拆分，并同时建立魏、蜀、吴、晋、群雄五类阵营基础气质。可以作为后续兵器、兵种、具体军团、人物归属与阵营角色生产的基础。
