"use client";
// import {Open_Sans} from "next/font/google"
// const open_sans=Open_Sans(
//     {
//         subsets:['latin'],   
//     }

// )

const NewsItem = (props) => {
    return (
<div className="ListItemContainer">
        <div className={"ListItem "}>
            <div className="LIHeading ">
                {props.title}
            </div>
            <div className="LIDate">
                {props.date.substring(8,10) +" "+props.date.substring(5,7)+" "+props.date.substring(0,4)} 
            </div>
            <div className="LIDesc">
                {props.desc && (props.desc.length > 100 ? props.desc.substring(0,100)+"..." : props.desc)} 
            </div>
        </div>
        <div className="banner">{props.annType}</div>
</div>

  )
}

export default NewsItem