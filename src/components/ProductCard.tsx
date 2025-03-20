import { motion } from 'framer-motion';
import { Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-square">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        {product.isAuction && (
          <div className="absolute top-4 right-4 rounded-full bg-purple-600 px-3 py-1 text-sm text-white">
            Auction
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <div className="mt-4 flex items-center justify-between">
          {product.isAuction ? (
            <div className="flex items-center text-sm text-gray-700">
              <Clock size={16} className="mr-1" />
              <span>Current bid: ${product.currentBid}</span>
            </div>
          ) : (
            <div className="flex items-center text-sm text-gray-700">
              <DollarSign size={16} className="mr-1" />
              <span>${product.price}</span>
            </div>
          )}
          <Button 
            size="sm" 
            onClick={() => navigate(`/product/${product.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};