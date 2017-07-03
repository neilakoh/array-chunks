var data = require('./data.json');
var limit = 5;
var numberOfIteration = isInteger(data.length, limit) ? Math.round(data.length / limit) : Math.round(data.length / limit) + 1;
var x = 0;
var f = 0;
var t = (limit - 1) + 0;
var done = false;

function isInteger(num, limit) {
  var getVal = num / limit;
  var isInt = getVal % 1;
  if(isInt === 0) {
    return true;
  } else {
    return false;
  }
}

function a(data, from, to) {
  return new Promise(function (fulfill, reject){
    try {
      let dataHolder = [];
      for(var i = 0; i < data.length; i++) {
        if(i >= from && i <= to) {
          dataHolder.push(data[i]);
        }
      }
      fulfill({
        success: true,
        data: dataHolder,
      });
    } catch (e) {
      reject({
        success: false,
        data: e,
      });
    }
  });
}

function loop() {

  a(data, f, t).then((res)=>{
    if(res.success) {
      f = t + 1;
      t = t + limit;
      x = x + 1;
      // PASS DATA TO THE CLIENT
      console.log(res.data);
    }
  });

  var delay = setTimeout(()=>{
    a(data, f, t).then((res)=>{
      if(res.success) {
        if(x < numberOfIteration) {
          loop();
        } else {
          // INFORM CLIENT IF DONE
          return console.log('done');
        }
      }
    });
  }, 1000);

}

loop();
