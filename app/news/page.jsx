'use client';

import { useState, useEffect, useContext } from 'react';
import NewsItem from '@components/NewsItem';
import Search from '@components/Search';
import DropdownMobile from '@components/DropdownMobile';
import { MyContext } from "@/context";

const NewsItemsList = ({ posts, isMobile }) => {
    // Pagination also needs to be added

    return (
        <div className='flex flex-col items-center sm:block w-[100%] sm:w-[85%] '>
            <div className="text-[20px] sm:text-[20px] mb-5 text-gray-500">{"Results " + posts.length}</div>
            {posts.map((post) => {
                return <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.description}
                    annType={post.type}
                    key={post.id}
                    id={post.id}
                    hasImg={false}
                    imgURL={".assets/uploaded_images/"}
                    isMobile={isMobile}
                />
            })}
        </div>
    )
}


const page = () => {
    const { windowSize, setWindowSize } = useContext(MyContext)
    const [currPosts, setCurrPosts] = useState([]); // Posts Displayed on Screen
    
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
    // Getting Posts from the Backend
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/news/search');
            const data = await response.json();
            setCurrPosts(data);
        }
        fetchPosts();
    }, []);

    // Function to Handle Search Requests
    async function handleSearch(text, pDate, type, dept) {
        console.log("Search Initiated")
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
        <div className='flex flex-col p-5 sm:p-0 sm:flex-row overflow-y-auto'>
            <div className='flex justify-center  w-[100%] sm:w-[30%] sm:pt-10 sm:mx-auto'>
                {
                    windowSize.width >= 640 ?
                        <Search handleSearch={handleSearch} /> 
                            : 
                        <DropdownMobile
                            filterOptions={filterOptions}
                            handleSearch={handleSearch} 
                        />
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