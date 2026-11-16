# SG Miles Companion — Payment Advisor MVP V0.2

**运行文件：** `sg_miles_companion_mvp.html`（独立单文件）。

## 立刻开始

1. 把 HTML 下载到 Windows、Mac 或手机。
2. 用 Chrome / Edge / Safari 打开即可，无需部署服务器、API、银行登入或安装程序。
3. 默认情景：**眼镜店消费 S$480，in-store POS，2026-11-14，MCC 未知**。
4. 在左侧调整金额、支付渠道、MCC 假设、卡 A 已用额度和优惠确认状态。右侧即时更新排名、敏感度、排除理由。
5. 点击“导出审计 JSON”保存详细计算和规则快照；点击“运行 21 项内建测试”验证规则逻辑。

> 本版本所有信用卡名称、倍率、上限、已用额度、优惠券、App 加码和里程价值**都是虚构的模拟规则**。不能作为真实消费建议。只有官方 MCC 8043/8042 的**分类定义**是真实参考，不代表具体眼镜店的 MCC 已验证。

## 预设规则（虚构测试资料）

| 规则 ID | 内容 |
| --- | --- |
| DEMO-A-01 | 模拟卡 A：基础 1 mpd；POS + MCC 8043 时 4 mpd；Statement 截止每月18日；奖励消费上限 S$500；当前周期已用 S$200，剩 S$300。 |
| DEMO-B-01 | 模拟卡 B：所有示例消费均 1.2 mpd，无模拟上限；Calendar Month。 |
| DEMO-C-01 | 模拟卡 C：基础 1 mpd；online 且 MCC 8043/5999 时 4 mpd；Calendar Month；奖励消费上限 S$1,000，已用 S$100。 |
| DEMO-OFFER-01 | 模拟眼镜券：店内 POS 消费至少 S$400，现金折扣 S$30。不得与商场券、App QR 叠加。需勾选确认才计算；切换真实商家时自动取消券的确认。 |
| DEMO-OFFER-02 | 模拟商场券：店内 POS 5% 折扣，封顶 S$15。不得与眼镜券、App QR 叠加，**默认关闭，需手动启用**。 |
| DEMO-OFFER-03 | 模拟 App QR：通过 App 扫码额外 2 mpd；不能与 POS 优惠券组合，也不能把卡 A 的 POS 4 mpd 叠上去。 |

**计分**：`预计奖励价值 = 现金折扣 + 预计 miles × 假设每 mile 新币价值`。默认每 mile = S$0.015。卡里程按模拟整笔消费规则向下取整，实际银行可能不同。

**优惠保守原则**：模拟商场券默认关闭。如果取消 S$30 眼镜券、也未启用商场券，则现金折扣为 S$0。改变商家名称会取消已确认的模拟优惠。

**保守策略**：MCC 未知时，即使它可能是 8043，也**不得**在正式预计收益中计算 8043 加成；只在敏感度情景显示“假设 8043”结果。

## 默认场景的可审计结果

| 假设 | 最优方案 | 现金省 | 预计里程 | 假设综合价值 |
| --- | --- | ---: | ---: | ---: |
| **MCC 未知** | 模拟卡 B + S$30 眼镜券 | S$30 | 540 | S$38.10 |
| MCC 确认为 8043 | 模拟卡 A + S$30 眼镜券 | S$30 | 1,350 | S$50.25 |
| MCC 确认为 8042 | 模拟卡 B + S$30 眼镜券 | S$30 | 540 | S$38.10 |

**8043 的计算**：应付 S$450；卡 A 剩余加成消费额度 S$300 ⇒ `S$300 × 4 + S$150 × 1 = 1,350 miles`；综合估值 `S$30 + 1,350 × S$0.015 = S$50.25`。

**未知 MCC 的计算**：模拟卡 B `S$450 × 1.2 = 540 miles`；综合估值 `S$30 + 540 × S$0.015 = S$38.10`。

## 明确没有叠加的权益

- S$30 眼镜券与 5% 商场券互斥，只能选择其一。
- 实体 POS 与 App QR 是不同支付路线，不能把两边的奖励相加。
- ENTERTAINER Buy 1 Free 1 属于餐饮优惠；本眼镜消费场景不适用。
- ShopBack、CapitaStar、Changi Rewards 的商家合资格性未验证，因此不计算。
- Online-only 4 mpd 不可计入 in-store POS 消费。

## 审计与验证

引擎内建 21 项单元测试，覆盖未知 MCC、默认最优值、8043 的封顶计算、8042 排除、online-only 卡排除、额度耗尽、App QR 不叠加，以及优惠未确认。

输出的 JSON 包括：引擎版本、规则版本、输入快照、各卡来源 ID、计算公式、全部候选方案、排除原因、当前周期标签和模型限制。

网页只会尝试在浏览器 `localStorage` 保存当前**模拟表单**。导出 JSON 时通过浏览器本地创建文件；没有网络请求或后台同步。个别浏览器可能限制 `file://` 的本地存储，不影响基本计算。

## 核验来源 / Next version

- Mastercard MCC 官方分类（2026），8043 Opticians / Optical Goods / Eyeglasses，8042 Optometrists / Ophthalmologists：<https://www.mastercard.com/content/dam/mccom/shared/business/support/rules-pdfs/mastercard-quick-reference-booklet-merchant.pdf>
- The MileLion MCC 实际查询指南：<https://milelion.com/2025/01/19/how-to-check-merchant-category-codes-mccs-before-making-a-purchase/>

准备改成真实个人钱包时，下一版应加上：每张真实卡的独立配置、来源日期、statement posting-date 核对、App 商家资格和不可叠加矩阵、手工核实 MCC 记录。**不能照搬虚构测试数据。**


