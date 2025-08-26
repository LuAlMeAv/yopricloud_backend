require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { PORT } = process.env;

const app = express();
const buildPath = path.join(__dirname, "build");

app.use(cors());
app.use(express.json());

const postRoutes = require("./routes/post.routes");
const getRoutes = require("./routes/get.routes");
const deleteRoutes = require("./routes/delete.routes");
const putRoutes = require("./routes/put.routes");
const getIpv4 = require("./config/getipv4");

app.use("/api", getRoutes);
app.use("/api", deleteRoutes);
app.use("/api", postRoutes);
app.use("/api", putRoutes);

app.use(express.static(buildPath));

app.get('/*any', (req, res) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(buildPath + "/index.html");
    } else {
        res.status(404).sendFile("/src/pages/notFound.html");
    }
});

app.listen(PORT, () => getIpv4(PORT));