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

 
