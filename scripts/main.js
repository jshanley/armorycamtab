document.addEventListener('DOMContentLoaded', () => {

  const rand = Math.random();
  const imageUrl = `https://tower.armorycam.com/ftpuploaduser/FI9821W_C4D655392937/snap/current.jpg?rand=${rand}`;

  const wrapper = document.getElementById('main');

  // Create images
  const fallback = new Image();
  fallback.crossOrigin = 'anonymous';
  fallback.decoding = 'async';
  fallback.className = 'fallback';

  const latestImage = new Image();
  latestImage.crossOrigin = 'anonymous';
  latestImage.decoding = 'async';

  // Add image elements to DOM
  wrapper.appendChild(fallback);
  wrapper.appendChild(latestImage);
  
  // Get cached image from storage
  chrome.storage.local.get(['cachedImage'], result => {
    const {cachedImage} = result;
    if (cachedImage) {
      fallback.src = cachedImage;
    }
  });
  
  // Add "loaded" class to the fallback image once it loads
  fallback.onload = (evt) => {
    evt.target.classList.add('loaded');
  }

  // Request latest image
  const request = new XMLHttpRequest();
  request.open('GET', imageUrl, true);
  request.responseType = 'blob';
  request.onload = () => {
    if (request.status == 200) {
      const blob = request.response;

      // Create an object URL to use as the img src
      const objectUrl = window.URL.createObjectURL(blob);
      
      latestImage.onload = (evt) => {
        // Make sure to add the "loaded" class
        evt.target.classList.add('loaded');
        // Clean up the now-obsolete object URL
        window.URL.revokeObjectURL(objectUrl);
      }
      latestImage.src = objectUrl;

      // Use a FileReader to turn the blob into a base64 data url to cache
      const fileReader = new FileReader();
      fileReader.onload = (evt) => {
        const {result} = evt.target;
        // Cache the data url (async)
        chrome.storage.local.set({cachedImage: result}, () => {
          // This is reached once the storage key/value has been set.
          // A no-op for now...
        })
      }
      fileReader.readAsDataURL(blob);
    }
  };

  request.send();

});