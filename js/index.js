'use strict'

//Declaring global variables such as the handles used to clear the intervals, an audio sound that I want to play when the timer finishes, and the "tick" variables that is incremented when the setInterval functions are called. 
let handle;
let breakHandle;
var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3');
let currTime = 0;
let currBreak = 0;

//Lowers timer time
$("#minusTimerTime").click(function(){
  let timerTime = document.getElementById("timerTime");
  let num = parseInt(timerTime.textContent, 10);
  if(num > 1) {
      document.getElementById("timerTime").innerHTML = num - 1;
  }
});
  
$("#plusTimerTime").click(function(){
  let timerTime = document.getElementById("timerTime");
  let num = parseInt(timerTime.textContent, 10);
  document.getElementById("timerTime").innerHTML = num + 1;
});

$("#minusBreakTime").click(function(){
  let breakTime = document.getElementById("breakTime");
  let num = parseInt(breakTime.textContent, 10);
  if(num > 1) {
      document.getElementById("breakTime").innerHTML = num - 1;
  }
});
  
$("#plusBreakTime").click(function(){
  let breakTime = document.getElementById("breakTime");
  let num = parseInt(breakTime.textContent, 10);
  document.getElementById("breakTime").innerHTML = num + 1;
});

function startTimer(){
  if(handle){clearInterval(handle)};
  if(breakHandle){clearInterval(breakHandle)};
  currTime = 0;
  currBreak = 0;
  document.getElementById("progress").style.width = "0%";
  document.getElementById("breakProgress").style.width = "0%";
  let myTime = parseInt(document.getElementById("timerTime").textContent);
  let myBreak = parseInt(document.getElementById("breakTime").textContent);
  handle = setInterval(function(){timerTick(myTime, myBreak)}, 1000);
}



function timerTick(myTime, myBreak){
  let width;
  if(currTime < myTime*60) {
    currTime++;
    width = currTime/(myTime*60) * 100 + "%";
    console.log("Tick! "+ Math.round(parseInt(width)));
    document.getElementById("progress").style.width = width;
  } else {
      clearInterval(handle);
      audio.play();
      startBreak(myBreak);
  }
 }


function stopTimer(){
  clearInterval(handle);
  clearInterval(breakHandle);
  document.getElementById("breakProgress").style.width = "0%";
  document.getElementById("progress").style.width = "0%";
}

function startBreak(myBreak){
  console.log(myBreak*60 + " seconds breaktime!");
  breakHandle = setInterval(function(){breakTick(myBreak)}, 1000);
}

function breakTick(myBreak){
  if(currBreak < myBreak*60){
    currBreak++;
    let width = currBreak/(myBreak*60) * 100 + "%";
    console.log("Break Tick! "+ Math.round(parseInt(width)));
    document.getElementById("breakProgress").style.width = width;
  } else {
    startTimer();
  }
}