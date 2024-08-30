import DashboardCard from "@/components/dashboardCard"
import Loader from "@/components/loader"
import { updateCourses } from "@/redux/courseSlice"
import { RootState } from "@/redux/store"
import { EnrolledCourseType, EnrollmentType } from "@/types/types"
import axios from "axios"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const base_url = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
   // assuming the current student id as 1
   const [id] = useState("1")
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [enrollments, setEnrollments] = useState<EnrolledCourseType[]>()
   const courses = useSelector((state: RootState) => state.courses.courses)

   const fetchEnrollment = async () => {
      setLoading(true)
      let allCourses = courses
      const res = await axios.get(base_url + "/enrollment")

      // fetching and filtering the enrollments matching the current student
      const filter_data = res.data.filter((enrollment: EnrollmentType) => {
         return enrollment.student_id === id
      })

      if (courses.length === 0) {
         const res = await axios.get(base_url + "/course")
         allCourses = res.data
         dispatch(updateCourses(res.data))
      }

      const finalEnrollmentData = filter_data.map(
         (enrollment: EnrollmentType) => {
            const course = allCourses.find(
               (course) => course.id == enrollment.course_id,
            )
            return {
               ...enrollment,
               name: course?.name,
               thumbnail: course?.thumbnail,
               instructor: course?.instructor,
            }
         },
      )

      setEnrollments(finalEnrollmentData)
      setLoading(false)
   }

   useEffect(() => {
      fetchEnrollment()
   }, [])

   if (loading)
      return (
         <div className="h-full flex items-center justify-center ">
            <Loader />
         </div>
      )

   return (
      <>
         <h1 className="text-xl md:text-2xl w-[80%] mx-auto mt-10">
            You have enrolled in {enrollments?.length} courses. Happy learning!
         </h1>
         <div className="w-[90%] md:w-[80%] mx-auto grid grid-cols-1 min-[500px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-5 mt-10 justify-items-center">
            {enrollments?.map((enrollment) => (
               <DashboardCard key={enrollment.id} enrollment={enrollment} />
            ))}
         </div>
      </>
   )
}

export default Dashboard
