(function() {

  document.addEventListener('DOMContentLoaded', function () {

    var rand = Math.random();

    var imageUrl = 'https://tower.armorycam.com/ftpuploaduser/FI9821W_C4D655392937/snap/current.jpg?rand=' + rand;

    var wrapper = document.getElementById('main');

    var fallback = new Image();
    fallback.crossOrigin = 'anonymous';
    fallback.className = 'fallback';
    
    // var cachedImage = localStorage.getItem('cachedImage');
    chrome.storage.local.get(['cachedImage'], function(result) {
      console.log('result:', result)
      var cachedImage = result.cachedImage;
      if (cachedImage) {
        console.log('Showing cached image')
        fallback.src = cachedImage;
      }
    });
    
    wrapper.appendChild(fallback);

    var latestImage = new Image();
    latestImage.crossOrigin = 'anonymous';
    latestImage.onload = function() {
      wrapper.removeChild(fallback);
      wrapper.appendChild(latestImage);
      maintainSize();

      var canvas = document.createElement('canvas');
      var width = 1920;
      var height = 1080;
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      var ctx = canvas.getContext('2d');
      ctx.drawImage(latestImage, 0, 0, width, height);
      var imageData = canvas.toDataURL();
      
      // localStorage.setItem('cachedImage', imageData);
      chrome.storage.local.set({cachedImage: imageData}, function() {
        console.log('cachedImage saved to storage.')
      })
      
    }

    // kick off image load
    latestImage.src = imageUrl;

    

    window.addEventListener('resize', maintainSize);
    maintainSize();

  });

  function maintainSize() {
    var wrapper = document.getElementById('main');
    var w = window.innerWidth,
        h = window.innerHeight;
    var image = wrapper.getElementsByTagName('img')[0];
    image.style.height = h + 'px';
    image.style.width = w + 'px';
  }




})()
