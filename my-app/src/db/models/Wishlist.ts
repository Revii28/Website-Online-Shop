import { ObjectId } from "mongodb";
import DB from "../connecttion";
import { WishlistData } from "@/interfaces/wishlist";

class ModelWishlist {
  static async add(data: WishlistData) {
    const userId = new ObjectId(data.userId);
    const productId = new ObjectId(data.productId);

    const result = await DB.collection("Wishlist").insertOne({
      userId,
      productId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // console.log(result);
    return result;
  }
// ///////////////////////////////////////////////////////////////////////////////////////////
  static async delete(userId: string, productId: string) {
    await DB.collection("Wishlist").deleteOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });
  }
/////////////////////////////////////////////////////////////////////////////////////////////

  static async findAll(userId: string) {
    const pipeline = [
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $unwind: {
          path: "$product",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ];
    const postCollection = DB.collection("Wishlist");
    const result = await postCollection.aggregate(pipeline).toArray();
    return result;
  }
}
export default ModelWishlist;
