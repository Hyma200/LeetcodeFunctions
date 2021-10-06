const {db} = require('../util/index')
exports.getAllProblems = (req, res) => {
    db.collection('problems')
    .orderBy('createdAt', 'desc')
    .get()
       .then(data => {
          let screams = [];
          data.forEach(doc => {
             screams.push({
                problemId: doc.id,
                title: doc.data().title,
                userHandle: doc.data().userHandle,
                category: doc.data().category,
                createdAt: doc.data().createdAt
             });
          });
          return res.json(screams);
       })
       .catch(err => console.error(err));
 };

 exports.AddOneProblem = (req, res) => {
    const newProblem = {
       userHandle: req.user.handle,
       createdAt: new Date().toISOString(),
       category: req.body.category,
       time: req.body.time,
       title: req.body.title
    };
 
    db
       .collection('problems')
       .add(newProblem)
       .then(doc => {
          res.json({message: `document ${doc.id} created successfully`})
       })
       .catch(err => {
          res.status(500).json({error: 'something went wrong'});
          console.error(err);
       })
 }