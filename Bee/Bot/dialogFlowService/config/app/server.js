const validator = require('validator');
require('dotenv').config()

if(validator.isIn('PORT',process.env)){
    var port = process.env.PORT
    let portValidate = validator.isPort(port)
    if(!validator.isPort(port)){
        throw new Error('Port is empty or not vaild !')
    }
}else{
    throw new Error('PORT Is missing in .env !')
}

let config = {
    PORT:process.env.PORT
}
module.exports = config
