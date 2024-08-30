import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./searchSlice"
import courseReducer from "./courseSlice"

export const store = configureStore({
   reducer: { searchQuery: searchReducer, courses: courseReducer },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
