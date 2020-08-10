const jwt = require('jsonwebtoken')
const Volunteer = require('../../Schemas/volunteerSchema')

const JWT_KEY = "test123@!$";

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '')

    try {
        const data = jwt.verify(token, JWT_KEY)
        const volunteer = await Volunteer.findOne({ _id: data._id, 'tokens.token': token })

        if (!volunteer) {
            throw new Error()
        }

        req.volunteer = volunteer
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

module.exports = auth