
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "ankit" && password === "1234") {
            sessionStorage.setItem("demoLoggedIn", "true");
            router.push("/profile");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm space-y-5 rounded-2xl bg-white p-8 shadow-lg"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-900">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Login to your account
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-zinc-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
