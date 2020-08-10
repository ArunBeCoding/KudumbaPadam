const jwt = require('jsonwebtoken')
const Admin = require('../../Schemas/adminSchema')

const ADMIN_JWT_KEY = "admin_key_is_secret_123_!$@";

const authAdmin = async(req, res, next) => {
    // const token = req.header('Authorization').replace('Bearer ', '')

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, ADMIN_JWT_KEY)
        const admin = await Admin.findOne({ _id: data._id, 'tokens.token': token })

        if (!admin) {
            throw new Error()
        }

        req.admin = admin
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}

module.exports = authAdmin