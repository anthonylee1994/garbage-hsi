import type {Article} from "@/lib/garbageHsi";

type HistorySidebarProps = {
    history: Article[];
    quote: string;
    quoteAuthor: string;
};

export const HistorySidebar = ({history, quote, quoteAuthor}: HistorySidebarProps) => {
    return (
        <aside className="space-y-6">
            <section>
                <h3 className="mb-3 border-b-2 border-destructive pb-1 text-sm font-bold uppercase tracking-wider text-foreground">編輯精選</h3>
                <ul className="divide-y divide-border">
                    {history.length === 0 ? <li className="py-3 text-sm text-muted-foreground">尚未有過往報道，按掣再生成多幾則。</li> : null}
                    {history.map((article, index) => (
                        <li key={article.id} className="flex gap-3 py-3">
                            <span className="font-serif text-2xl font-bold text-destructive/60">{String(index + 1).padStart(2, "0")}</span>
                            <div className="min-w-0">
                                <div className="font-serif text-sm font-bold leading-snug text-foreground">{article.headline}</div>
                                <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{article.body}</div>
                                <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                                    {article.reporter} · {article.time}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="rounded border border-border bg-muted/40 p-4">
                <h3 className="font-serif text-base font-bold text-foreground">名家金句</h3>
                <p className="mt-2 font-serif text-sm italic leading-relaxed text-muted-foreground">「{quote}」</p>
                <div className="mt-2 text-right text-xs text-muted-foreground">— {quoteAuthor || "編輯部"}</div>
            </section>
        </aside>
    );
};
