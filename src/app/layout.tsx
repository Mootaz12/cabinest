import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CabiNest",
  description:
    "CabinNest is a cabin and lodge management system that streamlines reservations, guest check-ins, and maintenance tasks. It’s designed to make managing your properties easy and efficient, ensuring a smooth experience for both you and your guests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gray flex flex-row gap-x-2`}
      >
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
