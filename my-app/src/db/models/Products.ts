import { ProductData } from "@/interfaces/product";
import DB from "../connecttion";

type Skip = { $skip: number };
type Limit = { $limit: number };
type Match = { $match: { name: { $regex: string; $options: string } } };

type Pipeline = Skip | Limit | Match;

class ModelProduct {
  private static collection = DB.collection<ProductData>("Products");

  static async findAll(page: number = 1, limit: number = 4, search: string = "") {
    const skip = (page - 1) * limit;
    let pipeline: Pipeline[] = [{ $skip: skip }, { $limit: limit }];
    if (search) {
      pipeline.push({
        $match: { name: { $regex: search, $options: "i" } },
      });
    }

    return this.collection.aggregate(pipeline).toArray();
  }

  static async findById(id: string) {
    const data = await DB.collection<ProductData>("Products").findOne({
      _id: id,
    });
    return data;
  }

  static async findBySlug(slug: string) {
    const data = await DB.collection<ProductData>("Products").findOne({ slug });
    return data;
  }

  static async Add(newProduct: {
    name: string;
    description: string;
    price: number;
    slug: string;
    tags: string[];
    thumbnail: string;
    images: string[];
  }) {
    const product = await DB.collection<ProductData>("Products").findOne({
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      tags: newProduct.tags,
      thumbnail: newProduct.thumbnail,
      images: newProduct.images,
      slug: newProduct.slug,
    });

    if (product) {
      throw new Error("Product Already Exists");
    }
    const result = await DB.collection("Products").insertOne({
      name: newProduct.name,
      slug: newProduct.slug,
      description: newProduct.description,
      price: newProduct.price,
      tags: newProduct.tags,
      thumbnail: newProduct.thumbnail,
      images: newProduct.images,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  }
}

export default ModelProduct;
