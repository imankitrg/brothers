"use client";
import youtube from "@/assets/youtube";

// Converts any YouTube link (youtu.be, watch?v=, or /embed/) into a valid iframe embed URL
function getEmbedUrl(url) {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className="flex flex-wrap gap-5">
                {youtube.map((item) => (
                    <div key={item.name}>
                        <p>{item.name}</p>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                            watch
                        </a>
                        {/* embed youtube video */}
                        <iframe
                            src={getEmbedUrl(item.url)}
                            title={item.name || "YouTube video player"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            width="560"
                            height="315"
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
}