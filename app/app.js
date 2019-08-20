/* eslint-disable no-unused-vars */

var images = ['assets/bag.jpg', 'assets/banana.jpg', 'assets/bathroom.jpg', 'assets/boots.jpg', 'assets/breakfast.jpg', 'assets/bubblegum.jpg', 'assets/chair.jpg', 'assets/cthulhu.jpg', 'assets/dog-duck.jpg', 'assets/dragon.jpg', 'assets/pen.jpg', 'assets/pet-sweep.jpg', 'assets/scissors.jpg', 'assets/shark.jpg', 'assets/sweep.png', 'assets/tauntaun.jpg', 'assets/unicorn.jpg', 'assets/usb.gif', 'assets/water-can.jpg', 'assets/wine-glass.jpg'];
var lastSeen = [];
var votes = 0;
var productList = [];
var testCandidates = [];
var testContainer = document.getElementById('test-container');
var testButtons;

function loadProducts() {
  for (var i = 0; i < images.length; i++) {
    var productTemp = new Product(images[i]);
  }
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


Product.prototype = {

  madeAppearance: function () {
    this.appearances++;
    lastSeen.push(this.id);
  },
  gotVote: function () {
    this.votes++;
  },
  calcHitRate: function () {
    this.hitRate = this.votes / this.appearances;
  }
};


var getCandidateIndex = function () {
  var candidateIndex = Math.floor((Math.random() * productList.length));
  return candidateIndex;
};


var getCandidates = function () {
  while (testCandidates.length < 3) {
    var candidate = getCandidateIndex();
    if (testCandidates.includes(candidate)) {
      console.log('already in testCandidates!');
      getCandidates();
    }
    if (lastSeen.includes(candidate)) {
      console.log('already in testCandidates!');
      getCandidates();
    }
    else {
      testCandidates.push(candidate);
      if (testCandidates.length === 3) {
        console.log('candidates found: ' + testCandidates.join(', '));
      }
    }
  }
};

// add in the bit where everyone who appeared on teh page gets madeAppearance() called

var renderTest = function() {
  // testContainer.textContent = '';
  for (var i = 0; i < testCandidates.length; i++) {
    var choice = document.createElement('figure');
    var candidateId = testCandidates[i];
    choice.setAttribute('data-id', candidateId);
    var caption = document.createElement('figcaption');
    caption.textContent = productList[i].name;
    choice.appendChild(caption);
    testContainer.appendChild(choice);
  }
  testButtons = testContainer.getElementsByTagName('figure');
};

var countVote = function(winner) {
  var winner = winner.target.getAttribute('data-id');
  console.log(winner);
};

function addEventListeners() {
  for (var i = 0; i < testButtons.length;i++) {
    document.addEventListener('click', countVote);
    console.log('attached');
  }
}

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

loadProducts();
getCandidates();
renderTest();
addEventListeners();
