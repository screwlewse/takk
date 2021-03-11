const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');

const tokens = {
    'user.read': 'Bearer xoxb-2319467542-1842793841845-E6GwZiCNT3qvHsGfktVa1TJC',
    'workspace.read': 'Bearer xoxb-2319467542-1842793841845-JlrIkKNKPt2tDt1eDsJFF9tx'
}

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
            'Authorization': tokens['workspace.read']
        }
    };

    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(response);
            console.log(body);
            var slackEmail = JSON.parse(body)['profile']['email'];
            if(slackEmail == 'davidg@surveymonkey.com') {
                slackEmail = 'dgregory@surveymonkey.com';
            }
            findUserInBonusly(slackEmail);
        }
        else{
            console.log(error);
            response.send(null);
        }
    }


    function findUserInBonusly(email){
        const options = {
            url: `https://bonus.ly/api/v1/users?email=${email}`,
            headers: {
                'Authorization': 'Bearer abbfd9c173805a12738a11f521b1a155'
            }
        };

        request(options, foundBonuslyUser);     
    }

    function foundBonuslyUser(error, response, body){
        if (!error && response.statusCode == 200) {
            const bonuslyUser = JSON.parse(body);
            console.log(bonuslyUser.result[0]['email']);
            response.send("boo");
        }
        else{
            console.log(error);
            response.send(null);
        }
    }

    request(options, callback);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})