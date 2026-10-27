"use client";

import Link from "next/link";

export default function Footer() {
    const policyLinks = [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Return Policy", href: "/return-policy" },
        { name: "Shipping Policy", href: "/shipping-policy" },
    ];

    return (
        <footer className="bg-zinc-50 border-t border-zinc-200 text-zinc-600 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
                    {/* Brand & Contact */}
                    <div className="space-y-2 max-w-sm">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-bold text-base tracking-tight text-zinc-900 hover:opacity-80 transition-opacity"
                        >
                            <span className="w-2 h-2 rounded-full bg-zinc-900" />
                            <span>brothers store</span>
                        </Link>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            Minimalist design meets everyday comfort. Built for modern streetwear and daily wear.
                        </p>
                        <p className="text-xs text-zinc-500 pt-1">
                            Need help?{" "}
                            <a
                                href="mailto:brothers@example.com"
                                className="font-medium text-zinc-700 underline underline-offset-2 hover:text-zinc-950 transition-colors"
                            >
                                brothers@example.com
                            </a>
                        </p>
                    </div>

                    {/* Policies & Links */}
                    <div className="flex flex-col items-center md:items-end gap-2.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            Policies & Legal
                        </span>
                        <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-5 gap-y-2 text-xs">
                            {policyLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="py-1 text-zinc-500 hover:text-zinc-900 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Copyright */}
                <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 text-center sm:text-left">
                    <p>© 2026 Brothers Store. All rights reserved.</p>
                    <p className="text-[11px] text-zinc-400">
                        Premium Everyday Wear
                    </p>
                </div>
            </div>
        </footer>
    );
}