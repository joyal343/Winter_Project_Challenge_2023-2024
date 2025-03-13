import styles from "./SideBar.module.css";
import Link from "next/link";
import Image from 'next/image';

const SideBar = ({ links, linkURL, linkImg }) => {
    return (
        <div className={"border border-t-0 border-grey-400 " + styles.sidebar}>
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
                        className={"flex no-underline text-[var(--sidebar-text)] pl-3 pr-2 py-3 transition-colors duration-300 hover:bg-gray-300"}
                        key={index}>
                        <Image
                            src={linkImg[index]}
                            alt={link}
                            width={25}
                            height={25}
                            className={"mr-3"}
                        />
                        <Link
                            // key={index} 
                            href={linkURL[index]}
                        >
                            {link}
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar