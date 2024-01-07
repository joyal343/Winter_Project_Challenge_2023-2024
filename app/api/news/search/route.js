import { connectToDB } from "@utils/database";
import Post from '@models/post3';
// prioirDate = new Date(new Date().setDate(today.getDate()-30));
// prioirDate = new Date(new Date().setDate(today.getDate()-90));
// prioirDate = new Date(new Date().setDate(today.getDate()-183));
// prioirDate = new Date(new Date().setDate(today.getDate()-366));
// prioirDate.getDate();
// prioirDate.getMonth()+1;
// prioirDate.getFullYear();

export const POST = async (req) =>{
    const {text,pDate,type,dept} = await req.json();
    var pR=0;
    
    let today =new Date(); 
    let priorDate;
    
    pDate.forEach((elt,ind) => {
        if(elt===true)
            pR = ind;       
    });

    var sDept=["CSE","ECE","EEE","MCE","CVE"];
    sDept=sDept.filter((elt,index)=>{return dept[index]; });
    
    var sType=["Academic","Clubs","Sports","Research","Employment","Tenders"];
    sType=sType.filter((elt,index)=>{return type[index];});

    const tokens = text
        .toLowerCase()
        .split(' ')
        .filter(function(token){
                return token.trim() !== '';
        });
    
    try{
        await connectToDB();
        let posts 
        if (pR===0) {
            posts = await Post.find({});
        } else if (pR===1){
            
        }
        switch (pR) {
            case 0:
                posts =await Post.find({});
                break;
            case 1:
                priorDate = new Date(new Date().setDate(today.getDate()-30));
                posts =await Post.find({date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`}});
                break;
            case 2:
                priorDate = new Date(new Date().setDate(today.getDate()-90));
                posts =await Post.find({date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`}});
                break;
            case 3:
                priorDate = new Date(new Date().setDate(today.getDate()-183));
                posts =await Post.find({date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`}});
                break;
            case 4:
                priorDate = new Date(new Date().setDate(today.getDate()-366));
                posts =await Post.find({date:{$gte:`${priorDate.getFullYear()}-${priorDate.getMonth()+1}-${priorDate.getDate()}`}});
                break;
            default:
                break;
        }

        if(sDept.length){
            posts=posts.filter((post)=>{
                return sDept.includes(post.annDept);
            });
        }

        if(sType.length){
            posts=posts.filter((post)=>{
                return sType.includes(post.annType);
            });
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