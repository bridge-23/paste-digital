import React, { useState, useEffect } from 'react';
import { uploadFile, setDoc } from '@junobuild/core-peer';
import { nanoid } from 'nanoid';
import { Button } from "./ui/button";
import { DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { LocationSelect } from './location-select';
import { createWorker } from 'tesseract.js';
import OpenAI from "openai";

interface UploadDrawerProps {
  onClose: () => void;
}

export function UploadDrawer({ onClose }: UploadDrawerProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
 
  useEffect(() => {
    if (analysisResult) {
      console.log("Updated analysisResult", analysisResult);
    }
  }, [analysisResult]);
  
  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5 MB');
        return;
      }
      setSelectedFile(file);
      recognizeText(file);
    }
  };

  const recognizeText = async (file: File) => {
    setIsLoading(true);
    const worker = await createWorker();

    try {
      const { data: { text } } = await worker.recognize(file);
      console.log(text);
      analyze(text)
      setRecognizedText(text);
    } catch (error) {
      console.error('Error of bild recognize:', error);
      setError('Error of bild recognize');
    } finally {
      setIsLoading(false);
      // setShowModal(true);
      await worker.terminate();
    }
  };

  async function analyze(text: string) {
    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": "you analyze the text of the check and make a JSON file out of it." },
          {
            "role": "user", "content": `Extract only JSON information such as store name, address, 
                total purchase category, product names, product categories, prices and other value data - like 
                locale:
                  language
                  country
                  currency
                from the following receipt text: ${text}`
          }
        ],
      });

      let fullResponse = "";
      if (completion.choices) {
        completion.choices.forEach(choice => {
          fullResponse += choice.message.content;
        });
      }

      setAnalysisResult(fullResponse);
    } catch (error) {
      console.error('Error during OpenAI analysis:', error);
      setError('Error during OpenAI analysis');
    }
  }

  async function uploadAnalysisResult(analysisResult: string, docKey: string): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const analysisResultObject = JSON.parse(analysisResult);

      await setDoc({
        collection: "Receipts_json",
        doc: {
          key: docKey,
          data: analysisResultObject,
        },
      });

    } catch (error) {
      console.error("Error saving analysis result:", error);
      setError('Error saving analysis result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    const docKey = nanoid();

    try {
      const fileExtension = selectedFile.type.split('/')[1];
      const fileWithUniqueName = new File([selectedFile], `${docKey}.${fileExtension}`, { type: selectedFile.type });

      const uploadResult = await uploadFile({
        data: fileWithUniqueName,
        collection: "receipts",
      });

      console.log("File uploaded successfully:", uploadResult);

      if (recognizedText) {
        await uploadAnalysisResult(analysisResult, docKey);
      }

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
