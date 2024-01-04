"use client";

import {useState} from 'react';

const page = () => {
    const [title,setTitle] = useState("");
    const [desc,setDesc] = useState("");
    const [type,setType] = useState("");
    const [dept,setDept] = useState("");
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            console.log(title);
            console.log(desc);
            console.log(type);
            console.log(dept);
            const response = await fetch('/api/news',{
                method:"POST",
                body:JSON.stringify({
                    title:title,
                    date:new Date(),
                    desc:desc,
                    type:type,
                    dept:dept
                })
            })
            if(response.ok){
                console.log("ALL CLEAR");
                const res=await response.json();
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleTitle =(e)=>{setTitle(e.target.value)};
    const handleDesc=(e)=>{setDesc(e.target.value)};
    const handleType =(e)=>{setType(e.target.value)};
    const handleDept=(e)=>{setDept(e.target.value)};
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='title' value={title} onChange={handleTitle}/><br />
        <input type="text" placeholder='desc' value={desc} onChange={handleDesc}/><br />
        <input type="text" placeholder='type' value={type} onChange={handleType}/><br />
        <input type="text" placeholder='dept' value={dept} onChange={handleDept}/>

        <button type='submit'>SUBMIT</button>
    </form>
  )
}

export default page

