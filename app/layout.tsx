import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bevysquare CRUD",
  description: "Next.js Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <nav className="border-b border-gray-200 p-4 mb-6">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-lg">
              BevySquare
            </Link>
            <Link href="/users" className="text-sm underline">
              Users List
            </Link>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 pb-12">{children}</main>
      </body>
    </html>
  );
}
