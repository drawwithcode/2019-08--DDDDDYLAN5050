var myMap;
var canvas;
var mappa = new Mappa("Leaflet");
var poliLat = 45.5069578;
var poliLon = 9.1639516;
var currentLat, currentLon;
var currentPosition;
var distance;
var options = {
  lat: poliLat,
  lng: poliLon,
  zoom: 15,
  style:"http://tile.stamen.com/toner/{z}/{x}/{y}.png"
};

function preload() {
  currentPosition = getCurrentPosition();
}

function setup() {
  console.log(currentPosition);
  currentLat = currentPosition.latitude;
  currentLon = currentPosition.longitude;
  distance = calcGeoDistance(currentLat, currentLon, poliLat, poliLon, "km");
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  colorMode(HSB);
}

function draw() {
  clear();
  var polimi = myMap.latLngToPixel(poliLat, poliLon);
  var yourLocation = myMap.latLngToPixel(currentLat,currentLon);
  strokeWeight(5);
  stroke(frameCount*3%360,50,80);
  textSize(30);
  textStyle(BOLD);
  textFont('Helvetica');
  textAlign(CENTER);
  line(yourLocation.x,yourLocation.y,polimi.x, polimi.y);
  fill('black');
  text('The distance between you and B10 = '+int(1000*distance)+'m',width/2,60);
  text(int(distance*1000)/1000 +'km',(yourLocation.x+polimi.x)/2,(yourLocation.y+polimi.y)/2);
  ellipse(yourLocation.x,yourLocation.y,10);
  ellipse(polimi.x, polimi.y, 10);
}
