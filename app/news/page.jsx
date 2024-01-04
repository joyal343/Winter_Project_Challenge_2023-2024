'use client';

import { useState, useEffect } from 'react';
import NewsItem from '@components/NewsItem';
import Search from '@components/Search';
import {Poppins} from "next/font/google"

const poppins=Poppins(
    {
        subsets:['latin'],   
        weight:'700'
    }

)
// ADDED POPPINS TO HEADING
const NewsItemsList = ({ posts }) => {
    return (
        <div className='NewsList'>
            {posts.map((post) => {
                return <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.desc}
                />
            })}
        </div>
    )
}


const page = () => {
    const [currPosts,setCurrPosts]=useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/news/allnews');
            const data = await response.json();
            setCurrPosts(data);
            console.log(data);
        }
        fetchPosts();
    }, []);

    const handleSearch = async (text,pDate,type,dept) =>{
        const response = await fetch('/api/news/search',{
            method:"POST",
            body:JSON.stringify({
                text:text,
                pDate:pDate,
                type:type,
                dept:dept
            })
        });
        const data = await response.json();
        console.log(data);
        setCurrPosts(data);
    }

    return (
        <div className='NewsPage'>
            <div className='NewsPageLeft'>
                <div className={'NewsPageHeading '+poppins.className}>
                    Announcements
                </div>
                <NewsItemsList posts={currPosts} />
            </div>
            <div className="NewsPageRight">
                <Search handleSearch={handleSearch} />
            </div>
        </div>
    )
}

export default page