(function() {

  var rand = Math.random();

  var imageUrl = 'http://54.173.76.9/FI9821W_C4D655392937/snap/current.jpg?rand=' + rand;

  var image = new Image();

  image.src = imageUrl;

  image.setAttribute('class', 'armory-cam');

  document.body.appendChild(image);

})()
