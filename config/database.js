const mongoose = require('mongoose');

const dbName ='places';

const options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

module.exports = {


  connect: () => {
  mongoose
    .connect("mongodb://localhost/" + dbName, options)
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log(Error, err.message);
    });
}


  /*
() => mongoose.connect('mongodb://localhost'+ dbName,options),
  dbName,
  connection: ()=>{
    if(mongoose.connection)
      return mongoose.connection;
    return this.connect();
  }*/


}
