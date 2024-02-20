import React, { useRef, useState } from 'react';
import { uploadFile } from '@junobuild/core-peer';
import { nanoid } from 'nanoid';
import { Button } from "./ui/button";
import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { LocationSelect } from './location-select';

interface UploadDrawerProps {
  onClose: () => void;
}

export function UploadDrawer({ onClose }: UploadDrawerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5 MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return; 

    setIsLoading(true);
    setError(null);

    try {
      const uniqueFileName = nanoid();
      const fileExtension = selectedFile.type.split('/')[1];
      const fileWithUniqueName = new File([selectedFile], `${uniqueFileName}.${fileExtension}`, { type: selectedFile.type });

      const uploadResult = await uploadFile({
        data: fileWithUniqueName,
        collection: "receipts",
      });

      console.log("File uploaded successfully:", uploadResult);
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      setError('Error uploading file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Check In</DrawerTitle>
          <DrawerDescription>Upload your receipt to check in</DrawerDescription>
        </DrawerHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5 p-4">
          <div>
            <LocationSelect />
          </div>
          <div>
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" onChange={handleSetFile} accept="image/*" />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={handleUpload} disabled={isLoading}>{isLoading ? 'Uploading...' : 'Submit'}</Button>
          {error && <div className="text-red-500">{error}</div>}
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
