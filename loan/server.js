var http = require('http'),
    fs = require('fs'),
    httpProxy = require('http-proxy');


var express = require('express');
var app = express();

var proxy = httpProxy.createProxyServer({});

app.use(express.static('./build/'));

// app.get('/', function(req, res) {
//     //res.send('Hello World')

//     fs.readFile("./admin.html", function(error, content) {
//         res.writeHead(200, { 'Content-Type': "text/html" });
//         res.write(content, 'utf-8');
//         res.end();
//     })
// });

// app.get(/api/, function(req, res) {
//     proxy.web(req, res, { target: 'http://dev.whaledata.cn/' });
// });

app.use(function(req, res) {
    if (/lts-plateform/.test(req.url)){
        //     // proxy.web(req, res, { target: 'http://dev.whaledata.cn/' });
        //     //proxy.web(req, res, { target: 'http://172.30.251.176/' });
        //     // proxy.web(req, res, { target: "http://192.168.16.13:8080/" });
        //     // proxy.web(req, res, { target: "http://192.168.16.31:8888/" });
        proxy.web(req, res, { target: "http://192.168.16.41:30001/" });
    }
});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

//
// Listen for the `proxyRes` event on `proxy`.
//
proxy.on('proxyRes', function (proxyRes, req, res) {
    //console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

//
// Listen for the `open` event on `proxy`.
//
proxy.on('open', function (proxySocket) {
    // listen for messages coming FROM the target here
    proxySocket.on('data', hybiParseAndLogMessage);
});

//
// Listen for the `close` event on `proxy`.
//
proxy.on('close', function (res, socket, head) {
    // view disconnected websocket connections
    console.log('Client disconnected');
});

app.listen(3001);
console.log('Server running at http://127.0.0.1:3001/');