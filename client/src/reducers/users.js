const usersReducer = (states = [], action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            // console.log(action.payload)
            return action.payload;
            break;

        case 'UPDATE_CURRENT_USER':
            return states.map((state) => state._id === action.payload._id ? action.payload : state) // logged in user updated data and other users previous data is returned
    
        default:
            return states;
            break;
    }
}

export default usersReducer;