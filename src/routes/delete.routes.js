const express = require("express");
const path = require('path');
const fs = require("fs");
const fsp = fs.promises;

const { CLOUD_FOLDER } = process.env;
const router = express.Router();

router.delete("/single", (req, res) => {
    const filePath = req.query.path;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, filePath);

    fs.rm(absolutePath, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "Error eliminating the file.", code: error.code })
        }
        res.json({ status: "success", message: "File deleted." })
    })
});
router.delete("/multiple", async (req, res) => {
    const filesName = req.body.filesName;
    const folderPath = req.query.folderPath;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, folderPath);
    const errors = [];
    let deleted = 0;

    for (const filename of filesName) {
        try {
            await fsp.unlink(absolutePath + "/" + filename);
            deleted++
        } catch (error) {
            console.error(error);
            errors.push({ filename, code: error.code });
        }
    }

    const allErrors = filesName.length === errors.length;

    res.json({
        status: allErrors ? "error" : errors.length > 0 ? "warning" : "success",
        message: allErrors ? "Some errors have occurred." : `${deleted} files were deleted`,
        errors: errors.length,
        errorsDetail: errors
    })
});
router.delete("/folder", (req, res) => {
    const { folderPath, recursive } = req.query;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, folderPath);

    fs.rmdir(absolutePath, { recursive: Boolean(recursive), force: true }, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "Error eliminating the folder.", code: error.code })
        }
        return res.json({ status: "success", message: "Folder deleted." })
    })
});

module.exports = router;