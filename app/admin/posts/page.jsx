"use client";
import SideBar from "@components/SideBar";
import NewsItem from "@components/NewsItem";
import Search from "@components/Search";
import DropdownMobile from "@components/DropdownMobile";
import Example from "@components/Modal";
import { useState, useEffect, useContext } from 'react';
import { MyContext } from "@/context";
import Loader from "@components/Loader";
import UpdateModal from '@components/UpdateModal.jsx';

const NewsItemsList = ({ posts, isMobile, handleDel, handleUpdate, handleSearch, setCurrPosts }) => {
    // Pagination also needs to be added

    return (
        <div className='flex flex-col items-center sm:block w-[100%]'>
            <div className="flex items-center">
                <div className="text-[20px] sm:text-[20px] text-gray-500">{"Results " + posts.length}</div>
                <div className="hidden sm:block ml-[auto] my-[auto]">
                    <Example
                        isMobile={false} 
                        styles = "w-8 h-8 rounded-full border-gray-700"
                        callback={(newPost) => setCurrPosts((prevPosts) => [...prevPosts, newPost])} 

                    />
                </div>
            </div>

            {posts.map((post) => {
                console.log("Post: ", post);
                return <div 
                    className="w-[100%]"
                    id = {post.id} key={post.id}
                >
                    <NewsItem
                    title={post.title}
                    date={post.date}
                    desc={post.description}
                    annType={post.type}
                    del={true}
                    id={post.id}
                    handleDel={handleDel}
                    handleUpdate={handleUpdate}
                    hasImg={false}
                    imgURL={".assets/uploaded_images/" + post.picture}
                    isMobile={isMobile}
                    
                /></div>
            })}
        </div>
    )
}
const page = () => {
    const filterOptions = { // Options displayed in mobile horizontal dropdown
        Date: [
            "All Date",
            "Last 30 Days",
            "Last 60 Days",
            "Last 6 Months",
            "Last 12 Months",
        ],
        Category: [
            "Academic",
            "Clubs",
            "Sports",
            "Research",
            "Employment",
            "Tenders",
        ],
        Department: ["CSE", "ECE", "EEE", "MCE", "CVE"],
    };

    const { windowSize, setWindowSize } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);
    const [currPosts, setCurrPosts] = useState([]); // Posts Displayed on Screen
    const [open,setOpen] = useState(false)
    
    // Data to be updated in the Modal

    const [idVal, setIdVal] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [dept, setDept] = useState("");
    const [file, setFile] = useState(null);

    const handleLoading = () => setIsLoading(false)

    // Getting Posts from the Backend
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/news/search');
            const data = await response.json();
            setCurrPosts(data);
        }
        handleLoading();
        fetchPosts();
        
    }, []);

    // Function to Delete a Post
    async function handleDel(id) {
        const response = await fetch('/api/news', {
            method: "DELETE",
            body: JSON.stringify({
                id: id
            })
        });
        if (!response.ok) {
            console.error("Failed to delete post with id:", id);
            return;
        }
        console.log("DELETE RESPONSE:",response);
        setCurrPosts(currPosts.filter(post => post.id !== id));
        // document.getElementById(id).remove();
        // handleSearch("", [true, false, false, false, false], new Array(6).fill(false), new Array(5).fill(false))
    }

    // Function to Handle Search Requests
    const handleSearch = async (text, pDate, type, dept) => {
        const response = await fetch('/api/news/search', {
            method: "POST",
            body: JSON.stringify({
                text: text,
                pDate: pDate,
                type: type,
                dept: dept
            })
        });
        const data = await response.json();
        setCurrPosts(data);
    }

    async function handleUpdate(id) {
        try {
            // Searchs based on ID
            const response = await fetch('/api/news/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch announcement data');
            }
            const data = await response.json();
            setIdVal(id)
            setTitle(data.title);
            setDesc(data.description);
            setType(data.type);
            setDept(data.department)
            setFile(null);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    }
    

    return (<>
        <Loader isLoading = {isLoading}/>
        <UpdateModal 
            open = {open}
            setOpen = {setOpen}
            id = {idVal}
            title = {title}
            desc = {desc}
            type = {type}
            dept = {dept}
            file = {file} 
            
            // Functions to update the data to be Transmitted
            setType = { setType}
            setDept = {setDept}
            setTitle = {setTitle}
            setDesc = {setDesc}
            setFile = {setFile}
            
            // Performs update to posts in frontend
            callback = {(data) => {
                setCurrPosts(currPosts.map(post => {
                    if (post.id === data.get('id')){
                        console.log("Updating Post Insides: ", post)
                        post.title = data.get('title');
                        post.description = data.get('desc');
                        post.department = data.get('dept');
                        post.type = data.get('type');
                    } 
                    return post;
                }))
            }}
        />
        <div className={"flex w-[100%] p-4 sm:p-0"}>
           {
                windowSize.width >= 640 ? 
                <></>    
                    :
                <div className="fixed bottom-4 left-4 z-10">
                    { !isLoading &&
                    <Example 
                        isMobile = {true}
                        styles = "w-16 h-16 rounded-full bg-white border-[#0384c8]"
                        callback={() => { handleSearch("", [true, false, false, false, false], new Array(6).fill(false), new Array(5).fill(false)) }} 
                    />}
                </div>
            }
            <div className={"hidden sm:flex sm:flex-col sm:w-[15%]"}>
                <SideBar
                    links={["Dashboard", "Posts"]}
                    linkURL={["\\admin\\dashboard", "\\admin\\posts"]}
                    linkImg={["/assets/icons/DashBoardIcon.svg", "/assets/icons/Posts.svg"]}
                />
            </div>
            <div className="flex w-[100%] sm:w-[80%] sm:pl-5">
                <div className='flex grow flex-col-reverse sm:flex-row sm:mt-5'>

                    <div className="w-[100%] sm:w-[80%] sm:px-4 sm:pt-10 mx-auto">
                        <NewsItemsList
                            posts={currPosts}
                            isMobile={windowSize.width >= 640 ? false : true}
                            handleSearch={handleSearch}
                            handleDel={handleDel}
                            handleUpdate={handleUpdate}
                            setCurrPosts={setCurrPosts}
                            callback={() => { handleSearch("", [true, false, false, false, false], new Array(6).fill(false), new Array(5).fill(false)) }}
                        />
                    </div>
                    <div className='flex justify-center  sm:w-[20%] sm:pt-10 sm:mx-auto'>
                        {
                            windowSize.width >= 640 ?
                                <Search 
                                    handleSearch={handleSearch} 
                                />
                                :
                                <DropdownMobile
                                    filterOptions={filterOptions}
                                    handleSearch={handleSearch}
                                />
                        }

                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default page