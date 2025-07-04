"use client"

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { MyContext } from "@/context";

const Nav = () => {
    const { windowSize, setWindowSize, isLoggedIn, setIsLoggedIn } = useContext(MyContext);
    const [isMobileOpen, setMobileOpen] = useState(false)
    const [userName, setUserName] = useState("")

    const toggleMobSidebar = () => setMobileOpen(!isMobileOpen)

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const userName = getCookie('user_name');
        if (isLoggedIn) setUserName(userName)

    }, [isLoggedIn]);

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
                    <>
                        
                        <div className="underline_elt_wrapper">
                            <Link href='/news' className={"nav_links underline_elt "}>News</Link>
                        </div>
                        <div className="underline_elt_wrapper">
                            <Link href='/news' className={"nav_links underline_elt "}>About</Link>
                        </div>
                        {isLoggedIn && <div className="underline_elt_wrapper">
                            <Link href='/admin/posts' className={"nav_links underline_elt "}>Admin</Link>
                        </div>}
                        
                        <div className="nav_auth">{
                            isLoggedIn ?
                                <a 
                                    className="flex gap-3 items-center mr-4 text-lg"
                                    href="/admin/posts"
                                >
                                    {userName}
                                    <img
                                        src={`\\assets\\icons\\Clubs.svg`}
                                        alt=""
                                        width={30}
                                        height={30}
                                        className = "border-2 rounded-full border-sky-500 "
                                    />
                                </a>
                                :
                                <>
                                    <Link
                                        href={"/register"}
                                        className={"nav_links bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded "}
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={"/login"}
                                        className={"nav_links bg-transparent hover:bg-sky-500 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded "}
                                    >
                                        Login
                                    </Link>
                                </>
                        }
                        </div>
                    </>
                    :

                    <button className='ms-auto ' onClick={toggleMobSidebar}>
                        <img
                            src="\assets\icons\menu_colored.svg"
                            alt="menu button"
                            className='nav_icon_size'
                        />
                    </button>
                }
            </div>
            {/* Mobile Sidebar */}
            {
                (windowSize.width < 640) && (
                    <div className={'mob_sidebar_pos flex flex-col gap-5 absolute top-[60px] duration-500 w-full ' + (isMobileOpen ? "left-0" : "-left-full")} >
                        
                        <div className="underline_elt_wrapper mt-2" onClick={toggleMobSidebar}>
                            <Link href='/news' className={"nav_links underline_elt "}>News</Link>
                        </div>
                        <div className="underline_elt_wrapper" onClick={toggleMobSidebar}>
                            <Link href='/news' className={"nav_links underline_elt "}>About</Link>
                        </div>
                        { isLoggedIn && <div className="underline_elt_wrapper" onClick={toggleMobSidebar}>
                            <Link href='/admin/dashboard' className={"nav_links underline_elt "}>Dashboard</Link>
                        </div>}
                        {isLoggedIn && <div className="underline_elt_wrapper" onClick={toggleMobSidebar}>
                            <Link href='/admin/posts' className={"nav_links underline_elt "}>Posts</Link>
                        </div>}
                        {isLoggedIn ?
                            <div className="text-xl flex grow pl-[20px] items-end justify-start gap-4">
                               
                                {userName}
                                <img
                                        src={`\\assets\\icons\\Clubs.svg`}
                                        alt=""
                                        width={30}
                                        height={30}
                                        className = "border-2 rounded-full border-sky-500 "
                                    />
                            </div>
                            :
                            <div className="flex flex-col justify-end px-4 grow gap-4" >
                                <Link
                                    href={"/login"}
                                    className={"nav_links bg-transparent hover:bg-sky-500 text-sky-700 font-semibold hover:text-white py-2 px-4 border border-sky-500 hover:border-transparent rounded "}
                                    onClick={toggleMobSidebar}
                                >
                                    Login
                                </Link>

                                <Link
                                    href={"/register"}
                                    className={"nav_links bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded "}
                                    onClick={toggleMobSidebar}
                                >
                                    Register
                                </Link>
                            </div>
                        }
                        <div className='w-full h-5'></div>
                    </div>
                )
            }
        </nav>
    )
}

export default Nav

