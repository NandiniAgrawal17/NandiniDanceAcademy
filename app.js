const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contact', { useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require("body-parser");
const port = 80;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  feedback: String
});
var contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//For serving static files
// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'views'))//set the views directory

app.get('/', (req, res) => {
  const params = {}
  res.status(200).render('index.pug', params);
})

app.get('/contact', (req, res) => {
  const params = {}
  res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to database")
  }).catch(()=>{
    res.status(400).send("Item was not saved to database")
  });
})


//START THE SERVER
app.listen(port, () => {
 console.log(`the application stated suceesfully on port ${port}/`);
});