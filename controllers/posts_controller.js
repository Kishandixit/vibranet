const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content:req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    }catch(err){
        console.log("Error",err);
        return;
    }
}

// TO DELETE  A POST 

module.exports.delete =async function(req,res){
    try{
        let post =  await Post.findById(req.params.id);

        // .id means converting the Object id into string
 
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post:req.params.id});
            return  res.redirect('back')
        }else{
            return  res.redirect('back');
        }
        
    }catch(err){
        console.log("Error",err);
        return;
    }
    // First we have to find the post in database
}