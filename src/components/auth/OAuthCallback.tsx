import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppDispatch } from '../../app/hooks';
import { setCredentials } from '../../features/auth/authSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const OAuthCallback: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const processOAuthCallback = async () => {
            try {
                const accessToken = searchParams.get('access_token');
                const refreshToken = searchParams.get('refresh_token');
                const error = searchParams.get('error');

                if (error) {
                    setStatus('error');
                    setErrorMessage(error);
                    return;
                }

                if (!accessToken || !refreshToken) {
                    setStatus('error');
                    setErrorMessage('Authentication failed. Missing tokens in the callback URL.');
                    return;
                }

                dispatch(setCredentials({
                    accessToken,
                    refreshToken
                }));

                setStatus('success');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } catch (error) {
                setStatus('error');
                setErrorMessage('An unexpected error occurred during authentication.');
                console.error('OAuth callback error:', error);
            }
        };

        processOAuthCallback();
    }, [searchParams, dispatch, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    {status === 'loading' && (
                        <>
                            <LoadingSpinner size="lg" className="mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Completing Authentication...</h2>
                            <p className="text-gray-600">
                                Please wait while we finish setting up your account.
                            </p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Successful!</h2>
                            <p className="text-gray-600">
                                You're being redirected to your dashboard...
                            </p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-red-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Failed</h2>
                            <p className="text-red-600 mb-4">
                                {errorMessage}
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                            >
                                Return to Login
                            </button>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default OAuthCallback;