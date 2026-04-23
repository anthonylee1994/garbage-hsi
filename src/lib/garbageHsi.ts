import garbageHsiData from "@/data/garbageHsi.json";

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

type QuoteItem = {
    author: string;
    text: string;
};

type GarbageHsiData = {
    trend: string[];
    mainCause: string[];
    market: string[];
    marketPerformance: string[];
    macro: string[];
    sentiment: string[];
    sector: string[];
    sectorNews: string[];
    impact: string[];
    event: string[];
    reporter: string[];
    headline: string[];
    quotes: QuoteItem[];
    tickerItems: TickerItem[];
    navItems: string[];
};

const STORAGE_KEY = "garbage-hsi:articles";
const MAX_HISTORY = 8;

const data = garbageHsiData as GarbageHsiData;

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
        ...data.tickerItems,
    ];
}

export function getNavItems(quoteAuthor?: string) {
    return [...data.navItems, `${quoteAuthor || "沈振盈"}專欄`];
}
