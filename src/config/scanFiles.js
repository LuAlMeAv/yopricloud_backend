const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const queue = [];
let processing = false;

function scanFiles() {
    if (processing || queue.length === 0) return;

    processing = true;

    const fileItem = queue.shift();

    const { filePath, filename } = fileItem;

    const clamscanProcess = spawn('clamscan', [filePath + filename]);

    clamscanProcess.stdout.on('data', (data) => {
        console.log(`Clamscan exit (${filename}): ${data}`);
    });
    clamscanProcess.stderr.on('data', (data) => {
        console.error(`Clamscan error (${filename}): ${data}`);
    });
    clamscanProcess.on('close', (code) => {
        if (code === 0) {
            fs.rename(filePath + filename, path.join(__dirname, "../cloud", filename), (error) => {
                if (error) {
                    console.error(error)
                }
            })
        } else {
            fs.unlink(filePath + filename, (error) => {
                if (error) {
                    console.error(error)
                }
            })
        }

        processing = false;

        scanFiles();
    });
}

function addToQueue(files) {
    files.forEach(file => {
        queue.push({
            filePath: path.join(__dirname, "../../", file.destination),
            filename: file.filename
        })
    })

    scanFiles();
}

module.exports = addToQueue;