"use client";

import { useState } from 'react';
import DropdownMenu_Tailwind from '@components/DropDown_Tailwind';
import SideBar from '@components/SideBar';
import styles from './AddPost.module.css'

const page = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [dept, setDept] = useState("");
    const [file, setFile] = useState(null);


    const onSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        console.log(data)
        // Not Set In the form ??
        if (!type || !dept){
            console.log("Department or Type Not Specified")
            return;
        }
        data.set('type', type);
        data.set('dept', dept);
        if (file) {
            console.log("Before:",file)
            data.set('file', file);
            // Why does this not work ???
            setFile(null)
            console.log("After:",file)
        }

        // Submitting Data to Backend
        const res = await fetch('/api/news', {
            method: "POST",
            body: data
        })

        if (!res.ok) throw new Error(await res.text());
        return;


    }
    const handleTitle = (e) => setTitle(e.target.value)
    const handleDesc = (e) => setDesc(e.target.value)
    const handleType = (value) => setType(value)
    const handleDept = (value) => setDept(value)
    return (
        <div className={styles.main}>
            <div className={styles.sidebar}>
                <SideBar
                    links={["Create Post", "Delete Post"]}

                    linkURL={["\\admin\\addpost", "\\admin\\deletepost"]}

                    linkImg={["/assets/icons/addpost_icon.svg", "/assets/icons/deletepost_icon.svg"]}
                />
            </div>

            <div className={styles.addpost}>
                <div className={styles.heading}>New Announcement</div>

                <form onSubmit={onSubmit} className={styles.form}>
                    {/* Title and Description */}
                    <label htmlFor="title">
                        Title
                    </label>
                    
                    <input type="text" name='title' value={title} onChange={handleTitle} />

                    <label htmlFor="name">
                        Description
                    </label>
                    
                    <textarea type="text" name="desc" value={desc} onChange={handleDesc} />
                    
                    <div className={styles.dropOptions}>
                        <DropdownMenu_Tailwind
                            title="Category"
                            options={[
                                "Academic",
                                 "Clubs",
                                 "Sports", 
                                 "Research", 
                                 "Employment", 
                                 "Tenders"
                            ]}
                            handler={handleType}

                        />

                        <DropdownMenu_Tailwind
                            title="Department"
                            options={[
                                "CSE",
                                "ECE",
                                "EEE",
                                "MCE",
                                "CVE"]}
                            handler={handleDept}
                        />

                    </div>

                    <label htmlFor="">*optional</label>
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => {
                            console.log("Triggered") 
                            setFile(e.target.files?.[0]) 
                        }}
                    />
                    
                    <button type='submit' className={styles.post}>
                        POST
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page

