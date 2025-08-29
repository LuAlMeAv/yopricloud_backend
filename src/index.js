require("dotenv").config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { PORT } = process.env;
const getIpv4 = require("./config/getipv4");

const app = express();

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

const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/cert.pem'))
}

https.createServer(options, app).listen(PORT, () => getIpv4(PORT));