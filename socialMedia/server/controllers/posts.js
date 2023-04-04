import Post from '../models/Post.js';
import User from '../models/User.js';

// CREATE
export const createPost = async(req, res) => {
    try{
        console.log(req.body)
        const { userId, description, picturePath, imageUrl, videoUrl } = req.body;
        const user = await User.findById(userId);
        console.log(user)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            userProfileUrl: user.profileUrl,
            picturePath: picturePath,
            imageUrl: imageUrl,
            videoUrl: videoUrl,
            likes: {},
            comments: []
        });
        await newPost.save();
        console.log(newPost)

        const post = await Post.find();
        // console.log(post)
        res.status(201).json(post);

    }catch(err){
        res.status(409).json({message: err.message});
    }
}

// READ
export const getFeedPosts = async(req, res) => {
    try{
        const posts = await Post.find();
        console.log(posts);
        res.status(200).json(posts);
    }catch(err){
        res.status(404).json({message: err.message})
    }   
}

export const getUserPosts = async(req, res) => {
    try{
        const { userId } = req.params;
        const userPosts = await Post.find({ userId: userId }); 
        console.log(userPosts)
        res.status(200).json(userPosts);
    }catch(err){
        res.status(404).json({message: err.message})
    }   
}

// UPDATE
export const likePost = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );
        console.log(updatedPost)
        res.status(200).json(updatedPost);

    }catch(err){
        console.log(err.message)
        res.status(404).json({message: err.message})
    }
}