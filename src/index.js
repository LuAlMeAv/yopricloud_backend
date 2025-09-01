require("dotenv").config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { PORT } = process.env;
const getIpv4 = require("./config/getIpv4");

const app = express();
const buildPath = path.join(__dirname, "build");

app.use(cors());
app.use(express.json());

const postRoutes = require("./routes/post.routes");
const getRoutes = require("./routes/get.routes");
const deleteRoutes = require("./routes/delete.routes");
const putRoutes = require("./routes/put.routes");

app.use("/api", getRoutes);
app.use("/api", deleteRoutes);
app.use("/api", postRoutes);
app.use("/api", putRoutes);

app.use(express.static(buildPath));

app.get('/*any', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(buildPath + "/index.html");
    } else {
        res.status(404).sendFile("/pages/notFound.html");
    }
});

const options = {
    key: fs.readFileSync('src/certs/key.pem'),
    cert: fs.readFileSync('src/certs/cert.pem')
};

https.createServer(options, app).listen(PORT, () => getIpv4(PORT));