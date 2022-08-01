var multer  = require('multer');
const path = require('path');
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/images');
  },
  filename: (req, file, cb) => {
    req.filename="";
    var filename=`image-${Date.now()}` + path.extname(file.originalname);
    req.filename=filename;
    cb(null, filename);
      //path.extname get the uploaded file extension
  }
});
const multerFilter = (req, file, cb) => {
   
        if (!file.originalname.match(/\.(png|jpg)$/)) { 
             // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(null, true)
    
};
exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});