import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface CounterState {
   query: string
}

const initialState: CounterState = {
   query: "",
}

export const searchSlice = createSlice({
   name: "query",
   initialState,
   reducers: {
      updateQuery: (state, action: PayloadAction<string>) => {
         state.query = action.payload
      },
      clearQuery: (state) => {
         state.query = ""
      },
   },
})


export const { updateQuery, clearQuery } = searchSlice.actions
export default searchSlice.reducer
