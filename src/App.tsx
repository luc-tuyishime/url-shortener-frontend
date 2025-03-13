import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import AppRoutes from './routes';
import {  useAppSelector } from './app/hooks';
import { selectIsAuthenticated } from './features/auth/authSlice';
import { useGetProfileQuery } from './features/auth/authApiSlice';
import './App.css';

// App component with Redux provider
const App: React.FC = () => {
    return (
        <Provider store={store}>

         <AppWithAuth/>
        </Provider>
    );
};


const AppWithAuth: React.FC = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const { refetch } = useGetProfileQuery(undefined, {
        skip: !isAuthenticated,
    });

    useEffect(() => {
        if (isAuthenticated) {
            refetch();
        }
    }, [isAuthenticated, refetch]);

    return <AppRoutes />;
};

export default App;