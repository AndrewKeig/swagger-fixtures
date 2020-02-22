# swagger-fixtures


[![Build Status](https://travis-ci.org/AndrewKeig/swagger-fixtures.svg?branch=master)](https://travis-ci.org/AndrewKeig/swagger-fixtures)


### Introduction
swagger-fixtures, generate a test fixture from the definitions, property examples in your swagger document.

### Swagger/Open API Specification

Swagger, allows you to define within your swagger document, examples, this module will grab those property examples and construct a json object.

If a property has no example, we set this to null.

### Install

`npm install swagger-fixtures`

### Usage

```
const swagger = require('./swagger.json');
const swaggerFixture = require('swagger-fixtures');
const fixture = swaggerFixture(swagger.definitions.User);
```

Based on the below swagger doc, we will  get an object like so, which can be used as a test fixture:

```js
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

Example swagger doc:

```json
{
	"definitions": {
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
        "phones" : {
          "type" : "array",
          "items" : {
            "type" : "object",
            "properties" : {
              "number" : {
                "description" : "List of phone numbers",
                "example" : "07943818181",
                "type" : "string"
              }
            }
          }
        },
        "dimensions" : {
          "type" : "object",
          "properties" : {
            "weight" : {
              "description" : "weight in kg",
              "example" : 180,
              "type" : "number"
            },
            "height" : {
              "description" : "height in metres",
              "example" : 120,
              "type" : "number"
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

