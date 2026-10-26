"use client";
import Link from "next/link";

export default function Two() {
    const offers = [
        {
            id: 1,
            badge: "FLAT 30% OFF",
            title: "Oversized Streetwear Tees",
            subtitle: "Heavyweight 240 GSM organic cotton drops.",
            image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        },
        {
            id: 2,
            badge: "BUY 2 GET 15% OFF",
            title: "Vintage Denim & Jeans",
            subtitle: "Relaxed 90s baggy & slim stretch fits.",
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        },
        {
            id: 3,
            badge: "NEW ARRIVALS",
            title: "Festive & Ethnic Kurtis",
            subtitle: "Pure silk & cotton hand-embroidered collection.",
            image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
            link: "/temp_1"
        }
    ];

    return (
        <section className="bg-white py-16 px-6 border-b border-zinc-200">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        Exclusive Deals
                    </span>
                    <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                        Trending Offers & Collections
                    </h2>
                    <p className="text-sm text-zinc-600">
                        Handpicked seasonal deals crafted for maximum comfort and style.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="group relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-4 left-4 bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {offer.badge}
                                </span>
                            </div>

                            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900 group-hover:text-zinc-700 transition-colors">
                                        {offer.title}
                                    </h3>
                                    <p className="text-xs text-zinc-600 mt-1">
                                        {offer.subtitle}
                                    </p>
                                </div>

                                <Link
                                    href={offer.link}
                                    className="inline-flex items-center text-xs font-bold text-zinc-900 hover:underline gap-1 pt-2"
                                >
                                    Explore Offer &rarr;
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}