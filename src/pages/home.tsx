import Loader from "@/components/loader"
import axios from "axios"
import { useEffect, useState } from "react"
import Card from "@/components/card"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { updateCourses } from "@/redux/courseSlice"
import Fuse from "fuse.js"
import { CourseType } from "@/types/types"
import { Search } from "lucide-react"
import { updateQuery } from "@/redux/searchSlice"

const base_url = import.meta.env.VITE_BASE_URL

const Home = () => {
   const [loading, setLoading] = useState(false)
   const courses = useSelector((state: RootState) => state.courses.courses)
   const searchQuery = useSelector(
      (state: RootState) => state.searchQuery.query,
   )
   const dispatch = useDispatch()
   const [filteredData, setFilteredData] = useState<CourseType[]>()

   // used for fuzzy search on columns: name and instructor
   const fuse = new Fuse(courses, {
      keys: ["name", "instructor"],
      threshold: 0.3,
   })

   const fetchCourses = async () => {
      const res = await axios.get(base_url + "/course")
      return res
   }

   const fetchInitialCourses = async () => {
      setLoading(true)
      const res = await fetchCourses()
      dispatch(updateCourses(res.data))
      setFilteredData(res.data)
      setLoading(false)
   }

   useEffect(() => {
      fetchInitialCourses()

      // BONUS TASK
      // polling every 5 seconds to fetch updated data for likes
      // only update data if there is a change in the latest fetched data
      const intervalId = setInterval(async () => {
         const latestResponse = await fetchCourses()
         if (JSON.stringify(latestResponse.data) !== JSON.stringify(courses))
            dispatch(updateCourses(latestResponse.data))
      }, 5000)

      return () => {
         clearInterval(intervalId)
      }
   }, [])

   useEffect(() => {
      if (searchQuery !== "") {
         // fitering data if user has entered a search query
         const results = fuse.search(searchQuery)
         setFilteredData(
            results.map((result) => {
               return result.item
            }),
         )
      } else setFilteredData(courses)
   }, [searchQuery])

   if (loading)
      return (
         <div className="h-full flex items-center justify-center ">
            <Loader />
         </div>
      )

   return (
      <div className="w-[90%] md:w-[70%] mx-auto flex flex-col gap-10 pt-10">
         <form
            action=""
            className="flex gap-2 border rounded-full px-3 py-2 text-sm sm:text-base sm:px-4 sm:py-3 w-[300px] sm:w-[350px] md:w-[500px] mx-auto focus-within:ring-1 focus-within:ring-blue-500"
         >
            <Search className="text-neutral-400 text-sm sm:text-base" />
            <input
               type="text"
               placeholder="Search by course or instructor name"
               className="outline-none w-full text-neutral-600"
               value={searchQuery}
               onChange={(e) => dispatch(updateQuery(e.target.value))}
            />
         </form>
         {filteredData?.map((course) => (
            <Card key={course.id} course={course} />
         ))}
      </div>
   )
}

export default Home
