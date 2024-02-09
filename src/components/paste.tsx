"use client";
import React, { useState } from "react";
import { CommentForm } from "./forms/paste-form";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "next-themes";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Paste } from "@/atoms/paste";
import { Profile } from "@/atoms/profile";
import { Avatar } from "./avatar";
import { CopyLink } from "./copy-link";

type PasteProps = {
  paste: Paste;
  ownerProfile: Profile | null;
};

export function PasteCard({ paste, ownerProfile }: PasteProps) {
  const { theme } = useTheme();
  const [comment, setComment] = useState<{ id: string; text: any; userId: string; }[]>(paste.comments || []);

  const handleCommentSubmit = (text: any) => {
    const newComment = { id: Date.now().toString(), text, userId: "anonymous" };
    setComment([...comment, newComment]);
  }

  return (
    <Card className="w-[90vw] max-w-screen-2xl">
      <CardHeader>
        <CardTitle>
          <div className="w-full flex items-center justify-between gap-4">
            <h1>{paste.title || "Untitled Paste"}</h1>
            <CopyLink />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <CodeEditor
            value={paste.content}
            language={paste.language}
            padding={15}
            data-color-mode={theme === "dark" ? "dark" : "light"}
            readOnly={true}
            style={{
              borderRadius: "5px",
              background: "transparent",
              fontFamily: "monospace",
            }}
          />
        </div>
        <div style={{ fontSize: 'small', color: '#888', marginTop: '10px' }}>
          {comment.map((comment) => (
            <div key={comment.id}>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
        <CommentForm onSubmit={handleCommentSubmit} />
      </CardContent>
      <CardFooter>
        <div className="flex flex-row items-center gap-2 text-foreground/80">
          <span>Published by:</span>
          {ownerProfile ? (
            <>
              <Avatar profile={ownerProfile} />
              <strong>@{ownerProfile.username}</strong>
            </>
          ) : (
            <>Anonymous</>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}