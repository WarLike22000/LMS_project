"use client";

import { Button } from "@/components/ui/button";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

const CourseEnrollButton = ({
    courseId,
    price
}: CourseEnrollButtonProps) => {
    return ( 
        <Button
            size="sm"
            className="w-full md:w-auto"
        >
            قیمت ثبت نام {price.toLocaleString()}
        </Button>
     );
}
 
export default CourseEnrollButton;