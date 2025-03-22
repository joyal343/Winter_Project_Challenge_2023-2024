"use client";
import SideBar from "@components/SideBar";
import NewsItem from "@components/NewsItem";
import Search from "@components/Search";
import MobileSearch from '@components/MobileSearch';
import Example from "@components/Modal";
import { useState, useEffect, useContext } from 'react';
import { MyContext } from "@/context";

const NewsItemsList = ({ posts, isMobile, handleDel }) => {
    // Pagination also needs to be added

    return (
        <div className='flex flex-col items-center sm:block w-[100%]'>
            <div className="flex items-center">
                <div className="text-[20px] sm:text-[20px] text-gray-500">{"Results " + posts.length}</div>
                <div className="hidden sm:block ml-[auto] my-[auto]">
                    <Example />
                </div>
            </div>

            {posts.map((post) => {
                return <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.desc}
                    annType={post.annType}
                    del={true}
                    id={post._id}
                    key={post._id}
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
    const { windowSize, setWindowSize } = useContext(MyContext);

    // Posts Displayed on Screen
    const [currPosts, setCurrPosts] = useState([]);

    // Getting Posts from the Backend
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/news/allnews');
            const data = await response.json();
            setCurrPosts(data);
        }
        fetchPosts();
    }, []);

    // Function to Delete a Post
    async function handleDel(id) {
        console.log(id);
        const response = await fetch('/api/news/allnews', {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        });
        const res = await response.json();
        console.log(res);
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
        // console.log(data);
        setCurrPosts(data);
    }
    return (
        <div className={"flex w-[100%] p-5 sm:p-0"}>
            <div className={"hidden sm:flex sm:flex-col sm:w-[15%]"}>
                <SideBar
                    links={["Dashboard", "Posts"]}
                    linkURL={["\\admin\\dashboard", "\\admin\\posts"]}
                    linkImg={[ "/assets/icons/DashBoardIcon.svg","/assets/icons/Posts.svg"]}
                />
            </div>
            <div className="flex w-[100%] sm:w-[80%] sm:pl-5">
                <div className='flex grow flex-col-reverse sm:flex-row sm:mt-5'>

                    <div className="w-[100%] sm:w-[90%] sm:pt-10 mx-auto">
                        <NewsItemsList
                            posts={currPosts}
                            isMobile={windowSize.width >= 640 ? false : true}
                            handleDel={handleDel}
                        />
                    </div>
                    <div className='flex justify-center  sm:w-[30%] sm:pt-10 sm:mx-auto'>
                        {
                            windowSize.width >= 640 ?
                                <Search handleSearch={handleSearch} /> :
                                <div className="flex w-[100%] gap-5">
                                    <div className="w-[90%]">
                                        <MobileSearch handleSearch={handleSearch} />
                                    </div>
                                    <div className="ml-auto my-auto">
                                        <Example />
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page