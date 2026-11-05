/* Pre-Calculus — 9 units, bilingual question bank */
window.SUBJECT_PRECALC = {
  id: "precalc",
  color: "precalc",
  name: { en: "Pre-Calculus", zh: "预备微积分" },
  tagline: { en: "Functions, trig, matrices, and everything before calculus", zh: "函数、三角、矩阵——微积分之前的一切" },
  units: [
    {
      id: "pc1",
      name: { en: "Unit 1 · Functions & Graphs", zh: "第1单元 · 函数与图像" },
      topics: [
        { en: "Domain & range", zh: "定义域与值域" },
        { en: "Function composition", zh: "函数复合" },
        { en: "Transformations of graphs", zh: "图像变换" },
        { en: "Even & odd functions", zh: "偶函数与奇函数" },
        { en: "Inverse functions", zh: "反函数" },
        { en: "Quadratic applications (vertex)", zh: "二次函数应用（顶点）" },
        { en: "Average rate of change", zh: "平均变化率" },
        { en: "Difference quotient", zh: "差商" }
      ],
      questions: [
        {
          t: "vocab",
          q: { en: "What is the domain of f(x) = √(x − 3)?", zh: "f(x) = √(x − 3) 的定义域是？" },
          o: [
            { en: "x ≥ 3", zh: "x ≥ 3" },
            { en: "x > 3", zh: "x > 3" },
            { en: "All real numbers", zh: "全体实数" },
            { en: "x ≤ 3", zh: "x ≤ 3" }
          ],
          a: 0,
          e: { en: "The inside of a square root must be ≥ 0, so x − 3 ≥ 0 → x ≥ 3. For f(x) = 1/(x−3), the domain would be x ≠ 3 instead.", zh: "根号内必须 ≥ 0，所以 x − 3 ≥ 0 → x ≥ 3。若是 f(x) = 1/(x−3)，定义域则是 x ≠ 3。" }
        },
        {
          t: "calculation",
          q: { en: "If f(x) = 2x + 1 and g(x) = x² − 1, what is g(f(2))?", zh: "若 f(x) = 2x + 1，g(x) = x² − 1，求 g(f(2))。" },
          o: [
            { en: "24", zh: "24" },
            { en: "8", zh: "8" },
            { en: "9", zh: "9" },
            { en: "16", zh: "16" }
          ],
          a: 0,
          e: { en: "Work inside-out: f(2) = 5, then g(5) = 25 − 1 = 24. Order matters: f(g(2)) = f(3) = 7 instead.", zh: "由内向外算：f(2) = 5，再 g(5) = 25 − 1 = 24。顺序很重要：f(g(2)) = f(3) = 7。" }
        },
        {
          t: "concept",
          q: { en: "The graph of y = f(x − 3) + 2 compared to y = f(x) is shifted:", zh: "与 y = f(x) 相比，y = f(x − 3) + 2 的图像如何移动？" },
          o: [
            { en: "Right 3, up 2", zh: "右移3，上移2" },
            { en: "Left 3, up 2", zh: "左移3，上移2" },
            { en: "Right 3, down 2", zh: "右移3，下移2" },
            { en: "Left 3, down 2", zh: "左移3，下移2" }
          ],
          a: 0,
          e: { en: "\"x − k\" moves the graph RIGHT k (counterintuitive); \"+ c\" outside moves it UP. Inside changes are horizontal and reversed; outside changes are vertical and as written.", zh: "\"x − k\" 使图像右移 k（反直觉）；外侧 \"+ c\" 使图像上移。括号内是水平方向且反向；括号外是竖直方向且正向。" }
        },
        {
          t: "vocab",
          q: { en: "Which function is odd?", zh: "哪个函数是奇函数？" },
          o: [
            { en: "f(x) = x³", zh: "f(x) = x³" },
            { en: "f(x) = x²", zh: "f(x) = x²" },
            { en: "f(x) = |x|", zh: "f(x) = |x|" },
            { en: "f(x) = x² + 1", zh: "f(x) = x² + 1" }
          ],
          a: 0,
          e: { en: "Odd: f(−x) = −f(x), symmetric about the origin (x³, sin x). Even: f(−x) = f(x), y-axis symmetric (x², cos x, |x|).", zh: "奇函数：f(−x) = −f(x)，关于原点对称（x³、sin x）。偶函数：f(−x) = f(x)，关于 y 轴对称（x²、cos x、|x|）。" }
        },
        {
          t: "calculation",
          q: { en: "Find the inverse of f(x) = 2x + 1.", zh: "求 f(x) = 2x + 1 的反函数。" },
          o: [
            { en: "f⁻¹(x) = (x − 1)/2", zh: "f⁻¹(x) = (x − 1)/2" },
            { en: "f⁻¹(x) = 1/(2x + 1)", zh: "f⁻¹(x) = 1/(2x + 1)" },
            { en: "f⁻¹(x) = 2x − 1", zh: "f⁻¹(x) = 2x − 1" },
            { en: "f⁻¹(x) = (x + 1)/2", zh: "f⁻¹(x) = (x + 1)/2" }
          ],
          a: 0,
          e: { en: "Swap x and y, then solve: x = 2y + 1 → y = (x − 1)/2. Check: f(f⁻¹(5)) should equal 5. Graphs of f and f⁻¹ reflect over the line y = x.", zh: "交换 x 和 y 再解：x = 2y + 1 → y = (x − 1)/2。验证：f(f⁻¹(5)) 应等于5。f 与 f⁻¹ 的图像关于 y = x 对称。" }
        },
        {
          t: "calculation",
          q: { en: "A ball is thrown with height h(t) = −16t² + 40t (feet). What is its maximum height?", zh: "抛球高度 h(t) = −16t² + 40t（英尺）。最大高度是多少？" },
          o: [
            { en: "25 ft at t = 1.25 s", zh: "25 英尺，在 t = 1.25 秒" },
            { en: "40 ft at t = 1 s", zh: "40 英尺，在 t = 1 秒" },
            { en: "16 ft at t = 2 s", zh: "16 英尺，在 t = 2 秒" },
            { en: "50 ft at t = 0.8 s", zh: "50 英尺，在 t = 0.8 秒" }
          ],
          a: 0,
          e: { en: "Vertex at t = −b/(2a) = −40/(−32) = 1.25 s; h(1.25) = −16(1.5625) + 50 = 25 ft. For a = −16, b = 40: max at t = −b/2a.", zh: "顶点在 t = −b/(2a) = −40/(−32) = 1.25 秒；h(1.25) = −16(1.5625) + 50 = 25 英尺。开口向下，顶点即最大值。" }
        },
        {
          t: "calculation",
          q: { en: "What is the average rate of change of f(x) = x² from x = 1 to x = 3?", zh: "f(x) = x² 在 x = 1 到 x = 3 之间的平均变化率是？" },
          o: [
            { en: "4", zh: "4" },
            { en: "8", zh: "8" },
            { en: "2", zh: "2" },
            { en: "9", zh: "9" }
          ],
          a: 0,
          e: { en: "Slope of the secant line: (f(3) − f(1))/(3 − 1) = (9 − 1)/2 = 4. This is the idea behind the derivative: shrinking the interval toward a single point.", zh: "割线斜率：(f(3) − f(1))/(3 − 1) = (9 − 1)/2 = 4。这正是导数的雏形：让区间缩短逼近一个点。" }
        },
        {
          t: "concept",
          q: { en: "Simplify the difference quotient [f(x + h) − f(x)]/h for f(x) = x² (h ≠ 0).", zh: "化简 f(x) = x² 的差商 [f(x + h) − f(x)]/h（h ≠ 0）。" },
          o: [
            { en: "2x + h", zh: "2x + h" },
            { en: "2x", zh: "2x" },
            { en: "x + h", zh: "x + h" },
            { en: "h", zh: "h" }
          ],
          a: 0,
          e: { en: "(x+h)² − x² = 2xh + h²; divide by h → 2x + h. As h → 0, this approaches 2x — the derivative of x².", zh: "(x+h)² − x² = 2xh + h²；除以 h 得 2x + h。当 h → 0 时趋于 2x——即 x² 的导数。" }
        }
      ]
    },
    {
      id: "pc2",
      name: { en: "Unit 2 · Polynomial & Rational Functions", zh: "第2单元 · 多项式与有理函数" },
      topics: [
        { en: "End behavior", zh: "末端行为" },
        { en: "Zeros, multiplicity & the Factor Theorem", zh: "零点、重数与因子定理" },
        { en: "Vertical & horizontal asymptotes", zh: "垂直与水平渐近线" },
        { en: "Slant (oblique) asymptotes", zh: "斜渐近线" },
        { en: "Graphing rational functions", zh: "有理函数图像" },
        { en: "Extraneous solutions", zh: "增根（无解检验）" },
        { en: "Building polynomials from zeros", zh: "由零点构造多项式" },
        { en: "Holes vs asymptotes", zh: "挖孔点 vs 渐近线" }
      ],
      questions: [
        {
          t: "concept",
          q: { en: "Describe the end behavior of f(x) = 2x³ − x + 7.", zh: "描述 f(x) = 2x³ − x + 7 的末端行为。" },
          o: [
            { en: "Left end down, right end up", zh: "左端向下，右端向上" },
            { en: "Both ends up", zh: "两端都向上" },
            { en: "Both ends down", zh: "两端都向下" },
            { en: "Left end up, right end down", zh: "左端向上，右端向下" }
          ],
          a: 0,
          e: { en: "Odd degree + positive leading coefficient: as x → −∞, y → −∞; as x → +∞, y → +∞. Even degree positive: both ends up.", zh: "奇次 + 正首项系数：x → −∞ 时 y → −∞；x → +∞ 时 y → +∞。偶次正首项：两端都向上。" }
        },
        {
          t: "concept",
          q: { en: "If f(2) = 0 for a polynomial f, which statement is true?", zh: "若多项式 f 满足 f(2) = 0，哪个结论成立？" },
          o: [
            { en: "(x − 2) is a factor of f(x)", zh: "(x − 2) 是 f(x) 的因式" },
            { en: "(x + 2) is a factor of f(x)", zh: "(x + 2) 是 f(x) 的因式" },
            { en: "2 is a local maximum", zh: "2 是局部最大值" },
            { en: "f has a hole at x = 2", zh: "f 在 x = 2 处有孔" }
          ],
          a: 0,
          e: { en: "Factor Theorem: x = a is a zero ⟺ (x − a) divides the polynomial. Remainder Theorem: f(a) equals the remainder when dividing by (x − a).", zh: "因子定理：x = a 是零点 ⟺ (x − a) 整除多项式。余数定理：f(a) 等于除以 (x − a) 的余数。" }
        },
        {
          t: "concept",
          q: { en: "A polynomial has a zero at x = 1 with multiplicity 2. At this zero the graph:", zh: "多项式在 x = 1 处有 2 重零点。此处图像会：" },
          o: [
            { en: "Touches the x-axis and bounces off (does not cross)", zh: "触碰 x 轴后弹回（不穿过）" },
            { en: "Crosses straight through the axis", zh: "直接穿过 x 轴" },
            { en: "Has a vertical asymptote", zh: "有垂直渐近线" },
            { en: "Has a hole", zh: "有一个孔" }
          ],
          a: 0,
          e: { en: "Even multiplicity → touch and turn (like x²). Odd multiplicity → cross through (like x³). This is how you sketch polynomial graphs fast.", zh: "偶重数 → 触碰并折返（如 x²）。奇重数 → 直接穿过（如 x³）。这是快速画多项式草图的关键。" }
        },
        {
          t: "calculation",
          q: { en: "Find the vertical asymptote(s) of f(x) = (x + 1)/((x − 2)(x + 2)).", zh: "求 f(x) = (x + 1)/((x − 2)(x + 2)) 的垂直渐近线。" },
          o: [
            { en: "x = 2 and x = −2", zh: "x = 2 和 x = −2" },
            { en: "x = −1", zh: "x = −1" },
            { en: "x = 0", zh: "x = 0" },
            { en: "y = 2", zh: "y = 2" }
          ],
          a: 0,
          e: { en: "Vertical asymptotes come from zeros of the denominator that are NOT canceled by the numerator. (x + 1) cancels nothing here → VAs at x = ±2. If a factor cancels, you get a hole instead.", zh: "垂直渐近线来自分母的、未被分子约去的零点。(x + 1) 在此不消去任何因子 → x = ±2 处有垂直渐近线。若因子约去，则变成孔。" }
        },
        {
          t: "concept",
          q: { en: "The horizontal asymptote of f(x) = (3x² + 2)/(x² − 1) is:", zh: "f(x) = (3x² + 2)/(x² − 1) 的水平渐近线是：" },
          o: [
            { en: "y = 3", zh: "y = 3" },
            { en: "y = 1", zh: "y = 1" },
            { en: "y = 0", zh: "y = 0" },
            { en: "No horizontal asymptote", zh: "没有水平渐近线" }
          ],
          a: 0,
          e: { en: "Equal degrees → HA = ratio of leading coefficients (3/1 = 3). Top degree smaller → y = 0. Top bigger → no HA (there's a slant asymptote instead).", zh: "次数相等 → HA = 首项系数之比（3/1 = 3）。分子次数低 → y = 0。分子次数高 → 无水平渐近线（而是斜渐近线）。" }
        },
        {
          t: "calculation",
          q: { en: "Find the slant asymptote of f(x) = (x² + 1)/x.", zh: "求 f(x) = (x² + 1)/x 的斜渐近线。" },
          o: [
            { en: "y = x", zh: "y = x" },
            { en: "y = x + 1", zh: "y = x + 1" },
            { en: "y = 1", zh: "y = 1" },
            { en: "x = 0", zh: "x = 0" }
          ],
          a: 0,
          e: { en: "Divide: x² + 1 = x·x + 1, so (x² + 1)/x = x + 1/x → as |x| grows, the 1/x term vanishes and the graph hugs y = x.", zh: "相除：x² + 1 = x·x + 1，所以 (x² + 1)/x = x + 1/x → 当 |x| 增大，1/x 项消失，图像贴着 y = x。" }
        },
        {
          t: "calculation",
          q: { en: "Solve 1/(x − 2) + 1/(x + 2) = 4/(x² − 4).", zh: "解方程 1/(x − 2) + 1/(x + 2) = 4/(x² − 4)。" },
          o: [
            { en: "No solution — x = 2 is extraneous", zh: "无解 —— x = 2 是增根" },
            { en: "x = 2", zh: "x = 2" },
            { en: "x = 4", zh: "x = 4" },
            { en: "x = 0", zh: "x = 0" }
          ],
          a: 0,
          e: { en: "Multiply by (x−2)(x+2): (x+2) + (x−2) = 4 → x = 2. But x = 2 makes the denominator zero — always check solutions against the original domain. Answer: no solution.", zh: "两边乘 (x−2)(x+2)：(x+2) + (x−2) = 4 → x = 2。但 x = 2 使分母为零——务必代回原方程检验。答案：无解。" }
        },
        {
          t: "calculation",
          q: { en: "Which polynomial has zeros 1, −1, and 2 with leading coefficient 1?", zh: "哪个多项式以 1、−1、2 为零点且首项系数为 1？" },
          o: [
            { en: "x³ − 2x² − x + 2", zh: "x³ − 2x² − x + 2" },
            { en: "x³ + 2x² − x − 2", zh: "x³ + 2x² − x − 2" },
            { en: "x³ − 2x² + x − 2", zh: "x³ − 2x² + x − 2" },
            { en: "x³ − x", zh: "x³ − x" }
          ],
          a: 0,
          e: { en: "Zeros a, b, c → f(x) = (x − a)(x − b)(x − c) = (x−1)(x+1)(x−2) = (x²−1)(x−2) = x³ − 2x² − x + 2.", zh: "零点 a、b、c → f(x) = (x − a)(x − b)(x − c) = (x−1)(x+1)(x−2) = (x²−1)(x−2) = x³ − 2x² − x + 2。" }
        }
      ]
    },
    {
      id: "pc3",
      name: { en: "Unit 3 · Exponential & Logarithmic Functions", zh: "第3单元 · 指数与对数函数" },
      topics: [
        { en: "Exponential growth & decay", zh: "指数增长与衰减" },
        { en: "Log properties & solving", zh: "对数性质与求解" },
        { en: "Change of base", zh: "换底公式" },
        { en: "Compound & continuous interest", zh: "复利与连续复利" },
        { en: "Half-life problems", zh: "半衰期问题" },
        { en: "Natural log & e", zh: "自然对数与 e" },
        { en: "Log scales (pH, Richter)", zh: "对数尺度（pH、里氏）" },
        { en: "Inverse relationship of exp & log", zh: "指数与对数的互逆关系" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "Solve 2ˣ = 32.", zh: "解方程 2ˣ = 32。" },
          o: [
            { en: "x = 5", zh: "x = 5" },
            { en: "x = 4", zh: "x = 4" },
            { en: "x = 16", zh: "x = 16" },
            { en: "x = 6", zh: "x = 6" }
          ],
          a: 0,
          e: { en: "32 = 2⁵, so x = 5. Generally: take log of both sides → x = log 32/log 2 = 5.", zh: "32 = 2⁵，所以 x = 5。一般做法：两边取对数 → x = log 32/log 2 = 5。" }
        },
        {
          t: "concept",
          q: { en: "log 6 + log 5 condenses to:", zh: "log 6 + log 5 可合并为：" },
          o: [
            { en: "log 30", zh: "log 30" },
            { en: "log 11", zh: "log 11" },
            { en: "log 1.2", zh: "log 1.2" },
            { en: "30 log 1", zh: "30 log 1" }
          ],
          a: 0,
          e: { en: "Sum of logs = log of product: log(ab). Difference = log(a/b). Exponent comes out front: log(aⁿ) = n·log a. These ONLY work for same-base logs.", zh: "对数之和 = 积的对数：log(ab)。之差 = log(a/b)。指数可以提到前面：log(aⁿ) = n·log a。这些性质只对同底对数成立。" }
        },
        {
          t: "calculation",
          q: { en: "Solve log₂(x) = 3.", zh: "解方程 log₂(x) = 3。" },
          o: [
            { en: "x = 8", zh: "x = 8" },
            { en: "x = 6", zh: "x = 6" },
            { en: "x = 9", zh: "x = 9" },
            { en: "x = 5", zh: "x = 5" }
          ],
          a: 0,
          e: { en: "Rewrite in exponential form: x = 2³ = 8. log form ⟷ exp form: log_b(x) = y means bʸ = x.", zh: "改写为指数形式：x = 2³ = 8。对数式 ⟷ 指数式：log_b(x) = y 意味着 bʸ = x。" }
        },
        {
          t: "calculation",
          q: { en: "A sample of 80 g has a half-life of 3 days. How much remains after 9 days?", zh: "80 克样品的半衰期为 3 天。9 天后剩多少？" },
          o: [
            { en: "10 g", zh: "10 克" },
            { en: "20 g", zh: "20 克" },
            { en: "40 g", zh: "40 克" },
            { en: "5 g", zh: "5 克" }
          ],
          a: 0,
          e: { en: "9 days = 3 half-lives: 80 → 40 → 20 → 10 g. Or use A = 80·(1/2)^(9/3) = 80·(1/8) = 10.", zh: "9 天 = 3 个半衰期：80 → 40 → 20 → 10 克。或用公式 A = 80·(1/2)^(9/3) = 80·(1/8) = 10。" }
        },
        {
          t: "concept",
          q: { en: "Using the change-of-base formula, log₃(5) equals:", zh: "用换底公式，log₃(5) 等于：" },
          o: [
            { en: "log(5)/log(3)", zh: "log(5)/log(3)" },
            { en: "log(3)/log(5)", zh: "log(3)/log(5)" },
            { en: "log(5) − log(3)", zh: "log(5) − log(3)" },
            { en: "log(15)", zh: "log(15)" }
          ],
          a: 0,
          e: { en: "log_b(a) = log(a)/log(b) — works with any base (common log or ln). log₃(5) = 1.465 means 3^1.465 ≈ 5.", zh: "log_b(a) = log(a)/log(b)——任意底都成立（常用对数或 ln 均可）。log₃(5) = 1.465 意味着 3^1.465 ≈ 5。" }
        },
        {
          t: "calculation",
          q: { en: "$1,000 is invested at 5% annual interest, compounded yearly. What is the value after 2 years?", zh: "1000 美元按年利率 5% 每年复利投资。2 年后价值多少？" },
          o: [
            { en: "$1,102.50", zh: "$1,102.50" },
            { en: "$1,100.00", zh: "$1,100.00" },
            { en: "$1,050.00", zh: "$1,050.00" },
            { en: "$1,215.51", zh: "$1,215.51" }
          ],
          a: 0,
          e: { en: "A = P(1 + r/n)^(nt) = 1000(1.05)² = $1,102.50. Compounded monthly: 1000(1 + 0.05/12)^24 ≈ $1,104.94 — more compounding, more money.", zh: "A = P(1 + r/n)^(nt) = 1000(1.05)² = $1,102.50。按月复利：1000(1 + 0.05/12)^24 ≈ $1,104.94——复利越频繁，收益越多。" }
        },
        {
          t: "application",
          q: { en: "A magnitude 8 earthquake releases how much more energy than... actually, on the Richter scale, how many times greater in AMPLITUDE is magnitude 8 vs magnitude 6?", zh: "在里氏震级表上，8 级地震的振幅是 6 级的多少倍？" },
          o: [
            { en: "100 times (10²)", zh: "100 倍（10²）" },
            { en: "2 times", zh: "2 倍" },
            { en: "20 times", zh: "20 倍" },
            { en: "8 times", zh: "8 倍" }
          ],
          a: 0,
          e: { en: "Richter is base-10 logarithmic: each whole step multiplies amplitude by 10. 8 − 6 = 2 steps → 10² = 100× amplitude. Same logic for pH: pH 3 is 100× more acidic than pH 5.", zh: "里氏震级以10为底：每差1级振幅乘10。8 − 6 = 2级 → 10² = 100倍振幅。pH 同理：pH 3 比 pH 5 酸100倍。" }
        },
        {
          t: "calculation",
          q: { en: "Solve 3e^(2x) = 27 for x.", zh: "解方程 3e^(2x) = 27。" },
          o: [
            { en: "x = ln 3", zh: "x = ln 3" },
            { en: "x = ln 9", zh: "x = ln 9" },
            { en: "x = 2 ln 3", zh: "x = 2 ln 3" },
            { en: "x = ln 27", zh: "x = ln 27" }
          ],
          a: 0,
          e: { en: "e^(2x) = 9 → 2x = ln 9 = 2 ln 3 → x = ln 3 ≈ 1.10. Isolate the exponential first, then take ln of both sides.", zh: "e^(2x) = 9 → 2x = ln 9 = 2 ln 3 → x = ln 3 ≈ 1.10。先隔离指数式，再两边取 ln。" }
        }
      ]
    },
    {
      id: "pc4",
      name: { en: "Unit 4 · Trigonometric Functions", zh: "第4单元 · 三角函数" },
      topics: [
        { en: "Unit circle coordinates", zh: "单位圆坐标" },
        { en: "Degrees ↔ radians", zh: "角度与弧度互化" },
        { en: "Sine, cosine graphs & period", zh: "正弦、余弦图像与周期" },
        { en: "Amplitude & midline", zh: "振幅与中线" },
        { en: "Quadrant signs (ASTC)", zh: "各象限符号（ASTC）" },
        { en: "Arc length s = rθ", zh: "弧长 s = rθ" },
        { en: "Evaluating trig values", zh: "求三角函数值" },
        { en: "Reciprocal functions", zh: "倒数函数（csc、sec、cot）" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "sin(π/3) =", zh: "sin(π/3) = ?" },
          o: [
            { en: "√3/2", zh: "√3/2" },
            { en: "1/2", zh: "1/2" },
            { en: "√2/2", zh: "√2/2" },
            { en: "2/√3", zh: "2/√3" }
          ],
          a: 0,
          e: { en: "Memorize the key angles: sin(π/6)=1/2, sin(π/4)=√2/2, sin(π/3)=√3/2, cos mirrors them in reverse.", zh: "记住特殊角：sin(π/6)=1/2，sin(π/4)=√2/2，sin(π/3)=√3/2，cos 的顺序正好相反。" }
        },
        {
          t: "calculation",
          q: { en: "cos(240°) =", zh: "cos(240°) = ?" },
          o: [
            { en: "−1/2", zh: "−1/2" },
            { en: "1/2", zh: "1/2" },
            { en: "−√3/2", zh: "−√3/2" },
            { en: "−√2/2", zh: "−√2/2" }
          ],
          a: 0,
          e: { en: "240° is in QIII where both sin and cos are negative; reference angle = 240° − 180° = 60°, and cos(60°) = 1/2 → −1/2.", zh: "240° 在第三象限，sin 和 cos 均为负；参考角 = 240° − 180° = 60°，cos(60°) = 1/2 → −1/2。" }
        },
        {
          t: "concept",
          q: { en: "What is the period of y = 3sin(2x)?", zh: "y = 3sin(2x) 的周期是？" },
          o: [
            { en: "π", zh: "π" },
            { en: "2π", zh: "2π" },
            { en: "4π", zh: "4π" },
            { en: "3", zh: "3" }
          ],
          a: 0,
          e: { en: "Period = 2π/B where B is the coefficient of x. 2π/2 = π. The 3 is the AMPLITUDE (vertical stretch), not the period. y = sin(x/2) would have period 4π.", zh: "周期 = 2π/B，B 为 x 的系数。2π/2 = π。3 是振幅（纵向拉伸），不是周期。y = sin(x/2) 的周期则是 4π。" }
        },
        {
          t: "concept",
          q: { en: "The graph of y = 2cos(x) + 3 has maximum value:", zh: "y = 2cos(x) + 3 的最大值是：" },
          o: [
            { en: "5", zh: "5" },
            { en: "3", zh: "3" },
            { en: "2", zh: "2" },
            { en: "1", zh: "1" }
          ],
          a: 0,
          e: { en: "Amplitude 2, midline 3: the graph oscillates between 3 − 2 = 1 and 3 + 2 = 5. Max = midline + amplitude.", zh: "振幅2，中线3：图像在 3 − 2 = 1 和 3 + 2 = 5 之间振荡。最大值 = 中线 + 振幅。" }
        },
        {
          t: "calculation",
          q: { en: "Convert 5π/6 radians to degrees.", zh: "把 5π/6 弧度化为角度。" },
          o: [
            { en: "150°", zh: "150°" },
            { en: "120°", zh: "120°" },
            { en: "135°", zh: "135°" },
            { en: "300°", zh: "300°" }
          ],
          a: 0,
          e: { en: "Multiply by 180/π: (5π/6)(180/π) = 150°. Going the other way: degrees × π/180.", zh: "乘以 180/π：(5π/6)(180/π) = 150°。反向转换：角度 × π/180。" }
        },
        {
          t: "calculation",
          q: { en: "Find the arc length intercepted by θ = π/4 on a circle of radius 6.", zh: "半径为 6 的圆上，θ = π/4 所对的弧长是？" },
          o: [
            { en: "3π/2", zh: "3π/2" },
            { en: "3π/4", zh: "3π/4" },
            { en: "6π/4", zh: "6π/4" },
            { en: "24π", zh: "24π" }
          ],
          a: 0,
          e: { en: "s = rθ (θ in RADIANS): 6 · π/4 = 3π/2 ≈ 4.71. Sector area = ½r²θ = 18(π/4) = 9π/2.", zh: "s = rθ（θ 必须用弧度）：6 · π/4 = 3π/2 ≈ 4.71。扇形面积 = ½r²θ = 18(π/4) = 9π/2。" }
        },
        {
          t: "concept",
          q: { en: "If sin θ < 0 and cos θ > 0, θ is in quadrant:", zh: "若 sin θ < 0 且 cos θ > 0，θ 在第几象限？" },
          o: [
            { en: "IV", zh: "第四象限" },
            { en: "II", zh: "第二象限" },
            { en: "III", zh: "第三象限" },
            { en: "I", zh: "第一象限" }
          ],
          a: 0,
          e: { en: "ASTC = All Students Take Calculus: QI all positive, QII only sin, QIII only tan, QIV only cos. cos > 0 and sin < 0 → QIV.", zh: "ASTC 口诀：第一象限全正，第二象限只有sin，第三象限只有tan，第四象限只有cos。cos > 0 且 sin < 0 → 第四象限。" }
        },
        {
          t: "calculation",
          q: { en: "If sin θ = 3/5 and θ is in QII, what is cos θ?", zh: "若 sin θ = 3/5 且 θ 在第二象限，cos θ = ?" },
          o: [
            { en: "−4/5", zh: "−4/5" },
            { en: "4/5", zh: "4/5" },
            { en: "−3/5", zh: "−3/5" },
            { en: "−5/4", zh: "−5/4" }
          ],
          a: 0,
          e: { en: "sin² + cos² = 1 → cos² = 1 − 9/25 = 16/25 → cos = ±4/5. In QII, cosine is negative → −4/5. The 3-4-5 triangle hides inside.", zh: "sin² + cos² = 1 → cos² = 1 − 9/25 = 16/25 → cos = ±4/5。第二象限余弦为负 → −4/5。隐藏的3-4-5直角三角形。" }
        }
      ]
    },
    {
      id: "pc5",
      name: { en: "Unit 5 · Trig Identities & Equations", zh: "第5单元 · 三角恒等式与方程" },
      topics: [
        { en: "Pythagorean identities", zh: "勾股恒等式" },
        { en: "Solving trig equations", zh: "解三角方程" },
        { en: "Double-angle formulas", zh: "倍角公式" },
        { en: "Law of Sines", zh: "正弦定理" },
        { en: "Law of Cosines", zh: "余弦定理" },
        { en: "Ambiguous case (SSA)", zh: "SSA歧义情况" },
        { en: "Sum & difference formulas", zh: "和差公式" },
        { en: "Verifying identities", zh: "验证恒等式" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "Simplify (1 − cos²θ)/sinθ.", zh: "化简 (1 − cos²θ)/sinθ。" },
          o: [
            { en: "sin θ", zh: "sin θ" },
            { en: "cos θ", zh: "cos θ" },
            { en: "tan θ", zh: "tan θ" },
            { en: "csc θ", zh: "csc θ" }
          ],
          a: 0,
          e: { en: "sin²θ + cos²θ = 1 → 1 − cos²θ = sin²θ. Divide by sinθ → sinθ. Strategy: convert everything to sin and cos first.", zh: "sin²θ + cos²θ = 1 → 1 − cos²θ = sin²θ。除以 sinθ 得 sinθ。策略：先把所有函数化为 sin 和 cos。" }
        },
        {
          t: "calculation",
          q: { en: "Solve sin θ = 1/2 for θ in [0, 2π).", zh: "在 [0, 2π) 内解方程 sin θ = 1/2。" },
          o: [
            { en: "θ = π/6 and 5π/6", zh: "θ = π/6 和 5π/6" },
            { en: "θ = π/6 only", zh: "只有 θ = π/6" },
            { en: "θ = π/3 and 2π/3", zh: "θ = π/3 和 2π/3" },
            { en: "θ = π/6, π/2, 5π/6", zh: "θ = π/6、π/2、5π/6" }
          ],
          a: 0,
          e: { en: "Sine is positive in QI and QII: reference angle π/6 gives π/6 and π − π/6 = 5π/6. Always ask: which quadrants match the sign, then list ALL solutions in the interval.", zh: "正弦在第一、二象限为正：参考角 π/6 给出 π/6 和 π − π/6 = 5π/6。永远先问哪些象限符号相符，再列出区间内所有解。" }
        },
        {
          t: "calculation",
          q: { en: "If sin θ = 3/5 and cos θ = 4/5, what is sin(2θ)?", zh: "若 sin θ = 3/5，cos θ = 4/5，求 sin(2θ)。" },
          o: [
            { en: "24/25", zh: "24/25" },
            { en: "12/25", zh: "12/25" },
            { en: "7/25", zh: "7/25" },
            { en: "6/5", zh: "6/5" }
          ],
          a: 0,
          e: { en: "sin(2θ) = 2 sinθ cosθ = 2(3/5)(4/5) = 24/25. Also useful: cos(2θ) = cos²−sin² = 1 − 2sin² = 2cos²−1.", zh: "sin(2θ) = 2 sinθ cosθ = 2(3/5)(4/5) = 24/25。另外记住：cos(2θ) = cos²−sin² = 1 − 2sin² = 2cos²−1。" }
        },
        {
          t: "calculation",
          q: { en: "A triangle has sides a = 5, b = 7 with included angle C = 60°. Find side c.", zh: "三角形中 a = 5，b = 7，夹角 C = 60°。求边 c。" },
          o: [
            { en: "√39", zh: "√39" },
            { en: "√74", zh: "√74" },
            { en: "√109", zh: "√109" },
            { en: "6", zh: "6" }
          ],
          a: 0,
          e: { en: "Law of Cosines: c² = a² + b² − 2ab·cosC = 25 + 49 − 70(0.5) = 34 → c = √39. Use Law of Cosines for SAS or SSS.", zh: "余弦定理：c² = a² + b² − 2ab·cosC = 25 + 49 − 70(0.5) = 34 → c = √39。SAS 或 SSS 用余弦定理。" }
        },
        {
          t: "concept",
          q: { en: "Which equation is NOT an identity?", zh: "下面哪个等式不是恒等式？" },
          o: [
            { en: "sin(x + y) = sin x + sin y", zh: "sin(x + y) = sin x + sin y" },
            { en: "sin²x + cos²x = 1", zh: "sin²x + cos²x = 1" },
            { en: "tan x · cos x = sin x", zh: "tan x · cos x = sin x" },
            { en: "cos(−x) = cos x", zh: "cos(−x) = cos x" }
          ],
          a: 0,
          e: { en: "sin(x + y) = sinx cosy + cosx siny — a sum does NOT split. Test with numbers: sin(π/2 + π/2) = 0 but 1 + 1 = 2. Verify identities by testing values and working one side to the other.", zh: "sin(x + y) = sinx cosy + cosx siny——和不能拆开。代入检验：sin(π/2 + π/2) = 0，但 1 + 1 = 2。验证恒等式的方法：代入数值、或从一边推到另一边。" }
        },
        {
          t: "concept",
          q: { en: "Given A = 30°, a = 5, b = 12 (SSA), what happens when solving the triangle?", zh: "已知 A = 30°，a = 5，b = 12（SSA），解三角形时会出现什么？" },
          o: [
            { en: "No triangle exists (a < b·sinA)", zh: "三角形不存在（a < b·sinA）" },
            { en: "Exactly one triangle", zh: "恰好一个三角形" },
            { en: "Two triangles (ambiguous case)", zh: "两个三角形（歧义情况）" },
            { en: "Infinitely many triangles", zh: "无穷多个三角形" }
          ],
          a: 0,
          e: { en: "The ambiguous case: b·sinA = 6 > 5 = a → the side is too short to reach, no triangle. If a ≥ b·sinA but a < b → two triangles; if a ≥ b → one.", zh: "歧义情况：b·sinA = 6 > 5 = a → 边太短够不着，无三角形。若 a ≥ b·sinA 但 a < b → 两个三角形；若 a ≥ b → 一个。" }
        },
        {
          t: "calculation",
          q: { en: "Solve 2sin²θ − sinθ − 1 = 0 for θ in [0, 2π).", zh: "在 [0, 2π) 内解方程 2sin²θ − sinθ − 1 = 0。" },
          o: [
            { en: "θ = π/2, 7π/6, 11π/6", zh: "θ = π/2、7π/6、11π/6" },
            { en: "θ = π/6 only", zh: "只有 θ = π/6" },
            { en: "θ = 3π/2 only", zh: "只有 θ = 3π/2" },
            { en: "θ = π/2, π/6", zh: "θ = π/2、π/6" }
          ],
          a: 0,
          e: { en: "Factor: (2sinθ + 1)(sinθ − 1) = 0 → sinθ = −1/2 (QIII, QIV: 7π/6, 11π/6) or sinθ = 1 (θ = π/2). Treat trig equations like quadratics in disguise.", zh: "因式分解：(2sinθ + 1)(sinθ − 1) = 0 → sinθ = −1/2（第三、四象限：7π/6、11π/6）或 sinθ = 1（θ = π/2）。把三角方程当作伪装的二次方程来解。" }
        },
        {
          t: "calculation",
          q: { en: "If sin θ = 1/3, what is cos(2θ)?", zh: "若 sin θ = 1/3，求 cos(2θ)。" },
          o: [
            { en: "7/9", zh: "7/9" },
            { en: "−7/9", zh: "−7/9" },
            { en: "8/9", zh: "8/9" },
            { en: "2/9", zh: "2/9" }
          ],
          a: 0,
          e: { en: "cos(2θ) = 1 − 2sin²θ = 1 − 2(1/9) = 7/9. Pick the double-angle form that uses only the quantity you know.", zh: "cos(2θ) = 1 − 2sin²θ = 1 − 2(1/9) = 7/9。选择只含已知量的那个倍角公式即可。" }
        }
      ]
    },
    {
      id: "pc6",
      name: { en: "Unit 6 · Vectors, Polar & Parametric", zh: "第6单元 · 向量、极坐标与参数方程" },
      topics: [
        { en: "Vector magnitude & direction", zh: "向量的大小与方向" },
        { en: "Component form", zh: "分量形式" },
        { en: "Dot product & orthogonality", zh: "点积与垂直" },
        { en: "Polar ↔ rectangular coordinates", zh: "极坐标与直角坐标互化" },
        { en: "De Moivre's theorem", zh: "棣莫弗定理" },
        { en: "Parametric equations", zh: "参数方程" },
        { en: "Resultant vectors (navigation)", zh: "合向量（航行问题）" },
        { en: "Polar graphs", zh: "极坐标图像" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "What is the magnitude of the vector ⟨3, 4⟩?", zh: "向量 ⟨3, 4⟩ 的大小是？" },
          o: [
            { en: "5", zh: "5" },
            { en: "7", zh: "7" },
            { en: "12", zh: "12" },
            { en: "25", zh: "25" }
          ],
          a: 0,
          e: { en: "|v| = √(3² + 4²) = 5 — the classic 3-4-5 right triangle. Magnitude is always √(x² + y²).", zh: "|v| = √(3² + 4²) = 5——经典的3-4-5直角三角形。模长总是 √(x² + y²)。" }
        },
        {
          t: "calculation",
          q: { en: "For what value of k are ⟨2, 3⟩ and ⟨6, k⟩ perpendicular?", zh: "k 为何值时 ⟨2, 3⟩ 与 ⟨6, k⟩ 垂直？" },
          o: [
            { en: "−4", zh: "−4" },
            { en: "4", zh: "4" },
            { en: "1", zh: "1" },
            { en: "0", zh: "0" }
          ],
          a: 0,
          e: { en: "Orthogonal ⟺ dot product = 0: (2)(6) + (3)(k) = 0 → 12 + 3k = 0 → k = −4. Parallel vectors instead have proportional components (⟨2,3⟩ ∥ ⟨4,6⟩).", zh: "垂直 ⟺ 点积为0：(2)(6) + (3)(k) = 0 → 12 + 3k = 0 → k = −4。平行向量则分量成比例（⟨2,3⟩ ∥ ⟨4,6⟩）。" }
        },
        {
          t: "calculation",
          q: { en: "Convert the polar point (4, π/2) to rectangular coordinates.", zh: "把极坐标点 (4, π/2) 化为直角坐标。" },
          o: [
            { en: "(0, 4)", zh: "(0, 4)" },
            { en: "(4, 0)", zh: "(4, 0)" },
            { en: "(4, 4)", zh: "(4, 4)" },
            { en: "(0, −4)", zh: "(0, −4)" }
          ],
          a: 0,
          e: { en: "x = r cosθ = 4·cos(π/2) = 0; y = r sinθ = 4·sin(π/2) = 4. Going back: r = √(x² + y²), θ = arctan(y/x) with quadrant check.", zh: "x = r cosθ = 4·cos(π/2) = 0；y = r sinθ = 4·sin(π/2) = 4。反向转换：r = √(x² + y²)，θ = arctan(y/x) 并注意象限。" }
        },
        {
          t: "calculation",
          q: { en: "Express (−1, 1) in polar form (r > 0, 0 ≤ θ < 2π).", zh: "把 (−1, 1) 表示为极坐标（r > 0，0 ≤ θ < 2π）。" },
          o: [
            { en: "(√2, 3π/4)", zh: "(√2, 3π/4)" },
            { en: "(√2, π/4)", zh: "(√2, π/4)" },
            { en: "(2, 3π/4)", zh: "(2, 3π/4)" },
            { en: "(√2, 5π/4)", zh: "(√2, 5π/4)" }
          ],
          a: 0,
          e: { en: "r = √(1 + 1) = √2. The point (−1, 1) sits in QII, θ = π + arctan(1/1) − ... use arctan(1/−1) = −45° → +180° = 135° = 3π/4.", zh: "r = √(1 + 1) = √2。点 (−1, 1) 在第二象限，θ = 135° = 3π/4。" }
        },
        {
          t: "calculation",
          q: { en: "Use De Moivre's theorem: (√3 + i)³ = ?", zh: "用棣莫弗定理计算 (√3 + i)³ = ?" },
          o: [
            { en: "8i", zh: "8i" },
            { en: "−8i", zh: "−8i" },
            { en: "8", zh: "8" },
            { en: "−8", zh: "−8" }
          ],
          a: 0,
          e: { en: "√3 + i has r = 2, θ = π/6. De Moivre: (r cisθ)ⁿ = rⁿ cis(nθ) → 2³ cis(π/2) = 8i. This also gives n-th roots: roots are spaced 2π/n apart around a circle.", zh: "√3 + i 的 r = 2，θ = π/6。棣莫弗定理：(r cisθ)ⁿ = rⁿ cis(nθ) → 2³ cis(π/2) = 8i。它也用于求 n 次方根：根均匀分布在圆上，间隔 2π/n。" }
        },
        {
          t: "calculation",
          q: { en: "Eliminate the parameter: x = t + 1, y = t².", zh: "消去参数：x = t + 1，y = t²。" },
          o: [
            { en: "y = (x − 1)²", zh: "y = (x − 1)²" },
            { en: "y = (x + 1)²", zh: "y = (x + 1)²" },
            { en: "y = x²", zh: "y = x²" },
            { en: "y = x − 1", zh: "y = x − 1" }
          ],
          a: 0,
          e: { en: "Solve for t: t = x − 1, substitute: y = (x − 1)². Parametric form traces a parabola with t acting as time.", zh: "解出 t：t = x − 1，代入得 y = (x − 1)²。参数方程描绘一条抛物线，t 相当于时间。" }
        },
        {
          t: "calculation",
          q: { en: "A plane flies north at 200 km/h through a wind blowing east at 50 km/h. What is the plane's ground speed (resultant magnitude)?", zh: "飞机以200 km/h向北飞，侧风以50 km/h向东吹。地面速度（合速度大小）约为？" },
          o: [
            { en: "≈ 206 km/h", zh: "≈ 206 km/h" },
            { en: "250 km/h", zh: "250 km/h" },
            { en: "150 km/h", zh: "150 km/h" },
            { en: "200 km/h", zh: "200 km/h" }
          ],
          a: 0,
          e: { en: "Perpendicular vectors: |v| = √(200² + 50²) = √42,500 ≈ 206.2 km/h. Direction = arctan(50/200) ≈ 14° east of north.", zh: "相互垂直的向量：|v| = √(200² + 50²) = √42500 ≈ 206.2 km/h。方向 = arctan(50/200) ≈ 北偏东14°。" }
        },
        {
          t: "concept",
          q: { en: "The polar equation r = 2cosθ graphs as:", zh: "极坐标方程 r = 2cosθ 的图像是：" },
          o: [
            { en: "A circle", zh: "一个圆" },
            { en: "A cardioid", zh: "心形线" },
            { en: "A 4-petal rose", zh: "四瓣玫瑰线" },
            { en: "A line", zh: "一条直线" }
          ],
          a: 0,
          e: { en: "r = a·cosθ (or sin) → circle through the pole. r² = a²cos2θ → lemniscate; r = 1 + cosθ → cardioid; r = cos2θ → 4-petal rose.", zh: "r = a·cosθ（或 sin）→ 过极点的圆。r² = a²cos2θ → 双纽线；r = 1 + cosθ → 心形线；r = cos2θ → 四瓣玫瑰线。" }
        }
      ]
    },
    {
      id: "pc7",
      name: { en: "Unit 7 · Systems & Matrices", zh: "第7单元 · 方程组与矩阵" },
      topics: [
        { en: "Solving linear systems", zh: "解线性方程组" },
        { en: "Matrix operations & dimensions", zh: "矩阵运算与维数" },
        { en: "Inverses of 2×2 matrices", zh: "2×2矩阵的逆" },
        { en: "Determinants", zh: "行列式" },
        { en: "Cramer's rule", zh: "克拉默法则" },
        { en: "Consistent vs inconsistent systems", zh: "相容与不相容方程组" },
        { en: "Row reduction (Gaussian elimination)", zh: "高斯消元" },
        { en: "Word problems with systems", zh: "方程组应用题" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "Solve: 2x + y = 7 and x − y = 2.", zh: "解方程组：2x + y = 7，x − y = 2。" },
          o: [
            { en: "x = 3, y = 1", zh: "x = 3，y = 1" },
            { en: "x = 1, y = 5", zh: "x = 1，y = 5" },
            { en: "x = 2, y = 3", zh: "x = 2，y = 3" },
            { en: "x = 4, y = −1", zh: "x = 4，y = −1" }
          ],
          a: 0,
          e: { en: "Add the equations (y cancels): 3x = 9 → x = 3, then y = 1. Elimination, substitution, graphing, and matrices all arrive at the same intersection point.", zh: "两式相加（y 消去）：3x = 9 → x = 3，进而 y = 1。消元法、代入法、图像法、矩阵法殊途同归。" }
        },
        {
          t: "concept",
          q: { en: "If A is 2×3 and B is 3×4, then AB has dimensions:", zh: "若 A 是 2×3，B 是 3×4，则 AB 的维数是：" },
          o: [
            { en: "2×4", zh: "2×4" },
            { en: "3×3", zh: "3×3" },
            { en: "2×3", zh: "2×3" },
            { en: "Not defined", zh: "无法相乘" }
          ],
          a: 0,
          e: { en: "Inner dimensions must match (3 = 3 ✓); the product takes the outer dimensions. Note AB ≠ BA in general — matrix multiplication is not commutative.", zh: "内维必须相等（3 = 3 ✓）；乘积取外维。注意一般 AB ≠ BA——矩阵乘法不满足交换律。" }
        },
        {
          t: "calculation",
          q: { en: "Find the inverse of A = [[2, 3], [1, 2]].", zh: "求 A = [[2, 3], [1, 2]] 的逆矩阵。" },
          o: [
            { en: "[[2, −3], [−1, 2]]", zh: "[[2, −3], [−1, 2]]" },
            { en: "[[2, −1], [−3, 2]]", zh: "[[2, −1], [−3, 2]]" },
            { en: "[[2, 3], [1, 2]]", zh: "[[2, 3], [1, 2]]" },
            { en: "[[1/2, −3], [−1, 1]]", zh: "[[1/2, −3], [−1, 1]]" }
          ],
          a: 0,
          e: { en: "det = (2)(2) − (3)(1) = 1. A⁻¹ = (1/det)[[d, −b], [−c, a]] = [[2, −3], [−1, 2]]. Verify: A·A⁻¹ = I.", zh: "行列式 = (2)(2) − (3)(1) = 1。A⁻¹ = (1/det)[[d, −b], [−c, a]] = [[2, −3], [−1, 2]]。验证：A·A⁻¹ = I。" }
        },
        {
          t: "concept",
          q: { en: "If a square matrix has determinant 0, then:", zh: "若方阵的行列式为0，则：" },
          o: [
            { en: "It has no inverse (system may have no or infinitely many solutions)", zh: "它不可逆（方程组可能无解或有无穷多解）" },
            { en: "Its inverse is the identity", zh: "它的逆是单位矩阵" },
            { en: "It must be the zero matrix", zh: "它一定是零矩阵" },
            { en: "The system has exactly one solution", zh: "方程组恰有一解" }
          ],
          a: 0,
          e: { en: "det = 0 → singular matrix, no inverse. Geometrically the system's lines are parallel (no solution) or identical (infinitely many). det ≠ 0 → unique solution via A⁻¹x = b.", zh: "det = 0 → 奇异矩阵，不可逆。几何上是两线平行（无解）或重合（无穷多解）。det ≠ 0 → 唯一解 A⁻¹x = b。" }
        },
        {
          t: "calculation",
          q: { en: "Using Cramer's rule on 2x + y = 7, x − y = 2, what is x?", zh: "用克拉默法则解 2x + y = 7，x − y = 2，x = ?" },
          o: [
            { en: "x = 3", zh: "x = 3" },
            { en: "x = 7", zh: "x = 7" },
            { en: "x = −3", zh: "x = −3" },
            { en: "x = 1", zh: "x = 1" }
          ],
          a: 0,
          e: { en: "D = |[2,1;1,−1]| = −3. Dx = |[7,1;2,−1]| = −9. x = Dx/D = 3. Replace the x-column with constants to get Dx.", zh: "D = |[2,1;1,−1]| = −3。Dx = |[7,1;2,−1]| = −9。x = Dx/D = 3。把 x 列换成常数列即得 Dx。" }
        },
        {
          t: "concept",
          q: { en: "A system's two equations graph as parallel distinct lines. The system is:", zh: "方程组中两个方程的图像是平行的不同直线。该方程组是：" },
          o: [
            { en: "Inconsistent (no solution)", zh: "不相容（无解）" },
            { en: "Consistent with one solution", zh: "相容且有一解" },
            { en: "Dependent (infinitely many)", zh: "相依（无穷多解）" },
            { en: "Impossible to classify", zh: "无法判断" }
          ],
          a: 0,
          e: { en: "Parallel lines never meet → inconsistent. Same line → dependent (infinitely many). Intersecting lines → consistent, unique solution. Row-reduction reveals 0 = 0 (dependent) or 0 = k (inconsistent).", zh: "平行线永不相交 → 不相容。重合 → 相依（无穷解）。相交 → 相容唯一解。消元时出现 0 = 0 是相依，0 = 非零常数是不相容。" }
        },
        {
          t: "calculation",
          q: { en: "Movie tickets: 3 adult + 2 child tickets cost $31; 1 adult + 2 child tickets cost $17. Find the adult price.", zh: "电影票：3张成人票+2张儿童票共$31；1张成人票+2张儿童票共$17。成人票多少元？" },
          o: [
            { en: "$7", zh: "$7" },
            { en: "$5", zh: "$5" },
            { en: "$6", zh: "$6" },
            { en: "$8", zh: "$8" }
          ],
          a: 0,
          e: { en: "3a + 2c = 31; a + 2c = 17. Subtract: 2a = 14 → a = 7, then c = 5. Set up variables, translate each sentence into an equation.", zh: "3a + 2c = 31；a + 2c = 17。相减：2a = 14 → a = 7，c = 5。先设变量，再把每句话翻译成方程。" }
        },
        {
          t: "concept",
          q: { en: "Solving a system with matrices, X = A⁻¹B requires:", zh: "用矩阵解方程组 X = A⁻¹B 的前提是：" },
          o: [
            { en: "A is square with det ≠ 0", zh: "A 是方阵且行列式不为0" },
            { en: "A is any size matrix", zh: "A 可以是任意矩阵" },
            { en: "B must be the identity", zh: "B 必须是单位矩阵" },
            { en: "A must equal B", zh: "A 必须等于 B" }
          ],
          a: 0,
          e: { en: "Only square matrices can have inverses, and only when det ≠ 0. Then AX = B → X = A⁻¹B solves the system in one matrix operation.", zh: "只有方阵才可能有逆，且需 det ≠ 0。此时 AX = B → X = A⁻¹B，一步矩阵运算即可解方程组。" }
        }
      ]
    },
    {
      id: "pc8",
      name: { en: "Unit 8 · Sequences & Series", zh: "第8单元 · 数列与级数" },
      topics: [
        { en: "Arithmetic sequences & sums", zh: "等差数列与求和" },
        { en: "Geometric sequences & sums", zh: "等比数列与求和" },
        { en: "Infinite geometric series", zh: "无穷等比级数" },
        { en: "Sigma notation", zh: "求和符号 Σ" },
        { en: "Recursive formulas", zh: "递推公式" },
        { en: "Convergence condition |r| < 1", zh: "收敛条件 |r| < 1" },
        { en: "Repeating decimals", zh: "循环小数" },
        { en: "Modeling with sequences", zh: "用数列建模" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "An arithmetic sequence starts at 5 with common difference 3. What is the 20th term?", zh: "等差数列首项为5，公差为3。第20项是多少？" },
          o: [
            { en: "62", zh: "62" },
            { en: "65", zh: "65" },
            { en: "59", zh: "59" },
            { en: "60", zh: "60" }
          ],
          a: 0,
          e: { en: "aₙ = a₁ + (n − 1)d = 5 + 19(3) = 62. The (n − 1) is the classic trap — the first term gets no difference added.", zh: "aₙ = a₁ + (n − 1)d = 5 + 19(3) = 62。注意是 (n − 1)——首项不加公差，这是经典陷阱。" }
        },
        {
          t: "calculation",
          q: { en: "Find the sum of the first 10 terms of 2 + 5 + 8 + ...", zh: "求数列 2 + 5 + 8 + ... 前10项之和。" },
          o: [
            { en: "155", zh: "155" },
            { en: "149", zh: "149" },
            { en: "290", zh: "290" },
            { en: "125", zh: "125" }
          ],
          a: 0,
          e: { en: "Sₙ = n(a₁ + aₙ)/2 with a₁₀ = 2 + 9(3) = 29: S₁₀ = 10(2 + 29)/2 = 155. Or Sₙ = n/2[2a₁ + (n−1)d].", zh: "Sₙ = n(a₁ + aₙ)/2，其中 a₁₀ = 2 + 9(3) = 29：S₁₀ = 10(2 + 29)/2 = 155。或用 Sₙ = n/2[2a₁ + (n−1)d]。" }
        },
        {
          t: "calculation",
          q: { en: "A geometric sequence starts at 3 with ratio 2. What is the 6th term?", zh: "等比数列首项为3，公比为2。第6项是多少？" },
          o: [
            { en: "96", zh: "96" },
            { en: "192", zh: "192" },
            { en: "48", zh: "48" },
            { en: "36", zh: "36" }
          ],
          a: 0,
          e: { en: "aₙ = a₁·r⁽ⁿ⁻¹⁾ = 3·2⁵ = 96. Same off-by-one trap: 5 ratios, not 6.", zh: "aₙ = a₁·r⁽ⁿ⁻¹⁾ = 3·2⁵ = 96。同样的差一陷阱：只乘5次公比，不是6次。" }
        },
        {
          t: "calculation",
          q: { en: "Evaluate the infinite series 8 + 4 + 2 + 1 + ...", zh: "求无穷级数 8 + 4 + 2 + 1 + ... 的和。" },
          o: [
            { en: "16", zh: "16" },
            { en: "15", zh: "15" },
            { en: "∞ (diverges)", zh: "∞（发散）" },
            { en: "12", zh: "12" }
          ],
          a: 0,
          e: { en: "|r| = 1/2 < 1 → converges: S = a₁/(1 − r) = 8/(1/2) = 16. If |r| ≥ 1 the infinite series diverges.", zh: "|r| = 1/2 < 1 → 收敛：S = a₁/(1 − r) = 8/(1/2) = 16。若 |r| ≥ 1，无穷级数发散。" }
        },
        {
          t: "calculation",
          q: { en: "Write 0.4444... (4 repeating) as a fraction.", zh: "把 0.4444...（4循环）写成分数。" },
          o: [
            { en: "4/9", zh: "4/9" },
            { en: "4/10", zh: "4/10" },
            { en: "44/99", zh: "44/99" },
            { en: "2/5", zh: "2/5" }
          ],
          a: 0,
          e: { en: "0.444... = 0.4 + 0.04 + 0.004 + ... = 0.4/(1 − 0.1) = 4/9. Repeating decimals are infinite geometric series in disguise.", zh: "0.444... = 0.4 + 0.04 + 0.004 + ... = 0.4/(1 − 0.1) = 4/9。循环小数就是伪装的无穷等比级数。" }
        },
        {
          t: "calculation",
          q: { en: "Evaluate Σ (n = 1 to 5) of n².", zh: "计算 Σ (n = 1 到 5) n²。" },
          o: [
            { en: "55", zh: "55" },
            { en: "15", zh: "15" },
            { en: "225", zh: "225" },
            { en: "30", zh: "30" }
          ],
          a: 0,
          e: { en: "1 + 4 + 9 + 16 + 25 = 55. Formulas: Σn = n(n+1)/2, Σn² = n(n+1)(2n+1)/6.", zh: "1 + 4 + 9 + 16 + 25 = 55。常用公式：Σn = n(n+1)/2，Σn² = n(n+1)(2n+1)/6。" }
        },
        {
          t: "concept",
          q: { en: "An infinite geometric series converges only when:", zh: "无穷等比级数仅在什么条件下收敛？" },
          o: [
            { en: "|r| < 1", zh: "|r| < 1" },
            { en: "|r| > 1", zh: "|r| > 1" },
            { en: "r = 1", zh: "r = 1" },
            { en: "a₁ is small", zh: "a₁ 很小" }
          ],
          a: 0,
          e: { en: "Each term must shrink toward zero: |r| < 1. The first term's size is irrelevant — 8000 + 4000 + ... converges to 16000.", zh: "每项必须趋于零：|r| < 1。首项大小无关紧要——8000 + 4000 + ... 照样收敛到 16000。" }
        },
        {
          t: "calculation",
          q: { en: "Find the 5th partial sum of a geometric series with a₁ = 2 and r = 3.", zh: "求 a₁ = 2，r = 3 的等比级数的第5个部分和。" },
          o: [
            { en: "242", zh: "242" },
            { en: "486", zh: "486" },
            { en: "162", zh: "162" },
            { en: "121", zh: "121" }
          ],
          a: 0,
          e: { en: "S₅ = a₁(r⁵ − 1)/(r − 1) = 2(243 − 1)/2 = 242. Check: 2 + 6 + 18 + 54 + 162 = 242.", zh: "S₅ = a₁(r⁵ − 1)/(r − 1) = 2(243 − 1)/2 = 242。验证：2 + 6 + 18 + 54 + 162 = 242。" }
        }
      ]
    },
    {
      id: "pc9",
      name: { en: "Unit 9 · Conic Sections", zh: "第9单元 · 圆锥曲线" },
      topics: [
        { en: "Circles & completing the square", zh: "圆与配方" },
        { en: "Parabolas: focus & directrix", zh: "抛物线：焦点与准线" },
        { en: "Ellipses: foci & eccentricity", zh: "椭圆：焦点与离心率" },
        { en: "Hyperbolas: asymptotes", zh: "双曲线：渐近线" },
        { en: "Classifying from general form", zh: "由一般式判断类型" },
        { en: "Discriminant B² − 4AC", zh: "判别式 B² − 4AC" },
        { en: "Real-world orbits", zh: "现实中的轨道" },
        { en: "Conics in physics", zh: "物理中的圆锥曲线" }
      ],
      questions: [
        {
          t: "calculation",
          q: { en: "Find the center and radius of x² + y² − 4x + 2y − 4 = 0.", zh: "求 x² + y² − 4x + 2y − 4 = 0 的圆心和半径。" },
          o: [
            { en: "Center (2, −1), radius 3", zh: "圆心 (2, −1)，半径 3" },
            { en: "Center (−2, 1), radius 3", zh: "圆心 (−2, 1)，半径 3" },
            { en: "Center (2, −1), radius 9", zh: "圆心 (2, −1)，半径 9" },
            { en: "Center (4, −2), radius 2", zh: "圆心 (4, −2)，半径 2" }
          ],
          a: 0,
          e: { en: "Group and complete the square: (x² − 4x + 4) + (y² + 2y + 1) = 4 + 4 + 1 → (x − 2)² + (y + 1)² = 9. Circle, center (2, −1), r = 3.", zh: "分组配方：(x² − 4x + 4) + (y² + 2y + 1) = 4 + 4 + 1 → (x − 2)² + (y + 1)² = 9。圆心 (2, −1)，r = 3。" }
        },
        {
          t: "calculation",
          q: { en: "For the ellipse x²/25 + y²/16 = 1, where are the foci?", zh: "椭圆 x²/25 + y²/16 = 1 的焦点在哪里？" },
          o: [
            { en: "(±3, 0)", zh: "(±3, 0)" },
            { en: "(0, ±3)", zh: "(0, ±3)" },
            { en: "(±5, 0)", zh: "(±5, 0)" },
            { en: "(±9, 0)", zh: "(±9, 0)" }
          ],
          a: 0,
          e: { en: "a² = 25 (bigger denominator → major axis on x), b² = 16. c² = a² − b² = 9 → c = 3. Ellipse rule: SUBTRACT. Foci: (±3, 0).", zh: "a² = 25（分母大 → 长轴在 x 轴），b² = 16。c² = a² − b² = 9 → c = 3。椭圆用减法。焦点：(±3, 0)。" }
        },
        {
          t: "calculation",
          q: { en: "For the hyperbola x²/9 − y²/16 = 1, find the foci.", zh: "双曲线 x²/9 − y²/16 = 1 的焦点是？" },
          o: [
            { en: "(±5, 0)", zh: "(±5, 0)" },
            { en: "(±3, 0)", zh: "(±3, 0)" },
            { en: "(±7, 0)", zh: "(±7, 0)" },
            { en: "(0, ±5)", zh: "(0, ±5)" }
          ],
          a: 0,
          e: { en: "Hyperbola rule: ADD. c² = a² + b² = 9 + 16 = 25 → foci (±5, 0). Its asymptotes are y = ±(4/3)x. Ellipse subtracts, hyperbola adds — don't mix them up.", zh: "双曲线用加法：c² = a² + b² = 9 + 16 = 25 → 焦点 (±5, 0)。渐近线为 y = ±(4/3)x。椭圆相减、双曲线相加——别搞混。" }
        },
        {
          t: "calculation",
          q: { en: "For the parabola y² = 8x, find the focus and directrix.", zh: "抛物线 y² = 8x 的焦点和准线是？" },
          o: [
            { en: "Focus (2, 0), directrix x = −2", zh: "焦点 (2, 0)，准线 x = −2" },
            { en: "Focus (8, 0), directrix x = −8", zh: "焦点 (8, 0)，准线 x = −8" },
            { en: "Focus (4, 0), directrix x = −4", zh: "焦点 (4, 0)，准线 x = −4" },
            { en: "Focus (2, 0), directrix y = −2", zh: "焦点 (2, 0)，准线 y = −2" }
          ],
          a: 0,
          e: { en: "y² = 4px → 4p = 8 → p = 2. Focus (p, 0) = (2, 0); directrix x = −p = −2. Every point on the parabola is equidistant from focus and directrix.", zh: "y² = 4px → 4p = 8 → p = 2。焦点 (2, 0)；准线 x = −2。抛物线上每一点到焦点和准线的距离相等。" }
        },
        {
          t: "concept",
          q: { en: "Which curve does x²/9 + y²/16 = 1 represent?", zh: "x²/9 + y²/16 = 1 表示什么曲线？" },
          o: [
            { en: "Ellipse with vertical major axis", zh: "长轴在竖直方向的椭圆" },
            { en: "Hyperbola opening up/down", zh: "上下开口的双曲线" },
            { en: "Circle", zh: "圆" },
            { en: "Parabola", zh: "抛物线" }
          ],
          a: 0,
          e: { en: "Two squared terms, both POSITIVE, different denominators → ellipse. The larger denominator (16) sits under y, so the major axis is vertical: b² = 9, a² = 16.", zh: "两个平方项、符号均为正、分母不同 → 椭圆。大分母（16）在 y 下面，长轴竖直：a² = 16，b² = 9。" }
        },
        {
          t: "concept",
          q: { en: "For the general conic Ax² + Bxy + Cy² + Dx + Ey + F = 0, the discriminant B² − 4AC = 0 indicates:", zh: "一般圆锥曲线 Ax² + Bxy + Cy² + Dx + Ey + F = 0 中，判别式 B² − 4AC = 0 表示：" },
          o: [
            { en: "Parabola", zh: "抛物线" },
            { en: "Ellipse", zh: "椭圆" },
            { en: "Hyperbola", zh: "双曲线" },
            { en: "Circle", zh: "圆" }
          ],
          a: 0,
          e: { en: "B² − 4AC < 0 → ellipse; = 0 → parabola; > 0 → hyperbola. A circle is the special ellipse with A = C and B = 0.", zh: "B² − 4AC < 0 → 椭圆；= 0 → 抛物线；> 0 → 双曲线。圆是 A = C 且 B = 0 的特殊椭圆。" }
        },
        {
          t: "application",
          q: { en: "In Kepler's model of planetary motion, the sun sits at:", zh: "开普勒行星运动模型中，太阳位于：" },
          o: [
            { en: "A focus of the elliptical orbit", zh: "椭圆轨道的一个焦点" },
            { en: "The center of the ellipse", zh: "椭圆的中心" },
            { en: "A vertex of the orbit", zh: "轨道的顶点" },
            { en: "A point outside the orbit", zh: "轨道外的一点" }
          ],
          a: 0,
          e: { en: "Kepler's first law: planets trace ellipses with the sun at one focus (not the center). Comet orbits can be parabolic or hyperbolic — escape trajectories.", zh: "开普勒第一定律：行星沿椭圆运行，太阳位于一个焦点（而非中心）。彗星轨道可以是抛物线或双曲线——逃逸轨迹。" }
        },
        {
          t: "concept",
          q: { en: "Which statement about eccentricity is correct?", zh: "关于离心率，哪句话正确？" },
          o: [
            { en: "Circle e = 0, ellipse 0 < e < 1, parabola e = 1, hyperbola e > 1", zh: "圆 e = 0，椭圆 0 < e < 1，抛物线 e = 1，双曲线 e > 1" },
            { en: "All conics have e = 1", zh: "所有圆锥曲线 e = 1" },
            { en: "Ellipse has e > 1", zh: "椭圆 e > 1" },
            { en: "Eccentricity is always negative", zh: "离心率总是负数" }
          ],
          a: 0,
          e: { en: "Eccentricity measures \"how squashed\": e = c/a. Mercury's orbit (e ≈ 0.21) is nearly circular; Halley's comet (e ≈ 0.97) is a very long ellipse.", zh: "离心率衡量\"扁的程度\"：e = c/a。水星轨道（e ≈ 0.21）接近圆；哈雷彗星（e ≈ 0.97）是非常扁长的椭圆。" }
        }
      ]
    }
  ]
};
