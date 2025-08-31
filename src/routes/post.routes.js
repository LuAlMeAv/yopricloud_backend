const express = require('express');
const fs = require('fs');
const path = require('path');

const upload = require("../config/multer");
const addToQueue = require('../config/scanFiles');
const { CLOUD_FOLDER } = process.env;

const router = express.Router();


router.post("/files", upload, (req, res) => {
    addToQueue(req.files);
    res.json({ status: "success", message: "File was uploaded, now it's scanning.", files: req.files })
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