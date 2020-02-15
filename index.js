const fs = require('fs');
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
const rawdata = fs.readFileSync('ontology.json');
const ontology = JSON.parse(rawdata);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/ontology/:term', (req, res) => {
    const terms = req.params.term.split('.')
    console.log(terms)
    let temp = JSON.parse(JSON.stringify(ontology));
    for (const i in terms) {
        if (!temp[terms[i]]) {
            error(res);
            console.log("ERROR")
            return false;
        }
        temp = temp[terms[i]]
    }
    let o = []
    getList(temp, o)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200)
    res.end(JSON.stringify(o))
})

function error(res) {
    res.writeHead(400)
    res.end("Not found!")
}

function getList(obj, list) {
    for (var k in obj) {
        if (obj[k] instanceof Object) {
            getList(obj[k], list);
        } else {
            list.push(k)
        }
    }
}

app.listen(3006)
console.log("Application started!")