import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2Off } from 'lucide-react';

import { useGetUrlsQuery } from '../../features/urls/urlsApiSlice';
import UrlCard from './UrlCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const UrlList: React.FC = () => {
    const { data: urls, isLoading, isError, error } = useGetUrlsQuery();

    if (isLoading) {
        return (
            <div className="py-8 flex justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-8 text-center">
                <div className="text-red-500 mb-2">Error loading URLs</div>
                <div className="text-sm text-gray-500">
                    {error instanceof Error ? error.message : 'An unknown error occurred'}
                </div>
            </div>
        );
    }

    if (!urls || urls.length === 0) {
        return (
            <motion.div
                className="py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Link2Off size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No URLs Found</h3>
                <p className="text-gray-500 mb-4">You haven't created any shortened URLs yet.</p>
            </motion.div>
        );
    }

    return (
        <div className="py-4">
            <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {urls.map((url) => (
                        <UrlCard key={url.short_code} url={url} />
                    ))}
                </div>
            </AnimatePresence>
        </div>
    );
};

export default UrlList;