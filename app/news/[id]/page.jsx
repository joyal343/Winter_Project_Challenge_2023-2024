"use client"

import Image from 'next/image';
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

export default function Page({ params }) {
    
    const [img, setImg] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("")
    const [idVal, setIdVal] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    async function DownloadAttachment() {
        const { id } = await params;
        const response = await fetch(`/api/news/announcement/file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        console.log(response)
        
        const blob = await response.blob()
        console.log(blob)    
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${id}.pdf`;
        a.click();

        // Cleanup
        URL.revokeObjectURL(url);
    }
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
            
            setImg(data.imageLocation);
            setTitle(data.title);
            setDesc(data.description);
            setDate(data.date);
        } catch (error) {
            console.error('Error fetching announcement:', error);
        }
    }
    const handleLoading = () => setIsLoading(false)
    useEffect(() => {
        fetchAnnouncement();
        handleLoading();

    }, []);

    return (<>
        <Loader isLoading = {isLoading}/>
        <div className="flex flex-col sm:grid sm:grid-cols-3 sm:grid-rows-[auto] p-5 sm:p-0  w-full sm:gap-2">

            <div className="flex flex-col sm:col-span-2 sm:pl-16 sm:mt-5 mb-6 sm:mb-4 ">
                {title && <h1 className="font-bold border-b-[3px] border-[#0384c8] text-2xl sm:text-4xl mb-4 py-5">{title}</h1>}
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
                <p className="text-xl">
                    <>{desc}</>
                    <br/>
                    <br/>
                    {title && <a className="cursor-pointer" onClick={()=>{DownloadAttachment()}}>Download Attachment</a>} 
                </p>
             </div >
              <div className="sm:flex items-start justify-center sm:col-span-1 text-xl rounded-lg mb-6 sm:h-[50%] sm:pt-5 sm:mt-20">
                {img &&
                    <div className="w-[100%] sm:w-[80%] sm:h-[80%] object-cover ">
                        <Image
                            src={img}
                            alt="Image for Announcement"
                            className="w-full h-full object-cover rounded-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                }
            </div>
            
        </div>
    </>);
}

