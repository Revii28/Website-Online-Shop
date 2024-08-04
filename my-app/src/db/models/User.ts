import { optional, z } from "zod";
import DB from "../connecttion";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = z.object({
  name: z.optional(z.string()),
  email: z.string({ message: "password must be String" }).email().min(5),
  password: z
    .string({ message: "password must be String" })
    .min(5, { message: "password must be more then 5 characters" }),
  image: z.optional(z.string()),
});

interface User {
  email: string;
  password: string;
}

class UserModel {
  static async create(newUser: {
    name: string;
    email: string;
    password: string;
    image: string;
  }) {
    userSchema.parse(newUser);

    const user = await DB.collection("Users").findOne({
      email: newUser.email,
    });

    if (user) {
      throw new Error("Email / Password Already Exists");
    }




    const result = await DB.collection("Users").insertOne({
      image: newUser.image,
      name: newUser.name,
      email: newUser.email,
      password: bcryptjs.hashSync(newUser.password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  }

  static async login(inputUser: { email: string; password: string }) {
    userSchema.parse(inputUser);

    const user = await DB.collection<User>("Users").findOne({
      email: inputUser.email,
    });

    if (!user) {
      throw new Error("Email Already Exists");
    }
    const isPasswordValid = bcryptjs.compareSync(inputUser.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const accessToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SICRET as string
    );

    return { accessToken };
  }
}

export default UserModel;
