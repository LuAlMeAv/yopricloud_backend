const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const { directory } = req.query;
        cb(null, `./src${process.env.CLOUD_FOLDER}/${directory === "/" ? "" : directory}`)
    },
    filename: (req, file, cb) => cb(null, file.originalname)
});

const uploadStorage = multer({ storage: storage }).array("files");

const upload = (req, res, next) => {
    uploadStorage(req, res, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "Error saving the file.", error })
        }
        next();
    })
}

module.exports = upload;