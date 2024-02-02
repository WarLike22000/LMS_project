"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

interface ConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    children,
    onConfirm
}) => {
    const [isMounted, setISMounted] = useState(false);

    useEffect(() => {
        setISMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-right">آیا مطمئن هستید؟</AlertDialogTitle>
                    <AlertDialogDescription className="text-right">
                        اینکار قابل بازگشت نیست.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="ml-2">انصراف</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        ادامه
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}