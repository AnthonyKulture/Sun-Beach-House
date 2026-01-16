import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Download, Loader2 } from 'lucide-react';
import { Villa } from '../types';
import { generatePDFFileName } from '../utils/pdfHelpers';
import { useLanguage } from '../contexts/LanguageContext';

interface DownloadBrochureButtonProps {
    villa: Villa;
    className?: string;
    compact?: boolean; // For mobile icon-only version
}

export const DownloadBrochureButton: React.FC<DownloadBrochureButtonProps> = ({
    villa,
    className = '',
    compact = false,
}) => {
    const { t, language } = useLanguage();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async () => {
        try {
            setIsGenerating(true);
            setError(null);

            // Call server-side API to generate PDF
            const response = await fetch(`/api/generate-pdf?villaId=${villa.id}&lang=${language}&t=${Date.now()}`);

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            // Get PDF blob from response
            const blob = await response.blob();

            // Trigger download
            const fileName = generatePDFFileName(villa);
            saveAs(blob, fileName);

            setIsGenerating(false);
        } catch (err) {
            console.error('PDF Generation Error:', err);
            setError(t.downloadBrochure.error);
            setIsGenerating(false);
        }
    };

    if (compact) {
        // Mobile icon-only button
        return (
            <button
                onClick={handleDownload}
                disabled={isGenerating}
                className={`
          p-3 rounded-full border border-gray-200
          hover:bg-sbh-cream hover:border-sbh-green
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
                title={t.downloadBrochure.title}
            >
                {isGenerating ? (
                    <Loader2 size={20} className="animate-spin text-sbh-charcoal" />
                ) : (
                    <Download size={20} className="text-sbh-charcoal" />
                )}
            </button>
        );
    }

    // Full desktop button
    return (
        <div>
            <button
                onClick={handleDownload}
                disabled={isGenerating}
                className={`
          w-full bg-white text-sbh-charcoal border border-sbh-charcoal/20
          py-3 lg:py-3 xl:py-4 font-sans text-[10px] xl:text-xs uppercase tracking-[0.25em]
          hover:bg-sbh-cream hover:border-sbh-green transition-all duration-500
          rounded-sm
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
          ${className}
        `}
            >
                {isGenerating ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>{t.downloadBrochure.generating}</span>
                    </>
                ) : (
                    <>
                        <Download size={16} />
                        <span>{t.downloadBrochure.download}</span>
                    </>
                )}
            </button>

            {error && (
                <p className="text-red-500 text-xs mt-2 text-center font-sans">
                    {error}
                </p>
            )}
        </div>
    );
};
