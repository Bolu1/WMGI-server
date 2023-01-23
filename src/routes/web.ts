import express from 'express'
import querystring from "querystring";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import axios from "axios";


const app = express()

app.get('/', (req,res)=>{
    res.send("Welcome")
})


module.exports = app