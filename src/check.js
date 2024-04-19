import {addAnswer} from '../src/local.js';
const URL = "https://us-east-1.aws.data.mongodb-api.com/app/data-adqvx/endpoint/";

const answerLoaded = (e,puzz) =>
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    //8 if no response print and return
    if(obj.length != 0)
    {
        document.getElementById("results").innerHTML = "Correct!";
        addAnswer(puzz,`${obj[0].sol[0]}`);
    }
    else
    {
        document.getElementById("results").innerHTML = "Incorrect, please try again.";
    }
}

const sendAnswer = (val,puzz) =>
{
    let xhr = new XMLHttpRequest();
    //2 set onload handler
    xhr.onload = (e) => {answerLoaded(e,puzz)};
    //3 set onerror handler
    xhr.onerror = () => {console.log(`An error occurred`);};
    //4 get open and sent request
    document.getElementById("results").innerHTML = "Checking answer..."
    console.log("Sending put request");
    document.getElementById("past").innerHTML += `<br><br>${val}`;
    xhr.open(`PUT`, `${URL}${puzz}`);
    xhr.send(val);

}

export {sendAnswer};