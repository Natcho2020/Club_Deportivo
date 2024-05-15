const express = require("express")
const fs = require('node:fs/promises')


const app = express()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000, () => {
    console.log("App en puerto 3000")
})

//Ruta creacion 

app.get("/agregar", (req, res) => {
    const { nombre, precio } = req.query

    const deporte = {
        nombre: nombre,
        precio: precio
    }

    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {

            let jsonDeportes = JSON.parse(data)
            //jsonDeportes ={"deportes" : []}
            jsonDeportes.deportes.push(deporte)

            fs.writeFile("./data/deportes.json", JSON.stringify(jsonDeportes))
                .then(() => {
                    res.send(jsonDeportes)
                })
        })
})
app.get("/deportes", (req, res) => {
    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
            const datosJson = JSON.parse(data)

            res.send(JSON.stringify(datosJson))
        })
})
app.get("/editar", (req, res) => {

    const { nombre, precio } = req.query

    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
            const datosJson = JSON.parse(data)


            const deportesModificados = datosJson.deportes.map(d => {

                if (d.nombre == nombre) {
                    d.precio = precio
                    return d
                } else {
                    return d;
                }
            })
            datosJson.deportes = deportesModificados

            fs.writeFile("./data/deportes.json", JSON.stringify(datosJson))
                .then(() => {
                    res.send(datosJson)
                })
        })
})
app.get("/eliminar", (req, res) => {
    const { nombre } = req.query

    fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
            const datosJson = JSON.parse(data)

            const deportesFiltrados = datosJson.deportes.filter(d => {
                return d.nombre !== nombre
            })

            datosJson.deportes = deportesFiltrados

            fs.writeFile("./data/deportes.json", JSON.stringify(datosJson))
                .then(() => {
                    console.log("Deporte Eliminado")
                    res.send(datosJson);
                })
        })
})

