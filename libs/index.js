var passportSocketio = function(cookieParser, sessionStore, cookie){
    var _cookie = cookie || 'connect.sid';
    var _cookieParser = cookieParser;
    var _sessionStore = sessionStore;

    var auth = function(data, accept){
        if (data && data.headers && data.headers.cookie) {
            _cookieParser(data, {}, function(err){
                if(err){
                    return accept('COOKIE_PARSE_ERROR');
                }
                var sessionId = data.signedCookies[_cookie];
                _sessionStore.get(sessionId, function(err, session){
                    console.log('in auth: session: ', session);
                    console.log('in auth: sessionId: ', sessionId);
                    console.log('in auth: signedCookie: ', data.signedCookies);
                    if(err || !session || !session.passport || !session.passport.user || !session.passport.user) {
                        // accept('NOT_LOGGED_IN', false);
                        console.log('not logged in', session.passport.user);
                        accept(null, true);
                    }
                    else{
                        console.log('logged in');
                        data.session = session;
                        accept(null, true);
                    }
                });
            });
        } else {
            return accept('MISSING_COOKIE', false);
        }
    };

    return auth;
};

module.exports = passportSocketio;