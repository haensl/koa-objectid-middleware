describe('@haensl/koa-objectid-middleware', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe('import via full uri', () => {
    const middleware = require('@haensl/koa-objectid-middleware');

    it('exposes a function', () => {
      expect(typeof middleware)
      .toEqual('function');
    });
  });
});
