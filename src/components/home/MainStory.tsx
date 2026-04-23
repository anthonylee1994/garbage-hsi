import {Button} from "@/components/ui/button";
import type {Article} from "@/lib/garbageHsi";

type MainStoryProps = {
    article: Article;
    onGenerate: () => void;
};

export const MainStory = ({article, onGenerate}: MainStoryProps) => {
    return (
        <article className="lg:col-span-2">
            <div className="mb-3 flex items-center gap-2">
                <span className="rounded-sm bg-destructive px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-destructive-foreground">即時新聞</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">港股 · 收市評論</span>
            </div>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">{article.headline}</h2>
            <div className="mt-3 flex items-center gap-3 border-b border-border pb-3 text-xs text-muted-foreground">
                <span>
                    本報記者 <span className="font-semibold text-foreground">{article.reporter}</span> 報道
                </span>
                <span>·</span>
                <span>更新於 {article.time}</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded border border-border bg-border text-center">
                <div className="bg-card p-3">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">恒生指數</div>
                    <div className="mt-1 font-mono text-lg font-bold text-foreground">{article.index}</div>
                </div>
                <div className={article.up ? "bg-card p-3 text-emerald-600" : "bg-card p-3 text-destructive"}>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">升跌</div>
                    <div className="mt-1 font-mono text-lg font-bold">{article.change}</div>
                </div>
                <div className={article.up ? "bg-card p-3 text-emerald-600" : "bg-card p-3 text-destructive"}>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">變幅</div>
                    <div className="mt-1 font-mono text-lg font-bold">{article.changePct}</div>
                </div>
            </div>

            <div className="mt-6 font-serif text-lg leading-loose text-foreground first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-destructive">
                {article.body}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <Button onClick={onGenerate} size="lg" className="select-none bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    🎲 生成下一則頭條
                </Button>
                <span className="text-xs text-muted-foreground">純屬娛樂 · 內容由演算法產生</span>
            </div>
        </article>
    );
};
