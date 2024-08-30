import clsx from "clsx"
import { NavLink } from "react-router-dom"

const Header = () => {
   return (
      <div className="flex items-center justify-between px-5 py-2 md:px-7 md:py-3 border-b shadow-lg">
         <h1 className="text-xl sm:text-2xl font-bold">
            Course<span className="text-blue-500">Hub</span>
         </h1>
         <div className="flex items-center gap-3 md:gap-5">
            <NavLink
               to={"/"}
               className={({ isActive }) =>
                  clsx({
                     "text-blue-500 font-semibold": isActive,
                  })
               }
            >
               Home
            </NavLink>
            <NavLink
               to={"/dashboard"}
               className={({ isActive }) =>
                  clsx({
                     "text-blue-500 font-semibold": isActive,
                  })
               }
            >
               Dashboard
            </NavLink>
         </div>
      </div>
   )
}

export default Header
