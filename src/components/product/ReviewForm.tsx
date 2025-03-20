import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Rating } from '../ui/Rating';
import { Button } from '../ui/Button';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
    setRating(5);
    setComment('');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 space-y-4 rounded-lg bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Rating
        </label>
        <Rating
          value={rating}
          onChange={setRating}
          size="lg"
        />
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Your Review
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          placeholder="Share your thoughts about this item..."
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Review
      </Button>
    </motion.form>
  );
};