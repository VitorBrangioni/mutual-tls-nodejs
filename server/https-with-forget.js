const fs = require('fs'); 
const https = require('https'); 
const forge = require('node-forge');
const pki = forge.pki;
let caCert;
let caStore;
/* 
try {
    caCert = fs.readFileSync('../certificate-authority/ca-crt.pem').toString();
    caStore = pki.createCaStore([ caCert ]);
} catch (e) {
    console.log('Failed to load CA certificate (' + e + ')');
    return;
} */


const options = {};

https.createServer(options, function (req, res) { 
    /* try {
        pki.verifyCertificateChain(caStore, [ cert ]);
    } catch (e) {
        console.log("INVALID CERT = ", e);
        return;
    } */
    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200); 
    res.end("hello world\n"); 
}).listen(4433);