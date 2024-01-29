import "dotenv/config";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import routes from "./routes/index.js";
const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.json({message: "Allah is kind"});
});

app.use(routes);

app.listen(PORT,()=>{
    console.log('Server started on  port '+PORT);
});