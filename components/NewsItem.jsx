"use client";

import styles from './NewsItem.module.css';
import NewsItemImage from './NewsItemImage.jsx';

const NewsItem = (props) => {
    
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className={styles.ListItemContainer+" shadow-lg w-[80%] sm:w-[70%]"}>
            <div className='flex justify-start'>
                <NewsItemImage
                    hasImg={props.hasImg}
                    ImgURL={props.imgURL}
                    annType={props.annType}
                />
            </div>
            <div className={styles.ListItem}>
                <div className={styles.LIHeading + " text-[20px] sm:text[28px] mb-[10px] inline-block"}>
                    {props.title}
                </div>
                <div className="text-[18px] my-10 mx-0">
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