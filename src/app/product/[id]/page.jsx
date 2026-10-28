
import { products } from "@/data/product";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({ params }) {
    const { id } = await params;

    const product = products.find(
        (item) => String(item.id) === String(id)
    );

    if (!product) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl px-5 py-12">
            <Link
                href="/product"
                className="mb-8 inline-block text-sm text-zinc-500 hover:text-black"
            >
                ← Back to products
            </Link>

            <div className="grid gap-8 md:grid-cols-2">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full bg-zinc-100 object-cover"
                />

                <div>
                    <p className="text-sm uppercase tracking-widest text-zinc-500">
                        {product.brand}
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold">
                        {product.name}
                    </h1>

                    <p className="mt-4 text-xl font-medium">
                        ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <p className="mt-6 leading-7 text-zinc-600">
                        {product.description}
                    </p>

                    <p className="mt-5 text-sm">
                        Category: {product.category}
                    </p>

                    <p className="mt-2 text-sm">
                        Available sizes:{" "}
                        {[
                            ...new Set(
                                product.variants.map((variant) => variant.size)
                            ),
                        ].join(", ")}
                    </p>
                </div>
            </div>
        </main>
    );
}
