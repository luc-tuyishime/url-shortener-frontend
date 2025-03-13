import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Link as LinkIcon, Clock, TrendingUp } from 'lucide-react';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useGetUrlStatsQuery, useGetUserStatsQuery } from '../features/urls/urlsApiSlice';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { formatDate, formatNumber } from '../utils/formatters';

const AnalyticsPage: React.FC = () => {
    const { shortCode } = useParams<{ shortCode: string }>();
    const user = useAppSelector(selectCurrentUser);
    console.log('user ==>', user);

    // Fetch specific URL stats if shortCode is provided, otherwise fetch user stats
    const { data: urlStats, isLoading: isUrlStatsLoading } = useGetUrlStatsQuery(
        shortCode!,
        { skip: !shortCode }
    );

    const { data: userStats, isLoading: isUserStatsLoading } = useGetUserStatsQuery(
        undefined,
        { skip: !!shortCode }
    );

    // Loading state
    if (shortCode && isUrlStatsLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </main>
                <Footer />
            </div>
        );
    }

    if (!shortCode && isUserStatsLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <LoadingSpinner size="lg" />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs */}
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                        <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                            Dashboard
                        </Link>
                        <ChevronRight size={16} className="mx-2" />
                        <Link to="/analytics" className="hover:text-blue-600 transition-colors">
                            Analytics
                        </Link>
                        {shortCode && (
                            <>
                                <ChevronRight size={16} className="mx-2" />
                                <span className="text-gray-900 font-medium">URL Details</span>
                            </>
                        )}
                    </div>

                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {shortCode ? 'URL Analytics' : 'Analytics Overview'}
                            </h1>
                            <p className="text-gray-600 mt-1">
                                {shortCode
                                    ? 'Detailed statistics for this shortened URL'
                                    : 'Performance metrics across all your shortened URLs'
                                }
                            </p>
                        </div>
                        {shortCode && (
                            <Link to="/analytics">
                                <Button variant="outline" className="flex items-center space-x-2">
                                    <ArrowLeft size={16} />
                                    <span>Back to Overview</span>
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* URL-specific analytics */}
                    {shortCode && urlStats && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="mb-8">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 mb-1">{urlStats.short_url}</h2>
                                            <a
                                                href={urlStats.long_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                                            >
                                                {urlStats.long_url}
                                            </a>
                                        </div>
                                        <div className="mt-4 md:mt-0">
                                            <span className="text-sm text-gray-500">Created: {formatDate(urlStats.created_at)}</span>
                                            {urlStats.expires_at && (
                                                <div className="text-sm text-gray-500">
                                                    Expires: {formatDate(urlStats.expires_at)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                <TrendingUp size={20} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{formatNumber(urlStats.clicks)}</h3>
                                                <p className="text-sm text-gray-500">Total Clicks</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                <LinkIcon size={20} className="text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{urlStats.short_code}</h3>
                                                <p className="text-sm text-gray-500">Short Code</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                <Clock size={20} className="text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{formatDate(urlStats.created_at)}</h3>
                                                <p className="text-sm text-gray-500">Creation Date</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Placeholder for charts and detailed analytics */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Click Activity</h3>
                                    <div className="bg-gray-100 h-64 rounded-md flex items-center justify-center">
                                        <p className="text-gray-500">
                                            Historical click data visualization will be displayed here
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Overall analytics */}
                    {!shortCode && userStats && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                                <LinkIcon size={20} className="text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{formatNumber(userStats.totalUrls)}</h3>
                                                <p className="text-sm text-gray-500">Total URLs</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                                                <TrendingUp size={20} className="text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{formatNumber(userStats.totalClicks)}</h3>
                                                <p className="text-sm text-gray-500">Total Clicks</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-orange-600"
                                                >
                                                    <path d="M12 2v20"/>
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">{userStats.avgClicksPerUrl}</h3>
                                                <p className="text-sm text-gray-500">Avg. Clicks/URL</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-purple-600"
                                                >
                                                    <path d="M11 12H3"/>
                                                    <path d="M16 6H3"/>
                                                    <path d="M16 18H3"/>
                                                    <path d="M18 6l3 3-3 3"/>
                                                    <path d="M21 12l-3 3-3-3"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    {userStats.mostClickedUrl
                                                        ? formatNumber(userStats.mostClickedUrl.clicks)
                                                        : "0"
                                                    }
                                                </h3>
                                                <p className="text-sm text-gray-500">Best Performing URL</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Top Performing URLs */}
                            <Card className="mb-8">
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing URLs</h3>

                                    {userStats.mostClickedUrl ? (
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                                <div className="mb-2 sm:mb-0">
                                                    <p className="truncate font-medium">
                                                        {userStats.mostClickedUrl.shortCode}
                                                    </p>
                                                    <a
                                                        href={userStats.mostClickedUrl.longUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-gray-500 hover:text-blue-600 truncate block"
                                                    >
                                                        {userStats.mostClickedUrl.longUrl}
                                                    </a>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-green-600 font-medium">
                                                        {formatNumber(userStats.mostClickedUrl.clicks)} clicks
                                                    </div>
                                                    <Link
                                                        to={`/analytics/${userStats.mostClickedUrl.shortCode}`}
                                                        className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                    >
                                                        Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            No clicks recorded yet
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Recent Activity */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>

                                    {userStats.mostRecentUrl ? (
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                                                <div className="mb-2 sm:mb-0">
                                                    <p className="truncate font-medium">
                                                        {userStats.mostRecentUrl.short_code}
                                                    </p>
                                                    <a
                                                        href={userStats.mostRecentUrl.long_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-gray-500 hover:text-blue-600 truncate block"
                                                    >
                                                        {userStats.mostRecentUrl.long_url}
                                                    </a>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="text-gray-600 font-medium">
                                                        Created: {formatDate(userStats.mostRecentUrl.created_at)}
                                                    </div>
                                                    <Link
                                                        to={`/analytics/${userStats.mostRecentUrl.short_code}`}
                                                        className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                    >
                                                        Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            No URLs created yet
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AnalyticsPage;