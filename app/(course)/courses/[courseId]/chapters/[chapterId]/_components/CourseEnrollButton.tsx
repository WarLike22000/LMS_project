"use client";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

const CourseEnrollButton = ({
    courseId,
    price
}: CourseEnrollButtonProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.post(`/api/courses/${courseId}/checkout`);

            toast.success("خرید با موفقیت انجام شد")
            router.refresh();
        } catch (error) {
            toast.error("مشکلی پیش آمده");
        } finally {
            setIsLoading(false);
        }
    };
    
    return ( 
        <ConfirmModal onConfirm={onClick}>
            <Button
                disabled={isLoading}
                size="sm"
                className="w-full md:w-auto"
            >
                قیمت ثبت نام {price.toLocaleString()}
            </Button>
        </ConfirmModal>
     );
}
 
export default CourseEnrollButton;