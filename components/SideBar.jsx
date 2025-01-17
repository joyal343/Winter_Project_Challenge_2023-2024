import styles from "./SideBar.module.css";
import Link from "next/link";
import Image from 'next/image';

const SideBar = ({ links, linkURL }) => {
    return (
        <div className={styles.sidebar}>
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
            <div className={styles.links}>
                {links.map((link, index) => (<Link key={index} href={linkURL[index]}>{link}</Link>))}
            </div>
        </div>
    )
}

export default SideBar