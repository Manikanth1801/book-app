import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AdminRoutes from './admin';
import Auth from '../pages/auth/Auth';
import Home from '../pages/Home';
import Cart from '../pages/Cart';

// Lazy load pages for better performance
const Books = lazy(() => import('../pages/Books'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const TrackOrder = lazy(() => import('../pages/TrackOrder'));
const Account = lazy(() => import('../pages/account'));
const Checkout = lazy(() => import('../pages/Checkout'));
const BookDetail = lazy(() => import('../pages/BookDetail'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
const Category = lazy(() => import('../pages/Category'));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Protected Routes */}
        <Route
          path="/track-order"
          element={
//            <ProtectedRoute>
              <TrackOrder />
//            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 