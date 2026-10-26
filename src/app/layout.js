
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SerwistProvider } from "./serwist";

export const metadata = {
  title: "Brothers Store",
  description: "Brothers Store",
  applicationName: "Brothers Store",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Brothers Store",
  },
};

export const viewport = {
  themeColor: "#111827",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen pb-20 md:pb-0">
        <SerwistProvider swUrl="/sw.js">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SerwistProvider>
      </body>
    </html>
  );
}

