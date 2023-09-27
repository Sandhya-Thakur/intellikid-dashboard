"use client";
import {
  CaseSensitive,
  Link2,
  BrainCog,
  CandlestickChart,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Code,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: 'Code Generator',
    icon: Code,
    color: "text-green-700",
    href: '/code',
  },

  {
    label: "Content Generator",
    icon: CaseSensitive,
    color: "text-pink-700",
    href: "/textcontent",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Links Generation",
    icon: Link2,
    color: "text-orange-700",
    href: "/linkcontent",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Tests",
    icon: CandlestickChart,
    color: "text-emerald-500",
    href: "/testcontent",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    bgColor: "bg-blue-500/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Learn with the AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
