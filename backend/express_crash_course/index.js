import express from 'express'

const app = express()

const port = 3000

// app.get("/", (req, res) => {
//     res.send("Hello from /!")
// })

// app.get("/shubham", (req, res) => {
//     res.send("Hello from Shubham!")
// })

// app.get("/sharma", (req, res) => {
//     res.send("Hello from sharma!")
// })

// any data that comes in json form, we accept that
app.use(express.json())

let arrayData = []
let nextId = 1

// add a new entry
app.post("/teas", (req, res) => {
    // req.body.price this is how data comes
    const {name, price} = req.body
    const dataToInject = {id: nextId++, name, price}
    arrayData.push(dataToInject)
    res.status(201).send(dataToInject)
})

// get all entries
app.get("/teas", (req, res) => {
    res.status(201).send(arrayData)
})

// get single entry from url
app.get("/teas/:id", (req, res) => {
    const entity = arrayData.find(item => item.id === parseInt(req.params.id))
    if(!entity){
        return res.status(404).send(`entity with id: ${req.params.id} not found.`)
    }
    res.status(200).send(entity)
})

// update entry
app.put('/teas/:id', (req, res) => {
    const entity = arrayData.find(item => item.id === parseInt(req.params.id))
    if(!entity){
        return res.status(404).send(`entity with id: ${req.params.id} not found.`)
    }
    const {name, price} = req.body
    entity.name = name
    entity.price = price
    res.status(200).send(entity)
})

// delete entry
app.delete('/teas/:id', (req, res) => {
    const entityIndex = arrayData.findIndex(item => item.id === parseInt(req.params.id))
    if(entityIndex === -1){
        return res.status(404).send(`404 - ${req.params.id} not found!`)
    }
    arrayData.splice(entityIndex, 1)
    res.status(200).send(`${req.params.id} deleted !`)
})


app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})