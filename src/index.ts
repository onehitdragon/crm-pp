import express from "express";
import cors from "cors";

const app = express();
app.listen(12345, () => {
    console.log("server listening 12345...");
});

// middleware
app.use(cors());
app.use(express.json());

// route
app.get("/", (req, res) => {
    return res.json({
        name: "vinh"
    });
})