import {createFileRoute} from "@tanstack/react-router";
import {GarbageHsiPage} from "@/components/home/GarbageHsiPage";

export const Route = createFileRoute("/")({
    component: Index,
    head: () => ({
        meta: [{title: "垃圾恒指新聞產生器 | 港股財經頭條"}, {name: "description", content: "寫嚟提醒自己睇少啲垃圾新聞"}],
    }),
});

function Index() {
    return <GarbageHsiPage />;
}
