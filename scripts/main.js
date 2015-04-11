(function() {

  document.addEventListener('DOMContentLoaded', function () {

    var rand = Math.random();

    var imageUrl = 'http://54.173.76.9/FI9821W_C4D655392937/snap/current.jpg?rand=' + rand;

    var cam = document.getElementById('armory-cam');

    var urlString = "url('" + imageUrl + "')";

    cam.style.backgroundImage = urlString;

    window.addEventListener('resize', maintainSize);
    maintainSize();

  });

  function maintainSize() {
    var cam = document.getElementById('armory-cam');
    var w = window.innerWidth,
        h = window.innerHeight;
    cam.style.height = h + 'px';
    cam.style.width = w + 'px';
  }




})()
