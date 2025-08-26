require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { PORT } = process.env;

const app = express();

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

app.listen(PORT, () => getIpv4(PORT));