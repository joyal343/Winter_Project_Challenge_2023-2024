'use client';

import styles from "./NewsPage.module.css";
import { useState, useEffect } from 'react';
import NewsItem from '@components/NewsItem';
import Search from '@components/Search';

const NewsItemsList = ({ posts }) => {
    // Pagination also needs to be added
    
    return (
        <div className='NewsList'>
            <div className={styles.results}>{"Results " + posts.length}</div>
            {posts.map((post) => {
                return <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.desc}
                    annType={post.annType}
                    key={post._id}
                    hasImg={post.picture === "" ? false : true}
                    imgURL={".assets/uploaded_images/" + post.picture}
                />
            })}
        </div>
    )
}


const page = () => {
    const [currPosts, setCurrPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/news/allnews');
            const data = await response.json();
            setCurrPosts(data);
            
        }
        fetchPosts();
    }, []);

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
        <div className='flex flex-col sm:flex-row'>
            <div className='sm:w-[30%] sm:pt-10 mx-auto'>
                <Search handleSearch={handleSearch} />
            </div>
            <div className="sm:w-[70%] sm:pt-10 mx-auto">
                <NewsItemsList posts={currPosts} />
            </div>
        </div>
    )
}

export default page