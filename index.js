const express = require('express');
const bodyParser = require("body-parser");


const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {
	debugger;
 	console.log(req.body);
    res.json(req.body);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})