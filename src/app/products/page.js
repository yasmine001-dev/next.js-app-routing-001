"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

export default function ProductsPage() {
  const { data: session, status } = useSession();

  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    if (session) {
      Promise.resolve().then(fetchProducts);
    }
  }, [session]);

  async function createProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price: Number(price) }),
    });

    if (!res.ok) return;

    setTitle("");
    setPrice("");
    fetchProducts();
  }

  async function deleteProduct(id) {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return;

    fetchProducts();
  }

  async function updateProduct() {
    const res = await fetch(`/api/products/${selectedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price: Number(price) }),
    });

    if (!res.ok) return;

    setSelectedId(null);
    setTitle("");
    setPrice("");
    fetchProducts();
  }

  function selectProduct(p) {
    setSelectedId(p._id);
    setTitle(p.title);
    setPrice(p.price);
  }

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div>
        <h2>Login first</h2>
        <button onClick={() => signIn("github")}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Products CRUD</h1>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />

      <input value={price} onChange={(e) => setPrice(e.target.value)} />

      {selectedId ? (
        <button onClick={updateProduct}>Update</button>
      ) : (
        <button onClick={createProduct}>Create</button>
      )}

      {products.map((p) => (
        <div key={p._id}>
          <p>
            {p.title} - {p.price}
          </p>
          <Link href={`/products/${p._id}`}>View Details</Link>
          <hr />

          <button onClick={() => selectProduct(p)}>Edit</button>

          <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
