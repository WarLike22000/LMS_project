"use client"

import toast from "react-hot-toast";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/useConfettiStore";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

const Actions: React.FC<ActionsProps> = ({
    disabled,
    courseId,
    isPublished
}) => {
    const confetti = useConfettiStore();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if(isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("این دوره منتشر نمیشود");
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("این دوره منتشر شد");
                confetti.onOpen();
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

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("دوره با موفقیت حذف شد");
            router.refresh();
            router.push(`/teacher/courses/`);
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
 
export default Actions;