import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CoursesOverviewPage } from './components/CoursesOverviewPage';
import { BrandPage } from './components/BrandPage';
import { CoursePage } from './components/CoursePage';
import { BrowseBatchesPage } from './components/BrowseBatchesPage';
import { BlogsPage } from './components/BlogsPage';
import { AboutPage } from './components/AboutPage';
import { FaqPage } from './components/FaqPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
import { PaymentPage } from './components/PaymentPage';
import { OrderSuccessPage } from './components/OrderSuccessPage';
import { StudentProfilePage } from './components/StudentProfilePage';
import { AdminCreateCoursePage } from './components/AdminCreateCoursePage';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'courses-overview':
        return <CoursesOverviewPage />;
      case 'brand':
        return <BrandPage />;
      case 'course':
        return <CoursePage />;
      case 'browse':
        return <BrowseBatchesPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'about':
        return <AboutPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'cart':
        return <CartPage />;
      case 'payment':
        return <PaymentPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'student-profile':
        return <StudentProfilePage />;
      case 'admin-create-course':
        return <AdminCreateCoursePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Bar Header with strict menu navigation and cart icon */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Corporate Accreditation Footer */}
      <Footer />

      {/* Student & Faculty Login / Register Modal */}
      <AuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
