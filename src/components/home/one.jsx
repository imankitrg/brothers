"use client";
import Link from "next/link";

export default function One() {
    return (
        <section className="bg-zinc-50 border-b border-zinc-200 py-16 px-6 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Hero Text */}
                <div className="space-y-6 text-center lg:text-left">
                    <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-xs font-semibold uppercase tracking-widest rounded-full">
                        Summer 2026 Collection
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                        ELEVATE YOUR EVERYDAY STYLE.
                    </h1>
                    <p className="text-base md:text-lg text-zinc-600 max-w-xl mx-auto lg:mx-0">
                        Minimalist design meets premium craftsmanship. Explore lightweight shirts, oversized graphic tees, and vintage denim built for modern living.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                        <Link
                            href="/temp_1"
                            className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm rounded-xl transition-all shadow-md hover:shadow-lg"
                        >
                            Shop New Arrivals
                        </Link>
                        <Link
                            href="#categories"
                            className="px-6 py-3.5 bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 font-medium text-sm rounded-xl transition-all"
                        >
                            Explore Categories
                        </Link>
                    </div>

                    {/* Features row */}
                    <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-200 text-center lg:text-left">
                        <div>
                            <p className="font-bold text-zinc-900 text-sm">Free Shipping</p>
                            <p className="text-xs text-zinc-500">On orders over ₹999</p>
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 text-sm">100% Cotton</p>
                            <p className="text-xs text-zinc-500">Soft & Breathable</p>
                        </div>
                        <div>
                            <p className="font-bold text-zinc-900 text-sm">Easy Returns</p>
                            <p className="text-xs text-zinc-500">30-Day Money Back</p>
                        </div>
                    </div>
                </div>

                {/* Hero Image Showcase */}
                <div className="relative">
                    <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl group">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
                            alt="Brothers Store Collection"
                            className="w-full h-[460px] md:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent flex items-end p-8">
                            <div className="text-white">
                                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Featured Edit</p>
                                <h3 className="text-2xl font-bold">The Essential Streetwear Edit</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}