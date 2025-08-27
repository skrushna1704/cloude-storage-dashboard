import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Layout } from './components/common/Layout';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { NotificationToast } from './components/common/NotificationToast';
import { ROUTES } from './constants/routes';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';

// Lazy load pages for better performance
const Buckets = React.lazy(() => import('./pages/Buckets'));
const BucketDetail = React.lazy(() => import('./pages/BucketDetail'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Billing = React.lazy(() => import('./pages/Billing'));
const NotFound = React.lazy(() => import('./pages/NotFound'));


const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <div className="app">
              <NotificationToast />
              <Layout>
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Default redirect to buckets */}
                    <Route path="/" element={<Navigate to={ROUTES.BUCKETS} replace />} />
                    
                    {/* Main buckets page */}
                    <Route path={ROUTES.BUCKETS} element={<Buckets />} />
                    
                    {/* Individual bucket detail with file explorer */}
                    <Route path={ROUTES.BUCKET_DETAIL} element={<BucketDetail />} />
                    
                    {/* Analytics and monitoring page (optional feature) */}
                    <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
                    
                    {/* Billing page */}
                    <Route path={ROUTES.BILLING} element={<Billing />} />
                    
                    {/* 404 page for unmatched routes */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </div>
          </Router>
        </ChakraProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
