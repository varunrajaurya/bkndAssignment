const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const user = require('../models/user');
const Post = require('../models/post');
var jwt = require('jsonwebtoken');



exports.adminData = async (req,res,next) => {
    try {
    let data = await user.findOne();
    if(!data) {
        data = new user({
            email:"varunrajaurya1996@gmail.com",
            password:"varun@1234"
        })
        data.password = await bcrypt.hash(data.password, 10);
        await data.save();
    } else {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
          }
          const data = await user.findOne({ email }).lean();
          if (data && (await bcrypt.compare(password, data.password))) {
            // Create token
            const token = jwt.sign(
              { data_id: data._id, email: req.body.email },
              'assignment',
            );
      
            // save data token
            data.token = token;
            // data
            res.status(200).json(data);
          }
          res.status(400).send("Invalid Credentials");
    }
    return res.send(data);
    } catch (error) {
        console.log(error);
    }
}

exports.posts = async (req,res,next) => {
    try {
        if(req.user && req.user.email && req.user.email==="varunrajaurya1996@gmail.com"){
            const { post } = req.body;
            if(post) {
                let setPost = new Post({
                    post: post
                })
              await setPost.save();
    
              res.status(200).json({
                  message:"Post saved Successfully"
              })
            } else {
                res.status(400).json({
                    message:"Bad Request"
                })
            }
        } else {
            return res.status(400).json({
                message: "only admin can added post"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Something Went Wrong",
            Errro:error
        })
    }
}

exports.deletePost = async(req,res,next) => {
    try {
        if(req.user && req.user.email && req.user.email==="varunrajaurya1996@gmail.com"){
        let removePost = await Post.findByIdAndDelete({
            _id: req.params.id,
          });
          if (removePost) {
            return res.status(200).send({
              message: "Deleted Successfully",
            });
          } else {
            return res.status(202).send({
              message: "No data found",
            });
          }
        } else {
            return res.status(400).json({
                message:"Only Admin can delete the post"
            })
        }
    } catch (error) {
       return res.status(500).json({
           message:"Something went wrong"
       })
    }
}

exports.updatePost = async(req,res,next) => {
    try {
        if(req.user && req.user.email && req.user.email==="varunrajaurya1996@gmail.com"){
            let updatePost = await Post.findOneAndUpdate(
                {
                  _id: req.params.id,
                },
                {
                  $set: {
                    post: req.body.post
                  },
                },
                {
                  new: true,
                }
              );
              if(updatePost){
                  return res.status(200).json({
                      message:"Updated successfully"
                  })
              }
        } else {
            return res.status(400).json({
                message:"Only Admin can update the post"
            })
        }
    } catch (error) {
        console.log("error====>",error)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}