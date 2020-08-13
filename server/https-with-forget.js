const fs = require('fs'); 
const https = require('https'); 
const http = require('http'); 
const forge = require('node-forge');
const pki = forge.pki;
let caCert;
let caStore;

let caFromClient;

const invalidCA = fs.readFileSync('../invalid-certs/ca/ca-crt.pem').toString(); // INVALID
// const invalidCA = fs.readFileSync('../certificate-authority/ca-crt.pem').toString(); // VALID

try {
    caCert = fs.readFileSync('../certificate-authority/ca-crt.pem').toString();
    caStore = pki.createCaStore([ caCert ]);
    caFromClient = pki.certificateFromPem(invalidCA);
} catch (e) {
    console.log('Failed to load CA certificate (' + e + ')');
    return;
}


const options = {};

http.createServer({}, function (req, res) {
    try {
        pki.verifyCertificateChain(caStore, [ caFromClient ]);
    } catch (e) {
        console.log("INVALID CERT = ", e);
        return;
    }


    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200); 
    res.end("hello world\n"); 
    
}).listen(4433);