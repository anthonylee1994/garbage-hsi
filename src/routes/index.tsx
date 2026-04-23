import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "垃圾恒指新聞產生器" },
      { name: "description", content: "一鍵生成垃圾恒指新聞，最緊要係沈振盈。" },
    ],
  }),
});

const data = {
  trend: ["受拖累而下跌", "先升後跌", "裂口下跌"],
  mainCause: [
    "人民幣升", "人民幣跌", "經濟數據太好", "經濟數據唔好", "加息", "減息",
    "pmi高", "pmi低", "非農高", "非農低", "ppi高", "ppi低", "出口", "進口",
    "通脹進一步擴大引發過熱憂慮", "通縮進一步擴大引發增長憂慮",
    "政治會議沒有推出大型救市口風", "新年",
  ],
  market: ["日經", "美國", "德國", "英國", "法國", "韓國", "臺灣", "上証", "非洲", "阿根廷", "土耳其", "新加坡", "馬來西亞"],
  marketPerformance: ["向好", "偏弱", "反覆", "受壓", "造好"],
  macro: ["中美兩地口水戰", "領導人探訪", "領導人不探訪", "日本仔減息", "日本仔加息"],
  sentiment: ["審慎", "轉弱", "偏淡", "受壓", "觀望"],
  sector: ["內房", "內銀", "內險", "狗巴", "賣車少", "賣車多", "賭業股"],
  sectorNews: ["配股", "合股", "供股", "業績遜預期", "創2019年以來最佳數據", "任何一個老闆沽售", "南非主權基金沽售"],
  impact: ["拖累", "帶動"],
  event: [
    "地震", "海嘯", "強風", "日蝕", "月蝕",
    "正東風水不佳", "正南風水不佳", "正西風水不佳", "正北風水不佳",
    "金正恩", "拜登", "特朗普",
    "以色列巴勒斯坦地區小朋友齊打交", "伊朗宣佈介入小朋友齊打交", "中東宣佈加入小朋友齊打交",
    "北韓玩具核彈危機", "南北韓邊境衝突，邊境守衛造成XX人傷亡", "柬埔寨KK園政府軍叛軍駁火",
  ],
};

const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)];

function generate() {
  return `今日，恒指${pick(data.trend)}。外圍方面，${pick(data.market)}表現${pick(data.marketPerformance)}，加上${pick(data.mainCause)}及${pick(data.macro)}，投資氣氛${pick(data.sentiment)}。板塊方面，${pick(data.sector)}受${pick(data.sectorNews)}影響，${pick(data.impact)}大市。消息面上，市場亦關注${pick(data.event)}。最後點都要補充，最緊要係沈振盈。`;
}

function Index() {
  const [news, setNews] = useState<string>(() => generate());
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = () => {
    setHistory((h) => [news, ...h].slice(0, 10));
    setNews(generate());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <header className="mb-10 text-center">
          <div className="mb-3 inline-block rounded-full bg-destructive/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-destructive">
            Breaking · 財經垃圾話
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            垃圾恒指新聞產生器 📉
          </h1>
          <p className="mt-3 text-muted-foreground">一鍵生成毫無營養嘅恒指收市評論</p>
        </header>

        <Card className="border-2 shadow-xl">
          <CardContent className="p-8">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              今日恒指評論
            </div>
            <p className="text-lg leading-relaxed text-foreground md:text-xl">{news}</p>
            <Button onClick={handleGenerate} size="lg" className="mt-6 w-full">
              再嚟一篇 🎲
            </Button>
          </CardContent>
        </Card>

        {history.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              過往廢話
            </h2>
            <div className="space-y-3">
              {history.map((h, i) => (
                <Card key={i} className="bg-muted/50">
                  <CardContent className="p-4 text-sm text-muted-foreground">{h}</CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          純屬娛樂 · 最緊要係沈振盈
        </footer>
      </div>
    </div>
  );
}
