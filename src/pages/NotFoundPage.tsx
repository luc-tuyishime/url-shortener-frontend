import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/button';

const NotFoundPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-md w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-9xl font-bold text-blue-600">404</h1>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900">Page not found</h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Sorry, we couldn't find the page you're looking for.
                        </p>
                        <div className="mt-8">
                            <Link to="/">
                                <Button className="flex items-center space-x-2">
                                    <ArrowLeft size={16} />
                                    <span>Back to Home</span>
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFoundPage;