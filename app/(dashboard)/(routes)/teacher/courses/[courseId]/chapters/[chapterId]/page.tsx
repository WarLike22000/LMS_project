import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import { Banner } from "@/components/banner";
import ChapterActions from "./_components/ChapterActions";

const ChapterIdPage = async ({
    params
}: {
    params: { courseId: string; chapterId: string }
}) => {
    const { userId } = auth();
    
    if(!userId) {
        return redirect("/");
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include: {
            muxData: true
        }
    });

    if(!chapter) {
        return redirect("/");
    };

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;
    
    const isCompleted = requiredFields.every(Boolean);
    
    return ( 
        <>
            {!chapter.isPublished && (
                <Banner
                    variant="warning"
                    label="این فصل هنوز منتشر نشده"
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="w-full">
                        <Link
                            href={`/teacher/courses/${params.courseId}`}
                            className="flex items-center text-sm hover:opacity-75 transition mb-6 border-b pb-2 pl-2 w-fit"
                        >
                            <ArrowRight className="h-5 w-5 ml-2" />
                            بازگشت به تنظیمات دوره
                        </Link>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-medium">
                                    تنظیمات فصل
                                </h1>
                                <span className="text-sm text-slate-700">
                                    موارد تکمیل شده {completionText}
                                </span>
                            </div>
                            <ChapterActions
                                disabled={!isCompleted}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                                isPublished={chapter.isPublished}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutDashboard} />
                                <h2 className="text-xl">
                                    شخصی سازی فصل
                                </h2>
                            </div>
                            <ChapterTitleForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                            <ChapterDescriptionForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Eye} />
                                <h2 className="text-xl">
                                    سطوح دسترسی
                                </h2>
                            </div>
                            <ChapterAccessForm
                                initialData={chapter}
                                courseId={params.courseId}
                                chapterId={params.chapterId}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={Video} />
                            <h2 className="text-xl">
                                فزودن ویدیو
                            </h2>
                        </div>
                        <ChapterVideoForm
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default ChapterIdPage;