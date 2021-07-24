const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const user = require('../models/user');
var jwt = require('jsonwebtoken');
const postsModel = require('../models/post');


exports.login = async (req,res,next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
            // Create token
            const token = jwt.sign(
              { student:"guest student", email: req.body.email },
              'assignment',
            );
            // save data token
            let studentData = {
                email: req.body.email,
                token : token
            } 
            res.status(200).json(studentData); 
    } catch (error) {
        return res.status(500).json({
        message:"something went wrong"       
        })
    }
}

exports.getList = async (req,res,next) => {
    try {
        let postsList = null;
        let total;
        if(!req.user){
            return res.status(400).json({
                message:"Please provide valid token"
            })
        } else {
            const { limit, offset } = req.query;
            postsList = await postsModel
          .find()
          .limit(Number(limit))
          .skip(
            Number(limit) * (Number(offset - 1) > 0 ? Number(offset - 1) : 0)
          )
          total = await postsModel
          .countDocuments()
        }
        if(postsList){
            return res.status(200).json({
                message:"List fetch successfully",
                List: postsList,
                Total: total
            })
        } else {
            return res.status(400).json({
                message : "No post added"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:'Something went wront'
        })
    }
}