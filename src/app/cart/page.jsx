"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = JSON.parse(
                    localStorage.getItem("cart") || "[]"
                );

                setCart(Array.isArray(savedCart) ? savedCart : []);
            } catch {
                setCart([]);
            }

            setLoaded(true);
        };

        loadCart();

        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, []);

    const saveCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const updateQuantity = (id, change) => {
        const updatedCart = cart
            .map((item) => {
                if (item.id !== id) return item;

                const newQuantity = item.quantity + change;

                if (newQuantity < 1) return item;

                if (newQuantity > item.stock) {
                    return item;
                }

                return {
                    ...item,
                    quantity: newQuantity,
                };
            });

        saveCart(updatedCart);
    };

    const removeProduct = (id) => {
        const updatedCart = cart.filter(
            (item) => item.id !== id
        );

        saveCart(updatedCart);
    };

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (!loaded) {
        return (
            <main className="min-h-screen bg-white px-4 py-16">
                <p className="text-center text-zinc-500">
                    Loading your cart...
                </p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 border-b border-zinc-200 pb-6">
                    <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
                        Your Collection
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                        Shopping Cart
                    </h1>

                    <p className="mt-3 text-sm text-zinc-500">
                        {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-medium text-zinc-900">
                            Your cart is empty
                        </h2>

                        <p className="mt-3 text-sm text-zinc-500">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            href="/products"
                            className="mt-8 inline-block rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 border-b border-zinc-200 pb-6 sm:gap-6"
                                >
                                    <Link
                                        href={`/product/${item.id}`}
                                        className="h-36 w-28 shrink-0 overflow-hidden bg-zinc-100 sm:h-44 sm:w-36"
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-xs text-zinc-400">
                                                No image
                                            </div>
                                        )}
                                    </Link>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="font-medium text-zinc-900">
                                                    {item.name}
                                                </h2>

                                                <p className="mt-2 text-sm text-zinc-500">
                                                    ₹{item.price.toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                            <p className="shrink-0 text-sm font-semibold text-zinc-900">
                                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                            </p>
                                        </div>

                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                                            <div className="flex items-center rounded-full border border-zinc-200">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                    className="px-3 py-2 text-zinc-700 disabled:opacity-30"
                                                >
                                                    −
                                                </button>

                                                <span className="min-w-8 text-center text-sm">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                    className="px-3 py-2 text-zinc-700 disabled:opacity-30"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeProduct(item.id)}
                                                className="text-xs text-zinc-500 underline underline-offset-4 hover:text-black"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="h-fit border border-zinc-200 p-6">
                            <h2 className="text-lg font-semibold text-zinc-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 flex justify-between text-sm text-zinc-600">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>
                                    ₹{totalPrice.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="mt-4 flex justify-between text-sm text-zinc-600">
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>

                            <div className="my-6 border-t border-zinc-200" />

                            <div className="flex justify-between gap-3 font-semibold text-zinc-950">
                                <span>Total</span>
                                <span>
                                    ₹{totalPrice.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => alert("Checkout will be added next!")}
                                className="mt-7 w-full rounded-full bg-black px-5 py-4 text-sm font-medium text-white transition hover:bg-zinc-800"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                href="/products"
                                className="mt-4 block text-center text-sm text-zinc-600 underline underline-offset-4 hover:text-black"
                            >
                                Continue Shopping
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}