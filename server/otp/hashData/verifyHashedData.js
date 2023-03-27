import bcrypt from 'bcryptjs';

const verifyHashedData = async ( unhashed, hashed ) => {
    try{
        const match = await bcrypt.compare(unhashed, hashed);
        return match;
    }catch (err){
        console.log(err);
        throw  err;
    }
}

export default verifyHashedData;