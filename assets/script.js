let textField = document.getElementById("textHere");
let buttonField = document.getElementById("buttonsHere");
let textFileContent = getTextFile().split("/").slice(1);
let currentFrame = (Number)(new URLSearchParams(window.location.search).get("frame"));


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
        this.frameText = this.origText.split(" ").slice(1).join(" ").split("-")[0];
    }

    splitButtons() {
        this.btnText = []
        let tempText = this.origText.split("-").slice(1);
        for (let btn of tempText) {
            let tempBTN = [];
            tempBTN.push(btn.split(" ")[0]);
            tempBTN.push(btn.split(" ").slice(1).join(" "));
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
            tempButtons += `<button onclick="move(${btn[0]})">${btn[1]}</button>`;
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
    window.location.href = window.location.origin + window.location.pathname + "?frame=" + num;
}
