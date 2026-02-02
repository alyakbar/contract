// Using require for CommonJS modules
import * as mammoth from 'mammoth';

export type FileType = 'pdf' | 'docx' | 'txt';

export interface ExtractionResult {
    success: boolean;
    text: string;
    error?: string;
    pageCount?: number;
}

/**
 * Extract text from a PDF buffer using unpdf (Node.js compatible)
 */
export async function extractFromPDF(buffer: Buffer): Promise<ExtractionResult> {
    try {
        const { extractText: pdfExtractText } = await import('unpdf');

        const result = await pdfExtractText(new Uint8Array(buffer));

        return {
            success: true,
            text: Array.isArray(result.text) ? result.text.join('\n\n') : (result.text || ''),
            pageCount: result.totalPages,
        };
    } catch (error) {
        return {
            success: false,
            text: '',
            error: error instanceof Error ? error.message : 'Failed to parse PDF',
        };
    }
}

/**
 * Extract text from a DOCX buffer
 */
export async function extractFromDOCX(buffer: Buffer): Promise<ExtractionResult> {
    try {
        const result = await mammoth.extractRawText({ buffer });
        return {
            success: true,
            text: result.value,
        };
    } catch (error) {
        return {
            success: false,
            text: '',
            error: error instanceof Error ? error.message : 'Failed to parse DOCX',
        };
    }
}

/**
 * Extract text from a plain text buffer
 */
export function extractFromTXT(buffer: Buffer): ExtractionResult {
    try {
        const text = buffer.toString('utf-8');
        return {
            success: true,
            text,
        };
    } catch (error) {
        return {
            success: false,
            text: '',
            error: error instanceof Error ? error.message : 'Failed to read text file',
        };
    }
}

/**
 * Detect file type from MIME type or extension
 */
export function detectFileType(mimeType: string, filename: string): FileType | null {
    if (mimeType === 'application/pdf' || filename.toLowerCase().endsWith('.pdf')) {
        return 'pdf';
    }
    if (
        mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        filename.toLowerCase().endsWith('.docx')
    ) {
        return 'docx';
    }
    if (mimeType === 'text/plain' || filename.toLowerCase().endsWith('.txt')) {
        return 'txt';
    }
    return null;
}

/**
 * Extract text from any supported file type
 */
export async function extractText(
    buffer: Buffer,
    fileType: FileType
): Promise<ExtractionResult> {
    switch (fileType) {
        case 'pdf':
            return extractFromPDF(buffer);
        case 'docx':
            return extractFromDOCX(buffer);
        case 'txt':
            return extractFromTXT(buffer);
        default:
            return {
                success: false,
                text: '',
                error: 'Unsupported file type',
            };
    }
}
