import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [activeTab, setActiveTab] = useState<'link' | 'qr'>('link');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="bg-blue-950 text-white py-20 relative overflow-hidden">
                    {/* Background decoration elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-blue-300"></div>
                        <div className="absolute bottom-10 right-40 w-40 h-40 rounded-full bg-blue-300"></div>
                        <div className="absolute top-40 right-10 w-16 h-16 rounded-full bg-blue-300"></div>
                        <div className="absolute bottom-32 left-32 w-32 h-32 rounded-full bg-blue-300"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-center mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Build stronger digital connections
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Use our URL shortener to engage your audience and connect them to the right information. Track everything inside our platform.
                        </motion.p>

                        {/* URL Shortener Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-3xl mx-auto"
                        >
                            <Card className="shadow-xl border-0">
                                <div className="p-1">
                                    <div className="flex border-b mb-6">
                                        <button
                                            className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'link' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                                            onClick={() => setActiveTab('link')}
                                        >
                                            <span>Short link</span>
                                        </button>
                                        <button
                                            className={`flex items-center gap-2 px-6 py-4 ${activeTab === 'qr' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-gray-500'}`}
                                            onClick={() => setActiveTab('qr')}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 3H3V9H9V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M21 3H15V9H21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9 15H3V21H9V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M21 15H15V21H21V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>QR Code</span>
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-16">Sign up for free. Your free plan includes:</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                className="p-6 rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 6L20 6" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M3.80002 5.79999L4.60002 6.59999L7.20002 3.99999" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 12L20 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M3.80002 11.8L4.60002 12.6L7.20002 10" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9 18L20 18" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M3.80002 17.8L4.60002 18.6L7.20002 16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">5 short links/month</h3>
                                <p className="text-gray-600">Create up to 5 shortened URLs every month with our free plan.</p>
                            </motion.div>

                            <motion.div
                                className="p-6 rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" stroke="#2563EB" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" stroke="#2563EB" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 13H12" stroke="#2563EB" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M8 17H16" stroke="#2563EB" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">3 custom back-halves/month</h3>
                                <p className="text-gray-600">Customize your URLs with memorable keywords for better branding.</p>
                            </motion.div>

                            <motion.div
                                className="p-6 rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 11V16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 7V16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12 13V16" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M22 9V15C22 19 20 21 16 21H8C4 21 2 19 2 15V9C2 5 4 3 8 3H16C20 3 22 5 22 9Z" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2">Unlimited link clicks</h3>
                                <p className="text-gray-600">Track as many clicks as you want, with no limits on traffic.</p>
                            </motion.div>
                        </div>

                        <div className="text-center mt-12">
                            <Button
                                onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/register')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium"
                            >
                                {isAuthenticated ? 'Go to Dashboard' : 'Sign up Free'}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;