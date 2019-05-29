#!node

//requiring all needed modules
global.fetch = require('node-fetch'); //unsplash api is dependent on fetch
const Unsplash = require('unsplash-js').default; //to get the Unsplash object
const toJson = require('unsplash-js').toJson; //to get the toJson object. No need for import { toJson } from 'unsplash-js'; because imports are not yet supported in Node.js
const fs = require('fs');
const jsonfs = require('jsonfile');

let results = []; // an array of image urls.
let words = []; //the list of words to be searched.
let colours = []; //an array of colours of each image.

const unsplash = new Unsplash({
    applicationId: "",
    secret: ""
});

fs.readFile('../search-list.txt', (err, data) => {
    //data returns a buffer. Use toString() to convert to a string.
    words = data.toString().split(" ");
    words.forEach(word => {
        unsplash.search.photos(word, 1).then(toJson).then(json => {
            if(json.results.length != 0){
                let index = Math.floor(Math.random() * json.results.length);
                let url = json.results[index].urls.small;
                let colour = json.results[index].color;
                let obj = {
                    search_word: word,
                    image: url,
                    colour: colour,
                    author: json.results[index].user.name
                };
                results.push(obj);
                jsonfs.writeFile('../images.json', results, {spaces: 2});
            } else{
                console.log("No images found");
            }
        }).catch(error => {
            console.log('Could not find photo on Unpslash.');
            // console.log(error);
        });
    });
});
