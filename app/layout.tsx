import type { Metadata } from "next";

import { Montserrat, Crimson_Pro, Cutive, Croissant_One, Cantata_One, Bungee } from "next/font/google";
import "./globals.css";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
});

const cutive = Cutive({
  variable: "--font-cutive",
  weight: "400",
  subsets: ["latin"],
});

const croissantOne = Croissant_One({
  variable: "--font-croissant-one",
  weight: "400",
  subsets: ["latin"],
});

const cantataOne = Cantata_One({
  variable: "--font-cantata-one",
  weight: "400" ,
  subsets: ["latin"],
});

const bungee = Bungee({
  variable: "--font-bungee",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrimeEventify",
  description: "Created By Alif Hossain ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${crimsonPro.variable} ${cutive.variable} ${croissantOne.variable} ${cantataOne.variable} ${bungee.variable} antialiased`}
      >
        
        <Header />
        {children}
        <Footer />
             </body>
    </html>
    </ClerkProvider>
  );
}
