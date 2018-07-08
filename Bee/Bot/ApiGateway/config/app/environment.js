const validator = require('validator')
require('dotenv').config()

if(validator.isIn('ENVIRONMENT',process.env)){
    if(!validator.isIn(process.env.ENVIRONMENT, ['development', 'staging' , 'production'])){
        throw new Error('ENVIRONMENT must be development or staging or production')
    }
}else{
    throw new Error('ENVIRONMENT is missing in .env !')
}
let config = {
    ENVIRONMENT:process.env.ENVIRONMENT
}
module.exports = config
