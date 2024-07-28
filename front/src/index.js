import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import Login from './pages/Login';
import Client from './pages/Client';
import Trainer from './pages/Trainer';
import Admin from './pages/Admin';
import AssignTrainer from './pages/AssignTrainer'
import { FormProvider } from './components/FormContext';
import AdminForm from './pages/AdminForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {path: '/',element: <Login />}, 
  {path: '/client',element: <Client />}, 
  {path: '/admin',element: <Admin />},
  {path: '/trainer',element: <Trainer />}, 
  { path: '/assign-trainer', element: <AssignTrainer /> },
  { path: '/form', element: <FormProvider><AdminForm /></FormProvider> }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
