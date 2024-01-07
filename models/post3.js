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
    },
    picture:{
        type:String,
    }

});

const Post3 =models.Post3 || model("Post3",PostSchema);

export default Post3;