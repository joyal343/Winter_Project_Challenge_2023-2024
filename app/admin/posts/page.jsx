"use client";
import SideBar from "@components/SideBar";
import NewsItem from "@components/NewsItem";
import Search from "@components/Search";
import DropdownMobile from '@components/DropdownMobile';
import Example from "@components/Modal";
import { useState, useEffect, useContext } from 'react';
import { MyContext } from "@/context";

const NewsItemsList = ({ posts, isMobile, handleDel, handleSearch }) => {
    // Pagination also needs to be added

    return (
        <div className='flex flex-col items-center sm:block w-[100%]'>
            <div className="flex items-center">
                <div className="text-[20px] sm:text-[20px] text-gray-500">{"Results " + posts.length}</div>
                <div className="hidden sm:block ml-[auto] my-[auto]">
                    <Example 
                        callback={() => { handleSearch("", [true, false, false, false, false], "", "") }} 
                        styles = "w-8 h-8 rounded-full"
                    />
                </div>
            </div>

            {posts.map((post) => {
                return <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.description}
                    annType={post.type}
                    del={true}
                    id={post.id}
                    key={post.id}
                    handleDel={handleDel}
                    // hasImg={post.picture === "" ? false : true}
                    hasImg={false}
                    imgURL={".assets/uploaded_images/" + post.picture}
                    isMobile={isMobile}
                />
            })}
        </div>
    )
}
const page = () => {
    const filterOptions = { // Options displayed in mobile horizontal dropdown
        Date: [
            "All Date",
            "Last 30 Days",
            "Last 60 Days",
            "Last 6 Months",
            "Last 12 Months",
        ],
        Category: [
            "Academic",
            "Clubs",
            "Sports",
            "Research",
            "Employment",
            "Tenders",
        ],
        Department: ["CSE", "ECE", "EEE", "MCE", "CVE"],
    };

    const { windowSize, setWindowSize } = useContext(MyContext);

    // Posts Displayed on Screen
    const [currPosts, setCurrPosts] = useState([]);

    // Getting Posts from the Backend
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/news/search');
            const data = await response.json();
            setCurrPosts(data);
        }
        fetchPosts();
    }, []);

    // Function to Delete a Post
    async function handleDel(id) {
        const response = await fetch('/api/news', {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        });
        const res = await response.json();
        handleSearch("", [true, false, false, false, false], "", "")
    }

    // Function to Handle Search Requests
    const handleSearch = async (text, pDate, type, dept) => {
        const response = await fetch('/api/news/search', {
            method: "POST",
            body: JSON.stringify({
                text: text,
                pDate: pDate,
                type: type,
                dept: dept
            })
        });
        const data = await response.json();
        setCurrPosts(data);
    }
    return (
        <div className={"flex w-[100%] p-8 sm:p-0"}>
            {
                windowSize.width >= 640 ? 
                <></>    
                    :
                <div className="fixed bottom-4 left-4 z-50">
                    <Example 
                        styles = "w-16 h-16 rounded-full bg-white"
                    />
                </div>
            }
            <div className={"hidden sm:flex sm:flex-col sm:w-[15%]"}>
                <SideBar
                    links={["Dashboard", "Posts"]}
                    linkURL={["\\admin\\dashboard", "\\admin\\posts"]}
                    linkImg={["/assets/icons/DashBoardIcon.svg", "/assets/icons/Posts.svg"]}
                />
            </div>
            <div className="flex w-[100%] sm:w-[80%] sm:pl-5">
                <div className='flex grow flex-col-reverse sm:flex-row sm:mt-5'>

                    <div className="w-[100%] sm:w-[80%] sm:px-4 sm:pt-10 mx-auto">
                        <NewsItemsList
                            posts={currPosts}
                            isMobile={windowSize.width >= 640 ? false : true}
                            handleDel={handleDel}
                            handleSearch={handleSearch}
                        />
                    </div>
                    <div className='flex justify-center  sm:w-[20%] sm:pt-10 sm:mx-auto'>
                        {
                            windowSize.width >= 640 ?
                                <Search 
                                    handleSearch={handleSearch} 
                                />
                                :
                                <DropdownMobile
                                    filterOptions={filterOptions}
                                    handleSearch={handleSearch}
                                />
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page