import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Save files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const filename = `${file.fieldname}${ext}`; // Use the field name as the file name with its extension
    cb(null, filename); 
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|svg|webp/; // Supported file types
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true); // Accept file if valid
    } else {
      cb(new Error('Only image files are allowed!')); // Reject if invalid
    }
  }
});

export default upload;
