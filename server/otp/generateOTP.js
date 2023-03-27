const generateOTP = async () =>{
    try{
        console.log("generateOTP")
        return (`${Math.floor(1000 + Math.random()* 9000)}`);
    }catch (error) {
        console.log(error);
    }
}

export default generateOTP;