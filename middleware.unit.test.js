const { ObjectId } = require('mongodb');
const { statusCodes } = require('@haensl/http');
const requireObjectID = require('./')();

describe('@haensl/koa-objectid-middleware', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      request: {
        body: {},
        headers: {},
        params: {}
      },
      get: jest.fn()
        .mockImplementation((header) => {
          ctx.request.headers[header];
        }),
      set: jest.fn(),
      throw: jest.fn()
    };
  });

  describe('when there is no id parameter', () => {
    beforeEach(async () => {
      await requireObjectID(ctx);
    });

    it(`throws ${statusCodes.badRequest}`, () => {
      expect(ctx.throw)
        .toHaveBeenCalledWith(statusCodes.badRequest);
    });
  });

  describe('when the id parameter is not a valid object id', () => {
    beforeEach(async () => {
      ctx.request.params.id = 'foo';
      await requireObjectID(ctx);
    });

    it(`throws ${statusCodes.badRequest}`, () => {
      expect(ctx.throw)
        .toHaveBeenCalledWith(statusCodes.badRequest);
    });
  });

  describe('when the id parameter is a valid object id', () => {
    beforeEach(async () => {
      ctx.request.params.id = new ObjectId().toHexString();
      await requireObjectID(ctx);
    });

    it('sets the context property to the parsed ObjectId', () => {
      expect(ctx.resourceId)
        .toBeInstanceOf(ObjectId);
    });
  });

  describe('options', () => {
    describe('ctxRequestPath', () => {
      beforeEach(async () => {
        const configuredMiddleware = require('./')({
          ctxRequestPath: 'params.myId'
        });
        ctx.request.params.myId = new ObjectId().toHexString();
        await configuredMiddleware(ctx);
      });

      it('sets the property path within the request from which to parse the ObjectID', () => {
        expect(ctx.resourceId)
          .toBeInstanceOf(ObjectId);
      });
    });

    describe('ctxProperty', () => {
      beforeEach(async () => {
        const configuredMiddleware = require('./')({
          ctxProperty: 'myId'
        });
        ctx.request.params.id = new ObjectId().toHexString();
        await configuredMiddleware(ctx);
      });

      it('sets the property within ctx to set to the parse the ObjectID', () => {
        expect(ctx.myId)
          .toBeInstanceOf(ObjectId);
      });
    });

    describe('throwOnError', () => {
      describe('disabled', () => {
        describe('when there is no id parameter', () => {
          beforeEach(async () => {
            const configuredMiddleware = require('./')({
              throwOnError: false
            });

            await configuredMiddleware(ctx);
          });

          it('does not throw', () => {
            expect(ctx.throw)
              .not
              .toHaveBeenCalled();
          });
        });

        describe('when the id parameter is not a valid object id', () => {
          beforeEach(async () => {
            const configuredMiddleware = require('./')({
              throwOnError: false
            });
            ctx.request.params.id = 'foo';
            await configuredMiddleware(ctx);
          });

          it('does not throw', () => {
            expect(ctx.throw)
              .not
              .toHaveBeenCalled();
          });
        });
      });
    });
  });
});

