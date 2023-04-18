/**
* Utilizes the prescribed backoff % of the e1RM
* @param x : Prescribed percentage in column G of the "Week..." tabs
* @param y : The e1RM of the given top set, found in column X
* @customfunction
*/

function BACKOFF(x,y) {
  var weight = (x * y)/100;
  var rounded = Math.round(weight/2.5)*2.5;
  var result = rounded.toFixed(1);

  return result;

}
