import { PrismaClient } from '@prisma/client'

export const POST = async (req) =>{
    const {text,pDate,type,dept} = await req.json();
    console.log(text)
    console.log(pDate)
    console.log(type)
    console.log(dept)
    
    var pR=0;
    var posts 
    var today = new Date(); 
    var priorDate
    
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
    console.log(tokens)
    try{
        const prisma = new PrismaClient();
        switch (pR) {
            case 0:
                console.log("All")
                posts = await prisma.record.findMany({
                    where:{
                        type:{in:sType},
                        department:{in:sDept}
                    }
                });
                console.log(posts)
                break;
            case 1:
                priorDate = new Date(new Date().setDate(today.getDate()-30));
                posts =await prisma.record.findMany({
                    where:{
                        date:{gt:priorDate},
                        type:{in:sType},
                        department:{in:sDept} 
                    }
                });
                break;
            case 2:
                priorDate = new Date(new Date().setDate(today.getDate()-90));
                posts =await prisma.record.findMany({
                    where : {
                        date:{gt: priorDate},
                        type:{in:sType},
                        department:{in:sDept}

                    }
                })
                break;
            case 3:
                priorDate = new Date(new Date().setDate(today.getDate()-183));
                posts =await prisma.record.findMany({
                    where : {
                        date:{gt:priorDate},
                        type:{in:sType},
                        department:{in:sDept}

                    }
                })
                break;
            case 4:
                priorDate = new Date(new Date().setDate(today.getDate()-366));
                posts =await prisma.record.findMany({
                    where : {
                        date:{gt:priorDate},
                        type:{in:sType},
                        department:{in:sDept}
                    }
                })
                break;
            default:
                break;
        }
        prisma.$disconnect();
        if(tokens.length){
            let searchTermRegex = new RegExp(tokens.join('|'), 'gim');
            const currPosts = posts.filter((post)=>{
                var postString =`${post.title} ${post.description}`;
                postString=postString.toLowerCase();
                return postString.match(searchTermRegex);
            });
            console.log("Text Search");
            return new Response(JSON.stringify(currPosts),{status:201})
        }

        else{
            console.log(posts)
            return new Response(JSON.stringify(posts),{status:201})
        }

    } catch (error) {
        console.log(error)
    }
}

export const GET = async (req)=>{
    try {
        const prisma = new PrismaClient();
        const posts = await prisma.record.findMany();
        prisma.$disconnect();
        return new Response(JSON.stringify(posts),{status:200});

    } catch (err) {
        console.log(err);
    }
}