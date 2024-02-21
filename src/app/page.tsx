"use client";

import { HoodMap } from "@/components/hood-map";
import useBackground from "@/hooks/use-background";

export default function NewPage() {
  useBackground();

  return (
    <div>
      <HoodMap />
    </div>
  );
}
