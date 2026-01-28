import express from "express";
import {config} from "dotenv";
import indexRouter from "./routers/index.js";
import { connectDb } from "./database/config.js";
config();
const app = express();
app.use(express.json());

app.use("/api", indexRouter.usersRouter);
app.use("/api", indexRouter.postsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: err.message || "Internal server error" 
    });
});

app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: "Route not found" 
    });
});

const port = process.env.PORT || 3000;

await connectDb();

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
