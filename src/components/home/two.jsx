
"use client";

import Link from "next/link";
import clothes from "@/data/clothes";


export default function Two() {
    const products = clothes.slice(0, 8);

    return (
        <section className="border-b border-zinc-200 bg-white px-4 py-12 sm:px-6 md:py-16">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8 flex items-end justify-between sm:mb-10">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                            Freshly Arrived
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl md:text-4xl">
                            Latest Collection
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Discover your next favourite style.
                        </p>
                    </div>

                    <Link
                        href="/temp_1"
                        className="shrink-0 border-b border-zinc-900 pb-1 text-sm font-semibold text-zinc-900 hover:text-zinc-500"
                    >
                        View All →
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href={`/temp_1/${product.id}`}
                            className="group min-w-0"
                        >
                            {/* Image */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <span className="absolute left-2 top-2 rounded-sm bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-zinc-900 sm:left-3 sm:top-3 sm:text-[10px]">
                                    New Arrival
                                </span>

                                {product.totalStock === 0 && (
                                    <span className="absolute inset-x-0 bottom-0 bg-zinc-900/80 py-2 text-center text-xs font-semibold text-white">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="pt-3">
                                <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500">
                                    {product.category}
                                </p>

                                <h3 className="truncate text-sm font-medium text-zinc-900 sm:text-base">
                                    {product.name}
                                </h3>

                                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-zinc-900">
                                        ₹{product.price.toLocaleString("en-IN")}
                                    </p>

                                    {product.totalStock > 0 && (
                                        <span className="text-[10px] text-zinc-500">
                                            In Stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty State */}
                {products.length === 0 && (
                    <p className="py-12 text-center text-sm text-zinc-500">
                        No products available right now.
                    </p>
                )}
            </div>
        </section>
    );
}
