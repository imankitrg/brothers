"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-6 py-3.5 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
                <Link className="font-bold text-xl tracking-tight text-zinc-900 hover:opacity-80 transition-opacity" href="/">
                    brothers store
                </Link>

                <div className="flex flex-wrap items-center gap-1.5 md:gap-3 text-sm font-medium">
                    <Link className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" href="/temp_1">
                        Products
                    </Link>
                    <Link className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" href="/temp_2">
                        Cart
                    </Link>
                    <Link className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" href="/temp_3">
                        Checkout
                    </Link>
                    <Link className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" href="/temp_4">
                        Login
                    </Link>
                    <Link className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" href="/temp_5">
                        Register
                    </Link>
                    <Link className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors" href="/temp_6">
                        Orders
                    </Link>
                </div>
            </div>
        </nav>
    );
}