import express from "express";
import  path from "path";
import Rout from "./router.js"
import http from "http"
import https from "https"
import fs from "fs"
const __dirname = path.resolve()
const PORT = 3000;
var privateKey  = fs.readFileSync(__dirname + "/public" + '/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname + "/public" +'/sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();
app.use(express.json());
app.use(express.static(__dirname+ "/public"))
app.use(Rout)
app.set("view engine", "pug");
app.set("views",__dirname +"\\public\\" + "\pug_files");
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT,() =>{
    console.log(`Server has been started on port ${PORT}...`)
})
