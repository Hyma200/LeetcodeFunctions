const {db} = require('../util/index');

const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);

const {validateSignupData, validateLoginData} = require('../util/validators');

exports.signup = (req, res) => {
    const newUser = {
       email: req.body.email,
       password: req.body.password,
       confirmPassword: req.body.confirmPassword,
       userHandle: req.body.userHandle,
    };
 
    const {valid, errors} = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);
 
    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
       .then(doc => {
          if (doc.exists){
             return res.status(400).json({userHandle: 'this handle is already taken'})
          }
          else{
             return firebase
                .auth()
                .createUserWithEmailAndPassword(newUser.email, newUser.password)
          }
       })
       .then(data => {
          userId = data.user.uid;
          return data.user.getIdToken();
       })
       .then((idToken) => {
          token = idToken;
          const userCredentials = {
             handle: newUser.userHandle,
             email: newUser.email,
             createdAt: new Date().toISOString(),
             userId
          };
          db.doc(`/users/${newUser.userHandle}`).set(userCredentials);
       })
       .then(() => {
          return res.status(201).json({token});
       })
       .catch(err => {
          console.error(err);
          if (err.code === 'auth/email-already-in-use')
             return res.status(400).json({email: 'Email is already in use'});
          else
             return res.status(500).json({error: err.code});
       })
 };

 exports.getUserInfo = (req, res) => {
    let body = {}
    db.doc(`/users/${req.user.handle}`)
      .get()
      .then(doc => {
         body.createdAt = doc.data().createdAt,
         body.email = doc.data().email,
         body.handle = doc.data().handle
         return res.json(body);
      }).catch(err => console.log(err))
    
 }

 exports.getUsers = (req, res) => {
    db.collection('users')
      .get()
      .then(data => {
         let users = []
         data.forEach(doc => {
            users.push(doc.id);
         });
         return res.json({users: users});
      }).catch(err => console.log(err));
 }


 exports.login = (req, res) => {
    const user = {
       email: req.body.email,
       password: req.body.password
    };

    const {valid, errors} = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);
 
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
       .then(data => {
          return data.user.getIdToken();
       })
       .then(token => {
          return res.json({token});
       })
       .catch(err => {
          console.error(err);
          if (err.code === 'auth/wrong-password' || err.code ==='auth/user-not-found')
             return res.status(403).json({general: 'Wrong credentials, please try again'})
          else
             return res.status(500).json({error: err.code});
       })
 }