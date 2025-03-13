import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { Card } from '../ui/card.tsx';
import { formatNumber } from '../../utils/formatters';

interface StatsCardProps {
    title: string;
    value: number | string;
    previousValue?: number | string;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    linkTo?: string;
    color?: 'blue' | 'green' | 'orange' | 'purple';
    delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
                                                 title,
                                                 value,
                                                 previousValue,
                                                 icon,
                                                 trend = 'neutral',
                                                 linkTo,
                                                 color = 'blue',
                                                 delay = 0
                                             }) => {
    let percentChange: number | null = null;
    if (typeof previousValue === 'number' && typeof value === 'number' && previousValue !== 0) {
        percentChange = ((value - previousValue) / previousValue) * 100;
    }

    const trendColors = {
        up: 'text-green-600',
        down: 'text-red-600',
        neutral: 'text-gray-600'
    };

    const bgColors = {
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        orange: 'bg-orange-100',
        purple: 'bg-purple-100'
    };

    const iconColors = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        orange: 'text-orange-600',
        purple: 'text-purple-600'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <Card className="p-6 h-full">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
                        <div className="text-2xl font-bold">
                            {typeof value === 'number' ? formatNumber(value) : value}
                        </div>

                        {percentChange !== null && (
                            <div className={`text-xs mt-1 ${trendColors[trend]}`}>
                                {percentChange > 0 && '+'}
                                {percentChange.toFixed(1)}% from last period
                            </div>
                        )}
                    </div>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColors[color]}`}>
                        <div className={iconColors[color]}>
                            {icon}
                        </div>
                    </div>
                </div>

                {linkTo && (
                    <div className="mt-4 pt-4 border-t">
                        <Link
                            to={linkTo}
                            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            View details
                            <ArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                )}
            </Card>
        </motion.div>
    );
};

export default StatsCard;