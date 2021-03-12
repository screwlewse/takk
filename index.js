const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require("body-parser");
const request = require('request');
const axios = require('axios');

const slackWeb = new WebClient(process.env.SLACK_BOT_TOKEN);
const userWeb = new WebClient(process.env.SLACK_USER_TOKEN);
const appLevelWeb = new WebClient(process.env.SLACK_TAKK_APP_LEVEL_TOKEN);
const bonuslyApiToken = process.env.BONUSLY_API_TOKEN;

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {
    (async () => {
        let payload = req.body.payload;
        let parsedUser = null;

        if (typeof(payload) === 'string'){
            parsedUser = JSON.parse(req.body.payload).message.user;
        } else {
            parsedUser = req.body.payload.message.user;
        }
        console.log(payload, parsedUser);

        const url = `https://slack.com/api/users.profile.get?user=${parsedUser}`;
        console.info(url);

        const options = {
            url: url,
            headers: { 
                'Authorization': 'Bearer ' + process.env.SLACK_BOT_TOKEN
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("callback", body, typeof(body));
                var slackEmail = JSON.parse(body)['profile']['email'];
                if(slackEmail == 'davidg@surveymonkey.com') {
                    slackEmail = 'dgregory@surveymonkey.com';
                }
                findUserInBonusly(slackEmail);
            }
            else{
                console.log(error);
            }
        }

        request(options, callback);
        res.end();
    })();

    function findUserInBonusly(email) {
        console.log("email in findUserInBonusly", email);
        axios.get(
            `https://bonus.ly/api/v1/users?email=${email}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + bonuslyApiToken
                }
            }
        )
            .then(function (response) {
                let parsedData = makeDataParseable(response.data)
                // giveBonus(data.result[0]['username']);
            })
            .catch(function (error) {
                console.log(error);
                return res.status(400).send({ "status": "error", "data": error })
            })
    }

    // function findUserInBonusly(email) {
    //     const options = {
    //         url: `https://bonus.ly/api/v1/users?email=${email}`,
    //         headers: {
    //             'Authorization': 'Bearer ' + bonuslyApiToken
    //         }
    //     };
    //     console.log("email in findUserInBonusly", email);
    //     request(options, foundBonuslyUser);
    // }

    function giveBonus(username) {
        axios.post(
            'https://bonus.ly/api/v1/bonuses',
            {
                "reason": `+1 @${username} You're answer was top notch!  #makeithappen ![](https://bonusly-fog.s3.amazonaws.com/uploads/bonus_image/image/604ab409133ba30083fdff2e/EVUhyo0WAAMfcrN.jpg)`
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + bonuslyApiToken
                }
            }
        )
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    // function foundBonuslyUser(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log("foundBonuslyUser", body, typeof (body));
    //         giveBonus(JSON.parse(body).result[0]['username']);
    //     }
    //     else {
    //         console.log(error);
    //         return res.status(400).send({ "status": "error" })
    //     }
    // }
    makeDataParseable(data) {
        if (typeof (data) == "string") {
            return JSON.parse(data);
        } else {
            return data;
        }
    };

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})