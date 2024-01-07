import styles from "./SideBar.module.css";
import Link from "next/link";
const SideBar = ({links,linkURL}) => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.profile}>
                <div className={styles.img_cont+" flex_center"}>
                <img 
                src="/assets/icons/Employment.svg" 
                alt="Profile Image" 
                className={styles.profile_image} />

                </div>
                <h2 className={styles.username}>John Doe</h2>
            </div>
            <div className={styles.links}>
                {links.map((link,index)=>(<Link href={linkURL[index]}>{link}</Link>))}
            </div>
        </div>
    )
}

export default SideBar