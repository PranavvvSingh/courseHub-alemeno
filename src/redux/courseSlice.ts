import { CourseType } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface CounterState {
   courses: CourseType[]
}

const initialState: CounterState = {
   courses: [],
}

export const courseSlice = createSlice({
   name: "filteredCourses",
   initialState,
   reducers: {
      updateCourses: (state, action: PayloadAction<CourseType[]>) => {
         state.courses = action.payload
      }
   },
})

export const { updateCourses } = courseSlice.actions
export default courseSlice.reducer
