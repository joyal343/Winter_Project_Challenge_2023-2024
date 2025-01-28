import styles from "./SideBar.module.css";
import Link from "next/link";
import Image from 'next/image';

const SideBar = ({ links, linkURL, linkImg }) => {
    return (
        <div className={"border border-t-0 border-grey-400 "+styles.sidebar}>
            <div className={styles.profile}>
                <div className={styles.img_cont + " flex_center"}>
                    <Image
                        src="/assets/icons/Employment.svg"
                        alt="Profile Image"
                        width={20}
                        height={20}
                        className={styles.profile_image + " filter_blue"}
                    />

                </div>
                <h2 className={styles.username}>John Doe</h2>
            </div>
            <div>
                {links.map((link, index) => (
                <div 
                className={"flex justify-evenly "+styles.sidebar_link}
                key={index}>
                    <Image
                        src={linkImg[index]}
                        alt="Profile Image"
                        width={15}
                        height={15}
                        className={styles.profile_image}
                    />
                    <Link 
                    // key={index} 
                    href={linkURL[index]}
                    >{link}</Link>

                </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar