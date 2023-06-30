# @haensl/koa-objectid-middleware

Middleware to parse MongoDB ObjectIDs from a Koa request path parameter.

[![NPM](https://nodei.co/npm/@haensl%2Fkoa-objectid-middleware.png?downloads=true)](https://nodei.co/npm/@haensl%2Fkoa-objectid-middleware/)

[![npm version](https://badge.fury.io/js/@haensl%2Fkoa-objectid-middleware.svg)](http://badge.fury.io/js/@haensl%2Fkoa-objectid-middleware)

[![CircleCI](https://circleci.com/gh/haensl/koa-objectid-middleware.svg?style=svg)](https://circleci.com/gh/haensl/koa-objectid-middleware)

Use this middleware when a route requires a request parameter to be a [MongoDB ObjectID](https://www.mongodb.com/docs/manual/reference/method/ObjectId/), e.g. when specifying resource ids in routes such as `/resource/:id`.

When designing routes in an application that uses MongoDB as the database, using MongoDB Object IDs as path parameters can be a convenient and efficient approach. MongoDB Object IDs are unique identifiers automatically assigned to each document in a collection.

By including the Object ID as a path parameter in a route, you can easily target and manipulate specific documents. For example, a route like `/users/:userId` can be used to retrieve, update, or delete a user document based on its Object ID.

Using Object IDs as path parameters offers several benefits. It ensures the uniqueness of the identifier, simplifies route handling on the server side, and provides a consistent and standardized way to access individual documents. Additionally, it aligns well with MongoDB's query capabilities, allowing for efficient retrieval and modification of specific resources.

Overall, leveraging MongoDB Object IDs as path parameters in routes streamlines the development process and enhances the precision and control of interactions with the database.

## Installation

### Via `npm`

```bash
$ npm install -S @haensl/koa-objectid-middleware mongodb
```

### Via `yarn`

```bash
$ yarn add @haensl/koa-objectid-middleware mongodb
```

## Usage

1. [Install @haensl/koa-objectid-middleware](#installation)

2. Ensure you have [mongodb](https://www.npmjs.com/package/mongodb) installed as it's a peer dependency.

3. Use middleware in your projects:


    ```javascript
    // router.js - Router
    const requireObjectID = require('@haensl/koa-objectid-middleware');
    const Router = require('@koa/router');

    const router = new Router();

    // `GET /:id route handler`
    const get = require('./get');


    // require `ctx.request.params.id` to be a valid MongoDB ObjectID.
    router.get('/:id', requireObjectID(), get);

    module.exports = router;
    ```

    ```javascript
    // get.js - Get route
    module.exports = async (ctx) => {
      // Use the object id in your routes.
      const resource = await getResource(ctx.resourceId);

      // ...
    };
    ```

## Synopsis

The koa-object-middleware is exposed as a function that takes an options object and returns an `async` Koa middleware:


```javascript
({
  // The property path within ctx.request to parse the ObjectID from.
  // I.e. the name of the route param.
  ctxRequestPath: 'params.id',

  // The name of the property on ctx to store the ObjectID.
  ctxProperty: 'resourceId',

  // Set to false to ignore errors.
  // By default ctx.throw is called if the id parameter is missing (404) or malformed (400).
  throwOnError: true
}) => async (ctx, next) => { }
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
