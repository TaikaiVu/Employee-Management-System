const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    username: {
        type: String,
        maxlength: 100,
        required: true,
        unique: true,
      },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        maxlength: 50,
        required: true
    }
})

const Users = mongoose.model("Users", UsersSchema)

module.exports = Users;

