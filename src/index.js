import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ProfilePage from './pages/profile';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
//comp imports
import App from './App';
import ChangePassword from './pages/changePassword';


let router = createBrowserRouter([
  {
      path: '/',
      Component: App,
  },
  {
    path: '/profile',
    Component: ProfilePage,
  },
  {
    path: '/change-password',
    Component: ChangePassword,
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
