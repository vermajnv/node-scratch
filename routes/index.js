var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user_data');

console.log(userData.find({}).then((data) => {
  console.log(data);
}));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/get-data', function (req, res, next) {
  let data = userData.find({});
  data.then((docs) => {
    res.render('index', {items: docs});
  })
  .then((error) => {
    console.log('error occured');
  });
});

router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  userData.insert(item);
  res.redirect('/');
});

router.post('/delete', function (req, res, next) {
  var id = req.body.id;
  userData.remove(id);
  res.redirect('/');
});

router.post('/update', function (req, res, next) {
  let item = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  };
  let id = req.body.id;
  userData.update(id, item);
  res.redirect('/');
});

module.exports = router;
