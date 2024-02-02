"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}


const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "عکس را وارد کنید"
    })
})

const ImageForm: React.FC<ImageFormProps> = ({
    initialData,
    courseId
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current)
    const router = useRouter();
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("ویرایش با موفقیت انجام شد");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        }
    };
    
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                عکس دوره
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>انصراف</>
                    )}
                    {!isEditing && !initialData?.imageUrl && (
                        <>
                            افزودن عکس
                            <PlusCircle className="h-4 w-4 mr-2" />
                        </>
                    )}
                    {!isEditing && initialData?.imageUrl && (
                        <>
                            ویرایش
                            <Pencil className="h-4 w-4 mr-2" />
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData?.imageUrl}
                        />
                    </div>
                )
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                    />
                </div>
            )}
        </div>
     );
}
 
export default ImageForm;