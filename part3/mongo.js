const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}
else if (process.argv.length > 3 && process.argv.length < 5) {
    console.log('Please provide the name or the number as an argument: node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://bsg:${password}@cluster0.gjhwz.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: `${name}`,
  number: `${number}`,
})

if (process.argv.length === 5) {
    person.save().then(result => {
        mongoose.connection.close()
        console.log(`added ${name} number ${number} to phonebook`)
    })
}
else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}