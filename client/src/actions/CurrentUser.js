export const setCurrentUser = (data) => {
    console.log("setCurrentUser: ");
    console.log(data)
    return{
        type: 'FETCH_CURRENT_USER',
        payload: data
    }
}