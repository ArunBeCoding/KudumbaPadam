const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_KEY = "test123@!$";

const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

volunteerSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const volunteer = this
    if (volunteer.isModified('password')) {
        volunteer.password = await bcrypt.hash(volunteer.password, 8)
    }
    next()
})

volunteerSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const volunteer = this
    // const token = jwt.sign({_id: volunteer._id}, process.env.JWT_KEY)
    const token = jwt.sign({_id: volunteer._id}, JWT_KEY)
    volunteer.tokens = volunteer.tokens.concat({token})
    await volunteer.save()
    return token
}

volunteerSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const volunteer = await Volunteer.findOne({email})
    if (!volunteer) {
        throw new Error('Invalid login credentials')
    }
    const isPasswordMatch = await bcrypt.compare(password, volunteer.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials')
    }
    return volunteer;
}

const Volunteer = mongoose.model('Volunteer', volunteerSchema)

module.exports = Volunteer