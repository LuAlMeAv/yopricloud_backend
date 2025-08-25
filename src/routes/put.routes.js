const express = require('express');
const fs = require('fs');
const path = require('path');

const { CLOUD_FOLDER } = process.env;
const router = express.Router();

router.put("/rename", (req, res) => {
    const { oldPath, newPath } = req.body;
    const oldAbsolutePath = path.join(__dirname, "../", CLOUD_FOLDER, oldPath);
    const newAbsolutePath = path.join(__dirname, "../", CLOUD_FOLDER, newPath);

    fs.rename(oldAbsolutePath, newAbsolutePath, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "Error when rename the file", code: error.code });
        }
        return res.json({ status: "success", message: "File was renamed." });
    })
});
router.put("/move", (req, res) => {
    const { newPath, oldPath } = req.body;
    const absoluteOldPath = path.join(__dirname, "../", CLOUD_FOLDER, oldPath);
    const absoluteNewPath = path.join(__dirname, "../", CLOUD_FOLDER, newPath);

    fs.rename(absoluteOldPath, absoluteNewPath, (error) => {
        if (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "An error occurred when moving the element.", code: error.code })
        }
        return res.json({ status: "success", message: "The element was movied." })
    })
});
router.put("/move/multiple", async (req, res) => {
    const { newPath, oldPath, filesName } = req.body;
    const absoluteOldPath = path.join(__dirname, "../", CLOUD_FOLDER, oldPath);
    const absoluteNewPath = path.join(__dirname, "../", CLOUD_FOLDER, newPath);

    for (const filename of filesName) {
        try {
            await fs.promises.rename(absoluteOldPath + "/" + filename, absoluteNewPath + "/" + filename)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ status: "error", message: "An error occurred when moving the elements.", code: error.code })
        }
    }

    return res.json({ status: "success", message: "The elements were movied." })
});

module.exports = router;