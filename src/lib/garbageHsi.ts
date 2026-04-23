export type Article = {
    id: number;
    headline: string;
    body: string;
    quote: string;
    quoteAuthor: string;
    reporter: string;
    index: string;
    change: string;
    changePct: string;
    up: boolean;
    time: string;
};

export type StoredArticles = {
    history: Article[];
    main: Article;
};

type LegacyArticle = Omit<Article, "quoteAuthor">;

type StoredArticle = Omit<Article, "quote" | "quoteAuthor">;

type SerializedStoredArticles = {
    history: StoredArticle[];
    main: StoredArticle;
};

export type TickerItem = {
    label: string;
    value: string;
    change?: string;
    up?: boolean;
};

const STORAGE_KEY = "garbage-hsi:articles";
const MAX_HISTORY = 8;

const data = {
    trend: ["受拖累而下跌", "先升後跌", "裂口下跌"],
    mainCause: [
        "人民幣升",
        "人民幣跌",
        "經濟數據太好",
        "經濟數據唔好",
        "加息",
        "減息",
        "PMI高",
        "PMI低",
        "非農高",
        "非農低",
        "PPI高",
        "PPI低",
        "CPI高",
        "CPI低",
        "GDP高",
        "GDP低",
        "出口",
        "進口",
        "通脹進一步擴大引發過熱憂慮",
        "通縮進一步擴大引發增長憂慮",
        "政治會議沒有推出大型救市口風",
        "新年",
    ],
    market: ["日經", "美國", "德國", "英國", "法國", "韓國", "臺灣", "上証", "非洲", "阿根廷", "土耳其", "新加坡", "馬來西亞"],
    marketPerformance: ["向好", "偏弱", "反覆", "受壓", "造好"],
    macro: ["中美兩地口水戰", "領導人探訪", "領導人不探訪", "日本仔減息", "日本仔加息"],
    sentiment: ["審慎", "轉弱", "偏淡", "受壓", "觀望"],
    sector: ["內房", "內銀", "內險", "狗巴", "賣車少", "賣車多", "賭業股"],
    sectorNews: ["配股", "合股", "供股", "業績遜預期", "創2019年以來最佳數據", "任何一個老闆沽售", "南非主權基金沽售"],
    impact: ["拖累", "帶動"],
    event: [
        "地震",
        "海嘯",
        "強風",
        "日蝕",
        "月蝕",
        "正東風水不佳",
        "正南風水不佳",
        "正西風水不佳",
        "正北風水不佳",
        "金正恩",
        "拜登",
        "特朗普",
        "以色列巴勒斯坦地區小朋友齊打交",
        "伊朗宣佈介入小朋友齊打交",
        "中東宣佈加入小朋友齊打交",
        "北韓玩具核彈危機",
        "南北韓邊境衝突，邊境守衛造成XX人傷亡",
        "柬埔寨KK園政府軍叛軍駁火",
        "伊朗部署遠程導彈去香港18區",
    ],
    reporter: ["陳大文", "李小強", "黃師奶", "王財經", "張記者", "何小編"],
    headline: ["恒指今日表現反覆 投資者宜審慎", "外圍拖累港股 大行睇淡後市", "板塊輪流炒作 恒指尋方向", "風雲色變 港股急挫", "市場觀望情緒濃 成交縮減"],
    quotes: [
        {author: "沈振盈", text: "一股不留"},
        {author: "沈振盈", text: "反彈就係逃生門"},
        {author: "沈振盈", text: "依家係牛三"},
        {author: "沈振盈", text: "幻覺嚟㗎啫，嚇我唔到嘅"},
        {author: "沈振盈", text: "大戶殺倉"},
        {author: "沈振盈", text: "戒貪、戒躁"},
        {author: "沈振盈", text: "睇多兩日先"},
        {author: "沈振盈", text: "終極一跌"},
        {author: "沈振盈", text: "呢個係底部"},
        {author: "沈振盈", text: "大家要有心理準備"},
        {author: "譚朗蔚", text: "唔破位唔買"},
        {author: "譚朗蔚", text: "贏就谷，輸就縮"},
        {author: "譚朗蔚", text: "強者恒強"},
        {author: "譚朗蔚", text: "止蝕係我嘅靈魂"},
        {author: "譚朗蔚", text: "唔好同股票談戀愛"},
        {author: "譚朗蔚", text: "Buy High, Sell Higher"},
        {author: "譚朗蔚", text: "美股係世界中心"},
        {author: "譚朗蔚", text: "唔撈底"},
        {author: "譚朗蔚", text: "尊重趨勢"},
        {author: "譚朗蔚", text: "契媽係我偶像"},
    ],
};

const tickerItems: TickerItem[] = [
    {label: "國指", value: "7,234.11", change: "+45.22", up: true},
    {label: "科指", value: "4,012.55", change: "-22.10", up: false},
    {label: "滬深300", value: "3,890.40", change: "+12.30", up: true},
    {label: "人民幣", value: "7.2451"},
] as const;

const navItems = ["要聞", "港股", "中國", "國際", "科技", "地產", "風水"] as const;

let counter = 0;

