"use client";

import styles from './NewsItem.module.css';

const NewsItem = (props) => {
    const monthList =["January" , "February" ,"March", "April","May","June","July","August","September","October","November","December"];
    function bannerClass(type) {
        console.log(type);
        if(type==="Academic")
            return styles.Academic_banner;
        else if(type==="Clubs")
            return styles.Clubs_banner;
        else if(type==="Sports")
            return styles.Sports_banner;
        else if(type==="Research")
            return styles.Research_banner;
        else if(type==="Employment")
            return styles.Employment_banner;
        else 
            return styles.Tenders_banner;
    }

    return (
        <div className={styles.ListItemContainer}>
            <div className={styles.ListItem}>
                <div className={styles.LIHeading}>
                    {props.title}
                </div>
                <div className={styles.LIDate}>
                    {
                    (props.date.substring(8, 10)==="01" ? 
                    "1st" : props.date.substring(8, 10)==="02" ?
                     "2nd" : props.date.substring(8, 10)==="03" ? 
                     "3rd" : props.date.substring(8,10)+"th") 
                     + " " + 
                     monthList[Number(props.date.substring(5, 7))-1]
                      + " " +
                       props.date.substring(0, 4)
                    }
                </div>
                <div className={styles.LIDesc}>
                    {props.desc && (props.desc.length > 100 ? props.desc.substring(0, 100) + "..." : props.desc)}
                </div>
            </div>
            <div className={bannerClass(props.annType)+" "+styles.banner}>
                    <div className={styles.b_img}>
                        <img src={"\\assets\\icons\\"+props.annType+".svg"} 
                        alt="" 
                        className={styles.filter_white}
                        />
                    </div>
                    <div className={styles.b_text}>
                        {props.annType}
                    </div>
            </div>
        </div>

    )
}

export default NewsItem