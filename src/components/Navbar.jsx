"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Minimalist inline icons
function HomeIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function ProductsIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    );
}

function OrdersIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    );
}

function CartIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

function CheckoutIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
    );
}

function UserIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function MenuIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}

function CloseIcon({ className = "w-5 h-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
        </svg>
    );
}

function ChevronRightIcon({ className = "w-4 h-4" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
        </svg>
    );
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setIsOpen(false);
    }

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Primary navigation links
    const desktopLinks = [
        { name: "Products", href: "/product" },
        { name: "Orders", href: "/order", icon: OrdersIcon },
        { name: "Cart", href: "/cart", icon: CartIcon },
        { name: "Checkout", href: "/checkout" },
        { name: "Profile", href: "/profile", icon: UserIcon },
    ];

    const mobileMenuGroups = [
        {
            title: "Shopping",
            items: [
                { name: "Home", href: "/", icon: HomeIcon, description: "Explore collections & featured styles" },
                { name: "Products", href: "/product", icon: ProductsIcon, description: "Browse all clothes and categories" },
                { name: "Cart", href: "/cart", icon: CartIcon, description: "View your shopping bag" },
                { name: "Checkout", href: "/checkout", icon: CheckoutIcon, description: "Secure fast checkout" },
                { name: "Profile", href: "/profile", icon: UserIcon, description: "View your profile" },
            ],
        },
        {
            title: "Account",
            items: [
                { name: "Login", href: "/auth", icon: UserIcon, description: "Access your account" },
                { name: "Register", href: "/auth", icon: UserIcon, description: "Create a new store account" },
            ],
        },
    ];

    const bottomDockItems = [
        { name: "Home", href: "/", icon: HomeIcon },
        { name: "Products", href: "/product", icon: ProductsIcon },
        { name: "Cart", href: "/cart", icon: CartIcon },
        { name: "Checkout", href: "/checkout", icon: CheckoutIcon },
        { name: "Account", href: "/profile", icon: UserIcon },
    ];

    const isActive = (href) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 md:h-16">
                        {/* Brand Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 group transition-opacity hover:opacity-85"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 group-hover:scale-125 transition-transform" />
                            <span className="font-extrabold text-lg md:text-xl tracking-tight text-zinc-900 lowercase">
                                brothers store
                            </span>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-medium">
                            {desktopLinks.map((link) => {
                                const active = isActive(link.href);
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${active
                                            ? "bg-zinc-900 text-white font-semibold shadow-xs"
                                            : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                                            }`}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        <span>{link.name}</span>
                                    </Link>
                                );
                            })}

                            <div className="h-4 w-px bg-zinc-200 mx-1.5" />

                            <Link
                                href="/temp_4"
                                className={`px-3 py-1.5 rounded-lg transition-colors ${isActive("/temp_4")
                                    ? "text-zinc-900 font-semibold bg-zinc-100"
                                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                                    }`}
                            >
                                Login
                            </Link>
                            <Link
                                href="/temp_5"
                                className="ml-1 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all shadow-xs hover:shadow-sm"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Mobile Top Controls: Quick Cart & Menu Toggle */}
                        <div className="flex md:hidden items-center gap-1">
                            <Link
                                href="/cart"
                                aria-label="Cart"
                                className={`p-2 rounded-lg transition-colors relative ${isActive("/cart")
                                    ? "text-zinc-900 bg-zinc-100"
                                    : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
                                    }`}
                            >
                                <CartIcon className="w-5 h-5" />
                            </Link>

                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={isOpen}
                                className="p-2 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                            >
                                {isOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown Drawer Menu */}
                {isOpen && (
                    <div className="md:hidden border-t border-zinc-200 bg-white/98 backdrop-blur-lg shadow-xl animate-in slide-in-from-top-2 duration-150">
                        <div className="max-w-7xl mx-auto px-4 py-3 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
                            {mobileMenuGroups.map((group) => (
                                <div key={group.title} className="space-y-1">
                                    <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                        {group.title}
                                    </p>
                                    <div className="space-y-0.5">
                                        {group.items.map((item) => {
                                            const active = isActive(item.href);
                                            const Icon = item.icon;
                                            return (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${active
                                                        ? "bg-zinc-900 text-white font-medium"
                                                        : "text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 active:bg-zinc-150"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={`p-1.5 rounded-lg ${active ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-600"
                                                                }`}
                                                        >
                                                            <Icon className="w-4 h-4" />
                                                        </span>
                                                        <div>
                                                            <div className="text-sm font-medium leading-none">{item.name}</div>
                                                            <div
                                                                className={`text-xs mt-0.5 ${active ? "text-zinc-300" : "text-zinc-400"
                                                                    }`}
                                                            >
                                                                {item.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ChevronRightIcon className={`w-4 h-4 ${active ? "text-zinc-400" : "text-zinc-400"}`} />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div className="pt-2 pb-1 border-t border-zinc-100 text-center text-xs text-zinc-400">
                                Brothers Store • Premium Everyday Wear
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Bottom Navigation Dock (Permanently sticky to mobile viewport) */}
            <nav
                aria-label="Mobile Navigation"
                className="fixed bottom-0 left-0 right-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] touch-manipulation select-none"
            >
                <div className="grid grid-cols-5 items-center justify-around max-w-md mx-auto">
                    {bottomDockItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-transform active:scale-95 ${active ? "text-zinc-950 font-semibold" : "text-zinc-500 hover:text-zinc-800"
                                    }`}
                            >
                                <span className={`p-1 rounded-md transition-colors ${active ? "bg-zinc-100" : ""}`}>
                                    <Icon className="w-5 h-5" />
                                </span>
                                <span className="text-[10px] tracking-tight mt-0.5 leading-tight">{item.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}