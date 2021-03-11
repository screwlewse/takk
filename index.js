const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require("body-parser");
const request = require('request');

const slackWeb = new WebClient(process.env.SLACK_BOT_TOKEN);
const userWeb = new WebClient(process.env.SLACK_USER_TOKEN)

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {

    // const fromUser = req.body.message.user;
    console.log(req.body)
    const daveUser = "";
    const dhanaUser = "U04A34BSV";
    (async () => {
        const user = await slackWeb.users.profile.get({
            username: dhanaUser
        });
        console.log(user);

        var slackEmail = JSON.parse(user).profile.email;
        if (slackEmail == 'davidg@surveymonkey.com') {
            slackEmail = 'dgregory@surveymonkey.com';
        }
        //findUserInBonusly(slackEmail);
    })();





    // console.log(req.body);
    // const fromUser = req.body.message.user;

    // const options = {
    //     url: `https://slack.com/api/users.profile.get?user=${fromUser}`,
    //     headers: {
    //         'Authorization': tokens['workspace.read']
    //     }
    // };

    // function callback(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(response);
    //         console.log(body);
    //         var slackEmail = JSON.parse(body)['profile']['email'];
    //         if(slackEmail == 'davidg@surveymonkey.com') {
    //             slackEmail = 'dgregory@surveymonkey.com';
    //         }
    //         findUserInBonusly(slackEmail);
    //     }
    //     else{
    //         console.log(error);
    //         response.send(null);
    //     }
    // }


    function findUserInBonusly(email) {
        const options = {
            url: `https://bonus.ly/api/v1/users?email=${email}`,
            headers: {
                'Authorization': 'Bearer abbfd9c173805a12738a11f521b1a155'
            }
        };
        console.log("email in findUserInBonusly", email);
        request(options, foundBonuslyUser);
    }

    // function giveBonus(username) {
    //     const options = {
    //         url: `https://bonus.ly/api/v1/bonuses`,
    //         headers: {
    //             'Authorization': 'Bearer abbfd9c173805a12738a11f521b1a155'
    //         },
    //         body: {
    //             "reason": `+0 @${username} #trusttheteam`,
    //         }
    //     };

    //     request.post(options)
    // }

    function foundBonuslyUser(error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log("foundBonuslyUser", response, body);
            console.log(body);
            //console.log(JSON.parse(body));
            //const bonuslyUser = JSON.parse(body);
            //console.log(bonuslyUser.result[0]['username']);
            // giveBonus(bonuslyUser.result[0]['username'])
            response.send(null);
        }
        else {
            console.log(error);
            response.send(null);
        }
    }

    // request(options, callback);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})