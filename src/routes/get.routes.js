const express = require("express");
const mm = require("music-metadata");
const mime = require('mime-types');
const path = require("path");
const fs = require("fs");
const buildDirectoryTree = require("../config/directoriesTree");

const { CLOUD_FOLDER } = process.env;

const router = express.Router();

router.get('/files/all', (req, res) => {
    const dirPath = req.query.directory;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, dirPath);

    const files = {
        directories: [],
        files: []
    }

    fs.readdir(absolutePath, { withFileTypes: true }, async (error, content) => {
        if (error) {
            console.error(error)
            return res.status(404).json({ status: "error", message: "Directory not found.", code: error.code })
        }

        content.map((item) => {
            const itemStats = fs.statSync(absolutePath + "/" + item.name)

            const file = {
                name: item.name,
                type: itemStats.isDirectory() ? "directory" : "file",
                size: itemStats.size,
                mimeType: mime.lookup(item.name)
            }

            if (file.type === "directory") {
                files.directories.push(file)
            } else if (file.type === "file") {
                files.files.push(file)
            }
        })

        fs.readdir(path.join(__dirname, "../scanning"), (error, content) => {
            if (error) {
                console.error(error)
            }
            if (content.length > 0) {
                return res.json({ status: "warning", message: "There are files scanning yet.", files })

            }
            return res.json({ status: "success", message: "Here are your files.", files })
        })
    })
});
router.get('/file', (req, res) => {
    const filePath = req.query.path;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, filePath);

    fs.access(absolutePath, fs.constants.F_OK, (error) => {
        if (error) {
            console.error(error)
            return res.status(404).json({ status: "error", message: "File not found.", code: error.code });
        }

        return res.sendFile(absolutePath);
    })
});
router.get("/cover", async (req, res) => {
    const filePath = req.query.path;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, filePath)

    fs.access(absolutePath, fs.constants.F_OK, async (error) => {
        if (error) {
            console.error(error)
            return res.status(404).json({ status: "error", message: "File not found.", code: error.code })
        }

        try {
            const metadata = await mm.parseFile(absolutePath)
            const picture = metadata.common.picture ? metadata.common.picture[0] : null;

            if (picture) {
                res.set('Content-Type', picture.format)
                res.send(picture.data)
            } else {
                res.status(404).json({ status: "error", message: "Cover not found." })
            }

        } catch (error) {
            console.error(error)
        }
    })
});
router.get("/download", (req, res) => {
    const { filePath, filename } = req.query;
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER, filePath, filename);

    res.download(absolutePath, filename, (error) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: 'Error downloading the file.', error });
        }
    })
});
router.get("/directories/all", async (req, res) => {
    const absolutePath = path.join(__dirname, "../", CLOUD_FOLDER);

    try {
        const tree = await buildDirectoryTree(absolutePath, absolutePath);

        return res.json({ status: "success", message: "Here's your tree.", tree })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ status: "error", message: "An error has happened", code: error.code })
    }

});

module.exports = router;