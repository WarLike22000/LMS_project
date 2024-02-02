"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "./ChapterList";

interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
}


const formSchema = z.object({
    title: z.string().min(1),
})

const ChaptersForm: React.FC<ChaptersFormProps> = ({
    initialData,
    courseId
}) => {

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    
    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };
    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    })

    const { isSubmitting, isValid } = form.formState;
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast.success("فصل جدید ایجاد شد");
            toggleCreating();
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        }
    };

    const onReorder = async (updateData: { id: string, position: number }[]) => {
        try {
            setIsUpdating(true);

            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            });
            toast.success("Chapters reordered")
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        } finally {
            setIsUpdating(false);
        }
    };

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    };
    
    return ( 
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                فصل های دوره
                <Button onClick={toggleCreating} variant="ghost">
                    {isCreating ? (
                        <>انصراف</>
                    ) : (
                        <>
                            فصل جدید
                            <PlusCircle className="h-4 w-4 mr-2" />
                        </>
                    )}
                </Button>
            </div>

            {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="عنوان"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            ایجاد
                        </Button>
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "فصلی وجود ندارد"}
                    <ChaptersList
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    برای جابجایی فصل ها میتوانید آنها را بکشید
                </p>
            )}
        </div>
     );
}
 
export default ChaptersForm;