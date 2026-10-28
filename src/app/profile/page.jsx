
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("User");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loggedIn = localStorage.getItem("demoLoggedIn");

        if (loggedIn !== "true") {
            router.replace("/auth");
            return;
        }

        setUsername(localStorage.getItem("demoUsername") || "User");
        setIsLoggedIn(true);

        const savedOrders = JSON.parse(
            localStorage.getItem("demoOrders") || "[]"
        );

        setOrders(
            [...savedOrders].sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            )
        );
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("demoLoggedIn");
        localStorage.removeItem("demoUsername");
        localStorage.removeItem("demoUserEmail");

        router.replace("/auth");
    };

    if (!isLoggedIn) return null;

    return (
        <main className="min-h-screen bg-zinc-50 px-4 py-10">
            <div className="mx-auto max-w-3xl space-y-8">
                <section className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-3xl font-bold text-white">
                        {username.charAt(0).toUpperCase()}
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-zinc-900">
                        Welcome, {username}!
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        You are logged in to your demo profile.
                    </p>

                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-zinc-800 sm:w-auto sm:px-10"
                    >
                        Logout
                    </button>
                </section>

                <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-2xl font-bold text-zinc-900">
                                My Orders
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500">
                                Your order history
                            </p>
                        </div>

                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
                            {orders.length} orders
                        </span>
                    </div>

                    {orders.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-zinc-300 px-5 py-10 text-center">
                            <p className="font-semibold text-zinc-800">
                                No orders yet
                            </p>
                            <p className="mt-2 text-sm text-zinc-500">
                                Your orders will appear here after checkout.
                            </p>

                            <button
                                onClick={() => router.push("/product")}
                                className="mt-5 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-zinc-800"
                            >
                                Browse Products
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            {orders.map((order, index) => (
                                <article
                                    key={order.orderId || index}
                                    className="rounded-xl border border-zinc-200 p-4 sm:p-5"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-zinc-900">
                                                Order #{order.orderId || "N/A"}
                                            </p>
                                            <p className="mt-1 text-sm text-zinc-500">
                                                {order.createdAt
                                                    ? new Date(order.createdAt).toLocaleString("en-IN")
                                                    : "Date unavailable"}
                                            </p>
                                        </div>

                                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                                            {order.orderStatus || order.paymentStatus || "Pending"}
                                        </span>
                                    </div>

                                    <div className="my-4 border-t border-zinc-100" />

                                    {(order.items || []).map((item, itemIndex) => (
                                        <div
                                            key={item.id || itemIndex}
                                            className="flex justify-between gap-3 py-2 text-sm"
                                        >
                                            <span className="text-zinc-700">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                ₹{(
                                                    Number(item.price || 0) *
                                                    Number(item.quantity || 1)
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="mt-4 flex justify-between border-t border-zinc-100 pt-4">
                                        <div>
                                            <p className="text-sm text-zinc-500">
                                                Payment
                                            </p>
                                            <p className="mt-1 font-medium capitalize">
                                                {String(order.paymentMethod || "N/A").replaceAll("-", " ")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-zinc-500">
                                                Total
                                            </p>
                                            <p className="mt-1 text-lg font-bold">
                                                ₹{Number(order.total || 0).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
