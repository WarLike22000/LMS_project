"use client"

import toast from "react-hot-toast";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

const ChapterActions: React.FC<ChapterActionsProps> = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(isPublished) {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
                toast.success("این فصل منتشر نمیشود");
            } else {
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
                toast.success("این فصل منتشر شد");
            }

            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        } finally {
            setIsLoading(false);
        }
    };
    
    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

            toast.success("فصل با موفقیت حذف شد");
            router.refresh();
            router.push(`/teacher/courses/${courseId}`);
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        } finally {
            setIsLoading(false);
        }
    }
    
    return ( 
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "منتشر نشود" : "منتشر شود"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button variant="destructive" size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
     );
}
 
export default ChapterActions;