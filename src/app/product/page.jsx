"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/product";

const categories = [
    { label: "All Products", value: "all" },
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
    { label: "Denim", value: "denim" },
    { label: "Ethnic", value: "ethnic" },
];

function ProductContent() {
    const searchParams = useSearchParams();

    const initialCategory = searchParams.get("category") || "all";
    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState("featured");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (category !== "all") {
            result = result.filter((product) => {
                if (category === "denim") {
                    return (
                        product.category === "denim" ||
                        product.subcategory === "jeans"
                    );
                }

                return product.category === category;
            });
        }

        if (sort === "low-high") {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === "high-low") {
            result.sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
            result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        }

        return result;
    }, [category, sort]);

    const handleCategoryChange = (value) => {
        setCategory(value);

        const url = new URL(window.location.href);

        if (value === "all") {
            url.searchParams.delete("category");
        } else {
            url.searchParams.set("category", value);
        }

        window.history.replaceState(null, "", url);
    };

    const addToCart = (product) => {
        const totalStock = product.variants.reduce(
            (total, variant) => total + variant.stock,
            0
        );

        if (totalStock <= 0) {
            alert("This product is out of stock.");
            return;
        }

        let cart = [];

        try {
            cart = JSON.parse(localStorage.getItem("cart") || "[]");
            if (!Array.isArray(cart)) cart = [];
        } catch {
            cart = [];
        }

        const existingProduct = cart.find((item) => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            if (existingProduct.quantity >= existingProduct.stock) {
                alert("Maximum available stock reached.");
                return;
            }

            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [
                ...cart,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0] || "",
                    quantity: 1,
                    stock: totalStock,
                },
            ];
        }

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Product added to cart!");
    };

    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8 border-b border-zinc-200 pb-7">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
                        The Collection
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                        Discover your style.
                    </h1>

                    <p className="mt-3 text-sm text-zinc-500">
                        Explore everyday essentials and timeless styles.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => handleCategoryChange(item.value)}
                                className={`rounded-full border px-4 py-2 text-sm transition ${category === item.value
                                        ? "border-black bg-black text-white"
                                        : "border-zinc-200 bg-white text-zinc-700 hover:border-black"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none"
                        aria-label="Sort products"
                    >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest first</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                    </select>
                </div>

                {/* Product count */}
                <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                        {filteredProducts.length} products
                    </p>
                    <Link
                        href="/cart"
                        className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-black"
                    >
                        View Cart
                    </Link>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
                        {filteredProducts.map((product) => {
                            const image = product.images?.[0];
                            const totalStock = product.variants.reduce(
                                (total, variant) => total + variant.stock,
                                0
                            );

                            return (
                                <div key={product.id} className="group">
                                    <Link href={`/product/${product.id}`}>
                                        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                                            {image && (
                                                <img
                                                    src={image}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}

                                            {product.isNew && (
                                                <span className="absolute left-3 top-3 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-900">
                                                    New
                                                </span>
                                            )}

                                            {totalStock === 0 && (
                                                <span className="absolute inset-x-0 bottom-0 bg-black/80 py-3 text-center text-xs font-medium text-white">
                                                    Out of stock
                                                </span>
                                            )}
                                        </div>

                                        <div className="pt-4">
                                            <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500">
                                                {product.brand} · {product.subcategory}
                                            </p>

                                            <h2 className="text-sm font-medium text-zinc-900 sm:text-base">
                                                {product.name}
                                            </h2>

                                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                                <span className="text-sm font-semibold text-zinc-900">
                                                    ₹{product.price.toLocaleString("en-IN")}
                                                </span>

                                                {product.originalPrice > product.price && (
                                                    <span className="text-xs text-zinc-400 line-through">
                                                        ₹{product.originalPrice.toLocaleString("en-IN")}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-2 text-xs text-zinc-500">
                                                {product.variants.length} options
                                            </p>
                                        </div>
                                    </Link>

                                    <button
                                        type="button"
                                        disabled={totalStock === 0}
                                        onClick={() => addToCart(product)}
                                        className="mt-4 w-full rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
                                    >
                                        {totalStock === 0 ? "Out of Stock" : "Add to Cart"}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <h2 className="text-xl font-medium">No products found</h2>
                        <p className="mt-2 text-sm text-zinc-500">
                            Try selecting another category.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ProductPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-white px-4 py-10">
                    <div className="mx-auto max-w-7xl">Loading products...</div>
                </main>
            }
        >
            <ProductContent />
        </Suspense>
    );
}
