//////////////////////////////////////////////////////////////////////////
//
//  GLaDOS admininterface module. Made by Force67 & MasterZero
//
//////////////////////////////////////////////////////////////////////////

const fs = require('fs');
var glados = require('../glados.js');

//ik its ugly... i had countless bugs tho when trying to call exported function idk
function _ReadJson(callback)
{
fs.readFile(glados.main.path2 + '/data/settings/settings.json', 'utf8', function (err, data) {
    if (err) throw err;
    callback(JSON.parse(data));
    });
}

module.exports = bot => {

    var express = require('express');
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var basicAuth = require('basic-auth-connect');
    var app = express();
    var username,userpassword;
    _ReadJson( function(t)
    {
    if (t.enablewebinterface)
    {
       //protect
    app.use(basicAuth(t.admusr, t.admpw));

    // view engine setup
    app.set('views', path.join("./web/", 'views'));
    app.set('view engine', 'jade');

    //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join("./web/", 'public')));

    //sites
    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.render('index', {
            title: 'GLaDOS - Index'
        });
    });

    /* GET scc page. */
    app.get('/scc', function(req, res, next) {
        glados.main.db.all("SELECT * FROM scc", {}, {}, function(err, rows) {
            res.render('scc', {
                title: 'GLaDOS - SCC',
                "scc": rows
            });
        });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    app.listen(glados.main.webport, function() {
        console.log('Started Admininterface on port ' + glados.main.webport);
    });
  }
  });
};
