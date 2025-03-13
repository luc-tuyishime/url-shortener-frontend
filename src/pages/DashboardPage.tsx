import React from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon, BarChart2, Clock, TrendingUp } from 'lucide-react';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UrlForm from '../components/dashboard/UrlForm';
import UrlList from '../components/dashboard/UrlList';
import StatsCard from '../components/dashboard/StatsCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useGetUserStatsQuery } from '../features/urls/urlsApiSlice';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';

const DashboardPage: React.FC = () => {
    const user: any = useAppSelector(selectCurrentUser);
    const { data: stats, isLoading: statsLoading } = useGetUserStatsQuery();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-8">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">{user?.username} Dashboard </h1>
                        <p className="text-gray-600 mt-1">
                            Manage your shortened URLs and view analytics
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsLoading ? (
                            <div className="col-span-4 py-12 flex justify-center">
                                <LoadingSpinner size="lg" />
                            </div>
                        ) : (
                            <>
                                <StatsCard
                                    title="Total URLs"
                                    value={stats?.totalUrls || 0}
                                    icon={<LinkIcon size={18} />}
                                    color="blue"
                                    delay={0.1}
                                />
                                <StatsCard
                                    title="Total Clicks"
                                    value={stats?.totalClicks || 0}
                                    icon={<TrendingUp size={18} />}
                                    color="green"
                                    delay={0.2}
                                />
                                <StatsCard
                                    title="Avg. Clicks/URL"
                                    value={stats?.avgClicksPerUrl || "0"}
                                    icon={<BarChart2 size={18} />}
                                    color="purple"
                                    delay={0.3}
                                />
                                <StatsCard
                                    title="Active Links"
                                    value={stats?.totalUrls || 0}
                                    icon={<Clock size={18} />}
                                    color="orange"
                                    delay={0.4}
                                />
                            </>
                        )}
                    </div>

                    <div className="mb-8">
                        <UrlForm />
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Your URLs</h2>
                        <Link
                            to="/analytics"
                            className="text-sm text-blue-600 hover:text-blue-800 transition-colors link-hover"
                        >
                            View All Analytics
                        </Link>
                    </div>

                    <UrlList />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default DashboardPage;