const functions = require("firebase-functions");
const app = require('express')();

const FBAuth = require('./util/fbauth');

const {getAllProblems, AddOneProblem, fetchUserProblems} = require('./handlers/problems')
const {signup, login} = require('./handlers/users');

//Problem Routes
app.get('/problems', getAllProblems);
app.post('/problem', FBAuth, AddOneProblem);
app.get('/getproblem/:userHandle', fetchUserProblems)

//Users Route
app.post('/signup', signup);
app.post('/login', login);


exports.api = functions.https.onRequest(app);