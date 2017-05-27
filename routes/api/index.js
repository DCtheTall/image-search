const { Router } = require('express');
const searchImages = require('./search-images');

const router = Router();

router.get('/imagesearch/:term', searchImages);

module.exports = router;
