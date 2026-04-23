import {getNavItems} from "@/lib/garbageHsi";

type SiteHeaderProps = {
    now: string;
    quoteAuthor: string;
};

export const SiteHeader = ({now, quoteAuthor}: SiteHeaderProps) => {
    const navItems = getNavItems(quoteAuthor);

    return (
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
                    {navItems.map((item, index) => (
                        <span key={item} className={index === 0 ? "text-destructive" : "cursor-pointer hover:text-destructive"}>
                            {item}
                        </span>
                    ))}
                </nav>
            </div>
        </header>
    );
};
