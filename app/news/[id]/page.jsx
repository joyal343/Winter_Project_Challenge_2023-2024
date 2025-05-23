"use client"

import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [banner, setBanner] = useState("")
    const [img, setImg] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [idVal, setIdVal] = useState("");

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    async function fetchAnnouncement() {
        try {
            const { id } = await params;
            setIdVal(id);
            const response = await fetch(`/api/news/announcement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch announcement');
            }

            const data = await response.json();
            console.log(data);
            setBanner(data.bannerLocation);
            setImg(data.imageLocation);
            setTitle(data.title);
            setDesc(data.description);
            setDate(data.date);
        } catch (error) {
            console.error('Error fetching announcement:', error);
        }
    }

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    return (
        <div className="flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-[auto] p-5 sm:p-0 h-full w-full sm:gap-2">

            <div className="flex flex-col sm:col-span-2 sm:pl-16 sm:mt-5 mb-6 sm:mb-4 ">
                <h1 className="font-bold border-b-[3px] border-[#8B80F9] text-2xl sm:text-4xl mb-4 py-5">{title}</h1>
                <p className="mb-4">{
                    date && 
                    ((date.substring(8, 10) === "01" ?
                        "1st" : date.substring(8, 10) === "02" ?
                        "2nd" : date.substring(8, 10) === "03" ?
                        "3rd" : date.substring(8, 10) + "th")
                    + " " +
                    monthList[Number(date.substring(5, 7)) - 1]
                    + " " +
                    date.substring(0, 4))
                }</p>
                <p className="text-xl">{desc + " " + desc.length + " " + desc.trim().length}</p>
            </div>
            <div className="sm:flex items-start justify-center sm:col-span-1 text-xl rounded-lg mb-6 sm:h-[50%] sm:pt-5 sm:mt-20">
                {img &&
                    <div className="w-[100%] sm:w-[70%] sm:h-[70%] object-cover ">
                        <img
                            src={img}
                            alt="Header Image"
                            className="w-full h-full object-cover rounded-lg"
                            />
                    </div>
                }
            </div>
            <p className="sm:col-span-1 sm:pl-16 text-center sm:text-left">Download Attachment</p>
        </div>
    );
}

