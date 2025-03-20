import { Star } from 'lucide-react';
import { clsx } from 'clsx';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
}

export const Rating = ({ value, max = 5, size = 'md', onChange }: RatingProps) => {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          className={clsx(
            'focus:outline-none',
            onChange && 'cursor-pointer hover:scale-110 transition-transform'
          )}
        >
          <Star
            size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
            className={clsx(
              'transition-colors',
              star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        </button>
      ))}
    </div>
  );
};