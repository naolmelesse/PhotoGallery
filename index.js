
const apiKey = "hc62SaKaztAVVLwRzbSs9v0miFGDxq9hEbN2w0ZaTZM";
const images = document.querySelectorAll('.image');
const titles = document.querySelectorAll('.photoLocation');
const likes = document.querySelectorAll('.likes');

fetch(`https://api.unsplash.com/photos/random?query=restaurant&count=10&client_id=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    data.forEach((photo, index) => {
        console.log(photo);
      images[index].src = photo.urls.regular;
      titles[index].innerText += photo.location.name;
      likes[index].innerText += photo.likes;
    });
  });