import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Stilovi
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Stranice — korisnici
import HomeScreen     from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import ProductScreen  from './screens/ProductScreen';
import LoginScreen    from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BookingScreen  from './screens/BookingScreen';
import ProfileScreen  from './screens/ProfileScreen';

// Stranice — admin
import AdminLoginScreen     from './screens/admin/AdminLoginScreen';
import AdminDashboardScreen from './screens/admin/AdminDashboardScreen';
import AdminServicesScreen  from './screens/admin/AdminServicesScreen';
import AdminUsersScreen     from './screens/admin/AdminUsersScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Korisničke rute */}
      <Route index element={<HomeScreen />} />
      <Route path="services"    element={<ServicesScreen />} />
      <Route path="product/:id" element={<ProductScreen />} />
      <Route path="login"       element={<LoginScreen />} />
      <Route path="register"    element={<RegisterScreen />} />
      <Route path="booking"     element={<BookingScreen />} />
      <Route path="profile"     element={<ProfileScreen />} />

      {/* Admin rute */}
      <Route path="admin/login"     element={<AdminLoginScreen />} />
      <Route path="admin/dashboard" element={<AdminDashboardScreen />} />
      <Route path="admin/services"  element={<AdminServicesScreen />} />
      <Route path="admin/users"     element={<AdminUsersScreen />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();