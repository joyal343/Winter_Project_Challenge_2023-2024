'use client';

import { useState, useEffect, useContext } from 'react';
import NewsItem from '@components/NewsItem';
import Search from '@components/Search';
import MobileSearch from '@components/MobileSearch';
import { MyContext } from "@/context";

const NewsItemsList = ({ posts, isMobile }) => {
    // Pagination also needs to be added

    return (
        <div className='flex flex-col items-center sm:block w-[100%] sm:w-[70%]'>
            <div className="text-[20px] sm:text-[20px] mb-5 text-gray-500">{"Results " + posts.length}</div>
            {posts.map((post) => {
                return <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.description}
                    annType={post.type}
                    key={post.id}
                    // hasImg={post.picture === "" ? false : true}
                    hasImg={false}
                    imgURL={".assets/uploaded_images/"}
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

    // Function to Handle Search Requests
    async function handleSearch(text, pDate, type, dept) {

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
        <div className='flex flex-col p-5 sm:p-0 sm:flex-row '>
            <div className='flex justify-center  w-[100%] sm:w-[30%] sm:pt-10 sm:mx-auto'>
                {
                    windowSize.width >= 640 ?
                        <Search handleSearch={handleSearch} /> : <MobileSearch handleSearch={handleSearch} />
                }

            </div>
            <div className="w-[100%] sm:w-[70%] sm:pt-10 mx-auto">
                <NewsItemsList
                    posts={currPosts} 
                    isMobile={windowSize.width >= 640 ? false : true} 
                />
            </div>
        </div>
    )
}

export default page