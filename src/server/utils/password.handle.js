const bcrypt = require('bcrypt');
const saltRounds = 10


//encrypt random password
const hashPassword = async (password) =>{ 
    return await bcrypt.hash(password, saltRounds)
};

//compare passwords
const checkPassword = async(password, encryptedPassword) => {
    return await bcrypt.compare(password, encryptedPassword)
}


module.exports = { 
    hashPassword, 
    checkPassword 
};