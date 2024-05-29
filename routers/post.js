const express = require("express");
const router = express.Router();

const postController = require('../controllers/post.js');

const multer = require("multer");
const uploader = multer({ dest: "public" });

const auth = require('../controllers/auth.js');


router.get('/', postController.index);

router.use(auth.authenticate);

router.post('/', uploader.single('image'), postController.create);
router.delete('/:slug', auth.admin, postController.destroy);


module.exports = router;