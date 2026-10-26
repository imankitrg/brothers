"use client";
import Link from "next/link";

export default function Three() {
    const categories = [
        {
            name: "Men's Collection",
            count: "24 Items",
            image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        },
        {
            name: "Women's Collection",
            count: "18 Items",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        },
        {
            name: "Denim & Jeans",
            count: "15 Items",
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        },
        {
            name: "Kurtas & Ethnic",
            count: "12 Items",
            image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        }
    ];

    return (
        <section id="categories" className="bg-zinc-50 py-16 px-6 border-b border-zinc-200">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                            Curated Selection
                        </span>
                        <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight mt-1">
                            Shop By Category
                        </h2>
                    </div>
                    <Link
                        href="/temp_1"
                        className="text-xs font-bold text-zinc-900 hover:underline inline-flex items-center gap-1"
                    >
                        View All Categories &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={cat.link}
                            className="group relative rounded-2xl overflow-hidden h-80 bg-zinc-900 shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                                <h3 className="text-xl font-bold tracking-tight group-hover:translate-x-1 transition-transform">
                                    {cat.name}
                                </h3>
                                <p className="text-xs text-zinc-300 mt-1 font-medium">
                                    {cat.count}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}