
"use client";

import { useState } from "react";
import Link from "next/link";

// Temporary data: 8 items per section
const tempData = {
    featured: [
        { id: 1, name: "Oversized Tee", image: "photo-1521572163474-6864f9cf17ab" },
        { id: 2, name: "Classic Black Tee", image: "photo-1503341504253-dff4815485f1" },
        { id: 3, name: "Casual White Tee", image: "photo-1523381210434-271e8be1f52b" },
        { id: 4, name: "Graphic T-Shirt", image: "photo-1576566588028-4147f3842f27" },
        { id: 5, name: "Streetwear Tee", image: "photo-1529139574466-a303027c1d8b" },
        { id: 6, name: "Essential Shirt", image: "photo-1598033129183-c4f50c736f10" },
        { id: 7, name: "Summer Wear", image: "photo-1515886657613-9f3515b0c78f" },
        { id: 8, name: "Urban Collection", image: "photo-1483985988355-763728e1935b" },
    ],

    popular: [
        { id: 9, name: "Classic Black", image: "photo-1521572163474-6864f9cf17ab" },
        { id: 10, name: "Daily Wear", image: "photo-1503341504253-dff4815485f1" },
        { id: 11, name: "Printed Tee", image: "photo-1576566588028-4147f3842f27" },
        { id: 12, name: "White Essential", image: "photo-1523381210434-271e8be1f52b" },
        { id: 13, name: "Casual Shirt", image: "photo-1598033129183-c4f50c736f10" },
        { id: 14, name: "Street Style", image: "photo-1529139574466-a303027c1d8b" },
        { id: 15, name: "Modern Fit", image: "photo-1515886657613-9f3515b0c78f" },
        { id: 16, name: "Weekend Look", image: "photo-1483985988355-763728e1935b" },
    ],

    bestSelling: [
        { id: 17, name: "Graphic Black Tee", image: "photo-1576566588028-4147f3842f27", price: 599 },
        { id: 18, name: "Basic White Tee", image: "photo-1523381210434-271e8be1f52b", price: 499 },
        { id: 19, name: "Premium Tee", image: "photo-1521572163474-6864f9cf17ab", price: 699 },
        { id: 20, name: "Casual Outfit", image: "photo-1503341504253-dff4815485f1", price: 799 },
        { id: 21, name: "Urban Shirt", image: "photo-1598033129183-c4f50c736f10", price: 899 },
        { id: 22, name: "Streetwear Fit", image: "photo-1529139574466-a303027c1d8b", price: 749 },
        { id: 23, name: "Summer Style", image: "photo-1515886657613-9f3515b0c78f", price: 649 },
        { id: 24, name: "Weekend Tee", image: "photo-1483985988355-763728e1935b", price: 599 },
    ],
};

const sections = [
    {
        key: "featured",
        title: "Featured Collections",
        items: tempData.featured,
    },
    {
        key: "popular",
        title: "Popular Collections",
        items: tempData.popular,
    },
    {
        key: "bestSelling",
        title: "Best Selling",
        items: tempData.bestSelling,
    },
];

// Reusable collection row
function CollectionRow({ title, items }) {
    const [showAll, setShowAll] = useState(false);

    const visibleItems = showAll ? items : items.slice(0, 4);

    return (
        <section className="border-b border-zinc-100 py-5 sm:py-7">
            {/* Heading */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xs font-bold uppercase tracking-wide text-zinc-900 sm:text-base">
                    {title}
                </h2>

                <button
                    type="button"
                    onClick={() => setShowAll((previous) => !previous)}
                    aria-expanded={showAll}
                    className="shrink-0 text-[10px] font-medium text-zinc-600 underline underline-offset-4 transition hover:text-black sm:text-sm"
                >
                    {showAll ? "Show Less" : "View All"}
                </button>
            </div>

            {/* Mobile: 4 cards | Laptop: 8 cards */}
            <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-3 lg:grid-cols-8 lg:gap-x-4">
                {visibleItems.map((item) => (
                    <Link
                        key={item.id}
                        href="/product"
                        className="group min-w-0"
                    >
                        {/* Product image */}
                        <div className="aspect-square overflow-hidden rounded-md bg-zinc-100">
                            <img
                                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                                alt={item.name}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Product name and optional price */}
                        <div className="pt-1.5">
                            <h3 className="truncate text-[9px] font-medium text-zinc-800 sm:text-xs">
                                {item.name}
                            </h3>

                            {item.price !== undefined && (
                                <p className="mt-0.5 text-[10px] font-semibold text-zinc-900 sm:text-xs">
                                    ₹{item.price.toLocaleString("en-IN")}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default function Categories() {
    return (
        <section className="bg-white px-3 sm:px-6">
            <div className="mx-auto max-w-7xl">

                {/* Today's Offer Hero Banner */}
                <section className="mb-4 pt-3 sm:mb-6 sm:pt-5">
                    <Link
                        href="/product"
                        className="group relative block h-[200px] overflow-hidden rounded-lg bg-zinc-900 sm:h-[280px] md:h-[340px] lg:h-[380px]"
                    >
                        {/* Banner image */}
                        <img
                            src="https://images.unsplash.com/photo-1791394813068-c95061aed522?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D"
                            alt="Today's special fashion offer"
                            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />

                        {/* Banner content */}
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-[85%] px-5 text-white sm:max-w-lg sm:px-10 md:px-14">
                                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-amber-300 sm:text-xs">
                                    Exclusive Offers
                                </p>

                                <h1 className="mt-2 text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
                                    Today's
                                    <br />
                                    Special Offer
                                </h1>

                                <p className="mt-2 max-w-xs text-[10px] text-white/80 sm:mt-3 sm:text-sm">
                                    Discover your favourite styles at special prices.
                                </p>

                                <span className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition-colors group-hover:bg-amber-300 sm:mt-6 sm:px-6 sm:py-3 sm:text-xs">
                                    Shop Now
                                    <span aria-hidden="true">→</span>
                                </span>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* Three collection rows */}
                {sections.map((section) => (
                    <CollectionRow
                        key={section.key}
                        title={section.title}
                        items={section.items}
                    />
                ))}

            </div>
        </section>
    );
}
