const movies = require('../src/data');
const { getAllDirectors } = require('../src/movies');

// Iteration 1
describe('All Directors', () => {
  test('should be implemented by a function called getAllDirectors()', () => {
    expect(typeof getAllDirectors).toBe('function');
  });

  test('should return an array', () => {
    expect(Array.isArray(getAllDirectors())).toBe(true);
  });

  test('should not modify the input array', () => {
    const result = getAllDirectors(movies);
    movies.pop(1);
    expect(result).not.toBe(movies);
  });

  test('should return an array with the director when parameter is an array of only one movie', () => {
    expect(
      getAllDirectors([
        {
          anotherProperty: 'this is not the director',
          director: 'the actual director'
        }
      ])
    ).toStrictEqual(['the actual director']);
  });

  test('should return an array with the directors when paramter is array of several movies ', () => {
    expect(
      getAllDirectors([
        {
          anotherProperty: 'UninterestedMovieProperty1',
          director: 'director1'
        },
        {
          anotherProperty: 'UninterestedMovieProperty2',
          director: 'director2'
        },
        {
          anotherProperty: 'UninterestedMovieProperty3',
          director: 'director3'
        }
      ])
    ).toStrictEqual(['director1', 'director2', 'director3']);
  });

  test('should return the same number of directors as received movies ', () => {
    expect(
      getAllDirectors([
        {
          anotherProperty: 'UninterestedMovieProperty1',
          director: 'director1'
        },
        {
          anotherProperty: 'UninterestedMovieProperty2',
          director: 'director2'
        },
        {
          anotherProperty: 'UninterestedMovieProperty3',
          director: 'director3'
        }
      ]).length
    ).toBe(3);
  });
});

describe('All Directors (bonus part)', () => {
  test('should not return duplicate directors when directors directed many movies', () => {
    expect(
      getAllDirectors([
        {
          anotherProperty: 'UninterestedMovieProperty1',
          director: 'director1'
        },
        {
          anotherProperty: 'UninterestedMovieProperty2',
          director: 'director2'
        },
        {
          anotherProperty: 'UninterestedMovieProperty3',
          director: 'director1'
        },
        {
          anotherProperty: 'UninterestedMovieProperty4',
          director: 'director1'
        },
        {
          anotherProperty: 'UninterestedMovieProperty5',
          director: 'director1'
        }
      ])
    ).toStrictEqual(['director1', 'director2']);
  });

  test('should not return duplicate directors when all directors directed only one movie', () => {
    expect(
      getAllDirectors([
        {
          anotherProperty: 'UninterestedMovieProperty1',
          director: 'director1'
        },
        {
          anotherProperty: 'UninterestedMovieProperty2',
          director: 'director2'
        },
        {
          anotherProperty: 'UninterestedMovieProperty3',
          director: 'director3'
        }
      ])
    ).toStrictEqual(['director1', 'director2', 'director3']);
  });
});
