const express = require('express')
const app = express()
const mongoose = require("mongoose")
const db = require("./db/dbconfig").db
const prod_route = require("./routes/produit_route").router
const vend_route = require("./routes/vendeur_route").router
const cors = require("cors")
const multer = require("multer");
const upload = multer({ dest: "images/" });
const port = 3000


app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('images'));



app.use("/api/produits", prod_route)
app.use("/api/vendeurs", vend_route)



app.listen(port, () => console.log(` listening on port ${port}!`))