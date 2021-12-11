const thenables = require('./src/thenables')
const CustomPromise = require('./src/CustomPromise')

const resolved = CustomPromise.resolved;
const rejected = CustomPromise.rejected;

const sentinel = { sentinel: "sentinel" };
const dummy = { dummy: "dummy" };

function testMain () {
  function yFactory() {
    return thenables.fulfilled['an already-fulfilled promise'](thenables.fulfilled['an asynchronously-fulfilled custom thenable'](sentinel));
  }
  
  function xFactory() {
    return {
      then: function (resolvePromise) {
        const yFactory_ = yFactory()
        resolvePromise(yFactory_);
      }
    };
  }
  
  const promise = resolved(dummy).then(function onBasePromiseFulfilled() {
    const xFactory_ = xFactory()
    return xFactory_;
  });
  
  const test = function (promise) {
    promise.then(function onPromiseFulfilled(value) {
      expect(value).toBe(dummy);
    })
  }
  test(promise)

  
}

test('custom promise test', () => {
  testMain()
});