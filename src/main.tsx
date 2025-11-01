


import React, { Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './tailwind.css';
import './i18n';
import { RouterProvider,useNavigate  } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from './services/authService';
import authuser from './services/security/authuserServices';
import store from './store/index';
import router from './router/index';
import routermain from './router/indexmain';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// main.jsx or index.jsx
import 'bootstrap-icons/font/bootstrap-icons.css';

import { initializeAuth } from './store/authSlice';

const App = () => {

    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (authuser.isTokenExpired()) {
      localStorage.removeItem('token'); // optional, but good practice
         // redirect to login
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = auth.getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    // Simulate async check (replace with real async call if needed)
    const authCheckTimeout = setTimeout(checkAuth, 0);
    
    return () => clearTimeout(authCheckTimeout);
  }, []);

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={isAuthenticated ? router : routermain} />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense 
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="animate-pulse text-xl">Loading resources...</div>
        </div>
      }
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>
);


{/**  older one

import React, { Suspense,useState,useEffect } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';
import routermain from './router/indexmain';
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

//usermanagement
import auth from './services/authService'
// Toast messaging
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
         { auth.getCurrentUser()&&(
        <Suspense>
        <ToastContainer />
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
        )}
        {! auth.getCurrentUser()&&(
            
        <Suspense>
        <ToastContainer />
            <Provider store={store}>
                <RouterProvider router={routermain} />
            </Provider>
        </Suspense>
        
    )}
    </React.StrictMode>

    
);

*/} 
