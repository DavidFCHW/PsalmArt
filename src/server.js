const fs = require('fs');
const sw = require('stopword');

fs.readFile("psalm_req.txt", (err, data) => {
    // console.log(data.toString());
    let number = data.toString();
    fs.readFile('../NKJV/Psalm ' + number + ".txt", (err, data) => {
        let text = data.toString();
        text = text.replace(/["'`.!,()-;:?]/g, "");
        text = text.replace(/[\n\r]/g, " ");
        let words = Array.from(new Set(sw.removeStopwords(text.split(" ")))); //A Set is a collection of unique values;
        console.log(words);
        words = words.join(" ").replace(/\s+/g, " ");
        // console.log(words);
        fs.writeFile('../search-list.txt', words, (err) => {
            if(err) throw err;
            console.log("File write successful");
        });
    });
});