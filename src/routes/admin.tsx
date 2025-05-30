import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Customers from '../pages/admin/Customers';
import Sales from '../pages/admin/Sales';
import Settings from '../pages/admin/Settings';
import Books from '../pages/admin/Books';

const AdminRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Check if user is authenticated and is admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes; 