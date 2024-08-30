import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./pages/layout"
import Home from "./pages/home"
import Course from "./pages/course"
import Dashboard from "./pages/dashboard"

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="dashboard" element={<Dashboard />} />
               <Route path="course/:id" element={<Course />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App
