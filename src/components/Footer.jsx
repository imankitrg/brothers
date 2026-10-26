"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 px-6 py-8 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-zinc-500">
                    <p>© 2026 Brothers Store. All rights reserved.</p>
                    <p>Contact: brothers@example.com</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-500">
                    <Link className="hover:text-zinc-900 transition-colors" href="/privacy-policy">
                        Privacy Policy
                    </Link>
                    <Link className="hover:text-zinc-900 transition-colors" href="/terms-of-service">
                        Terms of Service
                    </Link>
                    <Link className="hover:text-zinc-900 transition-colors" href="/return-policy">
                        Return Policy
                    </Link>
                    <Link className="hover:text-zinc-900 transition-colors" href="/shipping-policy">
                        Shipping Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
}