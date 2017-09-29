var app = require("http").createServer(handler),
    io = require("socket.io").listen(app),
    fs = require("fs");

app.listen(1234);

function handler(request, response) {
    fs.readFile(__dirname + '/chatappweb.html',
        function (err, data) {
            if (err) {
                response.writeHead(500);
                return response.end('Error loading chatappweb file');
            }
            response.writeHead(200);
            response.end(data);
        });
}

io.sockets.on('connection', function (socket) {
   
    socket.on("clientMsg", function (data) {
      
        socket.emit("serverMsg", data);
       
        socket.broadcast.emit("serverMsg", data);
    });

    socket.on("sender", function (data) {
        socket.emit("sender", data);
        socket.broadcast.emit("sender", data);
    });
}); 
