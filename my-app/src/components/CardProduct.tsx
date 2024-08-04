import React from 'react';
import { ProductData } from '@/interfaces/product';
import Link from 'next/link';
export const dynamic = 'force-dynamic'
interface CardProductProps {
  product: ProductData;
}

const CardProduct: React.FunctionComponent<CardProductProps> = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-full">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">Rp.{product.price}</p>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-auto">
          <Link href={`/products/${product.slug}`}>
            <button className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              See Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
