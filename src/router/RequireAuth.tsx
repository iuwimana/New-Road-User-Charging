// components/RequireAuth.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../services/authService';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const user = auth.getCurrentUser();

  if (!user) {
    // Redirect unauthenticated users to sign-in
    return <Navigate to="/auth/boxed-signin" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
