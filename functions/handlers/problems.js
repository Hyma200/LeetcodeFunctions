const {db} = require('../util/index')
exports.getAllProblems = (req, res) => {
    db.collection('problems')
    .orderBy('createdAt', 'desc')
    .get()
       .then(data => {
          let problems = [];
          data.forEach(doc => {
             problems.push({
                problemId: doc.id,
                title: doc.data().title,
                userHandle: doc.data().userHandle,
                category: doc.data().category,
                createdAt: doc.data().createdAt
             });
          });
          return res.json(problems);
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

 exports.getProblemCounts = (req, res) => {
    let problems = {};
    return db
      .collection('problems')
      .where('userHandle', '==', req.params.userHandle)
      .get()
      .then((data) => {
         data.forEach((doc) => {
            doc.data().category.forEach((category) => {
               problems[category] = problems[category] === undefined ? 1:problems[category] + 1;
            })
         })
         return res.json(problems);
      })
      .catch((err) => {
         console.error(err);
         res.status(500).json({error: err.code})
      })
 }

 exports.fetchUserProblems = (req, res) => {
     let problems = [];
     return db
        .collection('problems')
        .orderBy('createdAt', 'desc')
        .where('userHandle', '==', req.params.userHandle)
        .get()
        .then((data) => {
            data.forEach((doc) => {
                problems.push(doc.data());
            });
            return res.json(problems);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: err.code});
        });
 };