const path = require("path");
const fs = require("fs");

async function buildDirectoryTree(dir, baseDir) {
    const relativePath = path.relative(baseDir, dir);

    const result = {
        name: path.basename(dir),
        path: relativePath,
        subDirectories: []
    }

    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {

        if (entry.isDirectory()) {
            const subDirectory = path.join(dir, entry.name)
            const subTree = await buildDirectoryTree(subDirectory, baseDir)

            if (subTree) {
                result.subDirectories.push(subTree)
            }
        }
    }

    return result;
}

module.exports = buildDirectoryTree;