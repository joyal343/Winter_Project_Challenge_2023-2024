"use client";

import styles from './NewsItem.module.css';
import NewsItemImage from './NewsItemImage.jsx';
import Image from 'next/image';

const NewsItem = (props) => {
    
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className={styles.ListItemContainer+" shadow-lg"}>
            <div className={styles.image_container}>
                <NewsItemImage
                    hasImg={props.hasImg}
                    ImgURL={props.imgURL}
                    annType={props.annType}
                />
            </div>
            <div className={styles.ListItem}>
                <div className={styles.LIHeading}>
                    {props.title}
                </div>
                <div className={styles.LIDesc}>
                    {props.desc && (props.desc.length > 100 ? props.desc.substring(0, 100) + "..." : props.desc)}
                </div>
                <div className={styles.LIDate}>
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