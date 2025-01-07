"use client";

import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function billing() {

  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const router = useRouter();
  
  const handleActivePlanClick = () => {
    router.push("/dashboard"); // Redirect to /dashboard
  };

  const CreateSubscription = async () => {
    setLoading(true)
    try {
      const response = await axios.post("/api/create-subscription", {});
      const { id: subscriptionId } = response.data;
      OnPayment(subscriptionId);
    } catch (error) {
      console.error("Error creating subscription:", error);
      setLoading(false);
    }
  };

  const OnPayment = (subId: string) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": 'Ai Guru',
      description: 'Monthly Subscription',
      handler: async (resp: any) => {
        console.log("Payment successful:",resp);
        await SaveSubscription(resp?.razorpay_payment_id);
        setLoading(false);
      },
      prefill: {
        name: user?.fullName || "User",
        email: user?.primaryEmailAddress?.emailAddress || "user@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open()
  };

  const SaveSubscription = async (paymentId: string) => {
    try{
    const result = await db.insert(UserSubscription)
      .values({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        active: true,
        paymentId: paymentId,
        joinDate: moment().format('DD/MM/yyyy')
      });
    console.log("Subscription saved:", result);
    if (result) {
      window.location.reload();
    }
   } catch (error) {
      console.error("Error saving subscription:", error);
    }
};

  return (
    <div>
      
      <div className="flex flex-col py-10 justify-center items-center min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Upgrade With Monthly Plan</h2>
        <div className="flex flex-col md:flex-row md:gap-10 gap-10">
          {/* Free Plan */}
          <div className="w-[300px] flex-wrap max-w-md:100px bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Free</h2>
            <p className="text-4xl font-bold mb-4">₹0 /month</p>
            <ul className="flex flex-col items-start space-y-2 text-gray-700 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> 10,000 Words/Month
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> 10+ Content Templates
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Unlimited Download & Copy
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> 1 Month of History
              </li>
            </ul>
            <button className="bg-gray-500 text-white py-2 px-4 rounded-md">Currently Active Plan</button>
          </div>

          {/* Monthly Plan */}
          <div className="w-[300px] flex-wrap bg-white shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Monthly</h2>
            <p className="text-4xl font-bold mb-4">₹100 /month</p>
            <ul className="flex flex-col items-start space-y-2 text-gray-700 mb-6">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> 1,00,000 Words/Month
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> 10+ Template Access
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> Unlimited Download & Copy
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span> 1 Year of History
              </li>
            </ul>
            <Button
              
              onClick={userSubscription ? handleActivePlanClick : CreateSubscription}
              className="bg-white text-purple-600 border border-purple-600 py-2 px-4 rounded-lg active:bg-purple-600 active:text-white"
            >
              {loading && <Loader2Icon className='animate-spin' />}
              {userSubscription?'Active Plan': 'Get Started'}
            </Button>  
          </div>
        </div>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </div>
    </div>
  );

}

export default billing