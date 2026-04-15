import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import mongoose from "mongoose";

export default async function ProductPage({ params }) {
  const { id } = await params;

  if (!id || !mongoose.isValidObjectId(id)) {
    return <h1>Invalid Product ID</h1>;
  }

  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <div>
      <h1>{product.title} </h1>
            <img src={product.thumbnail} alt="Product image" />

      <p>{product.price} EGP</p>
      <p>{product.description || "No description available."}</p>
      {/* <img src={product.images[0]} alt="Product image" /> */}
    </div>
  );
}
