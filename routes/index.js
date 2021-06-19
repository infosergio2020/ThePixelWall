const { Router } = require('express');
const { upload } = require('../multer-gridfs');
const indexController = require('../controllers/index');
const router = Router();



router.get('/',indexController.render_index);

router.get('/upload',indexController.render_uploads);

router.post('/upload',upload.single('image'),indexController.post_upload);

router.get('/image/:filename',indexController.profileBy)

router.get('/view-image/:filename',indexController.render_image)

router.get('/image/:id/delete',indexController.image_delete);

module.exports = router;