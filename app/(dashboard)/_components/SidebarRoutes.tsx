"use client"

import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "داشبورد",
        href: "/"
    },
    {
        icon: Compass,
        label: "جستجو",
        href: "/search"
    },
]

const teacherRoutes = [
    {
        icon: List,
        label: "دوره ها",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "تجزیه و تحلیل",
        href: "/teacher/analytics"
    },
]

const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    
    return ( 
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
     );
}
 
export default SidebarRoutes;