"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectToSignIn({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>; 
  }
  return <>{children}</>;
}
