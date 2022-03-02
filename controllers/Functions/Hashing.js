const bcrypt = require('bcryptjs');
const dotenv = require('dotenv'); 
const hashing = async(password) =>{
    console.log(password)
    const hashPassword = await bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT));
    return hashPassword
}

const isHashedPassword = async(password1,password2)=>{
    const isSame = await bcrypt.compare(password1,password2);
    return isSame;
}

module.exports = {hashing,isHashedPassword}

