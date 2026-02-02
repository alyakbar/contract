'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, File, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ContractUploaderProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
    error?: string | null;
}

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ContractUploader({
    onFileSelect,
    isAnalyzing,
    error
}: ContractUploaderProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        const extension = '.' + file.name.split('.').pop()?.toLowerCase();

        if (!ALLOWED_EXTENSIONS.includes(extension)) {
            return 'Please upload a PDF, DOCX, or TXT file.';
        }

        if (file.size > MAX_FILE_SIZE) {
            return 'File is too large. Maximum size is 5MB.';
        }

        return null;
    };

    const handleFile = useCallback((file: File) => {
        const error = validateFile(file);
        if (error) {
            setValidationError(error);
            setSelectedFile(null);
            return;
        }

        setValidationError(null);
        setSelectedFile(file);
        onFileSelect(file);
    }, [onFileSelect]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setValidationError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="w-full">
            {/* Dropzone */}
            <div
                onClick={!selectedFile ? handleClick : undefined}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${isDragOver
                        ? 'border-[var(--secondary-teal)] bg-[var(--secondary-teal)]/5'
                        : selectedFile
                            ? 'border-[var(--accent-green)] bg-[var(--accent-green)]/5'
                            : 'border-gray-300 hover:border-[var(--secondary-teal)] hover:bg-gray-50'
                    }
          ${!selectedFile ? 'cursor-pointer' : ''}
          ${isAnalyzing ? 'opacity-75 pointer-events-none' : ''}
        `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={handleInputChange}
                    className="hidden"
                />

                {selectedFile ? (
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center">
                            <File className="w-6 h-6 text-[var(--accent-green)]" />
                        </div>
                        <div className="text-left">
                            <p className="font-medium text-gray-900">{selectedFile.name}</p>
                            <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                        </div>
                        {!isAnalyzing && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clearFile();
                                }}
                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                        {isAnalyzing && (
                            <div className="ml-4">
                                <div className="w-6 h-6 border-2 border-[var(--secondary-teal)] border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 rounded-full bg-[var(--primary-navy)]/5 flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-7 h-7 text-[var(--primary-navy)]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Drop your contract here
                        </h3>
                        <p className="text-gray-500 mb-4">
                            or click to browse files
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                            <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
                            <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
                            <span className="px-2 py-1 bg-gray-100 rounded">TXT</span>
                            <span className="text-gray-300">•</span>
                            <span>Max 5MB</span>
                        </div>
                    </>
                )}
            </div>

            {/* Error Messages */}
            {(validationError || error) && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium text-red-800">Upload Error</p>
                        <p className="text-sm text-red-600">{validationError || error}</p>
                    </div>
                </div>
            )}

            {/* Privacy Notice */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                    <p className="font-medium text-blue-800">Privacy First</p>
                    <p className="text-sm text-blue-600">
                        Your document is processed in-memory only and is never stored on our servers.
                    </p>
                </div>
            </div>
        </div>
    );
}
