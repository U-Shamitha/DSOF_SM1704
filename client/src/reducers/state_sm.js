import { useDispatch } from "react-redux";

const stateReducer = (state={data: null}, action) => {
    // console.log("before switch")
    switch (action.type){
        case 'LOGIN_SM':
            console.log("in set login");
            console.log(action.payload.user_sm);
            console.log(action.payload.token_sm);
            console.log(action.payload)
            localStorage.setItem('user_sm',JSON.stringify(action.payload.user_sm));
            localStorage.setItem('token_sm',JSON.stringify(action.payload.token_sm));
            return {...state, data:action.payload}

        case 'SETPOST_SM':
            return {...state, data: action.payload}

        case 'SETPOSTS_SM':
            console.log("in set posts");
            console.log(action.payload.posts_sm);
            return {...state, data: action.payload}

        case 'SETUSERPOSTS_SM':
            console.log("in set user posts");
            console.log(action.payload.userposts_sm);
            return {...state, data: action.payload}

        case 'SETFRIENDS_SM':
            console.log("in set friends");
            console.log(action.payload.friends_sm);
            const user = JSON.parse(localStorage.getItem('user_sm'));
            if (action.payload.friends_sm){
            user.friends = action.payload.friends_sm
            localStorage.setItem('user_sm',JSON.stringify(user));
            return {...state, data:action.payload}
            }
            return{...state, data:action.payload}

        case 'SETLOGOUT_SM':
            console.log("in logout");
            localStorage.clear();
            return{...state}

        default:
            // console.log("in default")
            return state;
    }
}

export default stateReducer;