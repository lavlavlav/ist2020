const http = require('http');

//  GET
//  localhost:4005/svi-oglasi
function sviOglasi() {
    const options = {
        hostname: '127.0.0.1',
        port: '4005',
        path: encodeURI('/svi-oglasi'),
        method: "GET"
    };
    function handleResponse(response) {
        var serverData = '';
        response.on('data', function (chunk) {
            serverData += chunk;
        });
        response.on('end', function () {
            console.log("Svi oglasi:");
            console.log(JSON.parse(serverData));
        });
    }
    http.request(options, function (response) {
        handleResponse(response);
    }).end();
}
//sviOglasi();

function dodajOglas(id, kategorija, datumIsteka, cena, tekstOglasa, tagOglasa, email) {
    var http = require('http');
    var options = {
        host: '127.0.0.1',
        port: '4005',
        path: '/dodaj-oglas',
        method: 'POST'
    };
    function readResponse(response) {
        var responseData = '';
        response.on('data', function (chunk) {
            responseData += chunk;
        });
        response.on('end', function () {
            console.log("Primljeno: " + responseData);
        });
    }
    var req = http.request(options, readResponse);
    req.write('id=' + id + '&kategorija=' + kategorija + '&datumIsteka=' + datumIsteka+'&cena='+cena+'&tekstOglasa='+tekstOglasa+'&tagOglasa='+tagOglasa+'&email='+email);
    req.end();
}
//dodajOglas(1, "stapovi", "11.1.1998", 133, "Tekst", "Zirafa", "stefanlav@gmail.com");

function obrisiOglas(id) {
    var http = require('http');
    const options = {
        host: '127.0.0.1',
        port: '4005',
        path: '/obrisi-oglas',
        method: 'POST'
    };
    function readResponse(response) {
        var responseData = '';
        response.on('data', function (chunk) {
            responseData += chunk;
        });
        response.on('end', function () {
            console.log("Primljeno: " + responseData);
        });
    }
    var req = http.request(options, readResponse);
    req.write('id=' + id);
    req.end();
}
//obrisiOglas(3);

function izmenaOglasa(id, kategorija, datumIsteka, cena, tekstOglasa, tagOglasa, email){
    var http = require('http');
    var options = {
        host: '127.0.0.1',
        port: '4005',
        path: '/izmena-oglasa',
        method: 'POST'
    };
    function readResponse(response) {
        var responseData = '';
        response.on('data', function (chunk) {
            responseData += chunk;
        });
        response.on('end', function () {
            console.log("Primljeno: " + responseData);
        });
    }
    var req = http.request(options, readResponse);
    req.write('id=' + id + '&kategorija=' + kategorija + '&datumIsteka=' + datumIsteka + '&cena=' + cena + '&tekstOglasa=' + tekstOglasa + '&tagOglasa=' + tagOglasa + '&email=' + email);
    req.end();
}
izmenaOglasa(1, "stapovi", "11.1.1998", 133, "Tekst", "Zirafa", "stefanlav@gmail.com")