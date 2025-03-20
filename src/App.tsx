import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { ProductDetailsPage } from './pages/product/ProductDetailsPage';
import { Sidebar } from './components/layout/Sidebar';
import { useTheme } from './hooks/useTheme';
// import { useAuth } from './hooks/useAuth';
import { LandingPage } from './pages/landingPage/LandingPage';
import { NavBar } from './components/navBar/NavBar';

function App() {
  useTheme();
  //const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const locationRef: boolean = window.location.pathname === '/';

  return (
    <Router>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        <AnimatePresence mode='wait'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <NavBar />
                  <Outlet />
                </>
              }
            >
              <Route index element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
        {isAuthenticated && !locationRef && (
          <div className='flex min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white'>
            <Sidebar />
            <main className='flex-1'>
              <Routes>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/product/:id' element={<ProductDetailsPage />} />
                {/* Add other authenticated routes here */}
              </Routes>
            </main>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
