import { motion } from 'framer-motion';

export const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'
    >
      <div className='text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl'>
          <span className='block'>Discover Unique Art</span>
          <span className='block text-purple-600 dark:text-purple-400'>
            and Digital Books
          </span>
        </h1>
        <p className='mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl'>
          Join our community of artists, writers, and collectors. Buy, sell, and
          auction your favorite pieces.
        </p>
        <div className='mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8'>
          <div className='rounded-md shadow'>
            <a
              href='/explore'
              className='flex w-full items-center justify-center rounded-md border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 md:px-10 md:py-4 md:text-lg'
            >
              Explore as Guest
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
