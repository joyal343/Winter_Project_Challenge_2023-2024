import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
    return (
        <nav>
            <div className="navbar border border-x-0 border-t-0 border-grey-400 ">
                <Link href="/" className={'logo '}>
                    <div className='logo_img flex_center'>
                        <Image
                            src="\assets\icons\backpack3.svg"
                            alt='logo'
                            width={30}
                            height={30}
                            style={{ marginBottom: "3px" }}
                            className='filter_blue'
                        />
                    </div>
                    <p className='logo_text flex_center'>Alerts!</p>
                </Link>
                <div className="underline-elt_wrapper">                    
                    <Link href='/news' className={"nav_links underline_elt "}>Home</Link>
                </div>
                <div className="underline-elt_wrapper">                    
                    <Link href='/news' className={"nav_links underline_elt "}>News</Link>
                </div>
                <div className="nav_auth">
                    <button className={"nav_links bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded "}>Register</button>
                    <button className={"nav_links bg-transparent hover:bg-sky-500 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded "}>Login</button>
                </div>
            </div>
        </nav>
    )
}

export default Nav

