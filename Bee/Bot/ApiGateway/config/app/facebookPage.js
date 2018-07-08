const validator = require('validator');
require('dotenv').config()

if(validator.isIn('PAGE_ACCESS_TOKEN',process.env)){
    if(validator.isEmpty(process.env.PAGE_ACCESS_TOKEN)){
        throw new Error('PAGE_ACCESS_TOKEN is empty!')
    }
}else {
    throw new Error('PAGE_ACCESS_TOKEN Is missing in .env !')
}
let config = {
    PAGE_ACCESS_TOKEN:process.env.PAGE_ACCESS_TOKEN
}
module.exports = config
