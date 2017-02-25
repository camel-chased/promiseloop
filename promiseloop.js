module.exports = function promiseLoop(promiseImplementation){

  promiseImplementation=promiseImplementation || Promise;

  return function _promiseLoop(times,iterationFn,finalFn){
    let current=0;
    let p=promiseImplementation.resolve("ok");
    function _loop(){
      current++;
      if(current<times){
        p=p.then(()=>{
          iterationFn();
          _loop();
        });
      }else{
        p.then(()=>{
          finalFn();
        });
      }
    }
    _loop();
  }
}
