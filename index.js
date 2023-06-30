const { ObjectId } = require('mongodb');
const { statusCodes } = require('@haensl/http');

/**
 * Parse MongoDB Object id parameter.
 *
 * @param options Object configuration options.
 *
 *  ctxRequestPath: the property path within ctx.request to parse the object id from.
 *    Default: params.id
 *
 *  ctxProperty: the property on ctx to set to the object id.
 *    Default: resourceId
 *
 *  throwOnError: whether or not to throw an error when parsing the parameter fails.
 *    Default: true
 */
const requireObjectID = ({
  ctxRequestPath = 'params.id',
  ctxProperty = 'resourceId',
  throwOnError = true
} = {}) => async (ctx, next = () => {
  // do nothing
}) => {
  let id;
  const param = ctxRequestPath.split('.')
    .reduce((request = {}, part) =>
      request[part], ctx.request
    );

  try {
    id = ObjectId.createFromHexString(param);
  } catch (err) {
    if (throwOnError) {
      ctx.throw(statusCodes.badRequest);
      return;
    }
  }

  if (throwOnError && !id) {
    ctx.throw(statusCodes.badRequest);
    return;
  }

  ctx[ctxProperty] = id;
  await next();
};

module.exports = requireObjectID;

