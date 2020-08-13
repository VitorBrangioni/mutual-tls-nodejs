const fs = require('fs'); 
const https = require('https'); 
const options = { 
    key: fs.readFileSync('./certs/server-key.pem'), 
    cert: fs.readFileSync('./certs/server-crt.pem'), 
    ca: fs.readFileSync('../certificate-authority/ca-crt.pem'),
    // key: fs.readFileSync('../invalid-certs/server/server-key.pem'), 
    // cert: fs.readFileSync('../invalid-certs/server/server-crt.pem'), 
    // ca: fs.readFileSync('../invalid-certs/ca/ca-crt.pem'),
    requestCert: true, 
    rejectUnauthorized: true
}; 
const server = https.createServer(options, (req, res) => {
    console.log(
        'server connected',
        req.socket.authorized ? 'authorized' : 'unauthorized',
    );
    res.writeHead(200);
    res.end('hello world!');
});

server.listen(4433, () => {
    console.log('server listening...');
});