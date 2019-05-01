
const express = require('express');
const app = express();
const http = require('http')
Server_ = http.createServer(app)
    .listen(3000, function () {
        console.log('Socket server start at port  ' + 3000)
    });
var io = require('socket.io').listen(Server_);

module.exports = io;