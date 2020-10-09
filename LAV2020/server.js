const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('query-string');
var builder = require('xmlbuilder');
var doc = builder.create('Oglasi');


let oglasi = [
    {
        "id": 1,
        "tekstOglasa": "Tekst oglasa 1",
        "datumIsteka": "20.11.2010",
        "cena": 1500,
        "kategorija": "kuce",
        "tagOglasa": "objekat",
        "email": "markomarkovic1@gmail.com"
    },
    {
        "id": 2,
        "tekstOglasa": "Tekst oglasa 2",
        "datumIsteka": "21.11.2010",
        "cena": 1600,
        "kategorija": "automobili",
        "tagOglasa": "auto",
        "email": "markomarkovic2@gmail.com"
    },
    {
        "id": 3,
        "tekstOglasa": "Tekst oglasa 3",
        "datumIsteka": "22.11.2010",
        "cena": 1700,
        "kategorija": "stanovi",
        "tagOglasa": "zgrada",
        "email": "markomarkovic3@gmail.com"
    }
];

let kategorije = [
    {
        "id": 1,
        "imeKategorije":"stanovi"
    },
    {
        "id": 2,
        "imeKategorije": "automobili"
    },
    {
        "id": 3,
        "imeKategorije": "kuce"
    },
];

http.createServer(function (req, res) {
    let urlObj = url.parse(req.url, true, false);

    if (req.method == "GET") {

        // svi-oglasi
        if (urlObj.pathname == "/svi-oglasi") {
            
            response = sviOglasi();
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sve Osobe</title>
<style>
    table, th, td{
        border:1px solid black;
}
th, td{
padding:5px 12px;
}
</style>
</head>
<body>
<h3>Svi oglasi </h3>
<a href="/dodaj-oglas">Dodaj oglas</a>
<br>
<br>
<div id="prikaz">
<table>
<thead>
<tr>
<th>Id</th>
<th>Kategorija</th>
<th>Datum isteka</th>
<th>Cena</th>
<th>Tekst oglasa</th>
<th>Tag oglasa</th>
<th>Email</th>
<th>Izmena</th>
<th>Brisanje</th>
</tr>
</thead>
<tbody>
`);
            for (let o of response) {
                res.write(`
<tr>
<td>${o.id}</td>
<td>${o.kategorija}</td>
<td>${o.datumIsteka}</td>
<td>${o.cena}</td>
<td>${o.tekstOglasa}</td>
<td>${o.tagOglasa}</td>
<td>${o.email}</td>
<td><a href='/izmena-oglasa?id=${o.id}'>Izmeni oglas</a></td>
<td><form action='/obrisi-oglas' method='POST'>
                                <input type='hidden' name='id' value='${o.id}'>
                                <button type='submit'>Brisanje oglasa</button>
                            </form></td>
</tr>
`);
            }
            res.end(`
</tbody>
</table>
</body>
</html>
`);


        }

        //sve-kategorije
        if (urlObj.pathname == "/sve-kategorije") {
            response = sveKategorije();
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sve Kategorije</title>
<style>
    table, th, td{
        border:1px solid black;
}
th, td{
padding:5px 12px;
}
</style>
</head>
<body>
<h3>Sve kategorije </h3>
<a href="/dodaj-kategoriju">Dodaj kategoriju</a>
<br>
<br>
<div id="prikaz">
<table>
<thead>
<tr>
<th>Id</th>
<th>Kategorija</th>

</tr>
</thead>
<tbody>
`);
            for (let r of response) {
                res.write(`
<tr>
<td>${r.id}</td>
<td>${r.imeKategorije}</td>

</tr>
`);
            }
            res.end(`
</tbody>
</table>
</body>
</html>
`);


        }

        if (urlObj.pathname == "/izmena-oglasa") {
            let oglas = oglasi.find(x => x.id == urlObj.query.id);
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Izmeni oglas</title>
                </head>
                <body>
                    <h3>Izmeni oglas</h3>
                    <a href="/svi-oglasi">Sve oglasi</a>
                    <br><br>
                    <form action='/izmena-oglasa' method='POST'>
                        ID: <input type='number' name='id' value='${oglas.id}' readonly><br><br>
                        Kategorija: <input type='text' name='kategorija' value='${oglas.kategorija}'><br><br>
                        Datum isteka: <input type='text' name='datumIsteka' value='${oglas.datumIsteka}'><br><br>
                        Cena: <input type='number' name='cena' value='${oglas.cena}'><br><br>
                        Tekst oglasa: <input type='text' name='tekstOglasa' value='${oglas.tekstOglasa}'><br><br>
                        Tag oglasa: <input type='text' name='tagOglasa' value='${oglas.tagOglasa}'><br><br>
                        Email: <input type='text' name='email' value='${oglas.email}'><br><br>
                        <button type='submit'>Izmeni oglas</button>
                    </form>
                </body>
                </html>
            `);
        }

        if (urlObj.pathname == "/dodaj-oglas") {
            res.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dodaj oglas</title>
                </head>
                <body>
                    <h3>Dodaj oglas</h3>
                    <a href="/svi-oglasi">Svi oglasi</a>
                    <br><br>
                    <form action='/dodaj-oglas' method='POST'>
                        ID: <input type='number' name='id'><br><br>
                        Kategorija: <input type='text' name='kategorija'><br><br>
                        Datum isteka: <input type='text' name='datumIsteka'><br><br>
                        Cena: <input type='number' name='cena'><br><br>
                        Tekst oglasa: <input type='text' name='tekstOglasa'><br><br>
                        Tag oglasa: <input type='text' name='tagOglasa'><br><br>
                        Email: <input type='text' name='email'><br><br>
                        <button type='submit'>Izmeni oglas</button>
                    </form>
                </body>
                </html>
            `);
        }
    }
    //POST zahtevi

    else if (req.method == "POST") {

        // izmena-oglasa
        if (urlObj.pathname == "/izmena-oglasa") {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                izmenaOglasa(querystring.parse(body).id, querystring.parse(body).kategorija, querystring.parse(body).datumIsteka, querystring.parse(body).cena, querystring.parse(body).tekstOglasa, querystring.parse(body).tagOglasa, querystring.parse(body).email);
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        } // izmena-oglasa

        //dodaj-oglas
        if (urlObj.pathname == "/dodaj-oglas") {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajOglas(querystring.parse(body).id, querystring.parse(body).kategorija, querystring.parse(body).datumIsteka, querystring.parse(body).cena, querystring.parse(body).tekstOglasa, querystring.parse(body).tagOglasa, querystring.parse(body).email);
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        }

        //obrisi-oglas

        if (urlObj.pathname == "/obrisi-oglas") {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                obrisiOglas(querystring.parse(body).id)
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        }
       
        if (urlObj.pathname == "/filter-oglasa") {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                filterOglasa(querystring.parse(body).id)
                res.writeHead(302, {
                    'Location': '/svi-oglasi'
                });
                res.end();
            });
        }

        
    }



}).listen(4005);

