import React from 'react';
import OAuthCallback from '../components/auth/OAuthCallback';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const OAuthCallbackPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <OAuthCallback />
            </main>
            <Footer />
        </div>
    );
};

export default OAuthCallbackPage;