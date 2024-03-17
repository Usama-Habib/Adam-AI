"use client";

import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { LayoutDashboard, Bot, SwitchCameraIcon, PencilLineIcon, MoveVerticalIcon, GitPullRequestDraft, Settings, Smile } from "lucide-react";
import { Roboto_Slab } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const Roboto = Roboto_Slab({ 
    weight: "900", 
    subsets: ["greek"] 
});

const routes = [
    {
        label: "Dashboard",
        icon: Smile,
        href: "/dashboard",
        color: "text-white-100",
    },
    {
        label: 'AI Agent',
        icon: Bot,
        href: '/chatagent',
        color: "text-grey-400",
    },
    {
        label: 'AI Image Creator',
        icon: SwitchCameraIcon,
        color: "text-grey-500",
        href: '/imagecreator',
    },
    {
        label: 'AI Logo Creator',
        icon: PencilLineIcon,
        color: "text-grey-900",
        href: '/logodesigner',
    },
    {
        label: 'AI Photo Upscaler',
        icon: MoveVerticalIcon,
        color: "text-grey-500",
        href: '/upscaler',
    },
    {
        label: 'AI PDF Chat',
        icon: GitPullRequestDraft,
        color: "text-black-400",
        href: '/chat2pdf',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
    },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-1 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-1 flex-5">
                <Link href="/dashboard" className="flex items-center pl-9 mb-10">
                    <div className="relative w-20 h-20 mr-4">
                        <Image
                            fill
                            alt="Logo"
                            src="/logo.svg"
                        />
                    </div>
                    <h1 className={cn("text-2xl fon", Roboto.className)}>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href}>
                            <div className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-pink hover:bg-purple-700 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" :
                                    "text-zinc-400"
                            )}>

                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("h-5 w-7 mr-3", route.color)} />
                                    {route.label}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
