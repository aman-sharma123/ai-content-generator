"use client"
import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



interface PROPS {
    params: {
        'template-slug': string
    }
}

function createNewContent(props: PROPS) {

    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['template-slug'])
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { user } = useUser();
    const router = useRouter();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext)

    const [dialogOpen, setDialogOpen] = useState(false);

    /* Used to generate content from AI*/

    const GenerateAIContent = async (formData: any) => {
        if (totalUsage >= 10000 && !userSubscription) {
            setDialogOpen(true);
            return;
        }
        setLoading(true);
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const FinalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;
        const result = await chatSession.sendMessage(FinalAIPrompt);

        setAiOutput(result?.response.text());
        await SaveInDb(JSON.stringify(formData), selectedTemplate?.slug, result?.response.text())
        setLoading(false);

        setUpdateCreditUsage(Date.now())
    }

    const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            FormData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/YYYY'),
        });

        console.log(result);
    }

    return (
        <div className='p-5'>
            <Link href={"/dashboard"}>
                <Button> <ArrowLeft /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                {/* FormSection */}
                <FormSection selectedTemplate={selectedTemplate}
                    userFormInput={(v: any) => GenerateAIContent(v)}
                    loading={loading} />
                {/* OutputSection */}
                <div className='col-span-2'>
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Credit Limit Reached</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have reached your credits limit. Please upgrade your plan or go back to continue.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Button
                            onClick={() => setDialogOpen(false)}
                            variant="outline"
                            className="mr-2"
                        >
                            Go Back
                        </Button>
                        <Button
                            onClick={() => router.push("/dashboard/billing")}
                            className="bg-purple-600 text-white hover:bg-purple-700"
                        >
                            Upgrade
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}


export default createNewContent