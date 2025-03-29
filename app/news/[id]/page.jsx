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
        <div className="grid grid-cols-3 grid-rows-[20vh_auto] h-screen w-full gap-2">
            {/* Image spanning 3 columns */}
            <div className="col-span-3 row-span-1">
                {banner &&
                    <img
                        src={banner}
                        alt="Header Image"
                        className="w-full h-full object-cover rounded-lg"
                    />}
            </div>

            {/* Div spanning 2 columns in the second row */}

            <div className="flex flex-col col-span-2  pl-16">
                <h1 className="font-bold border-b-[3px] border-[#8B80F9] text-4xl mb-4 py-5">{title}</h1>
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
                <p className="mb-4">{desc}</p>
                <p>Download Attachment</p>

            </div>


            {/* Div occupying remaining 1 column in second row */}
            <div className=" flex items-start justify-center text-xl rounded-lg h-[50%] pt-5">
                {img &&
                    <div className="w-[70%] h-[70%] object-cover ">
                        <img
                            src={img}
                            alt="Header Image"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                }
            </div>
        </div>
    );
}

