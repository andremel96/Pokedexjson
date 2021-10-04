const express = require('express');
const cors=require('cors');




//inicio funciones para
const path = require("path");
const routes = require("./routes/approute");

const app = express();
app.use(cors());
//se usa en vez de body-parse
app.use(express.json());


routes(app);


//iniciar el server est

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App iniciado en ${PORT}`));






//routes-> controller -> model















