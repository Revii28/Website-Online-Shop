import React from "react";
export const dynamic = 'force-dynamic'
type RemoveWishlistProps = {
  userId: string;
  productId: string;
  onRemove: (userId: string, productId: string) => void;
};

const RemoveWishlist: React.FC<RemoveWishlistProps> = ({
  userId,
  productId,
  onRemove,
}) => {
  const handleRemove = () => {
    onRemove(userId, productId);
  };

  return (
    <button
      onClick={handleRemove}
      className="ml-4 py-1 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
      aria-label="Remove from wishlist"
    >
      Remove
    </button>
  );
};

export default RemoveWishlist;
