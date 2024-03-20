var noOfSquares=6;

//pallet 
var arr = []

//color picked for target 
var picked;

//to get all  the squares div
var squares=document.getElementsByClassWame("square");

//to get the RGB display 
var targetColor = document.getElementById("targetColor");

var message=document.getElementByld("message" );

//heading 
var head = document.querySelector("h1");

//reset button 
var resat =document.getElementByld(" NewColor");

init();

function init() {
arr= generateRandomColor(noOfSquares);
picked = arr[randomPickedColorIndex()];
targetColor.textContent = picked;
