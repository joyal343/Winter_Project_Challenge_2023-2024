"use client";

import { useState } from 'react';
import DropDown from '@components/DropDown'
import SideBar from '@components/SideBar';
import styles from './AddPost.module.css'

const page = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [dept, setDept] = useState("");
    const [file,setFile] =useState(null);

    const onSubmit = async (e)=>{
        e.preventDefault()
        if(!file){
            const data = new FormData(e.target);
            data.set('type',type);
            data.set('dept',dept);
            const res = await fetch('/api/news',{
                method:"POST",
                body:data
            })
            console.log("SUCCESS!!!!")
            if(!res.ok) throw new Error (await res.text());
            return;
        };
        try {
            const data = new FormData(e.target);
            data.set('type',type);
            data.set('dept',dept);
            data.set('file',file);
            console.log(data);
            const res = await fetch('/api/news',{
                method:"POST",
                body:data
            })
            if(!res.ok) throw new Error (await res.text())
        } catch (error) {
            console.log(error);
        }
    }
    const handleTitle = (e) => { setTitle(e.target.value) };
    const handleDesc = (e) => { setDesc(e.target.value) };
    const handleType = (value) => { setType(value) };
    const handleDept = (value) => { setDept(value) };
    return (
        <div className={styles.main}>
            <div className={styles.sidebar}>
                <SideBar
                    links={["Create Post", "Delete Post"]}

                    linkURL={["\\admin\\addpost", "\\admin\\deletepost"]}
                />
            </div>
            <div className={styles.addpost}>
                <div className={styles.heading}>New Announcement</div>
                <form onSubmit={onSubmit} className={styles.form}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name='title' value={title} onChange={handleTitle} />
                    <label htmlFor="name">Description</label>
                    <textarea type="text" name="desc" value={desc} onChange={handleDesc} />
                    <div className={styles.dropOptions}>
                        <DropDown
                            title="Category"
                            options={["Academic", "Clubs", "Sports", "Research", "Employment", "Tenders"
                            ]}
                            handler={handleType}
                        />
                        <DropDown
                            title="Department"
                            options={["CSE", "ECE", "EEE", "MCE", "CVE"]}
                            handler={handleDept}
                        />
                    </div>
                    <label htmlFor="">*optional</label>
                    <input 
                        type="file" 
                        name="file"
                        onChange={(e)=>{setFile(e.target.files?.[0])}} 
                    />
                    <button type='submit' className={styles.post}>POST</button>
                </form>
            </div>
        </div>
    )
}

export default page

