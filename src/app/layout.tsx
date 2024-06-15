import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./../styles/globals.css";

const font = Roboto_Condensed({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Выбирай машину",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
      <StoreProvider>
        <body className={font.className}>{children}</body>
      </StoreProvider>
    </html>
  );
}
