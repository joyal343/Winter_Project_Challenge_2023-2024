import React from 'react'
import styles from "./NewsItem.module.css" 

const NewsItemImage = ({ hasImg, ImgURL, annType }) => {
    
    function handleImage(annType) {
        return `\\assets\\icons\\${annType}.svg`
    }
    return (
        hasImg ?
            (<div className={styles.image}>
                <img
                    width={75}
                    height={75}
                    src={ImgURL}
                    alt="announcement image" 
                />
            </div>)
        
            :
            (<div className={styles.image}>
                <img
                    width={75}
                    height={75}
                    src={handleImage(annType)}
                    alt="announcement image"
                    className='filter_light_grey'
                />
            </div>)
    )
}

export default NewsItemImage