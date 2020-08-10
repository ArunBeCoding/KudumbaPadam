const Admin = require("../../Schemas/adminSchema");
const authAdmin = require("./auth");
const jwt = require('jsonwebtoken')
const ADMIN_JWT_KEY = "admin_key_is_secret_123_!$@";

/*
    {
        "username": "noobmaster69",
        "password": "spongebobarun97"
    }
*/ 

exports.postLoginAdmin = async(req, res) => {
    //Login a registered Admin
    try {
        const { username, password } = req.body.loginCredentials
        const admin = await Admin.findByCredentials(username, password)
        if (!admin) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        admin.tokens.splice(0, admin.tokens.length)
        const token = await admin.generateAuthToken()
        const admin_name = await admin.username
        res.send({ admin_name , token })
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

}

//TO BE EDITTED LATER
// exports.getAdminInfo = async(req,res) => {
//     // View logged in user profile
//     res.send(req.Admin)
// }

exports.postLogoutAdminAllDevices = async(req,res) => {
    // Log user out of all devices
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, ADMIN_JWT_KEY)
        const admin = await Admin.findOne({ _id: data._id, 'tokens.token': token })

        // req.admin.tokens.splice(0, req.admin.tokens.length)
        // await req.admin.save()
        admin.tokens.splice(0, admin.tokens.length)
        await admin.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}
