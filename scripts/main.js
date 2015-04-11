(function() {

  document.addEventListener('DOMContentLoaded', function () {

    var rand = Math.random();

    var imageUrl = 'http://54.173.76.9/FI9821W_C4D655392937/snap/current.jpg?rand=' + rand;

    var image = document.getElementById('armory-cam');

    image.src = imageUrl;

    window.addEventListener('load', maintainSize);
    window.addEventListener('resize', maintainSize);

  });

  function maintainSize() {
    var container = document.getElementById('image-container');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    console.log('maintaining size...');
    console.log('width', windowWidth);
    console.log('height', windowHeight);

    container.style.width = windowWidth + 'px';
    container.style.height = windowHeight + 'px';
  }


})()
