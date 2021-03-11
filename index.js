const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {
	console.log(req);
	console.log(req.body);
	console.log(req.body.payload);
    res.json(req.body.payload);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})