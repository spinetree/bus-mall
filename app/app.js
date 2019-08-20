/* eslint-disable no-unused-vars */

var images = ['assets/bag.jpg', 'assets/banana.jpg', 'assets/bathroom.jpg', 'assets/boots.jpg', 'assets/breakfast.jpg', 'assets/bubblegum.jpg', 'assets/chair.jpg', 'assets/cthulhu.jpg', 'assets/dog-duck.jpg', 'assets/dragon.jpg', 'assets/pen.jpg', 'assets/pet-sweep.jpg', 'assets/scissors.jpg', 'assets/shark.jpg', 'assets/sweep.png', 'assets/tauntaun.jpg', 'assets/unicorn.jpg', 'assets/usb.gif', 'assets/water-can.jpg', 'assets/wine-glass.jpg'];
var lastSeen = [];
var votes = 0;
var productList = [];


function loadProducts() {
  for (var i = 0; i < images.length; i++) {
    var productTemp = new Product(images[i]);
  }
  console.log('created Products: ' + productList.length);
}


function Product(url) {
  this.name = url, //replace this later with a regexp that cleans out everything not between / and .
  this.url = url,
  this.appearances = 0,
  this.votes = 0,
  this.hitRate = 0,
  this.id = productList.length;
  productList.push(this);
}

// a constructor function
// -----------------------
// that turns each image from the list into an object with
// title
// ID (we need a unique id to use when checking an image against the already-done list)
// with a number for total appearances
// with a number for times it got choesn
// and a hit %

Product.prototype = {

  madeAppearance: function() {
    this.appearances++;
    lastSeen.push(this.id);
    // console.log('made appearance');
  },
  gotVote: function() {
    this.votes++;
    // console.log('gotvote');
  },
  calcHitRate: function() {
    this.hitRate = this.votes / this.appearances;
    // console.log('my hit rate:' + this.hitRate);
  }
};


// prototype
// -----------------------
// let each product alter its stats when a vote happens
// product.won() = ++ my hit total
// recalc my hit %
// product.lost() = ++ my appearances total
// recalc my hit %
// and add itself(its index? yes) to the list of images we just saw ()

var getCandidate = function() {
  var candidateIndex = Math.floor((Math.random() * productList.length));
  console.log('getCandidate' + candidateIndex);
  return productList[candidateIndex];
};


// render the test mechanism
// -----------------------

// while candidate images < 3
// choose a random image
// check that random image against the list of just-shown ones
// if it's on the list, run this function again
// check if it's on the candidate list already
// if it's on the list, run this function again
// else
// add to the list of candidate images

// if the list of candidate images = 3
// loop through the candidate images
// ++ its total appearances
// create a figure and radio button for each
// append those to the dom


// event listener - user clicks a thing
// -----------------------
// when I click on a figure
// ++ that ones's total votes
// increase my vote number ++
// if it's 25
// render the results list
// else
// wipe out the list of last round
// add everyone to the list of last round
// re-render the test mechanism


// render a results list
// -----------------------
// crawl each object and get its url, name, total clicks and total votes
// get #results-list

// for each object create a li containing name etc. and a decimal of its hit %
// push them shits into an array
// use .sort on that array

// fill #results-list with the sorted array
