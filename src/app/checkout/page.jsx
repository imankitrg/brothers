
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DELIVERY_CHARGE = 49;

const initialForm = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
};

export default function CheckoutPage() {
    const router = useRouter();

    const [cart, setCart] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        try {
            const savedCart = JSON.parse(
                localStorage.getItem("cart") || "[]"
            );

            setCart(Array.isArray(savedCart) ? savedCart : []);

            const savedCheckout = JSON.parse(
                localStorage.getItem("checkoutDetails") || "null"
            );

            if (savedCheckout) {
                setForm({ ...initialForm, ...savedCheckout });
            }
        } catch {
            setCart([]);
        } finally {
            setReady(true);
        }
    }, []);

    const subtotal = cart.reduce((total, item) => {
        return total + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);

    const delivery = subtotal === 0 || subtotal >= 999 ? 0 : DELIVERY_CHARGE;
    const total = subtotal + delivery;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!form.firstName.trim()) {
            nextErrors.firstName = "First name is required";
        }

        if (!form.lastName.trim()) {
            nextErrors.lastName = "Last name is required";
        }

        if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
            nextErrors.phone = "Enter a valid 10-digit Indian mobile number";
        }

        if (
            form.email.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
        ) {
            nextErrors.email = "Enter a valid email address";
        }

        if (!form.address.trim()) {
            nextErrors.address = "Delivery address is required";
        }

        if (!form.city.trim()) {
            nextErrors.city = "City is required";
        }

        if (!form.state.trim()) {
            nextErrors.state = "State is required";
        }

        if (!/^\d{6}$/.test(form.pincode.trim())) {
            nextErrors.pincode = "Enter a valid 6-digit pincode";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleContinue = (event) => {
        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty. Please add a product first.");
            router.push("/product");
            return;
        }

        if (!validateForm()) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        setLoading(true);

        try {
            const checkoutDetails = {
                ...form,
                phone: form.phone.trim(),
                email: form.email.trim(),
                address: form.address.trim(),
                city: form.city.trim(),
                state: form.state.trim(),
                pincode: form.pincode.trim(),
                subtotal,
                delivery,
                total,
                updatedAt: new Date().toISOString(),
            };

            localStorage.setItem(
                "checkoutDetails",
                JSON.stringify(checkoutDetails)
            );

            router.push("/payment");
        } catch {
            alert("Unable to save checkout details. Please try again.");
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

    const labelClass = "mb-2 block text-sm font-medium text-gray-700";

    const renderField = (
        name,
        label,
        placeholder,
        options = {}
    ) => (
        <div className={options.className || ""}>
            <label className={labelClass} htmlFor={name}>
                {label}
                {options.required !== false && (
                    <span className="text-red-500"> *</span>
                )}
            </label>

            <input
                id={name}
                name={name}
                type={options.type || "text"}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                required={options.required !== false}
                autoComplete={options.autoComplete}
                maxLength={options.maxLength}
                inputMode={options.inputMode}
                className={`${inputClass} ${errors[name] ? "border-red-500" : ""
                    }`}
            />

            {errors[name] && (
                <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
            )}
        </div>
    );

    if (!ready) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-gray-500">Loading checkout...</p>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
                <div className="mb-4 text-5xl">🛒</div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Your cart is empty
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Add some products before proceeding to checkout.
                </p>
                <Link
                    href="/product"
                    className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Explore Products
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <Link
                        href="/cart"
                        className="text-sm text-gray-500 hover:text-black"
                    >
                        ← Back to Cart
                    </Link>

                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                        Checkout
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Enter your delivery details to continue to payment.
                    </p>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
                    <form
                        onSubmit={handleContinue}
                        className="space-y-6"
                    >
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                                    <span className="text-lg">👤</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Contact Information
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Who should we contact about your order?
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                {renderField("firstName", "First Name", "First name", {
                                    autoComplete: "given-name",
                                })}

                                {renderField("lastName", "Last Name", "Last name", {
                                    autoComplete: "family-name",
                                })}

                                {renderField("phone", "Mobile Number", "10-digit mobile number", {
                                    type: "tel",
                                    inputMode: "numeric",
                                    maxLength: 10,
                                    autoComplete: "tel-national",
                                })}

                                {renderField("email", "Email Address", "you@example.com", {
                                    type: "email",
                                    required: false,
                                    autoComplete: "email",
                                })}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                                    <span className="text-lg">📍</span>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Delivery Address
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Where should we deliver your order?
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {renderField(
                                    "address",
                                    "House No. / Street / Area",
                                    "Enter your full address",
                                    { autoComplete: "street-address" }
                                )}

                                {renderField(
                                    "landmark",
                                    "Landmark (Optional)",
                                    "Nearby landmark",
                                    { required: false }
                                )}

                                <div className="grid gap-5 sm:grid-cols-2">
                                    {renderField("city", "City", "Enter city", {
                                        autoComplete: "address-level2",
                                    })}

                                    {renderField("state", "State", "Enter state", {
                                        autoComplete: "address-level1",
                                    })}

                                    {renderField("pincode", "PIN Code", "6-digit PIN code", {
                                        inputMode: "numeric",
                                        maxLength: 6,
                                        autoComplete: "postal-code",
                                    })}
                                </div>
                            </div>
                        </section>

                        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4">
                            <span className="text-lg">🔒</span>
                            <p className="text-xs leading-5 text-gray-500">
                                This is a frontend-only demo checkout. Your details are
                                stored in this browser for the demo flow and are not sent
                                to a payment provider.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Continuing..." : "Continue to Payment →"}
                        </button>
                    </form>

                    <aside className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Summary
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {cart.reduce(
                                (count, item) => count + Number(item.quantity || 1),
                                0
                            )}{" "}
                            item(s) in your cart
                        </p>

                        <div className="mt-5 max-h-80 space-y-4 overflow-y-auto">
                            {cart.map((item, index) => (
                                <div
                                    key={item.id ?? index}
                                    className="flex gap-3"
                                >
                                    <div className="flex h-20 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name || "Product"}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-2xl">📦</span>
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-medium text-gray-900">
                                            {item.name || "Product"}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            Qty: {Number(item.quantity || 1)}
                                        </p>
                                        <p className="mt-2 text-sm font-semibold text-gray-900">
                                            ₹
                                            {(
                                                Number(item.price || 0) *
                                                Number(item.quantity || 1)
                                            ).toLocaleString("en-IN")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 text-sm">
                            <div className="flex justify-between gap-3">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-900">
                                    ₹{subtotal.toLocaleString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between gap-3">
                                <span className="text-gray-500">Delivery</span>
                                <span className="font-medium text-gray-900">
                                    {delivery === 0
                                        ? "FREE"
                                        : `₹${delivery.toLocaleString("en-IN")}`}
                                </span>
                            </div>

                            {subtotal > 0 && subtotal < 999 && (
                                <p className="text-xs text-gray-500">
                                    Add ₹{(999 - subtotal).toLocaleString("en-IN")} more
                                    for free delivery.
                                </p>
                            )}

                            <div className="flex justify-between border-t border-gray-200 pt-4 text-base">
                                <span className="font-semibold text-gray-900">
                                    Total
                                </span>
                                <span className="text-lg font-bold text-gray-900">
                                    ₹{total.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>

                        <div className="mt-5 rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-500">
                            Demo shipping policy: delivery is ₹49 below ₹999 and free
                            for orders of ₹999 or more.
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
