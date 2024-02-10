import { getDashboardCourses } from "@/actions/getDashboardCourses";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

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
    <div>
      Dashboard
    </div>
  )
}
