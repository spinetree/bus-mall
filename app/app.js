/* eslint-disable no-unused-vars */

function loadProducts() {
  new Product('bag', 'assets/bag.jpg');
  new Product('banana', 'assets/banana.jpg');
  new Product('bathroom', 'assets/bathroom.jpg');
  new Product('boots', 'assets/boots.jpg');
  new Product('breakfast', 'assets/breakfast.jpg');
  new Product('bubblegum', 'assets/bubblegum.jpg');
  new Product('chair', 'assets/chair.jpg');
  new Product('cthulhu', 'assets/cthulhu.jpg');
  new Product('dogduck', 'assets/dog-duck.jpg');
  new Product('dragon', 'assets/dragon.jpg');
  new Product('pen', 'assets/pen.jpg');
  new Product('petsweep', 'assets/pet-sweep.jpg');
  new Product('scissors', 'assets/scissors.jpg');
  new Product('shark', 'assets/shark.jpg');
  new Product('sweep', 'assets/sweep.png');
  new Product('tauntaun', 'assets/tauntaun.jpg');
  new Product('unicorn', 'assets/unicorn.jpg');
  new Product('usb', 'assets/usb.gif');
  new Product('watercan', 'assets/water-can.jpg');
  new Product('wineglass', 'assets/wine-glass.jpg');
}

var lastSeen = [];
var votes = 0;
var productList = [];
var testCandidates = [];
var testContainer = document.getElementById('test-container');
var testButtons;
var results = {};

function Product(title, url) {
  this.title = title,
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
    choice.setAttribute('style',`background-image:url('${productList[candidateId].url}')`);
    var caption = document.createElement('figcaption');
    caption.textContent = productList[candidateId].title;
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
  for (var i = 0; i < productList.length; i++) {
    var productTitle = productList[i].title;
    var productHitRate = productList[i].hitRate;
    var singleResult = document.createElement('li');
    singleResult.textContent = `${productTitle}: ${productHitRate}%`;
    resultsContainer.appendChild(singleResult);
  }
}
