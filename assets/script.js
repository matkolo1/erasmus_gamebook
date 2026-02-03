let textField = document.getElementById("textHere");
let textFileContent = getTextFile();

function splitTextContentToFrames(text) {

    result = text.split("/");


    return result;
}


function getTextFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/text.txt", false); // Set third parameter to `false` for synchronous request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status === 200) {
            //console.log(JSON.parse(xhr.responseText))
            data = xhr.responseText;
        } else {
            console.error("Failed to load JSON file:", xhr.status, xhr.statusText);
            return false
        }
    };

    xhr.onerror = function() {
        console.error("An error occurred during the XMLHttpRequest.");
        return false
    };

    xhr.send(); // Send the request

    return data
}
