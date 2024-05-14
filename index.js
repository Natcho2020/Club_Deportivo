const fs = require('node:fs/promises')
const express = require("express")

const app = express()
app.listen(3000, () => {
    console.log("App en puerto 3000")
})
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist"))
app.use("/popper", express.static(__dirname + "/node_modules/@popperjs/core/dist/umd"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


//Ruta creacion 

app.get("/agregar", (req, res) => {
    const { nombre, precio } = req.query

    const deporte = {
        nombre: nombre,
        precio: precio
    }

    fs.readFile("./deportes.json", "utf-8")
        .then(data => {
            let jsonDeportes = JSON.parse(data)

            jsonDeportes.deportes.push(deporte)

            fs.writeFile("./deportes.json", JSON.stringify(jsonDeportes))
                .then(() => {
                    res.send("Usuario Agregado con éxito")
                })
        })

})
