import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuthStatus, selectAuthError, clearError, setCredentials } from '../features/auth/authSlice';
import GoogleAuthButton from '../components/auth/GoogleAuthButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);
    const authError: any = useAppSelector(selectAuthError);

    console.log('auth ==>', authStatus);

    const [login, { isLoading }] = useLoginMutation();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Clear any auth errors when component mounts
        dispatch(clearError());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await login(formData).unwrap();
            dispatch(setCredentials(result));
            navigate('/dashboard');
        } catch (error) {
            // Error is handled in the authSlice
            console.error('Login failed:', error);
        }
    };

    // @ts-ignore
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="shadow-lg border-gray-200">
                            <CardHeader className="text-center pb-2">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Welcome back
                                </CardTitle>
                                <CardDescription>
                                    Sign in to manage your shortened URLs
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {authError && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                                        {authError}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                            Username or Email
                                        </label>
                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                            className="w-full"
                                            placeholder="Enter your username or email"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                className="w-full pr-10"
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={16} className="text-gray-400" />
                                                ) : (
                                                    <Eye size={16} className="text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center">
                        <LoadingSpinner size="sm" color="white" className="mr-2" />
                        Signing in...
                      </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                        Sign in <ArrowRight size={16} className="ml-2" />
                      </span>
                                        )}
                                    </Button>
                                </form>

                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <GoogleAuthButton />
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="text-center pt-0">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="font-medium text-blue-600 hover:underline">
                                        Sign up free
                                    </Link>
                                </p>
                            </CardFooter>
                        </Card>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;