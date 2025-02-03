"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Nav = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    const [isMobileOpen,setMobileOpen] = useState(false)

    console.log("width px?:", windowSize.width);
    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    const toggleMobSidebar = () =>  setMobileOpen(!isMobileOpen)

    return (
        <nav className='relative'>
        <div className=" navbar border border-x-0 border-t-0 border-grey-400">
            {/* Logo */}
            <Link href="/" className={'logo '}>
                <div className='flex_center'>
                    <img
                        src="\assets\icons\backpack3.svg"
                        alt='logo'
                        className='mb-[3px] filter_blue nav_icon_size '
                    />
                </div>
                <p className='logo_text flex_center text-4xl'>Alerts!</p>
            </Link>
            {/* Links */}

            {windowSize.width >= 640 ?
            (<>
                <div className="underline_elt_wrapper">
                    <Link href='/' className={"nav_links underline_elt "}>Home</Link>
                </div>
                <div className="underline_elt_wrapper">
                    <Link href='/news' className={"nav_links underline_elt "}>News</Link>
                </div>
                <div className="underline_elt_wrapper">
                    <Link href='/news' className={"nav_links underline_elt "}>About</Link>
                </div>
                <div className="nav_auth">
                    <button className={"nav_links bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded "}>Register</button>
                    <Link
                        href={"/login"}
                        className={"nav_links bg-transparent hover:bg-sky-500 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded "}
                    >
                        Login
                    </Link>
                </div>
            </>)

            :

            (<button className='ms-auto ' onClick={toggleMobSidebar}>
                <img
                    src="\assets\icons\menu_colored.svg"
                    alt="menu button"
                    className='nav_icon_size'
                />
            </button>)
            }
        </div>
        {/* Mobile Sidebar */}
        {
            (windowSize.width < 640) && (
                <div className={'mob_sidebar_pos flex flex-col absolute top-[60px] duration-500 w-full '+ (isMobileOpen ? "left-0" :"-left-full") }>
                    <div className="underline_elt_wrapper" onClick={toggleMobSidebar}>
                        <Link href='/' className={"nav_links underline_elt "}>Home</Link>
                    </div>
                    <div className="underline_elt_wrapper" onClick={toggleMobSidebar}>
                        <Link href='/news' className={"nav_links underline_elt "}>News</Link>
                    </div>
                    <div className="underline_elt_wrapper" onClick={toggleMobSidebar}>
                        <Link href='/news' className={"nav_links underline_elt "}>About</Link>
                    </div>
                    <div className="flex flex-col px-4 grow">
                        <Link
                            href={"/login"}
                            className={"nav_links bg-transparent hover:bg-sky-500 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded "}
                        >
                            Login
                        </Link>
                        <button className={"nav_links bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded "}>Register</button>
                    </div>
                </div>
            )
        }
        </nav>
    )
}

export default Nav

