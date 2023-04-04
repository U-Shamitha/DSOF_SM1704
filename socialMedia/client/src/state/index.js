import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    userPost: [],
    postedUser: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { //functions which can modify global state
        setMode: (state) => { // callback function returns new modified state, as in redux we can't change the state directly
            state.mode = state.mode === "light" ? "dark" : "light" ;
        },
        setLogin: (state, action) => { // action includes parameters to the function
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user){
                state.user.friends = action.payload.friends;
            }else{
                console.error("User does not exist :(")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;// return the updated post if id matches
                return post; // return previous post if id doesn't match
            })
            console.log(updatedPosts)
            state.posts = updatedPosts;
        },
        setUserPost: (state, action) => {
            state.userPost = action.payload.userPost;
            state.postedUser=null;
            console.log(state.userPost)
        },
        setPostedUser: (state, action) => {
            state.postedUser = action.payload.postedUser;
            console.log(state.postedUser)
        },
        

    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUserPost, setPostedUser} = authSlice.actions;
export default authSlice.reducer;
