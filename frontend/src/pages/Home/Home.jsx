import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd } from "react-icons/md";
import Modal from "react-modal"
import AddEditTravelStory from './AddEditTravelStory'


const Home = () => {

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState(null)
    const [allStories, setAllStories] = useState([])

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

    // get user info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user")

            if (response.data && response.data.user) {
                // set user info if data exists
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login")
            }
        }
    }

    // get all travel stories
    const getAllTravelStories = async () => {
        try {
            const response = await axiosInstance.get("/get-all-travel-stories")
            if (response.data && response.data.stories) {
                setAllStories(response.data.stories)
            }
        } catch (error) {
            console.log("An unexpected error occured. Please try again.")
        }
    }

    // handle edit story click
    const handleEit = (data) => { }

    // handle travel story click
    const handleViewStory = (data) => {

    }

    // handle Update favourite
    const updateIsFavourite = async (storyData) => {
        const storyId = storyData._id;

        try {
            const response = await axiosInstance.put(
                "/update-is-favourite/" + storyId,
                {
                    isFavourite: !storyData.isFavourite
                }
            )

            if (response.data && response.data.story) {
                toast.success("Story Update Successfully")
                getAllTravelStories()
            }
        } catch (error) {
            console.log("An unexpected error occured. Please try again.")
        }
    }

    useEffect(() => {
        getAllTravelStories()
        getUserInfo()
    }, [])

    return (
        <div>
            <Navbar userInfo={userInfo} />

            <div className='container mx-auto py-10'>
                <div className='flex gap-7'>
                    <div className='flex-1 '></div>
                    {allStories.length > 0 ? (
                        <div className='grid grid-cols-2 gap-4 '>
                            {allStories.map((item) => {
                                return (
                                    <TravelStoryCard
                                        key={item._id}
                                        imgUrl={item.imageUrl}
                                        title={item.title}
                                        story={item.story}
                                        date={item.visitedDate}
                                        visitedLocation={item.visitedLocation}
                                        isFavourite={item.isFavourite}
                                        onEdit={() => handleEdit(item)}
                                        onClick={() => handleViewStory(item)}
                                        onFavouriteClick={() => updateIsFavourite(item)}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <div>Empty Card Here</div>
                    )
                    }
                    <div className='w-[320px]'></div>
                </div>
            </div>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                        zIndex: 999,
                    }
                }}
                appElement={document.getElementById("root")}
                className="model-box"
            >
                <AddEditTravelStory
                    type={openAddEditModal.type}
                    storyInfo={openAddEditModal.data}
                    onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                    getAllTravelStories={getAllTravelStories}
                />
            </Modal>

            <button
                className='w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10'
                onClick={() => {
                    setOpenAddEditModal({ isShown: true, type: "add", data: null })
                }}
            >
                <MdAdd className='text-[32px] text-white' />
            </button>

            <ToastContainer />
        </div>
    )
}

export default Home