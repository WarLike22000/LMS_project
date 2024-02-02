"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc";
import { IconType } from "react-icons"

import CategoryItem from "./CategoryItem";

interface CategoriesProps {
    items: Category[];
}


const iconMap: Record<Category["name"], IconType> = {
    "موسیقی": FcMusic,
    "عکاسی": FcOldTimeCamera,
    "ورزشی": FcSportsMode,
    "حسابداری": FcSalesPerformance,
    "علوم کامپیوتر": FcMultipleDevices,
    "فیلم برداری": FcFilmReel,
    "مهندسی": FcEngineering,
}

const Categories: React.FC<CategoriesProps> = ({
    items
}) => {
    return ( 
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
     );
}
 
export default Categories;