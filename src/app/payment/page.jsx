
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PAYMENT_METHODS = [
    { id: "upi", label: "UPI QR Code", description: "Scan a QR code to pay", icon: "▦" },
    { id: "phonepe", label: "PhonePe", description: "Simulated UPI payment", icon: "🟣" },
    { id: "gpay", label: "Google Pay", description: "Simulated UPI payment", icon: "🔵" },
    { id: "other-upi", label: "Other UPI App", description: "Enter a demo UPI ID", icon: "📱" },
    { id: "card", label: "Credit / Debit Card", description: "Visa, Mastercard and more", icon: "💳" },
    { id: "cod", label: "Cash on Delivery", description: "Pay when your order arrives", icon: "💵" },
];

export default function PaymentPage() {
    const router = useRouter();

    const [checkout, setCheckout] = useState(null);
    const [cart, setCart] = useState([]);
    const [method, setMethod] = useState("upi");
    const [upiId, setUpiId] = useState("");
    const [card, setCard] = useState({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        try {
            const savedCheckout = JSON.parse(
                localStorage.getItem("checkoutDetails") || "null"
            );
            const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

            if (savedCheckout) setCheckout(savedCheckout);
            if (Array.isArray(savedCart)) setCart(savedCart);
        } catch {
            setError("Unable to load checkout details.");
        }
    }, []);

    const total =
        Number(checkout?.total) ||
        cart.reduce(
            (sum, item) =>
                sum + Number(item.price || 0) * Number(item.quantity || 1),
            0
        );

    const formatPrice = (amount) =>
        `₹${Number(amount).toLocaleString("en-IN")}`;

    const updateCard = (event) => {
        const { name, value } = event.target;
        setCard((previous) => ({ ...previous, [name]: value }));
    };

    const validatePayment = () => {
        if (!checkout || cart.length === 0) {
            setError("Your checkout or cart details are missing. Please return to checkout.");
            return false;
        }

        if (method === "other-upi") {
            if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
                setError("Enter a demo UPI ID, for example demo@upi.");
                return false;
            }
        }

        if (method === "card") {
            const digits = card.number.replace(/\s/g, "");

            if (card.name.trim().length < 2) {
                setError("Enter the cardholder name.");
                return false;
            }

            if (!/^\d{16}$/.test(digits)) {
                setError("Enter a 16-digit demo card number.");
                return false;
            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
                setError("Enter expiry in MM/YY format.");
                return false;
            }

            if (!/^\d{3,4}$/.test(card.cvv)) {
                setError("Enter a 3 or 4 digit demo CVV.");
                return false;
            }
        }

        return true;
    };

    const placeOrder = (status, paymentStatus) => {
        const orderId = `BR-${Date.now().toString().slice(-8)}`;

        const order = {
            orderId,
            items: cart,
            customer: checkout,
            total,
            paymentMethod: method,
            paymentStatus,
            orderStatus: status === "success" ? "Confirmed" : status === "cod" ? "Confirmed" : "Payment Failed",
            createdAt: new Date().toISOString(),
        };

        try {
            const existingOrders = JSON.parse(
                localStorage.getItem("demoOrders") || "[]"
            );

            const orders = Array.isArray(existingOrders) ? existingOrders : [];
            localStorage.setItem(
                "demoOrders",
                JSON.stringify([order, ...orders])
            );

            if (status === "success" || status === "cod") {
                localStorage.removeItem("cart");
            }

            setResult({
                status,
                orderId,
                paymentStatus,
            });
        } catch {
            setError("Could not save your demo order. Please try again.");
        }
    };

    const handlePayment = (event) => {
        event.preventDefault();
        setError("");

        if (!validatePayment()) return;

        // This is a simulation only. No real payment is initiated.
        if (method === "upi") {
            setResult({ status: "qr", orderId: null });
            return;
        }

        setProcessing(true);

        window.setTimeout(() => {
            setProcessing(false);

            if (method === "cod") {
                placeOrder("cod", "Cash on Delivery");
            } else {
                // Demo rule: simulate success.
                placeOrder("success", "Paid (Demo)");
            }
        }, 900);
    };

    const simulateQrResult = (success) => {
        if (success) {
            placeOrder("success", "Paid (Demo)");
        } else {
            placeOrder("failed", "Failed (Demo)");
        }
    };

    if (result?.status === "qr") {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-12">
                <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                    <button
                        onClick={() => setResult(null)}
                        className="mb-6 text-sm text-gray-500 hover:text-black"
                    >
                        ← Back to payment methods
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900">Scan to Pay</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Demo QR only — this QR does not accept real payments.
                    </p>

                    <div className="mx-auto my-6 flex h-56 w-56 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                        <div className="text-center">
                            <div className="text-7xl">▦</div>
                            <p className="mt-3 text-xs text-gray-500">
                                DEMO QR — NOT FOR PAYMENT
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500">Demo amount</p>
                    <p className="mt-1 text-3xl font-bold">{formatPrice(total)}</p>

                    <div className="mt-6 grid gap-3">
                        <button
                            onClick={() => simulateQrResult(true)}
                            className="rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            Simulate Payment Success
                        </button>
                        <button
                            onClick={() => simulateQrResult(false)}
                            className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Simulate Payment Failure
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    if (result && result.status !== "qr") {
        const success =
            result.status === "success" || result.status === "cod";

        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                        {success ? "✓" : "✕"}
                    </div>

                    <h1 className="mt-5 text-2xl font-bold text-gray-900">
                        {success
                            ? result.status === "cod"
                                ? "Order Placed!"
                                : "Demo Payment Successful!"
                            : "Demo Payment Failed"}
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {success
                            ? "Your demo order has been saved in this browser."
                            : "No money was charged. You can return and try again."}
                    </p>

                    <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-left">
                        <div className="flex justify-between gap-3 text-sm">
                            <span className="text-gray-500">Order ID</span>
                            <span className="font-semibold">{result.orderId}</span>
                        </div>
                        <div className="mt-3 flex justify-between gap-3 text-sm">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-semibold">{formatPrice(total)}</span>
                        </div>
                        <div className="mt-3 flex justify-between gap-3 text-sm">
                            <span className="text-gray-500">Payment status</span>
                            <span className="font-semibold">{result.paymentStatus}</span>
                        </div>
                    </div>

                    {success ? (
                        <button
                            onClick={() => router.push("/profile")}
                            className="mt-6 w-full rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                        >
                            View Orders in Profile
                        </button>
                    ) : (
                        <div className="mt-6 grid gap-3">
                            <button
                                onClick={() => setResult(null)}
                                className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => router.push("/profile")}
                                className="w-full rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700"
                            >
                                View Profile
                            </button>
                        </div>
                    )}

                    <p className="mt-5 text-xs text-gray-400">
                        Frontend demo only. No real transaction was made.
                    </p>
                </div>
            </main>
        );
    }

    if (!checkout || cart.length === 0) {
        return (
            <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Checkout details not found
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Please return to checkout and confirm your details.
                </p>
                <Link
                    href="/checkout"
                    className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
                >
                    Back to Checkout
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/checkout"
                    className="text-sm text-gray-500 hover:text-black"
                >
                    ← Back to Checkout
                </Link>

                <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    Choose Payment Method
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Select how you want to complete your demo order.
                </p>

                <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
                    <form onSubmit={handlePayment} className="space-y-3">
                        {PAYMENT_METHODS.map((item) => (
                            <label
                                key={item.id}
                                className={`flex cursor-pointer items-center gap-4 rounded-2xl border bg-white p-4 transition ${method === item.id
                                        ? "border-black ring-1 ring-black"
                                        : "border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={item.id}
                                    checked={method === item.id}
                                    onChange={() => {
                                        setMethod(item.id);
                                        setError("");
                                    }}
                                    className="h-4 w-4 accent-black"
                                />

                                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xl">
                                    {item.icon}
                                </span>

                                <span className="min-w-0 flex-1">
                                    <span className="block text-sm font-semibold text-gray-900">
                                        {item.label}
                                    </span>
                                    <span className="mt-1 block text-xs text-gray-500">
                                        {item.description}
                                    </span>
                                </span>
                            </label>
                        ))}

                        {method === "other-upi" && (
                            <div className="rounded-2xl border border-gray-200 bg-white p-4">
                                <label htmlFor="upiId" className="mb-2 block text-sm font-medium">
                                    Demo UPI ID
                                </label>
                                <input
                                    id="upiId"
                                    value={upiId}
                                    onChange={(event) => setUpiId(event.target.value)}
                                    placeholder="demo@upi"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                                />
                            </div>
                        )}

                        {method === "card" && (
                            <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5">
                                <div className="rounded-xl bg-gray-900 p-5 text-white">
                                    <p className="text-xs text-gray-300">DEMO CARD</p>
                                    <p className="mt-5 text-lg tracking-widest">
                                        {card.number
                                            ? `•••• •••• •••• ${card.number.replace(/\s/g, "").slice(-4)}`
                                            : "•••• •••• •••• ••••"}
                                    </p>
                                    <div className="mt-4 flex justify-between gap-3 text-xs">
                                        <span>{card.name || "CARDHOLDER NAME"}</span>
                                        <span>{card.expiry || "MM/YY"}</span>
                                    </div>
                                </div>

                                <p className="text-xs leading-5 text-amber-700">
                                    Use fictional demo details only. Never enter a real card
                                    number, CVV or OTP.
                                </p>

                                <div>
                                    <label htmlFor="cardName" className="mb-2 block text-sm font-medium">
                                        Cardholder Name
                                    </label>
                                    <input
                                        id="cardName"
                                        name="name"
                                        value={card.name}
                                        onChange={updateCard}
                                        autoComplete="off"
                                        placeholder="Demo User"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium">
                                        Demo Card Number
                                    </label>
                                    <input
                                        id="cardNumber"
                                        name="number"
                                        value={card.number}
                                        onChange={(event) =>
                                            setCard((previous) => ({
                                                ...previous,
                                                number: event.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 16),
                                            }))
                                        }
                                        inputMode="numeric"
                                        autoComplete="off"
                                        placeholder="16-digit fictional number"
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="cardExpiry" className="mb-2 block text-sm font-medium">
                                            Expiry (MM/YY)
                                        </label>
                                        <input
                                            id="cardExpiry"
                                            name="expiry"
                                            value={card.expiry}
                                            onChange={updateCard}
                                            autoComplete="off"
                                            placeholder="12/30"
                                            maxLength={5}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm outline-none focus:border-black"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cardCvv" className="mb-2 block text-sm font-medium">
                                            Demo CVV
                                        </label>
                                        <input
                                            id="cardCvv"
                                            name="cvv"
                                            value={card.cvv}
                                            onChange={(event) =>
                                                setCard((previous) => ({
                                                    ...previous,
                                                    cvv: event.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 4),
                                                }))
                                            }
                                            inputMode="numeric"
                                            autoComplete="off"
                                            placeholder="123"
                                            maxLength={4}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-3 text-sm outline-none focus:border-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {method === "upi" && (
                            <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
                                A clearly labelled demo QR will appear on the next step.
                                It cannot initiate a real UPI transaction.
                            </div>
                        )}

                        {method === "cod" && (
                            <div className="rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                                This will create a simulated Cash on Delivery order. No
                                payment will be collected by this demo.
                            </div>
                        )}

                        {error && (
                            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-60"
                        >
                            {processing
                                ? "Processing Demo..."
                                : method === "cod"
                                    ? "Place Demo Order"
                                    : method === "upi"
                                        ? "Continue to Demo QR"
                                        : `Pay ${formatPrice(total)} (Demo)`}
                        </button>

                        <p className="text-center text-xs leading-5 text-gray-400">
                            Simulation only. No actual payment, bank verification or
                            card processing takes place.
                        </p>
                    </form>

                    <aside className="rounded-2xl border border-gray-200 bg-white p-5">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Summary
                        </h2>

                        <div className="mt-4 space-y-4">
                            {cart.map((item, index) => (
                                <div key={item.id ?? index} className="flex justify-between gap-3 text-sm">
                                    <span className="text-gray-600">
                                        {item.name} × {Number(item.quantity || 1)}
                                    </span>
                                    <span className="shrink-0 font-medium">
                                        {formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 space-y-3 border-t border-gray-200 pt-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>{formatPrice(checkout.subtotal ?? total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery</span>
                                <span>{Number(checkout.delivery) === 0 ? "FREE" : formatPrice(checkout.delivery || 0)}</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-bold">
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <div className="mt-5 border-t border-gray-200 pt-4">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Delivering to
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {checkout.firstName} {checkout.lastName}
                                <br />
                                {checkout.address}
                                {checkout.landmark ? `, ${checkout.landmark}` : ""}
                                <br />
                                {checkout.city}, {checkout.state} - {checkout.pincode}
                                <br />
                                {checkout.phone}
                            </p>
                        </div>

                        <Link
                            href="/checkout"
                            className="mt-5 block text-center text-sm font-medium text-gray-600 hover:text-black"
                        >
                            Edit delivery details
                        </Link>
                    </aside>
                </div>
            </div>
        </main>
    );
}
