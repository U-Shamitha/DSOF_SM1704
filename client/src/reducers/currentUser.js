const currrentUserReducer = (state =  null, action) => {
    switch(action.type){
        case 'FETCH_CURRENT_USER':
            // console.log("usr payload"+action.payload)
            return action.payload;
        default:
            return state;

    }
}

export default currrentUserReducer;