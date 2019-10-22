import multer from "multer";
import { MULTER } from "../../constants/db";

class MulterService {
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, MULTER.UPLOADS_URL);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });
    fileFilter = (req: Express.Request, file: Express.Multer.File, cb: any) => {
        if (file.mimetype === MULTER.MIMETYPE_JPEG
            || file.mimetype === MULTER.MIMETYPE_PNG) {
            cb(null, true);
        } else {
            cb(new Error(MULTER.TYPE_ERROR), false);
        }
    };
    upload = multer({
        storage: this.storage,
        fileFilter: this.fileFilter,
    }).single(MULTER.PICTURE);
};

export default MulterService;
