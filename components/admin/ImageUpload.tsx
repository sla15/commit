import React, { useState, useRef } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface ImageUploadProps {
    bucket: string;
    currentImage?: string;
    onUpload: (url: string) => void;
    onRemove: () => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ bucket, currentImage, onUpload, onRemove }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setError(null);
            const file = e.target.files?.[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }

            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setError('Image size must be less than 2MB');
                return;
            }

            setUploading(true);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onUpload(data.publicUrl);
        } catch (error: any) {
            console.error('Error uploading image:', error);
            setError(error.message || 'Error uploading image');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="space-y-4">
            {currentImage ? (
                <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                    <img
                        src={currentImage}
                        alt="Uploaded Preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            variant="secondary"
                            onClick={onRemove}
                            className="bg-white text-red-600 hover:bg-red-50 border-white hover:border-red-100"
                        >
                            <X size={16} className="mr-2" /> Remove Image
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video w-full max-w-sm rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-400 hover:bg-brand-50 transition-all flex flex-col items-center justify-center cursor-pointer p-6 text-center"
                >
                    {uploading ? (
                        <div className="flex flex-col items-center text-brand-600">
                            <Loader2 size={32} className="animate-spin mb-2" />
                            <span className="text-sm font-medium">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-slate-500">
                            <div className="p-3 bg-slate-100 rounded-full mb-3 group-hover:bg-white group-hover:text-brand-500 transition-colors">
                                <Upload size={24} />
                            </div>
                            <p className="font-medium text-slate-700">Click to upload image</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                        </div>
                    )}
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {error && (
                <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>
            )}
        </div>
    );
};
