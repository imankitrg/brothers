
export const products = [
    {
        id: "9",
        slug: "vintage-baggy-denim",
        sku: "DEN-009",
        name: "Vintage Baggy Denim",
        brand: "AKTK",
        description:
            "Relaxed 90s baggy fit jeans with a custom washed finish and durable brass zip.",

        category: "men",
        subcategory: "jeans",
        gender: "men",

        price: 2199,
        originalPrice: 2799,
        currency: "INR",

        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80"
        ],

        variants: [
            {
                sku: "DEN-009-BLUE-30",
                size: "30",
                color: "Washed Blue",
                colorHex: "#7893A8",
                stock: 2
            },
            {
                sku: "DEN-009-BLUE-32",
                size: "32",
                color: "Washed Blue",
                colorHex: "#7893A8",
                stock: 3
            },
            {
                sku: "DEN-009-BLACK-34",
                size: "34",
                color: "Black",
                colorHex: "#222222",
                stock: 2
            }
        ],

        material: "Denim Cotton",
        fit: "Baggy Fit",
        care: ["Machine wash cold", "Wash inside out", "Do not bleach"],

        tags: ["denim", "baggy", "casual"],

        isFeatured: true,
        isNew: true,

        rating: 4.5,
        reviewCount: 12
    },

    {
        id: "10",
        slug: "classic-oversized-tshirt",
        sku: "TSH-010",
        name: "Classic Oversized T-Shirt",
        brand: "AKTK",
        description:
            "A relaxed everyday oversized T-shirt with a clean, minimal look.",

        category: "men",
        subcategory: "t-shirts",
        gender: "men",

        price: 899,
        originalPrice: 1199,
        currency: "INR",

        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80"
        ],

        variants: [
            {
                sku: "TSH-010-BLK-M",
                size: "M",
                color: "Black",
                colorHex: "#222222",
                stock: 5
            },
            {
                sku: "TSH-010-WHT-L",
                size: "L",
                color: "White",
                colorHex: "#F5F5F5",
                stock: 4
            },
            {
                sku: "TSH-010-BLK-XL",
                size: "XL",
                color: "Black",
                colorHex: "#222222",
                stock: 3
            }
        ],

        material: "Cotton",
        fit: "Oversized",
        care: ["Machine wash cold", "Do not bleach"],

        tags: ["t-shirt", "oversized", "casual"],

        isFeatured: true,
        isNew: false,

        rating: 4.3,
        reviewCount: 8
    },

    {
        id: "11",
        slug: "women-everyday-top",
        sku: "WTP-011",
        name: "Women's Everyday Top",
        brand: "AKTK",
        description:
            "A versatile everyday top designed for a comfortable and effortless look.",

        category: "women",
        subcategory: "tops",
        gender: "women",

        price: 1299,
        originalPrice: 1599,
        currency: "INR",

        images: [
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
        ],

        variants: [
            {
                sku: "WTP-011-BLK-S",
                size: "S",
                color: "Black",
                colorHex: "#222222",
                stock: 4
            },
            {
                sku: "WTP-011-WHT-M",
                size: "M",
                color: "White",
                colorHex: "#F5F5F5",
                stock: 6
            }
        ],

        material: "Cotton Blend",
        fit: "Regular Fit",
        care: ["Gentle machine wash", "Do not bleach"],

        tags: ["women", "top", "casual"],

        isFeatured: false,
        isNew: true,

        rating: 4.4,
        reviewCount: 6
    },

    {
        id: "12",
        slug: "classic-ethnic-kurta",
        sku: "KUR-012",
        name: "Classic Ethnic Kurta",
        brand: "AKTK",
        description:
            "A classic ethnic kurta suitable for festive occasions and everyday wear.",

        category: "ethnic",
        subcategory: "kurtas",
        gender: "men",

        price: 1799,
        originalPrice: 2199,
        currency: "INR",

        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
        ],

        variants: [
            {
                sku: "KUR-012-WHT-M",
                size: "M",
                color: "White",
                colorHex: "#F5F5F5",
                stock: 3
            },
            {
                sku: "KUR-012-BLK-L",
                size: "L",
                color: "Black",
                colorHex: "#222222",
                stock: 2
            }
        ],

        material: "Cotton Blend",
        fit: "Regular Fit",
        care: ["Hand wash recommended", "Do not bleach"],

        tags: ["ethnic", "kurta", "festive"],

        isFeatured: true,
        isNew: false,

        rating: 4.6,
        reviewCount: 10
    }
];
