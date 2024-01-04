import {Schema , model ,models} from 'mongoose';

const PostSchema= new Schema({
    title: {
        type: String,
    },
    date:{
        type:Date,
    },
    desc:{
        type:String,
    },
    annType:{
        type:String,
    },
    annDept:{
        type:String,
    }


});

// match can be used to set Regular Expression constraint 
// type is academic,research,employment,clubs,sports,tenders
//department CSE MCE 
const Post2 =models.Post2 || model("Post2",PostSchema);
// models.Post ||
export default Post2;