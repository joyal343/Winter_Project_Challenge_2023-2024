"use client";
import { useState } from 'react';
import styles from './NewsItem.module.css';
import NewsItemImage from './NewsItemImage.jsx';


const { useRouter } = require('next/navigation');

const NewsItem = (props) => {
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const router = useRouter();

    async function gotoAnnouncement() {
        router.push(`/news/${props.id}`);
    }

    

    return (
        <>
        
        <div
            className={"hover:scale-[1.02] transition-transform duration-300 hover:cursor-pointer w-[100%] flex gap-2 sm:gap-10 mb-5 py-6 px-4 rounded-md shadow-lg  text-nav  bg-white opacity-90"}
        >
            {!props.isMobile &&
                <div className='flex justify-start sm:flex-[1]' onClick={gotoAnnouncement}>
                    <NewsItemImage
                        hasImg={props.hasImg}
                        ImgURL={props.imgURL}
                        annType={props.annType}
                    />
                </div>
            }
            <div className='flex-[9] sm:flex-[8]' onClick={gotoAnnouncement}>
                <div
                    className={"text-[var(--text-col-dark)] font-bold border-b-[3px] border-[#0384c8] text-[20px] sm:text[28px] mb-2 inline-block"}
                >
                    {props.title}
                </div>
                <div className="text-[18px] mb-2 ">
                    {props.desc && (props.desc.length > 100 ? props.desc.substring(0, 100) + "..." : props.desc)}
                </div>
                <div className="text-[14px]">
                    {
                        (props.date.substring(8, 10) === "01" ?
                            "1st" : props.date.substring(8, 10) === "02" ?
                                "2nd" : props.date.substring(8, 10) === "03" ?
                                    "3rd" : props.date.substring(8, 10) + "th")
                        + " " +
                        monthList[Number(props.date.substring(5, 7)) - 1]
                        + " " +
                        props.date.substring(0, 4)
                    }
                </div>

            </div>
            {props.del ?<div className ="flex-[1] sm:flex-[1] flex flex-col justify-center items-center gap-5">

                <div className={styles.delBtn}>
                    <img
                        src={"\\assets\\icons\\delete_July.svg"}
                        width={25}
                        height={25}
                        alt='Delete Announcement'
                        className='filter_light_grey'
                        onClick={() => { props.handleDel(props.id) }}
                    />
                </div>
                {/* Update Button */}
                <div>
                    <img
                        src={"\\assets\\icons\\edit_July.svg"}
                        width={25}
                        height={25}
                        alt='Update Announcement'
                        className='filter_light_grey'
                        onClick={() => { props.handleUpdate(props.id) }}
                    />

                </div>
            </div>
                : <></>}
        </div>
    </>)
}

export default NewsItem