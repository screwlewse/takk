const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');


const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {
 	console.log(req.body);
 	const fromUser = req.body.message.user;

 	const options = {
  		url: `https://slack.com/api/users.profile.get?user=${fromUser}`,
  		headers: {
    		'Authorization': 'Bearer xoxb-2319467542-1842793841845-E6GwZiCNT3qvHsGfktVa1TJC'
  		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
	    	console.log(response);
	    	console.log(body);
	    	findUserInBonusly(body['profile']['email'])
	  	}
	  	else{
	  		console.log(error);
	  		response.send(null);
	  	}
	}


	function findUserInBonusly(email){
		const options = {
  		url: `https://bonus.ly/api/v1/users?email?=${email}`,
  		headers: {
    		'Authorization': 'Bearer xoxb-2319467542-1842793841845-E6GwZiCNT3qvHsGfktVa1TJC'
  		}
	};

		
	}

	request(options, callback);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})