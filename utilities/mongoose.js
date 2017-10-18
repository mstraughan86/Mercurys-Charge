const mongod = require('mongod');
const mongoose = require('mongoose');
const path = require('path');

const port = process.env.DB_PORT;
const url = `mongodb://localhost:${port}/`;
const dbpath = process.env.DB_PATH;

mongoose.Promise = global.Promise;

const mongoDB = new mongod({
  port: port,
  dbpath: path.join(__dirname, '..', dbpath)
});

const videoSchema = new mongoose.Schema({
  title: String,
  url: String,
  aliasUrl: String,
  number: Number,
  season: Number,
  episode: Number,
  description: String,
  video: String,
  trailer: String,
  imageThumb: String
});
const Video = mongoose.model("Video", videoSchema);

const schemas = {
  Video : Video
};

const reducePromiseArray = (promises) => {
  return promises
    .reduce((chain, promise) => chain.then(promise), Promise.resolve())
    .then(result => {
      console.log('Reduce Promise Array complete.');
      return result;
    });
};


const initialize = () => {
  return mongoDB.open()
    .then(() => {
      console.log('MongoDB: Opened.');
    })
};
const terminate = () => {
  return mongoDB.close()
    .then(()=>{
      console.log('MongoDB: Closed.');
    })
};
const connect = (database) => {
  return mongoose.connect(url + database, {
    useMongoClient: true,
    // I don't know what to do about the connection timeout issue:
    // https://stackoverflow.com/questions/40585705/connection-timeout-for-mongodb-using-mongoose
    // http://mongoosejs.com/docs/connections.html#options
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
    /* other options */
  }, ()=>{
    console.log('Mongoose: Connected to', database);
  });
};
const disconnect = () => {
  return mongoose.disconnect(()=>{console.log('Mongoose: Disconnected.')});
};
const save = (Model, dataArray) => {
  return new Promise((resolve, reject)=>{
    Model.create(dataArray, function (err, results) {
      console.log('Mongoose: Saved array of records');
      if (err) return reject(err);
      return resolve(dataArray);
    })
  });
};
const remove = (Model, key, value) => {
  return new Promise((resolve) => {
    Model.find({[key]: value})
      .then(results => {
        return results
          .reduce((chain, result) => chain.then(()=>{result.remove()}), Promise.resolve())
          .then(result => {
            console.log('Mongoose: Deleted all of records with:', key, value);
            return resolve(result);
          });
      });
  });
};

const createModel = (name, object) => mongoose.model(name, new mongoose.Schema(object));

module.exports = {
  connect,
  disconnect,
  initialize,
  terminate,
  save,
  remove,
  createModel,
  schemas
};