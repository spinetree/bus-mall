// a list of images that we've got in a folder
// a list of the images we just saw
// a variable for the number of times we've voted


// load images from the list into constructor


// a constructor function
// -----------------------
// that turns each image from the list into an object with
// title
// ID (we need a unique id to use when checking an image against the already-done list)
// with a number for total appearances
// with a number for times it got choesn
// and a hit %


// prototype
// -----------------------
// let each product alter its stats when a vote happens
// product.won() = ++ my hit total
// recalc my hit %
// product.lost() = ++ my appearances total
// recalc my hit %
// and add itself(its index? yes) to the list of images we just saw ()


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

// loop through the candidate images
// create a figure for each
// append those to the dom


// event listener - user clicks a thing
// -----------------------
// when I click on a figure
// ++ that ones's total votes
// ++ everyone's total appearances
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


