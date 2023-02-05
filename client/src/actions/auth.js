import * as api from '../api'


console.log(api)


export const signup = (authData, navigate) => async(dispatch) => {
    try{
        const { data } = await api.signUp(authData)
        dispatch( {type: 'AUTH', data})
        navigate('/')
    }catch(error){
        console.log(error)
    }
}
export const login = (authData, navigate) => async(dispatch) => {
    console.log("after line12")
    try{
        console.log("before await")
        const { data } = await api.logIn(authData);
        console.log("after await")
        console.log(data)
        dispatch( {type: 'AUTH', data})
        navigate('/')
    }catch(error){
        console.log(error)
    }
}
