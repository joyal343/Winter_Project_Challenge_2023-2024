import React from 'react'
import styles from "./NewsItem.module.css" 

const NewsItemImage = ({ hasImg, ImgURL, annType }) => {
    function handleImage(annType) {
        return `\\assets\\icons\\${annType}.svg`
    }
    return (
        hasImg ?
            <div className={styles.image}>
                <img
                src={ImgURL}
                alt="" 
                />
            </div>
        
            :
            <div className={styles.image}>
                <img
                    src={handleImage(annType)}
                    alt=""
                    className='filter_light_grey'
                />
            </div>
    )
}

export default NewsItemImage