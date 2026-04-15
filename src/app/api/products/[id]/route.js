import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

// GET ONE
export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const product = await Product.findById(id);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}

// UPDATE
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(updated);
}

// DELETE
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    return Response.json({ error: "Invalid product id" }, { status: 400 });
  }

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json({ message: "deleted" });
}
