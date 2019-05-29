$(document).ready(() => {
    for(let i = 1; i <= 150; i++){
        $('select').append("<option>" + i + "</option>");
    }

    //The following function was taken from http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
    let getUrlParameter = (sParam) => {
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for(i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    let title = getUrlParameter('psalm');
    $('#head2').append("Psalm " + title);
    $('#title').append("Psalm " + title);
    
    $.get("/PsalmArt/NKJV/Psalm " + title + ".txt", data =>{
        console.log(data);
        $('#psalm-text').append(data);
    });

    $.get('/PsalmArt/images.json', data =>{
        let colours = [];
        data.forEach(img =>{
            colours.push(img.colour);
        });
        // console.log(colours.length);
        let canvas = document.getElementById('myCanvas');
        let c = canvas.getContext('2d');
        let w = 5;
        let h = 5;
        for(let x = 0; x < 500; x+=5){
            for(let y = 0; y < 400; y+=5){
                c.beginPath();
                c.rect(x, y, w, h);
                c.fillStyle = colours[Math.floor(Math.random() * 10)];
                c.fill();
            }
        }
    });
});