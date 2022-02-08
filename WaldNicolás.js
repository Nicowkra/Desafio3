const express = require("express")
const fs = require('fs')

const app = express()
const server = app.listen(8080,()=>{
    console.log("Listening on port 8080")
})

class Contenedor{
    constructor(path){
        this.path = path
    }
    get = async()=>{
        if(fs.existsSync(this.path)){
        let data = await fs.promises.readFile(this.path, "utf-8")
        let products = JSON.parse(data)
        return { status: "success", products };
        }
    }
    getRandom = async()=>{
        if(fs.existsSync(this.path)){
            let data = await fs.promises.readFile(this.path, "utf-8")
            let products = JSON.parse(data)
            let mathRandom = Math.floor(Math.random()*(products.length)+1)
            let id = products.find(a => a.id === mathRandom);
            return { status: "success", id };
        }
    }
}

let admin = new Contenedor("./productos.JSON");

app.get('/productos', (req,res)=>{
    admin.get().then(result=>res.send(result))
})

app.get('/productoRandom', (req,res)=>{
    admin.getRandom().then(result=>res.send(result))
})