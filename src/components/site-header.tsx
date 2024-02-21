"use client";

import { useRecoilState } from "recoil";
import { MainMenuToggle } from "./main-menu-toggle";
import { authState } from "@/atoms/auth";
import { profileState } from "@/atoms/profile";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Flame, Receipt } from "lucide-react";

export function SiteHeader() {
  const router = useRouter();
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold inline-block">
              <span className="mr-2">🍔</span>
              HoodFunt
            </span>
          </a>
          <nav className="flex items-center gap-6 text-sm"></nav>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-row gap-1 items-center">
                  <Flame className="text-red-500 w-6 h-6" />
                  x1
                </div>
              </TooltipTrigger>
              <TooltipContent>Streak</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-row gap-1 items-center">
                  <Receipt className="text-green-500 w-6 h-6" />
                  x64
                </div>
              </TooltipTrigger>
              <TooltipContent>Receipts Uploaded</TooltipContent>
            </Tooltip>
            <div className="flex flex-row gap-1 items-center"></div>
            <MainMenuToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
