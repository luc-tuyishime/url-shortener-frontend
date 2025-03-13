import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Calendar, ArrowRight, Copy, Check } from 'lucide-react';

import { Button } from '../ui/button.tsx';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { useCreateUrlMutation } from '../../features/urls/urlsApiSlice';
import { CreateUrlRequest } from '../../types/url.types';

const UrlForm: React.FC = () => {
    const [createUrl, { isLoading }] = useCreateUrlMutation();

    const [formData, setFormData] = useState<CreateUrlRequest>({
        long_url: '',
    });
    const [shortUrl, setShortUrl] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.long_url) {
            setError('Please enter a URL to shorten');
            return;
        }

        try {
            setError(null);
            const result = await createUrl(formData).unwrap();
            setShortUrl(result.short_url);
            setShowSuccess(true);

            // Reset form
            setFormData({
                long_url: '',
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (err: any) {
            console.error('Failed to create URL:', err);
            setError(err.data?.message || 'Failed to create shortened URL. Please try again.');
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="shadow-sm border-gray-200">
            <CardContent className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Link2 size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Create New URL</h2>
                        <p className="text-sm text-gray-500">Shorten a long URL to share anywhere</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-1">
                            Long URL
                        </label>
                        <Input
                            id="longUrl"
                            name="long_url"
                            type="url"
                            placeholder="https://example.com/very-long-url-path-to-shorten"
                            value={formData.long_url}
                            onChange={handleChange}
                            className="w-full"
                            required
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                    </div>

                    <div>
                        <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date (Optional)
                        </label>
                        <div className="relative">
                            <Input
                                id="expiresAt"
                                name="expiresAt"
                                type="date"
                                value={formData.expires_at || ''}
                                onChange={handleChange}
                                className="w-full"
                            />
                            <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Leave empty for links that never expire</p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
                        ) : (
                            <span className="flex items-center justify-center">
                Create Short URL <ArrowRight size={16} className="ml-2" />
              </span>
                        )}
                    </Button>
                </form>

                {showSuccess && shortUrl && (
                    <motion.div
                        className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-sm font-medium text-green-800">URL created successfully!</h3>
                                <p className="text-xs text-gray-500 mt-1">Your shortened URL:</p>
                                <p className="text-sm font-medium text-blue-600 break-all">{shortUrl}</p>
                            </div>
                            <Button
                                onClick={handleCopyToClipboard}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                            >
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
};

export default UrlForm;