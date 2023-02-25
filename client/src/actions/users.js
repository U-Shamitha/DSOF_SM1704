import * as api from '../api'

export const fetchAllUsers = () => async(dispatch) => {
    try{
        // console.log("before api fetchAllUsers");
        const { data } = await api.fetchAllUsers();
        // console.log(data)
        dispatch({ type: 'FETCH_USERS', payload: data })
    }catch(error){
        console.log(error)
        console.log(error.message)
    }
}

export const updateProfile = (id, updateData) => async(dispatch) => {
    try{
        console.log('action')
        console.log(updateData)
        const { data } = await api.updateProfile(id,updateData);
        console.log(data)
        dispatch({type: 'UPDATE_CURRENT_USER', payload: data})
    }catch(error){
        console.log(error)
    }
}