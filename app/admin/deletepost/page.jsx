"use client";
import styles from "./DeletePost.module.css";
import SideBar from "@components/SideBar";
import NewsItem from "@components/NewsItem";
import SearchBar from "@components/Search";
import { useState, useEffect } from 'react';
const NewsItemsList = ({ posts, handleDel }) => {

    return (
        <div className={styles.NewsList}>
            <div className={styles.results}>{"Results " + posts.length}</div>
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
                    hasImg={post.picture === "" ? false : true}
                    imgURL={"/assets/uploaded_images/" + post.picture}
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
    <div className={styles.main}>
        <div className={styles.sidebar}>
            <SideBar 
                links={["Create Announcement", "Delete Announcement"]}
                linkURL={["\\admin\\addpost", "\\admin\\deletepost"]}
                linkImg={["/assets/icons/addpost_icon.svg", "/assets/icons/deletepost_icon.svg"]}
            />
        </div>
        <div className={styles.delpost}>
            < NewsItemsList
                posts={currPosts}
                handleDel={handleDel} 
            />
            <SearchBar handleSearch={handleSearch} isdel={true} />
        </div>
    </div>
    )
}

export default page