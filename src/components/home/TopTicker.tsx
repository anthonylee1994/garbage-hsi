import {cn} from "@/lib/utils";
import {getTickerItems, type Article} from "@/lib/garbageHsi";

type TopTickerProps = {
    main: Article;
};

export const TopTicker = ({main}: TopTickerProps) => {
    const items = getTickerItems(main);

    return (
        <div className="border-b border-border bg-foreground text-background">
            <div className="container mx-auto flex items-center gap-4 overflow-hidden px-4 py-1.5 text-xs">
                <span className="shrink-0 rounded bg-destructive px-2 py-0.5 font-bold uppercase tracking-wider">Live</span>
                <div className="flex animate-pulse gap-6 whitespace-nowrap">
                    {items.map(item => (
                        <span key={item.label}>
                            {item.label} {item.value} {item.change ? <span className={cn(item.up ? "text-emerald-400" : "text-red-400")}>{item.change}</span> : null}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
