"use client"
import { SignIn } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return(
    <div className='flex items-center justify-center h-screen'>
        <SignIn forceRedirectUrl="/dashboard"/>
    </div>
  )
}