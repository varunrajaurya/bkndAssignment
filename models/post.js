const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validate = require("mongoose-validator");


const postValidator = [
  validate({
    validator: 'isLength',
    arguments: [5, 255],
    message: "post Should be between 5 and 255 characters",
  }),
];

const userSchema = new Schema(
    {
      post: {
        type: String,
        validate: postValidator,
        required: true,
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("post", userSchema);