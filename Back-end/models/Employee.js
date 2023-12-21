const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    id: {
        type: ObjectId,
    },
    firstname: {
        type: String,
        maxlength: 100,
        required: true,
      },
    lastname: {
        type: String,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxlength: 25,
        enum: ['Male', 'Female', 'Other']

    },
    salary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model("Employee", EmployeeSchema)

module.exports = Employee;

