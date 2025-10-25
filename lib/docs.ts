export type DocSection =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string; width?: number; height?: number }
  | { type: "code"; language: string; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }

export type DocArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  level: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  coverImage?: string
  sections: DocSection[]
  updatedAt: string
}

const docs: DocArticle[] = [
  {
    id: "crypto-basics",
    slug: "crypto-trading-basics",
    title: "Crypto Trading Basics",
    excerpt:
      "Cryptocurrency trading ke fundamentals: blockchain, wallets, exchanges, order types, aur market mechanics ko deeply samjhiye.",
    level: "Beginner",
    tags: ["basics", "wallets", "exchange", "order-types", "blockchain"],
    coverImage: "/docs/crypto-basics-cover.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Cryptocurrency Trading Fundamentals" },
      {
        type: "paragraph",
        text: "Cryptocurrency trading ek digital asset exchange hai jahan aap Bitcoin, Ethereum, aur dusre cryptocurrencies ko buy/sell karte ho. Yeh traditional stock market se alag hai kyunki 24/7 open rehta hai aur highly volatile hota hai. Is guide me hum sab fundamentals ko detail me samjhenge.",
      },
      { type: "heading", level: 2, text: "Blockchain aur Cryptocurrency Kya Hai?" },
      {
        type: "paragraph",
        text: "Blockchain ek distributed ledger technology hai jo transactions ko record karta hai. Har transaction cryptographically secured hota hai aur ek chain me linked hota hai. Cryptocurrency isi blockchain par chalti hai aur decentralized hoti hai, matlab kisi single authority ke control me nahi hoti.",
      },
      {
        type: "list",
        items: [
          "Bitcoin (BTC): Pehla aur sabse bada cryptocurrency, store of value ke liye use hota hai",
          "Ethereum (ETH): Smart contracts support karta hai, applications build kar sakte ho",
          "Altcoins: Dusre cryptocurrencies jo specific use cases ke liye bane hain",
        ],
      },
      { type: "heading", level: 2, text: "Exchanges aur Trading Platforms" },
      {
        type: "paragraph",
        text: "Cryptocurrency exchanges wo platforms hain jahan aap crypto buy/sell kar sakte ho. Centralized exchanges (CEX) jaise Binance, Coinbase aur Decentralized exchanges (DEX) jaise Uniswap hote hain. CEX zyada user-friendly hote hain beginners ke liye.",
      },
      {
        type: "image",
        src: "/docs/order-flow-diagram.jpg",
        alt: "Order placement flow",
        caption: "Exchange par order placement se execution tak ka complete flow",
        width: 800,
        height: 480,
      },
      { type: "heading", level: 2, text: "Order Types Detailed Explanation" },
      {
        type: "paragraph",
        text: "Different order types aapko different trading scenarios me help karte hain. Har order type ka apna use case aur advantages hote hain.",
      },
      {
        type: "table",
        headers: ["Order Type", "Description", "Best For", "Risk Level"],
        rows: [
          ["Market Order", "Turant best available price par execute", "Quick entry/exit", "Low"],
          ["Limit Order", "Specific price par execute hota hai", "Precise entry points", "Medium"],
          ["Stop-Loss", "Loss ko limit karne ke liye", "Risk management", "Medium"],
          ["Take-Profit", "Target price par automatically sell", "Profit booking", "Low"],
          ["Trailing Stop", "Price ke sath move karta hai", "Trend following", "High"],
        ],
      },
      { type: "heading", level: 2, text: "Wallets aur Security" },
      {
        type: "paragraph",
        text: "Cryptocurrency wallets do types ke hote hain: Hot wallets (internet connected, trading ke liye) aur Cold wallets (offline, long-term storage ke liye). Security bahut important hai kyunki agar private key lose ho gaya to funds recover nahi ho sakte.",
      },
      {
        type: "list",
        items: [
          "Hot Wallets: MetaMask, Trust Wallet - trading ke liye convenient",
          "Cold Wallets: Hardware wallets, Paper wallets - maximum security",
          "Exchange Wallets: Exchange par account - convenient lekin less secure",
          "Private Key: Kabhi share mat karo, yeh aapka password hai",
        ],
      },
      { type: "heading", level: 2, text: "Trading Pairs aur Liquidity" },
      {
        type: "paragraph",
        text: "Trading pairs jaise BTC/USDT matlab aap Bitcoin ko US Dollar Tether ke against trade kar rahe ho. Liquidity matlab kitni easily aap buy/sell kar sakte ho. High liquidity pairs jaise BTC/USDT me spread kam hota hai aur execution fast hota hai.",
      },
    ],
  },
  {
    id: "risk-management",
    slug: "risk-management-strategies",
    title: "Risk Management Strategies",
    excerpt:
      "Position sizing, stop-loss placement, risk-reward ratios, aur portfolio management ke through sustainable trading kaise karte ho.",
    level: "Intermediate",
    tags: ["risk", "position-sizing", "stop-loss", "money-management"],
    coverImage: "/docs/risk-management-cover.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Risk Management: Trading Ka Sabse Important Hissa" },
      {
        type: "paragraph",
        text: "Risk management trading ka backbone hai. Agar aap risk ko properly manage nahi karte to ek bada loss aapka pura account wipe kar sakta hai. Professional traders risk management ko sabse zyada importance dete hain kyunki long-term success isi par depend karta hai.",
      },
      { type: "heading", level: 2, text: "Position Sizing: Kitna Trade Karna Chahiye?" },
      {
        type: "paragraph",
        text: "Position size determine karna bahut important hai. Zyada bada position lena risky hai aur zyada chhota position se profit nahi milega. Standard rule hai ki har trade par maximum 1-2% account risk lena chahiye.",
      },
      {
        type: "code",
        language: "text",
        content: `Position Size = (Account Risk %) × (Total Account Size) / (Entry Price - Stop Price)

Example:
Account Size: $10,000
Risk per trade: 2% = $200
Entry Price: $50,000
Stop Price: $48,000
Risk per unit: $2,000

Position Size = $200 / $2,000 = 0.1 BTC`,
      },
      {
        type: "image",
        src: "/docs/rrr-diagram.jpg",
        alt: "Risk Reward Ratio",
        caption: "Risk-Reward Ratio ka visual representation - 1:3 ratio ideal hota hai",
        width: 800,
        height: 420,
      },
      { type: "heading", level: 2, text: "Stop-Loss aur Take-Profit Levels" },
      {
        type: "paragraph",
        text: "Stop-loss ek predefined price level hai jahan aap apna position close kar dete ho agar market against move kare. Take-profit target price hai jahan aap profit book karte ho. Dono ko entry ke time hi set kar dena chahiye.",
      },
      {
        type: "list",
        items: [
          "Stop-Loss: Entry price se 2-5% neeche rakhte hain",
          "Take-Profit: Risk-Reward ratio 1:2 ya 1:3 rakhte hain",
          "Trailing Stop: Price ke sath move karta hai, profit protect karta hai",
          "Breakeven Stop: Jab profit ho jaye to stop-loss ko entry price par move karte hain",
        ],
      },
      { type: "heading", level: 2, text: "Portfolio Diversification" },
      {
        type: "paragraph",
        text: "Sab paise ek hi coin me mat lagao. Different coins, different sectors, aur different strategies use karo. Yeh risk ko spread karta hai aur consistent returns deta hai.",
      },
      {
        type: "table",
        headers: ["Portfolio Type", "Large Cap %", "Mid Cap %", "Small Cap %", "Stablecoins %"],
        rows: [
          ["Conservative", "60%", "25%", "5%", "10%"],
          ["Moderate", "40%", "40%", "15%", "5%"],
          ["Aggressive", "30%", "40%", "25%", "5%"],
        ],
      },
    ],
  },
  {
    id: "technical-analysis",
    slug: "technical-analysis-101",
    title: "Technical Analysis 101",
    excerpt:
      "Charts, candlesticks, support/resistance, trends, aur indicators (RSI, MA, MACD) ko deeply samjhiye aur use kaise karte ho.",
    level: "Advanced",
    tags: ["TA", "indicators", "charts", "patterns", "support-resistance"],
    coverImage: "/docs/ta-cover.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Technical Analysis: Charts Se Trading Kaise Karte Ho" },
      {
        type: "paragraph",
        text: "Technical Analysis price history aur volume se future price movement predict karne ki technique hai. Assumption yeh hai ki historical price patterns repeat hote hain aur market psychology same rehti hai.",
      },
      { type: "heading", level: 2, text: "Candlestick Charts Samjhiye" },
      {
        type: "paragraph",
        text: "Candlestick chart sabse popular chart type hai. Har candle ek time period (1 min, 5 min, 1 hour, 1 day) ko represent karta hai. Green candle matlab close > open (bullish) aur red candle matlab close < open (bearish).",
      },
      {
        type: "image",
        src: "/docs/candlestick-patterns.jpg",
        alt: "Candlestick patterns",
        caption: "Common candlestick patterns aur unka meaning",
        width: 900,
        height: 500,
      },
      { type: "heading", level: 2, text: "Support aur Resistance Levels" },
      {
        type: "paragraph",
        text: "Support ek price level hai jahan buyers zyada active hote hain aur price bounce karta hai. Resistance ek level hai jahan sellers zyada active hote hain. Yeh levels historical price data se identify karte hain.",
      },
      {
        type: "list",
        items: [
          "Support: Price jahan se bounce karta hai, buyers ka zone",
          "Resistance: Price jahan se reject hota hai, sellers ka zone",
          "Breakout: Jab price resistance ko break kare to strong move hota hai",
          "Breakdown: Jab price support ko break kare to downtrend start hota hai",
        ],
      },
      { type: "heading", level: 2, text: "Moving Averages (MA)" },
      {
        type: "paragraph",
        text: "Moving Average ek trend indicator hai jo average price ko smooth karta hai. 50-day MA short-term trend dikhata hai aur 200-day MA long-term trend dikhata hai. Jab price MA se upar ho to uptrend aur neeche ho to downtrend.",
      },
      { type: "heading", level: 2, text: "RSI (Relative Strength Index)" },
      {
        type: "paragraph",
        text: "RSI momentum indicator hai jo 0-100 ke beech move karta hai. 70 se upar overbought hota hai (sell signal) aur 30 se neeche oversold hota hai (buy signal). RSI divergence bhi important hota hai.",
      },
      {
        type: "image",
        src: "/docs/ma-rsi-chart.jpg",
        alt: "MA and RSI example",
        caption: "Moving Averages aur RSI ka combined use karte hue trading signals",
        width: 900,
        height: 500,
      },
      { type: "heading", level: 2, text: "MACD (Moving Average Convergence Divergence)" },
      {
        type: "paragraph",
        text: "MACD trend aur momentum dono ko show karta hai. Jab MACD line signal line ko cross kare to buy/sell signal milta hai. Histogram positive ya negative hone se strength pata chalta hai.",
      },
    ],
  },
  {
    id: "fundamental-analysis",
    slug: "fundamental-analysis-crypto",
    title: "Fundamental Analysis for Crypto",
    excerpt:
      "Cryptocurrency projects ko evaluate kaise karte ho - whitepaper, team, adoption, aur long-term potential ko analyze karna.",
    level: "Intermediate",
    tags: ["fundamentals", "project-analysis", "whitepaper", "adoption"],
    coverImage: "/docs/fundamental-analysis.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Cryptocurrency Projects Ko Evaluate Kaise Karte Ho" },
      {
        type: "paragraph",
        text: "Fundamental analysis se aap project ki long-term potential samjh sakte ho. Sirf price chart dekhne se nahi pata ki project actually valuable hai ya nahi. Aapko project ke behind ka technology, team, aur adoption ko samjhna chahiye.",
      },
      { type: "heading", level: 2, text: "Whitepaper Padho aur Samjho" },
      {
        type: "paragraph",
        text: "Har cryptocurrency project ka ek whitepaper hota hai jo technical details explain karta hai. Whitepaper se aap samjh sakte ho ki project kya problem solve kar raha hai aur kaise solve kar raha hai.",
      },
      {
        type: "list",
        items: [
          "Problem Statement: Kya problem solve kar raha hai?",
          "Solution: Kaise solve kar raha hai?",
          "Technology: Kaunsa blockchain use kar raha hai?",
          "Tokenomics: Total supply, distribution, vesting schedule",
          "Roadmap: Future plans aur milestones",
        ],
      },
      { type: "heading", level: 2, text: "Team aur Development Activity" },
      {
        type: "paragraph",
        text: "Project ke team ko research karo. Experienced team, transparent communication, aur active development bahut important hote hain. GitHub activity check karo - regular commits matlab active development.",
      },
      { type: "heading", level: 2, text: "Adoption aur Use Cases" },
      {
        type: "paragraph",
        text: "Project kitna use ho raha hai? Active users, transaction volume, partnerships - yeh sab check karo. Real adoption long-term success ka indicator hota hai.",
      },
      {
        type: "table",
        headers: ["Metric", "What to Look For", "Good Sign", "Red Flag"],
        rows: [
          ["Active Users", "Growing user base", "Month-on-month growth", "Declining users"],
          ["Transaction Volume", "Network activity", "Increasing volume", "Low/declining volume"],
          ["Partnerships", "Real-world adoption", "Major partnerships", "No partnerships"],
          ["Developer Activity", "Code updates", "Regular commits", "No recent updates"],
        ],
      },
    ],
  },
  {
    id: "market-psychology",
    slug: "market-psychology-trading",
    title: "Market Psychology aur Emotions",
    excerpt:
      "Fear, greed, FOMO, aur dusre emotions trading decisions ko kaise affect karte hain aur unhe control kaise karte ho.",
    level: "Intermediate",
    tags: ["psychology", "emotions", "fear", "greed", "discipline"],
    coverImage: "/docs/market-psychology.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Market Psychology: Emotions Ka Role Trading Me" },
      {
        type: "paragraph",
        text: "Cryptocurrency market bahut volatile hota hai aur emotions bahut strong hote hain. Fear aur greed market ko drive karte hain. Successful traders emotions ko control karte hain aur logical decisions lete hain.",
      },
      { type: "heading", level: 2, text: "FOMO (Fear of Missing Out)" },
      {
        type: "paragraph",
        text: "FOMO jab hota hai jab price bahut fast upar ja raha ho aur aap sochte ho ki miss ho jayega. Yeh worst time hota hai buy karne ka kyunki price already high hota hai. FOMO se avoid karne ke liye plan follow karo.",
      },
      { type: "heading", level: 2, text: "FUD (Fear, Uncertainty, Doubt)" },
      {
        type: "paragraph",
        text: "FUD jab hota hai jab negative news aate hain aur sab panic sell karte hain. Lekin often yeh buying opportunity hota hai. Long-term investors FUD ko ignore karte hain aur fundamentals par focus karte hain.",
      },
      { type: "heading", level: 2, text: "Greed aur Overconfidence" },
      {
        type: "paragraph",
        text: "Jab market bullish hota hai to greed aata hai aur traders overconfident ho jate hain. Yeh time sabse dangerous hota hai kyunki crash hone ka risk zyada hota hai. Profit booking important hai.",
      },
      {
        type: "list",
        items: [
          "Discipline: Plan banao aur follow karo, emotions ko control karo",
          "Risk Management: Har trade par stop-loss set karo",
          "Position Sizing: Zyada bada position mat lo",
          "Profit Booking: Greed mat karo, target reach karo to exit karo",
          "Breaks Lena: Continuous trading se mental fatigue aata hai",
        ],
      },
    ],
  },
  {
    id: "trading-strategies",
    slug: "trading-strategies-detailed",
    title: "Trading Strategies: Scalping to Swing Trading",
    excerpt:
      "Different trading timeframes aur strategies - scalping, day trading, swing trading, position trading ko detail me samjhiye.",
    level: "Advanced",
    tags: ["strategies", "scalping", "day-trading", "swing-trading", "position-trading"],
    coverImage: "/docs/trading-strategies.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Trading Strategies: Aapke Liye Kaun Sa Best Hai?" },
      {
        type: "paragraph",
        text: "Different trading strategies different timeframes aur risk profiles ke liye suitable hote hain. Aapko apna strategy choose karna chahiye jo aapke schedule aur risk tolerance ke according ho.",
      },
      {
        type: "table",
        headers: ["Strategy", "Timeframe", "Holding Period", "Risk Level", "Capital Required"],
        rows: [
          ["Scalping", "1-5 min", "Seconds to minutes", "Very High", "Low"],
          ["Day Trading", "5 min - 1 hour", "Minutes to hours", "High", "Medium"],
          ["Swing Trading", "1 hour - 1 day", "Hours to days", "Medium", "Medium"],
          ["Position Trading", "1 day - weeks", "Days to weeks", "Low", "High"],
        ],
      },
      { type: "heading", level: 2, text: "Scalping: Quick Profits" },
      {
        type: "paragraph",
        text: "Scalping me aap small price movements se profit lete ho. Seconds ya minutes me entry aur exit karte ho. Yeh strategy high stress hota hai aur quick decisions lene padते hain. Beginners ke liye recommended nahi hai.",
      },
      { type: "heading", level: 2, text: "Day Trading: Intraday Moves" },
      {
        type: "paragraph",
        text: "Day trading me aap ek din me multiple trades karte ho. Position overnight hold nahi karte. Technical analysis aur quick decision-making important hote hain. Yeh strategy medium risk hota hai.",
      },
      { type: "heading", level: 2, text: "Swing Trading: Best for Beginners" },
      {
        type: "paragraph",
        text: "Swing trading me aap 2-5 days ke liye position hold karte ho. Yeh strategy beginners ke liye best hota hai kyunki time pressure kam hota hai. Technical analysis aur patience important hote hain.",
      },
      { type: "heading", level: 2, text: "Position Trading: Long-term Investing" },
      {
        type: "paragraph",
        text: "Position trading me aap weeks ya months ke liye hold karte ho. Yeh strategy fundamental analysis par based hota hai. Volatility ko ignore karte ho aur long-term trend follow karte ho.",
      },
    ],
  },
  {
    id: "common-mistakes",
    slug: "common-trading-mistakes",
    title: "Common Trading Mistakes aur Unhe Avoid Kaise Karte Ho",
    excerpt:
      "Beginners jo mistakes karte hain unhe samjhiye aur unhe avoid kaise karte ho - overtrading, revenge trading, no stop-loss.",
    level: "Beginner",
    tags: ["mistakes", "learning", "discipline", "psychology"],
    coverImage: "/docs/common-mistakes.jpg",
    updatedAt: new Date().toISOString(),
    sections: [
      { type: "heading", level: 1, text: "Common Mistakes Jo Traders Karte Hain" },
      {
        type: "paragraph",
        text: "Zyada tar beginners same mistakes karte hain. Inhe samjhne se aap unhe avoid kar sakte ho aur faster progress kar sakte ho.",
      },
      {
        type: "list",
        items: [
          "No Stop-Loss: Sabse badi mistake. Har trade par stop-loss set karo",
          "Overtrading: Zyada trades mat karo. Quality over quantity",
          "Revenge Trading: Loss ke baad emotional trading mat karo",
          "FOMO: Haste me entry mat lo. Plan follow karo",
          "No Risk Management: Position size control karo",
          "Leverage Abuse: Leverage se avoid karo jab tak experience na ho",
          "No Trading Plan: Har trade ke liye plan banao",
          "Ignoring Fundamentals: Sirf price chart mat dekho",
        ],
      },
      { type: "heading", level: 2, text: "Overtrading: Sabse Common Mistake" },
      {
        type: "paragraph",
        text: "Overtrading jab hota hai jab aap zyada trades karte ho. Har trade se commission aur slippage loss hota hai. Quality trades par focus karo, quantity par nahi.",
      },
      { type: "heading", level: 2, text: "Revenge Trading: Emotions Se Avoid Karo" },
      {
        type: "paragraph",
        text: "Jab loss hota hai to revenge trading karne ka urge aata hai. Yeh sabse dangerous hota hai kyunki emotional decisions hote hain. Loss accept karo aur next trade ke liye prepare ho jao.",
      },
    ],
  },
]

export function listDocs() {
  return docs
}

export function findDocBySlug(slug: string) {
  return docs.find((d) => d.slug === slug) || null
}
