
export default function manifest() {
    return {
        id: "/",
        name: "Brothers Store",
        short_name: "Brothers",
        description: "Brothers Store - Shop online",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#111827",
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
