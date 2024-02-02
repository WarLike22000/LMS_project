"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import MuxPlayer from "@mux/mux-player-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";

interface ChapterVideoFormProps {
    initialData: Chapter & {
        muxData?: MuxData | null;
    };
    courseId: string;
    chapterId: string;
}


const formSchema = z.object({
    videoUrl: z.string().min(1),
})

const ChapterVideoForm: React.FC<ChapterVideoFormProps> = ({
    initialData,
    courseId,
    chapterId
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
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
                ویدیو فصل
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>انصراف</>
                    )}
                    {!isEditing && !initialData?.videoUrl && (
                        <>
                            افزودن ویدیو
                            <PlusCircle className="h-4 w-4 mr-2" />
                        </>
                    )}
                    {!isEditing && initialData?.videoUrl && (
                        <>
                            ویرایش
                            <Pencil className="h-4 w-4 mr-2" />
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <MuxPlayer
                            playbackId={initialData?.muxData?.playbackId || ""}
                        />
                    </div>
                )
            )}

            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="chapterVideo"
                        onChange={(url) => {
                            if (url) {
                                onSubmit({ videoUrl: url })
                            }
                        }}
                    />
                </div>
            )}
        </div>
     );
}
 
export default ChapterVideoForm;