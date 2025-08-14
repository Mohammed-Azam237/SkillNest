import React from 'react'
import *  as Icons from "react-icons/vsc"
import {useDispatch} from "react-redux"
import {NavLink, useLocation, matchPath} from "react-router-dom"

const SidebarLink = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch()

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div>
     <NavLink
        to={link.path}
        className={({ isActive }) =>
          `px-3 py-2 rounded-md font-medium text-sm flex items-center gap-x-2 transition-all duration-300 ${
            isActive ? "bg-yellow-50 text-black" : "text-white"
          }`
        }
      >
          <Icon className="text-lg" />
          <span className="hidden md:block">{link.name}</span>
      </NavLink>

    </div>
  )
}

export default SidebarLink
