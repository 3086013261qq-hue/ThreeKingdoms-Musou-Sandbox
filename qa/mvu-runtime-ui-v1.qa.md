# MVU runtime / UI 模拟 QA

结论：PASS（Chromium 153自动化模拟；不是安卓/SillyTavern实机通过）。

| 检查 | 结果 |
|---|---|
| 360px手机视口内248px聊天正文宽度 | 无横向溢出，2列名片，筛选玉签3列 |
| 360px独立面板宽度 | 无横向溢出，3列名片 |
| 可见真实button触控框 | 每个宽高均至少44px |
| 五阵营左右箭头 | 正确切页，按钮不触发进入 |
| 锁屏横向swipe | 正确切页，滑动后的合成click抑制 |
| 纵向拖动 | 不切锁屏页，touch-action为pan-y |
| 两页页签与swipe | aria-selected与显示页一致 |
| 图片error / 全部CDN请求失败 | 墨红金fallback，按钮与面板仍可用 |
| role缺失、is_user消息 | 最新原文合法阵营块实时刷新；玩家伪标签不计入 |
| 新增AI楼层 | 面板移动至最新可见AI正文底部，全聊天仅一份 |
| 最新块残缺 | 保留上一合法数据 |
| 原生affinity出现曹操67 | 点亮曹操，仅姓名与♥67；其余???/未邂逅 |
| 消息正文替换及10次重复事件 | 恢复挂载，没有重复面板 |
| 换聊天 | 阵营回到新历史初值0，无旧聊天收藏泄露 |
| 无SillyTavern上下文 | Tavern Helper getChatMessages回退仍正常 |
| prefers-reduced-motion | 刻度transition为0s，无非必要动画 |
| 页面JS运行错误 | 0 |

自动化测试：`qa/tests/ui.test.cjs`。
图片成功场景使用manifest对应的仓库原图路由替身，保证固定像素可复现；真实CDN HTTP检查独立见`media-http-check.json`。失败场景显式阻断CDN请求。

视觉复核：`preview-android-360.png`（360px手机 / 248px正文）、`preview-panel-360.png`（360px面板风华页）、`preview-affinity-360.png`（360px面板玉榜）。
深墨、暗朱、暖金、玉牌漆器细边；顶部人物可见，中央及下半区承载业务；未使用默认progress、白灰后台组件、持续粒子或全屏模糊。

真实Android与真实SillyTavern运行链尚未测试，必须由用户下载完整Candidate PNG后验收；不能用此报告替代。
