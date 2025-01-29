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
            console.log(data);
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
        console.log("data:",data);
        setCurrPosts(data);
    }

    return (
        <div className='NewsPage'>
            <div className='NewsPageLeft'>
                <Search handleSearch={handleSearch} />
            </div>
            <div className="NewsPageRight">
                <NewsItemsList posts={currPosts} />
            </div>
        </div>
    )
}

export default page