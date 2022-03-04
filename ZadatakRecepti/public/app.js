const http = require('http');
const express = require('express');
const app = express();
var cors = require('cors')

const db = require("./dbConnection.js")


app.use(cors({origin: 'http://localhost:8080'}));

app.get('/api/getAllRecords',  cors(), async function(req,res) {
    await db.getAllRecords().then(async(resoult) => {
      var returnList = []
      await resoult.forEach(element => {
        console.log(element);
        returnList.push(element)
      });
    
      res.send(returnList);
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(400).send('Bad Request');
  })
  })

  app.post('/api/getRecord',async function(req,res) {
    console.log('------> ', req.headers.search_item);
    await db.getRecord(req.headers.search_item).then(async(resoult) => {
     
      
      var returnList = []
      await resoult.forEach(element => {
        console.log(element);
        returnList.push(element)
      });
    
      res.send(returnList);
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(400).send('Bad Request');
  })
  })

app.post('/api/insertrecords', function(req,res) {
    db.insertRecord(req.headers.recept).then((resoult) => {
      res.send( resoult);
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(400).send('Bad Request');
  })
  })

  app.post('/api/updateRecord', function(req,res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    db.updateRecord(req.headers.search_item, req.headers.item).then((resoult) => {
      res.send( resoult);
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(400).send('Bad Request');
  })
  })

  app.post('/api/removeRecord', function(req,res) {
    console.log(req.headers.search_item);
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    db.removeRecord(req.headers.search_item).then((resoult) => {
      res.send( resoult);
    }).catch((err) => {
      console.log('Error: ', err);
      res.status(400).send('Bad Request');
  })
  })

 app.listen(3000, () => {
  
  console.log('Example app listening on port 3000!')})
  

