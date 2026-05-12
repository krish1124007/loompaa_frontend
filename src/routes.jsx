import { createBrowserRouter } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';
import RequireAuth from './components/admin/RequireAuth.jsx';

import Home from './pages/public/Home.jsx';
import About from './pages/public/About.jsx';
import Services from './pages/public/Services.jsx';
import ServiceDetail from './pages/public/ServiceDetail.jsx';
import Blog from './pages/public/Blog.jsx';
import BlogPost from './pages/public/BlogPost.jsx';
import Contact from './pages/public/Contact.jsx';
import Newsletter from './pages/public/Newsletter.jsx';
import Pricing from './pages/public/Pricing.jsx';
import NotFound from './pages/public/NotFound.jsx';

import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ServicesList from './pages/admin/ServicesList.jsx';
import ServiceEdit from './pages/admin/ServiceEdit.jsx';
import BlogList from './pages/admin/BlogList.jsx';
import BlogEdit from './pages/admin/BlogEdit.jsx';
import Contacts from './pages/admin/Contacts.jsx';
import ContactDetail from './pages/admin/ContactDetail.jsx';
import Subscribers from './pages/admin/Subscribers.jsx';
import Settings from './pages/admin/Settings.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
      { path: 'newsletter', element: <Newsletter /> },
      { path: 'pricing', element: <Pricing /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '/admin/login', element: <Login /> },
  {
    path: '/admin',
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'services', element: <ServicesList /> },
      { path: 'services/new', element: <ServiceEdit /> },
      { path: 'services/:id', element: <ServiceEdit /> },
      { path: 'posts', element: <BlogList /> },
      { path: 'posts/new', element: <BlogEdit /> },
      { path: 'posts/:id', element: <BlogEdit /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'contacts/:id', element: <ContactDetail /> },
      { path: 'subscribers', element: <Subscribers /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);
