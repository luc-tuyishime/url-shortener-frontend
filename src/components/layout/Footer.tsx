import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Social Links */}
                    <div className="col-span-1">
                        <Link to="/" className="inline-block">
                            <div className="text-xl font-bold text-blue-600">URL Shortener</div>
                        </Link>
                        <p className="mt-4 text-gray-600">
                            Connect and engage with your audience using our powerful URL shortening platform.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Products
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    URL Shortener
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    QR Codes
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Link-in-bio
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Link Management
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Resources
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/developers" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Developers
                                </Link>
                            </li>
                            <li>
                                <Link to="/support" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Support
                                </Link>
                            </li>
                            <li>
                                <Link to="/docs" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="col-span-1">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link to="/partners" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Partners
                                </Link>
                            </li>
                            <li>
                                <Link to="/press" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex space-x-6 mb-4 md:mb-0">
                            <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/cookies" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                        <p className="text-sm text-gray-600">
                            &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;