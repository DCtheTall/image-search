const { Router } = require('express');
const api = require('./api');

const router = Router();

router.use('/api', api);

router.get('/', (req, res) => res.render('index'));
router.get('/demo', (req, res) => res.render('demo'));
router.get('*', (req, res) => res.render('error'));

module.exports = router;
