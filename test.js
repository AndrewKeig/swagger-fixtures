const swagger = require('./swagger.json');
const swaggerFixture = require('./index');

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

describe('when swagger doc contains definitions with properties and examples', () => {
  const fixture = swaggerFixture(swagger.definitions.User);

  test('should return a json object with all properties', async done => {
    const expected = {
      id: '12345',
      username: 'airasoul',
      firstName: 'andrew',
      lastName: 'keig',
      email: 'andrew.keig@gmail.com',
      password: 'password',
      userStatus: '1',
      dimensions: { weight: 180, height: 120 },
      phones: [{ number: '07943818181' }],
    };

    expect(fixture).toEqual(expected);
    done();
  });
});
