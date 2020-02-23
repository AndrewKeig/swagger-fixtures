# swagger-fixtures

[![Build Status](https://travis-ci.org/AndrewKeig/swagger-fixtures.svg?branch=master)](https://travis-ci.org/AndrewKeig/swagger-fixtures)

### Introduction

swagger-fixtures, generate a test fixture from the definitions, property examples in your swagger document.

### Swagger/Open API Specification

Swagger, allows you to define within your swagger document, examples, this module will grab those property examples and construct a json object.

If a property has no example, we set this to null.

Supports, swagger types:

```
object
array
boolean
string
number
integer
ref
```

### Install

`npm install swagger-fixtures`

### Usage

```
const swagger = require('./swagger.json');
const swaggerFixture = require('swagger-fixtures');
const fixture = swaggerFixture(swagger, 'User');
```

Based on the below swagger doc, we will get an object like so, which can be used as a test fixture:

```js
const fixture = {
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
```

Example swagger doc:

```js
{
  "definitions": {
    "Address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string",
          "example": "no 4"
        },
        "postcode": {
          "type": "string",
          "example": "w1"
        }
      }
    },
    "DayOfWeek": {
      "title": "DayOfWeek",
      "description": "Day of the Week",
      "type": "string",
      "example": "Monday",
      "enum": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    },
    "User": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64",
          "example": "12345"
        },
        "username": {
          "type": "string",
          "example": "airasoul"
        },
        "firstName": {
          "type": "string",
          "example": "andrew"
        },
        "lastName": {
          "type": "string",
          "example": "keig"
        },
        "email": {
          "type": "string",
          "example": "andrew.keig@gmail.com"
        },
        "password": {
          "type": "string",
          "example": "password"
        },
        "isHappy": {
          "description": "Set it to True andrew is happy.",
          "example": false,
          "type": "boolean",
          "default": false
        },
        "bornDay": {
          "$ref": "#/definitions/DayOfWeek"
        },
        "address": {
          "$ref": "#/definitions/Address"
        },
        "phones": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "number": {
                "description": "List of phone numbers",
                "example": "07943818181",
                "type": "string"
              }
            }
          }
        },
        "dimensions": {
          "type": "object",
          "properties": {
            "weight": {
              "description": "weight in kg",
              "example": 180,
              "type": "number"
            },
            "height": {
              "description": "height in metres",
              "example": 120,
              "type": "number"
            }
          }
        },
        "userStatus": {
          "type": "integer",
          "format": "int32",
          "description": "User Status",
          "example": "1"
        }
      }
    }
  }
}

```

### Test

`npm test`

### Lint

`npm run lint`

### coverage

`npm run coverage`