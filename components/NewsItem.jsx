"use client";

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
        
        <div 
            className={"hover:scale-[1.02] transition-transform duration-300 flex gap-10 mb-5 rounded-md py-6 px-4 shadow-lg w-[100%] text-nav hover:cursor-pointer"}
        >
            <div className='flex justify-start' onClick={gotoAnnouncement}>
                <NewsItemImage
                    hasImg={props.hasImg}
                    ImgURL={props.imgURL}
                    annType={props.annType}
                />
            </div>
            <div className='grow' onClick={gotoAnnouncement}>
                <div 
                    className={"text-[var(--text-col-dark)] font-bold border-b-[3px] border-[#8B80F9] text-[20px] sm:text[28px] mb-2 inline-block"}
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
            {props.del ? 
            <div className={styles.delBtn}>
                <img
                    src={"\\assets\\icons\\Cross.svg"}
                    width={30}
                    height={30}
                    alt='Delete Announcement'
                    className='filter_light_grey'
                    onClick={()=>{props.handleDel(props.id)}}
                />
            </div>
            :<></>}
        </div>
    )
}

export default NewsItem