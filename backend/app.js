const express = require('express');
const connectDB = require('./dbConnect.js');
const mongoose = require('mongoose');
const auth = require("./requests/volunteer/auth");
const authAdmin = require("./requests/admin/auth");
const movieSchema = require('./Schemas/movieSchema.js');
const pendingSchema = require('./Schemas/pendingMovieSchema.js');
const reviewSchema = require('./Schemas/reviewSchema.js');
const adminSchema = require('./Schemas/adminSchema');
var request = require('request');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const port = 5000;

//Request Calls
const getSpecificMovieReview = require("./requests/common/users.js").getSpecificMovieReview;

const getAllPendingMovies = require("./requests/volunteer/volunteer.js").getAllPendingMovies;
const postNewMovieReview = require('./requests/volunteer/volunteer.js').postNewMovieReview;
const postLoginVolunteer = require("./requests/volunteer/volunteerLogin.js").postLoginVolunteer;
const getVolunteerInfo = require("./requests/volunteer/volunteerLogin.js").getVolunteerInfo;
const postLogoutVolunteer = require("./requests/volunteer/volunteerLogin.js").postLogoutVolunteer;
const postLogoutVolunteerAllDevices = require("./requests/volunteer/volunteerLogin.js").postLogoutVolunteerAllDevices;

const postNewPendingMovie = require('./requests/admin/admin.js').postNewPendingMovie;
const getAllUncomfirmedReviews = require('./requests/admin/admin').getAllUncomfirmedReviews;
const confirmMovieReview = require('./requests/admin/admin').confirmMovieReview;
const denyMovieReview = require('./requests/admin/admin').denyMovieReview;
const postNewVolunteer = require("./requests/admin/volunteerRegister.js").postNewVolunteer;
const postLoginAdmin = require("./requests/admin/adminLogin").postLoginAdmin;
const postLogoutAdminAllDevices = require("./requests/admin/adminLogin").postLogoutAdminAllDevices;
const getAllMoviesToDelete = require("./requests/admin/admin").getAllMoviesToDelete;
const deleteSubmittedMovie = require("./requests/admin/admin").deleteSubmittedMovie;

//JSON Parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();

//Common Requests

app.get('/', function(req, res) {
  res.send("Backend running successfully!");
})

app.get('/movies/:id', getSpecificMovieReview);

//Volunteer Requests

app.get('/getAllPending', auth, getAllPendingMovies);
  
app.post('/postMovieReview', auth, postNewMovieReview);

app.post('/loginVolunteer', postLoginVolunteer);

app.get('/getVolunteerInfo', auth, getVolunteerInfo);

app.post('/postLogoutVolunteer', auth, postLogoutVolunteer);

app.post('/postLogoutVolunteerAllDevices', auth, postLogoutVolunteerAllDevices);

//Admin Requests

app.post('/postNewMovie', authAdmin, postNewPendingMovie);

app.get('/postAllReviewed', authAdmin, getAllUncomfirmedReviews);

app.post('/confirmReview', authAdmin, confirmMovieReview);

app.post('/sendBackReview', authAdmin, denyMovieReview);

app.post('/newVolunteer', authAdmin, postNewVolunteer);

app.get('/getAllPendingForAdmin', authAdmin, getAllPendingMovies);

app.post('/postMovieReviewForAdmin', authAdmin, postNewMovieReview);

app.post('/postLoginAdmin', postLoginAdmin);

app.post('/postLogoutAdminAllDevices', authAdmin, postLogoutAdminAllDevices);

app.get('/getAllMoviesToDelete', authAdmin, getAllMoviesToDelete);

app.post('/deleteSubmittedMovie', authAdmin, deleteSubmittedMovie);

//DO NOT DELETE - IMPT IN CASE WE WANNA ADD ANOTHER ADMIN
// app.post('/postNewAdmin', async(req, res) => {
//   try {
//       const admin = new adminSchema(req.body)
//       await admin.save()
//       const token = await admin.generateAuthToken()
//       res.status(201).send({ admin, token })
//   } catch (error) {
//       res.status(400).send(error)
//   }
// })


//Listen to port
app.listen(port, async () => {
  console.log(`app.js listening on port ${port}!`);
});