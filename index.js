const express = require('express');
const { WebClient } = require('@slack/web-api');
const bodyParser = require("body-parser");
const request = require('request');
const axios = require('axios');

const slackBotToken = process.env.SLACK_BOT_TOKEN;
// const userWeb = process.env.SLACK_USER_TOKEN;
const bonuslyApiToken = process.env.BONUSLY_API_TOKEN;

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/bonusly', (req, res) => {
    let payload = makeDataParseable(req.body.payload);
    console.log(payload);
    let parsedUser = payload.message.user;
    if (payload.callback_id == 'bigBonusly') {
        const parentMessageTS = payload.message.thread_ts || null;
        const channel = payload.channel.id;
        const parentMessage = getParentMessage(parentMessageTS, channel);
        poseAQuestion(payload);
    }

    axios.get(
        `https://slack.com/api/users.profile.get?user=${parsedUser}`,
        {
            headers: {
                'Authorization': 'Bearer ' + slackBotToken
            }
        }
    )
        .then(function (response) {
            body = makeDataParseable(response.data);
        var slackEmail = body.profile.email;
        if (slackEmail == 'davidg@surveymonkey.com') {
            slackEmail = 'dgregory@surveymonkey.com';
        }
        findUserInBonusly(slackEmail);
    })
    .catch(function (error) {
        console.log(error);
    })

    res.end();

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
                console.log("about to give a bonus to", parsedData.result[0]['username']);
                // giveBonus(parsedData.result[0]['username']);
            })
            .catch(function (error) {
                console.log(error);
                return res.status(400).send({ "status": "error", "data": error })
            })
    }

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
    };

    function poseAQuestion() {

    }

    function getParentMessage(ts, channel) {
        axios.get(
            `https://slack.com/api/conversations.history?channel=${channel}&latest=${ts}&limit=1`,
            {
                headers: {
                    'Authorization': 'Bearer ' + slackBotToken
                }
            }
        )
            .then(function (response) {
                console.log(response.data, typeof (response.data));
                return response
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    function makeDataParseable(data) {
        if (typeof (data) == "string") {
            console.log("parsing data", JSON.parse(data));
            return JSON.parse(data);
        } else {
            console.log("unparsed data", data);
            return data;
        }
    };

})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})