'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { AppDispatch, RootState } from '@/app/lib/lib/slices/store';
import { fetchProducts } from '@/app/lib/lib/slices/slices/productSlice';
// Nếu có fetchProducts, import đúng vị trí file
// import { fetchProducts } from '@/app/lib/lib/slices/slices/productSlice';
import ProductCard from '@components/ProductCard';
import LoadingSpinner from '@components/atoms/LoadingSpinner';

// 👉 Import type ở đây
import type { Product } from '@/app/lib/types';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  // const { products = [], loading, error } = useSelector(
  //   (state: RootState) => state.products
  // );

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 8 }));
  }, [dispatch]);

  // Sử dụng state.products.items cho dữ liệu sản phẩm
  const { items: products, loading, error } = useSelector((state: RootState) => state.products);
  if (loading) return <LoadingSpinner />;
  if (error)
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}
