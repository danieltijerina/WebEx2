const request = require("request");

qEndpoint = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=";
idEndpoint = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

const getQ = function (query, callback) {
    const qURL = qEndpoint + query;
    console.log(qURL);

    request({ url: qURL, json: true }, function (err, response) {
        if (err) {
            callback(err, undefined);
        } else if (response.body.total == 0) {
            callback({error: "No pieces match"}, undefined);
        } else {
            callback(undefined, response.body);
        }
    });
};

const getObject = function (id, callback) {
    const objectURL = idEndpoint + id;
    console.log(objectURL);
    request({ url: objectURL, json: true }, function (err, response) {
        if (err) {
            callback(err);
        } else if (response.message){
            callback({error: response});
        } else {
            var r = response.body;
            // There are some art pieces with no constituents. See id:544491
            if (!r.constituents) {
                var artista = "Anonymous";
            } else {
                var artista = r.constituents[0].name;
            }
            const output = {
                artist: artista,
                title: r.title,
                year: r.objectEndDate,
                technique: r.medium,
                metUrl: r.objectURL
            }
            callback(undefined, output);
        }
    });
};

module.exports = {
    getQ: getQ,
    getObject: getObject
};