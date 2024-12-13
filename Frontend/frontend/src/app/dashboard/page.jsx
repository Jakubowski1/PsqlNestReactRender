'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container">
        <h1>Dashboard</h1>
        <p>Welcome, {user.name}!</p>
        <p>Your role: {user.role}</p>
      </div>
    </ProtectedRoute>
  );
}
