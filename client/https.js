const fs = require('fs'); 
const https = require('https'); 
const http = require('http'); 
const options = { 
    hostname: 'localhost', 
    port: 4433, 
    path: '/', 
    method: 'GET',
    ca: fs.readFileSync('../certificate-authority/ca-crt.pem'),
    // key: fs.readFileSync('./certs/client1-key.pem'),
    // cert: fs.readFileSync('./certs/client1-crt.pem'),
    // ca: fs.readFileSync('../invalid-certs/ca/ca-crt.pem'),
    // key: fs.readFileSync('../invalid-certs/client/client1-key.pem'),
    // cert: fs.readFileSync('../invalid-certs/client/client1-crt.pem'),
    rejectUnauthorized: true,
    requestCert: true
}; 

const req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    });
    console.log(res.socket.authorized);

});

req.end();