import Post from '../models/Post.js';

export const getUserPost = async(req, res) => {
    try{
        const { postId } = req.params;
        const userPost = await Post.find({ _id: postId }); 
        console.log(userPost)
        res.status(200).json(userPost);
    }catch(err){
        res.status(404).json({message: err.message})
    }   
}