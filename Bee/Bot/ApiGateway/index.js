const express = require('express')
const path = require('path')
const app= express()
const config = require(path.resolve('config','index.js'))

var listener = app.listen(config.PORT||5000,()=>{
    console.log("Welcome to Facebook Messenger Bot API-Gateway , listen to %s",listener.address().port)
})
