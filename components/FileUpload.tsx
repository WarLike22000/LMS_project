"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export const FileUpload: React.FC<FileUploadProps> = ({
    onChange,
    endpoint
}) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
                console.log(res?.[0].url);
            }}
            onUploadError={(error: any) => {
                toast.error("مشکلی موقع بارگزاری فایل پیش اومده!")
                console.log(error);
            }}
        />
    )
};