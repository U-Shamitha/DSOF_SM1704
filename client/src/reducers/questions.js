const questionsReducer = (state=null, action) => {
    switch(action.type){
        case "POST_QUESTION" :
            return {...state};

        //Answer-7
        case "POST_ANSWER" :
            return {...state};

        //gaQ 6
        case 'FETCH_ALL_QUESTIONS':
            return {...state, data: action.payload}

        default:
            return state;
    }
}
export default questionsReducer;