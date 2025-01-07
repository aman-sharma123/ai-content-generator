"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import RedirectToSignIn from "@/app/(auth)/RedirectToSignIn"

const geist = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const pathname = usePathname();

  // List of routes that require authentication
  const protectedRoutes = ["/dashboard", "/dashboard/billing", "/dashboard/settings"];

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname?.startsWith(route)
  );

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={'${geist.variable} ${geistMono.variable} antialiased'}
        >
          {/* Only protect certain routes */}
          {isProtectedRoute ? (
            <RedirectToSignIn>{children}</RedirectToSignIn>
          ) : (
            children
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
