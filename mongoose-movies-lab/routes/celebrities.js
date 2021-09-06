const router = require('express').Router();
const { route } = require('../app');
const Celeb = require('../models/Celeb');

router.get("/", (req, res, next) => res.render('index'));

router.get('/celebrities/index', (req, res, next) => {
  Celeb.find()
    .then((celebs) => {
      res.render('celebrities/index', { celebs: celebs });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post('/celebrities/index', (req, res, next) => {
    console.log(req.body);
    const {name, occupation, catchphrase} = req.body;
    Celeb.create({
        name: name,
        occupation: occupation,
        catchphrase: catchphrase
    })
    .then(createdCeleb => {
        console.log(createdCeleb);
        res.redirect('/celebrities/index')
    })
    .catch(err => next(err));
})

router.get('/celebrities/new', (req, res) => res.render('celebrities/new'));

router.get('/celebrities/:id', (req, res, next) => {
    const celebId = req.params.id;
    Celeb.findById(celebId)
    .then(celeb => {
        console.log(celeb);
        res.render('celebrities/show', { celeb })
    })
    .catch(err => {
        next(err);
    })
});

router.get('/celebrities/:id/edit', (req, res, next) => {
    const celebId = req.params.id;
    Celeb.findById(celebId)
    .then(celebs => {
        res.render('celebrities/edit', { celebs });
    })
    .catch(err => {
        next(err);
    })
});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const celebId = req.params.id;
    const {name, occupation, catchphrase} = req.body;
    Celeb.findByIdAndUpdate(celebId, {
        name: name,
        occupation: occupation,
        catchphrase: catchphrase
    }, { new: true })  
    .then((updatedCeleb) => {
        console.log(updatedCeleb);
        res.redirect(`/celebrities/${updatedCeleb._id}`);
    })
    .catch(err => {
        next(err);
    })
});

router.get('/celebrities/delete/:id', (req, res, next) => {
    const celebId = req.params.id;
    Celeb.findByIdAndDelete(celebId)
    .then(() => {
        res.redirect('/celebrities/index');
    })
    .catch(err => {
        next(err);
    })
});

module.exports = router;