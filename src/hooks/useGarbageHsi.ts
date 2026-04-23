import React from "react";
import {appendHistory, generateArticle, getNowLabel, loadStoredArticles, saveStoredArticles, syncArticleCounter, type Article} from "@/lib/garbageHsi";

type UseGarbageHsiResult = {
    history: Article[];
    main: Article | null;
    now: string;
    generateNext: () => void;
};

export function useGarbageHsi(): UseGarbageHsiResult {
    const [main, setMain] = React.useState<Article | null>(null);
    const [history, setHistory] = React.useState<Article[]>([]);
    const [now, setNow] = React.useState("");

    React.useEffect(() => {
        const stored = loadStoredArticles();
        if (stored) {
            setMain(stored.main);
            setHistory(stored.history);
            syncArticleCounter([stored.main, ...stored.history]);
        } else {
            setMain(generateArticle());
        }

        setNow(getNowLabel());
        const intervalId = window.setInterval(() => {
            setNow(getNowLabel());
        }, 1000 * 30);

        return () => window.clearInterval(intervalId);
    }, []);

    React.useEffect(() => {
        if (!main) {
            return;
        }

        saveStoredArticles({
            main,
            history,
        });
    }, [history, main]);

    function generateNext() {
        if (main) {
            setHistory(currentHistory => appendHistory(currentHistory, main));
        }

        setMain(generateArticle());
    }

    return {
        history,
        main,
        now,
        generateNext,
    };
}
