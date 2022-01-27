// All external modules are loaded in:
const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const cors = require("cors")

// sqlQuery('SELECT User from mysql.user;')
//     .then(rows => {
//         console.log(rows)
//     })

function loadJSON(filename) {
    const rawdata = fs.readFileSync(path.join(__dirname, filename))
    const data = JSON.parse(rawdata)
    return data
}

function saveJSON(json, filename) {
    const stringified = JSON.stringify(json, null, 4)
    fs.writeFile(path.join(__dirname, filename), stringified, (err) => {
        if (err) throw err
        console.log(`Written to ${path.join(__dirname, filename)}:\n${stringified}`)
    })
}

// Reading input from terminal start
const port = parseInt(process.argv[2]) || 3000
console.log(`${port} registered as server port`)
// Reading input from terminal end

app.use(cors()) // Making sure the browser can request more data after it is loaded on the client computer.

app.use("/static", express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'))
})

app.get('/activateDrawer', (req, res) => {
    data = loadJSON('../lightController/data.json')
    data.mode = 'standard'
    data.activePixels[req.query.pixelCoords] = {
        'color': '0-255-0',
        'created': Date.now(),
        'deleteIn': 5000
    }
    saveJSON(data, '../lightController/data.json')
    res.send("Data recieved")
})

setInterval(() => {
    data = loadJSON('../lightController/data.json')
    for (const [k, v] of Object.entries(data.activePixels)) {
        if (parseInt(v.created) + parseInt(v.deleteIn) < Date.now()) {
            delete data.activePixels[k]
            console.log(`deleted ${k}`)
        }
    }
    saveJSON(data, '../lightController/data.json')
}, 1000)

app.listen(port, () => console.log(`Listening on ${port}`))