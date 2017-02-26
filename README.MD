# promiseloop
This package was developed to resolve testing issues with nested promises and timing mocks but can be used elsewhere as well - it is kind of generous.

With this module you can test something on each level of `Promise.then` with multiple promises run simultanousely.

It can be used to check something on each level of `then` method.
`then` method is executed in most cases with `setImmediate` or `process.nextTick` so it is hard to test future "ticks" in synchronous way for example setTimeout inside `then` will not be catched by timer mocks because `setTimeout` inside `then` will be fired in the future (ticks).
`promiseloop` is going through all levels of ticks and can catch all those `setTimout`s or other things that are executed in next (future) ticks.

Here you can read about the problem: http://stackoverflow.com/questions/42446795/how-to-use-jasmine-clock-settimeout-in-nested-promises-when-order-matters-ja


## usage

```
npm install promiseloop


let promiseLoop = require('promiseloop')(Promise);
// where Promise is your Promise implementation
```

```javascript
let levelsDeep = 10; // how deep we want to go through 'then' levels?
function iterationFn(){
  // this function will be executed in each level of 'then'
  // each level of 'then' is in most cases something like setImmediate or nextTick
}
function finalFn(){
  // this function will be executed at the end of the chain - final
}
promiseLoop(levelsDeep,iterationFn,finalFn);
```

we can only have finalFn instead of iteration

```javascript
let levelsDeep = 10; // how deep we want to go through 'then' levels?
function finalFn(){
  // this function will be executed at the end of the chain - final
}
promiseLoop(levelsDeep,finalFn);
```

For example if you need to test multiple promises and you does not want to make sophisticated algorithm to check that everything is already executed on each level.

```javascript
let testNr=0;

new Promise((resolve,reject)=>{
  resolve("ok");
}).then(()=>{
  // level 1
  testNr++; // 1
}).then(()=>{
  // level 2
  testNr++; // 3
});

new Promise((resolve,reject)=>{
  resolve("ok");
}).then(()=>{
  // level 1
  testNr++; // 2
}).then(()=>{
  // level 2
  testNr++; // 4
});

function each(currentLevel){
  if(currentLevel==1){
    expect(testNr).toEqual(2);
  }else if(currentLevel==2){
    expect(testNr).toEqual(4);
  }
}
function final(){
  expect(testNr).toEqual(4);
  done();
}
promiseLoop(3,each,final);
```
