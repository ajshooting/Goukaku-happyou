var count = 0;

function setTextElement(inputText, outputElement) {
    var titleElement = document.createElement("h2");
    titleElement.textContent = "以下合格者"
    outputElement.appendChild(titleElement);
    var fNumber = 0;
    var randomNumber = 0;
    while (true) {
        console.log(fNumber, randomNumber);
        randomNumber = Number(randomNumber + Math.floor(Math.random() * 5) + 1);
        fNumber = Number(getLastDigit(inputText) - 100 + randomNumber)
        if (randomNumber > 94) {
            break
        }
        var textElement = document.createElement("div");
        textElement.textContent = getLastNonDigit(inputText) + fNumber;
        outputElement.appendChild(textElement);
    }
    var textElement = document.createElement("div");
    textElement.textContent = getLastNonDigit(inputText) + (getLastDigit(inputText) - 1);
    outputElement.appendChild(textElement);
    count += 1;
}

function addTextElement(inputText, outputElement) {
    // outputElement.appendChild(textElement);
    var outputRect = outputElement.getBoundingClientRect();
    var outputBottom = outputRect.bottom;
    var windowHeight = window.innerHeight;
    var windowScroll = window.scrollY;
    if (outputBottom < windowHeight + windowScroll + 50) {
        while (outputBottom < windowHeight + windowScroll + 50) {
            var textElement = document.createElement("div");
            textElement.textContent = chNumber(inputText);
            outputElement.appendChild(textElement.cloneNode(true));
            outputRect = outputElement.getBoundingClientRect();
            outputBottom = outputRect.bottom;
        }
    }
}

function chNumber(txt) {
    var base = Math.floor(count / 9);
    if (base == 0) {
        var number = "";
    } else {
        var number = '9'.repeat(base);
    }
    if ((count % 9) == 0) {
        number = number
    } else {
        number = number + (count % 9);
    }
    // でばっくよう
    console.log("number : " + number)
    console.log("base : " + base)
    console.log("count : " + count)
    console.log("---------------------------")
    count += 1;
    return getLastNonDigit(txt) + (getLastDigit(txt) - 1) + "." + number;
}

function getLastDigit(str) {
    let regex = /\d+$/;
    let result = str.match(regex);
    if (result) {
        return result[0];
    } else {
        return null;
    }
}

function getLastNonDigit(str) {
    let regex = /\D+$/;
    let result = str.match(regex);
    if (result) {
        return result[0];
    } else {
        return "";
    }
}

function init() {
    var button = document.getElementById("button");
    var input = document.getElementById("input");
    var output = document.getElementById("output");
    button.addEventListener("click", function () {
        var inputText = input.value;
        if (getLastDigit(inputText) != null) {
            if (getLastDigit(inputText) < 100) {
                alert("マイナスの数字になっちゃう泣")
            }
            setTextElement(inputText, output);
            document.addEventListener("scroll", function () { addTextElement(inputText, output); });
        } else {
            alert("受験番号末尾が数字になるようにしてください")
        }
    });
}

document.addEventListener("DOMContentLoaded", init);