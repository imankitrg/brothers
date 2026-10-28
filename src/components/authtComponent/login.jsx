
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [isSignup, setIsSignup] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        const normalizedEmail = email.trim().toLowerCase();

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        const users = JSON.parse(
            localStorage.getItem("demoUsers") || "[]"
        );

        if (isSignup) {
            if (!name.trim()) {
                setError("Please enter your name");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const existingUser = users.find(
                (user) => user.email === normalizedEmail
            );

            if (existingUser) {
                setError("An account with this email already exists");
                return;
            }

            const newUser = {
                id: crypto.randomUUID(),
                name: name.trim(),
                email: normalizedEmail,
                password,
            };

            users.push(newUser);

            localStorage.setItem("demoUsers", JSON.stringify(users));
            localStorage.setItem("demoLoggedIn", "true");
            localStorage.setItem("demoUsername", newUser.name);
            localStorage.setItem("demoUserEmail", newUser.email);

            router.push("/profile");
            return;
        }

        const user = users.find(
            (item) =>
                item.email === normalizedEmail &&
                item.password === password
        );

        if (!user) {
            setError("Invalid email or password. Please sign up first.");
            return;
        }

        localStorage.setItem("demoLoggedIn", "true");
        localStorage.setItem("demoUsername", user.name);
        localStorage.setItem("demoUserEmail", user.email);

        router.push("/profile");
    };

    const switchMode = () => {
        setIsSignup((previous) => !previous);
        setError("");
        setMessage("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-lg"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-zinc-900">
                        {isSignup ? "Create Account" : "Welcome Back"}
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        {isSignup
                            ? "Sign up to get started"
                            : "Login to your account"}
                    </p>
                </div>

                {isSignup && (
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            autoComplete="name"
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
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
                        placeholder="Enter password (min. 6 characters)"
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
                        minLength={6}
                        required
                    />
                </div>

                {isSignup && (
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none focus:border-black"
                            minLength={6}
                            required
                        />
                    </div>
                )}

                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="text-sm text-green-600">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-zinc-800"
                >
                    {isSignup ? "Create Account" : "Login"}
                </button>

                <p className="text-center text-sm text-zinc-600">
                    {isSignup
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        onClick={switchMode}
                        className="font-semibold text-black underline underline-offset-4"
                    >
                        {isSignup ? "Login" : "Sign up"}
                    </button>
                </p>

                <p className="text-center text-xs text-zinc-400">
                    Demo authentication — account details are stored in this browser.
                </p>
            </form>
        </main>
    );
}
