require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    admin: {
        type:Boolean,
        default:false
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, { versionKey: false });


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password") && !this.isNew) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });


  UserSchema.methods.generateAuthToken = async function () {
    try {
      
      let token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
      console.log("JWT_KEY:", process.env.JWT_KEY);
      this.tokens = this.tokens.concat({ token: token });
      await this.save();
      return token; 
    } catch (err) {
      console.log("Token error"+err);
    }
  }
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User;  