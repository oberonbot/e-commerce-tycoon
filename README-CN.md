# TechShell — 高端手机配件电商平台

一个使用 **React**、**TypeScript**、**Tailwind CSS v4** 和 **Vite** 构建的现代化、功能齐全的电商前端项目。TechShell 是一个独立的手机配件商店前端，采用简洁、专业的设计风格，融合了科技与艺术美学。

> **注意：** 这是一个纯前端应用，使用模拟数据。无需后端或数据库——所有状态在内存中管理，并通过 `localStorage` 进行持久化。

---

## 功能特性

### 购物体验
- **首页** — 自动轮播的 Hero 走马灯、分类筛选标签、响应式商品网格（1–4列）
- **商品详情页** — 图片画廊与缩略图、规格选择器（型号、颜色等）、数量选择、星级评分、特性列表、完整描述以及"你可能还喜欢"推荐
- **搜索与筛选** — 支持商品名称和描述的全文搜索、分类下拉、价格区间输入、排序选项（推荐、价格、评分、最新）
- **收藏夹** — 在任意商品卡片或详情页点击心形图标收藏，跨会话持久化
- **商品目录** — 6 个分类下的 12 款真实商品（手机壳、充电器、屏幕保护膜、支架与车载、音频、数据线）

### 购物车与结账
- **购物车** — 带规格显示的商品列表、数量控制、单行小计和订单总额
- **配送页面** — 完整的地址表单，包含美国州下拉选择、国家选择器，三种配送速度选项（标准/快递/隔夜达）及动态定价
- **支付页面** — 带格式化的信用卡表单、Google Pay 和 Apple Pay 模拟按钮、促销码系统（试试 `TECH20` 享八折优惠）、账单地址切换
- **订单确认** — 完整收据，包含订单号、逐项明细、配送地址、支付方式和预计送达日期

### 用户认证
- **登录** — 使用任意邮箱进行演示登录（演示模式无需密码）
- **注册** — 完整的表单验证（姓名、邮箱、密码、确认密码）、营销邮件订阅复选框、条款同意
- **邮箱验证** — 6 位验证码输入（演示模式下接受任意 6 位数字）
- **路由保护** — 结账页面需要登录；未验证邮箱的用户将被重定向到验证页面

### 信息页面
- **关于我们** — 品牌故事、公司价值观（创新、品质、可持续发展、社区）、团队成员介绍和行动号召区域
- **联系我们** — 商业信息（邮箱、电话、地址、营业时间）、带主题分类的联系表单、FAQ 引导
- **常见问题** — 按分类组织的手风琴式问答（配送、退换、支付、产品、账户），15+ 条详细解答
- **退换政策** — 完整的 30 天退换政策，包含资格条件、分步流程、退款时间线和例外情况
- **服务条款** — 完整的 10 节法律条款
- **隐私政策** — 9 节隐私政策，涵盖数据收集、Cookie、用户权利和安全措施

### 多语言支持
- **三种语言** — 英语（默认）、西班牙语（Español）和简体中文（中文）
- **语言切换** — 导航栏中的地球图标下拉菜单（桌面端和移动端均可用）
- **全面覆盖** — 所有 20+ 个页面的每一条 UI 文本均已翻译，包括法律页面和 FAQ 内容
- **偏好持久化** — 语言选择保存至 `localStorage`，刷新页面后自动恢复

### 订单管理
- **订单历史** — 显示过往订单，带状态标签（处理中、已发货、已送达）和可展开的商品详情
- **订单持久化** — 已完成的订单存储在 `localStorage` 中

