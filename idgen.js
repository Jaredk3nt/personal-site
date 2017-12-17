const jsonfile = require('jsonfile');
const file = "./static/cards-outline.json";
const outfile = "./static/cards.json";
let cards;

jsonfile.readFile(file, function(err, obj) {
    cards = obj.cardList;
    for(let i = 0; i < cards.length; i++) {
        cards[i].id = i;
    }
    familiars = obj.familiars;
    for(let i = 0; i < familiars.length; i++) {
        familiars[i].id = i;
    }
    jsonfile.writeFile(outfile, obj, function (err) {
        console.error(err);
    });
});





