# Candidate1 源码与数据 QA

基线：002d6280a977be44b1425d336475eb94bbc5a325。
日期：2026-10-26。

## 数据和来源

PASS：310个正式正文源逐字入书，总计332条（含母版分区、禁用记忆插槽和MVU接口）。
- 89人物、89能力、8蓝灯、50公共绿灯、60地点、10卷、1121节点全部保留。
- 两名彩蛋人物与两条彩蛋能力另计；不混入89风华录及五阵营计数。
- 原人物外貌、武道、能力、地点和时间线原文未修改；基线全部worldbook、timeline、manifest、QA、docs源文件SHA256保持。
- 公共蓝绿灯order和关键词不变；人物/能力/地点的装配整数order仅对齐母版分区，原manifest不修改。映射与依据见docs/010和qa/assembly-map.json。
- 10条时间线仅MAIN01启用，MAIN02～10禁用；没有新增MAIN11或时间线推进业务。

## 接线

PASS：原生九件齐全，脚本/世界书接口/清理正则使用母版字段；Schema空初始化、passthrough与幂等验证通过，不建立第二套数值。
PASS：阵营输出保险为卡级PHI，累计继承、唯一完整块、合法刻度、零变化也输出等规则完整，不修改预设本体。
PASS：最新合法块回溯、role缺失、is_user过滤、坏块回退、五项缺失/重复拒绝、负数与clamp、阶段边界。
PASS：原生affinity只读、历史出现持续点亮、好感下降照原值显示、多娜咩娘排除、用户伪标签拒绝、无变量写回。

## 媒体

PASS：6张图片manifest blob哈希与当前仓库像素文件一致；所有URL锁定904a20d68e6ec84773a46cae023a441df01fbca4。
PASS：6个jsDelivr URL HTTP 200，Content-Type=image/png，见media-http-check.json。
没有把媒体Base64内嵌卡体；没有@main图片链接。

## 验证命令

- node --check qa/statusbar-bundle.js
- node qa/tests/facts.test.mjs
- python qa/tests/data_qa.py
- Schema：Zod v4实际parse空初始化/已有字段/重复parse验证
- TKM_CHROMIUM=/tmp/tkm-chromium node qa/tests/ui.test.cjs

## 验收边界

此报告只覆盖源码、数据和模拟运行。桌面Chromium模拟与真实Android/SillyTavern验收分开；真实手机尚未测试。Candidate JSON和PNG分别在后续提交生成并验证。
