import multer, { diskStorage } from 'multer';

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Or generate a unique filename
  }
});

const upload = multer({ storage: storage });

export default upload;
