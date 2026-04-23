import React from "react";
import {createFileRoute} from "@tanstack/react-router";
import {Button} from "@/components/ui/button";

export const Route = createFileRoute("/")({
    component: Index,
    head: () => ({
        meta: [{title: "垃圾恒指新聞產生器 | 港股財經頭條"}, {name: "description", content: "一鍵生成垃圾恒指新聞，句句都係沈振盈風味。"}],
    }),
});

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
    ],
    reporter: ["陳大文", "李小強", "黃師奶", "王財經", "張記者", "何小編"],
    headline: ["恒指今日表現反覆 投資者宜審慎", "外圍拖累港股 大行睇淡後市", "板塊輪流炒作 恒指尋方向", "風雲色變 港股急挫", "市場觀望情緒濃 成交縮減"],
    quote: ["一股不留", "反彈就係逃生門", "依家係牛三（牛市第三期）", "幻覺嚟㗎啫，嚇我唔到嘅", "大戶殺倉", "戒貪、戒躁", "睇多兩日先", "終極一跌", "呢個係底部", "大家要有心理準備"],
};

const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];
const STORAGE_KEY = "garbage-hsi:articles";

type Article = {
    id: number;
    headline: string;
    body: string;
    quote: string;
    reporter: string;
    index: string;
    change: string;
    changePct: string;
    up: boolean;
    time: string;
};

type StoredArticles = {
    history: Article[];
    main: Article;
};

let counter = 0;
function generate(): Article {
    counter += 1;
    const quote = pick(data.quote);
    const body = `今日，恒指${pick(data.trend)}。外圍方面，${pick(data.market)}表現${pick(data.marketPerformance)}，加上${pick(data.mainCause)}及${pick(data.macro)}，投資氣氛${pick(data.sentiment)}。板塊方面，${pick(data.sector)}受${pick(data.sectorNews)}影響，${pick(data.impact)}大市。消息面上，市場亦關注${pick(data.event)}。最後點都要補充，沈振盈話齋：「${quote}」。`;
    const up = false;
    const change = (Math.random() * 600 + 20).toFixed(2);
    const pct = (Math.random() * 3 + 0.1).toFixed(2);
    const base = 18000 + Math.random() * 4000;
    return {
        id: counter,
        headline: pick(data.headline),
        body,
        quote,
        reporter: pick(data.reporter),
        index: base.toFixed(2),
        change: `${up ? "+" : "-"}${change}`,
        changePct: `${up ? "+" : "-"}${pct}%`,
        up,
        time: new Date().toLocaleTimeString("zh-HK", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }),
    };
}

function isArticle(value: unknown): value is Article {
    if (!value || typeof value !== "object") return false;
    const article = value as Article;
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

function loadStoredArticles(): StoredArticles | null {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as Partial<StoredArticles>;
        if (!parsed.main || !isArticle(parsed.main) || !Array.isArray(parsed.history) || !parsed.history.every(isArticle)) return null;
        return {
            main: parsed.main,
            history: parsed.history.slice(0, 8),
        };
    } catch {
        return null;
    }
}

