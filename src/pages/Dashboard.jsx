import React from 'react'
import {useSelector} from "react-redux"
import {Outlet} from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

    const {loading:authLoading} = useSelector((state)=> state.auth);
    const {loading:profileLoading} = useSelector((state)=> state.profile);
    console.log('Dashboard:', { authLoading, profileLoading });

    // if(profileLoading || authLoading){
    //     return(
    //         <div className='mt-12'>
    //             Loading...
    //         </div>
    //     )
    // }
   
  return (
    <div className='relative flex  bg-richblack-400'>
        <Sidebar/>
        <div className=' flex-1 overflow-auto bg-richblack-900'>
        <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
            <Outlet/>
        </div>

        </div>
      
    </div>
  )
}

export default Dashboard
