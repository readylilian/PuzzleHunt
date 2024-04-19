import * as Tone from 'tone';
var axios = require('axios');
import { Renderer, Stave, StaveNote, Formatter, Beam } from 'vexflow';

// Create an SVG renderer and attach it to the DIV element named "boo".
//const {Synth} = Tone;
const div = document.getElementById("staff");
const body = document.getElementById("body");
const synth = new Tone.Synth().toDestination();
//const now = Tone.now()
let renderer;
let context;
let results;

let noteCount = 1;
let notes1 = [];
let notes2 = [];
let notes3 = [];
let notes4 = [];
let beam1;
let beam2;
let stave1;
let stave2;
let stave3;
let stave4;

const sendNote = (e) =>
{
    console.log(e);
    if(noteCount < 5)
    {
        notes1[noteCount]= new StaveNote({keys: [`${e}`], duration: notes1[noteCount].duration});
    }
    //notes2
    else if (noteCount < 9)
    {
        notes2[noteCount - 5] = new StaveNote({keys: [`${e}`], duration: notes2[noteCount - 5].duration});
    }
    //notes3
    else if (noteCount < 14)
    {
        notes3[noteCount - 9] = new StaveNote({keys: [`${e}`], duration: notes3[noteCount - 9].duration});
    }
    //notes4
    else
    {
        notes4[noteCount - 14] = new StaveNote({keys: [`${e}`], duration: notes4[noteCount - 14].duration});
    }
    noteCount++;
    if(noteCount > 14)
    {
        noteCount = 1;
    }
    setupStaff();
}

const clear = () => 
{
    noteCount = 1;
    notes1 = [
        new StaveNote({keys: [`c/5`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"8"}),
        new StaveNote({keys: [`e/4`], duration:"8"})
    ];
    notes2 = [
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
    ];
    notes3 = [
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"q"}),
        new StaveNote({keys: [`e/4`], duration:"8"}),
        new StaveNote({keys: [`e/4`], duration:"8"})
    ];
    notes4 = [
        new StaveNote({keys: [`e/4`], duration:"w"}),
    ];
}

const onLoad = () => 
{
    clear();

    console.log("Loading");
    //UI setup
    document.getElementById("e4").onclick = () => {sendNote("e/4")};
    document.getElementById("g4").onclick = () => {sendNote("g/4")};
    document.getElementById("b4").onclick = () => {sendNote("b/4")};
    document.getElementById("d5").onclick = () => {sendNote("d/5")};
    document.getElementById("f5").onclick = () => {sendNote("f/5")};
    document.getElementById("f4").onclick = () => {sendNote("f/4")};
    document.getElementById("a4").onclick = () => {sendNote("a/4")};
    document.getElementById("c5").onclick = () => {sendNote("c/5")};
    document.getElementById("e5").onclick = () => {sendNote("e/5")};
    document.getElementById("play").onclick = () => {play()};
    document.getElementById("clear").onclick = () => {onLoad()};
    document.getElementById("metaSubmit").onclick = () => {sendAnswer(document.getElementById("metaFinal").value);};
    results = document.getElementById("results");
    setupStaff();
}

const setupStaff = () =>
{
    div.innerHTML = "";
    console.log(notes1.map(x=>x.keys));
    renderer = new Renderer(div, Renderer.Backends.SVG);
    let width = document.getElementById("staff").offsetWidth;
    // Configure the rendering context.
    renderer.resize(width, 150);
    context = renderer.getContext();

    beam1 = new Beam([notes1[3],notes1[4]]);
    beam2 = new Beam([notes3[3],notes3[4]]);

    // Create a stave of width 400 at position 10, 40 on the canvas.
    stave1 = new Stave(10, 40, width/4);
    stave2 = new Stave(stave1.width + 10, 40, width/4);
    stave3 = new Stave(stave2.width + stave1.width + 10, 40, width/4);
    stave4 = new Stave(stave3.width + stave2.width + stave1.width + 10, 40, 100);

    // Add a clef and time signature.
    stave1.addClef("treble").addTimeSignature("4/4");

    // Connect it to the rendering context and draw!
    stave1.setContext(context).draw();
    Formatter.FormatAndDraw(context, stave1, notes1);
    stave2.setContext(context).draw();
    Formatter.FormatAndDraw(context, stave2, notes2);
    stave3.setContext(context).draw();
    Formatter.FormatAndDraw(context, stave3, notes3);
    stave4.setContext(context).draw();
    Formatter.FormatAndDraw(context, stave4, notes4);

    beam1.setContext(context).draw();
    beam2.setContext(context).draw();
}

const play = () =>
{
    let delay = Tone.now();
    let lastNote = "";
    notes1.forEach((i) => {
        let time = "";
        switch(i.duration)
        {
            case "8":
                time = "8n";
                lastNote = Tone.Time("8n");
                break;
            case "q":
                time = "4n";
                lastNote = Tone.Time("4n");
                break;
            case "w":
                time = "1n";
                lastNote = Tone.Time("1n");
                break;
        }
        let note = `${i.keyProps[0].key}${i.keyProps[0].octave}`;
        synth.triggerAttackRelease(note, time, delay);
        delay += lastNote;
    });
    notes2.forEach((i) => {
        let time = "";
        switch(i.duration)
        {
            case "8":
                time = "8n";
                lastNote = Tone.Time("8n");
                break;
            case "q":
                time = "4n";
                lastNote = Tone.Time("4n");
                break;
            case "w":
                time = "1n";
                lastNote = Tone.Time("1n");
                break;
        }
        let note = `${i.keyProps[0].key}${i.keyProps[0].octave}`;
        synth.triggerAttackRelease(note, time, delay);
        delay += lastNote;
    });
    notes3.forEach((i) => {
        let time = "";
        switch(i.duration)
        {
            case "8":
                time = "8n";
                lastNote = Tone.Time("8n");
                break;
            case "q":
                time = "4n";
                lastNote = Tone.Time("4n");
                break;
            case "w":
                time = "1n";
                lastNote = Tone.Time("1n");
                break;
        }
        let note = `${i.keyProps[0].key}${i.keyProps[0].octave}`;
        synth.triggerAttackRelease(note, time, delay);
        delay += lastNote;
    });
    notes4.forEach((i) => {
        let time = "";
        switch(i.duration)
        {
            case "8":
                time = "8n";
                lastNote = Tone.Time("8n");
                break;
            case "q":
                time = "4n";
                lastNote = Tone.Time("4n");
                break;
            case "w":
                time = "1n";
                lastNote = Tone.Time("1n");
                break;
        }
        let note = `${i.keyProps[0].key}${i.keyProps[0].octave}`;
        synth.triggerAttackRelease(note, time, delay);
        delay += lastNote;
    });
}

onLoad();

const METAURL = "https://us-east-1.aws.data.mongodb-api.com/app/data-adqvx/endpoint/meta";

const answerLoaded = (e) =>
{
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    //8 if no response print and return
    console.log(obj);
    if(obj.length != 0)
    {
        results.innerHTML = "Correct!";
    }
    else
    {
        results.innerHTML = "Incorrect, please try again, and remember to use the full name of the song.";
    }
}

const sendAnswer = (val) =>
{
    let xhr = new XMLHttpRequest();
    //2 set onload handler
    xhr.onload = answerLoaded;
    //3 set onerror handler
    xhr.onerror = () => {console.log(`An error occurred`);};
    //4 get open and sent request
    results.innerHTML = "Checking answer..."
    console.log("Sending put request");
    document.getElementById("past").innerHTML += `<br><br>${val}`;
    xhr.open(`PUT`, `${METAURL}`);
    xhr.send(val);

}