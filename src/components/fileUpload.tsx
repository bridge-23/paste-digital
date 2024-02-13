import React, { useRef, useState, useEffect } from 'react';
import { uploadFile } from '@junobuild/core-peer';

const FileUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (selectedFile) {
            const filePreviewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(filePreviewUrl);

            return () => URL.revokeObjectURL(filePreviewUrl);
        }
    }, [selectedFile]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setShowModal(true);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setIsLoading(true);
            setError(null);
            try {
                const uploadResult = await uploadFile({
                    data: selectedFile,
                    collection: "receipts",
                });
                console.log("File uploaded successfully:", uploadResult);
                setShowModal(false);
                setIsLoading(false);
            } catch (error) {
                console.error("Error uploading file:", error);
                setError('Error uploading file');
                setIsLoading(false);
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={handleClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Choose File
            </button>
            {showModal && selectedFile && (
                <div className={`fixed inset-0 ${isDarkMode ? 'bg-black' : 'bg-white'} bg-opacity-50 flex justify-center items-center`}>
                    <div className={`bg-white p-4 rounded-lg shadow-lg m-4 ${isDarkMode ? 'text-white bg-gray-800' : 'text-gray-800 bg-white'}`} style={{ maxWidth: '90%', width: '400px' }}>
                        {previewUrl && (
                            <img src={previewUrl} alt="Selected file" className="max-w-full h-auto mb-4" />
                        )}
                        <div className="flex justify-between">
                            <button
                                onClick={() => setShowModal(false)}
                                className={`bg-gray-300 hover:bg-gray-400 ${isDarkMode ? 'text-gray-800' : 'text-white'} font-bold py-2 px-4 rounded-l`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={isLoading}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                            >
                                {isLoading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                        {error && (
                            <div className="mt-2">{error}</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
