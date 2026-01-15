
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  interactive = false, 
  onRatingChange,
  size = 20 
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-transform active:scale-90`}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRatingChange?.(star)}
        >
          <Star
            size={size}
            className={`${
              star <= (hover || rating) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
};
