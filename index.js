const express = require("express")
const e = require("express")
const app = express()

app.use(express.json())

let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      },
      {
        name: "jdhd",
        number: "233",
        id: 5
      },
      {
        name: "hh",
        number: "87",
        id: 6
      }
    ]

app.get('/api/persons', (req,res) =>{
    res.json(persons)
})

app.get('/info', (req,res) =>{
    res.send(`<p>Phonebook has info of ${persons.length} people</p> <p> ${new Date()}</p>`)
})

app.get('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    let details = persons.find( person => {
        return person.id === id
    })
    if(details){
        res.json(details)
    }
    else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    persons = persons.filter( person => person.id !== id)
    res.status(204).end()
})

app.post("/api/persons", (req,res) =>{
    let newEntry = req.body

    if( newEntry.name !== "" && newEntry.number !== "" && persons.find( p => p.name === newEntry.name)){
        return res.status(404).json('error : Contact must be unique')
    }
    else{
    newEntry.id = Math.floor(Math.random()*100000)
    persons = persons.concat(newEntry)
    res.json(newEntry)
    }
})

const PORT = 3001
app.listen(PORT, () => console.log(`\n\t\tServer is Running at port ${PORT}\n`))