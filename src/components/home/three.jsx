
"use client";

import Link from "next/link";
import clothes from "@/data/clothes";

const categoryConfig = [
    {
        id: "men",
        name: "Men's Collection",
        subtitle: "Everyday essentials",
        image:
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
        size: "large",
    },
    {
        id: "women",
        name: "Women's Collection",
        subtitle: "Find your style",
        image:
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
        size: "normal",
    },
    {
        id: "denim",
        name: "Denim & Jeans",
        subtitle: "Made to stand out",
        image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
        size: "normal",
    },
    {
        id: "ethnic",
        name: "Kurtas & Ethnic",
        subtitle: "Tradition meets style",
        image:
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=900&q=85",
        size: "normal",
    },
];

export default function Three() {
    const categories = categoryConfig.map((category) => {
        const products = clothes.filter((product) => {
            const productCategory = product.category?.toLowerCase();

            if (category.id === "denim") {
                return (
                    productCategory === "denim" ||
                    product.name?.toLowerCase().includes("jean") ||
                    product.name?.toLowerCase().includes("denim")
                );
            }

            if (category.id === "ethnic") {
                return (
                    productCategory === "ethnic" ||
                    productCategory === "kurta"
                );
            }

            return productCategory === category.id;
        });

        return {
            ...category,
            count: products.length,
        };
    });

    return (
        <section
            id="categories"
            className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
        >
            <div className="mx-auto max-w-7xl">
                {/* Heading */}
                <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                            Discover your style
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                            Shop by category<span className="text-zinc-400">.</span>
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                            Explore collections made for every mood, moment and style.
                        </p>
                    </div>

                    <Link
                        href="/temp_1"
                        className="group w-fit border-b border-zinc-900 pb-1 text-sm font-medium text-zinc-900"
                    >
                        Explore all products
                        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </Link>
                </div>

                {/* Category cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category, index) => (
                        <Link
                            key={category.id}
                            href={`/temp_1?category=${category.id}`}
                            className={`group relative isolate block h-[340px] overflow-hidden bg-zinc-100 sm:h-[390px] ${index === 0
                                ? "sm:col-span-2 sm:row-span-2 sm:h-[500px] lg:h-[600px]"
                                : ""
                                }`}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Image overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

                            {/* Top label */}
                            <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-white sm:left-6 sm:right-6">
                                <span className="text-[10px] font-medium uppercase tracking-[0.22em]">
                                    Collection 0{index + 1}
                                </span>

                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                                    ↗
                                </span>
                            </div>

                            {/* Bottom content */}
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                                <p className="mb-2 text-xs text-white/75">
                                    {category.subtitle}
                                </p>

                                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                    {category.name}
                                </h3>

                                <div className="mt-4 flex items-center justify-between border-t border-white/35 pt-3">
                                    <span className="text-xs text-white/85">
                                        {category.count} {category.count === 1 ? "item" : "items"}
                                    </span>

                                    <span className="text-xs font-medium uppercase tracking-wider">
                                        Shop now →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
