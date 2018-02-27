var express = require('express'),
	bodyParser = require('body-parser'),
	request = require('superagent');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/hello', function(req, res){
   res.send('hello world');
});

app.post('/ceshi', async function(req, res){
	const parseStr = req.body;
	if(parseStr.method.toUpperCase() === 'GET') {
        await request
            .get(parseStr.baseURL)
            .withCredentials()
            .query(parseStr.data)
            .then(result => {
                if(result && result.ok){
                    res.send(result.body);
                }
            });
    } else if (parseStr.method.toUpperCase() === 'POST') {
        await request
            .post(parseStr.baseURL)
            .withCredentials()
            .send(parseStr.data)
            .then(result => {
                if(result && result.ok){
                    res.send(result.body);
                }
            });
    }
});

app.listen(5656);