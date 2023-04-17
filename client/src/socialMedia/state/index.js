import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode_sm: "light",
    user_sm: null,
    token_sm: null,
    posts_sm: [],
    userPost_sm: [],
    postedUser_sm: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { //functions which can modify global state
        setMode: (state) => { // callback function returns new modified state, as in redux we can't change the state directly
            state.mode_sm = state.mode_sm === "light" ? "dark" : "light" ;
        },
        setLogin: (state, action) => { // action includes parameters to the function
            console.log("in set login");
            state.user_sm = action.payload.user;
            state.token_sm = action.payload.token;
        },
        setLogout: (state) => {
            state.user_sm = null;
            state.token_sm = null;
        },
        setFriends: (state, action) => {
            if (state.user_sm){
                state.user_sm.friends = action.payload.friends;
            }else{
                console.error("User does not exist :(")
            }
        },
        setPosts: (state, action) => {
            state.posts_sm = action.payload.posts;
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