function pick<T>(list: readonly T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

function isArticle(value: unknown): value is Article {
    if (!value || typeof value !== "object") {
        return false;
    }

    const article = value as Article;
    return (
        typeof article.id === "number" &&
        typeof article.headline === "string" &&
        typeof article.body === "string" &&
        typeof article.quote === "string" &&
        typeof article.quoteAuthor === "string" &&
        typeof article.reporter === "string" &&
        typeof article.index === "string" &&
        typeof article.change === "string" &&
        typeof article.changePct === "string" &&
        typeof article.up === "boolean" &&
        typeof article.time === "string"
    );
}

function isLegacyArticle(value: unknown): value is LegacyArticle {
    if (!value || typeof value !== "object") {
        return false;
    }

    const article = value as LegacyArticle;
    return (
        typeof article.id === "number" &&
        typeof article.headline === "string" &&
        typeof article.body === "string" &&
        typeof article.quote === "string" &&
        typeof article.reporter === "string" &&
        typeof article.index === "string" &&
        typeof article.change === "string" &&
        typeof article.changePct === "string" &&
        typeof article.up === "boolean" &&
        typeof article.time === "string"
    );
}

function isStoredArticle(value: unknown): value is StoredArticle {
    if (!value || typeof value !== "object") {
        return false;
    }

    const article = value as StoredArticle;
    return (
        typeof article.id === "number" &&
        typeof article.headline === "string" &&
        typeof article.body === "string" &&
        typeof article.reporter === "string" &&
        typeof article.index === "string" &&
        typeof article.change === "string" &&
        typeof article.changePct === "string" &&
        typeof article.up === "boolean" &&
        typeof article.time === "string"
    );
}

function getQuoteDetailsFromBody(body: string): Pick<Article, "quote" | "quoteAuthor"> {
    const matched = body.match(/(沈振盈|譚朗蔚)話齋：「([^」]+)」/);
    return {
        quote: matched?.[2] ?? "",
        quoteAuthor: matched?.[1] ?? "",
    };
}

function toArticle(article: StoredArticle): Article {
    return {
        ...article,
        ...getQuoteDetailsFromBody(article.body),
    };
}

function fromLegacyArticle(article: LegacyArticle): Article {
    const quoteDetails = getQuoteDetailsFromBody(article.body);
    return {
        ...article,
        quote: quoteDetails.quote || article.quote,
        quoteAuthor: quoteDetails.quoteAuthor || "沈振盈",
    };
}

export function generateArticle(): Article {
    counter += 1;

    const selectedQuote = pick(data.quotes);
    const up = false;
    const change = (Math.random() * 600 + 20).toFixed(2);
    const changePct = (Math.random() * 3 + 0.1).toFixed(2);
    const base = 18000 + Math.random() * 4000;

    return {
        id: counter,
        headline: pick(data.headline),
        body: `今日，恒指${pick(data.trend)}。外圍方面，${pick(data.market)}表現${pick(data.marketPerformance)}，加上${pick(data.mainCause)}及${pick(data.macro)}，投資氣氛${pick(data.sentiment)}。板塊方面，${pick(data.sector)}受${pick(data.sectorNews)}影響，${pick(data.impact)}大市。消息面上，市場亦關注${pick(data.event)}。最後點都要補充，${selectedQuote.author}話齋：「${selectedQuote.text}」。`,
        quote: selectedQuote.text,
        quoteAuthor: selectedQuote.author,
        reporter: pick(data.reporter),
        index: base.toFixed(2),
        change: `${up ? "+" : "-"}${change}`,
        changePct: `${up ? "+" : "-"}${changePct}%`,
        up,
        time: new Date().toLocaleTimeString("zh-HK", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }),
    };
}

export function getNowLabel(): string {
    return new Date().toLocaleString("zh-HK", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function loadStoredArticles(): StoredArticles | null {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as Partial<StoredArticles> | Partial<SerializedStoredArticles>;

        if (!parsed.main || !Array.isArray(parsed.history)) {
            return null;
        }

        const {main, history} = parsed;

        if (isArticle(main) && history.every(isArticle)) {
            const articleHistory = history as Article[];
            return {
                main,
                history: articleHistory.slice(0, MAX_HISTORY),
            };
        }

        if (isLegacyArticle(main) && history.every(isLegacyArticle)) {
            const legacyHistory = history as LegacyArticle[];
            return {
                main: fromLegacyArticle(main),
                history: legacyHistory.slice(0, MAX_HISTORY).map(fromLegacyArticle),
            };
        }

        if (!isStoredArticle(main) || !history.every(isStoredArticle)) {
            return null;
        }

        const storedHistory = history as StoredArticle[];
        return {
            main: toArticle(main),
            history: storedHistory.slice(0, MAX_HISTORY).map(toArticle),
        };
    } catch {
        return null;
    }
}

export function saveStoredArticles(payload: StoredArticles): void {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload satisfies StoredArticles));
}

export function syncArticleCounter(articles: Article[]): void {
    counter = articles.reduce((maxId, article) => Math.max(maxId, article.id), 0);
}

export function appendHistory(history: Article[], article: Article): Article[] {
    return [article, ...history].slice(0, MAX_HISTORY);
}

export function getTickerItems(main: Article): TickerItem[] {
    return [
        {
            label: "恒指",
            value: main.index,
            change: `${main.change} (${main.changePct})`,
            up: main.up,
        },
        ...tickerItems,
    ];
}

export function getNavItems(quoteAuthor?: string) {
    return [...navItems, `${quoteAuthor || "沈振盈"}專欄`];
}
