#!node

//requiring all needed modules
global.fetch = require('node-fetch'); //unsplash api is dependent on fetch
const Unsplash = require('unsplash-js').default; //to get the Unsplash object
const toJson = require('unsplash-js').toJson; //to get the toJson object. No need for import { toJson } from 'unsplash-js'; because imports are not yet supported in Node.js
const http = require('http');
const fs = require('fs');

let results = [];

const unsplash = new Unsplash({
    applicationId: "30c8c90f9654ca102b35cb55252e050623ebaaff8f5f92e3e0e101ee6b91f78a",
    secret: "c1553c0c273a47f4e208112733752d8f1b190e3f84481f7bde0d69df39bce411"
});


fs.readFile('search-list.txt', (err, data) => {

});


/*
unsplash.search.photos("Blessed", 1).then(toJson).then(json => {
    console.log(json.results[0]);
    let url = json.results[0].urls.small;


}).catch(error => {
    console.log('Could not find photo on Unpslash.');
});*/
