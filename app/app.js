/* eslint-disable no-unused-vars */

var images = ['assets/bag.jpg', 'assets/banana.jpg', 'assets/bathroom.jpg', 'assets/boots.jpg', 'assets/breakfast.jpg', 'assets/bubblegum.jpg', 'assets/chair.jpg', 'assets/cthulhu.jpg', 'assets/dog-duck.jpg', 'assets/dragon.jpg', 'assets/pen.jpg', 'assets/pet-sweep.jpg', 'assets/scissors.jpg', 'assets/shark.jpg', 'assets/sweep.png', 'assets/tauntaun.jpg', 'assets/unicorn.jpg', 'assets/usb.gif', 'assets/water-can.jpg', 'assets/wine-glass.jpg'];
var lastSeen = [];
var votes = 0;
var productList = [];
var testCandidates = [];
var testContainer = document.getElementById('test-container');
var testButtons;
var results = {};

function loadProducts() {
  for (var i = 0; i < images.length; i++) {
    var productTemp = new Product(images[i]);
  }
}

function Product(url) {
  this.name = url, //replace this later with a regexp that cleans out everything not between / and or just add titles which is more scalable.
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
    this.hitRate = Math.floor(this.hitRate * 100);
  }
};


var getCandidateIndex = function () {
  var candidateIndex = Math.floor((Math.random() * productList.length));
  return candidateIndex;
};

var getCandidates = function () {
  while (testCandidates.length < 3) {
    var candidate = getCandidateIndex();
    if (!testCandidates.includes(candidate) && !lastSeen.includes(candidate)) {
      testCandidates.push(candidate);
    } else {
      getCandidates();
    }
  }
  if (testCandidates.length === 3) {
    return testCandidates;
  }
};

var renderTest = function () {
  for (var i = 0; i < testCandidates.length; i++) {
    var choice = document.createElement('figure');
    var candidateId = testCandidates[i];
    choice.setAttribute('data-id', candidateId);
    var caption = document.createElement('figcaption');
    caption.textContent = productList[candidateId].name;
    choice.appendChild(caption);
    testContainer.appendChild(choice);
    productList[candidateId].madeAppearance();
    lastSeen.push(candidateId);
  }
  testButtons = testContainer.getElementsByTagName('figure');
};

var countVote = function (winner) {
  var winnerId = winner.target.getAttribute('data-id');
  productList[winnerId].gotVote();
  testContainer.textContent = '';
  lastSeen = testCandidates;
  testCandidates = [];
  getCandidates();
  renderTest();
  votes++;
  if (votes === 25) {
    console.log('rendering results');
    disableVoting();
    getHitRates();
    renderResults();
  } else {
    updateVoteTally();
  }
};

function addEventListeners() {
  for (var i = 0; i < testButtons.length; i++) {
    testContainer.addEventListener('click', countVote);
    // TODO: needs conditional so only does a thing if it's coming from a figure.
  }
}

// pre-voting things:

loadProducts();
getCandidates();
renderTest();
addEventListeners();


// post-voting things:

function updateVoteTally() {
  var voteTally = document.getElementById('vote-tally');
  voteTally.textContent = votes;
  // update this with actual results
}


function disableVoting() {
  console.log('disabling voting');
  testContainer.removeEventListener('click', countVote);
}


function getHitRates() {
  for (var i = 0; i < productList.length; i++) {
    productList[i].calcHitRate();
    var candidateId = productList[i].id;
    var candidateHitRate = productList[i].hitRate;
    results[candidateId] = candidateHitRate;
  }
}


function renderResults() {
  console.log('attempting to render results');
  var resultsContainer = document.getElementById('results-list');
  resultsContainer.textContent = '';
  for (var i=0; i< productList.length; i++) {
    var productName = productList[i].name;
    var productHitRate = productList[i].hitRate;
    var singleResult = document.createElement('li');
    singleResult.textContent = `${productName}: ${productHitRate}%`;
    resultsContainer.appendChild(singleResult);
  }
}

