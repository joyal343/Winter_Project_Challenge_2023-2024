import { connectToDB } from "@utils/database";
import Post from '@models/post3';

export const POST = async (req) =>{
    const {text,pDate,type,dept} = await req.json();
    console.log(text)
    console.log(pDate)
    console.log(type)
    console.log(dept)
    var pR=0;
    
    let today = new Date(); 
    let priorDate;
    
    pDate.forEach((elt,ind) => {
        if(elt===true)
            pR = ind;       
    });

    var sDept=["CSE","ECE","EEE","MCE","CVE"];
    sDept=sDept.filter((elt,index)=> dept[index])
    if (sDept.length === 0) { sDept=["CSE","ECE","EEE","MCE","CVE"];}
    
    var sType=["Academic","Clubs","Sports","Research","Employment","Tenders"];
    sType=sType.filter((elt,index)=> type[index] )
    if (sType.length === 0) { sType=["Academic","Clubs","Sports","Research","Employment","Tenders"];}

    const tokens = text
        .toLowerCase()
        .split(' ')
        .filter(function(token){
                return token.trim() !== '';
        });
    
    try{
        await connectToDB();
        let posts 
        switch (pR) {
            case 0:
                posts =await Post.find({
                    annType:{$in:sType},
                    annDept:{$in:sDept}
                });
                break;
            case 1:
                priorDate = new Date(new Date().setDate(today.getDate()-30));
                posts =await Post.find({
                    date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`},
                    annType:{$in:sType},
                    annDept:{$in:sDept} 
                });
                break;
            case 2:
                priorDate = new Date(new Date().setDate(today.getDate()-90));
                posts =await Post.find({
                    date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`},
                    annType:{$in:sType},
                    annDept:{$in:sDept}
                }).exec();
                break;
            case 3:
                priorDate = new Date(new Date().setDate(today.getDate()-183));
                posts =await Post.find({
                    date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`},
                    annType:{$in:sType},
                    annDept:{$in:sDept}
                }).exec();
                break;
            case 4:
                priorDate = new Date(new Date().setDate(today.getDate()-366));
                posts =await Post.find({
                    date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`},
                    annType:{$in:sType},
                    annDept:{$in:sDept}
                }).exec();
                break;
            default:
                break;
        }

        if(tokens.length){
            let searchTermRegex = new RegExp(tokens.join('|'), 'gim');
            const currPosts = posts.filter((post)=>{
                var postString='';
                postString+=`${post.title} ${post.desc}`
                postString=postString.toLowerCase();
                return postString.match(searchTermRegex);
            });
            console.log(currPosts);
            return new Response(JSON.stringify(currPosts),{status:201})
        }

        else{
            return new Response(JSON.stringify(posts),{status:201})
        }

    } catch (error) {
        console.log(error)
    }
}