const movies = require('../src/data');
const { orderAlphabetically } = require('../src/movies');

describe('Iteration 6: Alphabetic order', () => {
  test('should be implemented by a function named orderAlphabetically()', () => {
    expect(typeof orderAlphabetically).toBe('function');
  });

  test('should return an array', () => {
    expect(Array.isArray(orderAlphabetically())).toBe(true);
  });

  test('should return an empty array if an empty array is passed as parameter', () => {
    expect(orderAlphabetically([])).toStrictEqual([]);
  });

  test('should return an array with the same length when there is only one movie in the array', () => {
    const input = [
      {
        title: 'Saving Private Ryan',
        year: 1998,
        director: 'Steven Spielberg',
        duration: '2h 49min',
        genre: ['Drama', 'War'],
        score: 8.6
      }
    ];
    expect(orderAlphabetically(input).length).toBe(1);
  });

  test('should return the first title "Once Upon a Time Ameria" when input movies array is "Saving Private Ryan", and " Once Upon a Time America" ', () => {
    const input = [
      {
        title: 'Saving Private Ryan',
        year: 1998,
        director: 'Steven Spielberg',
        duration: '2h 49min',
        genre: ['Drama', 'War'],
        score: 8.6
      },
      {
        title: 'Once Upon a Time in America',
        year: 1984,
        director: 'Sergio Leone',
        duration: '3h 49min',
        genre: ['Crime', 'Drama'],
        score: 8.4
      }
    ];
    expect(orderAlphabetically(input).length).toBe(2);
    expect(orderAlphabetically(input)[0]).toBe("Once Upon a Time in America");
    expect(orderAlphabetically(input)[1]).toBe("Saving Private Ryan");
  });
});
