const { MongoClient } = require('mongodb');
const axios = require('axios');
const Promise = require('bluebird');
const moment = require('moment');

function searchImages(req, res) {
  const { term } = req.params;
  const { offset } = req.query;
  const mongo = new MongoClient();

  axios.get(
    `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${term}&mkt=en-us&count=10${offset ? `&offset=${offset}` : ''}`,
    { headers: { 'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY } }
  )
  .then(({ data: { value } }) => {
    const results = value.map(({ name, contentUrl, thumbnailUrl }) => ({
      snippet: name,
      url: contentUrl,
      thumbnail: thumbnailUrl,
    }));
    res.json(results);
    return Promise.promisify(mongo.connect).call(mongo, process.env.MONGO_URI)
  })
  .then((db) => new Promise((resolve, reject) => {
    const when = moment().utc().toISOString();
    return db.collection('image-searches').insertOne({ term, when }, (err, result) => {
      if (err) reject(err);
      else resolve(db);
    });
  }))
  .then(db => db.close())
  .catch((err) => {
    if (!err.sentResponse) res.end(err.message);
    console.log(err);
  });
}

module.exports = searchImages;
