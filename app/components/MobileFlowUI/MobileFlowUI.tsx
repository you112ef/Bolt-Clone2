import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent } from "@/components/ui/sheet"; // Commented out

export default function MobileFlowUI() {
  const [activeView, setActiveView] = useState("flows");
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div
      className="w-full h-screen flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-white overflow-hidden"
      style={{ fontSize: "0.875rem" }} // تقليل حجم الخط الأساسي (14px)
    >
      {/* Header */}
      <header className="p-3 text-center font-semibold text-base border-b border-zinc-200 dark:border-zinc-800">
        yousef-n8n-flows
      </header>

      {/* Flow Canvas */}
      <div
        className="flex-1 overflow-x-auto overflow-y-hidden relative"
        style={{ fontSize: "0.75rem" }} // تصغير الخط داخل الحاوية (12px)
      >
        <div
          className="min-w-[600px] h-full p-3 flex gap-3"
          style={{ minWidth: "37.5rem" }} // 600px بالـ rem (1rem=16px)
        >
          {/* Sample nodes */}
          <button
            onClick={() => setSelectedNode("Node 1")}
            className="w-24 h-16 bg-blue-500 text-white text-xs rounded-lg shadow-md flex items-center justify-center hover:bg-blue-600 transition"
            style={{ fontSize: "0.7rem" }} // 11px أصغر نص في الأزرار
            aria-label="تحرير العقدة Node 1"
          >
            Node 1
          </button>
          <button
            onClick={() => setSelectedNode("Node 2")}
            className="w-24 h-16 bg-green-500 text-white text-xs rounded-lg shadow-md flex items-center justify-center hover:bg-green-600 transition"
            style={{ fontSize: "0.7rem" }}
            aria-label="تحرير العقدة Node 2"
          >
            Node 2
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="h-12 border-t border-zinc-200 dark:border-zinc-800 flex justify-around items-center bg-white dark:bg-zinc-900">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setActiveView("home")}
          className="text-xs px-2 py-1"
          aria-current={activeView === "home" ? "page" : undefined}
        >
          الرئيسية
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setActiveView("flows")}
          className="text-xs px-2 py-1"
          aria-current={activeView === "flows" ? "page" : undefined}
        >
          الفلوات
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={() => setActiveView("settings")}
          className="text-xs px-2 py-1"
          aria-current={activeView === "settings" ? "page" : undefined}
        >
          الإعدادات
        </Button>
      </nav>

      {/* Node Drawer - Commented out
      <Sheet open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <SheetContent
          side="bottom"
          className="h-[40%] p-4"
          style={{ fontSize: "0.8rem" }}
        >
          <h2 className="font-semibold text-base mb-3">
            تحرير العقدة: {selectedNode}
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-4">
            أدخل إعدادات العقدة بدقة. مثال: {"{"}
            "label": "اسم العقدة",
            "type": "HTTP Request",
            "url": "https://api.example.com",
            "method": "POST"
            {"}"}
          </p>
          <input
            type="text"
            placeholder="اسم العقدة"
            className="w-full p-2 mb-3 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-black dark:text-white text-sm"
          />
          <Button size="sm" className="w-full" onClick={() => alert("تم حفظ التعديلات")}>
            حفظ التعديلات
          </Button>
        </SheetContent>
      </Sheet>
      */}
    </div>
  );
}
