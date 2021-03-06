// using our own forEach(), map(), reduce(), and filter()
// functions written in js-functions-functional-practice-1
function forEach(array, callback) {
    // YOUR CODE HERE
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}
function reduce(array, callback) {
    // YOUR CODE HERE
  var accumulator;
  forEach(array, function(value, i, ogArray){
    if (i===0) {
      accumulator = value;
    } else {
      accumulator = callback(accumulator, value);
    }
  });
  return accumulator;
}
function map(array, callback) {
    // YOUR CODE HERE
    var mappedArray = [];
    forEach(array, function(value, i, ogArray) {
      mappedArray.push(callback(value, i, ogArray));
    });

    return mappedArray;
}
function filter(array, callback) {
    // YOUR CODE HERE
  var filteredArray = [];
  reduce(array, function (a, value, i, ogArray) {
    var resultOfCallback = callback(value, i, ogArray);
    if (resultOfCallback) {
      filteredArray.push(value);
    };
  });
  return filteredArray;
}
// -----------
// Write a function pluck() that extracts a list of
// values associated with property names.
// -----------
// var winners = [
//   {team: 'cubs', year: 2016},
//   {team: 'royals', year: 2015},
//   {team: 'giants', year: 2014},
//   {team: 'red sox', year: 2013},
//   {team: 'giants', year: 2012}
//   ]
function pluck(list, propertyName) {
    // YOUR CODE HERE
    return list.map(function(v,i) {
        return v[propertyName];
      });
var changedList = pluck(list, propertyName);
console.log(changedList);
}

// tests
// ---
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
console.assert(pluck(stooges, 'name')[0] === 'moe')
console.assert(pluck(stooges, 'age')[2] === 60)

// // -----------
// // Write a function reject() that does the opposite of filter,
// // if the callback function returns a "truthy" value then that
// // item is **not** inserted into the new collection,
// // otherwise it is.
// // -----------
function reject(list, predicate) {
    // YOUR CODE HERE
  var rejectList = [];
  reduce(list, function (a, value, i, ogArray) {
    var resultOfPredicate = predicate(value, i, ogArray);
    if (resultOfPredicate === false) {
      rejectList.push(value);
    };
  });
  return rejectList;
  // return rejectList = list.filter(function(value){
  //   return !predicate(value);
  // });
}

// tests
// ---
var lt10 = [0,1,2,3,4,5,6,7,8,9,10]
var odds = reject(lt10, function(n){ return n%2 === 0 })
console.log(odds);
console.assert(odds[0] === 1)
console.assert(odds[1] === 3)
console.assert(odds[4] === 9)
//
// // -----------
// // Write a function find() that returns the very first item
// // in a collection when the callback function returns true;
// // otherwise returns undefined.
// // -----------
function find(list, predicate) {
  return list.reduce(function(a, value){
    var resultOfPredicate = predicate(value)
    if (typeof a !== 'undefined') {
      return a;
    } else if (resultOfPredicate){
      return value;
    } else {
      return a;
    }
  }, undefined);
}

var people = [
    {name: "Sam", teaches: "JS"},
    {name: "Matt", teaches: "JS"},
    {name: "Jwo", teaches: "Ruby"},
    {name: "Dorton", teaches: "life"}
]
var JS = find(people, function(n){ return n.teaches === "JS" })
console.assert(JS.name === "Sam")

// // -----------
// // Write a function where() that filters for all the values
// // in the properties object.
// // -----------
function where(list, properties) {
    // YOUR CODE HERE
  return list.filter(function(value){
    var itemsPassed = true;
    for (key in properties) {
      if (properties.hasOwnProperty(key)) {
        if (value[key] !== properties[key]) {
          itemsPassed = false;
        };
      };
    };
    return itemsPassed;
  });
}

// tests
// ---
var plays = [
    {title: "Cymbeline", author: "Shakespeare", year: 1623},
    {title: "The Tempest", author: "Shakespeare", year: 1623},
    {title: "Hamlet", author: "Shakespeare", year: 1603},
    {title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600},
    {title: "Macbeth", author: "Shakespeare", year: 1620},
    {title: "Death of a Salesman", author: "Arthur Miller", year: 1949},
    {title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949}
]

//return an array of all 5 Shakespeare plays with Cymbeline is listed first
var sh8spr = where(plays, {author: "Shakespeare"})
console.log(sh8spr);
console.assert(sh8spr instanceof Array)
console.assert(sh8spr.length === 5)
console.assert(sh8spr[0].title === "Cymbeline")

//return array of Shakespeare plays written in 1611 (should be 0)
sh8spr = where(plays, {author: "Shakespeare", year: 1611})
console.log(sh8spr);
console.assert(sh8spr.length === 0)

//return array of Shakespeare plays written in 1623 (should be 2)
sh8spr = where(plays, {author: "Shakespeare", year: 1623})
console.log(sh8spr);
console.assert(sh8spr.length === 2)

//return an array of plays written in 1949 (should be 2)
var midcentury = where(plays, {year: 1949})
console.log(midcentury);
console.assert(midcentury.length === 2)