## V0.1.1 新增：Kris+ 付款前警示（真实 Citi 规则）

已加入独立的 **Kris+ Guard** 面板，不影响原本的眼镜店虚构卡片模拟。打开网页时示范默认选择「Kris+ + Citi Rewards Mastercard + App 内 Google Pay」，立刻出现红色警告。选择 App、卡片及交易方式会即时重新判断；也会进入导出 JSON 的 `krisPlusGuard`。

- `CITI_REWARDS_KRISPLUS_INAPP_WALLET_NO_4MPD`: Kris+ 内 Google Pay/Apple Pay，直接用 Citi Rewards Mastercard 不符合 10X/4 mpd，合资格消费通常仅基础 0.4 mpd；不得扣除 4 mpd 封顶额度。
- `KRISPLUS_CHANNEL_MISMATCH`: 实体店手机 NFC 不是 Kris+ App 内钱包付款；不能混用判断。
- `AMAZE_CITI_CONDITIONAL`: amaze 绑定 Citi Rewards 可能采用另一积分路径，但须核实 MCC、入账渠道、封顶和 SGD 手续费；不得自动保证 4 mpd。
- 其他卡片及 KrisFlyer 账户另作条件检查，不随意硬套 Citi 排除规则。

**无法做到：** 此单文件离线网页不能在背景侦测你打开了 Kris+，也不能根据地理位置主动推送；付款前须打开本工具检查。

来源：Citi Rewards 官方规则 <https://www.citibank.com.sg/credit-cards/points/rewards-card>；MileLion 2026 信用卡指南 <https://milelion.com/2026/02/27/review-citi-rewards-credit-card/>。

## V0.2：Atome + Kris+ 双场景付款前提醒（2026-11-15）

新增可离线操作的 **Atome Guard**（独立于虚构的眼镜店积分类别模拟），并为 **Kris+ Guard** 加入 UOB Visa Signature 与 UOB Preferred Visa 的 App 内支付风险提示。

### 关键规则（以 The MileLion 为首选参考，仍须核实最新银行 T&C）

| App / 支付场景 | 卡片 | V0.2 警示 | 原因 |
|---|---|---|---|
| Kris+ 内 Google Pay / Apple Pay | Citi Rewards Mastercard | BLOCK · 不计算 4 mpd | 线上 in-app mobile wallet 排除于 Citi 10X 资格 |
| Kris+ 内 Google Pay / Apple Pay，SGD | UOB Visa Signature | BLOCK · 不按本地 Contactless 计 4 mpd | 没有实体 NFC；仅可能另行满足 FCY 类别 |
| Kris+ 内 Google Pay / Apple Pay | UOB Preferred Visa（原 PPV） | CONDITIONAL | in-app 不是 mobile NFC；须检查 online MCC 白名单 |
| Atome 直接绑卡 | UOB Preferred Visa（原 PPV） | BLOCK · 不预期 4 mpd | MileLion 用户数据存在奖励争议，直接绑卡不可靠 |
| Atome 内 Apple Pay | UOB Preferred Visa（原 PPV） | WARNING · 不保证 4 mpd | 即使 MCC 5999 属 online 白名单，存在取得和未取得 9X UNI$ 的冲突经验 |
| Atome 内 SGD 付款 | UOB Visa Signature | BLOCK · 不按本地 Contactless 计 4 mpd | Atome 按线上入账，不能计入实体 NFC 类别 |
| Atome | Citi Rewards Mastercard / HSBC Revolution | CONDITIONAL · 候选 4 mpd | MileLion 列为推荐卡；仍需核实每期 MCC、posting date、上限、银行排除 |
| Atome（MCC 5999） | UOB Lady's Solitaire（Travel / Transport） | BLOCK · 不匹配所选类别 | Atome MCC 不是原始商家旅游/交通 MCC |
| Atome 第 2/3 期 | 自动扣款 | WARNING | 可能被识别为 recurring，考虑在 Bills 手动支付 |

**使用方法**：打开 HTML，在上方 Kris+ 或 Atome Guard 选择卡片及支付方式，即刻出现红色/黄色风险提示。Atome Guard 提供 SGD/FCY 选择，防止错误把外币规则套到 SGD 交易。导出的审计 JSON 分别含 `krisPlusGuard` 与 `atomeGuard`，包括独立的 Rule ID 和来源 URL。原来眼镜店 S$480 的三个虚构卡片仍是隔离演示，**不可**当作你的真实卡片收益排名。

**不能做到**：离线单文件 HTML 无法在用户打开 Kris+ 或 Atome 时通过手机系统主动推送提醒；必须先打开 Payment Advisor 选择 App 场景。此处“提醒”指**付款前情景警告**，不创建日历或定时任务。

**核查链接**：
- MileLion，2026-02-08，*What's the best card to use for Atome?* https://milelion.com/2026/02/08/whats-the-best-card-to-use-for-atome/
- MileLion，2025-01-13，*What counts as a contactless payment?* https://milelion.com/2025/01/13/what-counts-as-a-contactless-payment/
- MileLion，2026-02-27，*Review: Citi Rewards Credit Card* https://milelion.com/2026/02/27/review-citi-rewards-credit-card/
- MileLion，2026-03-29，*Review: UOB Preferred Visa* https://milelion.com/2026/03/29/review-uob-preferred-platinum-visa-card/

**质量检查**：21 项独立 JS 引擎自检全部通过，覆盖原 12 项与新增 9 项情景规则。浏览器中的交互及文件导出需要在目标设备上做用户验收；本环境中 Chromium 页面加载测试超时，故不宣称浏览器 E2E PASS。
