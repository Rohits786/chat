var app = require("http").createServer(handler),
    io = require("socket.io").listen(app),
    fs = require("fs");

app.listen(80);

function handler(req, res) {
    fs.readFile(__dirname + '/chatappweb.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading chatappweb.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) {
    //when receiving the data from the server, push the same message to client.
    socket.on("clientMsg", function (data) {
        //send the data to the current client requested/sent.
        socket.emit("serverMsg", data);
        //send the data to all the clients who are accessing the same site(localhost)
        socket.broadcast.emit("serverMsg", data);
    });

    socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
}); 
