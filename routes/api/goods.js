const express = require('express');
// connect model
const Good = require('../../models/Good');
const { ensureAuthenticated } = require('../../config/auth');

const multer = require('multer');
const uuidv1 = require('uuid/v1');
const path = require('path');
const fs = require('fs');

// specify router
const router = express.Router();


// Multer setup
const storage = multer.diskStorage({
  destination: './public/uploads/',

  filename: function(req, file, callback) {
    // unique id for image
    const uuid = uuidv1();
    const fileName = file.fieldname + '-' + uuid + path.extname(file.originalname);
    callback(null, fileName);
  }
});


// Checking file Type
const checkFileType = (file, cb) => {
  // Allowed ext
  const fileTypes = /jpg|jpeg|png|gif/;
  // checking the ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // checking the mime-types
  const mimeType = fileTypes.test(file.mimetype);

  if(mimeType && extName) {
    return cb(null, true);
  }
  else
    return cb('Error: images only!');
}


// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024  // 20 MB
  },
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  }
}).single('img');


// @route GET api/goods
// @descr get all goods
// @access Public
router.get('/', (req, res) => {
  Good
    .find()
    .sort({ date: -1 })
    .then(goods => {
      res.json(goods);
    })
    .catch(err => res.status(500).send(err));
});


// @route POST api/goods
// @descr create new good
// @access Private
router.post('/', ensureAuthenticated, (req, res) => {
  // since we upload a FormData instance, it won't be accessible outside the upload function

  upload(req, res , (err) => {
    if(err) {
      res.status(500).send(err);
    }

    else {
      const {cat, name, descr, href, cost} = req.body;
      const img = req.file;

      // constructing BD instance
      const newGood = new Good({
        cat,
        name,
        descr,
        img,
        href,
        cost
      });

      // saving to the DB
      newGood
      .save()
      .then(item => res.send('Successfully saved post!'))
      .catch(err => res.status(500).send(err));
    }
  });


});


// @route DELETE api/goods/:id
// @descr delete good by id
// @access Private
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Good
    .findById(req.params.id)
    .then(item => {
      // path with name of old image
      const imgPath = item.img.path;

      // deleting the image
      fs.unlink(`././${imgPath}`, (err) => {
        if (err) throw err;
        // console.log(`successfully deleted: ${imgPath}`);
      });

      item
        .remove()
        .then( () => res.send("Post deleted successfully!") );
    })
    .catch( err => res.status(404).send(err) );
});


// @route UPDATE api/goods/:id
// @descr update good by id
// @access Private
router.put('/:id', ensureAuthenticated, (req, res) => {

    // since we upload a FormData instance, it won't be accessible outside the upload function
    upload(req, res , (err) => {
      if(err) {
        res.status(500).send(err);
      }
  
      else {
        const {cat, name, descr, href, cost} = req.body;
        const img = req.file;


        // updating item in the db
        if(img) {
          Good.findById( req.params.id, (err, item) => {
            if(err) {
              res.status(500).send(err);
            }

            else {
              // path with name of old image
              const oldImgPath = item.img.path;

              // deleting old image if the new one was passed
              fs.unlink(`././${oldImgPath}`, (err) => {
                if (err) throw err;
                // console.log(`successfully deleted: ${oldImgPath}`);
              });

              Good.updateOne({ _id: req.params.id }, {
                cat, name, descr, img, href, cost
              })
                .then(() => res.send('Item successfully updated! (With image)'))
                .catch((err) => res.status(500).send(err));

            }

          });
        }

        else {
          Good.updateOne({ _id: req.params.id }, {
            cat, name, descr, href, cost
          })
            .then(() => res.send('Item successfully updated! (Without image)'))
            .catch((err) => res.status(500).send(err));
        }

      }
    });

});



module.exports = router;