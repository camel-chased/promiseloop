module.exports=function promiseLoop(times,iterationFn,finalFn){
  let current=0;
  let p=Promise.resolve("ok");
  function _loop(fn){
    current++;
    if(current<times){
      p=p.then(()=>{
        iterationFn();
        _loop(finalFn);
      });
    }else{
      p.then(()=>{
        finalFn();
      });
    }
  }
  _loop(finalFn);
}
