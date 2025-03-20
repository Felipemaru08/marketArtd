import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Compass,
  ListOrdered,
  Heart,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Compass, label: 'Explore', path: '/explore' },
  { icon: ListOrdered, label: 'My Listings', path: '/my-listings' },
  { icon: Heart, label: 'Favorites', path: '/favorites' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const handleLogout = () => {
    setAuthenticated(false);
    navigate('/');
  };

  const NavLink = ({ icon: Icon, label, path }: typeof menuItems[0]) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={clsx(
          'flex items-center space-x-3 rounded-lg px-4 py-2.5 transition-colors',
          {
            'bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300': isActive,
            'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800': !isActive,
          }
        )}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800 lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={clsx(
              'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg dark:bg-gray-900',
              'flex flex-col overflow-y-auto border-r border-gray-200 p-4 dark:border-gray-700',
              'lg:relative lg:block'
            )}
          >
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-purple-100 p-2 dark:bg-purple-900"
                >
                  <Home className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </motion.div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">ArtMarket</span>
              </Link>
              <ThemeToggle />
            </div>

            <nav className="mt-8 space-y-1">
              {menuItems.map((item) => (
                <NavLink key={item.path} {...item} />
              ))}
            </nav>

            <div className="mt-auto pt-8">
              <button
                className="flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={handleLogout}
              >
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};