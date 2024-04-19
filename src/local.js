
const key = "puzzhunt5solvedanswers";
let achived;
//add to local storage
const addAnswer = (num,val) =>
{
    try
    {
        achived = localStorage.getItem(key);
        achived = achived.split(",");
    }
    catch
    {
        achived = [];
        achived.length = 8;
    }
    switch (num){
        case 'one':
            num = 0;
            break;
        case 'two':
            num = 1;
            break;
        case 'three':
            num = 2;
            break;
        case 'four':
            num = 3;
            break;
        case 'five':
            num = 4;
            break;
        case 'six':
            num = 5;
            break;
        case 'seven':
            num = 6;
            break;
        case 'meta':
            num = 7;
            break;
    }
    achived[num] = val;
    localStorage.setItem(key,achived);
    console.log(achived);
}
//set up section

const setupAnswers = () =>
{
    try
    {
        achived = localStorage.getItem(key);
        achived = achived.split(",");
        if(achived[0] != "") {document.getElementById('1').innerHTML += `Answer: ${achived[0].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[1] != "") {document.getElementById('2').innerHTML += `Answer: ${achived[1].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[2] != "") {document.getElementById('3').innerHTML += `Answer: ${achived[2].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[3] != "") {document.getElementById('4').innerHTML += `Answer: ${achived[3].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[4] != "") {document.getElementById('5').innerHTML += `Answer: ${achived[4].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[5] != "") {document.getElementById('6').innerHTML += `Answer: ${achived[5].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[6] != "") {document.getElementById('7').innerHTML += `Answer: ${achived[6].replace(/\s/g, "").toLowerCase()}`;}
        if(achived[7] != "") {document.getElementById('8').innerHTML += `<p>Answer: ${achived[7]}</p>`;}
    }
    catch
    {
        console.log("no puzzles solved yet");
    }
}

//setupAnswers();

export {addAnswer,setupAnswers};