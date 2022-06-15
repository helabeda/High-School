const express = require('express')
const app = express()
const port = 6000
const connectdb = require("./config/connectdb");
require("dotenv").config();
connectdb();

app.use(express.json());
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/prof", require("./Routes/profRoutes"));
app.use("/parent", require("./Routes/parentRoutes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))