const functions = require("firebase-functions");
const app = require('express')();

const FBAuth = require('./util/fbauth');
const cors = require('cors');
const {getAllProblems, AddOneProblem, fetchUserProblems, getProblemCounts} = require('./handlers/problems')
const {signup, login, getUsers, getUserInfo} = require('./handlers/users');

app.use(cors());
//Problem Routes
app.get('/problems', getAllProblems);
app.post('/problem', FBAuth, AddOneProblem);
app.get('/getproblem/:userHandle', fetchUserProblems)
app.get('/problemcounts/:userHandle', getProblemCounts)

//Users Route
app.post('/signup', signup);
app.post('/login', login);
app.get('/users', getUsers);
app.get('/userInfo', FBAuth, getUserInfo);


exports.api = functions.https.onRequest(app);