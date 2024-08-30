import { CourseType } from "@/types/types"
import clsx from "clsx"
import { useNavigate } from "react-router-dom"

const Card = ({ course }: { course: CourseType }) => {
   const navigate = useNavigate()

   // navigate to course details page
   const onClickNavigate = () => {
      navigate("/course/" + course.id)
   }
   return (
      <div
         className="flex items-center justify-start gap-5 pb-4 border-b cursor-pointer"
         onClick={onClickNavigate}
      >
         <img
            src={course.thumbnail}
            alt="course_item"
            className="h-[70px] w-[120px] sm:h-[113px] sm:w-[200px] md:h-[135px] md:w-[240px] border"
         />
         <div className="flex flex-col gap-2">
            <h1 className="text-lg font-semibold">{course.name}</h1>
            <p>{course.description}</p>
            <h2 className="text-sm">{course.instructor}</h2>
            <div className="flex flex-wrap gap-1">
               <span className="text-nowrap">{course.duration}</span>
               <span>{" | "}</span>
               <span className="text-nowrap">{course.likes} likes</span>
               <span>{" | "}</span>
               <span
                  className={clsx("uppercase font-semibold text-nowrap", {
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
   )
}

export default Card
