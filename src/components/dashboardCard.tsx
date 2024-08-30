import { EnrolledCourseType, EnrollmentType } from "@/types/types"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import { useState } from "react"
import Loader from "./loader"
import { useNavigate } from "react-router-dom"

const base_url = import.meta.env.VITE_BASE_URL

const DashboardCard = ({ enrollment }: { enrollment: EnrolledCourseType }) => {
   const navigate = useNavigate()
   const [completed, setCompleted] = useState(enrollment.progress === 100)
   const [loading, setLoading] = useState(false)

   //  set progress of the course to 100 if user marks course 'Completed'
   const updateEnrollment = async () => {
      setLoading(true)
      const updatedEnrollment: EnrollmentType = {
         id: enrollment.id,
         course_id: enrollment.course_id,
         student_id: enrollment.student_id,
         name: enrollment.name,
         email: enrollment.email,
         progress: 100,
      }
      await axios.put(
         base_url + "/enrollment/" + enrollment.id,
         updatedEnrollment,
      )
      setCompleted(true)
      setLoading(false)
   }

   const onClickNavigateToCourse = () => {
      navigate("/course/" + enrollment.course_id)
   }

   return (
      <div className="w-[200px] md:w-[240px] flex flex-col gap-2 justify-between cursor-pointer">
         <>
            <img
               src={enrollment.thumbnail}
               alt="course_item"
               className="h-[113px] w-[200px] md:h-[135px] md:w-[240px]"
               onClick={onClickNavigateToCourse}
            />
            <h1
               className="text-base font-semibold line-clamp-2"
               onClick={onClickNavigateToCourse}
            >
               {enrollment.name}
            </h1>
            <p onClick={onClickNavigateToCourse}>{enrollment.instructor}</p>
            <div>
               <Progress value={enrollment.progress} className="h-[5px]" />
               <div className="text-xs mt-1">
                  {enrollment.progress}% complete
               </div>
            </div>
         </>
         {!loading &&
            (completed ? (
               <div className="border bg-blue-500 text-white py-2 text-center cursor-pointer rounded-sm">
                  Completed
               </div>
            ) : (
               <div
                  className="border py-2 text-center cursor-pointer rounded-sm"
                  onClick={updateEnrollment}
               >
                  Mark as completed
               </div>
            ))}
         {loading && (
            <div className="border flex items-center justify-center py-2 text-center cursor-pointer rounded-sm">
               <Loader size="small" />
            </div>
         )}
      </div>
   )
}

export default DashboardCard
