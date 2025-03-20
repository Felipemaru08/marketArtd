export type User = {
  id: string;
  name: string;
  email: string;
  type: 'buyer' | 'artist';
  avatar?: string;
  bio?: string;
  followers: number;
  fans: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  type: 'book' | 'art';
  format: 'physical' | 'digital';
  category: string;
  price: number;
  imageUrl: string;
  seller: User;
  isAuction: boolean;
  auctionEndDate?: string;
  currentBid?: number;
  minimumBid?: number;
};