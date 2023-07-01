const multer = require('multer');
const path = require('path');
const createError = require('http-errors');


const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 2097152;
const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || ['jpg', 'jpeg', 'png'];
const UPLOAD_DIR = process.env.UPLOAD_IMAGES || 'public/images/users';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR)
    },
    filename: (req, file, cb) => {

        const extname = path.extname(file.originalname);
        cb(null, Date.now() + '-' + file.originalname.replace(extname, '') + extname);
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileFilter = (req, file, cb) => {
    const extname = path.extname(file.originalname);

    if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {

        return cb(createError(400, 'file type not allowed'))

    }
    cb(null, true)

}


const upload = multer({ storage: storage, limits: { fileSize: MAX_FILE_SIZE }, fileFilter });

module.exports = { upload };