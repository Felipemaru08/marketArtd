import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Rating } from '../../components/ui/Rating';
import { ReviewForm } from '../../components/product/ReviewForm';
import { RelatedProducts } from '../../components/product/RelatedProducts';
import { Product } from '../../types';

// Using the mock data from DashboardPage for demonstration
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    description:
      'A vibrant digital artwork exploring color and motion. This piece combines dynamic shapes and bold colors to create a sense of movement and energy. The artist uses digital techniques to layer various elements, resulting in a complex and engaging composition that draws viewers into its depths.',
    type: 'art',
    format: 'digital',
    category: 'Digital Art',
    price: 299,
    imageUrl:
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=800',
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
  // ... other products from DashboardPage
];

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    rating: 5,
    comment:
      'Absolutely stunning piece! The colors are even more vibrant in person.',
    userName: 'Sarah Johnson',
    date: '2024-03-15',
  },
  {
    id: '2',
    rating: 4,
    comment: 'Beautiful artwork, great communication from the artist.',
    userName: 'Michael Brown',
    date: '2024-03-10',
  },
];

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-lg text-gray-600'>Product not found</p>
      </div>
    );
  }

  const handleBid = async () => {
    setIsLoading(true);
    // TODO: Implement bid logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleBuyNow = async () => {
    setIsLoading(true);
    // TODO: Implement purchase logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const averageRating =
    MOCK_REVIEWS.reduce((acc, review) => acc + review.rating, 0) /
    MOCK_REVIEWS.length;

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className='overflow-hidden rounded-lg bg-white shadow-lg'
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className='h-full w-full object-cover'
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='space-y-6'
          >
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                {product.title}
              </h1>
              <p className='mt-2 text-sm text-gray-500'>
                {product.type === 'art' ? 'Artwork' : 'Book'} • {product.format}{' '}
                • {product.category}
              </p>
            </div>

            {/* Seller Info */}
            <div className='flex items-center space-x-4'>
              <div className='h-12 w-12 overflow-hidden rounded-full bg-gray-200'>
                <User className='h-full w-full p-2 text-gray-500' />
              </div>
              <div>
                <p className='font-medium text-gray-900'>
                  {product.seller.name}
                </p>
                <div className='flex items-center space-x-4 text-sm text-gray-500'>
                  <span>{product.seller.followers} followers</span>
                  <span>{product.seller.fans} fans</span>
                </div>
              </div>
              <Button
                variant='outline'
                onClick={() => navigate(`/profile/${product.seller.id}`)}
              >
                View Profile
              </Button>
            </div>

            {/* Description */}
            <p className='text-gray-700'>{product.description}</p>

            {/* Price/Auction Info */}
            <div className='rounded-lg bg-gray-100 p-6'>
              {product.isAuction ? (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-gray-600'>Current Bid</p>
                      <p className='text-2xl font-bold text-gray-900'>
                        ${product.currentBid}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Time Remaining</p>
                      <div className='flex items-center text-gray-900'>
                        <Clock size={16} className='mr-1' />
                        <span>2d 14h 33m</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex space-x-4'>
                    <Input
                      type='number'
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Min bid: $${product.minimumBid}`}
                      className='flex-1'
                    />
                    <Button
                      onClick={handleBid}
                      isLoading={isLoading}
                      disabled={
                        !bidAmount ||
                        Number(bidAmount) <= (product.currentBid || 0)
                      }
                    >
                      Place Bid
                    </Button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-gray-600'>Price</p>
                    <p className='text-2xl font-bold text-gray-900'>
                      ${product.price}
                    </p>
                  </div>
                  <Button
                    size='lg'
                    onClick={handleBuyNow}
                    isLoading={isLoading}
                  >
                    Buy Now
                  </Button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className='flex space-x-4'>
              <Button
                variant='outline'
                className='flex items-center space-x-2'
                onClick={() => {
                  /* TODO: Implement save */
                }}
              >
                <Heart size={16} />
                <span>Save to Favorites</span>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <div className='mt-16'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-900'>
              Reviews
              <span className='ml-2 text-sm font-normal text-gray-500'>
                ({MOCK_REVIEWS.length})
              </span>
            </h2>
            <div className='flex items-center space-x-2'>
              <Rating value={averageRating} />
              <span className='text-sm text-gray-500'>
                {averageRating.toFixed(1)} out of 5
              </span>
            </div>
          </div>

          <div className='mt-8 space-y-8'>
            {MOCK_REVIEWS.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='rounded-lg bg-white p-6 shadow-sm'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-4'>
                    <div className='h-10 w-10 overflow-hidden rounded-full bg-gray-200'>
                      <User className='h-full w-full p-2 text-gray-500' />
                    </div>
                    <div>
                      <p className='font-medium text-gray-900'>
                        {review.userName}
                      </p>
                      <p className='text-sm text-gray-500'>{review.date}</p>
                    </div>
                  </div>
                  <Rating value={review.rating} size='sm' />
                </div>
                <p className='mt-4 text-gray-700'>{review.comment}</p>
              </motion.div>
            ))}
          </div>

          <ReviewForm
            onSubmit={(rating, comment) => {
              console.log('New review:', { rating, comment });
              // TODO: Implement review submission
            }}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} products={MOCK_PRODUCTS} />
      </div>
    </div>
  );
};
