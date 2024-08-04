"use client";

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardProduct from '@/components/CardProduct';
import { ProductData } from '@/interfaces/product';
export const dynamic = "force-dynamic"
async function fetchProducts(page: number, limit: number): Promise<ProductData[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 4;

  const loadMoreProducts = async () => {
    try {
      const data = await fetchProducts(page, limit);

      setProducts(prevProducts => {
        const updatedProducts = [...prevProducts, ...data];
        const uniqueProducts = Array.from(new Set(updatedProducts.map(product => product._id)))
          .map(id => updatedProducts.find(product => product._id === id))
          .filter((product): product is ProductData => product !== undefined);
        return uniqueProducts;
      });

      if (data.length < limit) {
        setMore(false);
      } else {
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      console.error(err);
      setMore(false);
    }
  };

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
        <h1 className="text-4xl font-bold mb-10 text-gray-800">Produk Kami</h1>
        <InfiniteScroll
          dataLength={products.length}
          next={loadMoreProducts}
          hasMore={more}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: 'center' }}>Tidak ada Produk</p>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <CardProduct key={product._id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
}
