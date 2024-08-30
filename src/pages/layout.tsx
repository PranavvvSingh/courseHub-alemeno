import { Outlet } from "react-router-dom"
import Header from "../components/header"

const Layout = () => {
   return (
      <div className="flex flex-col h-screen w-full">
         <Header />
         <div className="grow overflow-y-auto">
            <Outlet />
         </div>
      </div>
   )
}

export default Layout
