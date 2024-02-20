"use client";

import { profileState } from "@/atoms/profile";
import { useRecoilState } from "recoil";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Map, History, FileUp, Gift, Users } from "lucide-react";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import { UploadDrawer } from "./upload-drawer";

export function SiteFooter() {
  const [profile, setProfile] = useRecoilState(profileState);

  if (!profile) {
    return null;
  }

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-12 max-w-screen-sm items-center justify-between">
        <a href="/">
          <Map />
        </a>
        <a href="/rewards">
          <Gift />
        </a>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              size={"lg"}
              className="bg-green-500 hover:bg-green-400 rounded-full h-20"
            >
              <FileUp />
            </Button>
          </DrawerTrigger>
          <UploadDrawer />
        </Drawer>
        <a href="/timeline">
          <History />
        </a>
        <a href="/friends">
          <Users />
        </a>
      </div>
    </footer>
  );
}
