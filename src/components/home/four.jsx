"use client";
import { useState } from "react";
import clothes from "@/data/clothes";

export default function Four() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [addedIds, setAddedIds] = useState([]);

    const filteredClothes = selectedCategory === "all"
        ? clothes
        : clothes.filter((item) => item.category === selectedCategory);

    const handleAddToCart = (id) => {
        if (!addedIds.includes(id)) {
            setAddedIds([...addedIds, id]);
            setTimeout(() => {
                setAddedIds((prev) => prev.filter((i) => i !== id));
            }, 2000);
        }
    };

    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header & Filter Tabs */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            Our Collection
                        </span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
                            Explore All Products
                        </h2>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {["all", "men", "women"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                                    selectedCategory === cat
                                        ? "bg-zinc-900 text-white shadow-sm"
                                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                }`}
                            >
                                {cat === "all" ? "All Apparel" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredClothes.map((item) => {
                        const isAdded = addedIds.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                className="group bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                            >
                                {/* Product Image */}
                                <div className="relative h-72 overflow-hidden bg-zinc-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                                        {item.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <h3 className="font-bold text-zinc-900 text-base tracking-tight">
                                                {item.name}
                                            </h3>
                                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                Stock: {item.totalStock}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-500 line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Size Badges */}
                                    {item.variants?.size && (
                                        <div className="flex items-center gap-1 text-[10px] font-medium text-zinc-500">
                                            <span>Sizes:</span>
                                            {item.variants.size.map((sz) => (
                                                <span
                                                    key={sz}
                                                    className="px-1.5 py-0.5 bg-zinc-200/70 rounded text-zinc-700 font-semibold"
                                                >
                                                    {sz}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Price & Add to Cart */}
                                    <div className="flex items-center justify-between pt-3 border-t border-zinc-200">
                                        <div>
                                            <span className="text-xs text-zinc-400 block">Price</span>
                                            <span className="text-lg font-extrabold text-zinc-900">
                                                ₹{item.price.toLocaleString()}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleAddToCart(item.id)}
                                            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all shadow-xs ${
                                                isAdded
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-zinc-900 hover:bg-zinc-800 text-white active:scale-95"
                                            }`}
                                        >
                                            {isAdded ? "✓ Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}