function izmenaOglasa(id, kategorija,datumIsteka,cena,tekstOglasa,tagOglasa,email) {
    for (let i = 0; i < oglasi.length; i++) {
        if (oglasi[i].id == id) {
            oglasi[i].kategorija = kategorija;
            oglasi[i].datumIsteka = datumIsteka;
            oglasi[i].cena = cena;
            oglasi[i].tekstOglasa = tekstOglasa;
            oglasi[i].tagOglasa = tagOglasa;
            oglasi[i].email = email;
        }
    }
}

function dodajKategoriju(id,imeKategorije){
    let kategorija = {
        'id': id,
        'imeKategorije': imeKategorije,
    };
    kategorije.push(kategorija);
}

function obrisiOglas(id) {
    let pomocni = []
    for (let i = 0; i < oglasi.length; i++) {
        if (oglasi[i].id != id) {
            pomocni.push(oglasi[i])
        }
    }
    oglasi = pomocni
    return oglasi
}

function sviOglasi() {
    return oglasi;
}

function sveKategorije() {
     return kategorije;
}

function dodajOglas(id, kategorija, datumIsteka, cena, tekstOglasa, tagOglasa, email) {
    let oglas = {
        'id': id,
        'kategorija': kategorija,
        'datumIsteka': datumIsteka,
        'cena': cena,
        'tekstOglasa': tekstOglasa,
        'tagOglasa': tagOglasa,
        'email': email,
    };
    for (let i = 0; i < oglasi.length; i++) {
        if (oglasi[i].id==Number(oglas.id)) {
            oglas.id = oglasi.length + 1;
        }
    }
    oglasi.push(oglas);
    console.log(oglasi);
}
