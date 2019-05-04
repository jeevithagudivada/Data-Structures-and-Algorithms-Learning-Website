function Stack () {
  this._size = 0;
  this.storage = {};
}

Stack.prototype.push = function (data) {
  var size = ++this._size;
  this.storage[size] = data;

  return {
    id: size,
    data: data
  }
};

Stack.prototype.pop = function () {
  if (this._size) {
    var size = this._size;
    var deletedData = this.storage[size];
    delete this.storage[size];
    this._size--;
    
    return {
      id: size,
      data: deletedData
    };
  } else {
    alert('Stack is empty!');
  }
};

Stack.prototype.get = function (position) {
  if (this._size && position && position <= this._size) {
    var positionData = this.storage[position];
    alert(positionData);
  } else {
    alert('Stack is empty or wrong position!');
  }
};

var stack = new Stack();

$(document).ready(function () {
  function addStackBrick (position) {
    var brickType = position % 2 ? 'reg' : 'alt';
    var $HTML = $('<div/>')
                .addClass('entering queue-block ' + brickType)
                .attr('data-id', position)
                .text(position);

    $('.stack-animation').append($HTML);
    $HTML.on('animationend', function(e) {
      $HTML.removeClass('entering');
    });
  };

  function removeStackBrick (position) {
    var brick = $('.queue-block[data-id="' + position + '"]');
    brick.addClass('outing')
    brick.on('animationend', function(e) {
      brick.remove();
    });
  };

  $('.add-stack-form').on('submit', function(e) {
    e.preventDefault();
    var data = $('.add-stack-data').val();
    $('.add-stack-data').val('');
    addStackBrick(stack.push(data).id);
  });

  $('.get-stack-form').on('submit', function(e) {
    e.preventDefault();
    var data = $('.get-stack-data').val();
    $('.get-stack-data').val('');
    stack.get(data);
  });

  $('.remove-stack-form').on('submit', function(e) {
    e.preventDefault();
    removeStackBrick(stack.pop().id);
  });
});