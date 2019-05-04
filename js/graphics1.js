var towerArray = [],
    gDiscArray = [],
    speed = 500;

var DiscObject = function(n) {
  this.n = n;
  this.jName = ".disc_" + n;
  this.tower = 0;
}

DiscObject.prototype.moveTo = function(tower) {
  $(this.jName).hide().prependTo($(tower.jName + " > .discs")).show();
  towerArray[this.tower].discArray.pop();
  this.tower = tower.n;
  tower.discArray.push(this);
}



var Tower = function(n) {
  this.n = n;
  this.jName = ".tower_" + n;
  this.selected = false;
  this.discArray = [];
  var parent = this;
  $(this.jName).on('click', function() {
    var canBeSelected = true;
    for(var i=0; i<towerArray.length;i++) {
      if(towerArray[i].selected === true) {
        canBeSelected = false;
      }
    }
    if(canBeSelected && parent.n != 0) {
      parent.selected = true;
      console.log(parent.n + " selected");
      solver = new Solver();
      solver.solve();
    } else {
      console.log("Can't select this tower.");
    }
  });
}

function getDiscArray(tower) {
  var arr = [];
  var rarr = [];
  var children = $(tower.jName + " > .discs").children().toArray();
  for(var i=0; i<children.length; i++) {
    arr.push($(children[i]).attr('class').slice(-1));
    var obj = new DiscObject(arr[i]);
    obj.tower = tower.n;
    rarr.push(obj);
  }
  return rarr.reverse();
}

function getSelTower() {
  for(var i=0; i<towerArray.length; i++) {
    if(towerArray[i].selected === true) {
      return i;
    }
  }
}

var Solver = function() {
  this.focus = 0;
  this.goal = getSelTower();
}

Solver.prototype.solve = function() {
  t0d = towerArray[0].discArray;
  t1d = towerArray[1].discArray;
  t2d = towerArray[2].discArray;
  var i = 0;
  var tf = this.goal;
  var seq = numSequence();
  var started = false;
  var parent = this;
  var done = false;
  
  function numSequence() {
    var seq = [];
    var current = 6;
    var history = [];
    var n=0;
    while(current >= 0 || seq.length===0) {
      history = seq.slice();
      seq.push(current);
      for(var i=0; i<history.length; i++) {
        seq.push(history[i]);
      }
      current--;
    }
    return seq;
  }
  
  function move() {
    if(gDiscArray[seq[i]]) {
      gDiscArray[seq[i]].moveTo(towerArray[tf]);
    } else {
      done=true;
    }
    
    i++;
    if(parent.goal===2) {
      tf = seq[i]%2!==0 ? ++gDiscArray[seq[i]].tower :
      --gDiscArray[seq[i]].tower; 
    } else {
      tf = seq[i]%2===0 ? ++gDiscArray[seq[i]].tower :
      --gDiscArray[seq[i]].tower; 
    }
    if(tf>2) {
      tf=0;
      gDiscArray[seq[i]].tower = 0;
    }
    if(tf<0) {
      tf=2;
      gDiscArray[seq[i]].tower = 2;
    }
  }
  
  if(seq) {
    setInterval(function(){ 
      if(done===false) {
        move();
      }
    }, speed); 
  }
  
  function getFree(focus, goal) {
    var arr = [0,1,2];
    for(var i=0; i<arr.length; i++) {
      if(arr[i] != focus && arr[i] != goal) {
        return arr[i];
      }
    }
  }
}

for(var i=0; i<3; i++) {
  var tower = new Tower(i);
  tower.discArray = getDiscArray(tower);
  towerArray.push(tower);
}

for(var i=0; i<towerArray.length; i++) {
  for(var j=0; j<towerArray[i].discArray.length; j++) {
    gDiscArray.push(towerArray[i].discArray[j]);
  }
}

