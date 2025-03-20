import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
  products: Product[];
}

export const RelatedProducts = ({ currentProduct, products }: RelatedProductsProps) => {
  const navigate = useNavigate();
  
  const relatedProducts = products
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || 
       product.seller.id === currentProduct.seller.id)
    )
    .slice(0, 4);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900">Related Items</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </motion.div>
    </section>
  );
};