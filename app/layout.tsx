import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Provider } from "react-redux";
import ReduxProvider from "@/components/provider/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetTanda",
  description: "Watch movies for free.",
  icons: {
    icon: "/pexels-fwstudio-129731.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="bg-[#fff] h-screen w-[100vw] overflow-x-hidden">
            {children}
          </main>
        </body>
      </html>
    </ReduxProvider>
  );
}
