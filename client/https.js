const fs = require('fs'); 
const https = require('https'); 
const options = { 
    hostname: 'localhost', 
    port: 4433, 
    path: '/', 
    method: 'GET',
    ca: fs.readFileSync('../certificate-authority/ca-crt.pem'),
    key: fs.readFileSync('./certs/client1-key.pem'),
    cert: fs.readFileSync('./certs/client1-crt.pem')
}; 
const req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    });
}); 
req.end();