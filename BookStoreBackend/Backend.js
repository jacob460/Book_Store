var mysql = require('mysql');
var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Fuck you');
    res.write(req.url);
    res.end();
}).listen(8080);

var con = mysql.createConnection({
    host: "localhost",
    user: "Jacob",
    password: "password",
    database: "bookstore",
});
var sql = "SELECT * FROM bookdata";
con.connect(function(err) {
    if(err) throw err;
    console.log("Connected");
    con.query(sql, function (err, result){
        if(err) throw err;
        console.log("Result: " + result)
    });
});