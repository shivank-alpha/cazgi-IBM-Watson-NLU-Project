const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();
function getNLUInstance() {
    let api_key=process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require ('ibm-watson/natural-language-understanding/v1' );
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding=new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        seviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

getNLUInstance("/",(req,res)=>{
    res.render('index.html');
  });

getNLUInstance("/url/emotion", (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

getNLUInstance("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

getNLUInstance("/text/emotion", (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

getNLUInstance("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

