import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const user = await currentUser();

        if(!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true,
            }
        });

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId,
                }
            }
        });

        if(purchase) {
            return new NextResponse("Already purchased", { status: 400 });
        };

        if(!course) {
            return new NextResponse("Not Found", { status: 404 });
        };

        const createPurchase = await db.purchase.create({
            data: {
                courseId: params.courseId,
                userId: user.id,
            }
        });
        
        return NextResponse.json(createPurchase);
    } catch (error) {
        console.log("[COURSE_ID_CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};