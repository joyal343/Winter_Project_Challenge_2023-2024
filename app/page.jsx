import NewsItem from "@components/NewsItem"
import Link from 'next/link';
import Image from 'next/image';
import {Open_Sans} from "next/font/google"

const open_sans=Open_Sans(
    {
        subsets:['latin'],   
    })

const page = () => {

  return <div>Hello</div>
}
    
    // <div >
    //     {list.map((item) => {
    //         return <NewsItem
    //             title={item.title}
    //             date={item.date}
    //             desc={item.desc}
    //         />
    //     })}
    // </div>
export default page