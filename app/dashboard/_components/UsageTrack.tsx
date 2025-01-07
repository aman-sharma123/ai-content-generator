"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import { HistoryItem } from '../sideBar/HistoryTab';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';
import { useRouter } from 'next/navigation';

function UsageTrack() {
    const { user } = useUser();
    const router = useRouter();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
    const [maxWords, setMaxWords] = useState(10000);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            GetData();
            IsUserSubscribe();
        }
    }, [user]);

    useEffect(() => {
        if (user && updateCreditUsage) {
            GetData();
        }
    }, [updateCreditUsage, user]);

    // Function to get usage data
    const GetData = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        try {
            const rawResult = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

        const result: HistoryItem[] = rawResult.map((item) => ({
            id: item.id,
            FormData: item.FormData, // Map FormData to formData
            aiResponse: item.aiResponse || "",
            templateSlug: item.templateSlug || "",
            createdBy: item.createdBy || "",
            createdAt: item.createdAt || "",
        }));

        GetTotalUsage(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading after data fetch
        }
    };

    // Function to check user subscription status
    const IsUserSubscribe = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        try {
            const result = await db
                .select()
                .from(UserSubscription)
                .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress));

            if (result && result.length > 0) {
                setUserSubscription(true);
                setMaxWords(100000); // Assuming the user has a higher word limit if subscribed
            } else {
                setUserSubscription(false);
                setMaxWords(10000); // Default max words for non-subscribed users
            }
        } catch (error) {
            console.error('Error checking subscription:', error);
        }
    };

    // Function to calculate total usage from history items
    const GetTotalUsage = (result: HistoryItem[]) => {
        let total: number = 0;
        result.forEach((element) => {
            total += Number(element.aiResponse?.length || 0); // Safely handle missing aiResponse length
        });

        setTotalUsage(total);
        console.log('Total Usage:', total);
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    return (
        <div className="m-5">
            <div className="bg-primary text-white p-3 rounded-lg">
                <h2 className="font-medium">Credits</h2>
                <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
                    <div
                        className="h-2 bg-white rounded-full"
                        style={{
                            width: (totalUsage / maxWords) * 100 + "%",
                        }}
                    ></div>
                </div>
                <h2 className="text-sm my-2">
                    {totalUsage} / {maxWords} Credit Used
                </h2>
            </div>
            <Button
                onClick={() => router.push("/dashboard/billing")}
                variant={"secondary"}
                className="w-full my-3 text-primary"
            >
                Upgrade
            </Button>
        </div>
    );
}

export default UsageTrack;
