import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Check, X } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuthStatus, selectAuthError, clearError } from '../features/auth/authSlice';
import GoogleAuthButton from '../components/auth/GoogleAuthButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector(selectAuthStatus);
    const authError: any = useAppSelector(selectAuthError);


    console.log('auth ==>', authStatus);

    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState<any>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    useEffect(() => {
        // Clear any auth errors when component mounts
        dispatch(clearError());
    }, [dispatch]);

    const validatePassword = (password: string): boolean => {
        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

        return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    };

    const validateForm = (): boolean => {
        const errors: {[key: string]: string} = {};

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            errors.password = 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: value
        }));

        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, ...registrationData } = formData;
            await register(registrationData).unwrap();

            setRegistrationSuccess(true);

            setFormData({
                username: '',
                email: '',
                password: ''
            });

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            // Error is handled in the authSlice
            console.error('Registration failed:', error);
        }
    };

    // Password strength indicators
    const getPasswordStrengthIndicators = () => {
        const hasMinLength = formData.password.length >= 8;
        const hasUppercase = /[A-Z]/.test(formData.password);
        const hasLowercase = /[a-z]/.test(formData.password);
        const hasNumber = /[0-9]/.test(formData.password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password);

        return { hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar };
    };

    const passwordStrength = getPasswordStrengthIndicators();

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
                                    Create your account
                                </CardTitle>
                                <CardDescription>
                                    Sign up to start shortening your URLs
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                {authError && (
                                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                                        {authError}
                                    </div>
                                )}

                                {registrationSuccess && (
                                    <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-md border border-green-200">
                                        Registration successful! Redirecting to login...
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <Input
                                            id="username"
                                            name="username"
                                            type="text"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className={`w-full ${validationErrors.username ? 'border-red-500' : ''}`}
                                            placeholder="Choose a username"
                                        />
                                        {validationErrors.username && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.username}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full ${validationErrors.email ? 'border-red-500' : ''}`}
                                            placeholder="Enter your email"
                                        />
                                        {validationErrors.email && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={handleChange}
                                                className={`w-full pr-10 ${validationErrors.password ? 'border-red-500' : ''}`}
                                                placeholder="Create a strong password"
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
                                        {formData.password && (
                                            <div className="mt-2">
                                                <div className="text-xs text-gray-500 mb-1">Password must contain:</div>
                                                <div className="grid grid-cols-2 gap-1">
                                                    <div className="flex items-center text-xs">
                                                        {passwordStrength.hasMinLength ? (
                                                            <Check size={12} className="text-green-500 mr-1" />
                                                        ) : (
                                                            <X size={12} className="text-gray-400 mr-1" />
                                                        )}
                                                        <span className={passwordStrength.hasMinLength ? 'text-green-600' : 'text-gray-500'}>
                              At least 8 characters
                            </span>
                                                    </div>
                                                    <div className="flex items-center text-xs">
                                                        {passwordStrength.hasUppercase ? (
                                                            <Check size={12} className="text-green-500 mr-1" />
                                                        ) : (
                                                            <X size={12} className="text-gray-400 mr-1" />
                                                        )}
                                                        <span className={passwordStrength.hasUppercase ? 'text-green-600' : 'text-gray-500'}>
                              Uppercase letter
                            </span>
                                                    </div>
                                                    <div className="flex items-center text-xs">
                                                        {passwordStrength.hasLowercase ? (
                                                            <Check size={12} className="text-green-500 mr-1" />
                                                        ) : (
                                                            <X size={12} className="text-gray-400 mr-1" />
                                                        )}
                                                        <span className={passwordStrength.hasLowercase ? 'text-green-600' : 'text-gray-500'}>
                              Lowercase letter
                            </span>
                                                    </div>
                                                    <div className="flex items-center text-xs">
                                                        {passwordStrength.hasNumber ? (
                                                            <Check size={12} className="text-green-500 mr-1" />
                                                        ) : (
                                                            <X size={12} className="text-gray-400 mr-1" />
                                                        )}
                                                        <span className={passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-500'}>
                              Number
                            </span>
                                                    </div>
                                                    <div className="flex items-center text-xs">
                                                        {passwordStrength.hasSpecialChar ? (
                                                            <Check size={12} className="text-green-500 mr-1" />
                                                        ) : (
                                                            <X size={12} className="text-gray-400 mr-1" />
                                                        )}
                                                        <span className={passwordStrength.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}>
                              Special character
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {validationErrors.password && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`w-full pr-10 ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
                                                placeholder="Confirm your password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={16} className="text-gray-400" />
                                                ) : (
                                                    <Eye size={16} className="text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {validationErrors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-600">{validationErrors.confirmPassword}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        disabled={isLoading || registrationSuccess}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center">
                        <LoadingSpinner size="sm" color="white" className="mr-2" />
                        Creating account...
                      </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                        Create account <ArrowRight size={16} className="ml-2" />
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
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                                        Sign in
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

export default RegisterPage;