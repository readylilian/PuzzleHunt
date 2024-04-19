import {sendAnswer} from '../src/check.js';

const setupUI = () =>
{
    document.getElementById("submit").onclick = () => {
        sendAnswer(document.getElementById("final").value, 
        `two`);};
}

setupUI();