import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Check, Trash2, ExternalLink, BarChart2 } from 'lucide-react';

import { Button } from '../ui/button.tsx';
import { Url } from '../../types/url.types';
import { useDeleteUrlMutation } from '../../features/urls/urlsApiSlice';
import { formatDate } from '../../utils/formatters';

interface UrlCardProps {
    url: Url;
}

const UrlCard: React.FC<UrlCardProps> = ({ url }) => {
    const [deleteUrl, { isLoading: isDeleting }] = useDeleteUrlMutation();
    const [copied, setCopied] = useState<boolean>(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(url.short_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        if (showDeleteConfirm) {
            try {
                await deleteUrl(url.short_code).unwrap();
                // Success is handled through the cache invalidation
            } catch (error) {
                console.error('Failed to delete URL:', error);
            } finally {
                setShowDeleteConfirm(false);
            }
        } else {
            setShowDeleteConfirm(true);
        }
    };

    return (
        <motion.div
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden card-hover"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
        >
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <ExternalLink size={18} className="text-blue-600" />
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            onClick={handleCopyToClipboard}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                        >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        </Button>
                        <Button
                            onClick={handleDelete}
                            variant="ghost"
                            size="sm"
                            className={`h-8 w-8 p-0 ${showDeleteConfirm ? 'text-red-600' : ''}`}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <Trash2 size={16} />
                            )}
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-500">Original URL</h3>
                        <p className="text-sm text-gray-800 truncate" title={url.long_url}>
                            {url.long_url}
                        </p>
                    </div>

                    <div className="mb-3">
                        <h3 className="text-sm font-medium text-gray-500">Short URL</h3>
                        <p className="text-sm text-blue-600 font-medium">
                            <a href={url.short_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {url.short_url}
                            </a>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <h3 className="text-xs font-medium text-gray-500">CREATED</h3>
                            <p className="text-sm text-gray-800">{formatDate(url.created_at)}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-medium text-gray-500">CLICKS</h3>
                            <p className="text-sm text-gray-800">{url.clicks}</p>
                        </div>
                        {url.expires_at && (
                            <div className="col-span-2">
                                <h3 className="text-xs font-medium text-gray-500">EXPIRES</h3>
                                <p className="text-sm text-gray-800">{formatDate(url.expires_at)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-3">
                <Link
                    to={`/analytics/${url.short_code}`}
                    className="flex items-center justify-center text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                    <BarChart2 size={16} className="mr-1" />
                    View Analytics
                </Link>
            </div>

            {showDeleteConfirm && (
                <motion.div
                    className="border-t border-gray-200 bg-red-50 p-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <p className="text-sm text-red-600 mb-2">Are you sure you want to delete this URL?</p>
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default UrlCard;