const { MongoClient } = require('mongodb');
const Promise = require('bluebird');

const mongo = new MongoClient();

function getLatestSearches(req, res) {
  Promise.promisify(mongo.connect).call(mongo, process.env.MONGO_URI)
    .then((db) => new Promise((resolve, reject) => {
      db.collection('image-searches').find().sort({ when: -1 }).limit(10).toArray((err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    }))
    .then((result) => {
      const json = result.map(({ term, when }) => ({ term, when }));
      res.json(json);
    })
    .catch((err) => {
      console.log(err);
      res.end(err.message);
    });
}

module.exports = getLatestSearches;
