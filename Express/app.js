const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();
let ads = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/src'));

app.get('/ads', (req, res) =>{
    res.json(ads);
});

app.post('/ads', (req, res) =>{
    let body = req.body;
    if('id' in body && body.title && body.author && body.date && body.text && body.contacts ){
        if(body.id == -1){
            ads.push({
                id: (ads.length > 0 ? ads[ads.length - 1].id + 1 : 0),
                title: body.title,
                author: body.author,
                date: body.date,
                text: body.text,
                contacts: {
                    email: body.contacts.email,
                    telephone: body.contacts.telephone,
                    address: body.contacts.address
                }
            });
            res.json(ads[ads.length - 1]);
        }
        else{
            let temp = ads.find(a => a.id == body.id);
            if(temp != null){
                temp.title = body.title;
                temp.author = body.author;
                temp.date = body.date;
                temp.text = body.text;
                temp.contacts.email = body.contacts.email;
                temp.contacts.telephone = body.contacts.telephone;
                temp.contacts.address = body.contacts.address;
                res.json(temp);
            }
            else
                res.send(400);
        }
    }
    else
        res.send(400);
});

app.listen(port, hostname);
console.log(`Listen http://${hostname}:${port}`);