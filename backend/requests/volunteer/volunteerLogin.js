const Volunteer = require("../../Schemas/volunteerSchema");
const auth = require("./auth");
const jwt = require('jsonwebtoken')
const JWT_KEY = "test123@!$";

exports.postLoginVolunteer = async(req, res) => {
    //Login a registered Volunteer
    try {
        const { email, password } = req.body.loginCredentials
        const volunteer = await Volunteer.findByCredentials(email, password)
        if (!volunteer) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        volunteer.tokens.splice(0, volunteer.tokens.length)
        const token = await volunteer.generateAuthToken()
        const volunteer_name = await volunteer.name
        res.send({ volunteer_name , token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

}

//TO BE EDITTED LATER
exports.getVolunteerInfo = async(req,res) => {
    // View logged in user profile
    res.send(req.Volunteer)
}

exports.postLogoutVolunteer = async(req,res) => {
    // Log user out of the application
    try {
        req.volunteer.tokens = req.volunteer.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.volunteer.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.postLogoutVolunteerAllDevices = async(req,res) => {
    // Log user out of all devices
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, JWT_KEY)
        const volunteer = await Volunteer.findOne({ _id: data._id, 'tokens.token': token })

        // req.volunteer.tokens.splice(0, req.volunteer.tokens.length)
        // await req.volunteer.save()
        volunteer.tokens.splice(0, volunteer.tokens.length)
        await volunteer.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}
