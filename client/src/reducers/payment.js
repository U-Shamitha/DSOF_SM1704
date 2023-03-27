const typeReducer = (state="1", action) => {
    switch(action.type){
        case "SET_TYPE" :
            console.log("in set type");
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
}
export default typeReducer;