"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("demoLoggedIn");

        if (loggedIn !== "true") {
            router.replace("/auth");
        } else {
            setIsLoggedIn(true);
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem("demoLoggedIn");
        router.replace("/auth");
    };

    if (!isLoggedIn) return null;

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-3xl font-bold text-white">
                    A
                </div>

                <h1 className="mt-5 text-2xl font-bold text-zinc-900">
                    Welcome, Ankit!
                </h1>

                <p className="mt-2 text-zinc-500">
                    You are logged in to your demo profile.
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-6 w-full rounded-lg bg-black py-3 font-semibold text-white hover:bg-zinc-800"
                >
                    Logout
                </button>
            </div>
        </main>
    );
}