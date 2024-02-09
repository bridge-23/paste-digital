// src/atoms/comment.ts
import { atom } from 'recoil';
import { nanoid } from 'nanoid';
import { Doc, getDoc, setDoc } from '@junobuild/core-peer';

export const COMMENTS_COLLECTION = 'comments';

export type Comment = {
  content: string;
  timestamp: number;
    pasteId: string;
};

export const commentState = atom({
  key: 'comment',
  default: '',
});

export async function fetchComment(id: string): Promise<Doc<Comment> | null> {
  const _comment = await getDoc<Comment>({
    collection: COMMENTS_COLLECTION,
    key: id,
  });

  return _comment ? _comment : null;
}

export async function createComment(
  data: Comment,
  description: string
): Promise<Doc<Comment>> {
  const key = nanoid();
  const doc = await setDoc<Comment>({
    collection: COMMENTS_COLLECTION,
    doc: {
      key,
      description,
      data,
    },
  });

  return doc;
}