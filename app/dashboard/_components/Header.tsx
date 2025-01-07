
import { UserButton } from '@clerk/clerk-react';
import { Menu, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import DropdownMenu from "./DropdownMenu";
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();
  return (
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className="sm:hidden text-xl font-bold text-primary text-center w-full">
        <Image src={'/logo.svg'} alt='logo' width={120} height={100} 
        onClick={() => router.push("/dashboard")} />
      </div>
      <div className="sm:hidden mr-5">
        <DropdownMenu />
      </div>
      <div className='hidden sm:flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white'>
        <Search/>
        <input type="text" placeholder='Search...' className='outline-none'/>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='bg-primary  p-1 rounded-full text-xs text-white px-2 hidden sm:block'>
          🔥Join Membership just for ₹100/Month</h2>
        <UserButton/>
      </div>
    </div>
  )
}

export default Header