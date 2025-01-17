// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray = []) {
  return [...new Set(moviesArray.map((m) => m.director))];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray = []) {
  return moviesArray
    .filter((m) => m.genre.includes('Drama'))
    .filter((m) => m.director.includes('Spielberg')).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray = []) {
  if (moviesArray.length === 0) {
    return 0;
  }

  return round(
    moviesArray
      .filter((m) => m.score)
      .reduce((acc, curr) => acc + curr.score, 0) / moviesArray.length,
    2
  );
}

/**
 * Round half away from zero ('commercial' rounding)
 * Uses correction to offset floating-point inaccuracies.
 * Works symmetrically for positive and negative numbers.
 */
function round(num, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  var n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray = []) {
  return scoresAverage(moviesArray.filter((m) => m.genre.includes('Drama')));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray = []) {
  return [...moviesArray].sort(
    (a, b) => compareByYear(a, b) | compareByTitle(a, b)
  );
}

function compareByYear(a, b) {
  return a.year - b.year;
}

function compareByTitle(a, b) {
  return a.title?.localeCompare(b.title);
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray = []) {
  return [...moviesArray]
    .sort((a, b) => compareByTitle(a, b))
    .map((m) => m.title)
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray = []) {
  return [
    ...moviesArray.map((m) => {
      return { ...m, duration: toMinutes(m.duration) };
    })
  ];
}

function toMinutes(time) {
  const hoursRegexp = /(\d+h)/g;
  const minsRegexp = /(\d+min)/g;

  const containTimeInHours = time.match(hoursRegexp);
  const containTimeInMinutes = time.match(minsRegexp);

  let hoursToMinutes = containTimeInHours
    ? parseInt(time.match(hoursRegexp)[0].trim().replaceAll('h', '')) * 60
    : 0;
  let minutes = containTimeInMinutes
    ? parseInt(time.match(minsRegexp)[0].trim().replaceAll('min', ''))
    : 0;
  return hoursToMinutes + minutes;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray = []) {
  if (!moviesArray || moviesArray.length === 0) {
    return null;
  }
  let averagesPerYear = averageScoresPerYear(mapYearToScores(moviesArray));
  const besYear = findMax(averagesPerYear);
  return `The best year was ${besYear.year} with an average score of ${besYear.score}`;
}

function findMax(averagesPerYear) {
  let max = {
    year: '',
    score: ''
  };
  Object.keys(averagesPerYear).forEach((year) => {
    if (averagesPerYear[year] > max.score) {
      max = {
        year: year,
        score: averagesPerYear[year]
      };
    }
  });
  return max;
}

function averageScoresPerYear(input) {
  let averagePerYear = {};
  Object.keys(input).forEach(
    (year) =>
      (averagePerYear[year] =
        input[year].reduce((acc, a) => acc + a, 0) / input[year].length)
  );
  return averagePerYear;
}

function mapYearToScores(moviesArray) {
  const yearMap = {};
  moviesArray.forEach(
    (movie) =>
      (yearMap[movie.year] = yearMap[movie.year]
        ? [...yearMap[movie.year], movie.score]
        : [movie.score])
  );
  return yearMap;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
