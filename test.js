const swaggerFixture = require('./index');
const swagger = require('./swagger.json');

describe('when swagger doc is empty', () => {
  const fixture = swaggerFixture();

  test('should return an empty json object', async done => {
    const expected = {};

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger docs properties are empty', () => {
  const fixture = swaggerFixture({ properties: {} });

  test('should return an empty json object', async done => {
    const expected = {};

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc has property with no example', () => {
  const fixture = swaggerFixture({ properties: { id: { type: 'integer' } } });

  test('should return a json object, with null properties', async done => {
    const expected = { id: null };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains property with no example', () => {
  test('should return a json object with a null property', async done => {
    const data = {
      properties: {
        username: {
          type: 'string',
        },
        age: {
          type: 'integer',
        },
        height: {
          type: 'number',
        },
        isHappy: {
          type: 'boolean',
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = {
      username: null,
      age: null,
      height: null,
      isHappy: null,
    };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains string properties', () => {
  test('should return a json object with a string property', async done => {
    const data = {
      properties: {
        username: {
          type: 'string',
          example: 'airasoul',
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = {
      username: 'airasoul',
    };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains integer properties', () => {
  test('should return a json object with a integer property', async done => {
    const data = {
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
          example: 12345,
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = {
      id: 12345,
    };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains boolean properties', () => {
  test('should return a json object with a boolean property', async done => {
    const data = {
      properties: {
        isHappy: {
          description: 'Set it to true if andrew is happy.',
          example: true,
          type: 'boolean',
          default: false,
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = {
      isHappy: true,
    };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains number properties', () => {
  test('should return a json object with a number property', async done => {
    const data = {
      properties: {
        weight: {
          description: 'weight in kg',
          example: 180,
          type: 'number',
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = {
      weight: 180,
    };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains an object properties', () => {
  test('should return a json object with an object as property', async done => {
    const data = {
      properties: {
        dimensions: {
          type: 'object',
          properties: {
            weight: {
              description: 'weight in kg',
              example: 180,
              type: 'number',
            },
            height: {
              description: 'height in metres',
              example: 120,
              type: 'number',
            },
          },
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = { dimensions: { weight: 180, height: 120 } };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains an array of properties', () => {
  test('should return a json object with an array as property', async done => {
    const data = {
      properties: {
        phones: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              number: {
                description: 'List of phone numbers',
                example: '07943818181',
                type: 'string',
              },
            },
          },
        },
      },
    };

    const fixture = swaggerFixture(data);

    const expected = { phones: [{ number: '07943818181' }] };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains a ref to a definition with a single property', () => {
  test('should return a json object with property', async done => {
    const data = {
      definitions: {
        DayOfWeek: {
          title: 'DayOfWeek',
          description: 'Day of the Week',
          type: 'string',
          example: 'Monday',
          enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        },
        User: {
          properties: {
            bornDay: {
              $ref: '#/definitions/DayOfWeek',
            },
          },
        },
      },
    };

    const fixture = swaggerFixture(data, 'User');

    const expected = { bornDay: 'Monday' };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains a ref to a definition with an object', () => {
  test('should return a json object with properties', async done => {
    const data = {
      definitions: {
        Address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              example: 'no 4',
            },
            postcode: {
              type: 'string',
              example: 'w1',
            },
          },
        },
        User: {
          properties: {
            address: {
              $ref: '#/definitions/Address',
            },
          },
        },
      },
    };

    const fixture = swaggerFixture(data, 'User');
    const expected = { address: { street: 'no 4', postcode: 'w1' } };

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains definitions with properties and examples', () => {
  test('should return a json object with all properties', async done => {
    const expected = {
      id: '12345',
      username: 'airasoul',
      firstName: 'andrew',
      lastName: 'keig',
      email: 'andrew.keig@gmail.com',
      password: 'password',
      userStatus: '1',
      bornDay: 'Monday',
      dimensions: { weight: 180, height: 120 },
      isHappy: false,
      phones: [{ number: '07943818181' }],
      address: { street: 'no 4', postcode: 'w1' },
    };

    const fixture = swaggerFixture(swagger, 'User');

    expect(fixture).toEqual(expected);
    done();
  });
});

describe('when swagger doc contains an array of strings', () => {
  test('should return a json object with an array of strings', async done => {
    const data = {
      properties: {
        developmentPhotoURLs: {
          description: 'List of development photo URLs',
          type: 'array',
          example: 'https://www.goog.le/defaultPhoto.jpg',
          items: {
            type: 'string',
            minLength: 10,
            maxLength: 100,
            pattern: '^https\\:\\/\\/.*',
            example: 'https://www.goog.le/defaultPhoto.jpg',
          },
          minItems: 1,
          maxItems: 10,
        },
      },
    };

    const fixture = swaggerFixture(data);
    const expected = { developmentPhotoURLs: ['https://www.goog.le/defaultPhoto.jpg'] };

    expect(fixture).toEqual(expected);
    done();
  });
});
