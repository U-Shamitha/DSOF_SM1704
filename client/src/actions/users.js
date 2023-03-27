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

export const setNewSubscription = (userId, type) => async (dispatch) => {
    try {
        const { data } = await api.setSubscription(userId, type)
        console.log(data);
        // data && localStorage.setItem('Profile', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
}

export const setQuestionsLeft = (userId, quesLeft) => async (dispatch) => {
    try {
        console.log("setQuestionsLeft: ");
        console.log(quesLeft);
        const { data } = await api.updateQuestionsLeft(userId, quesLeft);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const setValidDay = (userId, validDay) => async (dispatch) => {
    try {
        const { data } = await api.updateValidDay(userId, validDay);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

export const setMode = (userId, mode) => async (dispatch) => {
    try {
        const { data } = await api.updateMode(userId, mode);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}