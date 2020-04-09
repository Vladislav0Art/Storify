const express = require('express');
// connect model
const Slide = require('../../models/Slide');
const { ensureAuthenticated } = require('../../config/auth');

const multer = require('multer');
const uuidv1 = require('uuid/v1');
const path = require('path');
const fs = require('fs');

// specify router
const router = express.Router();


// Multer setup
const storage = multer.diskStorage({
  destination: './public/slides/',

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
  const fileTypes = /jpg|jpeg|png|gif|webp/;
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



// @route GET api/slides
// @descr get all slides
// @access Public
router.get('/', (req, res) => {
  Slide
    .find()
    .sort({ date: -1 })
    .then(slides => {
      res.json(slides);
    })
    .catch(err => res.status(500).send(err));
});



// @route POST api/slides
// @descr post a new slide to db
// @access Private
router.post('/', ensureAuthenticated, (req, res) => {

  upload(req, res , (err) => {
    if(err) {
      res.status(500).send(err);
    }

    else {  
      const {title, descr, alt, href} = req.body;
      const img = req.file;
      
      const newSlide = new Slide({
        title,
        descr,
        img,
        alt,
        href
      });
      
      // saving to the DB
      newSlide
        .save()
          .then(slide => {
            res.send('Successfully saved slide!');
          })
          .catch(err => res.status(500).send(err));
    }
  });

});


// @route DELETE api/slides/:id
// @descr delete slide from db
// @access Private
router.delete('/:id', ensureAuthenticated, (req, res) => {
  const id = req.params.id;

  Slide
  .findById(id)
  .then(slide => {
    // path with name of old image
    const imgPath = slide.img.path;

    // deleting the image
    fs.unlink(`././${imgPath}`, (err) => {
      if (err) throw err;
      // console.log(`successfully deleted: ${imgPath}`);
    });

    slide
      .remove()
      .then( () => res.send("Slide deleted successfully!") );
  })
  .catch( err => res.status(404).send(err) );
});



// @route UPDATE api/slides/:id
// @descr update slide in db by id
// @access Private
router.put('/:id', (req, res) => {

  upload(req, res , (err) => {
    if(err) res.status(500).send(err);

    else {
      const id = req.params.id;
      const {title, descr, alt, href} = req.body;
      const img = req.file;

      Slide.findById(id, (err, slide) => {
        if(err) res.status(500).send(err);

        if(img) {
          
          // deleting old image
          const oldImagePath = slide.img.path;
          fs.unlink(`././${oldImagePath}`, (err) => {
            if(err) throw err;
            // console.log(`successfully deleted: ${imgPath}`);
          });

          Slide
          .updateOne({ _id: id }, { title, descr, img, alt, href })
            .then(response => {
              res.send('Updated successfully (with image)');
            })
            .catch(err => res.status(500).send(err));
        }

        else {
          Slide
          .updateOne({ _id: id }, { title, descr, alt, href })
            .then(response => {
              res.send('Updated successfully (without image)');
            })
            .catch(err => {
              res.status(500).send(err);
            });
        }

      });

    }

  });


});


module.exports = router;