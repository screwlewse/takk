const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {
    response = {
    	payload: req.body
    };
    console.log(response);
    res.end(JSON.stringify(response));
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})