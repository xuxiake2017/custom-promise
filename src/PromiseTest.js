import thenables from './thenables';
import CustomPromise from '../promise/CustomPromise';

const resolved = CustomPromise.resolved;
const rejected = CustomPromise.rejected;

const sentinel = { sentinel: "sentinel" };
const dummy = { dummy: "dummy" };

export default function testMain () {
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
  
  // const promise = resolved(dummy).then(function onBasePromiseFulfilled() {
  //   const xFactory_ = xFactory()
  //   return xFactory_;
  // });
  
  // const test = function (promise) {
  //   promise.then(function onPromiseFulfilled(value) {
  //     console.log('最终：', value);
  //   })
  // }
  // test(promise)

  const p1 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
  const p2 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
      reject(2)
    }, 2000)
  })

  CustomPromise.all([p1, p2]).then(res => {
    console.log(res);
  }, reason => {
    console.log(reason);
  }).finally(() => {
    console.log('CustomPromise.all');
  })
}