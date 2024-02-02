"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";

interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}


const formSchema = z.object({
    url: z.string().min(1),
})

const AttachmentForm: React.FC<AttachmentFormProps> = ({
    initialData,
    courseId
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter();
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("ویرایش با موفقیت انجام شد");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        }
    };

    const onDelete = async (id: string) => {
        try {
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("با موفقیت حذف شد");
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        } finally {
            setDeletingId(null);
        }
    }
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                فایل های دوره
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>انصراف</>
                    )}
                    {!isEditing && (
                        <>
                            افزودن فایل
                            <PlusCircle className="h-4 w-4 mr-2" />
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            هنوز فایلی وجود تدارد
                        </p>
                    )}

                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                >
                                    <File className="h-4 w-4 ml-2 flex flex-shrink-0" />
                                    <p className="text-xs line-clamp-1">
                                        {attachment.name}
                                    </p>
                                    {deletingId === attachment.id && (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {deletingId !== attachment.id && (
                                        <button
                                            onClick={() => onDelete(attachment.id)}
                                            className="mr-auto hover:opacity-75 transition"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ url })
                            }
                        }}
                    />
                </div>
            )}
        </div>
     );
}
 
export default AttachmentForm;