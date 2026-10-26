# 《三国无双姬》Candidate1 装配说明

本轮直接基线：`002d6280a977be44b1425d336475eb94bbc5a325`。
按009施工单与用户后续封面确认实施。候选版等待真实 Android / SillyTavern 测试，不是最终封版。

## 母版与接线

- 使用咩咩制卡·全栈 v1.0.0 的原生世界书模板、MVU空卡、转换函数与PNG打包函数。
- 原始工具副本和SHA256见 `tools/vendor/provenance.json`，未修改原工具。
- 最终为 chara_card_v3，character_book 全量内嵌，酒馆助手角色脚本及卡内正则沿用母版字段。
- 九件齐全：MVU / MVU ZOD / 变量状态栏三个角色脚本；初始化（关闭）、更新规则、输出格式、变量列表四个条目；两条原生清理正则。另有一条只隐藏阵营标签显示的卡级正则。
- 本卡业务均为只读投影，无自有持久数值。Schema为空对象并passthrough，初始化为{}；更新模型不得生成第二套阵营、人物好感或收藏状态。空JSONPatch不写数值。
- 阵营输出保险在卡级 post_history_instructions，不修改预设或既有核心设定。

## 冻结资料与装配映射

正文逐字装入，源文件不改。`qa/frozen-source-hashes.json`记录开工资料哈希；`qa/assembly-map.json`记录310个正式正文源与内嵌条目的映射。

310个正文源 = 8蓝灯 + 50公共绿灯 + 89人物 + 89能力 + 60地点 + 10时间线 + 2彩蛋人物 + 2彩蛋能力。
其余22条为母版分区/禁用记忆插槽与四个MVU接口条目，合计332条。

仅在装配层分配order，源manifest不改：
- 8蓝灯与50公共绿灯保持冻结order及keywords；
- 91个角色能力按原顺序装入核心设定330～302；母版整数段位容不下91个唯一order，因此部分并列，数组内保持原相对顺序；不改变触发词、正文或蓝绿灯；
- 89正式人物为299～211，彩蛋为199、198，60地点为99～40，避开母版300/100/101分区边界；
- 原始manifest里的order_hint只作资料期提示，装配后的分区段位及相对顺序由QA验证。

风华录五分类中，将汉室、群雄·荆州、群雄·桂阳归入群雄筛选；保留其source_faction，不修改人物正文阵营，也不扩展第六阵营。

## 唯一真值

- 阵营：历史最新合法完整`faction_affinity`；缺role消息兼容；拒绝用户/系统消息；最新坏块向前回退；无历史合法块时五项为0；上下界钳制。
- 原生好感：按咩咩预设0.9.0的`affinity`行解析。历史重放只投影正式89名；已出现者不会因后续记录省略、退场、死亡或好感下降熄灭。删除/重生成原记录后按当前聊天历史重建，不把另一聊天的状态带入。
- 不写stat_data，不另建人物关系、好感或阵营数据库。

## UI及刷新

- 曹魏→蜀汉→孙吴→晋→群雄锁屏，真实button、至少44px触控、左右swipe、中央进入、无轮播；只保留当前图及相邻预载，失败降级墨红金背景。
- 主背景保持人物上方可见，下方放五方玉榜或风华录；两页底部页签。
- 单一面板挂当前可见最新AI楼层`.mes_text`底部，移除旧楼面板，降低Android长聊天DOM负担。
- Tavern事件、MVU事件与过滤自身DOM变更的MutationObserver负责刷新；同楼重绘重新挂回，重复事件不复制面板，换聊天重建并清理。
- 风华录在360px容器为3列，窄楼层退为2列；筛选签在小于320px容器时改3列，以保留44px触控宽度。
- 支持reduced-motion；无常驻动画、Canvas粒子或全屏模糊。

## 时间线

MAIN01～MAIN10和1121个固定节点原样内嵌。默认只启用MAIN01，其余禁用，遵循母版“时间线多选一”接口；在酒馆世界书中按游玩篇章切换，仅保留一卷启用。MVU不选择、写回或自动推进剧情，不另建MAIN11或状态机。

## 封面与媒体

用户已明确确认`mvu/media/cover/三国无双姬_群雄战场争锋.png`就是唯一正式母版。
构建PNG时生成768×1024 LANCZOS高质量RGB副本，仅优化像素层，保留完整3:4构图，不裁标题和人物；原母版哈希保持。完整卡数据同时写入chara和ccv3两份PNG文本块，不为体积删资料。
六张远程UI图严格使用媒体manifest的commit锁定jsDelivr URL。

## 重建命令

```bash
python tools/build_candidate.py source
node --check qa/statusbar-bundle.js
node qa/tests/facts.test.mjs
python qa/tests/data_qa.py
node qa/tests/ui.test.cjs
python tools/build_candidate.py json
python qa/tests/data_qa.py build/三国无双姬_v1.0.0-candidate1.json
python tools/build_candidate.py png
python qa/tests/png_qa.py
```

UI模拟需安装Playwright及Chromium；可用TKM_CHROMIUM指定已有浏览器。与真实安卓测试分开记录。

## 导入

下载Candidate1 PNG，在SillyTavern角色管理中导入；启用卡内正则和酒馆助手嵌入脚本。运行咩咩预设0.9.0，开启其通用角色好感输出。内嵌世界书随卡绑定，避免再叠加导入同一本独立世界书。
真实手机待验证：导入、锁屏箭头/手势、背景与两页、普通对话后阵营更新、原生人物记录点亮及好感变化、重生成/切换楼层后的刷新。
