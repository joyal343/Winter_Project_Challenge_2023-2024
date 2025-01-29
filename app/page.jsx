import NewsItem from "@components/NewsItem"
import {Open_Sans} from "next/font/google"

import DropdownMenu_Tailwind from "@components/DropDown_Tailwind"
// const open_sans=Open_Sans(
//     {

//         weight:400,
//         subsets:['latin'],   
//     })

const page = () => {

  return <div className="flex">
  {/* <div className="w-36"> */}
  <DropdownMenu_Tailwind
    title="Category"
    options={["Academic", "Clubs", "Sports", "Research", "Employment", "Tenders"
    ]}
    
  />

  <DropdownMenu_Tailwind
    title="Department"
    options={["CSE", "ECE", "EEE", "MCE", "CVE"]}
  />

  </div>
}
    
export default page