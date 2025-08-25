const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const { directory } = req.query;
        cb(null, `./src${process.env.CLOUD_FOLDER}/${directory === "/" ? "" : directory}`)
    },
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage: storage });

module.exports = upload;