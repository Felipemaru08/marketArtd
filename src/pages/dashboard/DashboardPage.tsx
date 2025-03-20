import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    description: 'A vibrant digital artwork exploring color and motion',
    type: 'art',
    format: 'digital',
    category: 'Digital Art',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=800',
    seller: {
      id: '1',
      name: 'Alice Chen',
      email: 'alice@example.com',
      type: 'artist',
      followers: 245,
      fans: 120,
    },
    isAuction: true,
    auctionEndDate: '2024-03-25T15:00:00Z',
    currentBid: 350,
    minimumBid: 300,
  },
  {
    id: '2',
    title: 'The Silent Echo',
    description: 'A compelling novel about self-discovery',
    type: 'book',
    format: 'digital',
    category: 'Novel',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
    seller: {
      id: '2',
      name: 'James Wilson',
      email: 'james@example.com',
      type: 'artist',
      followers: 180,
      fans: 90,
    },
    isAuction: false,
  },
];

const artCategories = [
  'All Art',
  'Oil Painting',
  'Digital Art',
  'Sculpture',
  'Photography',
];

const bookCategories = [
  'All Books',
  'Novel',
  'Poetry',
  'Self-Help',
  'Science Fiction',
];

export const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAuctionsOnly, setShowAuctionsOnly] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesAuction = !showAuctionsOnly || product.isAuction;
    return matchesSearch && matchesCategory && matchesAuction;
  });

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Amazing Art & Books</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Explore unique pieces from talented creators</p>
      </div>

      <div className="mb-6 flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for artworks, books, or artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <optgroup label="Art Categories" className="dark:bg-gray-800">
              {artCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </optgroup>
            <optgroup label="Book Categories" className="dark:bg-gray-800">
              {bookCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </optgroup>
          </select>
          <Button
            variant={showAuctionsOnly ? 'primary' : 'outline'}
            onClick={() => setShowAuctionsOnly(!showAuctionsOnly)}
            className="flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Auctions Only</span>
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </motion.div>
    </div>
  );
};