let textField = document.getElementById("textHere");
let buttonField = document.getElementById("buttonsHere");
let textFileContent = getTextFile().split("/").slice(1);
let currentFrame = (Number)(new URLSearchParams(window.location.search).get("frame"));
if (currentFrame == 0) currentFrame = 1


function getTextFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/text.txt", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status === 200) {
            data = xhr.responseText;
        } else {
            console.error("Failed to load the file:", xhr.status, xhr.statusText);
            return false
        }
    };

    xhr.onerror = function() {
        console.error("An error occurred during the XMLHttpRequest.");
        return false
    };

    xhr.send();
    return data
}

class textByFrame {
    constructor(text) {
        this.origText = text;
        this.splitFrameText();
        this.splitButtons();
    }

    splitFrameText() {
        this.frameText = this.origText.split(" ").slice(1).join(" ").split(/-\d{3}/)[0];
    }

    splitButtons() {
        this.btnText = []
        let tempText = this.origText.split(/-(\d{3})/).slice(1);
        console.log(tempText)
        for (let i = 0; i < tempText.length; i += 2) {
            let tempBTN = [];
            tempBTN.push(tempText[i]);
            tempBTN.push(tempText[i + 1]);
            this.btnText.push(tempBTN);
        }

    }
    printFrame() {
        textField.innerHTML = this.frameText;
    }

    printButtons() {
        let tempButtons = ``;
        if (!this.btnText) return;
        for (let btn of this.btnText) {
            tempButtons += `<button onclick="move(${btn[0].toString().slice(1)})">${btn[1].trim()}</button>`;
        }
        console.table(this.btnText)
        console.log(tempButtons)
        buttonField.innerHTML = tempButtons;
    }

}
let frame = new textByFrame(textFileContent[currentFrame - 1]);
frame.printFrame()
frame.printButtons()
function move(num) {
    console.log(num)
    window.location.href = window.location.origin + window.location.pathname + "?frame=" + num;
}
