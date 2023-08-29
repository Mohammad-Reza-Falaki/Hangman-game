const words = ["Hello", "father", "mother", "sister", "brother", "sky", "student", "falaki", "Hello world", "This beautiful world"];
const randomWordsIndex = Math.floor(Math.random() * words.length);
const choosedWord = words[randomWordsIndex].toUpperCase();
console.log(choosedWord);

String.prototype.replaceAt = function(index1, replacement) {
    return this.substring(0, index1) + replacement + this.substring(index1 + replacement.length);
};

let str = "";
for (let element=0; element<choosedWord.length; element++) {
    if (choosedWord[element] === " ") {
        char = " ";
        str += char;
    } else {
        char = "_";
        str += char;
    };
};

const clue = document.getElementById("clue");
const images = document.getElementById("image");
const letters = document.getElementById("letters");
const finalMessage = document.getElementById("gameover");

clue.children[0].innerText = str;

let wrongClicks = 0;
let filteredChoosedWord = "";
let filteredChoosedWordList = [];

for (let item of letters.children) {
    item.addEventListener("click", function(e) {
        e.target.style.background = "silver";
        if ((choosedWord.indexOf(e.target.innerText)) === -1) {
            e.target.style.backgroundColor = "red";
            wrongClicks += 1;
            console.log("wrong!");
                if (wrongClicks == 1) {
                    images.children[0].src = `assets/hangman1.png`;
                } else if (wrongClicks == 2) {
                    images.children[0].src = `assets/hangman2.png`;
                } else if (wrongClicks == 3) {
                    images.children[0].src = `assets/hangman3.png`;
                } else if (wrongClicks == 4) {
                    images.children[0].src = `assets/hangman4.png`;
                } else if (wrongClicks == 5) {
                    images.children[0].src = `assets/hangman5.png`;
                } else {
                    images.children[0].src = `assets/hangman6.png`;
                    clue.children[0].innerText = `Random word was: ${choosedWord}`;
                };
                
        } else {
            e.target.style.backgroundColor = "lightgreen";

            filteredChoosedWord = str;
            for (let i=0; i<choosedWord.length; i++) {
                if (choosedWord[i] == e.target.innerText) {
                    filteredChoosedWord = filteredChoosedWord.replaceAt(i, e.target.innerText); 
                    filteredChoosedWordList.push(filteredChoosedWord);  
                };
            };

            let realTimeWord = str;
            for (let p=0; p<filteredChoosedWordList.length; p++) {
                for (let k=0; k<filteredChoosedWordList[p].length; k++) {
                    if (filteredChoosedWordList[p][k] !== "_") {
                        realTimeWord = realTimeWord.replaceAt(k, filteredChoosedWordList[p][k]);
                    };
                };
            };

            !realTimeWord.includes("_") && (images.children[0].src = `assets/winner.png`);
            !realTimeWord.includes("_") && (finalMessage.children[0].style.display = "inline");
            !realTimeWord.includes("_") && (finalMessage.children[0].innerText = `Excelent!, refresh the page to play again.`);

            clue.children[0].innerText = realTimeWord;
          
        };
    });
}; 