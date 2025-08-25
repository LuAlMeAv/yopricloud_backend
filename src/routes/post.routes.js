const express = require('express');
const fs = require('fs');
const path = require('path');

const { CLOUD_FOLDER } = process.env;

const router = express.Router();
const upload = require("../config/multer");

router.post("/files", upload.array('files'), (req, res) => {
    res.json({ status: "success", message: "Saved file" })
});
router.post("/folder", (req, res) => {
    const { folderPath } = req.query;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, folderPath);

    fs.mkdir(absolutePath, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "Error when creating the folder.", code: error.code });
        }
        return res.json({ status: "success", message: "Folder created." });
    })
});

module.exports = router;