const http = require('http');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mijorecepti:mijo1950recepti@cluster0.upgko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let insertRecord = function(recept) { 
  return new Promise((resolve, reject) => { 
    client.connect(  (error) => {
      var collection =  client.db("recepti").collection("recepti");
      resolve(collection.insertOne(JSON.parse(recept)))
    })
 })
}

let getAllRecords =  function () {
        return new Promise((resolve, reject) => {
            client.connect(  (error) => {
                var collection =  client.db("recepti").collection("recepti");
                 resolve(collection.find())
        });      
    });
}

let getRecord =  function (search_item) {
  return new Promise((resolve, reject) => {
      client.connect(  (error) => {
          var collection =  client.db("recepti").collection("recepti");
           resolve(collection.find(JSON.parse(search_item)))
  });      
});
}

let updateRecord =  function(search_item, item) {
  return new Promise((resolve, reject) => {
    client.connect(  (error) => {
        var collection =  client.db("recepti").collection("recepti");
         resolve( collection.updateOne(
          JSON.parse(search_item),
          { $set: JSON.parse(item) }
       ))
});  
  
})}


let removeRecord =  function(search_item) {
  return new Promise((resolve, reject) => {
    client.connect(  (error) => {
        var collection =  client.db("recepti").collection("recepti");
         resolve(collection.remove(
          JSON.parse(search_item)
       )
       )})
});  
}

module.exports = {
    getAllRecords: getAllRecords,
    insertRecord: insertRecord,
    getRecord: getRecord,
    updateRecord: updateRecord,
    removeRecord: removeRecord
}
 

