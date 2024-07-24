"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";

import { sidebarOptions } from "@/lib/constant";

import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ModeToggle } from "../global/mode-toggle";

const Sidebar = () => {
    const pathName = usePathname()

    return (
        <nav className="dark:bg-black h-screen justify-between flex items-center flex-col gap-10 py-6 px-2 " >
            <div className="flex items-center justify-center flex-col gap-8" >
                <Link
                    className="flex font-bold flex-row"
                    href="/"
                >
                    fuzzy.
                </Link>
                <TooltipProvider>
                    {sidebarOptions.map((sidebarItem) => (
                        <ul key={sidebarItem.name} >
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <li>
                                        <Link
                                            href={sidebarItem.href}
                                            className={clsx("group h-8 w-8 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer",
                                                {
                                                    'dark:bg-[#2F006B] bg-[#EEE0FF] ':
                                                        pathName === sidebarItem.href,
                                                }
                                            )}
                                        >
                                            <sidebarItem.Component
                                                selected={pathName === sidebarItem.href}
                                            />
                                        </Link>
                                    </li>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className="bg-black/10 backdrop-blur-xl"
                                >
                                    <p>{sidebarItem.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </ul>
                    ))}
                </TooltipProvider>

                <Separator />

                <div className="flex items-center flex-col gap-9 dark:bg-[#353346]/30 py-4 px-2 rounded-full h-max border-[1px]">
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] " >
                        <LucideMousePointerClick
                            className="dark:text-white"
                            size={18}
                        />
                        <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px] " />
                    </div>
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] " >
                        <GitBranch
                            className="dark:text-white"
                            size={18}
                        />
                        <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px] " />
                    </div>
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] " >
                        <Database
                            className="dark:text-white"
                            size={18}
                        />
                        <div className="border-l-2 border-muted-foreground/50 h-6 absolute left-1/2 transform translate-x-[-50%] -bottom-[30px] " />
                    </div>
                    <div className="relative dark:bg-[#353346]/70 p-2 rounded-full dark:border-t-[2px] border-[1px] dark:border-t-[#353346] " >
                        <GitBranch
                            className="dark:text-white"
                            size={18}
                        />
                    </div>
                </div>
            </div>

            {/* <div className="flex items-center justify-center flex-col gap-8" >
                <ModeToggle />
            </div> */}
        </nav>
    );
}

export default Sidebar;