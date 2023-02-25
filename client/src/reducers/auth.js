const authReducer = (state={data:null}, action) => {
    // console.log("before switch")
    switch (action.type){
        case 'AUTH':
            // console.log("in AUTH")
            localStorage.setItem('Profile', JSON.stringify({...action.data})) //"?" : optional operator it will fetch data if it exists
            return {...state, data: action?.data}

        case 'LOGOUT':
            localStorage.clear();
            return {...state, data: null}
            
        default:
            // console.log("in default")
            return state;
    }
}

export default authReducer;