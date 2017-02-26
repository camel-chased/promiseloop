module.exports = function promiseLoop(promiseImplementation){

  promiseImplementation=promiseImplementation || Promise;

  return function _promiseLoop(times,iterationFn,finalFn){
    let current=0;
    if(arguments.length==2){
      finalFn=iterationFn;
      iterationFn=()=>{};
    }
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
          setImmediate(()=>{ // might help in some scenarios
            finalFn();
          });
        });
      }
    }
    _loop();
  }
}
