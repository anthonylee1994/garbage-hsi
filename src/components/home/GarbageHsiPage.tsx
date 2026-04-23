import {HistorySidebar} from "@/components/home/HistorySidebar";
import {MainStory} from "@/components/home/MainStory";
import {SiteFooter} from "@/components/home/SiteFooter";
import {SiteHeader} from "@/components/home/SiteHeader";
import {TopTicker} from "@/components/home/TopTicker";
import {useGarbageHsi} from "@/hooks/useGarbageHsi";

export const GarbageHsiPage = () => {
    const {history, main, now, generateNext} = useGarbageHsi();

    if (!main) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            <TopTicker main={main} />
            <SiteHeader now={now} quoteAuthor={main.quoteAuthor} />
            <main className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-3">
                <MainStory article={main} onGenerate={generateNext} />
                <HistorySidebar history={history} quote={main.quote} quoteAuthor={main.quoteAuthor} />
            </main>
            <SiteFooter />
        </div>
    );
};
