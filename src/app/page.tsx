"use client";

import { Paste, fetchPaste } from "@/atoms/paste";
import { Profile, fetchProfile } from "@/atoms/profile";
import { HoodMap } from "@/components/hood-map";
import WelcomePanel from "@/components/welcome-panel";
import useBackground from "@/hooks/use-background";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function NewPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [color, setColor] = useState<string>("");
  const [paste, setPaste] = useState<Paste | null>(null);
  const [pasteOwnerProfile, setPasteOwnerProfile] = useState<Profile | null>(
    null
  );

  useBackground(pasteOwnerProfile?.color);

  return (
    <div>
      <HoodMap />
    </div>
  );
}
