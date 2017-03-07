var pic = document.getElementById("vimage");
var clr = document.getElementById("clear");
var xpn = document.getElementById("grow");
var cse = document.getElementById("cease");

var lastX = -1;
var lastY;

var intervalID;

var shape = function(event) {
  var c = document.createElementNS("http://www.w3.org/2000/svg",
 "circle");
  c.setAttribute( "cx", event.clientX );
  c.setAttribute( "cy", event.clientY );
  c.setAttribute( "r", "50" );
  c.setAttribute( "fill", "red");
  c.setAttribute( "stroke", "black" );
  pic.appendChild( c );
  line(event);
};

var line = function(event) {
  if (lastX < 0){
    lastX = event.clientX;
    lastY = event.clientY;
  }
  else{
    drawline(lastX, lastY, event);
    lastX = event.clientX;
    lastY = event.clientY;
  }
};

var drawline = function( x, y, event ) {
  var c = document.createElementNS("http://www.w3.org/2000/svg",
 "line");
  c.setAttribute( "x1", x );
  c.setAttribute( "y1", y );
  c.setAttribute( "x2", event.clientX );
  c.setAttribute( "y2", event.clientY );
  c.setAttribute( "stroke", "black" );
  pic.appendChild( c );
};

var clear = function() {
  stop();
  while(pic.childNodes.length > 0)
    pic.removeChild(pic.childNodes[0]);
  lastX = -1;
};

var stop = function() {
  window.clearInterval(intervalID);
};

var resize = function(){
  var rad = 50;
  var growth = true;
  var thing = function(){
    while(pic.childNodes.length > 0)
      pic.removeChild(pic.childNodes[0]);
    var c = document.createElementNS("http://www.w3.org/2000/svg",
   "circle");
    c.setAttribute( "cx", 250 );
    c.setAttribute( "cy", 250 );
    c.setAttribute( "r", rad );
    c.setAttribute( "fill", "red");
    c.setAttribute( "stroke", "black" );
    pic.appendChild( c );
    if (rad == 250) growth = false;
    else if (rad == 50) growth = true;
    if (growth) rad++;
    else rad--;
  };
  intervalID = window.setInterval( thing, 16 );
};

cse.addEventListener("mousedown", stop);
clr.addEventListener("mousedown", clear);
pic.addEventListener("mousedown", shape);
xpn.addEventListener("mousedown", clear);
xpn.addEventListener("mousedown", resize);

//html tags
//<circle cx="250" cy="250" r="75" fill="yellow"
//stroke="black"/>
//   <rect x="100" y="100" width="300" height="75"
//fill="blue"/>
