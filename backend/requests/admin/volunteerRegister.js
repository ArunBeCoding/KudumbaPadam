const volunteerSchema = require("../../Schemas/volunteerSchema");

exports.postNewVolunteer = async(req, res) => {
    try {
        const volunteer = new volunteerSchema(req.body.volunteer)
        await volunteer.save()
        const token = await volunteer.generateAuthToken()
        res.status(201).send({ volunteer, token })
    } catch (error) {
        res.status(400).send(error)
    }
}
