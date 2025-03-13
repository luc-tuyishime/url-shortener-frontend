import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, LogOut, User } from 'lucide-react';

import { Button } from '../ui/button.tsx';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectIsAuthenticated, selectCurrentUser, logout } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApiSlice';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const user: any = useAppSelector(selectCurrentUser);
    const [logoutApi] = useLogoutMutation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
            // If API logout fails, still clear local state
            dispatch(logout());
            navigate('/');
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="text-2xl font-bold text-blue-600">URL Shortener</div>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="relative group">
                            <button
                                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors py-2"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span>Platform</span>
                                <ChevronDown size={16} />
                            </button>

                            {dropdownOpen && (
                                <motion.div
                                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ul className="py-1">
                                        <li>
                                            <Link
                                                to="/features"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Features
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/pricing"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Pricing
                                            </Link>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>

                        <Link
                            to="/pricing"
                            className="text-gray-700 hover:text-blue-600 transition-colors link-hover"
                        >
                            Pricing
                        </Link>

                        <div className="flex items-center space-x-1 text-gray-700">
                            <Globe size={16} />
                            <span>EN</span>
                        </div>
                    </nav>

                    {/* Auth Buttons or User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="relative">
                                <div
                                    className="flex items-center space-x-2 cursor-pointer"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="text-sm font-medium">{user?.username || 'User'}</span>
                                    <ChevronDown size={16} />
                                </div>

                                {dropdownOpen && (
                                    <motion.div
                                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ul className="py-1">
                                            <li>
                                                <Link
                                                    to="/dashboard"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <User size={16} className="mr-2" />
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        setDropdownOpen(false);
                                                        handleLogout();
                                                    }}
                                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                >
                                                    <LogOut size={16} className="mr-2" />
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" className="font-medium">
                                        Log in
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                        Sign up Free
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    className="md:hidden bg-white border-t"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-4 py-2 space-y-1">
                        <Link
                            to="/features"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            to="/pricing"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Pricing
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-100 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 text-base font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign up Free
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;