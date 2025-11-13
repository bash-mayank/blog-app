import multer, { MulterError } from "multer";

const upload = multer({
    storage: multer.diskStorage({})
})

export default upload