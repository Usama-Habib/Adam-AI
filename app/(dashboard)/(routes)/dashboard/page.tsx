"use client"

import { ArrowRight, BotIcon, MoveVertical, PencilLine, SwitchCameraIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


const tools = [
  {
    label: "AI Agent",
    icon: BotIcon,
    color: "text-orange-500",
    bgColor: "bg-black-500/10",
    href: "/chatagent"
  },
  {
    label: "AI Logo Creator",
    icon: PencilLine,
    color: "text-purple-500",
    bgColor: "bg-black-500/10",
    href: "/logodesigner"
  },
  {
    label: "AI Image Creator",
    icon: SwitchCameraIcon,
    color: "text-yellow-500",
    bgColor: "bg-black-500/10",
    href: "/imagecreator"
  },
  {
    label: "AI Photo Upscaler",
    icon: MoveVertical,
    color: "text-green-500",
    bgColor: "bg-black-500/10",
    href: "/upscaler"
  }
];

const DashboardPage = () => {
  const [isNavigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    setNavigationReady(true);
  }, []);

  const handleNavigation = (href: string) => {
    if (isNavigationReady) {
      window.location.href = href;
    }
  };

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-xl md:text-2xl font-bold text-center">
          Discover our agents and other AI-tools.
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Artificial intelligence revolutionized the way we live and work 
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool, index) => (
          <Card 
            onClick={() => handleNavigation(tool.href)} 
            key={index} // Use index as key, as href might not always be unique
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} /> 
              </div>  
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div> 
  )
}

export default DashboardPage;
