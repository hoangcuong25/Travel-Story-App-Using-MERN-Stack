import React from 'react'
import logo from "../assets/images/logo.png"
import ProfileInfo from './Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ userInfo }) => {

    const isToken = localStorage.getItem("token")
    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className='bg-white flex items-center justify-between px-6 py-2
        drop-shadow sticky top-0 z-10 '>
            <img src={logo} alt="" className='w-auto h-12' />

            {isToken && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
        </div>
    )
}

export default Navbar