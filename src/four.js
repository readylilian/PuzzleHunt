import {sendAnswer} from '../src/check.js';

const setupUI = () =>
{
    document.getElementById("1").onclick = () => {currentSlide(1);};
    document.getElementById("2").onclick = () => {currentSlide(2);};
    document.getElementById("3").onclick = () => {currentSlide(3);};
    document.getElementById("4").onclick = () => {currentSlide(4);};
    document.getElementById("5").onclick = () => {currentSlide(5);};
    
    document.getElementById("next").onclick = () => {plusSlides(1);};
    document.getElementById("prev").onclick = () => {plusSlides(-1);};
    document.getElementById("submit").onclick = () => {
        sendAnswer(document.getElementById("final").value, 
        `one`);};

    showSlides(slideIndex);
}

let slideIndex = 1;

// Next/previous controls
const plusSlides = (n) => {
    console.log("next/prev");
  showSlides(slideIndex += n);
}

// Thumbnail image controls
const currentSlide = (n) => {
    console.log("set current slide");
  showSlides(slideIndex = n);
}

const showSlides = (n) => {
    console.log("show slides");
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 

setupUI();