(function () {

  document.captureEvents(Event.MOUSEMOVE);

  var socket = io.connect('http://localhost');
  
  socket.on("mouse-trigger", function (data) {
    console.log(data);
    var node = document.getElementById(data.id);
    if ( ! node)
      return;
    document.getElementById(data.id).style.left = data.x + 'px';
    document.getElementById(data.id).style.top = data.y + 'px';
  });

  socket.on("user-init", function (data) {
    document.getElementsByTagName('body')[0].innerHTML = "";
    var users = data.users;
    users.forEach(function (id, idx) {
      console.log(id);
      var div = document.createElement('div');
      div.className = 'user-block';
      div.id = id;
      div.style.backgroundColor = getRandomColor();
      document.getElementsByTagName('body')[0].appendChild(div);  
    });
    
  });

  function getRandomColor () {
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
  }
  document.onmousemove = function (e) {
    mouseX = event.clientX + document.body.scrollLeft;
    mouseY = event.clientY + document.body.scrollTop;
    socket.emit('mouse-move', {x: mouseX, y:mouseY});
    return true;
  };
})();