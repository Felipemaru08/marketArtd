import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
export const NavBar = () => {
  return (
    <nav className='bg-white shadow dark:bg-gray-800'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Palette className='h-8 w-8 text-purple-600 dark:text-purple-400' />
            </motion.div>
            <span className='ml-2 text-xl font-bold text-gray-900 dark:text-white'>
              ArtMarket
            </span>
          </div>
          <div className='flex items-center space-x-4'>
            <a
              href='/login'
              className='text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            >
              Login
            </a>
            <a
              href='/signup'
              className='rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
