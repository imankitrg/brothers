
"use client";

import { useEffect, useState } from "react";

const images = [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1920&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=85",
];

export default function One() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 2000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full overflow-hidden bg-zinc-100">
            {/* Banner */}
            <div className="relative h-[220px] w-full sm:h-[320px] md:h-[420px] lg:h-[520px]">
                {images.map((image, index) => (
                    <img
                        key={image}
                        src={image}
                        alt={`Fashion banner ${index + 1}`}
                        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${current === index
                                ? "z-10 opacity-100"
                                : "z-0 opacity-0"
                            }`}
                        fetchPriority={index === 0 ? "high" : "auto"}
                    />
                ))}

                {/* Previous Arrow */}
                <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous banner"
                    className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl text-black shadow-md transition hover:bg-white sm:left-6 sm:h-12 sm:w-12"
                >
                    &#10094;
                </button>

                {/* Next Arrow */}
                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next banner"
                    className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-xl text-black shadow-md transition hover:bg-white sm:right-6 sm:h-12 sm:w-12"
                >
                    &#10095;
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-5">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setCurrent(index)}
                            aria-label={`Show banner ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${current === index
                                    ? "w-6 bg-white"
                                    : "w-2 bg-white/60"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
