# passport.socket.io

passport.socket.io allows your socket.io connections to have access to your passportjs login session.

It will populate the socket.handshake.session.passport.user variable.

# usage
``` js
    // setup express
    var express = require('express')
    var RedisStore = require('connect-redis')(express);
    var redisStore = new RedisStore(); // setup redis
    var cookieParser = express.cookieParser('supersecret');

    app.configure(function(){
        app.use(cookieParser);
        app.use(express.session({store: redisStore}));
    });

    // default socket.io config
    var auth = require('passport.socket.io')(cookieParser, redisStore);
    io.set('authorization', auth);
```