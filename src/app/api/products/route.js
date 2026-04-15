import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const products = await Product.find();

  return Response.json(products);
}

// POST
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const body = await req.json();
  const product = await Product.create(body);

  return Response.json(product);
}