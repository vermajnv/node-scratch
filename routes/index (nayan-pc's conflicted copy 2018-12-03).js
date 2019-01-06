var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/get-data', function (req, res, next) {
  var docArray = [];
  mongo.connect(url, function (err, client) {
    assert.equal(null, err);
    var db = client.db('test');
    let cursor = db.collection('user_data').find();
    cursor.forEach((doc, err) => {
      assert.equal(null, err);
      docArray.push(doc);
    }, function () {
      client.close();
      res.render('index', { items: docArray });
    });
  });
});

router.post('/insert', function (req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  console.log(item);
  mongo.connect(url, function (err, client) {
    assert.equal(null, err);
    var db = client.db('test');
    db.collection('user_data').insertOne(item, function (err, result) {
      assert.equal(null, err);
      console.log('data inserted');
      client.close();
    });
  });
  res.redirect('/');
});

router.post('/delete', function (req, res, next) {
  var item = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  };

  var id = req.body.id;
  // mongo.connect(url, function (err, client) {
  //   assert.equal(null, err);
  //   var db = client.db('test');
  //   db.collection('user_data').(item, function (err, result) {
  //     assert.equal(null, err);
  //     console.log('data inserted');
  //     client.close();
  //   });
  // });
});

router.post('/update', function (req, res, next) {
  let item = {
    title : req.body.title,
    content : req.body.content,
    author : req.body.author
  };

  mongo.connect(url, function (err, client) {
    assert.equal(null, err);
    var db = client.db('test');
    let id = req.body.id; 
    db.collection('user_data').updateOne({"_id" : ObjectID(id)}, {$set : item}, function (err, result) {
      assert.equal(null, err);
      console.log('data updated');
      client.close();
    });
  });
  res.redirect('/');
});
module.exports = router;
