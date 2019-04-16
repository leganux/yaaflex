const mongoose = require('mongoose');
const URI = 'mongodb://localhost/project';

mongoose.connect(URI, { useNewUrlParser: true })
  .then(db => console.log('DB is connected'))
  .catch(error => console.error(error));
  
module.exports = mongoose;
