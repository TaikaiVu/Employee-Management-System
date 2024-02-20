const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please enter the first name"]
    },
    last_name: {
        type: String,
        required: [true, "Please enter the last name"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'That is not a valid email, please try again']
    },
    gender: {
        type: String,
        required: [true, "Please enter the gender"],
        enum: ['Male', 'Female', 'Other']
    },
    salary: {
        type: Number,
        required: [true, "Please enter the salary"]
    },
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee