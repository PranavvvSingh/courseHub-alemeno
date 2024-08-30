import Loader from "@/components/loader"
import { CourseType } from "@/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import clsx from "clsx"

const base_url = "https://66cef1cd901aab2484203e14.mockapi.io/course-hub"

const Course = () => {
   const params = useParams()
   const [loading, setLoading] = useState(false)
   const [course, setCourse] = useState<CourseType>()

   const fetchCourse = async () => {
      setLoading(true)
      const res = await axios.get(base_url + "/course/" + params.id)
      setCourse(res.data)
      setLoading(false)
   }

   useEffect(() => {
      fetchCourse()
   }, [params.id])

   if (loading || !course)
      return (
         <div className="h-full flex items-center justify-center ">
            <Loader />
         </div>
      )

   return (
      <div className="my-10 space-y-8 w-[80%] md:w-[60%] mx-auto">
         <div className="flex flex-col md:flex-row gap-5">
            <img
               src={course.thumbnail}
               alt="course_item"
               className="h-[135px] w-[240px] border mx-auto"
            />
            <div className="flex flex-col gap-2">
               <h1 className="text-2xl font-semibold text-center md:text-left">
                  {course.name}
               </h1>
               <p>{course.description}</p>
               <h2 className="text-sm">{course.instructor}</h2>
               <div className="flex gap-1">
                  <span>{course.duration}</span>
                  <span>{" | "}</span>
                  <span>{course.likes} likes</span>
                  <span>{" | "}</span>
                  <span
                     className={clsx("uppercase font-semibold", {
                        "text-green-600": course.enrollmentStatus === "Open",
                        "text-red-500": course.enrollmentStatus === "Closed",
                        "text-yellow-500":
                           course.enrollmentStatus === "In Progress",
                     })}
                  >
                     {course.enrollmentStatus}
                  </span>
               </div>
            </div>
         </div>
         <div className="border rounded-sm px-8 py-3">
            <h1 className="font-semibold text-lg">Prerequisites</h1>
            <ul className="list-disc list-inside">
               {course.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
               ))}
            </ul>
         </div>
         <div className="flex gap-5 items-center ">
            <h1 className="text-xl font-semibold">Schedule:</h1>
            <span className="mt-[2px]">{course.schedule}</span>
         </div>
         <div className="flex gap-5 items-center">
            <h1 className="text-xl font-semibold">Location:</h1>
            <span className="mt-[2px]">{course.location}</span>
         </div>
         <div>
            <h1 className="text-xl font-semibold">Syllabus</h1>
            {course.syllabus.map((week) => (
               <Accordion key={week.week} type="single" collapsible>
                  <AccordionItem value="item-1">
                     <AccordionTrigger>
                        Week {week.week} : {week.topic}
                     </AccordionTrigger>
                     <AccordionContent className="text-base">
                        {week.content}
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            ))}
         </div>
      </div>
   )
}

export default Course
