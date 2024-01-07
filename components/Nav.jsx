import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
    return (
        <nav>
            <div className="navbar">
                <Link href="/" className={'logo '}>
                    <div className='logo_img flex_center'>
                        <Image
                            src="\assets\icons\backpack3.svg"
                            alt='logo'
                            width={30}
                            height={30}
                            style={{ marginBottom: "3px" }}
                            className='filter_white'
                        />
                    </div>
                    <p className='logo_text flex_center'>Alerts!</p>
                </Link>
                <Link href='/news' className={"nav_links "}>Home</Link>
                <Link href='/news' className={"nav_links "}>News</Link>
                <div className="nav_auth">
                    <button className={"nav_links register "}>Register</button>
                    <button className={"nav_links login "}>Login</button>
                </div>
            </div>
        </nav>
    )
}

export default Nav