function Index() {
    const [main, setMain] = React.useState<Article | null>(null);
    const [history, setHistory] = React.useState<Article[]>([]);
    const [now, setNow] = React.useState("");

    React.useEffect(() => {
        const stored = loadStoredArticles();
        if (stored) {
            setMain(stored.main);
            setHistory(stored.history);
            counter = Math.max(stored.main.id, ...stored.history.map(article => article.id));
        } else {
            setMain(generate());
        }

        const update = () =>
            setNow(
                new Date().toLocaleString("zh-HK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        update();
        const t = setInterval(update, 1000 * 30);
        return () => clearInterval(t);
    }, []);

    React.useEffect(() => {
        if (!main) return;
        window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                main,
                history,
            } satisfies StoredArticles)
        );
    }, [history, main]);

    const handleGenerate = () => {
        if (main) setHistory(h => [main, ...h].slice(0, 8));
        setMain(generate());
    };

    if (!main) return null;

    return (
        <div className="min-h-screen bg-background">
            {/* Top ticker */}
            <div className="border-b border-border bg-foreground text-background">
                <div className="container mx-auto flex items-center gap-4 overflow-hidden px-4 py-1.5 text-xs">
                    <span className="shrink-0 rounded bg-destructive px-2 py-0.5 font-bold uppercase tracking-wider">Live</span>
                    <div className="flex animate-pulse gap-6 whitespace-nowrap">
                        <span>
                            恒指 {main.index}{" "}
                            <span className={main.up ? "text-emerald-400" : "text-red-400"}>
                                {main.change} ({main.changePct})
                            </span>
                        </span>
                        <span>
                            國指 7,234.11 <span className="text-emerald-400">+45.22</span>
                        </span>
                        <span>
                            科指 4,012.55 <span className="text-red-400">-22.10</span>
                        </span>
                        <span>
                            滬深300 3,890.40 <span className="text-emerald-400">+12.30</span>
                        </span>
                        <span>人民幣 7.2451</span>
                    </div>
                </div>
            </div>

            {/* Masthead */}
            <header className="border-b-4 border-destructive bg-card">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="text-xs text-muted-foreground">{now}</div>
                        <div className="hidden text-xs text-muted-foreground md:block">逢星期一至五更新 · 純屬娛樂</div>
                    </div>
                    <div className="mt-2 flex items-baseline gap-3">
                        <h1 className="font-serif text-3xl font-black tracking-tight text-foreground md:text-5xl">垃圾恒指日報</h1>
                        <span className="text-xs font-semibold uppercase tracking-widest text-destructive">GARBAGE HSI DAILY</span>
                    </div>
                    <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-border pt-2 text-sm font-medium text-foreground">
                        {["要聞", "港股", "中國", "國際", "科技", "地產", "風水", "沈振盈專欄"].map((n, i) => (
                            <span key={n} className={i === 0 ? "text-destructive" : "hover:text-destructive cursor-pointer"}>
                                {n}
                            </span>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-3">
                {/* Main story */}
                <article className="lg:col-span-2">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-sm bg-destructive px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-destructive-foreground">即時新聞</span>
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">港股 · 收市評論</span>
                    </div>
                    <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">{main.headline}</h2>
                    <div className="mt-3 flex items-center gap-3 border-b border-border pb-3 text-xs text-muted-foreground">
                        <span>
                            本報記者 <span className="font-semibold text-foreground">{main.reporter}</span> 報道
                        </span>
                        <span>·</span>
                        <span>更新於 {main.time}</span>
                    </div>

                    {/* Index summary box */}
                    <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded border border-border bg-border text-center">
                        <div className="bg-card p-3">
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">恒生指數</div>
                            <div className="mt-1 font-mono text-lg font-bold text-foreground">{main.index}</div>
                        </div>
                        <div className={`bg-card p-3 ${main.up ? "text-emerald-600" : "text-destructive"}`}>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">升跌</div>
                            <div className="mt-1 font-mono text-lg font-bold">{main.change}</div>
                        </div>
                        <div className={`bg-card p-3 ${main.up ? "text-emerald-600" : "text-destructive"}`}>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">變幅</div>
                            <div className="mt-1 font-mono text-lg font-bold">{main.changePct}</div>
                        </div>
                    </div>

                    {/* Article body with drop cap */}
                    <div className="mt-6 font-serif text-lg leading-loose text-foreground first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-destructive">
                        {main.body}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                        <Button onClick={handleGenerate} size="lg" className="select-none bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            🎲 生成下一則頭條
                        </Button>
                        <span className="text-xs text-muted-foreground">純屬娛樂 · 內容由演算法產生</span>
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                    <section>
                        <h3 className="mb-3 border-b-2 border-destructive pb-1 text-sm font-bold uppercase tracking-wider text-foreground">編輯精選</h3>
                        <ul className="divide-y divide-border">
                            {history.length === 0 && <li className="py-3 text-sm text-muted-foreground">尚未有過往報道，按掣再生成多幾則。</li>}
                            {history.map((h, i) => (
                                <li key={h.id} className="flex gap-3 py-3">
                                    <span className="font-serif text-2xl font-bold text-destructive/60">{String(i + 1).padStart(2, "0")}</span>
                                    <div className="min-w-0">
                                        <div className="font-serif text-sm font-bold leading-snug text-foreground">{h.headline}</div>
                                        <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{h.body}</div>
                                        <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                                            {h.reporter} · {h.time}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="rounded border border-border bg-muted/40 p-4">
                        <h3 className="font-serif text-base font-bold text-foreground">沈振盈金句</h3>
                        <p className="mt-2 font-serif text-sm italic leading-relaxed text-muted-foreground">「{main.quote}」</p>
                        <div className="mt-2 text-right text-xs text-muted-foreground">— 編輯部</div>
                    </section>
                </aside>
            </main>

            <footer className="border-t border-border bg-card">
                <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">© 垃圾恒指日報 · 本報所有內容純屬虛構，與任何真實人物或機構無關</div>
            </footer>
        </div>
    );
}
