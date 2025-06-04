"use client";

import SideBar from "@components/SideBar";
import {useContext, useState, useEffect} from 'react';
import { MyContext } from "@/context";
import Loader from "@components/Loader";
const DashboardInfo = () => {
    const { windowSize, setWindowSize } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);
    const [postCount, setPostCount] = useState(0);
    const [docCount, setDocCount] = useState(0);
    const handleLoading = () => setIsLoading(false);


    async function fetchCounts() {

        try {
            const response = await fetch('/api/news/count');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched counts:', data);
            setDocCount(data.recordsWithFileLocation);
            setPostCount(data.totalRecords);
        } catch (error) {
            console.error('Error fetching document count:', error);
        }
    }
    useEffect(() => {
        fetchCounts();
        handleLoading();
    },[])
    return (<>
        <Loader isLoading={isLoading} />
        <div className={"flex w-[100%] p-4 sm:p-0"}>
            { windowSize.width >= 640 &&

                <div className={"hidden sm:flex sm:flex-col sm:w-[15%]"}>
                <SideBar
                    links={["Dashboard", "Posts"]}
                    linkURL={["\\admin\\dashboard", "\\admin\\posts"]}
                    linkImg={["/assets/icons/DashBoardIcon.svg", "/assets/icons/Posts.svg"]}
                    />
                </div>
            }
            <div className="flex flex-col items-center justify-start pt-4 sm:pt-36 min-h-[100vh] w-[100%]  sm:w-[85%] font-sans">
                <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
                <div className="flex gap-8 mt-6">
                    <div className="bg-sky-100 px-8 py-6 rounded-lg text-center shadow">
                        <h3 className="text-3xl font-bold">{postCount}</h3>
                        <p className="text-gray-600">Posts</p>
                    </div>
                    <div className="bg-sky-100 px-8 py-6 rounded-lg text-center shadow">
                        <h3 className="text-3xl font-bold">{docCount}</h3>
                        <p className="text-gray-600">Documents</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default DashboardInfo;
