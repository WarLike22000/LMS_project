"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/useConfettiStore";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButton {
    chapterId: string;
    courseId: string;
    nextChapterId?: string;
    isCompleted?: boolean;
}

const CourseProgressButton = ({
    chapterId,
    courseId,
    nextChapterId,
    isCompleted
}: CourseProgressButton) => {

    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);
    
    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted
            });

            if(!isCompleted && !nextChapterId) {
                confetti.onOpen();
            };

            if(!isCompleted && nextChapterId) {
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            };

            toast.success(!isCompleted ? "رو به جلو 😎" : "یه قدم به عقب 🔙")
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        } finally {
            setIsLoading(false);
        }
    };

    const Icon = isCompleted ? XCircle : CheckCircle;
    
    return ( 
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted? "outline" : "success"}
            className="w-full md:w-auto"
        >
            {isCompleted ? "کامل نشده" : "کامل شد"}
            <Icon className="h-4 w-4 mr-2" />
        </Button>
     );
}
 
export default CourseProgressButton;