### 用户体验与设计
- **响应式设计** — 移动端优先布局，带汉堡菜单抽屉，小屏幕上自动堆叠排列
- **404 页面** — 自定义未找到页面，带导航链接
- **邮件订阅** — 首页 Hero 区域和页脚的邮箱收集功能
- **滚动到顶部** — 页面导航时自动重置滚动位置
- **流畅过渡** — 走马灯动画、悬停效果、手风琴展开/收起动画

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | [React 19](https://react.dev) + TypeScript |
| 构建工具 | [Vite 8](https://vite.dev) |
| 样式 | [Tailwind CSS v4](https://tailwindcss.com) |
| 路由 | [React Router v7](https://reactrouter.com) |
| 图标 | [Lucide React](https://lucide.dev) |
| 国际化 | [i18next](https://www.i18next.com) + [react-i18next](https://react.i18next.com) |
| 状态管理 | React Context API + `localStorage` 持久化 |

---

## 快速开始

### 环境要求

- **Node.js** >= 18（已在 v25 上测试）
- **npm** >= 9

### 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/e-commerce-tycoon.git
cd e-commerce-tycoon

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器（支持热模块替换）
npm run dev
```

在浏览器中打开 [http://localhost:5173](http://localhost:5173)。

### 构建

```bash
# 类型检查并构建生产版本
npm run build

# 本地预览生产构建
npm run preview
```

### 代码检查

```bash
npm run lint
```

---

## 项目结构

```
src/
├── components/
│   ├── Navbar.tsx                 # 置顶导航栏：导航、搜索、收藏、购物车、语言切换
│   ├── Footer.tsx                 # 四列页脚：链接、社交图标、邮件订阅
│   ├── Carousel.tsx               # 自动轮播的 Hero 走马灯，带箭头和指示点
│   ├── ProductCard.tsx            # 商品卡片：收藏、促销标签、加入购物车
│   ├── CartItem.tsx               # 购物车行项目，带数量控制
│   └── checkout/
│       ├── CheckoutProgress.tsx   # 三步结账进度指示器
│       └── OrderSummaryCard.tsx   # 可复用的订单摘要侧边栏
├── contexts/
│   ├── AuthContext.tsx             # 模拟认证（登录、注册、验证、登出）
│   ├── CartContext.tsx             # 购物车状态，支持规格感知的行项目
│   └── WishlistContext.tsx         # 按商品 ID 管理的收藏夹
├── data/
│   └── products.ts                # 12 款商品、Hero 轮播数据、分类列表
├── lib/
│   └── techshellCheckout.ts       # 结账辅助函数（运费计算、订单存储）
├── locales/
│   ├── en.ts                      # 英语翻译
│   ├── es.ts                      # 西班牙语翻译
│   └── zh.ts                      # 简体中文翻译
├── pages/
│   ├── Home.tsx                   # Hero + 分类筛选 + 商品网格 + 特性 + 邮件订阅
│   ├── ProductDetail.tsx          # 图片画廊 + 规格选择 + 加入购物车 + 相关推荐
│   ├── Cart.tsx                   # 购物车商品 + 小计 + 结账链接
│   ├── Login.tsx                  # 登录表单，支持重定向
│   ├── Register.tsx               # 注册表单，带验证和条款
│   ├── VerifyEmail.tsx            # 6 位邮箱验证码
│   ├── Shipping.tsx               # 地址表单 + 配送方式选择
│   ├── Payment.tsx                # 银行卡/GPay/APay + 促销码 + 账单地址
│   ├── OrderConfirmation.tsx      # 下单成功，完整收据
│   ├── OrderHistory.tsx           # 历史订单，可展开详情
│   ├── Search.tsx                 # 搜索 + 筛选 + 排序
│   ├── Wishlist.tsx               # 已收藏商品网格
│   ├── About.tsx                  # 品牌故事、价值观、团队
│   ├── Contact.tsx                # 联系表单 + 商业信息
│   ├── FAQ.tsx                    # 按分类的手风琴式 FAQ
│   ├── ReturnPolicy.tsx           # 30 天退换政策
│   ├── TermsOfService.tsx         # 完整服务条款
│   ├── PrivacyPolicy.tsx          # 隐私政策
│   └── NotFound.tsx               # 404 页面
├── i18n.ts                        # i18next 配置
├── App.tsx                        # 路由与所有页面 + 布局外壳
├── main.tsx                       # 入口文件
└── index.css                      # Tailwind 导入 + 自定义主题
```

---

## 路由一览

| 路径 | 页面 |
|------|------|
| `/` | 首页（商店） |
| `/product/:slug` | 商品详情 |
| `/cart` | 购物车 |
| `/login` | 登录 |
| `/register` | 创建账户 |
| `/verify-email` | 邮箱验证 |
| `/shipping` | 结账 — 配送信息 |
| `/payment` | 结账 — 支付 |
| `/order-confirmation` | 订单成功 |
| `/orders` | 订单历史 |
| `/search` | 搜索与筛选 |
| `/wishlist` | 收藏夹 |
| `/about` | 关于我们 |
| `/contact` | 联系我们 |
| `/faq` | 常见问题 |
| `/returns` | 退换政策 |
| `/terms` | 服务条款 |
| `/privacy` | 隐私政策 |
| `*` | 404 未找到 |

---

## 演示小贴士

- **促销码：** 在支付页面输入 `TECH20` 即可享受八折优惠
- **登录：** 使用任意邮箱地址即可——无需真实认证
- **邮箱验证：** 输入任意 6 位数字即可（例如 `123456`）
- **语言切换：** 点击导航栏中的地球图标，可在英语、西班牙语和中文之间切换
- **数据持久化：** 购物车、收藏夹、登录状态和已完成的订单均通过 `localStorage` 持久化

---

## 参与贡献

欢迎贡献代码！以下是参与步骤：

1. **Fork** 本仓库
2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **编写代码** — 请遵循现有的代码风格：
   - TypeScript 严格模式
   - 仅使用 Tailwind 工具类（不使用 `@apply`）
   - 函数式组件 + Hooks
   - 所有面向用户的文本必须使用翻译键
4. **测试你的更改**
   ```bash
   npm run build    # 确保 TypeScript 编译通过
   npm run lint     # 确保没有 lint 错误
   ```
5. **提交** 并编写清晰的提交信息
   ```bash
   git commit -m "feat: add product reviews section"
   ```
6. **推送** 并创建 Pull Request
   ```bash
   git push origin feature/your-feature-name
   ```

### 添加新语言

1. 在 `src/locales/` 下创建新文件（例如 `fr.ts`），以 `en.ts` 为模板
2. 翻译所有值，同时保持完全相同的键结构
3. 在 `src/i18n.ts` 中导入并添加到 `resources` 对象中
4. 在所有现有的语言文件中，将新语言选项添加到 `lang` 键中

### 代码风格规范

- 默认使用 `const`，仅在需要重新赋值时使用 `let`
- 页面和组件优先使用命名导出
- 保持组件职责单一——一个文件一个组件
- 直接使用 Tailwind CSS 工具类，避免自定义 CSS
- 所有面向用户的文本必须使用 `useTranslation()` 配合 `src/locales/` 中的翻译键

---

## 许可证

本项目仅用于学习和演示目的。

---

使用 React + TypeScript + Tailwind CSS + Vite 构建
