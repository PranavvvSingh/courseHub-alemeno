export type CourseType = {
   thumbnail: string
   name: string
   instructor: string
   description: string
   enrollmentStatus: "Open" | "Closed" | "In Progress"
   duration: string
   schedule: string
   location: string
   prerequisites: string[]
   likes: number
   syllabus: {
      week: number
      topic: string
      content: string
   }[]
   id: string
}

export type EnrollmentType = {
   id: string
   course_id: string
   name: string
   email: string
   progress: number
   student_id: string
   due: string
}

export type EnrolledCourseType = EnrollmentType & {
   name: string
   instructor: string
   thumbnail: string
}
