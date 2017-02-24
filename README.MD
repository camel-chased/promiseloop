# promiseloop
This package was developed to resolve testing issues with nested promises and timing mocks but can be used elsewhere as well - it is kind of generous.

Here you can read about the problem: http://stackoverflow.com/questions/42446795/how-to-use-jasmine-clock-settimeout-in-nested-promises-when-order-matters-ja


## usage

```
npm install promiseloop


let promiseLoop = require('promiseloop')(Promise);
// where Promise is your Promise implementation
```
