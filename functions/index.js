const functions = require("firebase-functions");
const app = require('express')();

const FBAuth = require('./util/fbauth');
const cors = require('cors');
const {getAllProblems, AddOneProblem, fetchUserProblems} = require('./handlers/problems')
const {signup, login, getUsers} = require('./handlers/users');

app.use(cors());
//Problem Routes
app.get('/problems', getAllProblems);
app.post('/problem', FBAuth, AddOneProblem);
app.get('/getproblem/:userHandle', fetchUserProblems)

//Users Route
app.post('/signup', signup);
app.post('/login', login);
app.get('/users', getUsers);


exports.api = functions.https.onRequest(app);