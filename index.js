import Express from "express"
const app = Express();
import axios from "axios";
import extractRoutes from "./routes/extract.js";

app.use("/api", extractRoutes);

app.listen(8800, (req, res) => {
    console.log("Api is working");
})