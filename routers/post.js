const express = require("express");
const router = express.Router();

const postController = require('../controllers/post.js');

const multer = require("multer");
const uploader = multer({ dest: "public" });

const auth = require('../controllers/auth.js');


router.get('/', postController.index);
router.get('/show/:slug', postController.show)

router.use(auth.authenticate);

router.get('/create', postController.create);
router.post('/', uploader.single('image'), postController.store);
router.delete('/:slug', auth.admin, postController.destroy);


module.exports = router;