import { getDashboardCourses } from "@/actions/getDashboardCourses";
import CoursesList from "@/components/CoursesList";
import { auth } from "@clerk/nextjs"
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import InfoCard from "./_components/InfoCard";

export default async function Dashboard() {

  const { userId } = auth();

  if(!userId) {
    return redirect("/");
  };

  const {
    completedCourse,
    courseInProgress
  } = await getDashboardCourses(userId);
  
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="در حال پیشرفت"
          numberOfItems={courseInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="تکمیل شده"
          numberOfItems={completedCourse.length}
          variant="success"
        />
      </div>

      <CoursesList
        items={[...courseInProgress, ...completedCourse]}
      />
    </div>
  )
}
