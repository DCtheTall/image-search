const { Router } = require('express');
const searchImages = require('./search-images');
const getLatestSearches = require('./get-latest-searches');

const router = Router();

router.get('/imagesearch/:term', searchImages);
router.get('/latest/imagesearch', getLatestSearches);

module.exports = router;
