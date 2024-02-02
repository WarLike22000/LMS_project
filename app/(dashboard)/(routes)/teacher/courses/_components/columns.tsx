"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          عنوان
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          قیمت
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      return <div>{price?.toLocaleString() ?? 0}</div>
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          وضعیت انتشار
          <ArrowUpDown className="mr-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        <Badge className={cn(
          "bg-slate-500",
          isPublished && "bg-sky-700"
        )}>
          {isPublished ? "منتشر شده" : "منتشر نشده"}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} className="h-4 w-8 p-0 flex items-center justify-center">
              <span className="sr-only">open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                ویرایش
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
